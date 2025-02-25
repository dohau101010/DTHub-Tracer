let countdown = 10;
let timer;
let correctAnswer = "C";
let isAnswered = false;

// Show the popup
document.getElementById("quizPopup").style.display = "flex";

// Countdown timer
function startCountdown() {
  timer = setInterval(function () {
    if (countdown <= 0) {
      clearInterval(timer);
      showResult("Time's up!", false);
    } else {
      document.getElementById("countdown").textContent = countdown;
      countdown--;
    }
  }, 1000);
}

// Check answer
function checkAnswer(answer) {
  if (isAnswered) return;

  isAnswered = true;
  clearInterval(timer);

  if (answer === correctAnswer) {
    showResult("Correct!", true);
    document.getElementById("correctSound").play();
  } else {
    showResult("Wrong answer!", false);
    document.getElementById("wrongSound").play();
  }
}

// Show result
function showResult(message, isCorrect) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = message;
  resultElement.classList.add(isCorrect ? "correct" : "wrong");
}

// Start the countdown when the page is loaded
window.onload = startCountdown;
