let startBtn = document.querySelector(".start-btn"),
  instructionCard = document.querySelector(".instruction"),
  instructionExit = document.querySelectorAll(".instruction button")[0],
  startQuizBtn = document.querySelectorAll(".instruction button")[1],
  wrapper = document.querySelector(".wrapper"),
  nxtBtn = document.querySelector(".btn button"),
  resultCard = document.querySelector(".result-card"),
  time = document.querySelectorAll(".Timer p")[1],
  progressBar = document.querySelector(".inner"),
  questionEl = document.querySelector(".question-container"),
  answerContainer = document.querySelector(".option-container"),
  currentQuestionNum = document.querySelector(".current-question"),
  totalQuestion = document.querySelector(".total-question"),
  totalScore = document.querySelector(".total-score .value"),
  yourScore = document.querySelector(".user-score .value"),
  unattempted = document.querySelector(".unattempted .value"),
  attempted = document.querySelector(".attempted .value"),
  wrong = document.querySelector(".wrong .value");

let currentQuestion = 0;
let userAnswers = [];
let timer,
  progressInterval,
  width = 1,
  score = 0,
  attemptQuestion = 0,
  unattemptedQuestion = 0,
  wrongQuestion = 0;

const quizSound = new Audio("./music/kahoot.mp3"); // Đảm bảo đường dẫn chính xác
const questions = [
  // Physics
  {
    question:
      "An object is in free fall from a height of 80m. Ignoring air resistance, how long does it take to hit the ground? (g = 9.8 m/s²)",
    options: ["2 seconds", "3 seconds", "4 seconds", "5 seconds"],
    answer: "2",
  },
  {
    question:
      "Which law describes the gravitational force between two objects?",
    options: ["Hooke's Law", "Newton's Law", "Ohm's Law", "Pascal's Law"],
    answer: "1",
  },
  {
    question: "In which medium does sound travel the fastest?",
    options: ["Air", "Water", "Vacuum", "Metal"],
    answer: "3",
  },
  {
    question: "Which unit is used to measure the power of an engine?",
    options: ["Joule", "Watt", "Newton", "Pascal"],
    answer: "1",
  },
  {
    question: "Who discovered electromagnetic induction?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Michael Faraday",
      "Nikola Tesla",
    ],
    answer: "2",
  },

  // Practical Math
  {
    question:
      "If a product's price increases by 20% and then decreases by 20%, how does the final price compare to the original price?",
    options: [
      "Unchanged",
      "Decreased by 4%",
      "Increased by 4%",
      "Decreased by 2%",
    ],
    answer: "1",
  },
  {
    question:
      "A store gives a 25% discount on an item priced at $200. What is the final price after the discount?",
    options: ["$150", "$155", "$160", "$165"],
    answer: "0",
  },
  {
    question:
      "If 4 people can build a wall in 10 hours, how long will it take for 8 people to do the same job?",
    options: ["2.5 hours", "5 hours", "10 hours", "20 hours"],
    answer: "1",
  },
  {
    question:
      "A car travels from A to B at 60 km/h and returns at 40 km/h. What is the average speed?",
    options: ["48 km/h", "50 km/h", "45 km/h", "55 km/h"],
    answer: "0",
  },
  {
    question:
      "A box contains 6 red apples and 4 green apples. What is the probability of randomly selecting a red apple?",
    options: ["40%", "50%", "60%", "70%"],
    answer: "2",
  },

  // Spelling
  {
    question: "Choose the correctly spelled word:",
    options: ["Recieve", "Receive", "Recive", "Recaive"],
    answer: "1",
  },
  {
    question: "Choose the correctly spelled word:",
    options: ["Definately", "Definitely", "Defanitely", "Definetly"],
    answer: "1",
  },
  {
    question: "Choose the correctly spelled word:",
    options: ["Seperate", "Separate", "Seperete", "Separat"],
    answer: "1",
  },
  {
    question: "Choose the correctly spelled word:",
    options: ["Occurence", "Occurrence", "Ocurrence", "Occurrance"],
    answer: "1",
  },
  {
    question: "Choose the correctly spelled word:",
    options: ["Accomodate", "Acommodate", "Accommodate", "Acommadate"],
    answer: "2",
  },

  // TOEIC Questions
  {
    question: "_____ the meeting, please prepare a summary report.",
    options: ["After", "Before", "During", "While"],
    answer: "1",
  },
  {
    question: "The new policy will take _____ next month.",
    options: ["affect", "effect", "affliction", "affective"],
    answer: "1",
  },
  {
    question: "The manager _____ the employees to arrive on time.",
    options: ["reminded", "remembered", "reminds", "reminding"],
    answer: "0",
  },
  {
    question: "The project was completed _____ schedule.",
    options: ["on", "at", "in", "to"],
    answer: "0",
  },
  {
    question: "Please let me know if you need any _____ information.",
    options: ["farther", "further", "furthest", "farthest"],
    answer: "1",
  },
  {
    question:
      "The company is looking for an _____ assistant to help with administrative tasks.",
    options: ["experience", "experienced", "experiencing", "experienceable"],
    answer: "1",
  },
  {
    question:
      "The new software has improved our efficiency by reducing the time required for data _____.",
    options: ["process", "processed", "processing", "processor"],
    answer: "2",
  },
  {
    question:
      "She _____ for the company since 2015 and has gained a lot of experience.",
    options: ["works", "worked", "has worked", "was working"],
    answer: "2",
  },
  {
    question:
      "The manager will discuss the project _____ the meeting tomorrow.",
    options: ["on", "in", "at", "for"],
    answer: "2",
  },
  {
    question: "The final decision is _____ by the board of directors.",
    options: ["making", "made", "makes", "make"],
    answer: "1",
  },
  {
    question: "We need to hire more staff to handle the _____ workload.",
    options: ["increase", "increasing", "increased", "increasable"],
    answer: "2",
  },
  {
    question:
      "The new policy will _____ the way we handle customer complaints.",
    options: ["affect", "effect", "affection", "affective"],
    answer: "0",
  },
  {
    question:
      "Due to the heavy traffic, we arrived at the conference _____ than expected.",
    options: ["late", "lately", "latest", "later"],
    answer: "3",
  },
  {
    question: "The manager suggested that we _____ the report by Friday.",
    options: ["submit", "submits", "submitted", "submitting"],
    answer: "0",
  },
  {
    question:
      "The company has experienced significant growth _____ the last five years.",
    options: ["since", "for", "during", "over"],
    answer: "3",
  },
];

