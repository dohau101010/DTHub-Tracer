const spans = document.querySelectorAll(".progress-bar span");

spans.forEach((span) => {
  span.style.width = span.dataset.width;
  span.innerHTML = span.dataset.width;
});
const userName = sessionStorage.getItem("userName");
console.log(userName);
if (userName) {
  const currentHour = new Date().getHours(); // Lấy giờ hiện tại
  let greeting;

  // Xác định thông điệp dựa trên giờ
  if (currentHour < 12) {
    greeting = "Good morning!";
  } else if (currentHour < 18) {
    greeting = "Good afternoon!";
  } else {
    greeting = "Good night!";
  }

  // Hiển thị thông điệp
  document.getElementById("username").textContent = `${greeting} ${userName}`;
} else {
  console.log("Không có tên người dùng trong sessionStorage.");
}

document.getElementById("explore-pay").addEventListener("click", function () {
  window.location.href = "infor.html";
});

// ......................................................................................................
document
  .getElementById("traceBoxLink")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn chuyển trang mặc định

    if (userName === "Do Trung Hau" || userName === "Vũ An") {
      window.location.href = "infor.html"; // Chuyển hướng nếu user hợp lệ
    } else {
      alert("User account does not have permission to access this page!");
    }
  });
