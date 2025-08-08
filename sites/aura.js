// Aura functionality

// Aura data
const auraData = [
    { name: "Hacked [1/37.5m]", description: "Gives you 200% strength, 125% luck and 44% training speed", rarity: "legendary" },
    { name: "Dark Matter [1/30m]", description: "Gives you 197% strength, 116% luck and 42% training speed", rarity: "legendary" },
    { name: "Corrupted [1/20m", description: "Gives you 192% strength, 108% luck and 40% training speed", rarity: "common" },
    { name: "Galaxy [1/10m]", description: "Gives you 184% strength, 98% luck and 38% training speed", rarity: "legendary" },
    { name: "Matrix [1/5m]", description: "Gives you 177% strength, 94% luck and 36% training speed", rarity: "epic" },
    { name: "Universe [1/1m]", description: "Gives you 153% strength, 81% luck and 32% training speed", rarity: "epic" },
    { name: "Storm [1/500k]", description: "Gives you 141% strength, 74% luck and 30% training speed", rarity: "rare" },
    { name: "Poison [1/150k]", description: "Gives you 130% strength, 65% luck and 28% training speed", rarity: "epic" },
    { name: "Mystic Vision", description: "Gives you 197% strength, 116% luck and 42% training speed", rarity: "legendary" },
    { name: "Time Warp", description: "Gives you 197% strength, 116% luck and 42% training speed", rarity: "mythic" },
    { name: "Soul Drain", description: "Gives you 197% strength, 116% luck and 42% training speed", rarity: "legendary" },
    { name: "Lighting [1/1k]", description: "Gives you 58% strength, 38% luck and 16% training speed", rarity: "mythic" },
    { name: "Crystal Armor", description: "Gives you 197% strength, 116% luck and 42% training speed", rarity: "epic" },
    { name: "Void Touch", description: "Gives you 197% strength, 116% luck and 42% training speed", rarity: "legendary" },
    { name: "Nature's Blessing", description: "Gives you 197% strength, 116% luck and 42% training speed", rarity: "rare" }
];

// Generate aura content
function generateAuraContent() {
    const container = document.getElementById('auraContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    auraData.forEach(item => {
        const auraItem = document.createElement('div');
        auraItem.className = 'aura-item';
        auraItem.innerHTML = `
            <div class="aura-content">
                <div class="aura-name">${item.name}</div>
                <div class="aura-description">${item.description}</div>
            </div>
            <div class="aura-rarity ${item.rarity}">${item.rarity}</div>
        `;
        container.appendChild(auraItem);
    });
}

// Initialize when page loads
function initializeAura() {
    generateAuraContent();
}

// Track when user switches to "aura" page
document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        const auraPage = document.getElementById('auraPage');
        if (auraPage && auraPage.classList.contains('active')) {
            generateAuraContent();
        }
    });
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
});
