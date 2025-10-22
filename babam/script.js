// Quiz Questions Data
const quizQuestions = [
    {
        question: "Babanın en sevdiği yemek hangisi?",
        options: ["Kebap", "Balık", "Karnıyarık", "Pilav"],
        correct: 2
    },
    {
        question: "Babanın hobisi nedir?",
        options: ["Kitap okumak", "Bahçe işleri", "Televizyon izlemek", "Yürüyüş yapmak"],
        correct: 3
    },
    {
        question: "Babanın en seviği araba markası hangisidir?",
        options: ["BMW", "Mercedes", "Audi", "Volvo"],
        correct: 1
    },
    {
        question: "Babanın en sevdiği mevsim hangisi?",
        options: ["İlkbahar", "Yaz", "Sonbahar", "Kış"],
        correct: 2
    },
    {
        question: "Babanın en çok sevdiği müzik türü hangisi?",
        options: ["Klasik", "Pop", "Türk Halk Müziği", "Rock"],
        correct: 2
    }
];

// Global Variables
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Start Adventure Function
function startAdventure() {
    document.querySelector('.welcome-section').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';
    startQuiz();
}

// Start Quiz Function
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    showQuestion();
}

// Show Question Function
function showQuestion() {
    const question = quizQuestions[currentQuestion];
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('options');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    // Update progress
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `${currentQuestion + 1} / ${quizQuestions.length}`;
    
    // Set question text
    questionText.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const optionButton = document.createElement('div');
        optionButton.className = 'option';
        optionButton.textContent = option;
        optionButton.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionButton);
    });
    
    // Hide result section
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('questionCard').style.display = 'block';
}

// Select Option Function
function selectOption(selectedIndex) {
    const options = document.querySelectorAll('.option');
    const question = quizQuestions[currentQuestion];
    
    // Remove previous selections
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Mark selected option
    options[selectedIndex].classList.add('selected');
    
    // Store user answer
    userAnswers[currentQuestion] = selectedIndex;
    
    // Show correct/incorrect after a short delay
    setTimeout(() => {
        // Mark correct answer
        options[question.correct].classList.add('correct');
        
        // Mark incorrect if wrong
        if (selectedIndex !== question.correct) {
            options[selectedIndex].classList.add('incorrect');
        } else {
            score++;
        }
        
        // Disable all options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Move to next question after delay
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < quizQuestions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 2000);
    }, 1000);
}

// Show Result Function
function showResult() {
    document.getElementById('questionCard').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    
    const scoreDisplay = document.getElementById('scoreDisplay');
    const resultMessage = document.getElementById('resultMessage');
    
    // Calculate percentage
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    // Display score
    scoreDisplay.textContent = `${score}/${quizQuestions.length} (${percentage}%)`;
    
    // Display message based on score
    let message = '';
    if (percentage >= 80) {
        message = '🎉 Harika! Seni çok iyi tanıyorum! Sen gerçekten harika bir babasın!';
    } else if (percentage >= 60) {
        message = '😊 İyi! Seni oldukça iyi tanıyorum. Biraz daha öğrenmem gerekiyor!';
    } else if (percentage >= 40) {
        message = '🤔 Orta! Seni tanımaya devam ediyorum. Daha çok zaman geçirmemiz lazım!';
    } else {
        message = '😅 Hmm... Seni daha iyi tanımam gerekiyor! Daha çok konuşalım!';
    }
    
    resultMessage.textContent = message;
    
    // Show memory section after result
    setTimeout(() => {
        document.getElementById('memorySection').style.display = 'block';
        document.getElementById('memorySection').scrollIntoView({ behavior: 'smooth' });
        
        // Show message section after memory section
        setTimeout(() => {
            document.getElementById('messageSection').style.display = 'block';
            document.getElementById('messageSection').scrollIntoView({ behavior: 'smooth' });
        }, 2000);
    }, 3000);
}

// Restart Quiz Function
function restartQuiz() {
    startQuiz();
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add click effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add floating animation to memory cards
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.2) + 's';
        card.classList.add('animate-in');
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);