// Mobile Menu Management JavaScript
class MobileMenuManager {
    constructor() {
        this.mobileMenuToggle = null;
        this.sidebar = null;
        this.sidebarOverlay = null;
        this.init();
    }

    init() {
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.sidebar = document.getElementById('sidebar');
        this.sidebarOverlay = document.getElementById('sidebarOverlay');
        
        if (this.mobileMenuToggle && this.sidebar && this.sidebarOverlay) {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Toggle sidebar on mobile
        this.mobileMenuToggle.addEventListener('click', () => {
            this.toggleSidebar();
        });
        
        // Close sidebar when clicking overlay
        this.sidebarOverlay.addEventListener('click', () => {
            this.closeSidebar();
        });
        
        // Close sidebar when clicking on a link
        const sideLinks = document.querySelectorAll('.side-link');
        sideLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeSidebar();
                }
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeSidebar();
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.sidebar.classList.contains('show')) {
                this.closeSidebar();
            }
        });
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('show');
        this.sidebarOverlay.classList.toggle('show');
        
        // Change icon
        const icon = this.mobileMenuToggle.querySelector('i');
        if (this.sidebar.classList.contains('show')) {
            icon.className = 'fa-solid fa-times';
            this.mobileMenuToggle.classList.add('active');
            // Prevent body scroll when sidebar is open
            document.body.style.overflow = 'hidden';
        } else {
            icon.className = 'fa-solid fa-bars';
            this.mobileMenuToggle.classList.remove('active');
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }

    closeSidebar() {
        this.sidebar.classList.remove('show');
        this.sidebarOverlay.classList.remove('show');
        
        // Reset icon
        const icon = this.mobileMenuToggle.querySelector('i');
        icon.className = 'fa-solid fa-bars';
        this.mobileMenuToggle.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    openSidebar() {
        this.sidebar.classList.add('show');
        this.sidebarOverlay.classList.add('show');
        
        // Change icon
        const icon = this.mobileMenuToggle.querySelector('i');
        icon.className = 'fa-solid fa-times';
        this.mobileMenuToggle.classList.add('active');
        
        // Prevent body scroll when sidebar is open
        document.body.style.overflow = 'hidden';
    }
}

// Responsive Utilities
class ResponsiveUtils {
    static isMobile() {
        return window.innerWidth <= 768;
    }

    static isTablet() {
        return window.innerWidth > 768 && window.innerWidth <= 992;
    }

    static isDesktop() {
        return window.innerWidth > 992;
    }

    static getScreenSize() {
        if (this.isMobile()) return 'mobile';
        if (this.isTablet()) return 'tablet';
        return 'desktop';
    }

    static addResizeListener(callback) {
        let timeout;
        window.addEventListener('resize', () => {
            clearTimeout(timeout);
            timeout = setTimeout(callback, 100);
        });
    }
}

// Chart Responsive Manager
class ChartResponsiveManager {
    constructor() {
        this.charts = new Map();
        this.init();
    }

    init() {
        // Listen for window resize
        ResponsiveUtils.addResizeListener(() => {
            this.resizeCharts();
        });
    }

    registerChart(chartId, chartInstance) {
        this.charts.set(chartId, chartInstance);
    }

    resizeCharts() {
        this.charts.forEach((chart, chartId) => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }

    destroyChart(chartId) {
        const chart = this.charts.get(chartId);
        if (chart && typeof chart.destroy === 'function') {
            chart.destroy();
        }
        this.charts.delete(chartId);
    }
}

// Table Responsive Manager
class TableResponsiveManager {
    constructor() {
        this.tables = new Set();
        this.init();
    }

    init() {
        // Auto-detect tables with responsive class
        const responsiveTables = document.querySelectorAll('.table-responsive');
        responsiveTables.forEach(table => {
            this.registerTable(table);
        });

        // Listen for window resize
        ResponsiveUtils.addResizeListener(() => {
            this.updateTables();
        });
    }

    registerTable(tableElement) {
        this.tables.add(tableElement);
        this.updateTable(tableElement);
    }

    updateTables() {
        this.tables.forEach(table => {
            this.updateTable(table);
        });
    }

    updateTable(tableElement) {
        const table = tableElement.querySelector('table');
        if (!table) return;

        const containerWidth = tableElement.offsetWidth;
        const tableWidth = table.scrollWidth;

        if (tableWidth > containerWidth) {
            tableElement.classList.add('table-scroll');
        } else {
            tableElement.classList.remove('table-scroll');
        }
    }
}

// Form Responsive Manager
class FormResponsiveManager {
    constructor() {
        this.forms = new Set();
        this.init();
    }

    init() {
        // Auto-detect forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            this.registerForm(form);
        });

        // Listen for window resize
        ResponsiveUtils.addResizeListener(() => {
            this.updateForms();
        });
    }

    registerForm(formElement) {
        this.forms.add(formElement);
        this.updateForm(formElement);
    }

    updateForms() {
        this.forms.forEach(form => {
            this.updateForm(form);
        });
    }

    updateForm(formElement) {
        const formGroups = formElement.querySelectorAll('.form-group, .row');
        
        formGroups.forEach(group => {
            if (ResponsiveUtils.isMobile()) {
                group.classList.add('mobile-layout');
            } else {
                group.classList.remove('mobile-layout');
            }
        });
    }
}

// Initialize all responsive managers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu manager
    window.mobileMenuManager = new MobileMenuManager();
    
    // Initialize chart responsive manager
    window.chartResponsiveManager = new ChartResponsiveManager();
    
    // Initialize table responsive manager
    window.tableResponsiveManager = new TableResponsiveManager();
    
    // Initialize form responsive manager
    window.formResponsiveManager = new FormResponsiveManager();
    
    // Add responsive classes to body
    const body = document.body;
    const updateBodyClasses = () => {
        body.className = body.className.replace(/screen-\w+/g, '');
        body.classList.add(`screen-${ResponsiveUtils.getScreenSize()}`);
    };
    
    updateBodyClasses();
    ResponsiveUtils.addResizeListener(updateBodyClasses);
});

// Export for use in other scripts
window.ResponsiveUtils = ResponsiveUtils;
window.MobileMenuManager = MobileMenuManager;
window.ChartResponsiveManager = ChartResponsiveManager;
window.TableResponsiveManager = TableResponsiveManager;
window.FormResponsiveManager = FormResponsiveManager;

