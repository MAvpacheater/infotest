// Info functionality

// Info data
const infoData = [
    {
        title: "Game Basics",
        icon: "🎮",
        description: "Learn the fundamental mechanics of the game including pet training, stat calculations, and progression systems.",
        details: "Understanding these basics will help you make better decisions when training your pets and calculating optimal strategies.",
        category: "general"
    },
    {
        title: "Pet Evolution Guide",
        icon: "🐾",
        description: "Complete guide on how to evolve your pets and maximize their potential through proper training techniques.",
        details: "Evolution requires specific stat thresholds and proper timing. Each evolution stage multiplies your pet's base stats.",
        category: "gameplay"
    },
    {
        title: "Multiplier Stacking",
        icon: "📈",
        description: "Learn how different multipliers work together to boost your pet's stats and training efficiency.",
        details: "Multipliers from various sources stack multiplicatively, not additively. Understanding this is crucial for optimal progression.",
        category: "mechanics"
    },
    {
        title: "Training Optimization",
        icon: "💪",
        description: "Tips and strategies for maximizing your training efficiency and getting the most out of your time investment.",
        details: "Focus on high-multiplier areas during boost periods. Use time-limited boosts strategically for maximum impact.",
        category: "tips"
    },
    {
        title: "Boost Management",
        icon: "🚀",
        description: "How to effectively use and stack different types of boosts for maximum training benefits.",
        details: "Some boosts stack with each other while others override. Plan your boost usage around your available playtime.",
        category: "gameplay"
    },
    {
        title: "Shiny Pet Mechanics",
        icon: "✨",
        description: "Everything you need to know about shiny pets, their stat bonuses, and how to obtain them.",
        details: "Shiny pets provide a 1.15x multiplier to all stats and have unique visual effects. They're rare but worth the investment.",
        category: "mechanics"
    },
    {
        title: "Advanced Calculations",
        icon: "🔢",
        description: "Deep dive into the mathematical formulas used for stat calculations and progression planning.",
        details: "Understanding the underlying math helps you make informed decisions about resource allocation and training priorities.",
        category: "mechanics"
    },
    {
        title: "Recent Updates",
        icon: "🆕",
        description: "Stay informed about the latest game changes, new features, and balance adjustments.",
        details: "Regular updates introduce new content, fix bugs, and rebalance existing mechanics. Stay updated for optimal play.",
        category: "updates"
    },
    {
        title: "Community Tips",
        icon: "👥",
        description: "Valuable insights and strategies shared by experienced players in the community.",
        details: "Learn from other players' experiences and discover new strategies that you might not have considered.",
        category: "tips"
    },
    {
        title: "Resource Management",
        icon: "💰",
        description: "How to effectively manage your in-game resources for long-term progression and success.",
        details: "Prioritize upgrades that provide the highest return on investment. Save premium resources for critical moments.",
        category: "gameplay"
    }
];

// Generate info content
function generateInfoContent() {
    const container = document.getElementById('infoContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    infoData.forEach(item => {
        const infoItem = document.createElement('div');
        infoItem.className = 'info-item';
        infoItem.innerHTML = `
            <div class="info-title">
                <span class="info-icon">${item.icon}</span>
                ${item.title}
            </div>
            <div class="info-description">${item.description}</div>
            <div class="info-details">${item.details}</div>
            <div class="info-category ${item.category}">${item.category}</div>
        `;
        container.appendChild(infoItem);
    });
}

// Initialize when page loads
function initializeInfo() {
    generateInfoContent();
}

// Track when user switches to "info" page
document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        const infoPage = document.getElementById('infoPage');
        if (infoPage && infoPage.classList.contains('active')) {
            generateInfoContent();
        }
    });
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
});
