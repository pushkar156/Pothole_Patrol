/* 
 * PotholePatrol: Connectivity & Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
    highlightActiveNav();
    setupEventListeners();
});

/**
 * Highlights the active navigation item based on the current URL
 */
function highlightActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath) {
            item.classList.add('active');
            // Set Material Symbol to filled if it's the active tab
            const icon = item.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.style.fontVariationSettings = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24";
            }
        }
    });
}

/**
 * Common event listeners for better UX
 */
function setupEventListeners() {
    // Add haptic-like scale effect on all buttons
    const buttons = document.querySelectorAll('button, .btn-primary, .nav-item');
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', () => {
            btn.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        btn.addEventListener('touchend', () => {
            btn.style.transform = 'scale(1)';
        }, { passive: true });
    });

    // Handle "Dispatch" button clicks to navigate to dispatch page
    const dispatchBtns = document.querySelectorAll('.dispatch-btn');
    dispatchBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'dispatch.html';
        });
    });
}
