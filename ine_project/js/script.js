// ================== CONFIG ==================
const BASE_URL = "/api"; // <-- แก้ให้ตรงกับ backend ของคุณ เช่น "https://yourdomain.com/api"
const AUTH_TOKEN = localStorage.getItem("token") || ""; // ถ้ามี JWT

// endpoint ที่คาดหวัง:
// GET    /notifications?limit=20            -> { unread_count:number, items:[{id, title, description, type, ts, read}] }
// PATCH  /notifications/read                -> { ok:true }  (body: { ids: string[] })
// GET    /session/me                        -> { name:string, email:string }

// ================== Utilities ==================
const bellBtn = document.getElementById('btnBell');
const accBtn  = document.getElementById('btnAccount');
const noti    = document.getElementById('panelNotifications');
const acc     = document.getElementById('panelAccount');
const notiBadge = document.getElementById('notiBadge');
const notiList  = document.getElementById('notiList');
const viewAll   = document.getElementById('viewAllNoti');
const accNameEl = document.getElementById('accName');
const accEmailEl= document.getElementById('accEmail');
const topNameEl = document.getElementById('topName');

function apiFetch(path, options={}){
  return fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type":"application/json",
      ...(AUTH_TOKEN ? { "Authorization": `Bearer ${AUTH_TOKEN}` } : {})
    },
    credentials: "include",
    ...options
  });
}

function fmtAgo(ts){
  // ts: ISO string or epoch
  try{
    const d = new Date(ts);
    const diff = (Date.now() - d.getTime())/1000;
    if (diff < 60) return `${Math.floor(diff)} วินาทีที่แล้ว`;
    if (diff < 3600) return `${Math.floor(diff/60)} นาทีที่แล้ว`;
    if (diff < 86400) return `${Math.floor(diff/3600)} ชั่วโมงที่แล้ว`;
    return `${Math.floor(diff/86400)} วันที่แล้ว`;
  }catch{ return ""; }
}

function iconClass(type){
  if (type === "warn") return "warn";
  if (type === "ok") return "ok";
  return "info";
}

function togglePanel(panelBtn, panelEl){
  const isOpen = panelEl.classList.toggle('open');
  panelBtn.setAttribute('aria-expanded', String(isOpen));
  panelEl.setAttribute('aria-hidden', String(!isOpen));
}

function closeAll(){
  [noti, acc].forEach(p => p.classList.remove('open'));
  bellBtn.setAttribute('aria-expanded','false');
  accBtn.setAttribute('aria-expanded','false');
  noti.setAttribute('aria-hidden','true');
  acc.setAttribute('aria-hidden','true');
}

// ================== Renderers ==================
function renderNotifications(data){
  const { unread_count = 0, items = [] } = data || {};
  // badge
  notiBadge.textContent = unread_count;
  notiBadge.style.display = unread_count > 0 ? "inline-block" : "none";

  // list
  notiList.innerHTML = items.map(it => `
    <div class="noti ${it.read ? "" : "unread"}" data-id="${it.id}">
      <span class="n-ico ${iconClass(it.type)}">${it.type === "ok" ? "✓" : (it.type === "warn" ? "!" : "🔔")}</span>
      <div class="n-body">
        <div class="n-title">${escapeHtml(it.title || "")}</div>
        <div class="n-desc">${escapeHtml(it.description || "")}</div>
        <div class="n-meta">• ${fmtAgo(it.ts)}</div>
      </div>
    </div>
  `).join("") || `<div class="noti"><div class="n-body"><div class="n-desc">ยังไม่มีการแจ้งเตือน</div></div></div>`;
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");
}

// ================== Data Loads ==================
async function loadSession(){
  try{
    const r = await apiFetch("/session/me");
    if (!r.ok) throw new Error("session failed");
    const me = await r.json();
    if (me?.name) {
      accNameEl.textContent = me.name;
      topNameEl.textContent = me.name.split(" ")[0] || me.name;
    }
    if (me?.email) accEmailEl.textContent = me.email;
  }catch{
    // fallback mock
    accNameEl.textContent = "อาจารย์ Admin";
    accEmailEl.textContent = "admin@university.ac.th";
    topNameEl.textContent  = "อาจารย์";
  }
}

async function loadNotifications(){
  try{
    const r = await apiFetch("/notifications?limit=20");
    if (!r.ok) throw new Error("noti failed");
    const data = await r.json();
    renderNotifications(data);
  }catch{
    // mock data (fallback ถ้า API ยังไม่พร้อม)
    const now = Date.now();
    const mock = {
      unread_count: 3,
      items: [
        { id:"n1", title:"โครงการใหม่รอการอนุมัติ", description:"โครงการ \"ระบบจัดการคลังสินค้าอัจฉริยะ\" ส่งมาเพื่อขออนุมัติ", type:"warn", ts: now-2*3600*1000, read:false },
        { id:"n2", title:"โครงการได้รับการอนุมัติ", description:"โครงการ \"แอปพลิเคชันร้านอาหารออนไลน์\" ได้รับการอนุมัติแล้ว", type:"ok", ts: now-5*3600*1000, read:false },
        { id:"n3", title:"ความคิดเห็นใหม่", description:"อ. ดร. วิชัย ได้แสดงความคิดเห็นเกี่ยวกับโครงการของคุณ", type:"info", ts: now-24*3600*1000, read:true },
      ]
    };
    renderNotifications(mock);
  }
}

// mark notifications as read when panel opens
async function markAllRead(){
  try{
    const ids = Array.from(notiList.querySelectorAll(".noti.unread")).map(el => el.dataset.id);
    if (!ids.length) return;
    // Update UI first (optimistic)
    notiList.querySelectorAll(".noti.unread").forEach(el => el.classList.remove("unread"));
    notiBadge.textContent = "0";
    notiBadge.style.display = "none";

    const r = await apiFetch("/notifications/read", {
      method: "PATCH",
      body: JSON.stringify({ ids })
    });
    // ถ้า backend ไม่ ok จะปล่อยให้ UI อ่านแล้ว แต่สามารถรีโหลดรอบหน้า
    if (!r.ok) console.warn("mark read failed");
  }catch(e){
    console.warn("mark read error", e);
  }
}

// ================== Events ==================
bellBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (acc.classList.contains('open')) acc.classList.remove('open');
  togglePanel(bellBtn, noti);
  // เมื่อเปิดแผงครั้งแรกให้ mark-as-read
  if (noti.classList.contains('open')) markAllRead();
});

accBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (noti.classList.contains('open')) noti.classList.remove('open');
  togglePanel(accBtn, acc);
});

document.addEventListener('click', closeAll);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });

viewAll.addEventListener('click', (e) => {
  e.preventDefault();
  // ปรับไปหน้าศูนย์แจ้งเตือนของจริงได้เลย
  window.location.href = "/notifications";
});

// ================== Boot + Poll ==================
loadSession();
loadNotifications();
setInterval(loadNotifications, 60_000); // ดึงข้อมูลใหม่ทุก 60 วินาที
