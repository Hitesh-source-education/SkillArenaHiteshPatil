const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        answer: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Silver", "Iron"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    
    questionContainer.classList.add("fade-in");
    questionElement.textContent = questions[currentQuestion].question;
    optionsElement.innerHTML = "";
    
    questions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement("button");
        const label = document.createElement("span");
        label.classList.add("option-label");
        label.textContent = String.fromCharCode(65 + index); // A, B, C, D
        button.appendChild(label);
        button.appendChild(document.createTextNode(option));
        button.onclick = () => selectAnswer(index);
        button.classList.add("slide-in");
        button.style.animationDelay = `${index * 0.1}s`;
        optionsElement.appendChild(button);
    });

    updateProgressBar();
}

function selectAnswer(selectedIndex) {
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach(button => button.disabled = true);

    const correctIndex = questions[currentQuestion].answer;
    buttons[correctIndex].style.backgroundColor = "rgba(76, 175, 80, 0.3)";

    if (selectedIndex === correctIndex) {
        score++;
    } else {
        buttons[selectedIndex].style.backgroundColor = "rgba(244, 67, 54, 0.3)";
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    const container = document.querySelector(".container");
    const resultElement = document.getElementById("result");
    const gifContainer = document.getElementById("gif-container");
    
    container.innerHTML = "";
    container.appendChild(resultElement);
    container.appendChild(gifContainer);
    
    const percentage = (score / questions.length) * 100;
    resultElement.textContent = `Your score: ${score}/${questions.length} (${percentage.toFixed(2)}%)`;
    resultElement.classList.add("fade-in");
    
    const gifImg = document.createElement("img");
    if (percentage >= 60) {
        gifImg.src = "https://media.giphy.com/media/3o6fJ1BM7R2EBRDnxK/giphy.gif";
        gifImg.alt = "Winner GIF";
        resultElement.innerHTML += "<br><span class='success'>Congratulations! You're a quantum genius!</span>";
    } else {
        gifImg.src = "https://media.giphy.com/media/l1J9EdzfOSgfyueLm/giphy.gif";
        gifImg.alt = "Loser GIF";
        resultElement.innerHTML += "<br><span class='failure'>Don't worry, even Einstein made mistakes!</span>";
    }
    gifContainer.appendChild(gifImg);
    gifContainer.classList.add("fade-in");

    const retryButton = document.createElement("button");
    retryButton.textContent = "Try Again";
    retryButton.onclick = resetQuiz;
    retryButton.classList.add("fade-in");
    container.appendChild(retryButton);
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    const container = document.querySelector(".container");
    container.innerHTML = `
        <h1><i class="fas fa-brain"></i> Quantum Quiz</h1>
        <div id="question-container">
            <div id="question"></div>
            <div id="options" class="options"></div>
        </div>
        <div id="result"></div>
        <div id="gif-container"></div>
        <div id="progress-bar"><div id="progress"></div></div>
    `;
    loadQuestion();
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress");
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

loadQuestion();