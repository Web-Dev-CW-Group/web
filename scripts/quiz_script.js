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
const restart_btn = document.getElementById('restart_btn')

let shuffledQuestions, currentQuestionIndex, results, interval, flag = true
let timeLimit = 60

startBtn.addEventListener('click', startGame)
nextBtn.addEventListener('click', () => {
  displayColor(setNextQuestion)
})
submitBtn.addEventListener('click', () => {
  displayColor(finish)
})
restart_btn.addEventListener('click', () => {
  startGame()
  submitBtn.classList.add('hide')
  nextBtn.classList.remove('hide')
  resultElement.classList.add('hide')
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
  shuffledQuestions = questions.sort(() => Math.random() - .5).slice(0, 10)
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
  interval = setInterval(timeChange,1000)
  currentQuestionIndex++
}

function timeChange() {
  timeLimit--;
  if (timeLimit >= 10) {
    timeElement.innerText = `${timeLimit}`
  }else{
    timeElement.innerText = `0${timeLimit}`
    if (timeLimit == 0) {
      showAnswers()
    }
  }}

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
    grade =  "<p style=\" background-color: green;color:white;\">Exelent keep up good work</p>"
  }else{
    grade = "<p style=\" background-color: red;color:white;\">Need to work hard</p>"
  }
  resultLbl.innerHTML = `<h4>Congratulations, Quiz is finished. </h4><br><p>Quastions : 10</p>
  <p>Correct Answers : ${results}</p><p>Wrong Answers : ${10 - results}</p><p>Score : ${results * 10}</p>${grade}`
  
  quizContainerElement.classList.add('hide')
  resultElement.classList.remove('hide')
}

const questions = [
  {
      "question": "Who is the author of the novel \"1984\"?",
      "answers": [
          {"text": "George Orwell", "correct": true},
          {"text": "Aldous Huxley", "correct": false},
          {"text": "Ray Bradbury", "correct": false},
          {"text": "J. D. Salinger", "correct": false}
      ]
  },
  {
      "question": "Which of the following novels was written by Jane Austen?",
      "answers": [
          {"text": "Wuthering Heights", "correct": false},
          {"text": "Pride and Prejudice", "correct": true},
          {"text": "The Great Gatsby", "correct": false},
          {"text": "To Kill a Mockingbird", "correct": false}
      ]
  },
  {
      "question": "Who is the author of the novel \"The Catcher in the Rye\"?",
      "answers": [
          {"text": "J. D. Salinger", "correct": true},
          {"text": "Ernest Hemingway", "correct": false},
          {"text": "F. Scott Fitzgerald", "correct": false},
          {"text": "Virginia Woolf", "correct": false}
      ]
  },
  {
      "question": "What is the name of the monster in Mary Shelley's novel \"Frankenstein\"?",
      "answers": [
          {"text": "Dracula", "correct": false},
          {"text": "The Mummy", "correct": false},
          {"text": "The Creature", "correct": true},
          {"text": "The Wolfman", "correct": false}
      ]
  },
  {
      "question": "Who wrote the poem \"The Waste Land\"?",
      "answers": [
          {"text": "William Shakespeare", "correct": false},
          {"text": "T. S. Eliot", "correct": true},
          {"text": "Robert Frost", "correct": false},
          {"text": "Emily Dickinson", "correct": false}
      ]
  },
  {
      "question": "In which play by Shakespeare does the character Hamlet appear?",
      "answers": [
          {"text": "Macbeth", "correct": false},
          {"text": "The Tempest", "correct": false},
          {"text": "Hamlet", "correct": true},
          {"text": "King Lear", "correct": false}
      ]
  },
  {
      "question": "Who wrote the novel \"The Picture of Dorian Gray\"?",
      "answers": [
          {"text": "Oscar Wilde", "correct": true},
          {"text": "Virginia Woolf", "correct": false},
          {"text": "Edgar Allan Poe", "correct": false},
          {"text": "Charles Dickens", "correct": false}
      ]
  },
  {
      "question": "Who is the author of the novel \"To Kill a Mockingbird\"?",
      "answers": [
          {"text": "Harper Lee", "correct": true},
          {"text": "John Steinbeck", "correct": false},
          {"text": "F. Scott Fitzgerald", "correct": false},
          {"text": "Toni Morrison", "correct": false}
      ]
  },
  {
    "question": "Who wrote the novel \"Pride and Prejudice\"?",
    "answers": [
      {"text": "Charlotte Bronte", "correct": false},
      {"text": "Jane Austen", "correct": true},
      {"text": "Emily Bronte", "correct": false},
      {"text": "Virginia Woolf", "correct": false}
    ]
  },
  {
    "question": "What is the title of William Golding's novel about a group of British boys stranded on an uninhabited island?",
    "answers": [
      {"text": "Lord of the Rings", "correct": false},
      {"text": "The Hobbit", "correct": false},
      {"text": "The Catcher in the Rye", "correct": false},
      {"text": "Lord of the Flies", "correct": true}
    ]
  },
  {
    "question": "Who wrote the novel \"Beloved\"?",
    "answers": [
      {"text": "Toni Morrison", "correct": true},
      {"text": "Maya Angelou", "correct": false},
      {"text": "Zora Neale Hurston", "correct": false},
      {"text": "Alice Walker", "correct": false}
    ]
  },
  {
    "question": "What is the title of Margaret Atwood's dystopian novel set in the Republic of Gilead?",
    "answers": [
      {"text": "1984", "correct": false},
      {"text": "The Handmaid's Tale", "correct": true},
      {"text": "Brave New World", "correct": false},
      {"text": "Fahrenheit 451", "correct": false}
    ]
  },
  {
    "question": "Who wrote the novel \"The Great Gatsby\"?",
    "answers": [
      {"text": "Ernest Hemingway", "correct": false},
      {"text": "F. Scott Fitzgerald", "correct": true},
      {"text": "John Steinbeck", "correct": false},
      {"text": "William Faulkner", "correct": false}
    ]
  }
]