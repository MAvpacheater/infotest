// General JavaScript functions - cleaned version without authentication

// Page switching functionality
function switchPage(page) {
    console.log(`Switching to page: ${page}`);
    
    // Remove active class from all pages and nav buttons
    document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    
    // Add active class to selected page
    const targetPage = document.getElementById(page + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
        console.log(`Page ${page}Page activated`);
    } else {
        console.error(`Page ${page}Page not found`);
    }
    
    // Update active nav button
    const pageMap = {
        'calculator': 0,
        'arm': 1,
        'grind': 2,
        'boosts': 3,
        'shiny': 4,
        'codes': 5,
        'aura': 6,
        'trainer': 7,
        'charms': 8,
        'worlds': 9
    };
    
    const navButtons = document.querySelectorAll('.nav-btn');
    const buttonIndex = pageMap[page];
    
    if (buttonIndex !== undefined && buttonIndex >= 0 && navButtons[buttonIndex]) {
        navButtons[buttonIndex].classList.add('active');
        console.log(`Nav button ${buttonIndex} activated for ${page}`);
    }
    
    // Close sidebar after selection
    closeSidebar();
    
    // Trigger page-specific initialization if needed
    initializePageContent(page);
    
    // Load settings from localStorage
    loadSettingsForPage(page);
}

// Load settings from localStorage for specific page
function loadSettingsForPage(page) {
    const calculatorPages = ['calculator', 'arm', 'grind'];
    if (!calculatorPages.includes(page)) {
        return; // Not a calculator page
    }
    
    try {
        const settings = loadSettingsFromStorage(page);
        if (settings) {
            console.log(`✅ Loaded settings for ${page}:`, settings);
            applySettingsToPage(page, settings);
        }
    } catch (error) {
        console.error(`❌ Error loading settings for ${page}:`, error);
    }
}

// Apply settings to page
function applySettingsToPage(page, settings) {
    switch(page) {
        case 'calculator':
            if (typeof applyCalculatorSettings === 'function') {
                applyCalculatorSettings(settings);
            }
            break;
        case 'arm':
            if (typeof applyArmSettings === 'function') {
                applyArmSettings(settings);
            }
            break;
        case 'grind':
            if (typeof applyGrindSettings === 'function') {
                applyGrindSettings(settings);
            }
            break;
    }
}

// Initialize specific page content when switching
function initializePageContent(page) {
    switch(page) {
        case 'calculator':
            if (typeof initializeCalculator === 'function') {
                initializeCalculator();
            }
            break;
        case 'arm':
            if (typeof initializeArm === 'function') {
                initializeArm();
            }
            break;
        case 'grind':
            if (typeof initializeGrind === 'function') {
                initializeGrind();
            }
            break;
        case 'shiny':
            if (typeof initializeShiny === 'function') {
                initializeShiny();
            }
            break;
        case 'boosts':
            if (typeof initializeBoosts === 'function') {
                initializeBoosts();
            }
            break;
        case 'trainer':
            if (typeof initializeTrainer === 'function') {
                initializeTrainer();
            }
            break;
        case 'aura':
            if (typeof initializeAura === 'function') {
                initializeAura();
            }
            break;
        case 'codes':
            if (typeof initializeCodes === 'function') {
                initializeCodes();
            }
            break;
        case 'charms':
            if (typeof initializeCharms === 'function') {
                initializeCharms();
            }
            break;
        case 'worlds':
            if (typeof initializeWorlds === 'function') {
                initializeWorlds();
            }
            break;
    }
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

// Settings persistence helpers
function saveSettingsToStorage(key, settings) {
    localStorage.setItem(`armHelper_${key}_settings`, JSON.stringify(settings));
}

function loadSettingsFromStorage(key) {
    const localSettings = localStorage.getItem(`armHelper_${key}_settings`);
    if (localSettings) {
        try {
            return JSON.parse(localSettings);
        } catch (e) {
            console.warn('Invalid local settings data');
        }
    }
    return null;
}

// App initialization flag
let appInitialized = false;

// Main initialization function
function initializeApp() {
    if (typeof appInitialized !== 'undefined' && appInitialized) {
        console.log('⚠️ App already initialized');
        return;
    }
    
    console.log('🚀 Starting app initialization...');
    
    // Check if content is loaded
    const appContent = document.getElementById('app-content');
    if (!appContent || !appContent.innerHTML.trim()) {
        console.error('❌ Content not loaded');
        return;
    }
    
    // Start with calculator page
    switchPage('calculator');
    
    // Enhanced click outside settings panel handler
    document.addEventListener('click', e => {
        // Close settings panels when clicking outside
        const settingsPanels = [
            { panel: document.getElementById('settingsPanel'), btn: document.querySelector('#calculatorPage .settings-btn') },
            { panel: document.getElementById('settingsPanelArm'), btn: document.querySelector('#armPage .settings-btn') },
            { panel: document.getElementById('settingsPanelGrind'), btn: document.querySelector('#grindPage .settings-btn') }
        ];
        
        settingsPanels.forEach(({ panel, btn }) => {
            if (panel && btn) {
                const isClickInsidePanel = panel.contains(e.target);
                const isClickOnSettingsBtn = btn.contains(e.target);
                const isClickOnCategoryButton = e.target.closest('.category-button');
                const isClickOnBackButton = e.target.closest('.back-btn');
                const isClickOnCategorySwitch = e.target.closest('.category-switch');
                const isClickOnSimpleModifier = e.target.closest('.simple-modifier');
                
                if (!isClickInsidePanel && !isClickOnSettingsBtn && 
                    !isClickOnCategoryButton && !isClickOnBackButton && 
                    !isClickOnCategorySwitch && !isClickOnSimpleModifier) {
                    panel.classList.remove('show');
                }
            }
        });
    });

    // Initialize all modules
    initializeAllModules();
    
    // Set initialization flag
    if (typeof window !== 'undefined') {
        window.appInitialized = true;
    }
    appInitialized = true;
    console.log('✅ App initialization completed');
}

// Initialize all modules
function initializeAllModules() {
    const modules = [
        'initializeCalculator',
        'initializeArm', 
        'initializeGrind',
        'initializeBoosts',
        'initializeShiny',
        'initializeAura',
        'initializeTrainer',
        'initializeCharms',
        'initializeWorlds',
        'initializeCodes'
    ];

    modules.forEach(moduleName => {
        if (typeof window[moduleName] === 'function') {
            try {
                window[moduleName]();
                console.log(`✅ ${moduleName} initialized`);
            } catch (error) {
                console.error(`❌ Error initializing ${moduleName}:`, error);
            }
        } else {
            console.warn(`⚠️ Function ${moduleName} not found`);
        }
    });
}

// Debug function to check page states
function debugPageStates() {
    console.log('=== DEBUG PAGE STATES ===');
    document.querySelectorAll('.page').forEach(page => {
        console.log(`${page.id}: ${page.classList.contains('active') ? 'ACTIVE' : 'INACTIVE'}`);
    });
    console.log('========================');
}

// Make functions globally available
window.switchPage = switchPage;
window.toggleMobileMenu = toggleMobileMenu;
window.closeSidebar = closeSidebar;
window.initializeApp = initializeApp;
window.debugPageStates = debugPageStates;
window.saveSettingsToStorage = saveSettingsToStorage;
window.loadSettingsFromStorage = loadSettingsFromStorage;
