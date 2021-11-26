//Create a quiz
//Allow user to choose number of questions (max 50), category, difficulty, type (multiple choice/true-false)
//Keep score
//Generate session token so questions aren't repeated
//fetch from api based on user selections
// if run out of questions in selected category - alert user, reset session token
//fetch current category list from api
//fetch info re no. of questions in category

let questions = [];
let questionBlock = document.querySelector(".question");
let answer1 = document.querySelector("#no1");
let answer2 = document.querySelector("#no2");
let answer3 = document.querySelector("#no3");
let answer4 = document.querySelector("#no4");
let startButton = document.querySelector("#start");
let intro = document.querySelector(".startText");
let nextQuestionButton = document.querySelector("#nextQuestion");
let questionAnswerBlock = document.querySelector(".questionBlock");
let answerGiven = false;
let scoreBox = document.querySelector("#score")
let getQuestionButton = document.querySelector("#getQuestions")
let disappearText = document.querySelector("#disappear")

// sample url
// https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple

//take in inputs from user
let inputNumberQuestions = document.querySelector("#numberQuestions");
let numQuestions;



//Reuqest questions from API
async function getQuestions() {
    numQuestions = inputNumberQuestions.value;
    const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&type=multiple`);
  let data = await response.json();
  questions = data.results;
  startButton.style.display = "block"
  return questions;
}

//getQuestions();

function populateQuestion() {
    if(!questions.length) {
        return
    } else { 

  let answersArray = [];
  answersArray.push(questions[0].correct_answer)
  answersArray.push(questions[0].incorrect_answers[0])
  answersArray.push(questions[0].incorrect_answers[1])
  answersArray.push(questions[0].incorrect_answers[2])
  let shuffledArray = shuffleArray(answersArray)

  questionBlock.innerHTML = questions[0].question;
  answer1.innerHTML = shuffledArray[0]
  answer2.innerHTML = shuffledArray[1]
  answer3.innerHTML = shuffledArray[2]
  answer4.innerHTML = shuffledArray[3]
  displayQuestion();
  disappearText.style.display = "none";
}}

function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function nextQuestion () {
  populateQuestion();
  console.log(questions)
  answer1.style.backgroundColor = ""
  answer2.style.backgroundColor = ""
  answer3.style.backgroundColor = ""
  answer4.style.backgroundColor = ""
  answerGiven = false;
}
//Event listeners for buttons



getQuestionButton.addEventListener("click", getQuestions)

startButton.addEventListener("click", populateQuestion)
nextQuestionButton.addEventListener("click", nextQuestion)

function displayQuestion() {
  questionAnswerBlock.style.display = "block";
  intro.style.display = "none";
  startButton.style.display = "none";
}

let scoreCounter = 0;
let questionsAnswered = 0;


//select answer - check if answer correct
function checkAnswer(event) {
    while (answerGiven === false) {
        let correctAnswer = document.createElement('p')
        correctAnswer.innerHTML = questions[0].correct_answer;
    if (event.target.innerHTML === correctAnswer.innerHTML) {
        event.target.style.backgroundColor = "green";
        scoreCounter++
        questionsAnswered++
        scoreBox.innerHTML = `Score: ${scoreCounter} of ${questionsAnswered}`
    } else {
        event.target.style.backgroundColor = "red";
        event.target.innerHTML += `<br><br>The correct answer was ${correctAnswer.innerHTML}`
        questionsAnswered++
        scoreBox.innerHTML = `Score: ${scoreCounter} of ${questionsAnswered}`
    }
    answerGiven = !answerGiven;
    console.log(questions[0])
    questions.shift()
}

    
    console.log(event.target.innerHTML)
    
}

answer1.addEventListener("click", checkAnswer)
answer2.addEventListener("click", checkAnswer)
answer3.addEventListener("click", checkAnswer)
answer4.addEventListener("click", checkAnswer)