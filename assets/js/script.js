var timerEl = document.getElementById("timer-value");
var questionNumberEl = document.getElementById("question-number");
var questionEl = document.getElementById("question");
var aEl = document.getElementById("a");
var bEl = document.getElementById("b");
var cEl = document.getElementById("c");
var dEl = document.getElementById("d");

quizTimer(45);







// quiz database
var quizDatabase = {
    "01": {
        "question": "What does html stand for?",
        "answers": {
            "a": "hyper text transfer protocol",
            "b": "alphabet binary code decimal",
            "c": "hyper text markup language",
            "d": "html"},
            "correct": "c"}
        }
        
        // quiz database key array
        var quizDatabaseKeyArray = Object.keys(quizDatabase);
        questionNumberEl.textContent = quizDatabaseKeyArray[0];
        questionEl.textContent = quizDatabase["01"].question;
        aEl.textContent = quizDatabase["01"].answers.a;
        bEl.textContent = quizDatabase["01"].answers.b;
        cEl.textContent = quizDatabase["01"].answers.c;
        dEl.textContent = quizDatabase["01"].answers.d;


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
