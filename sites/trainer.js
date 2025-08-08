// Trainer functionality

// Trainer data
const trainerData = {
    free: [
        { name: "Basic Trainer", description: "420% Strength -- 162% luck -- 177% wins", type: "free" },
        { name: "Rookie Coach", description: "420% Strength -- 162% luck -- 177% wins", type: "free" },
        { name: "Fitness Instructor", description: "420% Strength -- 162% luck -- 177% wins", type: "free" },
        { name: "Gym Buddy", description: "420% Strength -- 162% luck -- 177% wins", type: "free" },
        { name: "Community Trainer", description: "420% Strength -- 162% luck -- 177% wins", type: "free" },
        { name: "Volunteer Coach", description: "420% Strength -- 162% luck -- 177% wins", type: "free" },
        { name: "Student Mentor", description: "420% Strength -- 162% luck -- 177% wins", type: "free" }
    ],
    donate: [
        { name: "Manager guard", description: "280%/420% Strength -- 108%/162% luck -- 118%/177% wins, type: "donate" },
        { name: "Shrine Master", description: "230%/345% Strength -- 77%/115.5% luck -- 85%/127.5% wins", type: "donate" },
        { name: "Legendary Coach", description: "420% Strength -- 162% luck -- 177% wins", type: "donate" },
        { name: "Supreme Trainer", description: "420% Strength -- 162% luck -- 177% wins", type: "donate" },
        { name: "Diamond Instructor", description: "420% Strength -- 162% luck -- 177% wins", type: "donate" },
        { name: "Platinum Mentor", description: "420% Strength -- 162% luck -- 177% wins", type: "donate" },
        { name: "Ultimate Guru", description: "420% Strength -- 162% luck -- 177% wins", type: "donate" },
        { name: "Godlike Sensei", description: "420% Strength -- 162% luck -- 177% wins", type: "donate" }
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
    
    const activeBtn = document.querySelector(`[data-type="${type}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Update sections
    document.querySelectorAll('.trainer-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const activeSection = document.getElementById(`${type}Trainers`);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

// Generate trainer content for a specific type
function generateTrainerContent(type, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.log(`Container ${containerId} not found`);
        return;
    }
    
    container.innerHTML = '';
    
    const trainers = trainerData[type];
    if (!trainers) {
        console.log(`No trainers found for type: ${type}`);
        return;
    }
    
    trainers.forEach(trainer => {
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
    
    console.log(`Generated ${trainers.length} trainers for ${type}`);
}

// Generate all trainer content
function generateAllTrainerContent() {
    console.log('Generating all trainer content...');
    generateTrainerContent('free', 'freeTrainers');
    generateTrainerContent('donate', 'donateTrainers');
}

// Initialize trainer functionality
function initializeTrainer() {
    console.log('Initializing trainer...');
    
    // Wait a bit for DOM to be ready
    setTimeout(() => {
        generateAllTrainerContent();
        switchTrainerType('free');
        console.log('Trainer initialization completed');
    }, 100);
}

// Make sure initializeTrainer runs when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTrainer);
} else {
    initializeTrainer();
}

// Also run when trainer page becomes active
document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const trainerPage = document.getElementById('trainerPage');
                if (trainerPage && trainerPage.classList.contains('active')) {
                    console.log('Trainer page became active, regenerating content...');
                    generateAllTrainerContent();
                }
            }
        });
    });
    
    const trainerPage = document.getElementById('trainerPage');
    if (trainerPage) {
        observer.observe(trainerPage, { attributes: true });
    }
});

// Global function for window object (fallback)
window.switchTrainerType = switchTrainerType;
