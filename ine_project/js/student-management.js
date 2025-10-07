// Student Management System JavaScript
class StudentManager {
    constructor() {
        this.students = [];
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.renderStudents();
        this.updateStatistics();
    }

    loadSampleData() {
        this.students = [
            {
                id: 1,
                studentId: '63070001',
                title: 'นาย',
                firstName: 'ธนาคาร',
                lastName: 'ดีใจ',
                fullName: 'นาย ธนาคาร ดีใจ',
                major: 'IT',
                majorLabel: 'เทคโนโลยีสารสนเทศ (IT)',
                year: 4,
                yearLabel: 'ชั้นปีที่ 4',
                gpa: 3.25,
                status: 'active',
                statusLabel: 'กำลังศึกษา',
                email: 'thanakarn.d@student.kmutnb.ac.th',
                phone: '081-234-5678',
                address: '123 ถนนสุขุมวิท กรุงเทพมหานคร 10110',
                birthDate: '2002-05-15',
                admissionYear: 2563,
                notes: 'นักศึกษาที่มีความสนใจด้าน AI และ Machine Learning',
                projectId: 1,
                projectTitle: 'ระบบจัดการคลังสินค้าอัจฉริยะด้วย IoT และ AI',
                advisorName: 'รศ.ดร.อนิราช มิ่งขวัญ',
                projectStatus: 'in_progress',
                createdAt: '2024-01-15'
            },
            {
                id: 2,
                studentId: '63070002',
                title: 'นางสาว',
                firstName: 'สุนิสา',
                lastName: 'วิทยา',
                fullName: 'นางสาว สุนิสา วิทยา',
                major: 'IT',
                majorLabel: 'เทคโนโลยีสารสนเทศ (IT)',
                year: 4,
                yearLabel: 'ชั้นปีที่ 4',
                gpa: 3.45,
                status: 'active',
                statusLabel: 'กำลังศึกษา',
                email: 'sunisa.w@student.kmutnb.ac.th',
                phone: '082-345-6789',
                address: '456 ถนนพหลโยธิน กรุงเทพมหานคร 10400',
                birthDate: '2002-08-22',
                admissionYear: 2563,
                notes: 'มีความเชี่ยวชาญด้านการพัฒนาเว็บแอปพลิเคชัน',
                projectId: 1,
                projectTitle: 'ระบบจัดการคลังสินค้าอัจฉริยะด้วย IoT และ AI',
                advisorName: 'อ.ดร.วัชรชัย คงศิริวัฒนา',
                projectStatus: 'in_progress',
                createdAt: '2024-01-15'
            },
            {
                id: 3,
                studentId: '63070003',
                title: 'นาย',
                firstName: 'ปรีชา',
                lastName: 'โปรแกรม',
                fullName: 'นาย ปรีชา โปรแกรม',
                major: 'ITI',
                majorLabel: 'เทคโนโลยีสารสนเทศและนวัตกรรม (ITI)',
                year: 4,
                yearLabel: 'ชั้นปีที่ 4',
                gpa: 3.15,
                status: 'active',
                statusLabel: 'กำลังศึกษา',
                email: 'preecha.p@student.kmutnb.ac.th',
                phone: '083-456-7890',
                address: '789 ถนนรัชดาภิเษก กรุงเทพมหานคร 10310',
                birthDate: '2002-03-10',
                admissionYear: 2563,
                notes: 'สนใจด้านการพัฒนาแอปมือถือ',
                projectId: 2,
                projectTitle: 'แอปพลิเคชันสำหรับการจัดการร้านอาหารออนไลน์',
                advisorName: 'ผศ.ดร.นิติการ นาคเจือทอง',
                projectStatus: 'approved',
                createdAt: '2024-01-20'
            },
            {
                id: 4,
                studentId: '63070004',
                title: 'นางสาว',
                firstName: 'สุดา',
                lastName: 'อัลกอริทึม',
                fullName: 'นางสาว สุดา อัลกอริทึม',
                major: 'IT',
                majorLabel: 'เทคโนโลยีสารสนเทศ (IT)',
                year: 4,
                yearLabel: 'ชั้นปีที่ 4',
                gpa: 3.65,
                status: 'active',
                statusLabel: 'กำลังศึกษา',
                email: 'suda.a@student.kmutnb.ac.th',
                phone: '084-567-8901',
                address: '321 ถนนวิภาวดีรังสิต กรุงเทพมหานคร 10200',
                birthDate: '2002-11-05',
                admissionYear: 2563,
                notes: 'มีความเชี่ยวชาญด้าน Data Science และ Machine Learning',
                projectId: 3,
                projectTitle: 'ระบบวิเคราะห์ข้อมูลการขายด้วย Machine Learning',
                advisorName: 'ผศ.สมชัย เชียงพงศ์พันธุ์',
                projectStatus: 'proposed',
                createdAt: '2024-08-30'
            },
            {
                id: 5,
                studentId: '63070005',
                title: 'นาย',
                firstName: 'สมชาย',
                lastName: 'ข้อมูล',
                fullName: 'นาย สมชาย ข้อมูล',
                major: 'IT',
                majorLabel: 'เทคโนโลยีสารสนเทศ (IT)',
                year: 4,
                yearLabel: 'ชั้นปีที่ 4',
                gpa: 3.35,
                status: 'active',
                statusLabel: 'กำลังศึกษา',
                email: 'somchai.d@student.kmutnb.ac.th',
                phone: '085-678-9012',
                address: '654 ถนนลาดพร้าว กรุงเทพมหานคร 10230',
                birthDate: '2002-07-18',
                admissionYear: 2563,
                notes: 'สนใจด้านการจัดการฐานข้อมูล',
                projectId: 3,
                projectTitle: 'ระบบวิเคราะห์ข้อมูลการขายด้วย Machine Learning',
                advisorName: 'ผศ.ดร.บีสุดา ดาวเรือง',
                projectStatus: 'proposed',
                createdAt: '2024-08-30'
            },
            {
                id: 6,
                studentId: '63070006',
                title: 'นางสาว',
                firstName: 'วิชุดา',
                lastName: 'AI',
                fullName: 'นางสาว วิชุดา AI',
                major: 'IT',
                majorLabel: 'เทคโนโลยีสารสนเทศ (IT)',
                year: 4,
                yearLabel: 'ชั้นปีที่ 4',
                gpa: 3.55,
                status: 'active',
                statusLabel: 'กำลังศึกษา',
                email: 'wichuda.ai@student.kmutnb.ac.th',
                phone: '086-789-0123',
                address: '987 ถนนบางนา กรุงเทพมหานคร 10260',
                birthDate: '2002-12-03',
                admissionYear: 2563,
                notes: 'มีความเชี่ยวชาญด้าน Artificial Intelligence',
                projectId: 3,
                projectTitle: 'ระบบวิเคราะห์ข้อมูลการขายด้วย Machine Learning',
                advisorName: 'ผศ.ดร.นิติการ นาคเจือทอง',
                projectStatus: 'proposed',
                createdAt: '2024-08-30'
            },
            {
                id: 7,
                studentId: '63070007',
                title: 'นาย',
                firstName: 'อัจฉริยะ',
                lastName: 'โค้ด',
                fullName: 'นาย อัจฉริยะ โค้ด',
                major: 'IT',
                majorLabel: 'เทคโนโลยีสารสนเทศ (IT)',
                year: 3,
                yearLabel: 'ชั้นปีที่ 3',
                gpa: 3.75,
                status: 'active',
                statusLabel: 'กำลังศึกษา',
                email: 'atchariya.c@student.kmutnb.ac.th',
                phone: '087-890-1234',
                address: '147 ถนนสุขุมวิท กรุงเทพมหานคร 10110',
                birthDate: '2003-01-20',
                admissionYear: 2564,
                notes: 'นักศึกษาที่มีความสามารถพิเศษด้านการเขียนโปรแกรม',
                projectId: null,
                projectTitle: null,
                advisorName: null,
                projectStatus: 'no_project',
                createdAt: '2024-09-01'
            },
            {
                id: 8,
                studentId: '63070008',
                title: 'นางสาว',
                firstName: 'วิภา',
                lastName: 'เว็บ',
                fullName: 'นางสาว วิภา เว็บ',
                major: 'ITI',
                majorLabel: 'เทคโนโลยีสารสนเทศและนวัตกรรม (ITI)',
                year: 4,
                yearLabel: 'ชั้นปีที่ 4',
                gpa: 3.25,
                status: 'graduated',
                statusLabel: 'จบการศึกษา',
                email: 'wipa.w@student.kmutnb.ac.th',
                phone: '088-901-2345',
                address: '258 ถนนพหลโยธิน กรุงเทพมหานคร 10400',
                birthDate: '2001-09-12',
                admissionYear: 2562,
                notes: 'จบการศึกษาแล้ว มีความเชี่ยวชาญด้าน Web Development',
                projectId: 4,
                projectTitle: 'ระบบจัดการร้านค้าออนไลน์',
                advisorName: 'อ.ดร.วัชรชัย คงศิริวัฒนา',
                projectStatus: 'completed',
                createdAt: '2024-06-15'
            }
        ];
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterStudents();
        });

        // Filter dropdowns
        document.getElementById('majorFilter').addEventListener('change', (e) => {
            this.filterStudents();
        });

        document.getElementById('yearFilter').addEventListener('change', (e) => {
            this.filterStudents();
        });

        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.filterStudents();
        });

        document.getElementById('projectStatusFilter').addEventListener('change', (e) => {
            this.filterStudents();
        });
    }

    filterStudents() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const majorFilter = document.getElementById('majorFilter').value;
        const yearFilter = document.getElementById('yearFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const projectStatusFilter = document.getElementById('projectStatusFilter').value;

        let filteredStudents = this.students.filter(student => {
            const matchesSearch = !searchTerm || 
                student.studentId.toLowerCase().includes(searchTerm) ||
                student.fullName.toLowerCase().includes(searchTerm) ||
                student.majorLabel.toLowerCase().includes(searchTerm);

            const matchesMajor = !majorFilter || student.major === majorFilter;
            const matchesYear = !yearFilter || student.year.toString() === yearFilter;
            const matchesStatus = !statusFilter || student.status === statusFilter;
            const matchesProjectStatus = !projectStatusFilter || student.projectStatus === projectStatusFilter;

            return matchesSearch && matchesMajor && matchesYear && matchesStatus && matchesProjectStatus;
        });

        this.renderStudents(filteredStudents);
    }

    clearFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('majorFilter').value = '';
        document.getElementById('yearFilter').value = '';
        document.getElementById('statusFilter').value = '';
        document.getElementById('projectStatusFilter').value = '';
        
        this.renderStudents();
    }

    renderStudents(studentsToRender = null) {
        const students = studentsToRender || this.students;
        const tbody = document.getElementById('studentsTableBody');
        
        if (students.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center py-4">
                        <i class="fa-solid fa-user-slash fa-2x text-muted mb-2"></i>
                        <div class="text-muted">ไม่พบข้อมูลนักศึกษา</div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = students.map(student => this.createStudentRow(student)).join('');
    }

    createStudentRow(student) {
        const statusConfig = this.getStatusConfig(student.status);
        const projectStatusConfig = this.getProjectStatusConfig(student.projectStatus);
        
        return `
            <tr>
                <td>
                    <div class="fw-medium">${student.studentId}</div>
                </td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="student-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 32px; height: 32px; font-size: 12px;">
                            ${student.firstName.charAt(0)}
                        </div>
                        <div>
                            <div class="fw-medium">${student.fullName}</div>
                            <small class="text-muted">${student.email}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge bg-info">${student.majorLabel}</span>
                </td>
                <td>
                    <span class="badge bg-secondary">${student.yearLabel}</span>
                </td>
                <td>
                    <span class="badge ${statusConfig.badgeClass}">${statusConfig.label}</span>
                </td>
                <td>
                    ${student.projectTitle ? `
                        <div>
                            <div class="fw-medium small">${student.projectTitle}</div>
                            <span class="badge ${projectStatusConfig.badgeClass}">${projectStatusConfig.label}</span>
                        </div>
                    ` : `
                        <span class="text-muted">ไม่มีโครงงาน</span>
                    `}
                </td>
                <td>
                    ${student.advisorName ? `
                        <div class="small">${student.advisorName}</div>
                    ` : `
                        <span class="text-muted">-</span>
                    `}
                </td>
                <td>
                    <div class="d-flex gap-1">
                        <button class="btn btn-outline-primary btn-sm" onclick="studentManager.viewStudent(${student.id})" title="ดูรายละเอียด">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="btn btn-outline-warning btn-sm" onclick="studentManager.editStudent(${student.id})" title="แก้ไข">
                            <i class="fa-solid fa-edit"></i>
                        </button>
                        <button class="btn btn-outline-danger btn-sm" onclick="studentManager.deleteStudent(${student.id})" title="ลบ">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    getStatusConfig(status) {
        const configs = {
            'active': { label: 'กำลังศึกษา', badgeClass: 'bg-success' },
            'graduated': { label: 'จบการศึกษา', badgeClass: 'bg-info' },
            'suspended': { label: 'พักการศึกษา', badgeClass: 'bg-warning' }
        };
        return configs[status] || configs['active'];
    }

    getProjectStatusConfig(status) {
        const configs = {
            'no_project': { label: 'ไม่มีโครงงาน', badgeClass: 'bg-secondary' },
            'proposed': { label: 'เสนอหัวข้อ', badgeClass: 'bg-warning' },
            'approved': { label: 'อนุมัติแล้ว', badgeClass: 'bg-info' },
            'in_progress': { label: 'กำลังดำเนินการ', badgeClass: 'bg-primary' },
            'completed': { label: 'เสร็จสิ้น', badgeClass: 'bg-success' }
        };
        return configs[status] || configs['no_project'];
    }

    updateStatistics() {
        const totalStudents = this.students.length;
        const activeStudents = this.students.filter(s => s.status === 'active').length;
        const studentsWithProjects = this.students.filter(s => s.projectId !== null).length;
        const graduatedStudents = this.students.filter(s => s.status === 'graduated').length;

        document.getElementById('totalStudents').textContent = totalStudents;
        document.getElementById('activeStudents').textContent = activeStudents;
        document.getElementById('studentsWithProjects').textContent = studentsWithProjects;
        document.getElementById('graduatedStudents').textContent = graduatedStudents;
    }

    viewStudent(studentId) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) return;

        const modal = new bootstrap.Modal(document.getElementById('studentDetailModal'));
        document.getElementById('studentDetailModalLabel').textContent = `รายละเอียด ${student.fullName}`;
        
        const content = document.getElementById('studentDetailContent');
        content.innerHTML = this.createStudentDetailContent(student);
        
        modal.show();
    }

    createStudentDetailContent(student) {
        const statusConfig = this.getStatusConfig(student.status);
        const projectStatusConfig = this.getProjectStatusConfig(student.projectStatus);
        
        return `
            <div class="row">
                <div class="col-md-8">
                    <div class="card mb-3">
                        <div class="card-header">
                            <h6 class="mb-0">ข้อมูลส่วนตัว</h6>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <strong>รหัสนักศึกษา:</strong> ${student.studentId}
                                </div>
                                <div class="col-md-6">
                                    <strong>ชื่อ-นามสกุล:</strong> ${student.fullName}
                                </div>
                                <div class="col-md-6">
                                    <strong>สาขา:</strong> ${student.majorLabel}
                                </div>
                                <div class="col-md-6">
                                    <strong>ชั้นปี:</strong> ${student.yearLabel}
                                </div>
                                <div class="col-md-6">
                                    <strong>เกรดเฉลี่ย:</strong> ${student.gpa || 'ไม่ระบุ'}
                                </div>
                                <div class="col-md-6">
                                    <strong>สถานะ:</strong> 
                                    <span class="badge ${statusConfig.badgeClass}">${statusConfig.label}</span>
                                </div>
                                <div class="col-md-6">
                                    <strong>วันเกิด:</strong> ${student.birthDate ? new Date(student.birthDate).toLocaleDateString('th-TH') : 'ไม่ระบุ'}
                                </div>
                                <div class="col-md-6">
                                    <strong>ปีที่เข้าศึกษา:</strong> ${student.admissionYear || 'ไม่ระบุ'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mb-3">
                        <div class="card-header">
                            <h6 class="mb-0">ข้อมูลการติดต่อ</h6>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <strong>อีเมล:</strong> ${student.email}
                                </div>
                                <div class="col-md-6">
                                    <strong>เบอร์โทรศัพท์:</strong> ${student.phone || 'ไม่ระบุ'}
                                </div>
                                <div class="col-12">
                                    <strong>ที่อยู่:</strong> ${student.address || 'ไม่ระบุ'}
                                </div>
                            </div>
                        </div>
                    </div>

                    ${student.projectTitle ? `
                        <div class="card mb-3">
                            <div class="card-header">
                                <h6 class="mb-0">ข้อมูลโครงงาน</h6>
                            </div>
                            <div class="card-body">
                                <div class="row g-3">
                                    <div class="col-12">
                                        <strong>ชื่อโครงงาน:</strong> ${student.projectTitle}
                                    </div>
                                    <div class="col-md-6">
                                        <strong>อาจารย์ที่ปรึกษา:</strong> ${student.advisorName}
                                    </div>
                                    <div class="col-md-6">
                                        <strong>สถานะโครงงาน:</strong> 
                                        <span class="badge ${projectStatusConfig.badgeClass}">${projectStatusConfig.label}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : ''}

                    ${student.notes ? `
                        <div class="card">
                            <div class="card-header">
                                <h6 class="mb-0">หมายเหตุ</h6>
                            </div>
                            <div class="card-body">
                                <p class="mb-0">${student.notes}</p>
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h6 class="mb-0">การดำเนินการ</h6>
                        </div>
                        <div class="card-body">
                            <div class="d-grid gap-2">
                                <button class="btn btn-outline-primary btn-sm" onclick="studentManager.editStudent(${student.id})">
                                    <i class="fa-solid fa-edit me-1"></i>แก้ไขข้อมูล
                                </button>
                                ${student.projectId ? `
                                    <button class="btn btn-outline-info btn-sm" onclick="viewProject(${student.projectId})">
                                        <i class="fa-solid fa-folder-open me-1"></i>ดูโครงงาน
                                    </button>
                                ` : `
                                    <button class="btn btn-outline-success btn-sm" onclick="assignProject(${student.id})">
                                        <i class="fa-solid fa-plus me-1"></i>กำหนดโครงงาน
                                    </button>
                                `}
                                <button class="btn btn-outline-danger btn-sm" onclick="studentManager.deleteStudent(${student.id})">
                                    <i class="fa-solid fa-trash me-1"></i>ลบนักศึกษา
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    editStudent(studentId) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) return;

        // Fill form with existing data
        document.getElementById('studentId').value = student.studentId;
        document.getElementById('studentTitle').value = student.title;
        document.getElementById('studentFirstName').value = student.firstName;
        document.getElementById('studentLastName').value = student.lastName;
        document.getElementById('studentMajor').value = student.major;
        document.getElementById('studentYear').value = student.year;
        document.getElementById('studentGPA').value = student.gpa;
        document.getElementById('studentStatus').value = student.status;
        document.getElementById('studentEmail').value = student.email;
        document.getElementById('studentPhone').value = student.phone;
        document.getElementById('studentAddress').value = student.address;
        document.getElementById('studentBirthDate').value = student.birthDate;
        document.getElementById('studentAdmissionYear').value = student.admissionYear;
        document.getElementById('studentNotes').value = student.notes;

        // Store student ID for update
        document.getElementById('addStudentForm').setAttribute('data-edit-id', studentId);

        const modal = new bootstrap.Modal(document.getElementById('addStudentModal'));
        document.getElementById('addStudentModalLabel').textContent = 'แก้ไขนักศึกษา';
        modal.show();
    }

    deleteStudent(studentId) {
        if (confirm('คุณแน่ใจหรือไม่ที่จะลบนักศึกษานี้?')) {
            this.students = this.students.filter(s => s.id !== studentId);
            this.renderStudents();
            this.updateStatistics();
        }
    }

    submitStudent() {
        const form = document.getElementById('addStudentForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const studentData = {
            id: Date.now(),
            studentId: document.getElementById('studentId').value,
            title: document.getElementById('studentTitle').value,
            firstName: document.getElementById('studentFirstName').value,
            lastName: document.getElementById('studentLastName').value,
            fullName: `${document.getElementById('studentTitle').value} ${document.getElementById('studentFirstName').value} ${document.getElementById('studentLastName').value}`,
            major: document.getElementById('studentMajor').value,
            majorLabel: document.getElementById('studentMajor').selectedOptions[0].text,
            year: parseInt(document.getElementById('studentYear').value),
            yearLabel: document.getElementById('studentYear').selectedOptions[0].text,
            gpa: parseFloat(document.getElementById('studentGPA').value) || null,
            status: document.getElementById('studentStatus').value,
            statusLabel: document.getElementById('studentStatus').selectedOptions[0].text,
            email: document.getElementById('studentEmail').value,
            phone: document.getElementById('studentPhone').value,
            address: document.getElementById('studentAddress').value,
            birthDate: document.getElementById('studentBirthDate').value,
            admissionYear: parseInt(document.getElementById('studentAdmissionYear').value) || null,
            notes: document.getElementById('studentNotes').value,
            projectId: null,
            projectTitle: null,
            advisorName: null,
            projectStatus: 'no_project',
            createdAt: new Date().toISOString().split('T')[0]
        };

        const editId = form.getAttribute('data-edit-id');
        if (editId) {
            // Update existing student
            const studentIndex = this.students.findIndex(s => s.id === parseInt(editId));
            if (studentIndex !== -1) {
                studentData.id = parseInt(editId);
                studentData.projectId = this.students[studentIndex].projectId;
                studentData.projectTitle = this.students[studentIndex].projectTitle;
                studentData.advisorName = this.students[studentIndex].advisorName;
                studentData.projectStatus = this.students[studentIndex].projectStatus;
                this.students[studentIndex] = studentData;
            }
            
            // Reset form
            form.removeAttribute('data-edit-id');
            document.getElementById('addStudentModalLabel').textContent = 'เพิ่มนักศึกษา';
        } else {
            // Add new student
            this.students.push(studentData);
        }

        this.renderStudents();
        this.updateStatistics();
        
        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('addStudentModal')).hide();
        form.reset();
        
        alert(editId ? 'แก้ไขนักศึกษาเรียบร้อยแล้ว' : 'เพิ่มนักศึกษาเรียบร้อยแล้ว');
    }

    exportStudents() {
        // Implementation for exporting students data
        console.log('Export students');
    }

    importStudents() {
        // Implementation for importing students data
        console.log('Import students');
    }
}

// Global functions
function submitStudent() {
    studentManager.submitStudent();
}

function clearFilters() {
    studentManager.clearFilters();
}

function viewProject(projectId) {
    // Navigate to project management page
    window.location.href = `project-management.html?id=${projectId}`;
}

function assignProject(studentId) {
    // Implementation for assigning project to student
    console.log('Assign project to student:', studentId);
}

// Initialize student manager when page loads
let studentManager;
document.addEventListener('DOMContentLoaded', function() {
    studentManager = new StudentManager();
});
