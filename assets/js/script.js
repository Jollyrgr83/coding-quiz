// ============================================================
// ESTABLISH VARIABLES
// ============================================================
// element that contains start button
var startButtonEl = document.getElementById("start-button");
// element that displays time left
var timerEl = document.getElementById("timer-value");
// element that displays question number in quiz screen
var questionNumberEl = document.getElementById("question-number");
// element that displays question text in quiz screen
var questionEl = document.getElementById("question");
// elements that display answer text in button
var aEl = document.getElementById("a");
var bEl = document.getElementById("b");
var cEl = document.getElementById("c");
var dEl = document.getElementById("d");
// element that contains the answer buttons
var answersEl = document.getElementById("answers");
// element that contains start screen
var startScreenEl = document.getElementById("start-screen");
// element that contains quiz screen
var quizScreenEl = document.getElementById("quiz-screen");
// element that contains end screen
var endScreenEl = document.getElementById("end-screen");
// element that contains high score screen
var highScoreScreenEl = document.getElementById("high-score-screen");
// element that contains user's initial input for high score on end screen
var initialsInputEl = document.getElementById("initials-input");
//element that displays user's final score on end screen
var finalScoreEl = document.getElementById("final-score");
// element that submits high score information on end screen
var submitButtonEl = document.getElementById("submit-button");
// element that contains the historical high scores
var highScoreDisplayEl = document.getElementById("high-score-display");
// establishes object to contain quiz database (questions, answers, etc)
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
// ============================================================
// ESTABLISH FUNCTIONS
// ============================================================
// startScreen - displays welcome message and instructions and starts quizScreen when user clicks start button
function startScreen() {
    // displays start screen by changing class on start screen div to show and others to hide
    startScreenEl.setAttribute("class", "container m-3 mx-auto show");
    quizScreenEl.setAttribute("class", "container m-3 mx-auto hide");
    endScreenEl.setAttribute("class", "container m-3 mx-auto hide");
    highScoreScreenEl.setAttribute("class", "container m-3 mx-auto hide");
    // assigns event listener to start button
    startButtonEl.addEventListener("click", function() {
        quizScreen(1,0);
    })
}
// quizScreen - displays questions and answers, accepts user input, advances questions, updates score and timer, and call endScreen
function quizScreen(counter, score) {
    // used to track question number from 1 to 10
    var questionCounter = counter;
    // used to track user's score
    var userScore = score;
    // used to display question number in question title section of quiz screen
    var quizDatabaseKeyArray = Object.keys(quizDatabase);
    // used to store user's answer (a, b, c, or d) to compare against correct answer
    var userAnswer;
    // used to store correct answer to each question to compare against user's answer
    var correctAnswer;
    // displays end screen if questionCounter > 10
    if (questionCounter > 10) {
        endScreen();
        return;
    }
    // starts timer
    quizTimer(30);
    // displays quiz screen by changing class on quiz screen div to show and others to hide
    quizScreenEl.setAttribute("class", "container m-3 mx-auto show");
    startScreenEl.setAttribute("class", "container m-3 mx-auto hide");
    endScreenEl.setAttribute("class", "container m-3 mx-auto hide");
    highScoreScreenEl.setAttribute("class", "container m-3 mx-auto hide");
    // renders question and answers to screen
    questionNumberEl.textContent = quizDatabaseKeyArray[questionCounter - 1];
    questionEl.textContent = quizDatabase[questionCounter].question;
    aEl.textContent = "a. " + quizDatabase[questionCounter].answers.a;
    bEl.textContent = "b. " + quizDatabase[questionCounter].answers.b;
    cEl.textContent = "c. " + quizDatabase[questionCounter].answers.c;
    dEl.textContent = "d. " + quizDatabase[questionCounter].answers.d;
    // assigns event listener to capture user's answer
    answersEl.addEventListener("click", function(event) {
        if (event.target.matches("button")) {
            // assigns selected button id to userAnswer
            userAnswer = event.target.id;
            // retrieves correct answer
            correctAnswer = quizDatabase[questionCounter].correct;
            // compares userAnswer to correctAnswer
            if (userAnswer === correctAnswer) {
                // play correct sound
                
                // add to score
                userScore = userScore + 10;
                // add 10 seconds to timer
                var timeLeft = timerEl.value;
                quizTimer(timeLeft + 10);
                // display next question
                quizScreen(questionCounter + 1, userScore);
            }
            else {
                // play incorrect sound
                
                // subtract from score
                userScore = userScore - 10;
                // subtract 10 seconds from remaining time
                var timeLeft = timerEl.value;
                quizTimer(timeLeft - 10);
                // display next question
                displayQuiz(questionCounter + 1, userScore);
            }
        }
    })
}

