
  document.addEventListener('DOMContentLoaded', function() {
    // Password show/hide toggle
    const passToggler = document.getElementById('togglePassword');
    const passInput = document.getElementById('password');
    if (passToggler && passInput) {
      // ensure accessible attributes
      passToggler.setAttribute('aria-pressed', 'false');
      passToggler.setAttribute('aria-label', 'ดูรหัสผ่าน');
      passToggler.title = 'ดูรหัสผ่าน';

      passToggler.addEventListener('click', function () {
        const isPassword = passInput.getAttribute('type') === 'password';
        passInput.setAttribute('type', isPassword ? 'text' : 'password');

        const icon = this.querySelector('i');
        if (icon) {
          // preserve style prefix (e.g., fa-regular) and toggle the icon name
          // remove whichever icon is present and add the other
          if (icon.classList.contains('fa-eye') || icon.classList.contains('fa-eye-slash')) {
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
          } else {
            // fallback: ensure an eye-slash when showing text
            icon.classList.add(isPassword ? 'fa-eye-slash' : 'fa-eye');
          }
        }

        // update accessibility state and tooltip
        const pressed = (!isPassword).toString(); // after click, if was password -> now text
        this.setAttribute('aria-pressed', pressed);
        if (isPassword) {
          this.setAttribute('aria-label', 'ซ่อนรหัสผ่าน');
          this.title = 'ซ่อนรหัสผ่าน';
        } else {
          this.setAttribute('aria-label', 'ดูรหัสผ่าน');
          this.title = 'ดูรหัสผ่าน';
        }
      });
    }

    // Account input sanitizer: allow only A-Z a-z 0-9
    (function () {
      const account = document.getElementById('account');
      const form = document.querySelector('.login-form');
      if (!account) return;

      function sanitizeValue(val) {
        return val.replace(/[^A-Za-z0-9]/g, '');
      }

      account.addEventListener('input', function (e) {
        const cleaned = sanitizeValue(e.target.value);
        if (cleaned !== e.target.value) {
          e.target.value = cleaned;
        }
      });

      account.addEventListener('paste', function (e) {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text');
        const cleaned = sanitizeValue(text);
        // insert cleaned at cursor position
        const start = account.selectionStart || 0;
        const end = account.selectionEnd || 0;
        const newVal = account.value.slice(0, start) + cleaned + account.value.slice(end);
        account.value = newVal;
        // move cursor
        const pos = start + cleaned.length;
        account.setSelectionRange(pos, pos);
      });

      if (form) {
        form.addEventListener('submit', function (e) {
          const val = account.value.trim();
          if (!val || !/^[A-Za-z0-9]+$/.test(val)) {
            e.preventDefault();
            account.focus();
            account.classList.add('is-invalid');
            setTimeout(function () {
              account.classList.remove('is-invalid');
            }, 2000);
          }
        });
      }
    })();
  });