// Sentence Builder Game
function initSentenceBuilder() {
    const gameContent = document.getElementById('game-content');
    
    const sentences = [
        {
            target: 'The cat is sleeping on the couch',
            words: ['The', 'cat', 'is', 'sleeping', 'on', 'the', 'couch']
        },
        {
            target: 'I like to read books every day',
            words: ['I', 'like', 'to', 'read', 'books', 'every', 'day']
        },
        {
            target: 'She goes to school by bus',
            words: ['She', 'goes', 'to', 'school', 'by', 'bus']
        }
    ];
    
    let currentSentence = 0;
    let score = 0;
    let builtSentence = [];
    
    gameContent.innerHTML = `
        <div class="sentence-builder-game">
            <h2>Sentence Builder</h2>
            <div class="score">Score: <span id="sentence-score">0</span></div>
            <p style="text-align: center; margin: 20px 0;">Build the sentence by clicking on the words in the correct order</p>
            <div class="target-sentence">
                <strong>Target:</strong> <span id="target-text">${sentences[currentSentence].target}</span>
            </div>
            <div class="sentence-area" id="sentence-area">
                <p style="color: #999;">Click words below to build your sentence...</p>
            </div>
            <div class="word-bank" id="word-bank"></div>
            <div class="sentence-controls">
                <button class="check-button" onclick="checkSentence()">Check Answer</button>
                <button class="reset-button" onclick="resetSentence()">Reset</button>
            </div>
            <div id="sentence-message"></div>
        </div>
    `;
    
    loadSentence();
    
    function loadSentence() {
        if (currentSentence >= sentences.length) {
            showFinalResults();
            return;
        }
        
        builtSentence = [];
        const sentence = sentences[currentSentence];
        const shuffledWords = shuffleArray(sentence.words);
        
        document.getElementById('target-text').textContent = sentence.target;
        document.getElementById('sentence-area').innerHTML = '<p style="color: #999;">Click words below to build your sentence...</p>';
        document.getElementById('sentence-message').innerHTML = '';
        
        const wordBank = document.getElementById('word-bank');
        wordBank.innerHTML = '';
        
        shuffledWords.forEach((word, index) => {
            const wordChip = document.createElement('div');
            wordChip.className = 'word-chip';
            wordChip.textContent = word;
            wordChip.dataset.word = word;
            wordChip.dataset.index = index;
            wordChip.addEventListener('click', () => addWordToSentence(wordChip));
            wordBank.appendChild(wordChip);
        });
    }
    
    window.addWordToSentence = function(wordChip) {
        const word = wordChip.dataset.word;
        builtSentence.push(word);
        
        // Move word to sentence area
        wordChip.remove();
        
        const sentenceArea = document.getElementById('sentence-area');
        if (builtSentence.length === 1) {
            sentenceArea.innerHTML = '';
        }
        
        const newWordChip = document.createElement('div');
        newWordChip.className = 'word-chip';
        newWordChip.textContent = word;
        newWordChip.dataset.word = word;
        newWordChip.addEventListener('click', () => removeWordFromSentence(newWordChip));
        sentenceArea.appendChild(newWordChip);
    };
    
    function removeWordFromSentence(wordChip) {
        const word = wordChip.dataset.word;
        const index = builtSentence.indexOf(word);
        if (index > -1) {
            builtSentence.splice(index, 1);
        }
        
        // Move word back to word bank
        wordChip.remove();
        
        const wordBank = document.getElementById('word-bank');
        const newWordChip = document.createElement('div');
        newWordChip.className = 'word-chip';
        newWordChip.textContent = word;
        newWordChip.dataset.word = word;
        newWordChip.addEventListener('click', () => addWordToSentence(newWordChip));
        wordBank.appendChild(newWordChip);
        
        // Update sentence area
        const sentenceArea = document.getElementById('sentence-area');
        if (builtSentence.length === 0) {
            sentenceArea.innerHTML = '<p style="color: #999;">Click words below to build your sentence...</p>';
        }
    }
    
    window.checkSentence = function() {
        const sentence = sentences[currentSentence];
        const userSentence = builtSentence.join(' ');
        const messageArea = document.getElementById('sentence-message');
        
        if (userSentence === sentence.target) {
            score++;
            document.getElementById('sentence-score').textContent = score;
            messageArea.innerHTML = '<div class="message success">Correct! Well done! 🎉</div>';
            
            setTimeout(() => {
                currentSentence++;
                messageArea.innerHTML = '';
                loadSentence();
            }, 2000);
        } else {
            messageArea.innerHTML = '<div class="message error">Not quite right. Try again! 🤔</div>';
            
            setTimeout(() => {
                messageArea.innerHTML = '';
            }, 2000);
        }
    };
    
    window.resetSentence = function() {
        // Move all words back to word bank
        while (builtSentence.length > 0) {
            const sentenceArea = document.getElementById('sentence-area');
            const wordChips = sentenceArea.querySelectorAll('.word-chip');
            if (wordChips.length > 0) {
                removeWordFromSentence(wordChips[0]);
            } else {
                break;
            }
        }
    };
    
    function showFinalResults() {
        gameContent.innerHTML = `
            <div class="sentence-builder-game">
                <h2>Sentence Builder Complete!</h2>
                <div style="text-align: center; padding: 40px;">
                    <p style="font-size: 2em; margin: 20px 0;">Final Score: ${score} / ${sentences.length}</p>
                    <p style="font-size: 1.5em;">
                        ${score === sentences.length ? 'Perfect! You are a sentence master! 🏆' : 
                          score >= sentences.length / 2 ? 'Great work! Keep practicing! 👍' : 
                          'Keep learning! You can do it! 📚'}
                    </p>
                </div>
            </div>
        `;
    }
}