// endScreen - displays end screen with user score and accepts user inputs for score and initials to update local storage
function endScreen() {
    // displays end screen by changing class on end screen div to show and others to hide
    endScreenEl.setAttribute("class", "container m-3 mx-auto show");
    startScreenEl.setAttribute("class", "container m-3 mx-auto hide");
    quizScreenEl.setAttribute("class", "container m-3 mx-auto hide");
    highScoreScreenEl.setAttribute("class", "container m-3 mx-auto hide");    
    // assigns event listener to submit button to handle high score information
    submitButtonEl.addEventListener("submit", function() {
        // retrieves high scores from local storage
        var highScores = JSON.parse(localStorage.getItem("highScores"));
        var playCounter = localStorage.getItem("playCounter");
        if (playCounter === null) {
            playCounter = 1;
        }
        // adds initials and score to highScores
        highScores[playCounter].initials = initialsInputEl.value.trim();
        highScores[playCounter].score = finalScoreEl.value;
        // stores highScores in local storage
        localStorage.setItem("highScores", JSON.stringify(highScores));
        playCounter++;
        localStorage.setItem("playCounter",playCounter);
    });
}
// highScoreScreen - displays historical high scores when user clicks on high scores link in header
function highScoreScreen() {
   // displays end screen by changing class on end screen div to show and others to hide
   highScoreScreenEl.setAttribute("class", "container m-3 mx-auto show");
   startScreenEl.setAttribute("class", "container m-3 mx-auto hide");
   quizScreenEl.setAttribute("class", "container m-3 mx-auto hide");
   endScreenEl.setAttribute("class", "container m-3 mx-auto hide");  
   // clear previous high score screen elements (if present)
   highScoreDisplayEl.innerHTML = "";
   // retrieve high score information from local storage
   var highScores = JSON.parse(localStorage.getItem("highScores"));
   // create array of high score keys
   var highScoreKeyArray = Object.keys(highScores);
   // render scores on high score screen
   for (let i = 0; i < highScoreKeyArray.length; i++) {
    var scoreEl = document.createElement("div");
    scoreEl.textContent = highScores[highScoreKeyArray[i]].initials + " : " + highScores[highScoreKeyArray[i]].score;
    scoreEl.setAttribute("class", "high-score-entry");
    highScoreDisplayEl.appendChild(scoreEl);
   }
   // renders close button after final high score entry
   var closeButtonEl = document.createElement("button");
   closeButtonEl.textContent = "Close Window";
   closeButtonEl.setAttribute("class", "btn");
   closeButtonEl.setAttribute("id", "close-button");
   highScoreDisplayEl.appendChild(closeButtonEl);
   // adds event listener to clear screen if close button is clicked
   closeButtonEl.addEventListener("click",function() {
       startScreen();
   })
}
// timer function
function quizTimer(timerLength) {
    var secondsLeft = timerLength;
    var interval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft;
        if(secondsLeft === 0) {
            endScreen();
            clearInterval(interval);
        }
    }, 1000);
}
// ============================================================
// START SCRIPT TO RUN ON LOADING PAGE
// ============================================================
// calls startSceen to begin
// startScreen();
// adds event listener to call highScoreScreen if user clicks link
document.addEventListener("click", function(event) {
    if (event.target.id.matches("high-scores")) {
        highScoreScreen();
    }
})