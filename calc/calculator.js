// Pet Stats Calculator functionality

// Категорії модифікаторів
const modifierCategories = {
    slimes: {
        title: "Slimes",
        options: [
            { id: "slime_yellow", name: "Yellow", multiplier: 1.2 },
            { id: "slime_blue", name: "Blue", multiplier: 1.4 },
            { id: "slime_purple", name: "Purple", multiplier: 1.65 },
            { id: "slime_red", name: "Red", multiplier: 2.25 },
            { id: "slime_black", name: "Black", multiplier: 2.4 },
            { id: "slime_green", name: "Green", multiplier: 2.55 },
            { id: "slime_orange", name: "Orange", multiplier: 2.7 },
            { id: "slime_christmas", name: "Christmas (Xmas)", multiplier: 2.85 },
            { id: "slime_neowave", name: "Neowave", multiplier: 3 },
            { id: "slime_shock", name: "Shock", multiplier: 3.15 }
        ],
        default: "slime_shock" // найкращий за замовчуванням
    },
    mutation: {
        title: "Mutation",
        options: [
            { id: "mutation_glowing", name: "Glowing", multiplier: 1.2 },
            { id: "mutation_rainbow", name: "Rainbow", multiplier: 1.35 },
            { id: "mutation_ghost", name: "Ghost", multiplier: 2 },
            { id: "mutation_cosmic", name: "Cosmic", multiplier: 2.5 }
        ],
        default: "mutation_cosmic" // найкращий за замовчуванням
    },
    evolution: {
        title: "Evolution and Size",
        options: [
            { id: "evolution_baby", name: "Baby", multiplier: 1 },
            { id: "evolution_big", name: "Big", multiplier: 1.5 },
            { id: "evolution_huge", name: "Huge", multiplier: 2 },
            { id: "evolution_goliath", name: "Goliath", multiplier: 1.25 }
        ],
        default: "evolution_huge" // найкращий за замовчуванням
    },
    type: {
        title: "Type",
        options: [
            { id: "type_golden", name: "Golden", multiplier: 1.5 },
            { id: "type_void", name: "Void", multiplier: 2 },
            { id: "type_pristine", name: "Pristine", multiplier: 2.17 }
        ],
        default: "type_pristine" // найкращий за замовчуванням
    }
};

// Прості модифікатори
const simpleModifiers = {
    shiny: { name: "Shiny", multiplier: 1.15 },
    maxlvl: { name: "Max lvl", multiplier: 2.2388 }
};

let currentSelections = {};

// Ініціалізація за замовчуванням
function initializeDefaults() {
    // Встановлюємо найкращі варіанти для кожної категорії
    for (const [categoryKey, category] of Object.entries(modifierCategories)) {
        currentSelections[categoryKey] = category.default;
    }
    
    // Включаємо прості модифікатори за замовчуванням
    currentSelections.shiny = true;
    currentSelections.maxlvl = true;
}

// Показ/приховування налаштувань
function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    if (panel) {
        panel.classList.toggle('show');
    }
}

// Переключення категорії
function toggleCategory(categoryKey) {
    const header = document.querySelector(`[data-category="${categoryKey}"] .category-header`);
    const content = document.querySelector(`[data-category="${categoryKey}"] .category-content`);
    
    if (header && content) {
        header.classList.toggle('active');
        content.classList.toggle('active');
    }
}

// Обробка вибору в категорії (radio button логіка)
function selectCategoryOption(categoryKey, optionId) {
    currentSelections[categoryKey] = optionId;
    
    // Знімаємо всі чекбокси в цій категорії
    const categoryInputs = document.querySelectorAll(`[data-category="${categoryKey}"] input[type="radio"]`);
    categoryInputs.forEach(input => {
        input.checked = false;
    });
    
    // Встановлюємо обраний
    const selectedInput = document.getElementById(optionId);
    if (selectedInput) {
        selectedInput.checked = true;
    }
    
    calculateStats();
}

// Обробка простих модифікаторів
function toggleSimpleModifier(modifierKey) {
    currentSelections[modifierKey] = !currentSelections[modifierKey];
    calculateStats();
}

// Розрахунок загального множника
function calculateTotalMultiplier() {
    let multiplier = 1;
    
    // Множники з категорій
    for (const [categoryKey, category] of Object.entries(modifierCategories)) {
        const selectedId = currentSelections[categoryKey];
        if (selectedId) {
            const option = category.options.find(opt => opt.id === selectedId);
            if (option) {
                multiplier *= option.multiplier;
            }
        }
    }
    
    // Прості множники
    for (const [key, modifier] of Object.entries(simpleModifiers)) {
        if (currentSelections[key]) {
            multiplier *= modifier.multiplier;
        }
    }
    
    return multiplier;
}

// Розрахунок результату
function calculateStats() {
    const input = document.getElementById('numberInput');
    const resultSection = document.getElementById('resultSection');
    const resultValue = document.getElementById('resultValue');
    const errorMessage = document.getElementById('errorMessage');

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

    const multiplier = calculateTotalMultiplier();
    const finalValue = baseValue * multiplier;

    resultValue.textContent = finalValue.toLocaleString('uk-UA', {
        minimumFractionDigits: finalValue % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 8
    });

    resultSection.classList.add('show');
}

// Створення HTML для налаштувань
function createSettingsHTML() {
    const panel = document.getElementById('settingsPanel');
    if (!panel) return;

    let html = '<div class="settings-title">Settings</div>';
    
    // Прості модифікатори
    for (const [key, modifier] of Object.entries(simpleModifiers)) {
        html += `
            <div class="simple-modifier">
                <div class="simple-modifier-label">
                    <span>${modifier.name}</span>
                    <span class="modifier-multiplier">(x${modifier.multiplier})</span>
                </div>
                <label class="switch">
                    <input type="checkbox" id="${key}" ${currentSelections[key] ? 'checked' : ''} 
                           onchange="toggleSimpleModifier('${key}')">
                    <span class="slider"></span>
                </label>
            </div>
        `;
    }
    
    // Категорії з підвкладками
    for (const [categoryKey, category] of Object.entries(modifierCategories)) {
        html += `
            <div class="category-section" data-category="${categoryKey}">
                <div class="category-header" onclick="toggleCategory('${categoryKey}')">
                    <span>${category.title}</span>
                    <span class="category-arrow">▼</span>
                </div>
                <div class="category-content">
        `;
        
        for (const option of category.options) {
            const isSelected = currentSelections[categoryKey] === option.id;
            html += `
                <div class="modifier-item">
                    <div class="modifier-label">
                        <span>${option.name}</span>
                        <span class="modifier-multiplier">(${option.multiplier}x)</span>
                    </div>
                    <label class="radio-switch">
                        <input type="radio" id="${option.id}" name="${categoryKey}" 
                               ${isSelected ? 'checked' : ''}
                               onchange="selectCategoryOption('${categoryKey}', '${option.id}')">
                        <span class="radio-slider"></span>
                    </label>
                </div>
            `;
        }
        
        html += `
                </div>
            </div>
        `;
    }
    
    panel.innerHTML = html;
}

// Ініціалізація калькулятора при завантаженні сторінки
function initializeCalculator() {
    initializeDefaults();
    createSettingsHTML();
    calculateStats();

    const numberInput = document.getElementById('numberInput');
    if (numberInput) {
        numberInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                calculateStats();
            }
        });

        numberInput.addEventListener('input', () => {
            const errorMessage = document.getElementById('errorMessage');
            if (errorMessage) errorMessage.textContent = '';
        });
    }
}
