const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const retryBtn = document.getElementById('retry-btn');
const userInput = document.getElementById('user-input');
const timeSpan = document.getElementById('time');

let startTime = null;
let endTime = null;
let timerRunning = false;

function startTest() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    retryBtn.disabled = true;
    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();
    startTime = performance.now();
    endTime = null;
    timerRunning = true;
    timeSpan.textContent = '0';
}

function stopTest() {
    if (!timerRunning) return;
    endTime = performance.now();
    timerRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    retryBtn.disabled = false;
    userInput.disabled = true;
    displayTestTime();
}

function displayTestTime() {
    if (startTime && endTime) {
        const seconds = ((endTime - startTime) / 1000).toFixed(2);
        timeSpan.textContent = seconds;
    }
}

function retryTest() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    retryBtn.disabled = true;
    userInput.value = '';
    userInput.disabled = true;
    timeSpan.textContent = '0';
    startTime = null;
    endTime = null;
    timerRunning = false;
    updateSampleText();
}

// Initialize button states and input
function initializeTestUI() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    retryBtn.disabled = true;
    userInput.value = '';
    userInput.disabled = true;
    timeSpan.textContent = '0';
}

startBtn.addEventListener('click', startTest);
stopBtn.addEventListener('click', stopTest);
retryBtn.addEventListener('click', retryTest);

document.addEventListener('DOMContentLoaded', function() {
    initializeTestUI();

    const easyTexts = [
        "The cat sat on the mat.",
        "A quick brown fox jumps over the lazy dog.",
        "She sells seashells by the seashore."
    ];

    const mediumTexts = [
        "To be or not to be, that is the question.",
        "All that glitters is not gold.",
        "A journey of a thousand miles begins with a single step."
    ];

    const hardTexts = [
        "It was the best of times, it was the worst of times.",
        "In the beginning God created the heavens and the earth.",
        "The only thing we have to fear is fear itself."
    ];

    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');

    function getRandomText(textArray) {
        const randomIndex = Math.floor(Math.random() * textArray.length);
        return textArray[randomIndex];
    }

    function updateSampleText() {
        let selectedDifficulty = difficultySelect.value;
        let selectedText;

        if (selectedDifficulty === 'easy') {
            selectedText = getRandomText(easyTexts);
        } else if (selectedDifficulty === 'medium') {
            selectedText = getRandomText(mediumTexts);
        } else if (selectedDifficulty === 'hard') {
            selectedText = getRandomText(hardTexts);
        }

        sampleTextDiv.textContent = selectedText;
    }

    difficultySelect.addEventListener('change', updateSampleText);

    // Initialize with a random text from the default difficulty level
    updateSampleText();
});