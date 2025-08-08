function switchPage(page) {
    document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    
    const targetPage = document.getElementById(page + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }

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

    closeSidebar();
}

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

function toggleSettings(id) {
    document.getElementById(id).classList.toggle('show');
}

function calculateStats(inputId, resultId, errorId, sectionId) {
    const input = document.getElementById(inputId);
    const resultSection = document.getElementById(sectionId);
    const resultValue = document.getElementById(resultId);
    const errorMessage = document.getElementById(errorId);
    
    errorMessage.textContent = '';
    const inputValue = parseFloat(input.value);
    if (isNaN(inputValue) || input.value.trim() === '') {
        errorMessage.textContent = 'Please enter a valid number';
        resultSection.classList.remove('show');
        return;
    }
    const result = inputValue * (typeof currentMultiplier !== 'undefined' ? currentMultiplier : 1);
    resultValue.textContent = result.toLocaleString('uk-UA', { 
        minimumFractionDigits: result % 1 === 0 ? 0 : 2, 
        maximumFractionDigits: 8 
    });
    resultSection.classList.add('show');
}
