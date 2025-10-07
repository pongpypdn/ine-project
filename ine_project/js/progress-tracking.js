// Progress Tracking System JavaScript
class ProgressTracker {
    constructor() {
        this.currentProject = null;
        this.progressData = [];
        this.init();
    }

    init() {
        this.loadProjectData();
        this.renderProgressTimeline();
        this.setupEventListeners();
    }

    loadProjectData() {
        // Get project ID from URL parameters or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id') || localStorage.getItem('currentProjectId');
        
        if (projectId) {
            // In a real application, this would fetch from an API
            this.currentProject = {
                id: projectId,
                titleThai: 'ระบบจัดการคลังสินค้าอัจฉริยะด้วย IoT และ AI',
                titleEnglish: 'Smart Warehouse Management System with IoT and AI',
                students: 'นาย วุฒิพงศ์ ว่องไว, นาย ปุญญพัฒน์ตนัย มั่นคง',
                advisor: 'รศ.ดร.อนิราช มิ่งขวัญ',
                startDate: '01/08/2567',
                endDate: '30/04/2568',
                overallProgress: 75
            };

            this.progressData = [
                {
                    id: 1,
                    week: 1,
                    date: '2024-08-01',
                    progress: 10,
                    status: 'on_track',
                    description: 'เริ่มต้นการวิเคราะห์ปัญหาและศึกษาเทคโนโลยีที่เกี่ยวข้อง',
                    challenges: 'ยังไม่พบปัญหาที่สำคัญ',
                    nextWeek: 'ศึกษาเทคโนโลยี IoT และ AI เพิ่มเติม',
                    advisorComment: 'ดีมาก เริ่มต้นได้ดี',
                    advisorPercentage: 10,
                    instructorComment: '',
                    instructorApproval: 'approved',
                    createdAt: '2024-08-01'
                },
                {
                    id: 2,
                    week: 2,
                    date: '2024-08-08',
                    progress: 20,
                    status: 'on_track',
                    description: 'ศึกษาเทคโนโลยีที่เกี่ยวข้องและเริ่มออกแบบระบบ',
                    challenges: 'ข้อมูลบางส่วนยังไม่ครบถ้วน',
                    nextWeek: 'ออกแบบโครงสร้างระบบและฐานข้อมูล',
                    advisorComment: 'ควรศึกษาเพิ่มเติมในส่วน AI',
                    advisorPercentage: 20,
                    instructorComment: '',
                    instructorApproval: 'approved',
                    createdAt: '2024-08-08'
                },
                {
                    id: 3,
                    week: 3,
                    date: '2024-08-15',
                    progress: 35,
                    status: 'on_track',
                    description: 'ออกแบบระบบและโครงสร้างฐานข้อมูล',
                    challenges: 'การออกแบบ UI ยังไม่เป็นที่พอใจ',
                    nextWeek: 'เริ่มพัฒนาโปรแกรมและทดสอบระบบ',
                    advisorComment: 'การออกแบบดี แต่ควรปรับปรุงส่วน UI',
                    advisorPercentage: 35,
                    instructorComment: '',
                    instructorApproval: 'approved',
                    createdAt: '2024-08-15'
                },
                {
                    id: 4,
                    week: 4,
                    date: '2024-08-22',
                    progress: 50,
                    status: 'on_track',
                    description: 'เริ่มพัฒนาโปรแกรมและสร้างส่วนติดต่อผู้ใช้',
                    challenges: 'การเชื่อมต่อกับฐานข้อมูลมีปัญหาเล็กน้อย',
                    nextWeek: 'ทดสอบระบบและแก้ไขข้อผิดพลาด',
                    advisorComment: 'ความก้าวหน้าดี',
                    advisorPercentage: 50,
                    instructorComment: '',
                    instructorApproval: 'approved',
                    createdAt: '2024-08-22'
                },
                {
                    id: 5,
                    week: 5,
                    date: '2024-08-29',
                    progress: 65,
                    status: 'on_track',
                    description: 'ทดสอบระบบเบื้องต้นและแก้ไขข้อผิดพลาด',
                    challenges: 'ประสิทธิภาพของระบบยังไม่เป็นที่พอใจ',
                    nextWeek: 'ปรับปรุงประสิทธิภาพและเพิ่มฟีเจอร์',
                    advisorComment: 'ควรทดสอบเพิ่มเติม',
                    advisorPercentage: 65,
                    instructorComment: '',
                    instructorApproval: 'approved',
                    createdAt: '2024-08-29'
                },
                {
                    id: 6,
                    week: 6,
                    date: '2024-09-05',
                    progress: 75,
                    status: 'on_track',
                    description: 'ปรับปรุงระบบและเพิ่มฟีเจอร์ใหม่',
                    challenges: '',
                    nextWeek: 'ทดสอบระบบแบบเต็มรูปแบบ',
                    advisorComment: 'ดีมาก',
                    advisorPercentage: 75,
                    instructorComment: '',
                    instructorApproval: 'approved',
                    createdAt: '2024-09-05'
                }
            ];
        }
    }

