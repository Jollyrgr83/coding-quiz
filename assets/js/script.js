// DOM elements
var headerElement = document.getElementById("header");
var startButtonElement = document.getElementById("start-button");
var timerElement = document.getElementById("timer");
var closeButtonElement = document.getElementById("close-button");
var clearButtonElement = document.getElementById("clear-button");
var highScoresButtonElement = document.getElementById("high-scores-button");
var timerDisplayElement = document.getElementById("timer-value");
var questionNumberElement = document.getElementById("question-number");
var questionTextElement = document.getElementById("question");
var aAnswerElement = document.getElementById("a");
var bAnswerElement = document.getElementById("b");
var cAnswerElement = document.getElementById("c");
var dAnswerElement = document.getElementById("d");
var answersContainerElement = document.getElementById("answers");
var startScreenElement = document.getElementById("start-screen");
var quizScreenElement = document.getElementById("quiz-screen");
var endScreenElement = document.getElementById("end-screen");
var highScoreScreenElement = document.getElementById("high-score-screen");
var initialsInputElement = document.getElementById("initials-input");
var finalScoreElement = document.getElementById("final-score");
var submitButtonElement = document.getElementById("submit-button");
var highScoreDisplayElement = document.getElementById("high-score-display");
// variables
var secondsLeft = 30;
var interval;
var questionCounter = 1;
var userScore = 0;
// sound files
var right = new Audio("./assets/sounds/Yes.mp3");
var wrong = new Audio("./assets/sounds/No.mp3")
// object containing quiz questions and answers
var quizDatabase = {
    1: {
        "question": "When using the <img> tag, what does the alt attribute do?",
        "answers": {
            "a": "set the source link for a different image if the browser cannot display the main image",
            "b": "displays a caption for the picture",
            "c": "provides a description for accessibility",
            "d": "sets the file type"},
        "correct": "c"},
    2: {
        "question": "What is the expected output for the following javascript code: var a = 'abc' += 'def'; console.log(a); ?",
        "answers": {
            "a": "undefined",
            "b": "abcdef",
            "c": "[abc, def]",
            "d": "abc def"},
        "correct": "b"},
    3: {
        "question": "Which index does an array start with?",
        "answers": {
            "a": "a",
            "b": "A",
            "c": "1",
            "d": "0"},
        "correct": "d"},
    4: {
        "question": "What data type is stored in the following array: var a = ['0', 'a', 'true']; ?",
        "answers": {
            "a": "boolean",
            "b": "string",
            "c": "number",
            "d": "all of the above"},
        "correct": "b"},
    5: {
        "question": "In javascript, what does the push() method do?",
        "answers": {
            "a": "removes the first item in the array",
            "b": "removes the last item in the array",
            "c": "adds the item in parentheses to the beginning of the array",
            "d": "adds the item in parentheses to the end of the array"},
        "correct": "d"},
    6: {
        "question": "Which of the following will be displayed: var array = [1, 2, 3]; array.unshift(0, 5); console.log(array);?",
        "answers": {
            "a": "[1, 2, 3, 5, 0]",
            "b": "[1, 2, 3, 0, 5]",
            "c": "[0, 5, 1, 2, 3]",
            "d": "[5, 0, 1, 2, 3]"},
        "correct": "c"},
    7: {
        "question": "What does the following do: var a = document.body.children[0].value;?",
        "answers": {
            "a": "assigns the value of the first child element of the body to the variable a",
            "b": "deletes the value in child element",
            "c": "sets the value of variable a to 0",
            "d": "assigns the value of variable a to the first child element of the body"},
        "correct": "a"},
    8: {
        "question": "Which of the following will be displayed: var array = [0, 1, 2, 3, 4]; console.log(array.length); ?",
        "answers": {
            "a": "undefined",
            "b": "4",
            "c": "5",
            "d": "true"},
        "correct": "c"},
    9: {
        "question": "Which of the following will be displayed: var word = 'abcdef'; console.log(word.charAt(3); ?",
        "answers": {
            "a": "undefined",
            "b": "d",
            "c": "c",
            "d": "abc3def"},
        "correct": "b"},
    10: {
        "question": "What does the <u> element represent in html?",
        "answers": {
            "a": "an element containing user data",
            "b": "an unordered list",
            "c": "undefined",
            "d": "an element with underlined text"},
        "correct": "d"},
                      
        }
