// Examination Management System JavaScript
class ExaminationManager {
    constructor() {
        this.currentProject = null;
        this.topicExamData = null;
        this.finalExamData = null;
        this.init();
    }

    init() {
        this.loadProjectData();
        this.renderTopicExamContent();
        this.renderFinalExamContent();
        this.setupEventListeners();
    }

    loadProjectData() {
        // Get project ID from URL parameters or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id') || localStorage.getItem('currentProjectId') || 'PROJ001';
        
        // Mock data for 100% completed project
        this.currentProject = {
            id: projectId,
            titleThai: 'ระบบจัดการคลังสินค้าอัจฉริยะด้วย IoT และ AI',
            titleEnglish: 'Smart Warehouse Management System with IoT and AI',
            students: 'นาย ธนาคาร ดีใจ, นางสาว สุนิสา วิทยา',
            advisor: 'ดร. วิชัย เทคโนโลยี',
            coAdvisor: 'อ. สมใจ คอมพิวเตอร์',
            startDate: '01/08/2567',
            endDate: '30/04/2568',
            overallProgress: 100,
            status: 'completed'
        };

        // Mock data for completed topic examination
        this.topicExamData = {
            id: 1,
            projectId: projectId,
            examDate: '2024-09-15T09:00',
            location: 'ห้องประชุม 101 อาคาร 1',
            committee: [
                { id: 'advisor1', name: 'ดร. วิชัย เทคโนโลยี', role: 'ประธานกรรมการ' },
                { id: 'advisor2', name: 'อ. สมศรี ข้อมูล', role: 'กรรมการ' },
                { id: 'advisor3', name: 'ผศ. ดร. สมชาย อินเทอร์เน็ต', role: 'กรรมการ' }
            ],
            status: 'completed',
            result: 'passed',
            score: '85',
            comments: 'โครงงานมีความคิดสร้างสรรค์และมีการนำเทคโนโลยี IoT และ AI มาใช้ได้อย่างเหมาะสม การออกแบบระบบมีความสมบูรณ์และสามารถนำไปใช้งานจริงได้',
            recommendations: 'ควรเพิ่มการทดสอบประสิทธิภาพของระบบในสภาวะการใช้งานจริง และพัฒนาระบบแจ้งเตือนให้มีความยืดหยุ่นมากขึ้น',
            notes: 'การสอบหัวข้อเสร็จสิ้นแล้ว นักศึกษาได้ผ่านการสอบหัวข้อและได้รับข้อเสนอแนะจากกรรมการ',
            createdAt: '2024-09-01',
            completedAt: '2024-09-15'
        };

        // Mock data for final examination
        this.finalExamData = {
            id: 2,
            projectId: projectId,
            examDate: '2024-12-20T13:00',
            location: 'ห้องประชุมใหญ่ อาคารวิศวกรรม',
            projectReport: 'Smart_Warehouse_Management_System_Final_Report.pdf',
            presentationFile: 'AI_Warehouse_Presentation_Final.pdf',
            status: 'completed',
            result: 'passed',
            score: '88',
            comments: 'โครงงานสำเร็จตามเป้าหมายที่วางไว้ มีการพัฒนาระบบที่สมบูรณ์และสามารถใช้งานได้จริง นักศึกษาแสดงความเข้าใจในเทคโนโลยีที่ใช้ได้เป็นอย่างดี',
            recommendations: 'ควรพัฒนาต่อในส่วนของ Machine Learning เพื่อเพิ่มความแม่นยำในการพยากรณ์ และเพิ่มระบบ Security ให้มีความแข็งแกร่งมากขึ้น',
            notes: 'การสอบจบเสร็จสิ้นแล้ว นักศึกษาได้ผ่านการสอบจบและได้รับคะแนนดีเยี่ยม',
            createdAt: '2024-12-10',
            completedAt: '2024-12-20'
        };
    }

    setupEventListeners() {
        // Set minimum date for topic exam (today)
        const today = new Date();
        today.setHours(today.getHours() + 1); // Add 1 hour buffer
        document.getElementById('topicExamDate').min = today.toISOString().slice(0, 16);
        document.getElementById('finalExamDate').min = today.toISOString().slice(0, 16);

        // Check if project progress is 100% to enable final exam button
        this.checkFinalExamEligibility();
    }

