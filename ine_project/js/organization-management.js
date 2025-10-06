// Organization Management System JavaScript
class OrganizationManager {
    constructor() {
        this.organizations = [];
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.renderOrganizations();
        this.updateStatistics();
    }

    loadSampleData() {
        this.organizations = [
            {
                id: 1,
                name: 'บริษัท เทคโนโลยี จำกัด',
                nameEn: 'Technology Co., Ltd.',
                type: 'technology',
                typeLabel: 'เทคโนโลยี',
                size: 'large',
                sizeLabel: 'ขนาดใหญ่ (201+ คน)',
                address: '123 ถนนสุขุมวิท กรุงเทพมหานคร 10110',
                location: 'bangkok',
                locationLabel: 'กรุงเทพมหานคร',
                phone: '02-123-4567',
                email: 'info@techcompany.co.th',
                website: 'https://www.techcompany.co.th',
                taxId: '0123456789012',
                contactName: 'นาย สมชาย เทคโนโลยี',
                contactPosition: 'ผู้จัดการฝ่ายทรัพยากรบุคคล',
                contactPhone: '02-123-4568',
                contactEmail: 'somchai@techcompany.co.th',
                maxStudents: 10,
                currentStudents: 8,
                completedStudents: 45,
                status: 'active',
                statusLabel: 'ใช้งานอยู่',
                description: 'บริษัทเทคโนโลยีชั้นนำที่พัฒนาโซลูชันซอฟต์แวร์สำหรับองค์กรขนาดใหญ่',
                specialties: ['web_development', 'mobile_development', 'ai_ml', 'cloud_computing'],
                notes: 'องค์กรที่ให้การสนับสนุนนักศึกษาอย่างดี มีประสบการณ์ในการรับนักศึกษาสหกิจ',
                createdAt: '2024-01-15'
            },
            {
                id: 2,
                name: 'บริษัท ซอฟต์แวร์ จำกัด',
                nameEn: 'Software Co., Ltd.',
                type: 'technology',
                typeLabel: 'เทคโนโลยี',
                size: 'medium',
                sizeLabel: 'ขนาดกลาง (51-200 คน)',
                address: '456 ถนนพหลโยธิน กรุงเทพมหานคร 10400',
                location: 'bangkok',
                locationLabel: 'กรุงเทพมหานคร',
                phone: '02-234-5678',
                email: 'contact@software.co.th',
                website: 'https://www.software.co.th',
                taxId: '0234567890123',
                contactName: 'นางสาว สมศรี โปรแกรม',
                contactPosition: 'หัวหน้าฝ่ายพัฒนาซอฟต์แวร์',
                contactPhone: '02-234-5679',
                contactEmail: 'somsri@software.co.th',
                maxStudents: 8,
                currentStudents: 6,
                completedStudents: 32,
                status: 'active',
                statusLabel: 'ใช้งานอยู่',
                description: 'บริษัทพัฒนาซอฟต์แวร์ที่เชี่ยวชาญด้านการพัฒนาแอปพลิเคชันมือถือและเว็บแอป',
                specialties: ['web_development', 'mobile_development', 'database'],
                notes: 'มีทีมพัฒนาที่แข็งแกร่งและพร้อมให้คำแนะนำนักศึกษา',
                createdAt: '2024-02-01'
            },
            {
                id: 3,
                name: 'บริษัท อาหารดีเด้อเจริญ จำกัด',
                nameEn: 'Food Delicious Co., Ltd.',
                type: 'service',
                typeLabel: 'บริการ',
                size: 'small',
                sizeLabel: 'ขนาดเล็ก (1-50 คน)',
                address: '789 ถนนรัชดาภิเษก กรุงเทพมหานคร 10310',
                location: 'bangkok',
                locationLabel: 'กรุงเทพมหานคร',
                phone: '02-345-6789',
                email: 'info@fooddelicious.co.th',
                website: 'https://www.fooddelicious.co.th',
                taxId: '0345678901234',
                contactName: 'นาย สมพร อาหาร',
                contactPosition: 'ผู้จัดการทั่วไป',
                contactPhone: '02-345-6790',
                contactEmail: 'somporn@fooddelicious.co.th',
                maxStudents: 5,
                currentStudents: 3,
                completedStudents: 18,
                status: 'active',
                statusLabel: 'ใช้งานอยู่',
                description: 'บริษัทที่ให้บริการด้านการจัดการร้านอาหารและระบบสั่งอาหารออนไลน์',
                specialties: ['web_development', 'mobile_development', 'data_analysis'],
                notes: 'องค์กรขนาดเล็กที่มีความยืดหยุ่นในการทำงานกับนักศึกษา',
                createdAt: '2024-03-01'
            },
            {
                id: 4,
                name: 'บริษัท ข้อมูลใหญ่ จำกัด',
                nameEn: 'Big Data Co., Ltd.',
                type: 'technology',
                typeLabel: 'เทคโนโลยี',
                size: 'medium',
                sizeLabel: 'ขนาดกลาง (51-200 คน)',
                address: '321 ถนนวิภาวดีรังสิต กรุงเทพมหานคร 10200',
                location: 'bangkok',
                locationLabel: 'กรุงเทพมหานคร',
                phone: '02-456-7890',
                email: 'info@bigdata.co.th',
                website: 'https://www.bigdata.co.th',
                taxId: '0456789012345',
                contactName: 'ดร. สมชาย ข้อมูล',
                contactPosition: 'ผู้อำนวยการฝ่ายวิจัยและพัฒนา',
                contactPhone: '02-456-7891',
                contactEmail: 'somchai@bigdata.co.th',
                maxStudents: 12,
                currentStudents: 10,
                completedStudents: 58,
                status: 'active',
                statusLabel: 'ใช้งานอยู่',
                description: 'บริษัทที่เชี่ยวชาญด้านการวิเคราะห์ข้อมูลขนาดใหญ่และ Machine Learning',
                specialties: ['data_analysis', 'ai_ml', 'cloud_computing', 'database'],
                notes: 'องค์กรที่มีความเชี่ยวชาญสูงด้าน Data Science และ AI',
                createdAt: '2024-01-20'
            },
            {
                id: 5,
                name: 'บริษัท อินเทอร์เน็ต จำกัด',
                nameEn: 'Internet Co., Ltd.',
                type: 'technology',
                typeLabel: 'เทคโนโลยี',
                size: 'large',
                sizeLabel: 'ขนาดใหญ่ (201+ คน)',
                address: '654 ถนนลาดพร้าว กรุงเทพมหานคร 10230',
                location: 'bangkok',
                locationLabel: 'กรุงเทพมหานคร',
                phone: '02-567-8901',
                email: 'info@internet.co.th',
                website: 'https://www.internet.co.th',
                taxId: '0567890123456',
                contactName: 'นางสาว สมใจ เครือข่าย',
                contactPosition: 'ผู้จัดการฝ่ายเทคโนโลยี',
                contactPhone: '02-567-8902',
                contactEmail: 'somjai@internet.co.th',
                maxStudents: 15,
                currentStudents: 12,
                completedStudents: 67,
                status: 'active',
                statusLabel: 'ใช้งานอยู่',
                description: 'บริษัทที่ให้บริการด้านระบบเครือข่ายและความปลอดภัยไซเบอร์',
                specialties: ['cybersecurity', 'cloud_computing', 'iot', 'web_development'],
                notes: 'องค์กรที่มีความเชี่ยวชาญด้านระบบเครือข่ายและความปลอดภัย',
                createdAt: '2024-02-15'
            },
            {
                id: 6,
                name: 'บริษัท สตาร์ทอัพ จำกัด',
                nameEn: 'Startup Co., Ltd.',
                type: 'startup',
                typeLabel: 'สตาร์ทอัพ',
                size: 'small',
                sizeLabel: 'ขนาดเล็ก (1-50 คน)',
                address: '987 ถนนบางนา กรุงเทพมหานคร 10260',
                location: 'bangkok',
                locationLabel: 'กรุงเทพมหานคร',
                phone: '02-678-9012',
                email: 'info@startup.co.th',
                website: 'https://www.startup.co.th',
                taxId: '0678901234567',
                contactName: 'นาย สมบูรณ์ นวัตกรรม',
                contactPosition: 'ผู้ก่อตั้งและซีอีโอ',
                contactPhone: '02-678-9013',
                contactEmail: 'sombun@startup.co.th',
                maxStudents: 3,
                currentStudents: 2,
                completedStudents: 8,
                status: 'pending',
                statusLabel: 'รอการอนุมัติ',
                description: 'สตาร์ทอัพที่พัฒนาแอปพลิเคชันสำหรับการจัดการธุรกิจขนาดเล็ก',
                specialties: ['mobile_development', 'web_development', 'ai_ml'],
                notes: 'สตาร์ทอัพใหม่ที่กำลังเติบโต มีความยืดหยุ่นในการทำงาน',
                createdAt: '2024-09-01'
            }
        ];
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterOrganizations();
        });

        // Filter dropdowns
        document.getElementById('typeFilter').addEventListener('change', (e) => {
            this.filterOrganizations();
        });

        document.getElementById('sizeFilter').addEventListener('change', (e) => {
            this.filterOrganizations();
        });

        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.filterOrganizations();
        });

        document.getElementById('locationFilter').addEventListener('change', (e) => {
            this.filterOrganizations();
        });
    }

    filterOrganizations() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const typeFilter = document.getElementById('typeFilter').value;
        const sizeFilter = document.getElementById('sizeFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const locationFilter = document.getElementById('locationFilter').value;

        let filteredOrganizations = this.organizations.filter(org => {
            const matchesSearch = !searchTerm || 
                org.name.toLowerCase().includes(searchTerm) ||
                org.typeLabel.toLowerCase().includes(searchTerm) ||
                org.specialties.some(specialty => 
                    this.getSpecialtyLabel(specialty).toLowerCase().includes(searchTerm)
                );

            const matchesType = !typeFilter || org.type === typeFilter;
            const matchesSize = !sizeFilter || org.size === sizeFilter;
            const matchesStatus = !statusFilter || org.status === statusFilter;
            const matchesLocation = !locationFilter || org.location === locationFilter;

            return matchesSearch && matchesType && matchesSize && matchesStatus && matchesLocation;
        });

        this.renderOrganizations(filteredOrganizations);
    }

    clearFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('typeFilter').value = '';
        document.getElementById('sizeFilter').value = '';
        document.getElementById('statusFilter').value = '';
        document.getElementById('locationFilter').value = '';
        
        this.renderOrganizations();
    }

    renderOrganizations(organizationsToRender = null) {
        const organizations = organizationsToRender || this.organizations;
        const container = document.getElementById('organizationsGrid');
        
        if (organizations.length === 0) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="fa-solid fa-building fa-3x text-muted mb-3"></i>
                        <h5 class="text-muted">ไม่พบองค์กร</h5>
                        <p class="text-muted">ไม่มีองค์กรที่ตรงกับเงื่อนไขการค้นหา</p>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = organizations.map(org => this.createOrganizationCard(org)).join('');
    }

    createOrganizationCard(org) {
        const statusConfig = this.getStatusConfig(org.status);
        const specialties = org.specialties.map(s => this.getSpecialtyLabel(s));
        
        return `
            <div class="col-12 col-md-6 col-lg-4 d-flex">
                <div class="card organization-card w-100 h-100">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex align-items-start mb-3">
                            <div class="me-3">
                                <div class="organization-avatar bg-primary text-white d-flex align-items-center justify-content-center" style="width:56px;height:56px;font-size:20px;">
                                    <i class="fa-solid fa-building"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <div class="d-flex align-items-start">
                                    <div>
                                        <h5 class="mb-0">${org.name}</h5>
                                        <div class="text-muted">${org.typeLabel}</div>
                                    </div>
                                    <div class="ms-auto dropdown">
                                        <button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#" onclick="organizationManager.viewOrganization(${org.id})">
                                                <i class="fa-solid fa-eye me-2"></i>ดูรายละเอียด
                                            </a></li>
                                            <li><a class="dropdown-item" href="#" onclick="organizationManager.editOrganization(${org.id})">
                                                <i class="fa-solid fa-edit me-2"></i>แก้ไข
                                            </a></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><a class="dropdown-item text-danger" href="#" onclick="organizationManager.deleteOrganization(${org.id})">
                                                <i class="fa-solid fa-trash me-2"></i>ลบ
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row g-3 mb-3">
                            <div class="col-12">
                                <p class="mb-1"><i class="fa-solid fa-map-marker-alt me-2"></i>${org.locationLabel}</p>
                                <p class="mb-1"><i class="fa-solid fa-phone me-2"></i>${org.phone}</p>
                                <p class="mb-0"><i class="fa-solid fa-envelope me-2"></i>${org.email}</p>
                            </div>
                        </div>

                        <div class="mb-3">
                            <div class="mb-2">ความเชี่ยวชาญ</div>
                            <div class="d-flex flex-wrap gap-1">
                                ${specialties.slice(0, 3).map(specialty => `
                                    <span class="badge bg-light text-dark">${specialty}</span>
                                `).join('')}
                                ${specialties.length > 3 ? `<span class="badge bg-secondary">+${specialties.length - 3}</span>` : ''}
                            </div>
                        </div>

                        <div class="d-flex justify-content-between align-items-center pt-3 border-top mb-3">
                            <div class="text-center">
                                <div class="text-muted small">นักศึกษาปัจจุบัน</div>
                                <div class="fw-semibold text-primary">${org.currentStudents}</div>
                            </div>
                            <div class="text-center">
                                <div class="text-muted small">นักศึกษาเสร็จสิ้น</div>
                                <div class="fw-semibold text-success">${org.completedStudents}</div>
                            </div>
                            <div class="text-center">
                                <div class="text-muted small">สูงสุด</div>
                                <div class="fw-semibold text-info">${org.maxStudents}</div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="badge ${statusConfig.badgeClass}">${statusConfig.label}</span>
                                <span class="badge bg-secondary">${org.sizeLabel}</span>
                            </div>
                        </div>

                        <div class="mt-auto">
                            <div class="d-flex gap-2">
                                <button class="btn btn-primary btn-sm flex-fill" onclick="organizationManager.viewOrganization(${org.id})">
                                    <i class="fa-solid fa-eye me-1"></i>ดูรายละเอียด
                                </button>
                                <button class="btn btn-outline-primary btn-sm" onclick="organizationManager.editOrganization(${org.id})">
                                    <i class="fa-solid fa-edit"></i>
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
            'active': { label: 'ใช้งานอยู่', badgeClass: 'bg-success' },
            'inactive': { label: 'ไม่ใช้งาน', badgeClass: 'bg-secondary' },
            'pending': { label: 'รอการอนุมัติ', badgeClass: 'bg-warning' }
        };
        return configs[status] || configs['active'];
    }

    getSpecialtyLabel(specialty) {
        const labels = {
            'web_development': 'Web Development',
            'mobile_development': 'Mobile Development',
            'data_analysis': 'Data Analysis',
            'ai_ml': 'AI & Machine Learning',
            'cybersecurity': 'Cybersecurity',
            'cloud_computing': 'Cloud Computing',
            'database': 'Database',
            'iot': 'IoT'
        };
        return labels[specialty] || specialty;
    }

    updateStatistics() {
        const totalOrganizations = this.organizations.length;
        const activeOrganizations = this.organizations.filter(o => o.status === 'active').length;
        const currentProjects = this.organizations.reduce((sum, o) => sum + o.currentStudents, 0);
        const completedProjects = this.organizations.reduce((sum, o) => sum + o.completedStudents, 0);

        document.getElementById('totalOrganizations').textContent = totalOrganizations;
        document.getElementById('activeOrganizations').textContent = activeOrganizations;
        document.getElementById('currentProjects').textContent = currentProjects;
        document.getElementById('completedProjects').textContent = completedProjects;
    }

    viewOrganization(orgId) {
        const org = this.organizations.find(o => o.id === orgId);
        if (!org) return;

        const modal = new bootstrap.Modal(document.getElementById('organizationDetailModal'));
        document.getElementById('organizationDetailModalLabel').textContent = `รายละเอียด ${org.name}`;
        
        const content = document.getElementById('organizationDetailContent');
        content.innerHTML = this.createOrganizationDetailContent(org);
        
        modal.show();
    }

    createOrganizationDetailContent(org) {
        const statusConfig = this.getStatusConfig(org.status);
        const specialties = org.specialties.map(s => this.getSpecialtyLabel(s));
        
        return `
            <div class="row">
                <div class="col-md-8">
                    <div class="card mb-3">
                        <div class="card-header">
                            <h6 class="mb-0">ข้อมูลองค์กร</h6>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <strong>ชื่อองค์กร:</strong> ${org.name}
                                </div>
                                <div class="col-md-6">
                                    <strong>ชื่อภาษาอังกฤษ:</strong> ${org.nameEn}
                                </div>
                                <div class="col-md-6">
                                    <strong>ประเภท:</strong> ${org.typeLabel}
                                </div>
                                <div class="col-md-6">
                                    <strong>ขนาด:</strong> ${org.sizeLabel}
                                </div>
                                <div class="col-md-6">
                                    <strong>สถานะ:</strong> 
                                    <span class="badge ${statusConfig.badgeClass}">${statusConfig.label}</span>
                                </div>
                                <div class="col-md-6">
                                    <strong>พื้นที่:</strong> ${org.locationLabel}
                                </div>
                                <div class="col-12">
                                    <strong>ที่อยู่:</strong> ${org.address}
                                </div>
                                <div class="col-md-6">
                                    <strong>เบอร์โทรศัพท์:</strong> ${org.phone}
                                </div>
                                <div class="col-md-6">
                                    <strong>อีเมล:</strong> ${org.email}
                                </div>
                                <div class="col-md-6">
                                    <strong>เว็บไซต์:</strong> 
                                    ${org.website ? `<a href="${org.website}" target="_blank">${org.website}</a>` : 'ไม่ระบุ'}
                                </div>
                                <div class="col-md-6">
                                    <strong>เลขประจำตัวผู้เสียภาษี:</strong> ${org.taxId || 'ไม่ระบุ'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mb-3">
                        <div class="card-header">
                            <h6 class="mb-0">ผู้ติดต่อ</h6>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <strong>ชื่อผู้ติดต่อ:</strong> ${org.contactName}
                                </div>
                                <div class="col-md-6">
                                    <strong>ตำแหน่ง:</strong> ${org.contactPosition}
                                </div>
                                <div class="col-md-6">
                                    <strong>เบอร์โทรศัพท์:</strong> ${org.contactPhone || 'ไม่ระบุ'}
                                </div>
                                <div class="col-md-6">
                                    <strong>อีเมล:</strong> ${org.contactEmail || 'ไม่ระบุ'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mb-3">
                        <div class="card-header">
                            <h6 class="mb-0">ความเชี่ยวชาญ</h6>
                        </div>
                        <div class="card-body">
                            <div class="d-flex flex-wrap gap-2">
                                ${specialties.map(specialty => `
                                    <span class="badge bg-primary">${specialty}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    ${org.description ? `
                        <div class="card mb-3">
                            <div class="card-header">
                                <h6 class="mb-0">รายละเอียดองค์กร</h6>
                            </div>
                            <div class="card-body">
                                <p class="mb-0">${org.description}</p>
                            </div>
                        </div>
                    ` : ''}

                    ${org.notes ? `
                        <div class="card">
                            <div class="card-header">
                                <h6 class="mb-0">หมายเหตุ</h6>
                            </div>
                            <div class="card-body">
                                <p class="mb-0">${org.notes}</p>
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="col-md-4">
                    <div class="card mb-3">
                        <div class="card-header">
                            <h6 class="mb-0">สถิติการรับนักศึกษา</h6>
                        </div>
                        <div class="card-body">
                            <div class="row g-3 text-center">
                                <div class="col-6">
                                    <div class="fw-bold text-primary fs-4">${org.currentStudents}</div>
                                    <div class="text-muted small">นักศึกษาปัจจุบัน</div>
                                </div>
                                <div class="col-6">
                                    <div class="fw-bold text-success fs-4">${org.completedStudents}</div>
                                    <div class="text-muted small">นักศึกษาเสร็จสิ้น</div>
                                </div>
                                <div class="col-12">
                                    <div class="fw-bold text-info fs-4">${org.maxStudents}</div>
                                    <div class="text-muted small">จำนวนสูงสุดที่รับ</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h6 class="mb-0">การดำเนินการ</h6>
                        </div>
                        <div class="card-body">
                            <div class="d-grid gap-2">
                                <button class="btn btn-outline-primary btn-sm" onclick="organizationManager.editOrganization(${org.id})">
                                    <i class="fa-solid fa-edit me-1"></i>แก้ไขข้อมูล
                                </button>
                                <button class="btn btn-outline-info btn-sm" onclick="viewStudents(${org.id})">
                                    <i class="fa-solid fa-users me-1"></i>ดูนักศึกษา
                                </button>
                                <button class="btn btn-outline-success btn-sm" onclick="assignStudent(${org.id})">
                                    <i class="fa-solid fa-user-plus me-1"></i>กำหนดนักศึกษา
                                </button>
                                <button class="btn btn-outline-danger btn-sm" onclick="organizationManager.deleteOrganization(${org.id})">
                                    <i class="fa-solid fa-trash me-1"></i>ลบองค์กร
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    editOrganization(orgId) {
        const org = this.organizations.find(o => o.id === orgId);
        if (!org) return;

        // Fill form with existing data
        document.getElementById('orgName').value = org.name;
        document.getElementById('orgNameEn').value = org.nameEn;
        document.getElementById('orgType').value = org.type;
        document.getElementById('orgSize').value = org.size;
        document.getElementById('orgAddress').value = org.address;
        document.getElementById('orgLocation').value = org.location;
        document.getElementById('orgPhone').value = org.phone;
        document.getElementById('orgEmail').value = org.email;
        document.getElementById('orgWebsite').value = org.website;
        document.getElementById('orgTaxId').value = org.taxId;
        document.getElementById('contactName').value = org.contactName;
        document.getElementById('contactPosition').value = org.contactPosition;
        document.getElementById('contactPhone').value = org.contactPhone;
        document.getElementById('contactEmail').value = org.contactEmail;
        document.getElementById('orgMaxStudents').value = org.maxStudents;
        document.getElementById('orgStatus').value = org.status;
        document.getElementById('orgDescription').value = org.description;
        document.getElementById('orgNotes').value = org.notes;

        // Set specialties
        org.specialties.forEach(specialty => {
            const checkbox = document.getElementById(`specialty${specialty.charAt(0).toUpperCase() + specialty.slice(1)}`);
            if (checkbox) checkbox.checked = true;
        });

        // Store organization ID for update
        document.getElementById('addOrganizationForm').setAttribute('data-edit-id', orgId);

        const modal = new bootstrap.Modal(document.getElementById('addOrganizationModal'));
        document.getElementById('addOrganizationModalLabel').textContent = 'แก้ไของค์กร';
        modal.show();
    }

    deleteOrganization(orgId) {
        if (confirm('คุณแน่ใจหรือไม่ที่จะลบองค์กรนี้?')) {
            this.organizations = this.organizations.filter(o => o.id !== orgId);
            this.renderOrganizations();
            this.updateStatistics();
        }
    }

    submitOrganization() {
        const form = document.getElementById('addOrganizationForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Get selected specialties
        const specialties = [];
        const specialtyCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        specialtyCheckboxes.forEach(checkbox => {
            specialties.push(checkbox.value);
        });

        const orgData = {
            id: Date.now(),
            name: document.getElementById('orgName').value,
            nameEn: document.getElementById('orgNameEn').value,
            type: document.getElementById('orgType').value,
            typeLabel: document.getElementById('orgType').selectedOptions[0].text,
            size: document.getElementById('orgSize').value,
            sizeLabel: document.getElementById('orgSize').selectedOptions[0].text,
            address: document.getElementById('orgAddress').value,
            location: document.getElementById('orgLocation').value,
            locationLabel: document.getElementById('orgLocation').selectedOptions[0].text,
            phone: document.getElementById('orgPhone').value,
            email: document.getElementById('orgEmail').value,
            website: document.getElementById('orgWebsite').value,
            taxId: document.getElementById('orgTaxId').value,
            contactName: document.getElementById('contactName').value,
            contactPosition: document.getElementById('contactPosition').value,
            contactPhone: document.getElementById('contactPhone').value,
            contactEmail: document.getElementById('contactEmail').value,
            maxStudents: parseInt(document.getElementById('orgMaxStudents').value),
            currentStudents: 0,
            completedStudents: 0,
            status: document.getElementById('orgStatus').value,
            statusLabel: document.getElementById('orgStatus').selectedOptions[0].text,
            description: document.getElementById('orgDescription').value,
            specialties: specialties,
            notes: document.getElementById('orgNotes').value,
            createdAt: new Date().toISOString().split('T')[0]
        };

        const editId = form.getAttribute('data-edit-id');
        if (editId) {
            // Update existing organization
            const orgIndex = this.organizations.findIndex(o => o.id === parseInt(editId));
            if (orgIndex !== -1) {
                orgData.id = parseInt(editId);
                orgData.currentStudents = this.organizations[orgIndex].currentStudents;
                orgData.completedStudents = this.organizations[orgIndex].completedStudents;
                this.organizations[orgIndex] = orgData;
            }
            
            // Reset form
            form.removeAttribute('data-edit-id');
            document.getElementById('addOrganizationModalLabel').textContent = 'เพิ่มองค์กร';
        } else {
            // Add new organization
            this.organizations.push(orgData);
        }

        this.renderOrganizations();
        this.updateStatistics();
        
        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('addOrganizationModal')).hide();
        form.reset();
        
        alert(editId ? 'แก้ไของค์กรเรียบร้อยแล้ว' : 'เพิ่มองค์กรเรียบร้อยแล้ว');
    }
}

// Global functions
function submitOrganization() {
    organizationManager.submitOrganization();
}

function clearFilters() {
    organizationManager.clearFilters();
}

function viewStudents(orgId) {
    // Implementation for viewing students assigned to organization
    console.log('View students for organization:', orgId);
}

function assignStudent(orgId) {
    // Implementation for assigning student to organization
    console.log('Assign student to organization:', orgId);
}

// Initialize organization manager when page loads
let organizationManager;
document.addEventListener('DOMContentLoaded', function() {
    organizationManager = new OrganizationManager();
});
