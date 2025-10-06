// Statistics System JavaScript
class StatisticsManager {
    constructor() {
        this.charts = {};
        this.statisticsData = {};
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.updateStatistics();
        this.createCharts();
    }

    loadSampleData() {
        this.statisticsData = {
            projects: [
                { id: 1, type: 'special', status: 'in_progress', major: 'IT', students: 2, duration: 120, advisor: 'advisor1', year: '2567' },
                { id: 2, type: 'coop', status: 'approved', major: 'ITI', students: 1, duration: 90, advisor: 'advisor2', year: '2567' },
                { id: 3, type: 'special', status: 'proposed', major: 'IT', students: 3, duration: 0, advisor: 'advisor3', year: '2567' },
                { id: 4, type: 'special', status: 'completed', major: 'ITI', students: 1, duration: 150, advisor: 'advisor2', year: '2566' },
                { id: 5, type: 'coop', status: 'completed', major: 'IT', students: 2, duration: 100, advisor: 'advisor1', year: '2566' }
            ],
            students: [
                { id: 1, major: 'IT', year: 4, status: 'active' },
                { id: 2, major: 'IT', year: 4, status: 'active' },
                { id: 3, major: 'ITI', year: 4, status: 'active' },
                { id: 4, major: 'IT', year: 4, status: 'active' },
                { id: 5, major: 'IT', year: 4, status: 'active' },
                { id: 6, major: 'IT', year: 4, status: 'active' },
                { id: 7, major: 'IT', year: 3, status: 'active' },
                { id: 8, major: 'ITI', year: 4, status: 'graduated' }
            ],
            advisors: [
                { id: 1, position: 'assistant_professor', projects: 2 },
                { id: 2, position: 'instructor', projects: 2 },
                { id: 3, position: 'associate_professor', projects: 1 },
                { id: 4, position: 'instructor', projects: 0 },
                { id: 5, position: 'assistant_professor', projects: 0 }
            ],
            organizations: [
                { id: 1, type: 'technology', size: 'large', students: 3 },
                { id: 2, type: 'technology', size: 'medium', students: 2 },
                { id: 3, type: 'service', size: 'small', students: 1 },
                { id: 4, type: 'technology', size: 'medium', students: 2 },
                { id: 5, type: 'technology', size: 'large', students: 3 },
                { id: 6, type: 'startup', size: 'small', students: 1 }
            ]
        };
    }

    setupEventListeners() {
        // Filter dropdowns
        document.getElementById('yearFilter').addEventListener('change', (e) => {
            this.updateStatistics();
        });

        document.getElementById('semesterFilter').addEventListener('change', (e) => {
            this.updateStatistics();
        });

        document.getElementById('majorFilter').addEventListener('change', (e) => {
            this.updateStatistics();
        });

        document.getElementById('typeFilter').addEventListener('change', (e) => {
            this.updateStatistics();
        });
    }

    updateStatistics() {
        this.updateOverviewStats();
        this.updateDetailedTables();
        this.updatePerformanceMetrics();
        this.updateCharts();
    }

    updateOverviewStats() {
        const totalProjects = this.statisticsData.projects.length;
        const totalStudents = this.statisticsData.students.length;
        const totalAdvisors = this.statisticsData.advisors.length;
        const totalOrganizations = this.statisticsData.organizations.length;

        document.getElementById('totalProjects').textContent = totalProjects;
        document.getElementById('totalStudents').textContent = totalStudents;
        document.getElementById('totalAdvisors').textContent = totalAdvisors;
        document.getElementById('totalOrganizations').textContent = totalOrganizations;
    }

    updateDetailedTables() {
        this.updateStudentStatsTable();
        this.updateAdvisorStatsTable();
        this.updateOrganizationStatsTables();
    }

    updateStudentStatsTable() {
        const studentStats = this.calculateStudentStats();
        const tbody = document.getElementById('studentStatsTable');
        
        tbody.innerHTML = Object.entries(studentStats).map(([major, data]) => `
            <tr>
                <td>${data.label}</td>
                <td>${data.count}</td>
                <td>${data.percentage}%</td>
            </tr>
        `).join('');
    }

    updateAdvisorStatsTable() {
        const advisorStats = this.calculateAdvisorStats();
        const tbody = document.getElementById('advisorStatsTable');
        
        tbody.innerHTML = Object.entries(advisorStats).map(([position, data]) => `
            <tr>
                <td>${data.label}</td>
                <td>${data.count}</td>
                <td>${data.percentage}%</td>
            </tr>
        `).join('');
    }

    updateOrganizationStatsTables() {
        const orgTypeStats = this.calculateOrganizationTypeStats();
        const orgSizeStats = this.calculateOrganizationSizeStats();
        
        const typeTbody = document.getElementById('organizationTypeTable');
        typeTbody.innerHTML = Object.entries(orgTypeStats).map(([type, data]) => `
            <tr>
                <td>${data.label}</td>
                <td>${data.count}</td>
                <td>${data.percentage}%</td>
            </tr>
        `).join('');

        const sizeTbody = document.getElementById('organizationSizeTable');
        sizeTbody.innerHTML = Object.entries(orgSizeStats).map(([size, data]) => `
            <tr>
                <td>${data.label}</td>
                <td>${data.count}</td>
                <td>${data.percentage}%</td>
            </tr>
        `).join('');
    }