    checkFinalExamEligibility() {
        const finalExamBtn = document.getElementById('finalExamBtn');
        if (this.currentProject && this.currentProject.overallProgress >= 100) {
            finalExamBtn.disabled = false;
            finalExamBtn.innerHTML = '<i class="fa-solid fa-plus me-1"></i>ยื่นสอบจบ';
        } else {
            finalExamBtn.disabled = true;
            finalExamBtn.innerHTML = '<i class="fa-solid fa-lock me-1"></i>ต้องความก้าวหน้า 100%';
        }
    }

    renderTopicExamContent() {
        const container = document.getElementById('topicExamContent');
        
        if (!this.topicExamData) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="fa-solid fa-graduation-cap fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">ยังไม่ได้กำหนดการสอบหัวข้อ</h5>
                    <p class="text-muted">กรุณากดปุ่ม "จัดการสอบหัวข้อ" เพื่อกำหนดการสอบหัวข้อ</p>
                </div>
            `;
            return;
        }

        const statusConfig = this.getExamStatusConfig(this.topicExamData.status);
        const resultConfig = this.getExamResultConfig(this.topicExamData.result);
        
        container.innerHTML = `
            <div class="exam-info-card">
                <div class="row">
                    <div class="col-md-8">
                        <div class="exam-details">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <h6 class="mb-0">ข้อมูลการสอบหัวข้อ</h6>
                                <span class="badge ${statusConfig.badgeClass}">${statusConfig.label}</span>
                            </div>
                            
                            <div class="row g-3 mb-3">
                                <div class="col-md-6">
                                    <strong>วันที่สอบ:</strong><br>
                                    <i class="fa-solid fa-calendar me-1"></i>
                                    ${this.formatDateTime(this.topicExamData.examDate)}
                                </div>
                                <div class="col-md-6">
                                    <strong>สถานที่สอบ:</strong><br>
                                    <i class="fa-solid fa-map-marker-alt me-1"></i>
                                    ${this.topicExamData.location}
                                </div>
                            </div>
                            
                            <div class="committee-section mb-3">
                                <h6 class="mb-2">กรรมการสอบ</h6>
                                <div class="row g-2">
                                    ${this.topicExamData.committee.map(member => `
                                        <div class="col-md-6">
                                            <div class="committee-member p-2 border rounded bg-light">
                                                <div class="fw-medium">${member.name}</div>
                                                <small class="text-muted">${member.role}</small>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            ${this.topicExamData.notes ? `
                                <div class="notes-section mb-3">
                                    <h6 class="mb-2">หมายเหตุ</h6>
                                    <p class="text-muted">${this.topicExamData.notes}</p>
                                </div>
                            ` : ''}
                            
                            ${this.topicExamData.result ? `
                                <div class="result-section">
                                    <h6 class="mb-2">ผลการสอบ</h6>
                                    <div class="alert ${resultConfig.alertClass}">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span><strong>${resultConfig.label}</strong></span>
                                            ${this.topicExamData.score ? `<span>คะแนน: ${this.topicExamData.score}</span>` : ''}
                                        </div>
                                        ${this.topicExamData.comments ? `<p class="mb-0 mt-2">${this.topicExamData.comments}</p>` : ''}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="exam-actions">
                            <div class="d-grid gap-2">
                                ${!this.topicExamData.result ? `
                                    <button class="btn btn-outline-primary btn-sm" onclick="editTopicExam()">
                                        <i class="fa-solid fa-edit me-1"></i>แก้ไขข้อมูล
                                    </button>
                                    <button class="btn btn-outline-success btn-sm" onclick="openExamResultModal('topic', ${this.topicExamData.id})">
                                        <i class="fa-solid fa-check me-1"></i>บันทึกผลการสอบ
                                    </button>
                                ` : `
                                    <button class="btn btn-outline-info btn-sm" onclick="viewExamDetails('topic')">
                                        <i class="fa-solid fa-eye me-1"></i>ดูรายละเอียด
                                    </button>
                                `}
                                <button class="btn btn-outline-danger btn-sm" onclick="deleteTopicExam()">
                                    <i class="fa-solid fa-trash me-1"></i>ลบข้อมูล
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderFinalExamContent() {
        const container = document.getElementById('finalExamContent');
        
        if (!this.finalExamData) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="fa-solid fa-certificate fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">ยังไม่ได้ยื่นสอบจบ</h5>
                    <p class="text-muted">เมื่อความก้าวหน้าถึง 100% จะสามารถยื่นสอบจบได้</p>
                </div>
            `;
            return;
        }

        const statusConfig = this.getExamStatusConfig(this.finalExamData.status);
        const resultConfig = this.getExamResultConfig(this.finalExamData.result);
        
        container.innerHTML = `
            <div class="exam-info-card">
                <div class="row">
                    <div class="col-md-8">
                        <div class="exam-details">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <h6 class="mb-0">ข้อมูลการสอบจบ</h6>
                                <span class="badge ${statusConfig.badgeClass}">${statusConfig.label}</span>
                            </div>
                            
                            <div class="row g-3 mb-3">
                                <div class="col-md-6">
                                    <strong>วันที่สอบ:</strong><br>
                                    <i class="fa-solid fa-calendar me-1"></i>
                                    ${this.formatDateTime(this.finalExamData.examDate)}
                                </div>
                                <div class="col-md-6">
                                    <strong>สถานที่สอบ:</strong><br>
                                    <i class="fa-solid fa-map-marker-alt me-1"></i>
                                    ${this.finalExamData.location}
                                </div>
                            </div>
                            
                            <div class="files-section mb-3">
                                <h6 class="mb-2">ไฟล์ที่อัปโหลด</h6>
                                <div class="row g-2">
                                    <div class="col-md-6">
                                        <div class="file-item p-2 border rounded bg-light">
                                            <i class="fa-solid fa-file-pdf me-2 text-danger"></i>
                                            <span>${this.finalExamData.projectReport}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="file-item p-2 border rounded bg-light">
                                            <i class="fa-solid fa-file-pdf me-2 text-danger"></i>
                                            <span>${this.finalExamData.presentationFile}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            ${this.finalExamData.notes ? `
                                <div class="notes-section mb-3">
                                    <h6 class="mb-2">หมายเหตุ</h6>
                                    <p class="text-muted">${this.finalExamData.notes}</p>
                                </div>
                            ` : ''}
                            
                            ${this.finalExamData.result ? `
                                <div class="result-section">
                                    <h6 class="mb-2">ผลการสอบ</h6>
                                    <div class="alert ${resultConfig.alertClass}">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span><strong>${resultConfig.label}</strong></span>
                                            ${this.finalExamData.score ? `<span>คะแนน: ${this.finalExamData.score}</span>` : ''}
                                        </div>
                                        ${this.finalExamData.comments ? `<p class="mb-0 mt-2">${this.finalExamData.comments}</p>` : ''}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="exam-actions">
                            <div class="d-grid gap-2">
                                ${!this.finalExamData.result ? `
                                    <button class="btn btn-outline-primary btn-sm" onclick="editFinalExam()">
                                        <i class="fa-solid fa-edit me-1"></i>แก้ไขข้อมูล
                                    </button>
                                    <button class="btn btn-outline-success btn-sm" onclick="openExamResultModal('final', ${this.finalExamData.id})">
                                        <i class="fa-solid fa-check me-1"></i>บันทึกผลการสอบ
                                    </button>
                                ` : `
                                    <button class="btn btn-outline-info btn-sm" onclick="viewExamDetails('final')">
                                        <i class="fa-solid fa-eye me-1"></i>ดูรายละเอียด
                                    </button>
                                `}
                                <button class="btn btn-outline-danger btn-sm" onclick="deleteFinalExam()">
                                    <i class="fa-solid fa-trash me-1"></i>ลบข้อมูล
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getExamStatusConfig(status) {
        const configs = {
            'scheduled': { label: 'กำหนดแล้ว', badgeClass: 'bg-warning' },
            'completed': { label: 'เสร็จสิ้น', badgeClass: 'bg-success' },
            'cancelled': { label: 'ยกเลิก', badgeClass: 'bg-danger' }
        };
        return configs[status] || configs['scheduled'];
    }

    getExamResultConfig(result) {
        const configs = {
            'passed': { label: 'ผ่าน', alertClass: 'alert-success' },
            'failed': { label: 'ไม่ผ่าน', alertClass: 'alert-danger' },
            'conditional': { label: 'ผ่านแบบมีเงื่อนไข', alertClass: 'alert-warning' }
        };
        return configs[result] || { label: 'ยังไม่ประกาศผล', alertClass: 'alert-info' };
    }

    formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    submitTopicExam() {
        const form = document.getElementById('topicExamForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const committee = [];
        const committee1 = document.getElementById('committee1').value;
        const committee2 = document.getElementById('committee2').value;
        const committee3 = document.getElementById('committee3').value;
        const committee4 = document.getElementById('committee4').value;

        if (committee1) committee.push({ id: committee1, name: this.getAdvisorName(committee1), role: 'ประธานกรรมการ' });
        if (committee2) committee.push({ id: committee2, name: this.getAdvisorName(committee2), role: 'กรรมการ' });
        if (committee3) committee.push({ id: committee3, name: this.getAdvisorName(committee3), role: 'กรรมการ' });
        if (committee4) committee.push({ id: committee4, name: this.getAdvisorName(committee4), role: 'กรรมการ' });

        this.topicExamData = {
            id: Date.now(),
            projectId: this.currentProject.id,
            examDate: document.getElementById('topicExamDate').value,
            location: document.getElementById('topicExamLocation').value,
            committee: committee,
            status: 'scheduled',
            result: '',
            score: '',
            comments: '',
            recommendations: '',
            notes: document.getElementById('topicExamNotes').value,
            createdAt: new Date().toISOString().split('T')[0]
        };

        this.renderTopicExamContent();
        
        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('topicExamModal')).hide();
        form.reset();
        
        alert('บันทึกข้อมูลการสอบหัวข้อเรียบร้อยแล้ว');
    }

    submitFinalExam() {
        const form = document.getElementById('finalExamForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const projectReportFile = document.getElementById('projectReport').files[0];
        const presentationFile = document.getElementById('presentationFile').files[0];

        if (!projectReportFile || !presentationFile) {
            alert('กรุณาอัปโหลดไฟล์ทั้งสองไฟล์');
            return;
        }

        this.finalExamData = {
            id: Date.now(),
            projectId: this.currentProject.id,
            examDate: document.getElementById('finalExamDate').value,
            location: document.getElementById('finalExamLocation').value,
            projectReport: projectReportFile.name,
            presentationFile: presentationFile.name,
            status: 'scheduled',
            result: '',
            score: '',
            comments: '',
            recommendations: '',
            notes: document.getElementById('finalExamNotes').value,
            createdAt: new Date().toISOString().split('T')[0]
        };

        this.renderFinalExamContent();
        
        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('finalExamModal')).hide();
        form.reset();
        
        alert('ยื่นสอบจบเรียบร้อยแล้ว');
    }

    getAdvisorName(advisorId) {
        const advisors = {
            'advisor1': 'ดร. วิชัย เทคโนโลยี',
            'advisor2': 'อ. สมศรี ข้อมูล',
            'advisor3': 'ผศ. ดร. สมชาย อินเทอร์เน็ต',
            'advisor4': 'อ. สมใจ คอมพิวเตอร์',
            'advisor5': 'ดร. สมพร โปรแกรม'
        };
        return advisors[advisorId] || 'ไม่ระบุ';
    }

    openExamResultModal(examType, examId) {
        document.getElementById('examType').value = examType;
        document.getElementById('examId').value = examId;
        
        const modal = new bootstrap.Modal(document.getElementById('examResultModal'));
        modal.show();
    }

    submitExamResult() {
        const form = document.getElementById('examResultForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const examType = document.getElementById('examType').value;
        const examId = parseInt(document.getElementById('examId').value);
        const result = document.getElementById('examResult').value;
        const score = document.getElementById('examScore').value;
        const comments = document.getElementById('examComments').value;
        const recommendations = document.getElementById('examRecommendations').value;

        if (examType === 'topic' && this.topicExamData) {
            this.topicExamData.result = result;
            this.topicExamData.score = score;
            this.topicExamData.comments = comments;
            this.topicExamData.recommendations = recommendations;
            this.topicExamData.status = 'completed';
            this.renderTopicExamContent();
        } else if (examType === 'final' && this.finalExamData) {
            this.finalExamData.result = result;
            this.finalExamData.score = score;
            this.finalExamData.comments = comments;
            this.finalExamData.recommendations = recommendations;
            this.finalExamData.status = 'completed';
            this.renderFinalExamContent();
        }

        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('examResultModal')).hide();
        form.reset();
        
        alert('บันทึกผลการสอบเรียบร้อยแล้ว');
    }

    editTopicExam() {
        if (!this.topicExamData) return;

        // Fill form with existing data
        document.getElementById('topicExamDate').value = this.topicExamData.examDate;
        document.getElementById('topicExamLocation').value = this.topicExamData.location;
        document.getElementById('topicExamNotes').value = this.topicExamData.notes;

        // Set committee members
        if (this.topicExamData.committee.length > 0) {
            document.getElementById('committee1').value = this.topicExamData.committee[0].id;
        }
        if (this.topicExamData.committee.length > 1) {
            document.getElementById('committee2').value = this.topicExamData.committee[1].id;
        }
        if (this.topicExamData.committee.length > 2) {
            document.getElementById('committee3').value = this.topicExamData.committee[2].id;
        }
        if (this.topicExamData.committee.length > 3) {
            document.getElementById('committee4').value = this.topicExamData.committee[3].id;
        }

        const modal = new bootstrap.Modal(document.getElementById('topicExamModal'));
        modal.show();
    }

    editFinalExam() {
        if (!this.finalExamData) return;

        // Fill form with existing data
        document.getElementById('finalExamDate').value = this.finalExamData.examDate;
        document.getElementById('finalExamLocation').value = this.finalExamData.location;
        document.getElementById('finalExamNotes').value = this.finalExamData.notes;

        const modal = new bootstrap.Modal(document.getElementById('finalExamModal'));
        modal.show();
    }

    deleteTopicExam() {
        if (confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลการสอบหัวข้อ?')) {
            this.topicExamData = null;
            this.renderTopicExamContent();
        }
    }

    deleteFinalExam() {
        if (confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลการสอบจบ?')) {
            this.finalExamData = null;
            this.renderFinalExamContent();
        }
    }

    viewExamDetails(examType) {
        // Implementation for viewing exam details
        console.log('View exam details:', examType);
    }
}

// Global functions
function submitTopicExam() {
    examinationManager.submitTopicExam();
}

function submitFinalExam() {
    examinationManager.submitFinalExam();
}

function openExamResultModal(examType, examId) {
    examinationManager.openExamResultModal(examType, examId);
}

function submitExamResult() {
    examinationManager.submitExamResult();
}

function editTopicExam() {
    examinationManager.editTopicExam();
}

function editFinalExam() {
    examinationManager.editFinalExam();
}

function deleteTopicExam() {
    examinationManager.deleteTopicExam();
}

function deleteFinalExam() {
    examinationManager.deleteFinalExam();
}

function viewExamDetails(examType) {
    examinationManager.viewExamDetails(examType);
}

function goBack() {
    window.history.back();
}

// Initialize examination manager when page loads
let examinationManager;
document.addEventListener('DOMContentLoaded', function() {
    examinationManager = new ExaminationManager();
    
    // Update project info display
    if (examinationManager.currentProject) {
        document.getElementById('projectTitle').textContent = examinationManager.currentProject.titleThai;
        document.getElementById('projectSubtitle').textContent = examinationManager.currentProject.titleEnglish;
        document.getElementById('projectStudents').textContent = examinationManager.currentProject.students;
        document.getElementById('projectAdvisor').textContent = examinationManager.currentProject.advisor;
        document.getElementById('projectStartDate').textContent = examinationManager.currentProject.startDate;
        document.getElementById('projectEndDate').textContent = examinationManager.currentProject.endDate;
        document.getElementById('currentStatus').textContent = examinationManager.currentProject.status === 'completed' ? 'เสร็จสิ้น' : 'กำลังดำเนินการ';
        document.getElementById('currentStatus').className = examinationManager.currentProject.status === 'completed' ? 'badge bg-success fs-6' : 'badge bg-primary fs-6';
        document.getElementById('overallProgress').style.width = `${examinationManager.currentProject.overallProgress}%`;
        document.getElementById('overallProgress').textContent = `${examinationManager.currentProject.overallProgress}%`;
        document.getElementById('overallProgress').className = examinationManager.currentProject.status === 'completed' ? 'progress-bar bg-success' : 'progress-bar bg-primary';
    }
});
