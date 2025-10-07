// Project Management System JavaScript
class ProjectManager {
    constructor() {
        this.projects = [];
        this.currentFilter = '';
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.renderProjects();
        this.updateStatusCounts();
    }

    loadSampleData() {
        this.projects = [
            {
                id: 1,
                type: 'special',
                academicYear: '2567',
                titleThai: 'ระบบจัดการคลังสินค้าอัจฉริยะด้วย IoT และ AI',
                titleEnglish: 'Smart Warehouse Management System with IoT and AI',
                description: 'ระบบจัดการคลังสินค้าที่ใช้เทคโนโลยี IoT และ AI เพื่อเพิ่มประสิทธิภาพการจัดการสินค้า',
                students: [
                    { id: '63070001', name: 'นาย วุฒิพงศ์ ว่องไว', major: 'INE' },
                    { id: '63070002', name: 'นาย ปุญญพัฒน์ตนัย มั่นคง', major: 'INE' }
                ],
                mainAdvisor: 'รศ.ดร.อนิราช มิ่งขวัญ',
                coAdvisor: '',
                organization: '',
                startDate: '2024-08-01',
                endDate: '2025-04-30',
                status: 'in_progress',
                progress: 100,
                createdAt: '2024-07-15',
                topicExamDate: '',
                topicExamResult: '',
                finalExamDate: '',
                finalExamResult: '',
                committee: [],
                weeklyProgress: [
                    { week: 1, progress: 10, comment: 'เริ่มต้นการวิเคราะห์ปัญหา', advisorComment: 'ดีมาก เริ่มต้นได้ดี', instructorComment: '', date: '2024-08-01' },
                    { week: 2, progress: 20, comment: 'ศึกษาเทคโนโลยีที่เกี่ยวข้อง', advisorComment: 'ควรศึกษาเพิ่มเติมในส่วน AI', instructorComment: '', date: '2024-08-08' },
                    { week: 3, progress: 35, comment: 'ออกแบบระบบ', advisorComment: 'การออกแบบดี แต่ควรปรับปรุงส่วน UI', instructorComment: '', date: '2024-08-15' },
                    { week: 4, progress: 50, comment: 'เริ่มพัฒนาโปรแกรม', advisorComment: 'ความก้าวหน้าดี', instructorComment: '', date: '2024-08-22' },
                    { week: 5, progress: 65, comment: 'ทดสอบระบบเบื้องต้น', advisorComment: 'ควรทดสอบเพิ่มเติม', instructorComment: '', date: '2024-08-29' },
                    { week: 6, progress: 75, comment: 'ปรับปรุงระบบ', advisorComment: 'ดีมาก', instructorComment: '', date: '2024-09-05' }
                ]
            }
        ];
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterProjects();
        });

        // Filter dropdowns
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.filterProjects();
        });

        document.getElementById('typeFilter').addEventListener('change', (e) => {
            this.filterProjects();
        });

        document.getElementById('yearFilter').addEventListener('change', (e) => {
            this.filterProjects();
        });

        // Project type change handler
        document.getElementById('projectType').addEventListener('change', (e) => {
            const organizationSection = document.getElementById('organizationSection');
            if (e.target.value === 'coop') {
                organizationSection.style.display = 'block';
                document.getElementById('organization').required = true;
            } else {
                organizationSection.style.display = 'none';
                document.getElementById('organization').required = false;
            }
        });
    }

    filterProjects() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const typeFilter = document.getElementById('typeFilter').value;
        const yearFilter = document.getElementById('yearFilter').value;

        let filteredProjects = this.projects.filter(project => {
            const matchesSearch = !searchTerm || 
                project.titleThai.toLowerCase().includes(searchTerm) ||
                project.titleEnglish.toLowerCase().includes(searchTerm) ||
                project.students.some(student => 
                    student.name.toLowerCase().includes(searchTerm) ||
                    student.id.includes(searchTerm)
                );

            const matchesStatus = !statusFilter || project.status === statusFilter;
            const matchesType = !typeFilter || project.type === typeFilter;
            const matchesYear = !yearFilter || project.academicYear === yearFilter;

            return matchesSearch && matchesStatus && matchesType && matchesYear;
        });

        this.renderProjects(filteredProjects);
    }

    filterByStatus(status) {
        this.currentFilter = status;
        
        // Update active button
        document.querySelectorAll('.btn-outline-primary, .btn-outline-warning, .btn-outline-info, .btn-outline-secondary, .btn-outline-success, .btn-outline-danger').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Update status filter dropdown
        document.getElementById('statusFilter').value = status;
        
        this.filterProjects();
    }

    clearFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('statusFilter').value = '';
        document.getElementById('typeFilter').value = '';
        document.getElementById('yearFilter').value = '';
        
        // Reset active button
        document.querySelectorAll('.btn-outline-primary, .btn-outline-warning, .btn-outline-info, .btn-outline-secondary, .btn-outline-success, .btn-outline-danger').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.btn-outline-primary').classList.add('active');
        
        this.currentFilter = '';
        this.renderProjects();
    }

    renderProjects(projectsToRender = null) {
        const projects = projectsToRender || this.projects;
        const container = document.getElementById('projectsGrid');
        
        if (projects.length === 0) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="fa-solid fa-folder-open fa-3x text-muted mb-3"></i>
                        <h5 class="text-muted">ไม่พบโครงงาน</h5>
                        <p class="text-muted">ไม่มีโครงงานที่ตรงกับเงื่อนไขการค้นหา</p>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = projects.map(project => this.createProjectCard(project)).join('');
    }

    createProjectCard(project) {
        const statusConfig = this.getStatusConfig(project.status);
        const typeConfig = this.getTypeConfig(project.type);
        const studentNames = project.students.map(s => s.name).join(', ');
        
        return `
            <div class="col-12 col-md-6 col-lg-4 d-flex">
                <div class="card project-card w-100 h-100">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <span class="badge ${typeConfig.badgeClass}">${typeConfig.label}</span>
                                <span class="badge bg-light text-dark">${project.academicYear}</span>
                            </div>
                            <div class="dropdown">
                                <button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown">
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" onclick="projectManager.viewProject(${project.id})">
                                        <i class="fa-solid fa-eye me-2"></i>ดูรายละเอียด
                                    </a></li>
                                    <li><a class="dropdown-item" href="#" onclick="projectManager.editProject(${project.id})">
                                        <i class="fa-solid fa-edit me-2"></i>แก้ไข
                                    </a></li>
                                    <li><a class="dropdown-item" href="#" onclick="projectManager.viewProgress(${project.id})">
                                        <i class="fa-solid fa-chart-line me-2"></i>ความก้าวหน้า
                                    </a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item text-danger" href="#" onclick="projectManager.deleteProject(${project.id})">
                                        <i class="fa-solid fa-trash me-2"></i>ลบ
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <h6 class="project-title mb-2">${project.titleThai}</h6>
                        <p class="project-subtitle text-muted small mb-3">${project.titleEnglish}</p>
                        
                        <div class="mb-3">
                            <span class="badge ${statusConfig.badgeClass}">${statusConfig.label}</span>
                            <span class="float-end text-muted small">${project.progress}% เสร็จสิ้น</span>
                        </div>
                        
                        <div class="mb-3">
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar ${statusConfig.progressClass}" 
                                     style="width: ${project.progress}%" 
                                     role="progressbar" 
                                     aria-valuenow="${project.progress}" 
                                     aria-valuemin="0" 
                                     aria-valuemax="100">
                                </div>
                            </div>
                        </div>
                        
                        <div class="project-meta text-muted small mb-2">
                            <div class="mb-1">
                                <i class="fa-solid fa-user me-1"></i>
                                ${studentNames}
                            </div>
                            <div class="mb-1">
                                <i class="fa-solid fa-calendar me-1"></i>
                                ${this.formatDate(project.startDate)} - ${this.formatDate(project.endDate)}
                            </div>
                            <div class="mb-1">
                                <i class="fa-solid fa-user-tie me-1"></i>
                                ${project.mainAdvisor}
                            </div>
                            ${project.organization ? `
                                <div class="mb-1">
                                    <i class="fa-solid fa-building me-1"></i>
                                    ${project.organization}
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="mt-auto">
                            <div class="d-flex gap-2">
                                <button class="btn btn-primary btn-sm flex-fill" onclick="projectManager.viewProject(${project.id})">
                                    <i class="fa-solid fa-eye me-1"></i>ดูรายละเอียด
                                </button>
                                <button class="btn btn-outline-primary btn-sm" onclick="projectManager.viewProgress(${project.id})" title="ความก้าวหน้า">
                                    <i class="fa-solid fa-chart-line"></i>
                                </button>
                                <button class="btn btn-outline-info btn-sm" onclick="projectManager.viewExamination(${project.id})" title="การสอบ">
                                    <i class="fa-solid fa-graduation-cap"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getStatusConfig(status) {
        const configs = {
            'proposed': { label: 'เสนอหัวข้อ', badgeClass: 'bg-warning', progressClass: 'bg-warning' },
            'approved': { label: 'อนุมัติหัวข้อ', badgeClass: 'bg-info', progressClass: 'bg-info' },
            'topic_exam': { label: 'สอบหัวข้อ', badgeClass: 'bg-secondary', progressClass: 'bg-secondary' },
            'topic_passed': { label: 'ผ่านสอบหัวข้อ', badgeClass: 'bg-success', progressClass: 'bg-success' },
            'in_progress': { label: 'กำลังดำเนินการ', badgeClass: 'bg-primary', progressClass: 'bg-primary' },
            'final_exam': { label: 'สอบจบ', badgeClass: 'bg-danger', progressClass: 'bg-danger' },
            'completed': { label: 'เสร็จสิ้น', badgeClass: 'bg-success', progressClass: 'bg-success' },
            'failed': { label: 'ไม่ผ่าน', badgeClass: 'bg-danger', progressClass: 'bg-danger' }
        };
        return configs[status] || configs['proposed'];
    }

    getTypeConfig(type) {
        const configs = {
            'special': { label: 'โครงงานพิเศษ', badgeClass: 'bg-info' },
            'coop': { label: 'สหกิจศึกษา', badgeClass: 'bg-success' }
        };
        return configs[type] || configs['special'];
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH');
    }

    updateStatusCounts() {
        const counts = {
            total: this.projects.length,
            proposed: this.projects.filter(p => p.status === 'proposed').length,
            approved: this.projects.filter(p => p.status === 'approved').length,
            topic_exam: this.projects.filter(p => p.status === 'topic_exam').length,
            topic_passed: this.projects.filter(p => p.status === 'topic_passed').length,
            in_progress: this.projects.filter(p => p.status === 'in_progress').length,
            final_exam: this.projects.filter(p => p.status === 'final_exam').length,
            completed: this.projects.filter(p => p.status === 'completed').length
        };

        document.getElementById('totalCount').textContent = counts.total;
        document.getElementById('proposedCount').textContent = counts.proposed;
        document.getElementById('approvedCount').textContent = counts.approved;
        document.getElementById('topicExamCount').textContent = counts.topic_exam;
        document.getElementById('topicPassedCount').textContent = counts.topic_passed;
        document.getElementById('inProgressCount').textContent = counts.in_progress;
        document.getElementById('finalExamCount').textContent = counts.final_exam;
        document.getElementById('completedCount').textContent = counts.completed;
    }

    viewProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        const modal = new bootstrap.Modal(document.getElementById('projectDetailModal'));
        document.getElementById('projectDetailModalLabel').textContent = project.titleThai;
        
        const content = document.getElementById('projectDetailContent');
        content.innerHTML = this.createProjectDetailContent(project);
        
        modal.show();
    }

    createProjectDetailContent(project) {
        const statusConfig = this.getStatusConfig(project.status);
        const typeConfig = this.getTypeConfig(project.type);
        
        return `
            <div class="row">
                <div class="col-12">
                    <div class="card mb-3">
                        <div class="card-header">
                            <h6 class="mb-0">ข้อมูลพื้นฐาน</h6>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <strong>ประเภท:</strong> ${typeConfig.label}
                                </div>
                                <div class="col-md-6">
                                    <strong>ปีการศึกษา:</strong> ${project.academicYear}
                                </div>
                                <div class="col-12">
                                    <strong>ชื่อโครงงาน (ไทย):</strong><br>
                                    ${project.titleThai}
                                </div>
                                <div class="col-12">
                                    <strong>ชื่อโครงงาน (อังกฤษ):</strong><br>
                                    ${project.titleEnglish}
                                </div>
                                <div class="col-12">
                                    <strong>รายละเอียด:</strong><br>
                                    ${project.description}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mb-3">
                        <div class="card-header">
                            <h6 class="mb-0">ข้อมูลนักศึกษา</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>รหัสนักศึกษา</th>
                                            <th>ชื่อ-นามสกุล</th>
                                            <th>สาขา</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${project.students.map(student => `
                                            <tr>
                                                <td>${student.id}</td>
                                                <td>${student.name}</td>
                                                <td>${student.major}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="card mb-3">
                        <div class="card-header">
                            <h6 class="mb-0">ข้อมูลอาจารย์ที่ปรึกษา</h6>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <strong>อาจารย์ที่ปรึกษาหลัก:</strong><br>
                                    ${project.mainAdvisor}
                                </div>
                                ${project.coAdvisor ? `
                                    <div class="col-md-6">
                                        <strong>อาจารย์ที่ปรึกษาร่วม:</strong><br>
                                        ${project.coAdvisor}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>

                    ${project.organization ? `
                        <div class="card mb-3">
                            <div class="card-header">
                                <h6 class="mb-0">ข้อมูลองค์กร</h6>
                            </div>
                            <div class="card-body">
                                <strong>องค์กร:</strong> ${project.organization}
                            </div>
                        </div>
                    ` : ''}

                    <div class="card mb-3">
                        <div class="card-header">
                            <h6 class="mb-0">สถานะและความก้าวหน้า</h6>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <strong>สถานะปัจจุบัน:</strong><br>
                                    <span class="badge ${statusConfig.badgeClass}">${statusConfig.label}</span>
                                </div>
                                <div class="col-md-6">
                                    <strong>ความก้าวหน้า:</strong><br>
                                    ${project.progress}%
                                </div>
                                <div class="col-12">
                                    <div class="progress" style="height: 10px;">
                                        <div class="progress-bar ${statusConfig.progressClass}" 
                                             style="width: ${project.progress}%" 
                                             role="progressbar" 
                                             aria-valuenow="${project.progress}" 
                                             aria-valuemin="0" 
                                             aria-valuemax="100">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <strong>วันที่เริ่มต้น:</strong><br>
                                    ${this.formatDate(project.startDate)}
                                </div>
                                <div class="col-md-6">
                                    <strong>วันที่สิ้นสุด:</strong><br>
                                    ${this.formatDate(project.endDate)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    editProject(projectId) {
        // Implementation for editing project
        console.log('Edit project:', projectId);
    }

    viewProgress(projectId) {
        // Store project ID and navigate to progress tracking page
        localStorage.setItem('currentProjectId', projectId);
        window.location.href = 'progress-tracking.html?id=' + projectId;
    }

    viewExamination(projectId) {
        // Store project ID and navigate to examination management page
        localStorage.setItem('currentProjectId', projectId);
        window.location.href = 'examination-management.html?id=' + projectId;
    }

    manageExamination() {
        // Implementation for managing examination
        console.log('Manage examination');
    }

    deleteProject(projectId) {
        if (confirm('คุณแน่ใจหรือไม่ที่จะลบโครงงานนี้?')) {
            this.projects = this.projects.filter(p => p.id !== projectId);
            this.renderProjects();
            this.updateStatusCounts();
        }
    }
}

// Global functions
function addStudent() {
    const container = document.getElementById('studentsContainer');
    const studentRow = document.createElement('div');
    studentRow.className = 'student-row mb-3 p-3 border rounded';
    studentRow.innerHTML = `
        <div class="row g-3">
            <div class="col-md-4">
                <label class="form-label">รหัสนักศึกษา</label>
                <input type="text" class="form-control student-id" placeholder="รหัสนักศึกษา" required>
            </div>
            <div class="col-md-4">
                <label class="form-label">ชื่อ-นามสกุล</label>
                <input type="text" class="form-control student-name" placeholder="ชื่อ-นามสกุล" required>
            </div>
            <div class="col-md-4">
                <label class="form-label">สาขา</label>
                <select class="form-select student-major">
                    <option value="">เลือกสาขา</option>
                    <option value="IT">เทคโนโลยีสารสนเทศ (IT)</option>
                    <option value="ITI">เทคโนโลยีสารสนเทศและนวัตกรรม (ITI)</option>
                </select>
            </div>
        </div>
        <div class="mt-2">
            <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeStudent(this)">
                <i class="fa-solid fa-trash me-1"></i>ลบนักศึกษา
            </button>
        </div>
    `;
    container.appendChild(studentRow);
}

function removeStudent(button) {
    button.closest('.student-row').remove();
}

function submitProject() {
    const form = document.getElementById('addProjectForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Collect form data
    const students = [];
    document.querySelectorAll('.student-row').forEach(row => {
        const id = row.querySelector('.student-id').value;
        const name = row.querySelector('.student-name').value;
        const major = row.querySelector('.student-major').value;
        if (id && name && major) {
            students.push({ id, name, major });
        }
    });

    const projectData = {
        id: Date.now(), // Simple ID generation
        type: document.getElementById('projectType').value,
        academicYear: document.getElementById('academicYear').value,
        titleThai: document.getElementById('projectTitleThai').value,
        titleEnglish: document.getElementById('projectTitleEnglish').value,
        description: document.getElementById('projectDescription').value,
        students: students,
        mainAdvisor: document.getElementById('mainAdvisor').value,
        coAdvisor: document.getElementById('coAdvisor').value,
        organization: document.getElementById('organization').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        status: 'proposed',
        progress: 0,
        createdAt: new Date().toISOString().split('T')[0],
        topicExamDate: '',
        topicExamResult: '',
        finalExamDate: '',
        finalExamResult: '',
        committee: [],
        weeklyProgress: []
    };

    // Add to projects array
    projectManager.projects.push(projectData);
    
    // Refresh display
    projectManager.renderProjects();
    projectManager.updateStatusCounts();
    
    // Close modal and reset form
    bootstrap.Modal.getInstance(document.getElementById('addProjectModal')).hide();
    form.reset();
    
    // Clear students container except first one
    const container = document.getElementById('studentsContainer');
    const firstRow = container.querySelector('.student-row');
    container.innerHTML = '';
    container.appendChild(firstRow);
    
    alert('เพิ่มโครงงานเรียบร้อยแล้ว');
}

// Initialize project manager when page loads
let projectManager;
document.addEventListener('DOMContentLoaded', function() {
    projectManager = new ProjectManager();
});