    updatePerformanceMetrics() {
        const avgProjectDuration = this.calculateAverageProjectDuration();
        const avgStudentPerProject = this.calculateAverageStudentsPerProject();
        const avgProjectPerAdvisor = this.calculateAverageProjectsPerAdvisor();
        const avgStudentPerOrg = this.calculateAverageStudentsPerOrganization();

        document.getElementById('avgProjectDuration').textContent = avgProjectDuration;
        document.getElementById('avgStudentPerProject').textContent = avgStudentPerProject;
        document.getElementById('avgProjectPerAdvisor').textContent = avgProjectPerAdvisor;
        document.getElementById('avgStudentPerOrg').textContent = avgStudentPerOrg;
    }

    calculateStudentStats() {
        const stats = {};
        const total = this.statisticsData.students.length;

        this.statisticsData.students.forEach(student => {
            const major = student.major;
            if (!stats[major]) {
                stats[major] = { count: 0, label: this.getMajorLabel(major) };
            }
            stats[major].count++;
        });

        Object.keys(stats).forEach(major => {
            stats[major].percentage = ((stats[major].count / total) * 100).toFixed(1);
        });

        return stats;
    }

    calculateAdvisorStats() {
        const stats = {};
        const total = this.statisticsData.advisors.length;

        this.statisticsData.advisors.forEach(advisor => {
            const position = advisor.position;
            if (!stats[position]) {
                stats[position] = { count: 0, label: this.getPositionLabel(position) };
            }
            stats[position].count++;
        });

        Object.keys(stats).forEach(position => {
            stats[position].percentage = ((stats[position].count / total) * 100).toFixed(1);
        });

        return stats;
    }

    calculateOrganizationTypeStats() {
        const stats = {};
        const total = this.statisticsData.organizations.length;

        this.statisticsData.organizations.forEach(org => {
            const type = org.type;
            if (!stats[type]) {
                stats[type] = { count: 0, label: this.getOrganizationTypeLabel(type) };
            }
            stats[type].count++;
        });

        Object.keys(stats).forEach(type => {
            stats[type].percentage = ((stats[type].count / total) * 100).toFixed(1);
        });

        return stats;
    }

    calculateOrganizationSizeStats() {
        const stats = {};
        const total = this.statisticsData.organizations.length;

        this.statisticsData.organizations.forEach(org => {
            const size = org.size;
            if (!stats[size]) {
                stats[size] = { count: 0, label: this.getOrganizationSizeLabel(size) };
            }
            stats[size].count++;
        });

        Object.keys(stats).forEach(size => {
            stats[size].percentage = ((stats[size].count / total) * 100).toFixed(1);
        });

        return stats;
    }

    calculateAverageProjectDuration() {
        const projectsWithDuration = this.statisticsData.projects.filter(p => p.duration > 0);
        if (projectsWithDuration.length === 0) return 0;
        
        const totalDuration = projectsWithDuration.reduce((sum, p) => sum + p.duration, 0);
        return Math.round(totalDuration / projectsWithDuration.length);
    }

    calculateAverageStudentsPerProject() {
        const totalStudents = this.statisticsData.projects.reduce((sum, p) => sum + p.students, 0);
        return (totalStudents / this.statisticsData.projects.length).toFixed(1);
    }

    calculateAverageProjectsPerAdvisor() {
        const totalProjects = this.statisticsData.advisors.reduce((sum, a) => sum + a.projects, 0);
        return (totalProjects / this.statisticsData.advisors.length).toFixed(1);
    }

    calculateAverageStudentsPerOrganization() {
        const totalStudents = this.statisticsData.organizations.reduce((sum, o) => sum + o.students, 0);
        return (totalStudents / this.statisticsData.organizations.length).toFixed(1);
    }

    createCharts() {
        this.createProjectStatusChart();
        this.createProjectTypeChart();
        this.createMonthlyProgressChart();
        this.createCompletionRateChart();
    }

    updateCharts() {
        if (this.charts.projectStatus) {
            this.charts.projectStatus.destroy();
        }
        if (this.charts.projectType) {
            this.charts.projectType.destroy();
        }
        if (this.charts.monthlyProgress) {
            this.charts.monthlyProgress.destroy();
        }
        if (this.charts.completionRate) {
            this.charts.completionRate.destroy();
        }
        
        this.createCharts();
    }

