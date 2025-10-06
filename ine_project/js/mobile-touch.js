// Enhanced Mobile Touch Handler
class MobileTouchHandler {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.touchStartY = 0;
        this.touchStartX = 0;
        this.init();
    }

    init() {
        this.setupTouchEvents();
        this.setupMobileMenu();
        this.setupFormHandling();
        this.setupButtonHandling();
        this.setupScrollHandling();
    }

    setupTouchEvents() {
        // Prevent default touch behaviors that interfere with custom handling
        document.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
            this.touchStartX = e.touches[0].clientX;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            // Allow scrolling but prevent zoom
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });

        // Handle touch end events
        document.addEventListener('touchend', (e) => {
            this.handleTouchEnd(e);
        }, { passive: true });
    }

    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        if (!mobileMenuToggle || !sidebar || !sidebarOverlay) return;

        // Enhanced mobile menu toggle
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMobileMenu();
        });

        // Enhanced overlay click
        sidebarOverlay.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.closeMobileMenu();
        });

        // Enhanced sidebar link clicks
        const sideLinks = document.querySelectorAll('.side-link');
        sideLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (this.isMobile) {
                    setTimeout(() => {
                        this.closeMobileMenu();
                    }, 100);
                }
            });
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('show')) {
                this.closeMobileMenu();
            }
        });
    }

    setupFormHandling() {
        // Prevent zoom on input focus
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (this.isMobile) {
                    // Ensure font size is at least 16px to prevent zoom
                    const currentFontSize = window.getComputedStyle(input).fontSize;
                    const fontSize = parseFloat(currentFontSize);
                    if (fontSize < 16) {
                        input.style.fontSize = '16px';
                    }
                }
            });

            input.addEventListener('blur', () => {
                if (this.isMobile) {
                    // Reset font size if it was changed
                    input.style.fontSize = '';
                }
            });
        });
    }

    setupButtonHandling() {
        // Enhanced button touch handling
        const buttons = document.querySelectorAll('.btn, .status-tab, .nav-link');
        buttons.forEach(button => {
            button.addEventListener('touchstart', (e) => {
                button.classList.add('touch-active');
            }, { passive: true });

            button.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    button.classList.remove('touch-active');
                }, 150);
            }, { passive: true });

            button.addEventListener('touchcancel', (e) => {
                button.classList.remove('touch-active');
            }, { passive: true });
        });
    }

    setupScrollHandling() {
        // Enhanced scroll handling for mobile
        if (this.isMobile) {
            // Prevent overscroll bounce
            document.body.style.overscrollBehavior = 'none';
            
            // Handle table horizontal scroll
            const tableResponsive = document.querySelectorAll('.table-responsive');
            tableResponsive.forEach(table => {
                table.addEventListener('touchstart', (e) => {
                    this.touchStartX = e.touches[0].clientX;
                }, { passive: true });

                table.addEventListener('touchmove', (e) => {
                    const touchX = e.touches[0].clientX;
                    const diffX = this.touchStartX - touchX;
                    
                    // Allow horizontal scrolling for tables
                    if (Math.abs(diffX) > Math.abs(e.touches[0].clientY - this.touchStartY)) {
                        e.stopPropagation();
                    }
                }, { passive: true });
            });
        }
    }

    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (!sidebar || !sidebarOverlay || !mobileMenuToggle) return;

        const isOpen = sidebar.classList.contains('show');
        
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (!sidebar || !sidebarOverlay || !mobileMenuToggle) return;

        sidebar.classList.add('show');
        sidebarOverlay.classList.add('show');
        
        // Change icon
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
            icon.className = 'fa-solid fa-times';
        }
        mobileMenuToggle.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add touch event listeners for swipe to close
        this.addSwipeListeners();
    }

    closeMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (!sidebar || !sidebarOverlay || !mobileMenuToggle) return;

        sidebar.classList.remove('show');
        sidebarOverlay.classList.remove('show');
        
        // Reset icon
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
            icon.className = 'fa-solid fa-bars';
        }
        mobileMenuToggle.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Remove swipe listeners
        this.removeSwipeListeners();
    }

    addSwipeListeners() {
        this.swipeStartX = 0;
        this.swipeStartY = 0;
        
        document.addEventListener('touchstart', this.handleSwipeStart.bind(this), { passive: true });
        document.addEventListener('touchmove', this.handleSwipeMove.bind(this), { passive: true });
        document.addEventListener('touchend', this.handleSwipeEnd.bind(this), { passive: true });
    }

    removeSwipeListeners() {
        document.removeEventListener('touchstart', this.handleSwipeStart.bind(this));
        document.removeEventListener('touchmove', this.handleSwipeMove.bind(this));
        document.removeEventListener('touchend', this.handleSwipeEnd.bind(this));
    }

    handleSwipeStart(e) {
        this.swipeStartX = e.touches[0].clientX;
        this.swipeStartY = e.touches[0].clientY;
    }

    handleSwipeMove(e) {
        if (!this.swipeStartX || !this.swipeStartY) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = this.swipeStartX - currentX;
        const diffY = this.swipeStartY - currentY;
        
        // If horizontal swipe is greater than vertical swipe
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            // Swipe left to close menu
            if (diffX > 0) {
                this.closeMobileMenu();
            }
        }
    }

    handleSwipeEnd(e) {
        this.swipeStartX = 0;
        this.swipeStartY = 0;
    }

    handleTouchEnd(e) {
        // Handle any additional touch end logic
        const target = e.target;
        
        // Ensure buttons are properly activated
        if (target.classList.contains('btn') || 
            target.classList.contains('status-tab') || 
            target.classList.contains('nav-link')) {
            
            // Add a small delay to ensure the click event fires
            setTimeout(() => {
                if (target.onclick) {
                    target.onclick();
                }
            }, 10);
        }
    }

    // Handle window resize
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        
        if (wasMobile && !this.isMobile) {
            // Switched from mobile to desktop
            this.closeMobileMenu();
        }
    }
}

// Enhanced Responsive Manager
class EnhancedResponsiveManager {
    constructor() {
        this.touchHandler = null;
        this.init();
    }

    init() {
        this.touchHandler = new MobileTouchHandler();
        this.setupResizeHandler();
        this.setupViewportMeta();
        this.setupTouchIcons();
    }

    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.touchHandler.handleResize();
            }, 100);
        });
    }

    setupViewportMeta() {
        // Ensure viewport meta tag is properly set
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }

    setupTouchIcons() {
        // Add touch-friendly CSS classes
        document.body.classList.add('touch-device');
        
        // Add iOS specific classes
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            document.body.classList.add('ios-device');
        }
        
        // Add Android specific classes
        if (/Android/.test(navigator.userAgent)) {
            document.body.classList.add('android-device');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced responsive manager
    window.enhancedResponsiveManager = new EnhancedResponsiveManager();
    
    // Add touch-specific CSS classes
    if ('ontouchstart' in window) {
        document.body.classList.add('has-touch');
    } else {
        document.body.classList.add('no-touch');
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            window.enhancedResponsiveManager.touchHandler.handleResize();
        }, 100);
    });
});

// Export for use in other scripts
window.MobileTouchHandler = MobileTouchHandler;
window.EnhancedResponsiveManager = EnhancedResponsiveManager;
