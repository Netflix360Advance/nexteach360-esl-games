// Vocabulary Quiz Game
function initVocabularyQuiz() {
    const gameContent = document.getElementById('game-content');
    
    const questions = [
        {
            question: 'What does "abundant" mean?',
            options: ['Scarce', 'Plentiful', 'Small', 'Rare'],
            correct: 1
        },
        {
            question: 'Choose the synonym for "happy":',
            options: ['Sad', 'Angry', 'Joyful', 'Tired'],
            correct: 2
        },
        {
            question: 'What is the opposite of "difficult"?',
            options: ['Easy', 'Hard', 'Complex', 'Tough'],
            correct: 0
        },
        {
            question: 'Which word means "very small"?',
            options: ['Huge', 'Tiny', 'Large', 'Giant'],
            correct: 1
        },
        {
            question: 'What does "benevolent" mean?',
            options: ['Mean', 'Kind', 'Angry', 'Sad'],
            correct: 1
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    let answered = false;
    
    gameContent.innerHTML = `
        <div class="quiz-game">
            <h2>Vocabulary Quiz</h2>
            <div class="score">Score: <span id="quiz-score">0</span>/${questions.length}</div>
            <div id="quiz-question-container"></div>
            <div class="quiz-controls">
                <button id="next-button" style="display: none;">Next Question</button>
            </div>
        </div>
    `;
    
    showQuestion();
    
    function showQuestion() {
        if (currentQuestion >= questions.length) {
            showResults();
            return;
        }
        
        answered = false;
        const question = questions[currentQuestion];
        const questionContainer = document.getElementById('quiz-question-container');
        
        let optionsHTML = '';
        question.options.forEach((option, index) => {
            optionsHTML += `
                <div class="quiz-option" data-index="${index}" onclick="selectAnswer(${index})">
                    ${option}
                </div>
            `;
        });
        
        questionContainer.innerHTML = `
            <div class="quiz-question">
                <h3>Question ${currentQuestion + 1} of ${questions.length}</h3>
                <p>${question.question}</p>
                <div class="quiz-options" id="quiz-options">
                    ${optionsHTML}
                </div>
            </div>
        `;
    }
    
    window.selectAnswer = function(selectedIndex) {
        if (answered) return;
        
        answered = true;
        const question = questions[currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            }
            if (index === selectedIndex && selectedIndex !== question.correct) {
                option.classList.add('incorrect');
            }
            option.style.pointerEvents = 'none';
        });
        
        if (selectedIndex === question.correct) {
            score++;
            document.getElementById('quiz-score').textContent = score;
        }
        
        // Show next button
        const nextButton = document.getElementById('next-button');
        nextButton.style.display = 'inline-block';
        nextButton.onclick = nextQuestion;
    };
    
    function nextQuestion() {
        currentQuestion++;
        document.getElementById('next-button').style.display = 'none';
        showQuestion();
    }
    
    function showResults() {
        const questionContainer = document.getElementById('quiz-question-container');
        const percentage = Math.round((score / questions.length) * 100);
        
        let resultMessage = '';
        if (percentage >= 80) {
            resultMessage = 'Excellent work! 🌟';
        } else if (percentage >= 60) {
            resultMessage = 'Good job! Keep practicing! 👍';
        } else {
            resultMessage = 'Keep learning! You can do better! 📚';
        }
        
        questionContainer.innerHTML = `
            <div class="quiz-question">
                <h3>Quiz Complete!</h3>
                <p style="font-size: 2em; margin: 20px 0;">${score} / ${questions.length}</p>
                <p style="font-size: 1.5em; margin: 20px 0;">${percentage}%</p>
                <p style="font-size: 1.2em;">${resultMessage}</p>
            </div>
        `;
        
        document.getElementById('next-button').style.display = 'none';
    }
}
