// General JavaScript functions

// Page switching functionality
function switchPage(page) {
    // Remove active class from all pages and nav buttons
    document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    
    // Add active class to selected page
    const targetPage = document.getElementById(page + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update active nav button
    const navButtons = document.querySelectorAll('.nav-btn');
    if (page === 'calculator' && navButtons[0]) {
        navButtons[0].classList.add('active');
    } else if (page === 'arm' && navButtons[1]) {
        navButtons[1].classList.add('active');
    } else if (page === 'grind' && navButtons[2]) {
        navButtons[2].classList.add('active');
    } else if (page === 'boosts' && navButtons[3]) {
        navButtons[3].classList.add('active');
    } else if (page === 'shiny' && navButtons[4]) {
        navButtons[4].classList.add('active');
    } else if (page === 'codes' && navButtons[5]) {
        navButtons[5].classList.add('active');
    }
    
    // Close sidebar after selection
    closeSidebar();
}

// Sidebar functionality
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
    }
}

// Initialize functions when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Make sure calculator page is active by default
    switchPage('calculator');
    
    // Click outside settings panel to close
    document.addEventListener('click', e => {
        const settingsPanel = document.getElementById('settingsPanel');
        const settingsBtn = document.querySelector('.settings-btn');
        if (settingsPanel && settingsBtn) {
            if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
                settingsPanel.classList.remove('show');
            }
        }
    });

    // Initialize calculators
    if (typeof initializeCalculator === 'function') initializeCalculator();
    if (typeof initializeArm === 'function') initializeArm();
    if (typeof initializeBoosts === 'function') initializeBoosts();
    if (typeof initializeShiny === 'function') initializeShiny();
    if (typeof initializeGrind === 'function') initializeGrind();
});

// Compatibility timeout for initialization
setTimeout(() => {
    if (!document.querySelector('.page.active')) {
        switchPage('calculator');
    }
    if (typeof initializeCalculator === 'function') initializeCalculator();
    if (typeof initializeArm === 'function') initializeArm();
    if (typeof initializeBoosts === 'function') initializeBoosts();
    if (typeof initializeShiny === 'function') initializeShiny();
    if (typeof initializeGrind === 'function') initializeGrind();
}, 100);