    createProjectStatusChart() {
        const ctx = document.getElementById('projectStatusChart').getContext('2d');
        const statusData = this.calculateProjectStatusData();
        
        this.charts.projectStatus = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: statusData.labels,
                datasets: [{
                    data: statusData.data,
                    backgroundColor: [
                        '#FFC107', // เสนอหัวข้อ
                        '#17A2B8', // อนุมัติหัวข้อ
                        '#6C757D', // สอบหัวข้อ
                        '#28A745', // ผ่านสอบหัวข้อ
                        '#007BFF', // กำลังดำเนินการ
                        '#DC3545', // สอบจบ
                        '#20C997', // เสร็จสิ้น
                        '#E83E8C'  // ไม่ผ่าน
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createProjectTypeChart() {
        const ctx = document.getElementById('projectTypeChart').getContext('2d');
        const typeData = this.calculateProjectTypeData();
        
        this.charts.projectType = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: typeData.labels,
                datasets: [{
                    data: typeData.data,
                    backgroundColor: [
                        '#007BFF', // โครงงานพิเศษ
                        '#28A745'  // สหกิจศึกษา
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createMonthlyProgressChart() {
        const ctx = document.getElementById('monthlyProgressChart').getContext('2d');
        const progressData = this.calculateMonthlyProgressData();
        
        this.charts.monthlyProgress = new Chart(ctx, {
            type: 'line',
            data: {
                labels: progressData.labels,
                datasets: [{
                    label: 'จำนวนโครงงาน',
                    data: progressData.data,
                    borderColor: '#007BFF',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createCompletionRateChart() {
        const ctx = document.getElementById('completionRateChart').getContext('2d');
        const completionRate = this.calculateCompletionRate();
        
        document.getElementById('completionRate').textContent = completionRate + '%';
        
        this.charts.completionRate = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['สำเร็จ', 'ไม่สำเร็จ'],
                datasets: [{
                    data: [completionRate, 100 - completionRate],
                    backgroundColor: ['#28A745', '#E9ECEF'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    calculateProjectStatusData() {
        const statusCounts = {};
        
        this.statisticsData.projects.forEach(project => {
            const status = project.status;
            statusCounts[status] = (statusCounts[status] || 0) + 1;
        });

        return {
            labels: Object.keys(statusCounts).map(status => this.getStatusLabel(status)),
            data: Object.values(statusCounts)
        };
    }

    calculateProjectTypeData() {
        const typeCounts = {};
        
        this.statisticsData.projects.forEach(project => {
            const type = project.type;
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        });

        return {
            labels: Object.keys(typeCounts).map(type => this.getTypeLabel(type)),
            data: Object.values(typeCounts)
        };
    }

    calculateMonthlyProgressData() {
        // Sample data for monthly progress
        const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
        const data = [2, 3, 5, 7, 9, 12, 15, 18, 20, 22, 25, 28];
        
        return {
            labels: months,
            data: data
        };
    }

    calculateCompletionRate() {
        const completedProjects = this.statisticsData.projects.filter(p => p.status === 'completed').length;
        const totalProjects = this.statisticsData.projects.length;
        return totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;
    }

    // Helper methods for labels
    getMajorLabel(major) {
        const labels = {
            'IT': 'เทคโนโลยีสารสนเทศ (IT)',
            'ITI': 'เทคโนโลยีสารสนเทศและนวัตกรรม (ITI)'
        };
        return labels[major] || major;
    }

    getPositionLabel(position) {
        const labels = {
            'professor': 'ศาสตราจารย์',
            'associate_professor': 'รองศาสตราจารย์',
            'assistant_professor': 'ผู้ช่วยศาสตราจารย์',
            'instructor': 'อาจารย์'
        };
        return labels[position] || position;
    }

    getOrganizationTypeLabel(type) {
        const labels = {
            'technology': 'เทคโนโลยี',
            'finance': 'การเงิน',
            'manufacturing': 'การผลิต',
            'service': 'บริการ',
            'government': 'รัฐวิสาหกิจ',
            'startup': 'สตาร์ทอัพ',
            'multinational': 'บริษัทข้ามชาติ'
        };
        return labels[type] || type;
    }

    getOrganizationSizeLabel(size) {
        const labels = {
            'small': 'ขนาดเล็ก (1-50 คน)',
            'medium': 'ขนาดกลาง (51-200 คน)',
            'large': 'ขนาดใหญ่ (201+ คน)'
        };
        return labels[size] || size;
    }

    getStatusLabel(status) {
        const labels = {
            'proposed': 'เสนอหัวข้อ',
            'approved': 'อนุมัติหัวข้อ',
            'topic_exam': 'สอบหัวข้อ',
            'topic_passed': 'ผ่านสอบหัวข้อ',
            'in_progress': 'กำลังดำเนินการ',
            'final_exam': 'สอบจบ',
            'completed': 'เสร็จสิ้น',
            'failed': 'ไม่ผ่าน'
        };
        return labels[status] || status;
    }

    getTypeLabel(type) {
        const labels = {
            'special': 'โครงงานพิเศษ',
            'coop': 'สหกิจศึกษา'
        };
        return labels[type] || type;
    }
}

// Global functions
function exportStatistics() {
    // Implementation for exporting statistics
    console.log('Export statistics');
    alert('ส่งออกข้อมูลสถิติเรียบร้อยแล้ว');
}

function refreshStatistics() {
    statisticsManager.updateStatistics();
    alert('รีเฟรชข้อมูลสถิติเรียบร้อยแล้ว');
}

// Initialize statistics manager when page loads
let statisticsManager;
document.addEventListener('DOMContentLoaded', function() {
    statisticsManager = new StatisticsManager();
});
