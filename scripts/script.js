
const hamburger = document.querySelector('.hamburger');
const navLink = document.querySelector('.nav__link');

hamburger.addEventListener('click', () => {
  navLink.classList.toggle('hide');
});


// Thejan Vithanage
// Quiz

const question_no = document.querySelector("p")
const a1 = document.querySelector("input");

question.addEventListener("click",update)

function update() {
  question.textContent = a1;
}