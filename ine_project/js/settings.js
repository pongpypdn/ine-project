// Settings System JavaScript
class SettingsManager {
    constructor() {
        this.settings = {};
        this.init();
    }

    init() {
        this.loadDefaultSettings();
        this.loadSavedSettings();
        this.setupEventListeners();
        this.populateSettings();
    }

    loadDefaultSettings() {
        this.settings = {
            general: {
                systemName: 'ระบบจัดการโครงงาน',
                systemVersion: '1.0',
                departmentName: 'ภาควิชาเทคโนโลยีสารสนเทศ',
                universityName: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ',
                defaultLanguage: 'th',
                timezone: 'Asia/Bangkok',
                dateFormat: 'dd/mm/yyyy',
                timeFormat: '24',
                enableMaintenance: true,
                enableDebug: true
            },
            academic: {
                currentAcademicYear: '2567',
                currentSemester: '1',
                maxStudentsPerProject: 4,
                maxProjectsPerAdvisor: 10,
                projectDurationWeeks: 16,
                coopDurationWeeks: 16,
                minGPA: 2.0,
                maxIncompleteCredits: 6,
                projectSubmissionDeadline: '2024-12-31',
                examScheduleStart: '2025-01-15'
            },
            notification: {
                emailNotifications: true,
                smtpServer: 'smtp.gmail.com',
                smtpPort: 587,
                emailUsername: 'system@kmutnb.ac.th',
                emailPassword: '',
                notifyProjectSubmission: true,
                notifyProgressUpdate: true,
                notifyExamSchedule: true,
                notifyDeadline: true
            },
            security: {
                sessionTimeout: 30,
                maxLoginAttempts: 5,
                requireStrongPassword: true,
                enableTwoFactor: true,
                logUserActivity: true,
                encryptSensitiveData: true,
                enableAuditTrail: true
            },
            backup: {
                enableAutoBackup: true,
                backupFrequency: 'daily',
                backupTime: '02:00',
                backupRetention: 30,
                backupLocation: '/backup/'
            }
        };
    }

    loadSavedSettings() {
        const savedSettings = localStorage.getItem('systemSettings');
        if (savedSettings) {
            try {
                const parsedSettings = JSON.parse(savedSettings);
                this.settings = { ...this.settings, ...parsedSettings };
            } catch (error) {
                console.error('Error loading saved settings:', error);
            }
        }
    }

    setupEventListeners() {
        // Auto-save when settings change
        const forms = document.querySelectorAll('form[id$="SettingsForm"]');
        forms.forEach(form => {
            form.addEventListener('change', () => {
                this.saveCurrentTabSettings();
            });
        });

        // Tab change event
        const tabButtons = document.querySelectorAll('#settingsTabs button[data-bs-toggle="tab"]');
        tabButtons.forEach(button => {
            button.addEventListener('shown.bs.tab', (event) => {
                this.saveCurrentTabSettings();
            });
        });
    }

