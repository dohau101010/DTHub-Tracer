// Đóng modal khi bấm nút close
document.querySelector(".close-btn").addEventListener("click", function () {
  document.getElementById("modal-container").style.display = "none";
});

// ....................................................Check cert........................................................
document.addEventListener("DOMContentLoaded", function () {
  const numbers = document.querySelectorAll(".number");
  const svgEl = document.querySelectorAll("svg circle");
  const counters = Array(numbers.length).fill(0);
  const intervals = Array(counters.length);

  function updateProgress() {
    numbers.forEach((number, index) => {
      let target = parseInt(number.dataset.num);

      if (counters[index] !== target) {
        counters[index] = 0; // Reset bộ đếm
        clearInterval(intervals[index]); // Dừng interval cũ nếu có

        intervals[index] = setInterval(() => {
          if (counters[index] === target) {
            clearInterval(intervals[index]);
          } else {
            counters[index] += 1;
            number.innerHTML = counters[index] + "%";
            svgEl[index].style.strokeDashoffset = Math.floor(
              472 - 440 * (target / 100)
            );
          }
        }, 20);
      }
    });
  }

  const spans = document.querySelectorAll(".progress-bar span");
  spans.forEach((span) => {
    span.style.width = span.dataset.width;
    span.innerHTML = span.dataset.width;
  });

  const userName = sessionStorage.getItem("userName");

  if (userName) {
    const database = firebase.database();
    const userRef = database.ref("Cert/" + userName);

    userRef
      .once("value")
      .then((snapshot) => {
        const value = snapshot.val().Value;
        const IQvalue = snapshot.val().IQValue;
        const trials = snapshot.val().Trials;

        // Cập nhật giá trị từ Firebase
        const numberElement = document.querySelector(".number");
        const numberElementIQ = document.querySelector(".numberx");
        const numberElementTrials = document.querySelector(".numberxx");

        if (numberElement) {
          numberElement.setAttribute("data-num", value == 0 ? "50" : "90");
          numberElement.textContent = value == 0 ? "50%" : "90%";
        }

        if (numberElementIQ) {
          numberElementIQ.setAttribute("data-num", IQvalue == 0 ? "50" : "90");
          numberElementIQ.textContent = IQvalue == 0 ? "50%" : "90%";
        }

        if (numberElementTrials) {
          let currentTrials = numberElementTrials.getAttribute("data-num");
          if (currentTrials !== String(trials)) {
            numberElementTrials.setAttribute(
              "data-num",
              String((trials * 10 + 10) % 100)
            );
            numberElementTrials.textContent = trials + "%";
          }
        }

        // Cập nhật trạng thái bảng
        const IA_Status_Cell = document.querySelector(
          "#resizableTable tbody tr:nth-child(1) td:nth-child(6)"
        );
        if (IA_Status_Cell) {
          IA_Status_Cell.innerHTML =
            value == 0
              ? '<span class="status new">New</span>'
              : '<span class="status analyzed">Analyzed</span>';
        }

        const IA_Status_CellIQ = document.querySelector(
          "#resizableTable tbody tr:nth-child(2) td:nth-child(6)"
        );
        if (IA_Status_CellIQ) {
          IA_Status_CellIQ.innerHTML =
            IQvalue == 0
              ? '<span class="status new">New</span>'
              : '<span class="status analyzed">Analyzed</span>';
        }

        updateProgress(); // Cập nhật vòng tròn tiến trình
      })
      .catch((error) => {
        console.error("Lỗi khi đọc dữ liệu từ Firebase:", error);
      });
  } else {
    console.log("Không tìm thấy thông tin người dùng trong sessionStorage.");
  }
});

