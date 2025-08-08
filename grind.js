const modifiersGrind = { 
    tp1: 1.30, 
    tp2: 1.60, 
    tp3: 1.90, 
    chocholate_donut: 1.15, 
    ench_coockie: 1.07
};

let currentMultiplier = 1;

function updateMultiplierGrind() {
    currentMultiplier = 1;
    for (const mod in modifiersGrind) {
        if (document.getElementById(mod)) {
            if (document.getElementById(mod).checked) {
                currentMultiplier *= modifiersGrind[mod];
            }
        }
    }
}

function initializeGrind() {
    updateMultiplierGrind();
    const numberInput = document.getElementById('numberInputGrind');
    if (numberInput) {
        numberInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') calculateStats('numberInputGrind','resultValueGrind','errorMessageGrind','resultSectionGrind');
        });
    }
}
