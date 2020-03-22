// ============================================================
// ESTABLISH VARIABLES
// ============================================================
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
// establishes object to contain quiz database
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
var a = 9;
quizScreen(a);
// function that displays welcome screen
function startScreen() {
    // displays start screen by changing class on start screen div to show and others to hide
    startScreenEl.setAttribute("class", "container m-3 mx-auto show");
    quizScreenEl.setAttribute("class", "container m-3 mx-auto hide");
    endScreenEl.setAttribute("class", "container m-3 mx-auto hide");
    highScoreScreenEl.setAttribute("class", "container m-3 mx-auto hide");
    // assigns event listener to start button

}

// function that displays questions
function quizScreen(counter, score) {
    var questionCounter = counter;
    var userScore = score;
    var quizDatabaseKeyArray = Object.keys(quizDatabase);
    var userAnswer;
    var correctAnswer;
    
    // displays end screen if questionCounter > 10
    if (questionCounter > 10) {
        // displays high score input screen

        // store high score initials and score to local storage

    }
    // displays start screen by changing class on quiz screen div to show and others to hide
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
                // display next question
                quizScreen(questionCounter + 1, userScore);
            }
            else {
                // play incorrect sound

                // subtract from score
                userScore = userScore - 10;
                // subtract from remaining time

                // display next question
                displayQuiz(questionCounter + 1, userScore);
            }
        }
    })
}

// display end screen


// high score function

    // render high score page

    // retrieve high score information from local storage

    // pause timer?




// timer function
function quizTimer(timerLength) {
    var secondsLeft = timerLength;
    var interval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft;
        if(secondsLeft === 0) {
            clearInterval(interval);
        }
    }, 1000);
}
