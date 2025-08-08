// Arm Stats Calculator functionality

// Множники для golden рівнів (без базового множника)
const goldenModifiers = {
    golden1: 1.5,      // 1/5 golden
    golden2: 1.65,     // 2/5 golden (1.5 * 1.1)
    golden3: 1.8,      // 3/5 golden (1.65 * 1.0909)
    golden4: 1.95,     // 4/5 golden (1.8 * 1.0833)
    golden5: 2.1       // 5/5 golden
};

let armMultiplier = 1;

// Показ/приховування налаштувань для калькулятора рук
function toggleArmSettings() {
    const panel = document.getElementById('settingsPanelArm');
    if (panel) {
        panel.classList.toggle('show');
    }
}

// Обробка вибору golden рівнів (тільки один може бути активним)
function handleGoldenSelection(selectedId) {
    const goldenIds = ['golden1', 'golden2', 'golden3', 'golden4', 'golden5'];
    
    // Вимикаємо всі інші golden рівні
    goldenIds.forEach(id => {
        if (id !== selectedId) {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = false;
            }
        }
    });
    
    updateArmMultiplier();
}

// Оновлення множника для калькулятора рук
function updateArmMultiplier() {
    armMultiplier = 1; // Базовий множник тепер 1
    
    // Перевіряємо який golden рівень активний
    for (const id in goldenModifiers) {
        const checkbox = document.getElementById(id);
        if (checkbox && checkbox.checked) {
            armMultiplier = goldenModifiers[id]; // Використовуємо тільки golden множник
            break; // Тільки один golden може бути активним
        }
    }
    
    // Автоматично перерахувати результат після оновлення множника
    calculateArmStats();
}

// Розрахунок результату для рук
function calculateArmStats() {
    const input = document.getElementById('armNumberInput');
    const resultSection = document.getElementById('armResultSection');
    const resultValue = document.getElementById('armResultValue');
    const errorMessage = document.getElementById('armErrorMessage');

    if (!input || !resultSection || !resultValue || !errorMessage) return;

    errorMessage.textContent = '';

    const baseValue = parseFloat(input.value);

    if (isNaN(baseValue) || input.value.trim() === '') {
        if (input.value.trim() !== '') {
            errorMessage.textContent = 'Please enter a valid number';
        }
        resultSection.classList.remove('show');
        return;
    }

    const finalValue = baseValue * armMultiplier;

    resultValue.textContent = finalValue.toLocaleString('uk-UA', {
        minimumFractionDigits: finalValue % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 8
    });

    resultSection.classList.add('show');
}

// Ініціалізація калькулятора рук при завантаженні сторінки
function initializeArm() {
    // Встановлюємо 5/5 golden за замовчуванням
    const golden5Checkbox = document.getElementById('golden5');
    if (golden5Checkbox) {
        golden5Checkbox.checked = true;
    }
    
    updateArmMultiplier();
    
    const armNumberInput = document.getElementById('armNumberInput');
    if (armNumberInput) {
        armNumberInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                calculateArmStats();
            }
        });

        armNumberInput.addEventListener('input', () => {
            const errorMessage = document.getElementById('armErrorMessage');
            if (errorMessage) errorMessage.textContent = '';
        });
    }
}