startBtn.addEventListener("click", () => {
  instructionCard.style.transform = "scale(1)";
  instructionCard.style.width = "100%";
  instructionCard.style.opacity = "1";
  startBtn.style.transform = "scale(0)";
  startBtn.style.width = "0";
});

instructionExit.addEventListener("click", () => {
  instructionCard.style.transform = "scale(0)";
  instructionCard.style.width = "0%";
  startBtn.style.transform = "scale(1)";
  startBtn.style.width = "100%";
});

startQuizBtn.addEventListener("click", () => {
  wrapper.style.transform = "scale(1)";
  wrapper.style.width = "100%";
  instructionCard.style.transform = "scale(0)";
  instructionCard.style.width = "0%";
  startQuiz();
});

let selectedQuestions = [];

function startQuiz() {
  // Lấy ngẫu nhiên 5 câu hỏi từ danh sách
  selectedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 10);

  // Reset các giá trị liên quan đến câu hỏi và điểm số
  currentQuestion = 0;
  score = 0;
  attemptQuestion = 0;
  unattemptedQuestion = 0;
  wrongQuestion = 0;
  userAnswers = [];

  // Hiển thị câu hỏi đầu tiên
  time.innerHTML = "15";
  displayQuestion(currentQuestion);

  // Bắt đầu bộ đếm thời gian
  timer = setInterval(updateTimer, 1000);

  // Cập nhật thanh tiến trình
  updateProgress();

  // Vô hiệu hóa nút Next ban đầu
  nxtBtn.disabled = true;

  // Cập nhật tổng số câu hỏi
  totalQuestion.innerHTML = selectedQuestions.length;
}
function updateTimer() {
  // Đếm ngược thời gian
  let remainingTime = parseInt(time.innerHTML) - 1;

  // Cập nhật hiển thị thời gian
  time.innerHTML = remainingTime > 9 ? remainingTime : "0" + remainingTime;

  // Nếu thời gian hết, kiểm tra câu trả lời và kết thúc quiz

  if (remainingTime === 10) {
    quizSound.play();
  }

  if (remainingTime === 0) {
    unattemptedQuestion++;

    // Kiểm tra câu trả lời đã chọn và đánh dấu đúng/sai
    let selectedAnswer = userAnswers[currentQuestion];
    let correctAnswer =
      selectedQuestions[currentQuestion].options[
        selectedQuestions[currentQuestion].answer
      ];

    if (selectedAnswer !== undefined) {
      let selectedOption =
        selectedQuestions[currentQuestion].options[selectedAnswer];
      if (selectedOption === correctAnswer) {
        score++;
        setTimeout(() => {
          document.querySelectorAll("option")[
            selectedAnswer
          ].style.backgroundColor = "#23903c";
          document.querySelectorAll("option")[selectedAnswer].style.color =
            "#fff";
          document.querySelectorAll("option")[
            selectedAnswer
          ].style.borderColor = "#23903c";
        }, 100);
      } else {
        wrongQuestion++;
        setTimeout(() => {
          document.querySelectorAll("option")[
            selectedAnswer
          ].style.backgroundColor = "#B6141469";
          document.querySelectorAll("option")[selectedAnswer].style.color =
            "#fff";
          document.querySelectorAll("option")[
            selectedAnswer
          ].style.borderColor = "red";
          document.querySelectorAll("option")[
            selectedQuestions[currentQuestion].answer
          ].style.backgroundColor = "#23903c";
          document.querySelectorAll("option")[
            selectedQuestions[currentQuestion].answer
          ].style.color = "#fff";
          document.querySelectorAll("option")[
            selectedQuestions[currentQuestion].answer
          ].style.borderColor = "green";
        }, 100);
      }
    }

    answerContainer.style.pointerEvents = "none"; // Disable further selections
    setTimeout(() => {
      nxtBtn.disabled = false; // Enable the next button after 2 seconds
    }, 2500); // Delay 2 seconds before enabling the next button

    endQuiz(); // Kết thúc quiz khi hết thời gian
  }
}

