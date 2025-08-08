// Aura functionality

// Aura data
const auraData = [
    { name: "brainrot", description: "Legendary aura with incredible power boost", rarity: "legendary" },
    { name: "Dark Matter Aura", description: "Gives you 197% strength, 116% luck and 42% training speed", rarity: "legendary" },
    { name: "Fire Storm", description: "Surround yourself with blazing flames that damage enemies", rarity: "rare" },
    { name: "Ice Shield", description: "Create a protective barrier of ice around yourself", rarity: "rare" },
    { name: "Lightning Strike", description: "Channel electricity to deal massive damage", rarity: "epic" },
    { name: "Healing Light", description: "Emit a gentle glow that restores health over time", rarity: "common" },
    { name: "Wind Runner", description: "Increase movement speed and agility dramatically", rarity: "rare" },
    { name: "Earth Guardian", description: "Gain incredible defensive capabilities and durability", rarity: "epic" },
    { name: "Mystic Vision", description: "See hidden objects and enemies through walls", rarity: "legendary" },
    { name: "Time Warp", description: "Slow down time around you for strategic advantage", rarity: "mythic" },
    { name: "Soul Drain", description: "Absorb energy from defeated enemies to grow stronger", rarity: "legendary" },
    { name: "Phoenix Rising", description: "Resurrect automatically when defeated with full health", rarity: "mythic" },
    { name: "Crystal Armor", description: "Crystalline protection that reflects damage back to attackers", rarity: "epic" },
    { name: "Void Touch", description: "Consume matter and energy to fuel your abilities", rarity: "legendary" },
    { name: "Nature's Blessing", description: "Gain support from natural elements and creatures", rarity: "rare" }
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
