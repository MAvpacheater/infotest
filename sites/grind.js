// ==== GRIND CALCULATOR ====

// Множники для grind
const grindModifiers = {
    tp1: 1.30,
    tp2: 1.60,
    tp3: 1.90,
    chocholate_donut: 1.15,
    ench_coockie: 1.07
};

let grindMultiplier = 1;

// Показ/приховування налаштувань
function toggleGrindSettings() {
    const panel = document.getElementById('settingsPanelGrind');
    if (panel) {
        panel.classList.toggle('show');
    }
}

// Оновлення множника при зміні чекбоксів
function updateGrindMultiplier() {
    grindMultiplier = 1;
    for (const id in grindModifiers) {
        const checkbox = document.getElementById(id);
        if (checkbox && checkbox.checked) {
            grindMultiplier *= grindModifiers[id];
        }
    }
}

// Розрахунок результату
function calculateGrindStats() {
    const input = document.getElementById('numberInputGrind');
    const resultSection = document.getElementById('resultSectionGrind');
    const resultValue = document.getElementById('resultValueGrind');
    const errorMessage = document.getElementById('errorMessageGrind');

    if (!input || !resultSection || !resultValue || !errorMessage) return;

    errorMessage.textContent = '';

    const baseValue = parseFloat(input.value);

    if (isNaN(baseValue) || input.value.trim() === '') {
        errorMessage.textContent = 'Please enter a valid number';
        resultSection.classList.remove('show');
        return;
    }

    const finalValue = baseValue * grindMultiplier;

    resultValue.textContent = finalValue.toLocaleString('uk-UA', {
        minimumFractionDigits: finalValue % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 8
    });

    resultSection.classList.add('show');
}

// Ініціалізація Grind при завантаженні сторінки
function initializeGrind() {
    updateGrindMultiplier();

    const numberInput = document.getElementById('numberInputGrind');
    if (numberInput) {
        numberInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                calculateGrindStats();
            }
        });

        numberInput.addEventListener('input', () => {
            const errorMessage = document.getElementById('errorMessageGrind');
            if (errorMessage) errorMessage.textContent = '';
        });
    }
}
