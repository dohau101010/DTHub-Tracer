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

const quizSound = new Audio("./music/kahootIQ.mp3"); // Đảm bảo đường dẫn chính xác

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

const questions = [
  {
    question:
      "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
    options: ["$0.05", "$0.10", "$0.15", "$0.20"],
    answer: "0",
  },
  {
    question:
      "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
    options: ["5 minutes", "10 minutes", "50 minutes", "100 minutes"],
    answer: "0",
  },
  {
    question:
      "A lily pad doubles in size every day. It takes 48 days to cover the entire pond. On which day was the pond half covered?",
    options: ["24", "30", "47", "48"],
    answer: "2",
  },
  {
    question:
      "What is the missing number in the sequence: 1, 11, 21, 1211, 111221, ?",
    options: ["311221", "112213", "312211", "111321"],
    answer: "2",
  },
  {
    question:
      "You are in a room with two doors. One leads to freedom, the other to certain death. Two guards stand before you: one always tells the truth, the other always lies. You can ask only one guard one question. What should you ask?",
    options: [
      "Which door leads to freedom?",
      "Would the other guard say this door leads to freedom?",
      "Do you tell the truth?",
      "Is this the door to freedom?",
    ],
    answer: "1",
  },
  {
    question:
      "A man has 53 socks in his drawer: 21 red, 18 blue, and 14 green. He randomly picks socks in the dark. What is the minimum number of socks he must take to ensure he has at least one matching pair?",
    options: ["2", "3", "4", "5"],
    answer: "1",
  },
  {
    question:
      "If a doctor gives you three pills and tells you to take one every half hour, how long will they last?",
    options: ["30 minutes", "1 hour", "1.5 hours", "2 hours"],
    answer: "1",
  },
  {
    question:
      "A farmer needs to cross a river with a wolf, a goat, and a cabbage. He can only take one at a time. How does he do it without anything being eaten?",
    options: [
      "Take goat first, then wolf, then cabbage",
      "Take wolf first, then goat, then cabbage",
      "Take goat first, then cabbage, then wolf",
      "Take goat first, return alone, take wolf, return with goat, take cabbage, return alone, take goat",
    ],
    answer: "3",
  },
  {
    question:
      "A clock shows the time as 3:15. What is the angle between the hour and minute hands?",
    options: ["7.5°", "22.5°", "37.5°", "45°"],
    answer: "2",
  },
  {
    question: "What is the missing number in the sequence: 2, 6, 12, 20, ?",
    options: ["28", "30", "32", "36"],
    answer: "2",
  },
  {
    question:
      "You have a 3-liter jug and a 5-liter jug. How can you measure exactly 4 liters?",
    options: [
      "Fill the 5-liter jug and pour into 3-liter until full, leaving 2L",
      "Fill the 3-liter jug and pour into 5-liter jug",
      "Fill both jugs completely",
      "Impossible",
    ],
    answer: "0",
  },
  {
    question:
      "In a race, you overtake the person in second place. What place are you in now?",
    options: ["First", "Second", "Third", "Fourth"],
    answer: "1",
  },
  {
    question:
      "If a triangle has angles measuring 30° and 60°, what is the measure of the third angle?",
    options: ["45°", "60°", "90°", "120°"],
    answer: "2",
  },
  {
    question: "What is the next number in the series: 1, 1, 2, 3, 5, 8, ?",
    options: ["10", "11", "12", "13"],
    answer: "3",
  },
  {
    question:
      "You flip a fair coin three times. What is the probability of getting exactly two heads?",
    options: ["1/4", "1/2", "3/8", "3/4"],
    answer: "2",
  },
  {
    question:
      "A rope ladder is hanging over the side of a boat. The bottom rung is touching the water. If the tide rises 3 feet, how much of the ladder will be underwater?",
    options: ["0 feet", "1 foot", "2 feet", "3 feet"],
    answer: "0",
  },
  {
    question:
      "There are three houses, each needing gas, electricity, and water. Can you connect each house to all three utilities without crossing lines?",
    options: ["Yes", "No", "Only with one crossing", "Only in 3D"],
    answer: "1",
  },
  {
    question:
      "A plane crashes on the border of two countries. Where do they bury the survivors?",
    options: ["Country A", "Country B", "Nowhere", "On the border"],
    answer: "2",
  },
  {
    question: "How many times can you subtract 10 from 100?",
    options: ["10", "9", "Once", "Infinite"],
    answer: "2",
  },
  {
    question: "What comes next in the pattern: A, C, F, J, O, ?",
    options: ["Q", "S", "T", "U"],
    answer: "2",
  },
];

let selectedQuestions = [];

function startQuiz() {
  // Lấy ngẫu nhiên 5 câu hỏi từ danh sách
  selectedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 5);

  // Reset các giá trị liên quan đến câu hỏi và điểm số
  currentQuestion = 0;
  score = 0;
  attemptQuestion = 0;
  unattemptedQuestion = 0;
  wrongQuestion = 0;
  userAnswers = [];

  // Hiển thị câu hỏi đầu tiên
  time.innerHTML = "30";
  displayQuestion(currentQuestion);
  quizSound.play();

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
    if (remainingTime === 0) {
      unattemptedQuestion++;
  
      // Kiểm tra câu trả lời đã chọn và đánh dấu đúng/sai
      let selectedAnswer = userAnswers[currentQuestion];
      let correctAnswer =
        selectedQuestions[currentQuestion].options[
          selectedQuestions[currentQuestion].answer
        ];
  
      if (selectedAnswer !== undefined) {
        let selectedOption = selectedQuestions[currentQuestion].options[selectedAnswer];
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
      }, 1000); // Delay 2 seconds before enabling the next button
  
      endQuiz(); // Kết thúc quiz khi hết thời gian
    }
  }
  

function nextQuestion() {
  // Check if the user has answered all questions
  if (nxtBtn.disabled) return; // Prevent moving to the next question if button is disabled

  answerContainer.style.pointerEvents = "initial";
  time.innerHTML = "30";
  quizSound.play();
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
  if (score >= 4) {
    const userName = sessionStorage.getItem("userName");

    if (userName) {
      const database = firebase.database();
      const userRef = database.ref("Cert/" + userName);

      userRef
        .once("value")
        .then((snapshot) => {
          const value = snapshot.val().IQValue; // Lấy giá trị hiện tại từ Firebase

          if (value !== undefined) {
            // Tăng giá trị lên 1
            userRef.update({
              IQValue: 1,
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