// startScreen - displays welcome message and instructions and starts quizScreen when user clicks start button
function startScreen() {
    // displays start screen by changing class on start screen div to show and others to hide
    startScreenElement.setAttribute("class", "container p-3 show");
    quizScreenElement.setAttribute("class", "container p-3 hide");
    endScreenElement.setAttribute("class", "container p-3 hide");
    highScoreScreenElement.setAttribute("class", "container p-3 hide");
    headerElement.setAttribute("class", "show");
    timerElement.setAttribute("class", "container p-3 top hide");
    // adds event listener to call highScoreScreen if user clicks link
    highScoresButtonElement.addEventListener("click", function() {
    highScoreScreen();
    })
    // clears timer
    clearInterval(interval);
    // resets timer
    secondsLeft = 30;
    // resets questionCounter to 1
    questionCounter = 1;
    // assigns event listener to start button
    startButtonElement.addEventListener("click", function() {
        quizScreen(questionCounter);
        // starts timer
        clearInterval(interval);
        interval = setInterval(function() {
            secondsLeft = secondsLeft - 0.1;
            timerDisplayElement.textContent = secondsLeft.toFixed(1);
            if (secondsLeft <= 0) {
                endScreen(userScore);
                clearInterval(interval);
            }
        }, 100);
    })
}
// quizScreen - displays questions and answers
function quizScreen(questionCounter) {
    // used to display question number in question title section of quiz screen
    var quizDatabaseKeyArray = Object.keys(quizDatabase);
    // displays quiz screen by changing class on quiz screen div to show and others to hide
    quizScreenElement.setAttribute("class", "container p-3 show");
    startScreenElement.setAttribute("class", "container p-3 hide");
    endScreenElement.setAttribute("class", "container p-3 hide");
    highScoreScreenElement.setAttribute("class", "container p-3 hide");
    headerElement.setAttribute("class", "hide");
    timerElement.setAttribute("class", "container p-3 top show");
    // renders question and answers to screen
    questionNumberElement.textContent = quizDatabaseKeyArray[questionCounter - 1];
    questionTextElement.textContent = quizDatabase[questionCounter].question;
    aAnswerElement.textContent = "a. " + quizDatabase[questionCounter].answers.a;
    bAnswerElement.textContent = "b. " + quizDatabase[questionCounter].answers.b;
    cAnswerElement.textContent = "c. " + quizDatabase[questionCounter].answers.c;
    dAnswerElement.textContent = "d. " + quizDatabase[questionCounter].answers.d;
}
// event listener for answer buttons to accept user's answers, update timer, update score, and call endScreen
answersContainerElement.addEventListener("click", function(event) {
    // used to store user's answer (a, b, c, or d) to compare against correct answer
    var userAnswer;
    // used to store correct answer to each question to compare against user's answer
    var correctAnswer;  
    // reset timer for new time
    clearInterval(interval);
    interval = setInterval(function() {
        secondsLeft = secondsLeft - 0.1;
        timerDisplayElement.textContent = secondsLeft.toFixed(1);
        if (secondsLeft <= 0) {
            endScreen(userScore);
            clearInterval(interval);
        }
    }, 100);
    // action on answer button click
    if (event.target.matches("button")) {
        // assigns selected button id to userAnswer
        userAnswer = event.target.id;
        // retrieves correct answer
        correctAnswer = quizDatabase[questionCounter].correct;
        // compares userAnswer to correctAnswer
        if (userAnswer === correctAnswer) {
            // play correct sound
            right.play();
            // add to score
            userScore = userScore + 10;
            // add 10 seconds and reset timer
            clearInterval(interval);
            secondsLeft = secondsLeft + 10;
            interval = setInterval(function() {
                secondsLeft = secondsLeft - 0.1;
                timerDisplayElement.textContent = secondsLeft.toFixed(1);
                    if (secondsLeft <= 0) {
                        endScreen(userScore);
                        clearInterval(interval);
                    }
            }, 100);
            // increment questionCounter
            questionCounter++;
            if (questionCounter > 10) {
                endScreen(userScore);
            }
            else {
                quizScreen(questionCounter);
            }
        }
        else {
            // play incorrect sound
            wrong.play();
            // subtract from score
            userScore = userScore - 10;
            // subtract 10 seconds and reset timer
            clearInterval(interval);
            secondsLeft = secondsLeft - 10;
            interval = setInterval(function() {
                secondsLeft = secondsLeft - 0.1;
                timerDisplayElement.textContent = secondsLeft.toFixed(1);
                    if (secondsLeft <= 0) {
                        endScreen(userScore);
                        clearInterval(interval);
                    }
            }, 100);
            // increment questionCounter
            questionCounter++;
            if (questionCounter > 10) {
                endScreen(userScore);
            }
            else {
                quizScreen(questionCounter);
            }
        }
    }
})
// endScreen - displays end screen with user score and accepts user inputs for score and initials to update local storage
function endScreen(userScore) {
    // displays end screen by changing class on end screen div to show and others to hide
    endScreenElement.setAttribute("class", "container p-3 show");
    startScreenElement.setAttribute("class", "container p-3 hide");
    quizScreenElement.setAttribute("class", "container p-3 hide");
    highScoreScreenElement.setAttribute("class", "container p-3 hide");    
    headerElement.setAttribute("class", "hide");
    timerElement.setAttribute("class", "container p-3 top hide");
    // renders high score to the screen
    finalScoreElement.textContent = userScore;    
    // assigns event listener to submit button to handle high score information
    submitButtonElement.addEventListener("click", function() {
        // retrieves high scores from local storage
        var highScores = JSON.parse(localStorage.getItem("highScores"));
        if (highScores === null) {
            highScores = [];
        }
        // adds initials and score to highScores
        var initials = initialsInputElement.value.trim();
        var score = userScore;
        highScores.push({"initials": initials, "score": score});
        // stores highScores in local storage
        localStorage.setItem("highScores", JSON.stringify(highScores));
        startScreen();
    });
}
// highScoreScreen - displays historical high scores when user clicks on high scores link in header
function highScoreScreen() {
   // displays end screen by changing class on end screen div to show and others to hide
   highScoreScreenElement.setAttribute("class", "container p-3 show");
   startScreenElement.setAttribute("class", "container p-3 hide");
   quizScreenElement.setAttribute("class", "container p-3 hide");
   endScreenElement.setAttribute("class", "container p-3 hide");
   timerElement.setAttribute("class", "container p-3 top hide");  
   // clear previous high score screen elements (if present)
   highScoreDisplayElement.innerHTML = "";
   // retrieve high score information from local storage
   var highScores = JSON.parse(localStorage.getItem("highScores"));
   // render scores on high score screen
   for (let i = 0; i < highScores.length; i++) {
    var scoreElement = document.createElement("div");
    scoreElement.textContent = highScores[i].initials + " : " + highScores[i].score;
    scoreElement.setAttribute("class", "high-score-entry");
    highScoreDisplayElement.appendChild(scoreElement);
   }
    // adds event listener to clear screen if close button is clicked
   closeButtonElement.addEventListener("click",function() {
       startScreen();
   })
    // adds event listener to clear screen if close button is clicked
    clearButtonElement.addEventListener("click",function() {
        highScores = [];
        localStorage.setItem("highScores", JSON.stringify(highScores));
        highScoreScreen();
    })
}

// starting script to run on initial loading
startScreen();