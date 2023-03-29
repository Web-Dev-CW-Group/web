// import quastions and answers from json file
// import questions from "../data/data.json" assert { type: "json" };
import questions from "../data/data.js";

const startBtn = document.getElementById('start-btn')
const questionNo = document.getElementById('question-no')
const submitBtn = document.getElementById('submit-btn')
const nextBtn = document.getElementById('next-btn')
const quizContainerElement = document.getElementById('quiz-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timeElement = document.getElementById('time')
const resultElement = document.getElementById('result-wrapper')
const resultLbl = document.getElementById('results')

let shuffledQuestions, currentQuestionIndex, results, interval, flag = true
let timeLimit = 60

// event listners
startBtn.addEventListener('click', startGame)
nextBtn.addEventListener('click', () => {
  displayColor(setNextQuestion)
})
submitBtn.addEventListener('click', () => {
  displayColor(finish)
})

function displayColor(params) {
  if (flag) {
    showAnswers()
    flag = false
  }else{
    flag = true
    params()
  }
}

function startGame() {
  results = 0
  startBtn.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  quizContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  if (currentQuestionIndex == 9) {
    submitBtn.classList.remove('hide')
    nextBtn.classList.add('hide')
  }else {
    timeElement.innerText = `60`
  }
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
  questionNo.innerText = `Question: ${currentQuestionIndex + 1}/10`
  timeLimit = 60
  interval = setInterval(function () {
    timeLimit--;
    if (timeLimit >= 10) {
      timeElement.innerText = `${timeLimit}`
    }else{
      timeElement.innerText = `0${timeLimit}`
      if (timeLimit == 0) {
        showAnswers()
      }
    }},1000)
  currentQuestionIndex++
}



function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
  
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  if (correct) {
    results++
  }
  flag = false
  showAnswers()
}

function showAnswers() {
  clearInterval(interval)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function finish() {
  let grade;
  if (results >= 8) {
    grade =  "<p style=\"color: green;background-color: white;\">Exelent keep up good work</p>"
  }else{
    grade = "<p style=\"color: red;background-color: white;\">Need to work hard</p>"
  }
  resultLbl.innerHTML = `<h4>Congratulations, Quiz is finished. </h4><br><p>Quastions : 10</p>
  <p>Correct Answers : ${results}</p><p>Wrong Answers : ${10 - results}</p><p>Score : ${results * 10}</p>${grade}`
  quizContainerElement.classList.add('hide')
  resultElement.classList.remove('hide')
}
