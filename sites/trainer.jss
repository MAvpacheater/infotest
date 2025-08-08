// Trainer functionality

// Trainer data
const trainerData = {
    free: [
        { name: "Basic Trainer", description: "Provides 10% training speed boost and 5% strength increase", type: "free" },
        { name: "Rookie Coach", description: "Gives 15% training speed and 8% luck enhancement", type: "free" },
        { name: "Fitness Instructor", description: "Offers 12% training speed and 10% stamina boost", type: "free" },
        { name: "Gym Buddy", description: "Provides 8% training speed and 12% motivation increase", type: "free" },
        { name: "Community Trainer", description: "Gives 20% training speed but only during events", type: "free" },
        { name: "Volunteer Coach", description: "Offers 18% training speed and 6% overall stats boost", type: "free" },
        { name: "Student Mentor", description: "Provides 14% training speed and 9% experience gain", type: "free" }
    ],
    donate: [
        { name: "Elite Master", description: "Provides 45% training speed boost and 25% strength increase", type: "donate" },
        { name: "Pro Champion", description: "Gives 50% training speed and 30% luck enhancement", type: "donate" },
        { name: "Legendary Coach", description: "Offers 55% training speed and 35% all stats boost", type: "donate" },
        { name: "Supreme Trainer", description: "Provides 60% training speed and 40% experience multiplier", type: "donate" },
        { name: "Diamond Instructor", description: "Gives 65% training speed and 45% combat effectiveness", type: "donate" },
        { name: "Platinum Mentor", description: "Offers 70% training speed and 50% overall performance", type: "donate" },
        { name: "Ultimate Guru", description: "Provides 80% training speed and 60% all abilities enhancement", type: "donate" },
        { name: "Godlike Sensei", description: "Gives 100% training speed and 80% legendary boost to everything", type: "donate" }
    ]
};

let currentTrainerType = 'free';

// Switch between trainer types
function switchTrainerType(type) {
    currentTrainerType = type;
    
    // Update button states
    document.querySelectorAll('.trainer-switch-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    // Update sections
    document.querySelectorAll('.trainer-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${type}Trainers`).classList.add('active');
}

// Generate trainer content for a specific type
function generateTrainerContent(type, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    trainerData[type].forEach(trainer => {
        const trainerItem = document.createElement('div');
        trainerItem.className = 'trainer-item';
        trainerItem.innerHTML = `
            <div class="trainer-content">
                <div class="trainer-name">${trainer.name}</div>
                <div class="trainer-description">${trainer.description}</div>
            </div>
            <div class="trainer-type ${trainer.type}">${trainer.type}</div>
        `;
        container.appendChild(trainerItem);
    });
}

// Generate all trainer content
function generateAllTrainerContent() {
    generateTrainerContent('free', 'freeTrainers');
    generateTrainerContent('donate', 'donateTrainers');
}

// Initialize when page loads
function initializeTrainer() {
    generateAllTrainerContent();
    switchTrainerType('free');
}

// Track when user switches to "trainer" page
document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        const trainerPage = document.getElementById('trainerPage');
        if (trainerPage && trainerPage.classList.contains('active')) {
            generateAllTrainerContent();
        }
    });
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
});