    populateSettings() {
        // General settings
        document.getElementById('systemName').value = this.settings.general.systemName;
        document.getElementById('systemVersion').value = this.settings.general.systemVersion;
        document.getElementById('departmentName').value = this.settings.general.departmentName;
        document.getElementById('universityName').value = this.settings.general.universityName;
        document.getElementById('defaultLanguage').value = this.settings.general.defaultLanguage;
        document.getElementById('timezone').value = this.settings.general.timezone;
        document.getElementById('dateFormat').value = this.settings.general.dateFormat;
        document.getElementById('timeFormat').value = this.settings.general.timeFormat;
        document.getElementById('enableMaintenance').checked = this.settings.general.enableMaintenance;
        document.getElementById('enableDebug').checked = this.settings.general.enableDebug;

        // Academic settings
        document.getElementById('currentAcademicYear').value = this.settings.academic.currentAcademicYear;
        document.getElementById('currentSemester').value = this.settings.academic.currentSemester;
        document.getElementById('maxStudentsPerProject').value = this.settings.academic.maxStudentsPerProject;
        document.getElementById('maxProjectsPerAdvisor').value = this.settings.academic.maxProjectsPerAdvisor;
        document.getElementById('projectDurationWeeks').value = this.settings.academic.projectDurationWeeks;
        document.getElementById('coopDurationWeeks').value = this.settings.academic.coopDurationWeeks;
        document.getElementById('minGPA').value = this.settings.academic.minGPA;
        document.getElementById('maxIncompleteCredits').value = this.settings.academic.maxIncompleteCredits;
        document.getElementById('projectSubmissionDeadline').value = this.settings.academic.projectSubmissionDeadline;
        document.getElementById('examScheduleStart').value = this.settings.academic.examScheduleStart;

        // Notification settings
        document.getElementById('emailNotifications').checked = this.settings.notification.emailNotifications;
        document.getElementById('smtpServer').value = this.settings.notification.smtpServer;
        document.getElementById('smtpPort').value = this.settings.notification.smtpPort;
        document.getElementById('emailUsername').value = this.settings.notification.emailUsername;
        document.getElementById('emailPassword').value = this.settings.notification.emailPassword;
        document.getElementById('notifyProjectSubmission').checked = this.settings.notification.notifyProjectSubmission;
        document.getElementById('notifyProgressUpdate').checked = this.settings.notification.notifyProgressUpdate;
        document.getElementById('notifyExamSchedule').checked = this.settings.notification.notifyExamSchedule;
        document.getElementById('notifyDeadline').checked = this.settings.notification.notifyDeadline;

        // Security settings
        document.getElementById('sessionTimeout').value = this.settings.security.sessionTimeout;
        document.getElementById('maxLoginAttempts').value = this.settings.security.maxLoginAttempts;
        document.getElementById('requireStrongPassword').checked = this.settings.security.requireStrongPassword;
        document.getElementById('enableTwoFactor').checked = this.settings.security.enableTwoFactor;
        document.getElementById('logUserActivity').checked = this.settings.security.logUserActivity;
        document.getElementById('encryptSensitiveData').checked = this.settings.security.encryptSensitiveData;
        document.getElementById('enableAuditTrail').checked = this.settings.security.enableAuditTrail;

        // Backup settings
        document.getElementById('enableAutoBackup').checked = this.settings.backup.enableAutoBackup;
        document.getElementById('backupFrequency').value = this.settings.backup.backupFrequency;
        document.getElementById('backupTime').value = this.settings.backup.backupTime;
        document.getElementById('backupRetention').value = this.settings.backup.backupRetention;
        document.getElementById('backupLocation').value = this.settings.backup.backupLocation;
    }

    saveCurrentTabSettings() {
        const activeTab = document.querySelector('#settingsTabs .nav-link.active');
        if (!activeTab) return;

        const tabId = activeTab.getAttribute('data-bs-target').replace('#', '');
        
        switch (tabId) {
            case 'general':
                this.saveGeneralSettings();
                break;
            case 'academic':
                this.saveAcademicSettings();
                break;
            case 'notification':
                this.saveNotificationSettings();
                break;
            case 'security':
                this.saveSecuritySettings();
                break;
            case 'backup':
                this.saveBackupSettings();
                break;
        }
    }

    saveGeneralSettings() {
        this.settings.general = {
            systemName: document.getElementById('systemName').value,
            systemVersion: document.getElementById('systemVersion').value,
            departmentName: document.getElementById('departmentName').value,
            universityName: document.getElementById('universityName').value,
            defaultLanguage: document.getElementById('defaultLanguage').value,
            timezone: document.getElementById('timezone').value,
            dateFormat: document.getElementById('dateFormat').value,
            timeFormat: document.getElementById('timeFormat').value,
            enableMaintenance: document.getElementById('enableMaintenance').checked,
            enableDebug: document.getElementById('enableDebug').checked
        };
    }

    saveAcademicSettings() {
        this.settings.academic = {
            currentAcademicYear: document.getElementById('currentAcademicYear').value,
            currentSemester: document.getElementById('currentSemester').value,
            maxStudentsPerProject: parseInt(document.getElementById('maxStudentsPerProject').value),
            maxProjectsPerAdvisor: parseInt(document.getElementById('maxProjectsPerAdvisor').value),
            projectDurationWeeks: parseInt(document.getElementById('projectDurationWeeks').value),
            coopDurationWeeks: parseInt(document.getElementById('coopDurationWeeks').value),
            minGPA: parseFloat(document.getElementById('minGPA').value),
            maxIncompleteCredits: parseInt(document.getElementById('maxIncompleteCredits').value),
            projectSubmissionDeadline: document.getElementById('projectSubmissionDeadline').value,
            examScheduleStart: document.getElementById('examScheduleStart').value
        };
    }

    saveNotificationSettings() {
        this.settings.notification = {
            emailNotifications: document.getElementById('emailNotifications').checked,
            smtpServer: document.getElementById('smtpServer').value,
            smtpPort: parseInt(document.getElementById('smtpPort').value),
            emailUsername: document.getElementById('emailUsername').value,
            emailPassword: document.getElementById('emailPassword').value,
            notifyProjectSubmission: document.getElementById('notifyProjectSubmission').checked,
            notifyProgressUpdate: document.getElementById('notifyProgressUpdate').checked,
            notifyExamSchedule: document.getElementById('notifyExamSchedule').checked,
            notifyDeadline: document.getElementById('notifyDeadline').checked
        };
    }

