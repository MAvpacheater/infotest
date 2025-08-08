// Grind calculator functionality

const modifiersGrind = { 
    tp1: 1.30, 
    tp2: 1.60, 
    tp3: 1.90, 
    chocholate_donut: 1.15, 
    ench_coockie: 1.07
};

let currentMultiplierGrind = 1;

// Toggle settings panel
function toggleSettings() {
    document.getElementById('settingsPanel').classList.toggle('show');
}

// Update multiplier based on selected checkboxes
function updateMultiplierGrind() {
    currentMultiplierGrind = 1;
    for (const mod in modifiersGrind) {
        if (document.getElementById(mod).checked) {
            currentMultiplierGrind *= modifiersGrind[mod];
        }
    }
}

// Calculate grind stats
function calculateGrindStats() {
    const input = document.getElementById('numberInputGrind');
    const resultSection = document.getElementById('resultSectionGrind');
    const resultValue = document.getElementById('resultValueGrind');
    const errorMessage = document.getElementById('errorMessageGrind');
    
    errorMessage.textContent = '';
    const inputValue = parseFloat(input.value);
    
    if (isNaN(inputValue) || input.value.trim() === '') {
        errorMessage.textContent = 'Please enter a valid number';
        resultSection.classList.remove('show');
        return;
    }
    
    const result = inputValue * currentMultiplierGrind;
    resultValue.textContent = result.toLocaleString('uk-UA', { 
        minimumFractionDigits: result % 1 === 0 ? 0 : 2, 
        maximumFractionDigits: 8 
    });
    resultSection.classList.add('show');
}

// Initialize grind calculator
function initializeGrind() {
    updateMultiplierGrind();
    
    const numberInput = document.getElementById('numberInputGrind');
    if (numberInput) {
        numberInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') calculateGrindStats();
        });
        
        numberInput.addEventListener('input', () => {
            const errorMessage = document.getElementById('errorMessageGrind');
            if (errorMessage) {
                errorMessage.textContent = '';
            }
        });
    }
}