// ....................................................................query.....................................................
document.addEventListener("DOMContentLoaded", function () {
  const queryBtn = document.querySelector(".button-group button:nth-child(1)");
  const uploadBtn = document.querySelector(".button-group button:nth-child(2)");
  const subNameInput = document.getElementById("subName");
  const levelSelect = document.getElementById("level");
  const artifactSelect = document.getElementById("artifact");
  const tableRows = document.querySelectorAll("#resizableTable tbody tr");
  const analyzeBtn = document.getElementById("analyzeBtn"); // Nút ANALYZE
  const userName = sessionStorage.getItem("userName") || "Unknown User"; // Lấy userName từ sessionStorage
  let isQueryClicked = false; // Kiểm tra đã nhấn QUERY chưa
  let isUploadClicked = false; // Kiểm tra đã nhấn UPLOAD chưa

  // Cập nhật hai hàng đầu tiên với username từ sessionStorage
  if (tableRows.length > 0) {
    tableRows[0].cells[4].textContent = userName; // Cột thứ 5 (Issue Assignee)
  }
  if (tableRows.length > 1) {
    tableRows[1].cells[4].textContent = userName;
  }

  // Kiểm tra điều kiện của Level và Artifact trước khi cho phép nhấn QUERY
  function checkConditions() {
    const level = levelSelect.value;
    const artifact = artifactSelect.value;
    queryBtn.disabled = !(level === "Middle" && artifact === "On Site");
  }

  // Lắng nghe sự kiện thay đổi giá trị của Level và Artifact
  levelSelect.addEventListener("change", checkConditions);
  artifactSelect.addEventListener("change", checkConditions);

  // Ban đầu disable UPLOAD và ANALYZE
  queryBtn.disabled = true;
  uploadBtn.disabled = true;
  analyzeBtn.disabled = true;

  queryBtn.addEventListener("click", function () {
    const subNameValue = subNameInput.value.trim();
    if (!subNameValue) return;

    tableRows.forEach((row) => {
      const issueID = row.cells[0].textContent.trim();
      if (issueID == subNameValue) {
        row.style.fontWeight = "bold"; // Chữ đậm
      } else {
        row.style.fontWeight = "normal"; // Reset về bình thường
      }
    });

    isQueryClicked = true;
    uploadBtn.disabled = false; // Bật UPLOAD sau khi nhấn QUERY
  });

  uploadBtn.addEventListener("click", function () {
    if (!isQueryClicked) return; // Không nhấn QUERY thì không được nhấn UPLOAD

    const subNameValue = subNameInput.value.trim();
    if (!subNameValue) return;

    tableRows.forEach((row) => {
      const issueID = row.cells[0].textContent.trim();
      if (issueID == subNameValue) {
        const statusCell = row.cells[row.cells.length - 1]; // Cột cuối cùng (IA Status)
        statusCell.innerHTML = '<span class="status on-queue">On Queue</span>';
      }
    });

    isUploadClicked = true; // Đánh dấu đã nhấn UPLOAD
    analyzeBtn.disabled = false; // Bật ANALYZE sau khi nhấn UPLOAD
  });

  analyzeBtn.addEventListener("click", function () {
    const subNameValue = subNameInput.value.trim();

    // Kiểm tra điều kiện subName là CERT_BASIS_001
    if (subNameValue == "CERT_BASIS_001") {
      document.getElementById("modal-iframe").src = "kahoot.html"; // Load trang test.html
      document.getElementById("modal-container").style.display = "flex"; // Hiển thị modal
    } else if (subNameValue == "CERT_IQT_001") {
      document.getElementById("modal-iframe").src = "kahootIQ.html"; // Load trang test.html
      document.getElementById("modal-container").style.display = "flex"; // Hiển thị modal
    }
  });
});

// ................................

// ......................................................................................................
// document
//   .getElementById("traceBoxLink")
//   .addEventListener("click", function (event) {
//     event.preventDefault(); // Ngăn chặn chuyển trang mặc định

//     if (userName === "Do Trung Hau" || userName === "Vũ An") {
//       window.location.href = "infor.html"; // Chuyển hướng nếu user hợp lệ
//     } else {
//       alert("User account does not have permission to access this page!");
//     }
//   });