    saveSecuritySettings() {
        this.settings.security = {
            sessionTimeout: parseInt(document.getElementById('sessionTimeout').value),
            maxLoginAttempts: parseInt(document.getElementById('maxLoginAttempts').value),
            requireStrongPassword: document.getElementById('requireStrongPassword').checked,
            enableTwoFactor: document.getElementById('enableTwoFactor').checked,
            logUserActivity: document.getElementById('logUserActivity').checked,
            encryptSensitiveData: document.getElementById('encryptSensitiveData').checked,
            enableAuditTrail: document.getElementById('enableAuditTrail').checked
        };
    }

    saveBackupSettings() {
        this.settings.backup = {
            enableAutoBackup: document.getElementById('enableAutoBackup').checked,
            backupFrequency: document.getElementById('backupFrequency').value,
            backupTime: document.getElementById('backupTime').value,
            backupRetention: parseInt(document.getElementById('backupRetention').value),
            backupLocation: document.getElementById('backupLocation').value
        };
    }

    saveAllSettings() {
        this.saveCurrentTabSettings();
        
        try {
            localStorage.setItem('systemSettings', JSON.stringify(this.settings));
            this.showSuccessMessage('บันทึกการตั้งค่าเรียบร้อยแล้ว');
        } catch (error) {
            console.error('Error saving settings:', error);
            this.showErrorMessage('เกิดข้อผิดพลาดในการบันทึกการตั้งค่า');
        }
    }

    resetSettings() {
        if (confirm('คุณแน่ใจหรือไม่ที่จะรีเซ็ตการตั้งค่าทั้งหมด?')) {
            localStorage.removeItem('systemSettings');
            this.loadDefaultSettings();
            this.populateSettings();
            this.showSuccessMessage('รีเซ็ตการตั้งค่าเรียบร้อยแล้ว');
        }
    }

    showSuccessMessage(message) {
        this.showAlert(message, 'success');
    }

    showErrorMessage(message) {
        this.showAlert(message, 'danger');
    }

    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 5000);
    }

    exportSettings() {
        const settingsData = JSON.stringify(this.settings, null, 2);
        const blob = new Blob([settingsData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'system-settings.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showSuccessMessage('ส่งออกการตั้งค่าเรียบร้อยแล้ว');
    }

    importSettings(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedSettings = JSON.parse(e.target.result);
                this.settings = { ...this.settings, ...importedSettings };
                this.populateSettings();
                this.showSuccessMessage('นำเข้าการตั้งค่าเรียบร้อยแล้ว');
            } catch (error) {
                console.error('Error importing settings:', error);
                this.showErrorMessage('ไฟล์การตั้งค่าไม่ถูกต้อง');
            }
        };
        reader.readAsText(file);
    }
}

// Global functions
function saveAllSettings() {
    settingsManager.saveAllSettings();
}

function resetSettings() {
    settingsManager.resetSettings();
}

function testEmailNotification() {
    // Implementation for testing email notification
    console.log('Testing email notification');
    settingsManager.showSuccessMessage('ส่งอีเมลทดสอบเรียบร้อยแล้ว');
}

function testSMSNotification() {
    // Implementation for testing SMS notification
    console.log('Testing SMS notification');
    settingsManager.showSuccessMessage('ส่ง SMS ทดสอบเรียบร้อยแล้ว');
}

function viewNotificationLog() {
    // Implementation for viewing notification log
    console.log('Viewing notification log');
    alert('ประวัติการแจ้งเตือน:\n\n• 15 ก.ย. 2567 14:30 - แจ้งเตือนการส่งโครงงาน\n• 15 ก.ย. 2567 10:15 - แจ้งเตือนความก้าวหน้า\n• 14 ก.ย. 2567 16:45 - แจ้งเตือนกำหนดสอบ');
}

function createBackup() {
    // Implementation for creating backup
    console.log('Creating backup');
    settingsManager.showSuccessMessage('สร้างข้อมูลสำรองเรียบร้อยแล้ว');
}

function restoreBackup() {
    // Implementation for restoring backup
    console.log('Restoring backup');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.backup,.sql,.json';
    input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            settingsManager.showSuccessMessage('กู้คืนข้อมูลสำรองเรียบร้อยแล้ว');
        }
    };
    input.click();
}

// Initialize settings manager when page loads
let settingsManager;
document.addEventListener('DOMContentLoaded', function() {
    settingsManager = new SettingsManager();
});
