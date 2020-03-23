// STRUCTURE
// This script is broken into the following sections: variables, functions, event listeners, and starting script. The page consists of four main elements (start screen, quiz screen, end screen, and high score screen) and two header elements (header and timer). Only one main element should be displayed at a time. The header-header element will only be displayed when the start screen is displayed and the header-timer element will only be displayed when the quiz screen is displayed.

// SEQUENCE
// The start script (at bottom) will call startScreen which renders the start screen and header-header element and initializes variables.  Clicking the start button will call quizScreen which renders the quiz screen and header-timer element to the page.  Event listeners assigned to the answer buttons will manipulate the user's score, timer, and question counter to navigate through the quiz questions.  If one of the following is met, the endScreen function is called to render the final score and user input screen: (timer <= 0, question counter > 10).  Clicking the submit button will update local storage with high score information and call the startScreen function to render the start screen again (and initialize variables).  If the user clicks on the high scores button, the highScoreScreen function is called to render the high scores screen.  Clicking on the clear scores button will clear high scores from local storage and clicking on the close window button will call the startScreen function.

// VARIABLES
// testing
var pushCounter = 0;
var endScreenRunCounter = 0;
var endScreenClickCounter = 0;
// DOM elements
// header-header elements
var headerElement = document.getElementById("header");
var highScoresButtonElement = document.getElementById("high-scores-button");
// header-timer elements
var timerElement = document.getElementById("timer");
var timerDisplayElement = document.getElementById("timer-value");
var userScoreDisplayElement = document.getElementById("user-score-display");
// start screen elements
var startScreenElement = document.getElementById("start-screen");
var startButtonElement = document.getElementById("start-button");
// quiz screen elements
var quizScreenElement = document.getElementById("quiz-screen");
var questionNumberElement = document.getElementById("question-number");
var questionTextElement = document.getElementById("question");
var answersContainerElement = document.getElementById("answers");
var aAnswerElement = document.getElementById("a");
var bAnswerElement = document.getElementById("b");
var cAnswerElement = document.getElementById("c");
var dAnswerElement = document.getElementById("d");
var messageElement = document.getElementById("message");
// end screen elements
var endScreenElement = document.getElementById("end-screen");
var finalScoreElement = document.getElementById("final-score");
var initialsInputElement = document.getElementById("initials-input");
var submitButtonElement = document.getElementById("submit-button");
// high score screen elements
var highScoreScreenElement = document.getElementById("high-score-screen");
var highScoreDisplayElement = document.getElementById("high-score-display");
var closeButtonElement = document.getElementById("close-button");
var clearButtonElement = document.getElementById("clear-button");
// variables
var secondsLeft = 30;
var interval;
var messageInterval;
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

// FUNCTIONS
// startScreen - displays welcome message and instructions and starts quizScreen when user clicks start button
function startScreen() {
    // displays start screen by changing class on start screen div to show and others to hide
    startScreenElement.setAttribute("class", "container p-3 show");
    quizScreenElement.setAttribute("class", "container p-3 hide");
    endScreenElement.setAttribute("class", "container p-3 hide");
    highScoreScreenElement.setAttribute("class", "container p-3 hide");
    headerElement.setAttribute("class", "show");
    timerElement.setAttribute("class", "container p-3 top hide");
    // reset right/wrong message display
    messageElement.setAttribute("class", "hide");
    messageElement.textContent = "";
    // clears timer
    clearInterval(interval);
    // resets timer
    secondsLeft = 30;
    // resets questionCounter to 1
    questionCounter = 1;
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
    // displays user score
    userScoreDisplayElement.textContent = userScore;
    // renders question and answers to screen
    questionNumberElement.textContent = quizDatabaseKeyArray[questionCounter - 1];
    questionTextElement.textContent = quizDatabase[questionCounter].question;
    aAnswerElement.textContent = "a. " + quizDatabase[questionCounter].answers.a;
    bAnswerElement.textContent = "b. " + quizDatabase[questionCounter].answers.b;
    cAnswerElement.textContent = "c. " + quizDatabase[questionCounter].answers.c;
    dAnswerElement.textContent = "d. " + quizDatabase[questionCounter].answers.d;
}
// endScreen - displays end screen with user score and accepts user inputs for score and initials to update local storage
function endScreen(userScore) {
    console.log("endScreenRunCounter", endScreenRunCounter);
    endScreenRunCounter++;
    // displays end screen by changing class on end screen div to show and others to hide
    endScreenElement.setAttribute("class", "container p-3 show");
    startScreenElement.setAttribute("class", "container p-3 hide");
    quizScreenElement.setAttribute("class", "container p-3 hide");
    highScoreScreenElement.setAttribute("class", "container p-3 hide");    
    headerElement.setAttribute("class", "hide");
    timerElement.setAttribute("class", "container p-3 top hide");
    // renders high score to the screen
    finalScoreElement.textContent = userScore;    
    return;
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
}

