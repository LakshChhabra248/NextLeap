// --- DOM Element Selection ---
const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('start-btn');
const optionCards = document.querySelectorAll('.option-card');
const lockFeelingBtn = document.getElementById('lock-feeling-btn');
const startOverBtn = document.getElementById('start-over-btn');

const aiQuestionText = document.querySelector('#ai-question-area .question-text');
const userOptionsArea = document.getElementById('user-options-area');
const typingIndicator = document.getElementById('typing-indicator');
const logicalRecommendation = document.getElementById('logical-recommendation');
const roadmapContent = document.getElementById('roadmap-content');
const happinessSlider = document.getElementById('happiness-slider');


// --- Mock Data & State ---
// Hum yahan AI conversation ko simulate kar rahe hain
const conversationFlow = [
    {
        question: "Interesting! When you work on a project, what role do you naturally take on?",
        options: ["The Planner/Leader", "The Creative Thinker", "The Detailed Analyst"]
    },
    {
        question: "And what kind of problems excite you more?",
        options: ["Building efficient systems", "Creating something visually beautiful", "Solving complex logical puzzles"]
    }
];
let currentStep = 0;


// --- Core Functions ---

// Function to switch between screens with animation
function showScreen(screenId) {
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.add('active');
    }
}

// Function to load a new question and options
function loadQuestion(step) {
    const currentData = conversationFlow[step];
    aiQuestionText.textContent = currentData.question;
    
    // Clear old options and create new ones
    userOptionsArea.innerHTML = '';
    currentData.options.forEach(optionText => {
        const button = document.createElement('button');
        button.className = 'option-card';
        button.textContent = optionText;
        button.addEventListener('click', handleOptionClick);
        userOptionsArea.appendChild(button);
    });
    
    // Hide typing indicator and show options
    typingIndicator.style.display = 'none';
    userOptionsArea.style.display = 'grid';
}

// Function to handle user's choice
function handleOptionClick() {
    // Hide options and show typing indicator to simulate AI thinking
    userOptionsArea.style.display = 'none';
    typingIndicator.style.display = 'flex';
    
    setTimeout(() => {
        currentStep++;
        if (currentStep < conversationFlow.length) {
            loadQuestion(currentStep);
        } else {
            // End of conversation, move to happiness slider
            showScreen('happiness-screen');
        }
    }, 1500); // Simulate AI thinking for 1.5 seconds
}


// --- Event Listeners ---

startBtn.addEventListener('click', () => {
    showScreen('conversation-screen');
});

// Initial event listeners for the first set of options
optionCards.forEach(card => {
    card.addEventListener('click', handleOptionClick);
});

lockFeelingBtn.addEventListener('click', () => {
    const score = happinessSlider.value;
    
    // Simple logic: if score is low, suggest an alternative
    if (score <= 2) {
        roadmapContent.innerHTML = `
            <p>Thank you for being honest! Your heart isn't in Engineering. Let's explore a more creative analytical field...</p>
            <br>
            <p>Your journey into <strong>Data Science</strong> begins now! Focus on improving your Python skills, participate in hackathons, and start exploring college courses related to analytics.</p>
        `;
    } else {
        roadmapContent.innerHTML = `
            <p>Great! Your head and heart agree!</p>
            <br>
            <p>Your journey into <strong>Engineering</strong> begins now! Strengthen your Physics and Math concepts, try building small projects, and aim for top engineering entrance exams.</p>
        `;
    }
    
    showScreen('roadmap-screen');
});

startOverBtn.addEventListener('click', () => {
    // Reset state and go back to the beginning
    currentStep = 0;
    // Reload the initial question and options for the next run
    aiQuestionText.textContent = "Let's start with your favorite subject in school. What did you enjoy the most?";
    userOptionsArea.innerHTML = `
        <button class="option-card">Science & Math</button>
        <button class="option-card">Arts & Humanities</button>
        <button class="option-card">Commerce & Business</button>
    `;
    // Re-attach event listeners to the newly created buttons
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', handleOptionClick);
    });

    showScreen('landing-screen');
});