function nextQuestion() {
  // Check if the user has answered all questions
  if (nxtBtn.disabled) return; // Prevent moving to the next question if button is disabled

  answerContainer.style.pointerEvents = "initial";
  time.innerHTML = "15";
  // quizSound.play();
  updateProgress();
  timer = setInterval(updateTimer, 1000);
  answerContainer.innerHTML = "";
  if (currentQuestion === selectedQuestions.length - 1) {
    resultCard.style.width = "300px";
    resultCard.style.transform = "scale(1)";
    totalScore.innerHTML = selectedQuestions.length;
    yourScore.innerHTML = score;
    attempted.innerHTML = attemptQuestion;
    unattempted.innerHTML = unattemptedQuestion;
    wrong.innerHTML = wrongQuestion;
    wrapper.style.width = "0";
    wrapper.style.transform = "scale(0)";
    endQuiz();
  } else {
    // If there are more questions, update the currentQuestion variable and display the next question and its options
    currentQuestion++;
    currentQuestionNum.innerHTML = currentQuestion + 1;
    displayQuestion(currentQuestion);
    nxtBtn.disabled = true; // Disable next button until the next question's timer ends
  }
}

function displayQuestion(questionIndex) {
  updateProgress();

  let question = selectedQuestions[questionIndex].question;
  let options = selectedQuestions[questionIndex].options;

  questionEl.innerHTML = question;
  answerContainer.innerHTML = "";

  for (let i = 0; i < options.length; i++) {
    let option = `<option onclick="checkAnswer(${i})">${options[i]}</option>`;
    answerContainer.insertAdjacentHTML("beforeend", option);
  }
}

function checkAnswer(selectedIndex) {
  // Lưu câu trả lời của người dùng nhưng không kiểm tra ngay
  userAnswers[currentQuestion] = selectedIndex;

  // Tô màu đáp án đã chọn để phân biệt
  setTimeout(() => {
    document.querySelectorAll("option")[selectedIndex].style.backgroundColor =
      "#3462ff"; // Màu vàng nhạt để phân biệt
    document.querySelectorAll("option")[selectedIndex].style.color = "#ffffff"; // Màu vàng nhạt để phân biệt
  }, 100);

  // Cập nhật số câu hỏi đã làm
  attemptQuestion++;

  // Disable các sự kiện trên các lựa chọn sau khi đã chọn
  answerContainer.style.pointerEvents = "none";
}

function updateProgress() {
  progressBar.style.width =
    ((currentQuestion + 1) / questions.length) * 100 + "%";
}

function endQuiz() {
  // Stop the timer
  clearInterval(timer);

  // Kiểm tra điểm và cập nhật giá trị nếu cần
  if (score >= 3) {
    const userName = sessionStorage.getItem("userName");

    if (userName) {
      const database = firebase.database();
      const userRef = database.ref("Cert/" + userName);

      userRef
        .once("value")
        .then((snapshot) => {
          const value = snapshot.val().Value; // Lấy giá trị hiện tại từ Firebase

          if (value !== undefined) {
            // Tăng giá trị lên 1
            userRef.update({
              Value: 1,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching value from Firebase: ", error);
        });
    }
  }
}

nxtBtn.addEventListener("click", nextQuestion);

totalQuestion.innerHTML = questions.length;
currentQuestionNum.innerHTML = currentQuestion + 1;

if (score > 5) {
}
