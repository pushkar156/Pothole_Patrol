/* 
 * PotholePatrol: Connectivity & Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
    highlightActiveNav();
    setupEventListeners();
    
    // Page Specific Initializations
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath === 'map.html' && typeof L !== 'undefined') {
        initLeafletMap();
    }
    
    startLiveSimulations();
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

/**
 * Initializes a real interactive map using Leaflet
 */
function initLeafletMap() {
    // Center of Pune
    const map = L.map('map', { 
        zoomControl: false,
        attributionControl: false
    }).setView([18.5204, 73.8567], 13);

    // Dark Mode Tile Layer (CartoDB)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
    }).addTo(map);

    // Add some simulated Pothole Markers
    const markers = [
        { loc: [18.5173, 73.8396], name: "Kothrud Central", sev: "Critical" },
        { loc: [18.5302, 73.8475], name: "FC Road", sev: "High" },
        { loc: [18.5255, 73.8785], name: "Koregaon Park", sev: "Moderate" }
    ];

    markers.forEach(m => {
        const color = m.sev === 'Critical' ? '#ff716c' : '#ffb148';
        const marker = L.circleMarker(m.loc, {
            radius: 8,
            fillColor: color,
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);
        
        marker.bindPopup(`<strong>${m.name}</strong><br>Severity: ${m.sev}`);
    });
}

/**
 * Simulates real-time data updates
 */
function startLiveSimulations() {
    // 1. Live Sync Timer
    const syncElement = document.querySelector('.status-chip');
    if (syncElement && syncElement.textContent.includes('SYNC')) {
        let seconds = 5;
        setInterval(() => {
            seconds++;
            const textNode = Array.from(syncElement.childNodes).find(n => n.nodeType === 3 && n.textContent.includes('SYNC'));
            if (textNode) textNode.textContent = ` ${seconds}S AGO SYNC`;
            if (seconds > 10) seconds = 0;
        }, 1000);
    }
    
    // 2. Anomaly Counter Increment
    const detectedCount = document.querySelector('span[style*="font-weight: 800;"]');
    if (detectedCount && detectedCount.textContent.includes(',')) {
        setInterval(() => {
            if (Math.random() > 0.8) {
                let current = parseInt(detectedCount.innerText.replace(/,/g, ''));
                detectedCount.innerText = (current + 1).toLocaleString();
                detectedCount.parentElement.style.transform = 'scale(1.05)';
                setTimeout(() => detectedCount.parentElement.style.transform = 'scale(1)', 200);
            }
        }, 3000);
    }
}

/**
 * Handles the Dispatch confirmation flow
 */
function handleDispatchConfirmation() {
    const confirmBtn = document.querySelector('button.btn-primary');
    if (confirmBtn && confirmBtn.textContent.includes('CONFIRM DISPATCH')) {
        confirmBtn.addEventListener('click', () => {
            confirmBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span> PROCESSING...';
            confirmBtn.disabled = true;
            
            setTimeout(() => {
                // Create Success Overlay
                const overlay = document.createElement('div');
                overlay.style = "position: fixed; inset: 0; background: rgba(6,14,32,0.9); backdrop-filter: blur(20px); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s ease;";
                overlay.innerHTML = `
                    <div style="width: 80px; height: 80px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--on-primary); font-weight: 800;">check</span>
                    </div>
                    <h2 class="headline-sm">Dispatch Confirmed</h2>
                    <p style="opacity: 0.7; margin-top: 8px;">Order PP-18423 is En Route</p>
                `;
                document.body.appendChild(overlay);
                setTimeout(() => overlay.style.opacity = '1', 50);
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2500);
            }, 1500);
        });
    }
}

// Call handleDispatchConfirmation for Dispatch Page
if (window.location.pathname.includes('dispatch.html')) {
    document.addEventListener('DOMContentLoaded', handleDispatchConfirmation);
}
