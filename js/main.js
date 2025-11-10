// Main application logic
function loadGame(gameType) {
    // Hide game selection menu
    document.querySelector('.game-selection').classList.add('hidden');
    
    // Show game container
    const gameContainer = document.getElementById('game-container');
    gameContainer.classList.remove('hidden');
    
    // Load the appropriate game
    const gameContent = document.getElementById('game-content');
    gameContent.innerHTML = '';
    
    switch(gameType) {
        case 'word-match':
            initWordMatchGame();
            break;
        case 'vocabulary-quiz':
            initVocabularyQuiz();
            break;
        case 'sentence-builder':
            initSentenceBuilder();
            break;
    }
}

function backToMenu() {
    // Hide game container
    document.getElementById('game-container').classList.add('hidden');
    
    // Show game selection menu
    document.querySelector('.game-selection').classList.remove('hidden');
    
    // Clear game content
    document.getElementById('game-content').innerHTML = '';
}

// Utility function to shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
