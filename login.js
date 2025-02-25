document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body"),
    modeToggle = document.querySelector(".drak-light"),
    form = document.getElementById("loginForm");

  modeToggle.addEventListener("click", () => {
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark");
    if (!body.classList.contains("dark")) {
      localStorage.setItem("mode", "light-mode");
    } else {
      localStorage.setItem("mode", "dark-mode");
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn việc form gửi dữ liệu và reload trang

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Kiểm tra thông tin đăng nhập
    if (
      (username === "DTH" && password === "DTH") ||
      (username === "Tran Ngoc Bich Tuyen Sang" && password === "0000")
    ) {
      sessionStorage.setItem("userName", username);
      window.location.href = "main.html"; // Điều hướng tới trang chính
    } else {
      alert("Sai Username hoặc Password! Vui lòng thử lại.");
    }
  });
});

// Hàm đăng nhập với Google
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // Đăng nhập thành công, lấy thông tin người dùng
      const user = result.user;
      const userName = user.displayName || user.email;

      console.log("Đăng nhập thành công:", userName);
      sessionStorage.setItem("userName", userName);

      // Lưu tên người dùng vào Firebase Realtime Database
      const database = firebase.database();
      const userRef = database.ref("Cert/" + userName);

      // Kiểm tra nếu chưa có thư mục người dùng, tạo thư mục mới và gán giá trị mặc định là 0
      userRef
        .set({
          UserName: userName,
          Value: 0, // Giá trị mặc định là 0
          IQValue: 0,
          Trials: 0,
        })
        .then(() => {
          console.log("Thêm thư mục và trường vào Firebase thành công.");
          window.location.href = "main.html"; // Điều hướng tới trang chính
        })
        .catch((error) => {
          console.error("Lỗi khi thêm dữ liệu vào Firebase:", error);
        });
    })
    .catch((error) => {
      console.error("Lỗi đăng nhập:", error);
    });
}

// Thêm sự kiện vào biểu tượng Google
document
  .getElementById("googleSignInBtn")
  .addEventListener("click", signInWithGoogle);
