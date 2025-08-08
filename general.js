// ----------------------
// Page switching
// ----------------------
function switchPage(page) {
    // Приховуємо всі сторінки
    document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));

    // Прибираємо активні стани з усіх кнопок
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

    // Показуємо потрібну сторінку
    const targetPage = document.getElementById(`${page}Page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Підсвічуємо відповідну кнопку
    const targetBtn = document.querySelector(`.nav-btn[onclick="switchPage('${page}')"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }

    // Закриваємо сайдбар
    closeSidebar();
}

// ----------------------
// Sidebar
// ----------------------
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

// ----------------------
// Settings panel toggle
// ----------------------
function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    if (panel) {
        panel.classList.toggle('show');
    }
}

// ----------------------
// Ініціалізація сторінок
// ----------------------
function initializeAll() {
    // За замовчуванням калькулятор
    if (!document.querySelector('.page.active')) {
        switchPage('calculator');
    }

    // Ініціалізація всіх модулів, якщо вони є
    if (typeof initializeCalculator === 'function') initializeCalculator();
    if (typeof initializeArm === 'function') initializeArm();
    if (typeof initializeBoosts === 'function') initializeBoosts();
    if (typeof initializeShiny === 'function') initializeShiny();
}

// ----------------------
// Events
// ----------------------
document.addEventListener('DOMContentLoaded', () => {
    switchPage('calculator');

    // Закриття налаштувань кліком поза панеллю
    document.addEventListener('click', e => {
        const settingsPanel = document.getElementById('settingsPanel');
        const settingsBtn = document.querySelector('.settings-btn');
        if (settingsPanel && settingsBtn) {
            if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
                settingsPanel.classList.remove('show');
            }
        }
    });

    initializeAll();
});

// Резервна ініціалізація (на випадок затримки завантаження)
setTimeout(initializeAll, 100);
