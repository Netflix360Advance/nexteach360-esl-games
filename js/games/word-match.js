// Word Match Game
function initWordMatchGame() {
    const gameContent = document.getElementById('game-content');
    
    const wordPairs = [
        { word: 'Happy', definition: 'Feeling joy or pleasure' },
        { word: 'Excited', definition: 'Feeling enthusiastic and eager' },
        { word: 'Brave', definition: 'Showing courage' },
        { word: 'Curious', definition: 'Eager to know or learn' },
        { word: 'Generous', definition: 'Willing to give and share' }
    ];
    
    let score = 0;
    let selectedWord = null;
    let selectedDefinition = null;
    let matchedPairs = 0;
    
    // Shuffle definitions
    const shuffledDefinitions = shuffleArray(wordPairs.map(pair => pair.definition));
    
    gameContent.innerHTML = `
        <div class="word-match-game">
            <h2>Word Match Game</h2>
            <div class="score">Score: <span id="score-value">0</span></div>
            <p style="text-align: center; margin: 20px 0;">Match each word with its correct definition</p>
            <div class="matching-grid">
                <div class="word-column" id="word-column"></div>
                <div class="definition-column" id="definition-column"></div>
            </div>
            <div id="message-area"></div>
        </div>
    `;
    
    const wordColumn = document.getElementById('word-column');
    const definitionColumn = document.getElementById('definition-column');
    
    // Create word items
    wordPairs.forEach((pair, index) => {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';
        wordItem.textContent = pair.word;
        wordItem.dataset.word = pair.word;
        wordItem.dataset.definition = pair.definition;
        wordItem.addEventListener('click', () => selectWord(wordItem));
        wordColumn.appendChild(wordItem);
    });
    
    // Create definition items
    shuffledDefinitions.forEach(definition => {
        const definitionItem = document.createElement('div');
        definitionItem.className = 'definition-item';
        definitionItem.textContent = definition;
        definitionItem.dataset.definition = definition;
        definitionItem.addEventListener('click', () => selectDefinition(definitionItem));
        definitionColumn.appendChild(definitionItem);
    });
    
    function selectWord(element) {
        if (element.classList.contains('matched')) return;
        
        // Deselect previous word
        if (selectedWord) {
            selectedWord.classList.remove('selected');
        }
        
        selectedWord = element;
        selectedWord.classList.add('selected');
        
        // Check if both are selected
        if (selectedDefinition) {
            checkMatch();
        }
    }
    
    function selectDefinition(element) {
        if (element.classList.contains('matched')) return;
        
        // Deselect previous definition
        if (selectedDefinition) {
            selectedDefinition.classList.remove('selected');
        }
        
        selectedDefinition = element;
        selectedDefinition.classList.add('selected');
        
        // Check if both are selected
        if (selectedWord) {
            checkMatch();
        }
    }
    
    function checkMatch() {
        const wordDef = selectedWord.dataset.definition;
        const selectedDef = selectedDefinition.dataset.definition;
        
        if (wordDef === selectedDef) {
            // Correct match
            selectedWord.classList.remove('selected');
            selectedWord.classList.add('matched');
            selectedDefinition.classList.remove('selected');
            selectedDefinition.classList.add('matched');
            
            score += 10;
            matchedPairs++;
            updateScore();
            showMessage('Correct! Great job! 🎉', 'success');
            
            selectedWord = null;
            selectedDefinition = null;
            
            // Check if all pairs are matched
            if (matchedPairs === wordPairs.length) {
                setTimeout(() => {
                    showMessage(`Congratulations! You completed the game with a score of ${score}! 🏆`, 'success');
                }, 500);
            }
        } else {
            // Incorrect match
            selectedWord.classList.add('incorrect');
            selectedDefinition.classList.add('incorrect');
            
            showMessage('Not quite! Try again. 🤔', 'error');
            
            setTimeout(() => {
                selectedWord.classList.remove('selected', 'incorrect');
                selectedDefinition.classList.remove('selected', 'incorrect');
                selectedWord = null;
                selectedDefinition = null;
            }, 1000);
        }
    }
    
    function updateScore() {
        document.getElementById('score-value').textContent = score;
    }
    
    function showMessage(text, type) {
        const messageArea = document.getElementById('message-area');
        messageArea.innerHTML = `<div class="message ${type}">${text}</div>`;
        
        setTimeout(() => {
            if (matchedPairs < wordPairs.length) {
                messageArea.innerHTML = '';
            }
        }, 2000);
    }
}