// EVENT LISTENERS
// assigns event listener to start button
startButtonElement.addEventListener("click", function() {
    // resets userScore to 0
    userScore = 0;
    // renders questions
    quizScreen(questionCounter);
    // starts timer
    clearInterval(interval);
    interval = setInterval(function() {
        secondsLeft = secondsLeft - 0.1;
        timerDisplayElement.textContent = secondsLeft.toFixed(1);
        if (secondsLeft <= 0) {
            console.log("startScreen 01");
            endScreen(userScore);
            clearInterval(interval);
            return;
        }
    }, 100);
})
// answer button event listener - capture user answer, update timer, update score, and call endScreen
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
            console.log("answers EL main timer");
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
            // display right answer message for 1 seconds
            messageElement.setAttribute("class", "right-message show");
            messageElement.textContent = "Correct!"
            var messageTimer = 1;
            messageInterval = setInterval(function() {
                messageTimer = messageTimer - 0.1;
                if (messageTimer <= 0) {
                    clearInterval(messageInterval);
                    messageElement.setAttribute("class", "hide");
                    messageElement.textContent = "";
                }
            }, 100);
            // play correct sound
            right.play();
            // add to score
            userScore = userScore + 10;
            // update score display
            userScoreDisplayElement.textContent = userScore;
            // add 10 seconds and reset timer
            clearInterval(interval);
            secondsLeft = secondsLeft + 10;
            interval = setInterval(function() {
                secondsLeft = secondsLeft - 0.1;
                timerDisplayElement.textContent = secondsLeft.toFixed(1);
                if (secondsLeft <= 0) {
                        console.log("answers EL right answer timer");
                        endScreen(userScore);
                        clearInterval(interval);
                        return;
                    }
                }, 100);
                // increment questionCounter
            questionCounter++;
            if (questionCounter > 10) {
                console.log("answers EL right answer QC");
                endScreen(userScore);
                return;
            }
            else {
                quizScreen(questionCounter);
            }
        }
        else {
            // display wrong answer message for 1 seconds
            messageElement.setAttribute("class", "wrong-message show");
            messageElement.textContent = "Incorrect!"
            var messageTimer = 1;
            messageInterval = setInterval(function() {
                messageTimer = messageTimer - 0.1;
                if (messageTimer <= 0) {
                    clearInterval(messageInterval);
                    messageElement.setAttribute("class", "hide");
                    messageElement.textContent = "";
                }
            }, 100);
            // play incorrect sound
            wrong.play();
            // subtract from score
            userScore = userScore - 10;
            // update score display
            userScoreDisplayElement.textContent = userScore;
            // subtract 10 seconds and reset timer
            clearInterval(interval);
            secondsLeft = secondsLeft - 10;
            interval = setInterval(function() {
                secondsLeft = secondsLeft - 0.1;
                timerDisplayElement.textContent = secondsLeft.toFixed(1);
                if (secondsLeft <= 0) {
                    console.log("answers EL wrong answer timer");
                        endScreen(userScore);
                        clearInterval(interval);
                        return;
                    }
                }, 100);
                // increment questionCounter
            questionCounter++;
            if (questionCounter > 10) {
                console.log("answer EL wrong answer QC");
                endScreen(userScore);
                return;
            }
            else {
                quizScreen(questionCounter);
            }
        }
    }
})
// high score button event listener - call highScoreScreen to display high scores
highScoresButtonElement.addEventListener("click", function() {
highScoreScreen();
})
// close button event listener - call startScreen to close high score screen
closeButtonElement.addEventListener("click",function() {
    startScreen();
    return;
})
// clear button event listener - clears high scores in page and local storage and re-renders high score screen
clearButtonElement.addEventListener("click",function() {
    highScores = [];
    localStorage.setItem("highScores", JSON.stringify(highScores));
    highScoreScreen();
    return;
})
// submit button event listener - capture user initials, update high scores, and call startScreen
submitButtonElement.addEventListener("click", function(event) {
    console.log("endScreenClickCounter", endScreenClickCounter);
    console.log("click timestamp", event.timeStamp);
    endScreenClickCounter++;        
    event.preventDefault();
    // retrieves high scores from local storage
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    if (highScores === null) {
        highScores = [];
    }
    // adds initials and score to highScores
    var initials = initialsInputElement.value.trim();
    var score = userScore;
    console.log("pushCounter", pushCounter);
    console.log("pre-push", highScores);
    highScores.push({"initials": initials, "score": score});
    console.log("post-push", highScores);
    pushCounter++;
    // stores highScores in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    startScreen();
    return;
});

// STARTING SCRIPT
// starting script to run on initial loading
startScreen();