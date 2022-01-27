//starter variables
var scoresBtn = document.querySelector(".scores a");
var timerE1 = document.querySelector("#timer");
var quizMain = document.querySelector(".what-to-do");
var startBtn = document.querySelector("#start-btn");
var quizQuAns = document.querySelector(".quest-ans");
var questOpt = document.querySelector("#questions");
var ansOpt = document.querySelector("#answers");
var endTest = document.querySelector(".view-score");
var initialInput = document.querySelector(".initial-input");
var submitBtn = document.querySelector("#submit-btn");
var scoreRank = document.querySelector(".score-rank");
var backBtn = document.querySelector("#back-btn");
var clearBtn = document.querySelector("#clear-btn");
var inCorrect = document.querySelector(".inCorrect")
var highScores = document.querySelector(".high-scores");

//values
var timerValue = 75;
var timeUsed = 0;
var score = 0;
var questNumb = 0;
var questionIndex = 0;

//buttons
startBtn.addEventListener("click", startQuiz);
backBtn.addEventListener("click", refresh);
clearBtn.addEventListener("click", clearHighScore);
submitBtn.addEventListener("click", hsScreen);

// questions + answers
var questions = [
    {
        question: "Commonly used data types do NOT include:",
        choices:[
        "1. Strings",
        "2. Booleans",
        "3. Alerts",
        "4. Numbers",
        ],
        ans: "3. Alerts",
    },
    {
        question: "The condition in an if/an statement is enclosed with ____.",
        choices:[
        "1. Quotes",
        "2. Curly Brackets",
        "3. Parenthesis",
        "4. Square Brackets",
        ],
        ans: "3. Parenthesis",
    },
    {
        question: "questionsays in JavaScript can be used to store ___.",
        choices:[
        "1. Numbers and strings ",
        "2. Other questionsays",
        "3. Booleans",
        "4. All of the above",
        ],
        ans: "4. All of the above",
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        choices:[
        "1. Commas",
        "2. Curly brackets",
        "3. Quotes",
        "4. Parenthesis",
        ],
        ans: "3. Quotes",
    },
    {
        question: "A very useful tool during development and debugging for printing content to the debugger is:",
        choices:[
        "1. JavaScript",
        "2. Terminal/bash",
        "3. For loops",
        "4. Console.log",
        ],
        ans: "4. Console.log",
    },

];


//hide score section
endTest.style.display = "none";

//reset bascis
function quizBasics() {
    initialInput.style.display = "none";
    submitBtn.style.display = "none";
    clearBtn.style.display = "none";
    backBtn.style.display = "none";
    endTest.style.display = "none";
    timerE1.textContent = `Time: ${timerValue}`;
}

//start button function + timer 
function startQuiz() {
    startBtn.style.display = "none";
    timerValue = 75;
    function timer() {
        var timer = setInterval(function () {
            timerValue--;
            timerE1.textContent = `Time: ${timerValue}`;
            if (timerValue <= 0 && questNumb < questions[questionIndex]) {
                clearInterval(timer);
                alert("Time is up!");
                endQuiz();
            }
            if (timerValue < 0) {
                timerValue = 0;
            }
        }, 1000);
    }
    timer();
    displayQuestions();
    quizMain.style.display = "none"; //hides opening page instructions
}

function displayQuestions() {
    var questNumb = questions[questionIndex];
    quizQuAns.textContent = questNumb.question;
   
}

function displayAns() {
    // display answer choices
    var answers = document.querySelector(".answers");

//LEFT OFF FIXING THIS 
    for (var i = 0; i < answers.length; i++) {
        choicesBtn = document.createElement("button");
        choicesBtn.style.display = "button answer-option-node";
        choicesBtn.setAttribute("value", `${value}`);
        choicesBtn.textContent = `${value}`;
        // console.log(choicesBtn);
        choicesBtn.onclick = clickedAns;
        quizQuAns.appendChild(choicesBtn);
    }
}
 
function chosenAns() {
    // Check if guess is wrong
    if (this.value !== questions[questionIndex].ans) {
        timerValue -= 10;
        if (timerValue < 0) {
            timerValue = 0;
        }
        timerE1.textContent = `Time: ${timerValue}`;
        inCorrect.style.display = "block";
        inCorrect.textContent = "Wrong!";
    } else {
        inCorrect.style.display = "block";
        inCorrect.textContent = "Correct!";
        score++;
    }
    questionIndex++;

    if (questionIndex === questions.length) {
        endQuiz();
    } else {
        displayQuestions();
    }
}

function endQuiz() {
    choicesBtn.style.display = "none";
    inCorrect.style.display = "none";
    endTest.style.display = "block";
    timerE1.style.display = "none";
    quizQuAns.style.display = "none";
    highScores.style.display = "none";
    backBtn.style.display = "none";
    clearBtn.style.display = "none";
   var endScore = document.querySelector('.score');
    endScore.textContent =
        "Your final score is " + score + " out of 5.";
    submitBtn.style.display = "block";
}

// function hsScreenCheck() {
//     if (initialInput.value === "") {
//         alert(
//             "Since no value was placed in the High Score name box, 'Anonymous' will be used instead."
//         );
//         initialInput.value = "Anonymous";
//         hsScreen("Anonymous", timerValue);
//     } else {
//         hsScreen(initialInput.value, timerValue);
//     }
// }

scoresBtn.addEventListener("click", hsScreen)

function hsScreen(name, score) {
    highScores.style.display = "block"
    var donePage = document.querySelector(".done-page");
    donePage.style.display = "none";
    backBtn.style.display = "block";
    clearBtn.style.display = "block";
    initialInput.style.display = "none";
    submitBtn.style.display = "none";
    var highScore = { name, score };
    var storedScore = localStorage.getItem("scores");
    if (storedScore === null) {
        quizMain.textContent = "There are no high scores :(";
        localStorage.setItem("scores", JSON.stringify([highScore]));
    } else {
        var parsedScore = JSON.parse(storedScore);
        parsedScore.push(highScore);
        parsedScore.sort((a, b) => b.score - a.score);
        parsedScore.splice(10);
        localStorage.setItem("scores", JSON.stringify(parsedScore));
    }
    var scoreValue = docment.querySelector(".score-value")
    scoreValue.textContent = parsedScore.map((score) => `<li>${score.name} - ${score.score}`).join("");
}

function clearHighScore() {
    localStorage.clear();
    hsScreen();
}

function refresh() {
    location.reload();
}