    setupEventListeners() {
        // Set current date as default for progress date
        document.getElementById('progressDate').value = new Date().toISOString().split('T')[0];
        
        // Set next week number
        const nextWeek = this.progressData.length + 1;
        document.getElementById('progressWeek').value = nextWeek;
    }

    renderProgressTimeline() {
        const container = document.getElementById('progressTimeline');
        
        if (this.progressData.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="fa-solid fa-chart-line fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">ยังไม่มีข้อมูลความก้าวหน้า</h5>
                    <p class="text-muted">เริ่มต้นการติดตามความก้าวหน้าของโครงงาน</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.progressData.map(progress => this.createProgressItem(progress)).join('');
    }

    createProgressItem(progress) {
        const statusConfig = this.getStatusConfig(progress.status);
        const approvalConfig = this.getApprovalConfig(progress.instructorApproval);
        
        return `
            <div class="progress-item mb-4 p-4 border rounded-3 bg-light">
                <div class="row">
                    <div class="col-md-8">
                        <div class="d-flex align-items-center mb-3">
                            <div class="progress-week-badge me-3">
                                <span class="badge bg-primary fs-6">สัปดาห์ที่ ${progress.week}</span>
                            </div>
                            <div class="progress-date text-muted">
                                <i class="fa-solid fa-calendar me-1"></i>
                                ${this.formatDate(progress.date)}
                            </div>
                            <div class="ms-auto">
                                <span class="badge ${statusConfig.badgeClass}">${statusConfig.label}</span>
                            </div>
                        </div>
                        
                        <div class="progress-description mb-3">
                            <h6 class="mb-2">รายละเอียดความก้าวหน้า:</h6>
                            <p class="mb-2">${progress.description}</p>
                            
                            ${progress.challenges ? `
                                <div class="alert alert-warning alert-sm">
                                    <i class="fa-solid fa-exclamation-triangle me-1"></i>
                                    <strong>ปัญหาหรืออุปสรรค:</strong> ${progress.challenges}
                                </div>
                            ` : ''}
                            
                            ${progress.nextWeek ? `
                                <div class="alert alert-info alert-sm">
                                    <i class="fa-solid fa-forward me-1"></i>
                                    <strong>แผนสัปดาห์ถัดไป:</strong> ${progress.nextWeek}
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="progress-bar-container mb-3">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span class="fw-medium">ความก้าวหน้า</span>
                                <span class="fw-bold text-primary">${progress.progress}%</span>
                            </div>
                            <div class="progress" style="height: 12px;">
                                <div class="progress-bar bg-primary" role="progressbar" 
                                     style="width: ${progress.progress}%" 
                                     aria-valuenow="${progress.progress}" 
                                     aria-valuemin="0" 
                                     aria-valuemax="100">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="comments-section">
                            <h6 class="mb-3">ความคิดเห็น</h6>
                            
                            <!-- Advisor Comment -->
                            <div class="comment-item mb-3 p-3 bg-white rounded border">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h6 class="mb-0 text-primary">
                                        <i class="fa-solid fa-user-tie me-1"></i>อาจารย์ที่ปรึกษา
                                    </h6>
                                    <span class="badge bg-primary">${progress.advisorPercentage}%</span>
                                </div>
                                <p class="mb-0 small">${progress.advisorComment}</p>
                                <div class="mt-2">
                                    <button class="btn btn-outline-primary btn-sm" onclick="openCommentModal(${progress.id}, 'advisor')">
                                        <i class="fa-solid fa-comment me-1"></i>แก้ไข
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Instructor Comment -->
                            <div class="comment-item p-3 bg-white rounded border">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h6 class="mb-0 text-success">
                                        <i class="fa-solid fa-chalkboard-teacher me-1"></i>อาจารย์ประจำวิชา
                                    </h6>
                                    <span class="badge ${approvalConfig.badgeClass}">${approvalConfig.label}</span>
                                </div>
                                <p class="mb-0 small">${progress.instructorComment || 'ยังไม่มีความคิดเห็น'}</p>
                                <div class="mt-2">
                                    <button class="btn btn-outline-success btn-sm" onclick="openCommentModal(${progress.id}, 'instructor')">
                                        <i class="fa-solid fa-comment me-1"></i>${progress.instructorComment ? 'แก้ไข' : 'เพิ่ม'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-12">
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-primary btn-sm" onclick="editProgress(${progress.id})">
                                <i class="fa-solid fa-edit me-1"></i>แก้ไข
                            </button>
                            <button class="btn btn-outline-danger btn-sm" onclick="deleteProgress(${progress.id})">
                                <i class="fa-solid fa-trash me-1"></i>ลบ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getStatusConfig(status) {
        const configs = {
            'on_track': { label: 'ตามแผน', badgeClass: 'bg-success' },
            'ahead': { label: 'เร็วกว่าแผน', badgeClass: 'bg-info' },
            'behind': { label: 'ช้ากว่าแผน', badgeClass: 'bg-warning' },
            'blocked': { label: 'ติดขัด', badgeClass: 'bg-danger' }
        };
        return configs[status] || configs['on_track'];
    }

    getApprovalConfig(approval) {
        const configs = {
            'approved': { label: 'อนุมัติ', badgeClass: 'bg-success' },
            'rejected': { label: 'ไม่อนุมัติ', badgeClass: 'bg-danger' },
            'pending': { label: 'รอการพิจารณา', badgeClass: 'bg-warning' }
        };
        return configs[approval] || configs['pending'];
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    submitProgress() {
        const form = document.getElementById('addProgressForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const progressData = {
            id: Date.now(),
            week: parseInt(document.getElementById('progressWeek').value),
            date: document.getElementById('progressDate').value,
            progress: parseInt(document.getElementById('progressPercentage').value),
            status: document.getElementById('progressStatus').value,
            description: document.getElementById('progressDescription').value,
            challenges: document.getElementById('progressChallenges').value,
            nextWeek: document.getElementById('progressNextWeek').value,
            advisorComment: '',
            advisorPercentage: parseInt(document.getElementById('progressPercentage').value),
            instructorComment: '',
            instructorApproval: 'pending',
            createdAt: new Date().toISOString().split('T')[0]
        };

        this.progressData.push(progressData);
        this.renderProgressTimeline();
        this.updateOverallProgress();
        
        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('addProgressModal')).hide();
        form.reset();
        
        // Set next week number
        const nextWeek = this.progressData.length + 1;
        document.getElementById('progressWeek').value = nextWeek;
        document.getElementById('progressDate').value = new Date().toISOString().split('T')[0];
        
        alert('บันทึกความก้าวหน้าเรียบร้อยแล้ว');
    }

    updateOverallProgress() {
        if (this.progressData.length > 0) {
            const latestProgress = this.progressData[this.progressData.length - 1];
            this.currentProject.overallProgress = latestProgress.progress;
            
            document.getElementById('overallProgress').style.width = `${latestProgress.progress}%`;
            document.getElementById('overallProgress').textContent = `${latestProgress.progress}%`;
        }
    }

    openCommentModal(progressId, commentType) {
        document.getElementById('commentWeekId').value = progressId;
        document.getElementById('commentType').value = commentType;
        
        const modal = new bootstrap.Modal(document.getElementById('commentModal'));
        modal.show();
    }

    submitComment() {
        const form = document.getElementById('commentForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const progressId = parseInt(document.getElementById('commentWeekId').value);
        const commentType = document.getElementById('commentType').value;
        const commentText = document.getElementById('commentText').value;
        const commentPercentage = document.getElementById('commentPercentage').value;
        const commentApproval = document.getElementById('commentApproval').value;

        const progressIndex = this.progressData.findIndex(p => p.id === progressId);
        if (progressIndex !== -1) {
            if (commentType === 'advisor') {
                this.progressData[progressIndex].advisorComment = commentText;
                if (commentPercentage) {
                    this.progressData[progressIndex].advisorPercentage = parseInt(commentPercentage);
                }
            } else if (commentType === 'instructor') {
                this.progressData[progressIndex].instructorComment = commentText;
                if (commentApproval) {
                    this.progressData[progressIndex].instructorApproval = commentApproval;
                }
            }
        }

        this.renderProgressTimeline();
        
        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('commentModal')).hide();
        form.reset();
        
        alert('บันทึกความคิดเห็นเรียบร้อยแล้ว');
    }

    editProgress(progressId) {
        const progress = this.progressData.find(p => p.id === progressId);
        if (!progress) return;

        // Fill form with existing data
        document.getElementById('progressWeek').value = progress.week;
        document.getElementById('progressDate').value = progress.date;
        document.getElementById('progressPercentage').value = progress.progress;
        document.getElementById('progressStatus').value = progress.status;
        document.getElementById('progressDescription').value = progress.description;
        document.getElementById('progressChallenges').value = progress.challenges;
        document.getElementById('progressNextWeek').value = progress.nextWeek;

        // Store progress ID for update
        document.getElementById('addProgressForm').setAttribute('data-edit-id', progressId);

        const modal = new bootstrap.Modal(document.getElementById('addProgressModal'));
        document.getElementById('addProgressModalLabel').textContent = 'แก้ไขความก้าวหน้า';
        modal.show();
    }

    deleteProgress(progressId) {
        if (confirm('คุณแน่ใจหรือไม่ที่จะลบความก้าวหน้านี้?')) {
            this.progressData = this.progressData.filter(p => p.id !== progressId);
            this.renderProgressTimeline();
            this.updateOverallProgress();
        }
    }
}

// Global functions
function submitProgress() {
    const form = document.getElementById('addProgressForm');
    const editId = form.getAttribute('data-edit-id');
    
    if (editId) {
        // Update existing progress
        const progressIndex = progressTracker.progressData.findIndex(p => p.id === parseInt(editId));
        if (progressIndex !== -1) {
            progressTracker.progressData[progressIndex] = {
                ...progressTracker.progressData[progressIndex],
                week: parseInt(document.getElementById('progressWeek').value),
                date: document.getElementById('progressDate').value,
                progress: parseInt(document.getElementById('progressPercentage').value),
                status: document.getElementById('progressStatus').value,
                description: document.getElementById('progressDescription').value,
                challenges: document.getElementById('progressChallenges').value,
                nextWeek: document.getElementById('progressNextWeek').value
            };
        }
        
        progressTracker.renderProgressTimeline();
        progressTracker.updateOverallProgress();
        
        // Reset form
        form.removeAttribute('data-edit-id');
        document.getElementById('addProgressModalLabel').textContent = 'เพิ่มความก้าวหน้า';
        
        bootstrap.Modal.getInstance(document.getElementById('addProgressModal')).hide();
        form.reset();
        
        alert('แก้ไขความก้าวหน้าเรียบร้อยแล้ว');
    } else {
        // Add new progress
        progressTracker.submitProgress();
    }
}

function openCommentModal(progressId, commentType) {
    progressTracker.openCommentModal(progressId, commentType);
}

function submitComment() {
    progressTracker.submitComment();
}

function editProgress(progressId) {
    progressTracker.editProgress(progressId);
}

function deleteProgress(progressId) {
    progressTracker.deleteProgress(progressId);
}

function goBack() {
    window.history.back();
}

// Initialize progress tracker when page loads
let progressTracker;
document.addEventListener('DOMContentLoaded', function() {
    progressTracker = new ProgressTracker();
    
    // Update project info display
    if (progressTracker.currentProject) {
        document.getElementById('projectTitle').textContent = progressTracker.currentProject.titleThai;
        document.getElementById('projectSubtitle').textContent = progressTracker.currentProject.titleEnglish;
        document.getElementById('projectStudents').textContent = progressTracker.currentProject.students;
        document.getElementById('projectAdvisor').textContent = progressTracker.currentProject.advisor;
        document.getElementById('projectStartDate').textContent = progressTracker.currentProject.startDate;
        document.getElementById('projectEndDate').textContent = progressTracker.currentProject.endDate;
        document.getElementById('overallProgress').style.width = `${progressTracker.currentProject.overallProgress}%`;
        document.getElementById('overallProgress').textContent = `${progressTracker.currentProject.overallProgress}%`;
    }
});
