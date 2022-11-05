const data = [
  {
    id: 1,
    question: 'Which of these fish is actually a fish?',
    answers: [
      { answer: 'swordfish', isCorrect: true },
      { answer: 'jellyfish', isCorrect: false },
      { answer: 'starfish', isCorrect: false },
      { answer: 'crayfish', isCorrect: false },
    ],
  },
  {
    id: 2,
    question: 'A flutter is a group of:',
    answers: [
      { answer: 'bees', isCorrect: false },
      { answer: 'penguins', isCorrect: false },
      { answer: 'butterflies', isCorrect: true },
      { answer: 'camels', isCorrect: false },
    ],
  },
  {
    id: 3,
    question: 'A group of which animals is referred to as a wake?',
    answers: [
      { answer: 'bats', isCorrect: false },
      { answer: 'ants', isCorrect: false },
      { answer: 'vultures', isCorrect: true },
      { answer: 'bees', isCorrect: false },
    ],
  },
  {
    id: 4,
    question: 'Which one of these is the national bird of india?',
    answers: [
      { answer: 'Peacock', isCorrect: true },
      { answer: 'Crow', isCorrect: false },
      { answer: 'Sparrow', isCorrect: false },
      { answer: 'Pigeon', isCorrect: false },
    ],
  },
];
const gameScreen = document.querySelector('.game');
const resultScreen = document.querySelector('.result');
const question = document.querySelector('.question');
const answerContainer = document.querySelector('.answers');
const submit = document.querySelector('.submit');
const play = document.querySelector('.play');

let qIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let total = 0;
let selectedAns;

const playAgain = () => {
  qIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  total = 0;

  showQuestion(qIndex);
};

play.addEventListener('click', () => {
  resultScreen.style.display = 'none';
  gameScreen.style.display = 'block';

  playAgain();
});

const showResult = () => {
  resultScreen.style.display = 'block';
  gameScreen.style.display = 'none';

  resultScreen.querySelector('.correct').textContent = `
  Correct Answers: ${correctCount}`;

  resultScreen.querySelector('.wrong').textContent = `
  Wrong Answers: ${wrongCount}`;

  resultScreen.querySelector('.score').textContent = `
  Total Score: ${(correctCount - wrongCount) * 10}`;
};

const showQuestion = (qNumber) => {
  if (qIndex === data.length) return showResult();
  selectedAns = null;
  question.textContent = data[qNumber].question;

  answerContainer.innerHTML = data[qNumber].answers
    ?.map(
      (item, index) =>
        `  <div class="answer">
  <input type="radio" name="answer" value=${item.isCorrect} id=${index} />
  <label for=${index}>${item.answer}</label>
</div>`
    )
    .join('');
  selectAnswer();
};

const selectAnswer = () => {
  answerContainer.querySelectorAll('input').forEach((item, index) => {
    item.addEventListener('click', (e) => {
      console.log(e.target.value);
      selectedAns = e.target.value;
    });
  });
};
submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (selectedAns !== null) {
    selectedAns === 'true' ? correctCount++ : wrongCount++;
    qIndex++;
    showQuestion(qIndex);
  } else {
    alert('Please select Answer first !');
  }
});

showQuestion(qIndex);
