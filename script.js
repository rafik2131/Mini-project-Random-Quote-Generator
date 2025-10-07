// Audio context for better sound management
let audioContext;
const sounds = {};

// Initialize audio context on first user interaction
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Preload all sound files
function preloadSounds() {
    const soundFiles = [
        'boom', 'clap', 'hihat', 'kick', 'openhat', 
        'ride', 'snare', 'tink', 'tom'
    ];
    
    soundFiles.forEach(soundName => {
        const audio = new Audio(`sounds/${soundName}.wav`);
        audio.preload = 'auto';
        sounds[soundName] = audio;
    });
}

// Play sound function
function playSound(soundName) {
    initAudioContext();
    
    if (sounds[soundName]) {
        // Reset audio to beginning and play
        sounds[soundName].currentTime = 0;
        sounds[soundName].play().catch(error => {
            console.log('Audio play failed:', error);
        });
    }
}

// Add visual feedback when playing
function addVisualFeedback(keyElement) {
    keyElement.classList.add('playing');
    setTimeout(() => {
        keyElement.classList.remove('playing');
    }, 150);
}

// Handle drum key click
function handleDrumKeyClick(event) {
    const keyElement = event.currentTarget;
    const soundName = keyElement.getAttribute('data-sound');
    
    playSound(soundName);
    addVisualFeedback(keyElement);
}

// Handle keyboard press
function handleKeyPress(event) {
    const key = event.key.toLowerCase();
    const keyElement = document.querySelector(`[data-key="${key}"]`);
    
    if (keyElement) {
        const soundName = keyElement.getAttribute('data-sound');
        playSound(soundName);
        addVisualFeedback(keyElement);
    }
}

// Initialize the drumset
function initDrumset() {
    // Preload sounds
    preloadSounds();
    
    // Add click event listeners to all drum keys
    const drumKeys = document.querySelectorAll('.drum-key');
    drumKeys.forEach(key => {
        key.addEventListener('click', handleDrumKeyClick);
    });
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyPress);
    
    // Initialize audio context on first user interaction
    document.addEventListener('click', initAudioContext, { once: true });
    document.addEventListener('keydown', initAudioContext, { once: true });
    
    console.log('Drumset initialized! Press keys A, S, D, F, G, H, J, K, L or click the buttons to play sounds.');
}

// Start the drumset when the page loads
document.addEventListener('DOMContentLoaded', initDrumset);

// Add some fun features
function addFunFeatures() {
    // Add random color effect on successful sound play
    const originalPlaySound = playSound;
    playSound = function(soundName) {
        originalPlaySound(soundName);
        
        // Add a subtle screen flash effect
        document.body.style.transition = 'background-color 0.1s';
        document.body.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
        setTimeout(() => {
            document.body.style.backgroundColor = 'transparent';
        }, 100);
    };
}

// Initialize fun features
addFunFeatures();
