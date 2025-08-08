// Codes functionality

// Codes data
const codesData = [
    { code: "brainrot", description: "Use for 3x stat boost for 48 hours (NEW)" },
    { code: "removal", description: "Use for 3x stat boost for 48 hours (NEW)" },
    { code: "octogames", description: "Use for 3x stat boost for 48 hours (NEW)" },
    { code: "glassbridge", description: "Use for 3x stat boost for 48 hours (NEW)" },
    { code: "celebration", description: "Use for 3x stat boost for 48 hours" },
    { code: "banker", description: "Use for 3x stat boost for 24 hours" },
    { code: "sorryoops", description: "Use for 3x strength boost for 24 hours" },
    { code: "timetravel", description: "Use for 48 hours of 3x strength and +5% boost on all stats" },
    { code: "world19", description: "Use for 5% on all strengths and 3x stat boost for 48 hours" },
    { code: "bulk", description: "Use for 3x stat boost for 48 hours" },
    { code: "superhero", description: "Use for 3x stat boost for 48 hours" },
    { code: "tokenstore", description: "Use for 3x stat boost for 48 hours" },
    { code: "captain", description: "Use for 3x stat boost for 48 hours" },
    { code: "skullbeard", description: "Use for 3x stat boost for 48 hours" },
    { code: "pirate", description: "Use for 5% on all strengths and 1,000 Gold Coins" },
    { code: "athlete", description: "Use for 3x stat boost for 48 hours" },
    { code: "tradingback", description: "5% boost on all strengths" },
    { code: "blossom", description: "Use for 3x stat boost for 48 hours and 1500 Prison Coins" },
    { code: "ninja", description: "Use for 3x stat boost for 48 hours and 1500 Prison Coins" },
    { code: "snowops", description: "Use for 3x stat boost for 48 hours" },
    { code: "hideout", description: "Use for 3x stat boost for 48 hours and 2500 Prison Coins" },
    { code: "cosmic", description: "Use for 3x stat boost for 24 hours" },
    { code: "stocking", description: "Use for 3x stat boost for 72 hours and Christmas Title" },
    { code: "frostlands", description: "Use for 3x stat boost for 24 hours and 150 Ice Cubes" },
    { code: "polar", description: "Use for 3x stat boost for 24 hours" },
    { code: "shiny", description: "Use for 3x stat boost for 24 hours" },
    { code: "Christmas", description: "Use for 3x stat boost for 72 hours" },
    { code: "hacker", description: "Use for 3x stat boost for 24 hours" },
    { code: "classic", description: "Use for 3x stat boost for 24 hours" },
    { code: "clans", description: "Use for 3x stat boost for 24 hours" },
    { code: "rifted", description: "Use for 3x stat boost for 24 hours" },
    { code: "hauntedmanor", description: "Use for 3x stat boost for 24 hours and free candy" },
    { code: "trainers", description: "Use for 3x stat boost for 24 hours" },
    { code: "ghosthunting", description: "Use for 3x stat boost for 24 hours and 1 Halloween card" },
    { code: "spooky", description: "Use for 3x stat boost for 24 hours and 3,500 candy" },
    { code: "soon", description: "Use for 3x stat boost for 24 hours" },
    { code: "hatching", description: "Use for 3x stat boost for 24 hours" },
    { code: "billion", description: "Use for 3x stat boost for 24 hours" },
    { code: "Heavenly", description: "Use for 3x stat boost for 24 hours" },
    { code: "rework", description: "Use for 3x stat boost for 24 hours" },
    { code: "paradise", description: "Use for 3x stat boost for 24 hours + 1 gold" },
    { code: "wasteland", description: "Use for 3x stat boost for 24 hours" },
    { code: "apocalypse", description: "Use for 3x boost for 24 hours" },
    { code: "energy", description: "Use for 3x boost for 24 hours" },
    { code: "royalty", description: "Use for 3x boost for 24 hours" },
    { code: "performance", description: "Use for 3x boost for 24 hours" },
    { code: "charms", description: "Use for 3x boost for 24 hours of 3x multiplier" },
    { code: "wizard", description: "Use for 3x boost for 24 hours of 3x multiplier & 25 Miner Crystal" },
    { code: "atlantis", description: "Use for 8 hours of the 3x boost" },
    { code: "800mvisits", description: "Use for 3x stat boost for eight hours" },
    { code: "icecold", description: "Use for 3x boost for 24 hours of 3x multiplier" },
    { code: "forging", description: "Use for 3x boost for 24 hours of 3x multiplier" },
    { code: "axel", description: "Use for 50 Wins" }
];

// Copy code to clipboard
async function copyCode(code, button) {
    try {
        await navigator.clipboard.writeText(code);
        
        // Visual feedback on button
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="copy-icon">✓</span> Copied!';
        button.classList.add('copied');
        
        // Show success message
        showCopyMessage(`Code "${code}" copied!`);
        
        // Reset button after animation
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('copied');
        }, 1000);
        
    } catch (err) {
        console.error('Failed to copy code:', err);
        
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyMessage(`Code "${code}" copied!`);
            
            // Visual feedback on button
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="copy-icon">✓</span> Copied!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('copied');
            }, 1000);
        } catch (fallbackErr) {
            console.error('Fallback copy also failed:', fallbackErr);
            showCopyMessage('Failed to copy code');
        }
        
        document.body.removeChild(textArea);
    }
}

// Show copy success message
function showCopyMessage(message) {
    let messageEl = document.getElementById('copySuccessMessage');
    
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'copySuccessMessage';
        messageEl.className = 'copy-success-message';
        document.body.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.classList.add('show');
    
    // Remove message after animation
    setTimeout(() => {
        messageEl.classList.remove('show');
    }, 2000);
}

// Generate codes content
function generateCodesContent() {
    const container = document.getElementById('codesContainer');
    if (!container) {
        console.error('Element with ID "codesContainer" not found');
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    codesData.forEach((item, index) => {
        const codeItem = document.createElement('div');
        codeItem.className = 'code-item';
        
        codeItem.innerHTML = `
            <div class="code-content">
                <div class="code-name">${item.code}</div>
                <div class="code-description">${item.description}</div>
            </div>
            <button class="copy-btn" onclick="copyCode('${item.code}', this)">
                <span class="copy-icon">📋</span>
                Copy
            </button>
        `;
        
        container.appendChild(codeItem);
    });
}

// Initialize codes
function initializeCodes() {
    generateCodesContent();
}
