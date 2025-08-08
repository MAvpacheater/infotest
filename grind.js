// Множники для розрахунків Grind
const modifiersGrind = { 
    tp1: 1.30, 
    tp2: 1.60, 
    tp3: 1.90, 
    chocholate_donut: 1.15, 
    ench_coockie: 1.07
};

let currentMultiplier = 1;

// Оновлення множника на основі вибраних чекбоксів
function updateMultiplierGrind() {
    currentMultiplier = 1;
    for (const mod in modifiersGrind) {
        const checkbox = document.getElementById(mod);
        if (checkbox && checkbox.checked) {
            currentMultiplier *= modifiersGrind[mod];
        }
    }
}

// Ініціалізація Grind калькулятора
function initializeGrind() {
    updateMultiplierGrind();
    const numberInput = document.getElementById('numberInputGrind');
    if (numberInput) {
        numberInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                calculateStats('numberInputGrind','resultValueGrind','errorMessageGrind','resultSectionGrind');
            }
        });
        numberInput.addEventListener('input', () => {
            const errorMessage = document.getElementById('errorMessageGrind');
            if (errorMessage) {
                errorMessage.textContent = '';
            }
        });
    }
}
