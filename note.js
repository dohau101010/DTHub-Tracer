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

let number = document.getElementById("number");
let count = 0;

setInterval(() => {
  if (count == 10) {
    clearInterval();
  } else {
    count += 1;
    number.innerHTML = `${count}%`;
  }
}, 87);

// fill table
const questionRef = database.ref("Admin/NoticeBoard/Question");

// Function to load questions and add them to the table
function loadQuestions() {
  questionRef.once("value", (snapshot) => {
    const questions = snapshot.val();
    const tableBody = document.getElementById("questionTableBody");

    tableBody.innerHTML = ""; // Clear any existing rows

    // Loop through each question
    for (const key in questions) {
      if (questions.hasOwnProperty(key)) {
        const question = questions[key];

        // Create a new row
        const row = document.createElement("tr");

        // Create cells for each field
        const questionIdCell = document.createElement("td");
        questionIdCell.textContent =
          question.QID || key.replace("Question_", "");

        const classCell = document.createElement("td");
        classCell.textContent = question.Class || "";

        const contentCell = document.createElement("td");
        contentCell.textContent = question.Content || "";

        const proposalCell = document.createElement("td");
        proposalCell.textContent = question.Proposal || "";

        const createdDateCell = document.createElement("td");
        createdDateCell.textContent = question["Created Date"] || "";

        const attachmentCell = document.createElement("td");

        // Lấy giá trị Attachment
        const attachmentStatus = question.Attachment || "Empty"; // Default to "Empty" if undefined

        // Tạo span để thêm màu sắc cho Attachment
        const attachmentSpan = document.createElement("span");
        attachmentSpan.textContent = attachmentStatus;

        // Định dạng màu sắc cho Attachment
        attachmentSpan.style.display = "inline-block";
        attachmentSpan.style.paddingTop = "2px";
        attachmentSpan.style.paddingBottom = "2px";
        attachmentSpan.style.paddingLeft = "3px";
        attachmentSpan.style.paddingRight = "3px";
        attachmentSpan.style.borderRadius = "30px";
        attachmentSpan.style.fontWeight = "normal";
        attachmentSpan.style.fontFamily = '"Poppins", sans-serif';
        attachmentSpan.style.fontSize = "12px";
        attachmentSpan.style.textAlign = "center";
        attachmentSpan.style.width = "90px";

        if (attachmentStatus === "Available") {
          attachmentSpan.style.color = "#28A745"; // Green for Available
          attachmentSpan.style.border = "1px solid #28A745";
        } else if (attachmentStatus === "Empty") {
          attachmentSpan.style.color = "#FA4032"; // Red for Empty
          attachmentSpan.style.border = "1px solid #FA4032";
        }

        attachmentCell.appendChild(attachmentSpan); // Append the span to the attachment cell

        const stateCell = document.createElement("td");
        const stateSpan = document.createElement("span"); // Create a span for styling
        stateSpan.textContent = question.State || "";

        // Apply custom styling to the span based on the state value
        stateSpan.style.display = "inline-block";
        stateSpan.style.paddingTop = "2px";
        stateSpan.style.paddingBottom = "2px";
        stateSpan.style.paddingLeft = "3px";
        stateSpan.style.paddingRight = "3px";
        stateSpan.style.borderRadius = "30px";
        stateSpan.style.fontWeight = "normal";
        stateSpan.style.fontFamily = '"Poppins", sans-serif';
        stateSpan.style.fontSize = "12px";
        stateSpan.style.textAlign = "center";
        stateSpan.style.width = "90px"; // Auto width for span

        if (question.State === "New") {
          stateSpan.style.backgroundColor = "none";
          stateSpan.style.color = "#FA4032";
          stateSpan.style.border = "1px solid #FA4032";
        } else if (question.State === "In Progress") {
          stateSpan.style.backgroundColor = "none";
          stateSpan.style.color = "#006A67";
          stateSpan.style.border = "1px solid #006A67";
        } else if (question.State === "Closed") {
          stateSpan.style.backgroundColor = "none";
          stateSpan.style.color = "#091057";
          stateSpan.style.border = "1px solid #091057";
        }

        stateCell.appendChild(stateSpan); // Append the span to the state cell

        // Append cells to the row
        row.appendChild(questionIdCell);
        row.appendChild(classCell);
        row.appendChild(contentCell);
        row.appendChild(proposalCell);
        row.appendChild(createdDateCell);
        row.appendChild(attachmentCell);
        row.appendChild(stateCell);

        // Append the row to the table body
        tableBody.appendChild(row);
      }
    }
  });
}

// Load questions on page load
window.onload = loadQuestions;

// Show modal khi nhấn nút 'RaiseQuest'...........................................................
const raiseQuestBtn = document.getElementById("raiseQuestBtn");
const raiseQuestModal = document.getElementById("raiseQuestModal");
const overlay = document.getElementById("overlay");

raiseQuestBtn.addEventListener("click", () => {
  raiseQuestModal.style.display = "block"; // Hiển thị modal
  overlay.style.display = "block"; // Hiển thị overlay
  setTimeout(() => {
    raiseQuestModal.classList.add("show"); // Thêm lớp để kích hoạt hiệu ứng fade-in
  }, 10); // Đảm bảo lớp show được thêm sau khi modal xuất hiện
});

// Đóng modal và ẩn overlay
function closeModal() {
  raiseQuestModal.classList.remove("show"); // Gỡ lớp show để kích hoạt hiệu ứng fade-out
  setTimeout(() => {
    raiseQuestModal.style.display = "none"; // Ẩn modal sau hiệu ứng
    overlay.style.display = "none"; // Ẩn overlay
  }, 300); // Chờ đợi 300ms cho hiệu ứng fade-out
}
// Lấy tham chiếu tới các trường trong form
const classField = document.getElementById("class");
const contentField = document.getElementById("content");
const proposalField = document.getElementById("proposal");
const attachmentField = document.getElementById("attachment"); // Đúng id của attachment
const stateField = document.getElementById("state");
const fileUploadField = document.getElementById("fileUpload"); // Input file
const submitBtn = document.getElementById("submitBtn");
const closeButton = document.getElementById("closeBtn");

// Biến lưu trữ file đã chọn
let selectedFile = null;

// Lắng nghe sự kiện thay đổi của input file để lưu file được chọn
fileUploadField.addEventListener("change", () => {
  selectedFile = fileUploadField.files[0]; // Lưu trữ file đã chọn
  if (selectedFile) {
    console.log("File selected:", selectedFile.name); // In ra tên file đã chọn (tùy chọn)
  }
});

// Khi nhấn nút Submit
submitBtn.addEventListener("click", () => {
  // Lấy giá trị của các trường
  const classValue = classField.value;
  const contentValue = contentField.value;
  const proposalValue = proposalField.value;
  const attachmentValue = attachmentField.value; // Lấy giá trị của attachment
  const stateValue = stateField.value;
  const createdDate = new Date().toLocaleDateString("en-GB"); // Định dạng ngày tháng

  // Tạo tham chiếu tới Firebase Database
  const questionRef = firebase.database().ref("Admin/NoticeBoard/Question");

  // Tạo ID cho câu hỏi mới (e.g., Question_01, Question_02)
  questionRef.once("value", (snapshot) => {
    const questions = snapshot.val();
    const questionCount = questions ? Object.keys(questions).length : 0;
    const newQuestionID = `Question_0${questionCount + 1}`;
    // Dữ liệu của câu hỏi mới
    const newQuestionData = {
      Class: classValue,
      Content: contentValue,
      Proposal: proposalValue,
      Attachment: attachmentValue, // Thêm giá trị của attachment vào dữ liệu mới
      State: stateValue,
      "Created Date": createdDate,
      QID: newQuestionID,
    };

    // Lưu câu hỏi mới vào Firebase Database
    questionRef
      .child(newQuestionID)
      .set(newQuestionData)
      .then(() => {
        alert("Question submitted successfully!");
        uploadFile(newQuestionID); // Gọi hàm tải file lên Storage với ID mới
        document.getElementById("raiseQuestModal").style.display = "none";
        overlay.style.display = "none";
      })
      .catch((error) => {
        console.error("Error adding question: ", error);
      });
  });
});

// Hàm tải file lên Firebase Storage
function uploadFile(questionID) {
  if (!selectedFile) {
    console.log("No file selected for upload.");
    return;
  }

  var storage = firebase.storage();
  var storageRef = storage.ref();
  var fileRef = storageRef.child(
    `Admin/NoticeBoard/Question/${questionID}/${selectedFile.name}`
  );

  // Tải file lên Firebase
  var uploadTask = fileRef.put(selectedFile);

  // Theo dõi tiến trình tải lên
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    function (error) {
      console.error("Error uploading file:", error);
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("File available at", downloadURL);
        // Thực hiện lưu URL vào cơ sở dữ liệu nếu cần
      });
    }
  );
}

closeButton.addEventListener("click", () => {
  raiseQuestModal.style.display = "none"; // Ẩn popup
  overlay.style.display = "none";
});

// clear quest.......................................................................................................
// Lấy các phần tử trong DOM
const clearQuestBtn = document.getElementById("clearQuestBtn");
const clearQuestionModal = document.getElementById("clearQuestionModal");
const questionIdInput = document.getElementById("questionIdInput");
const submitDeleteBtn = document.getElementById("submitDeleteBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

// Mở popup khi nhấn nút ClearQuest
clearQuestBtn.addEventListener("click", () => {
  clearQuestionModal.style.display = "flex"; // Hiển thị popup
});

// Đóng popup khi nhấn Close
closeModalBtn.addEventListener("click", () => {
  clearQuestionModal.style.display = "none"; // Ẩn popup
});

// Xử lý khi nhấn Submit để xóa câu hỏi
submitDeleteBtn.addEventListener("click", () => {
  const questionId = questionIdInput.value.trim();

  if (questionId) {
    // Xóa thư mục câu hỏi từ Firebase
    const questionRef = database.ref(
      `Admin/NoticeBoard/Question/${questionId}`
    );

    questionRef
      .remove()
      .then(() => {
        alert(`Question ${questionId} has been deleted successfully.`);
        clearQuestionModal.style.display = "none"; // Đóng popup sau khi xóa
        questionIdInput.value = ""; // Xóa nội dung input
      })
      .catch((error) => {
        alert("Error deleting question: " + error.message);
      });
  } else {
    alert("Please enter a valid Question ID.");
  }
});

// .............................raise concern...................................
// Tham chiếu tới Firebase
const issueRef = firebase.database().ref("Admin/NoticeBoard/Concern");

// Hàm tải dữ liệu từ Firebase và hiển thị trong bảng
function loadIssues() {
  issueRef.once("value", (snapshot) => {
    const issues = snapshot.val();
    const tableBody = document.getElementById("questionTableBody-2");

    if (!tableBody) {
      console.error("Element with ID 'questionTableBody-2' not found.");
      return;
    }

    tableBody.innerHTML = ""; // Xóa các hàng cũ nếu có

    // Duyệt qua từng mục con (Issue_01, Issue_02, ...)
    for (const key in issues) {
      if (issues.hasOwnProperty(key)) {
        const issue = issues[key];

        // Tạo một hàng mới
        const row = document.createElement("tr");

        // Tạo các ô cho từng trường dữ liệu
        const issueIdCell = document.createElement("td");
        issueIdCell.textContent = issue.Issue_ID || key;

        const issueTypeCell = document.createElement("td");
        issueTypeCell.textContent = issue.Issue_Type || "";

        const contentCell = document.createElement("td");
        contentCell.textContent = issue.Content || "";

        const proposalCell = document.createElement("td");
        proposalCell.textContent = issue.Proposal || "";

        const attachmentCell = document.createElement("td");

        // Lấy giá trị từ thư mục Attachment
        const attachmentStatus = issue.Attachment || "Empty"; // Nếu không có giá trị, mặc định là "Empty"

        // Định dạng màu cho cột Attachment dựa trên giá trị
        const attachmentSpan = document.createElement("span");
        attachmentSpan.textContent = attachmentStatus;

        // Thiết lập kiểu cho Attachmen
        attachmentSpan.style.display = "inline-block";
        attachmentSpan.style.padding = "2px 3px";
        attachmentSpan.style.borderRadius = "30px";
        attachmentSpan.style.fontWeight = "normal";
        attachmentSpan.style.fontFamily = '"Poppins", sans-serif';
        attachmentSpan.style.fontSize = "12px";
        attachmentSpan.style.textAlign = "center";
        attachmentSpan.style.width = "90px";

        if (attachmentStatus === "Available") {
          attachmentSpan.style.color = "#28A745"; // Màu xanh lá cho "Available"
          attachmentSpan.style.border = "1px solid #28A745";
        } else if (attachmentStatus === "Empty") {
          attachmentSpan.style.color = "#FA4032"; // Màu đỏ cho "Empty"
          attachmentSpan.style.border = "1px solid #FA4032";
        }

        attachmentCell.appendChild(attachmentSpan); // Thêm span vào ô Attachment

        const createdDateCell = document.createElement("td");
        createdDateCell.textContent = issue.CreatedDate || "";

        const stateCell = document.createElement("td");
        const stateSpan = document.createElement("span");
        stateSpan.textContent = issue.State || "";

        // Thiết lập kiểu cho trạng thái dựa trên giá trị
        stateSpan.style.display = "inline-block";
        stateSpan.style.padding = "2px 3px";
        stateSpan.style.borderRadius = "30px";
        stateSpan.style.fontWeight = "normal";
        stateSpan.style.fontFamily = '"Poppins", sans-serif';
        stateSpan.style.fontSize = "12px";
        stateSpan.style.textAlign = "center";
        stateSpan.style.width = "90px";

        if (issue.State === "New") {
          stateSpan.style.color = "#FA4032";
          stateSpan.style.border = "1px solid #FA4032";
        } else if (issue.State === "In Progress") {
          stateSpan.style.color = "#006A67";
          stateSpan.style.border = "1px solid #006A67";
        } else if (issue.State === "Closed") {
          stateSpan.style.color = "#091057";
          stateSpan.style.border = "1px solid #091057";
        }

        stateCell.appendChild(stateSpan); // Thêm span vào ô trạng thái

        // Thêm từng ô vào hàng
        row.appendChild(issueIdCell);
        row.appendChild(issueTypeCell);
        row.appendChild(contentCell);
        row.appendChild(proposalCell);

        row.appendChild(createdDateCell);
        row.appendChild(attachmentCell);
        row.appendChild(stateCell);

        // Thêm hàng vào phần thân của bảng
        tableBody.appendChild(row);
      }
    }
  });
}

// Gọi hàm loadIssues khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", loadIssues);

// ..........................................Raise concern..............................................
const raiseIssueModal = document.getElementById("raiseIssueModal");
const closeModalButton = document.querySelector(".close");
const raiseIssueButton = document.getElementById("raiseIssueBtn");
const issueForm = document.getElementById("issueForm");

const issueIdInput = document.getElementById("issueId");
const issueTypeInput = document.getElementById("issueType");
const issueContentInput = document.getElementById("content2");
const issueProposalInput = document.getElementById("proposal2");
const fileUploadInput = document.getElementById("fileUpload2");
const issueStateInput = document.getElementById("state2");
const attachmentSelect = document.getElementById("attachment2"); // Trường chọn attachment
let attachmentStatus = "Empty"; // Giá trị mặc định của Attachment

let fileToUpload = null;

// Lắng nghe sự kiện khi người dùng nhấn "Raise Issue"
raiseIssueButton.addEventListener("click", () => {
  getNextIssueId().then((issueId) => {
    issueIdInput.value = issueId; // Cập nhật Issue ID trong form
    raiseIssueModal.style.display = "flex";
    setTimeout(() => {
      raiseIssueModal.classList.add("show");
    }, 10);
  });
});

// Lắng nghe sự kiện đóng modal
closeModalButton.addEventListener("click", () => {
  raiseIssueModal.classList.remove("show");
  setTimeout(() => {
    raiseIssueModal.style.display = "none";
  }, 300);
});

// Lắng nghe sự kiện khi người dùng thay đổi file chọn
fileUploadInput.addEventListener("change", () => {
  if (fileUploadInput.files.length > 0) {
    fileToUpload = fileUploadInput.files[0]; // Lưu file được chọn
    console.log("File selected:", fileToUpload.name); // In tên file ra console
  } else {
    console.log("No file selected.");
  }
});

// Lắng nghe sự kiện submit form
issueForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Ngừng hành động submit mặc định

  // Lấy các giá trị từ form
  const Issue_ID = issueIdInput.value;
  const Issue_Type = issueTypeInput.value;
  const Content = issueContentInput.value;
  const Proposal = issueProposalInput.value;
  const State = issueStateInput.value;
  attachmentStatus = attachmentSelect.value; // Lưu trạng thái Attachment

  // Tạo dữ liệu issue
  const issueData = {
    Issue_ID,
    Issue_Type,
    Content,
    Proposal,
    Attachment: attachmentStatus, // Lưu trạng thái Attachment (Empty hoặc Available)
    State,
    CreatedDate: new Date().toLocaleDateString("en-GB"),
  };

  // Lưu dữ liệu vào Firebase Database
  const issueRef = database.ref("Admin/NoticeBoard/Concern");

  // Lưu issue vào Firebase Realtime Database
  issueRef
    .child(Issue_ID)
    .set(issueData)
    .then(() => {
      console.log("Issue raised successfully!");

      // Cập nhật số lượng issue sau khi submit thành công
      const issueCountRef = database.ref("Admin/NoticeBoard/ConcernCount");
      issueCountRef.transaction((currentValue) => {
        return (currentValue || 0) + 1; // Tăng số lượng issue lên
      });

      if (fileToUpload && attachmentStatus === "Available") {
        uploadFile(Issue_ID); // Tải file lên nếu có và trạng thái là "Available"
      }

      raiseIssueModal.classList.remove("show");
      setTimeout(() => {
        raiseIssueModal.style.display = "none";
      }, 300);
    })
    .catch((error) => {
      console.error("Error raising issue:", error);
    });
});

// Hàm lấy Issue ID tiếp theo (tạo ID có thứ tự)
function getNextIssueId() {
  const issueCountRef = database.ref("Admin/NoticeBoard/ConcernCount");

  return new Promise((resolve, reject) => {
    issueCountRef.once("value", (snapshot) => {
      let issueCount = snapshot.val() || 0; // Nếu không có, bắt đầu từ 0
      const nextIssueId = issueCount + 1; // Tạo Issue ID tiếp theo

      resolve(`Issue_${nextIssueId.toString().padStart(2, "0")}`);
    });
  });
}

// Hàm tải file lên Firebase Storage
function uploadFile(issueId) {
  if (!fileToUpload) {
    console.log("No file selected for upload.");
    return; // Không tải file nếu không có file nào được chọn
  }

  const storageRef = storage.ref();
  const fileRef = storageRef.child(
    `Admin/NoticeBoard/Concern/${issueId}/${fileToUpload.name}`
  );

  const uploadTask = fileRef.put(fileToUpload);
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    function (error) {
      console.error("Error uploading file:", error); // Kiểm tra lỗi ở đây
    },
    function () {
      console.log("File uploaded successfully.");
    }
  );
}

// clear Issue...................................................................................................
const clearIssueBtn = document.getElementById("clearIssueBtn");
const deleteIssueModal = document.getElementById("deleteIssueModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const closeDeleteModalBtn = document.getElementById("closeDeleteModalBtn");
const issueIdToDeleteInput = document.getElementById("issueIdToDeleteInput"); // Đổi tên biến ở đây

// Mở modal khi nhấn nút Clear Issue
clearIssueBtn.addEventListener("click", () => {
  deleteIssueModal.style.display = "flex";
  setTimeout(() => {
    deleteIssueModal.classList.add("show");
  }, 10);
});

// Đóng modal khi nhấn nút đóng (X)
closeDeleteModalBtn.addEventListener("click", () => {
  deleteIssueModal.classList.remove("show");
  setTimeout(() => {
    deleteIssueModal.style.display = "none";
  }, 300);
});

// Lắng nghe sự kiện khi nhấn "Delete"
confirmDeleteBtn.addEventListener("click", () => {
  const issueIdToDelete = issueIdToDeleteInput.value.trim(); // Lấy giá trị từ input

  console.log("Attempting to delete Issue ID:", issueIdToDelete); // Debug: Xem giá trị nhập vào

  if (issueIdToDelete && issueIdToDelete.startsWith("Issue_")) {
    // Kiểm tra đầu vào có phải ID hợp lệ
    const issueRef = database.ref(
      `Admin/NoticeBoard/Concern/${issueIdToDelete}`
    );

    // Kiểm tra xem Issue ID có tồn tại trong Firebase không
    issueRef
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Nếu issue tồn tại, xóa nó
          issueRef
            .remove()
            .then(() => {
              console.log(
                `Issue ${issueIdToDelete} has been deleted successfully!`
              );
              alert(`Issue ${issueIdToDelete} deleted.`);
            })
            .catch((error) => {
              console.error("Error deleting issue:", error);
              alert("Failed to delete the issue.");
            });

          // Đóng modal sau khi xóa thành công
          deleteIssueModal.classList.remove("show");
          setTimeout(() => {
            deleteIssueModal.style.display = "none";
          }, 300);
        } else {
          // Nếu không tìm thấy issue, hiển thị thông báo lỗi
          alert(`Issue with ID ${issueIdToDelete} does not exist.`);
        }
      })
      .catch((error) => {
        console.error("Error checking issue existence:", error);
        alert("Error checking if the issue exists.");
      });
  } else {
    // Thông báo nếu ID không hợp lệ
    console.log("Invalid input:", issueIdToDelete); // Debug: Kiểm tra nếu đầu vào không hợp lệ
    alert("Please enter a valid Issue ID. Format: Issue_XX (e.g., Issue_01)");
  }
});

// ...............................................Raise comment.................................
// Hàm để lấy dữ liệu từ Firebase và hiển thị vào bảng
function loadComments() {
  const commentRef = database.ref("Admin/NoticeBoard/Comment");

  commentRef.once("value", (snapshot) => {
    const comments = snapshot.val(); // Lấy tất cả dữ liệu comment từ Firebase
    const tableBody = document.getElementById("questionTableBody-3"); // Bảng cần cập nhật

    // Xóa tất cả các dòng hiện tại trong bảng trước khi thêm mới
    tableBody.innerHTML = "";

    // Kiểm tra nếu có dữ liệu và thêm từng comment vào bảng
    if (comments) {
      Object.keys(comments).forEach((key) => {
        const comment = comments[key];

        // Tạo một dòng mới cho mỗi comment
        const row = document.createElement("tr");

        // Tạo các ô trong mỗi dòng
        const commentIdCell = document.createElement("td");
        commentIdCell.textContent = comment.Comment_ID;

        const contentCell = document.createElement("td");
        contentCell.textContent = comment.Content;

        const ratingCell = document.createElement("td");
        ratingCell.innerHTML = getStars(comment.Rating); // Gọi hàm để chuyển số thành ngôi sao

        const createdDateCell = document.createElement("td");
        createdDateCell.textContent = comment.CreatedDate;

        // Thêm các ô vào dòng
        row.appendChild(commentIdCell);
        row.appendChild(contentCell);
        row.appendChild(ratingCell);
        row.appendChild(createdDateCell);

        // Thêm dòng vào bảng
        tableBody.appendChild(row);
      });
    } else {
      console.log("Không có dữ liệu comment");
    }
  });
}

// Hàm chuyển rating thành ngôi sao
function getStars(rating) {
  const numStars = Math.floor(rating); // Làm tròn xuống số nguyên nếu rating có phần thập phân
  let stars = "";

  for (let i = 0; i < numStars; i++) {
    stars += "⭐"; // Thêm một ngôi sao vào chuỗi
  }

  return stars; // Trả về chuỗi ngôi sao
}

// Gọi hàm để tự động lấy và hiển thị dữ liệu khi trang tải
window.onload = function () {
  loadQuestions(); // Tải dữ liệu câu hỏi
  loadComments(); // Tải dữ liệu comment
};

// ..............................................................raise new...................................................
// Get elements
const leaveRateButton = document.getElementById("leaveRate");
const rateModal = document.getElementById("rateModal");
const rateForm = document.getElementById("rateForm");

const commentIdInput = document.getElementById("commentId");
const contentInput = document.getElementById("contentx");
const ratingInput = document.getElementById("rating"); // Hidden input to store rating value
const ratingDisplay = document.getElementById("ratingDisplay"); // Span to display selected rating

// Show modal form when clicking LeaveRate button
leaveRateButton.addEventListener("click", () => {
  generateCommentId().then((commentId) => {
    commentIdInput.value = commentId; // Auto-generate Comment ID
    rateModal.style.display = "flex"; // Display modal form
  });
});

// Handle form submission
rateForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission

  // Get values from the form
  const commentId = commentIdInput.value;
  const content = contentInput.value;
  const createdDate = new Date().toLocaleDateString("en-GB"); // Auto-generate Created Date
  const rating = ratingInput.value; // Get rating from the hidden input field

  // Data to be sent to Firebase
  const commentData = {
    Comment_ID: commentId,
    Content: content,
    Rating: rating,
    CreatedDate: createdDate,
  };

  // Save data to Firebase Database
  const commentRef = database.ref("Admin/NoticeBoard/Comment");

  commentRef
    .child(commentId)
    .set(commentData)
    .then(() => {
      console.log("Comment added successfully!");

      // Hide modal after successful submission
      rateModal.style.display = "none";
      contentInput.value = ""; // Clear content input field
      ratingInput.value = ""; // Clear rating input field
      ratingDisplay.textContent = ""; // Clear rating display

      // Reload comment list
      loadComments(); // Reload the comments table
    })
    .catch((error) => {
      console.error("Error adding comment:", error);
    });
});

// Generate Comment ID automatically
function generateCommentId() {
  const commentRef = database.ref("Admin/NoticeBoard/Comment");

  return new Promise((resolve, reject) => {
    commentRef.once("value", (snapshot) => {
      const comments = snapshot.val();
      const nextCommentId = comments ? Object.keys(comments).length + 1 : 1;
      resolve(`Com_${nextCommentId.toString().padStart(2, "0")}`);
    });
  });
}

// Load comments from Firebase and display them
function loadComments() {
  const commentRef = database.ref("Admin/NoticeBoard/Comment");

  commentRef.once("value", (snapshot) => {
    const comments = snapshot.val();
    const tableBody = document.getElementById("questionTableBody-3");

    tableBody.innerHTML = ""; // Clear the current table

    if (comments) {
      Object.keys(comments).forEach((key) => {
        const comment = comments[key];
        const row = document.createElement("tr");

        const commentIdCell = document.createElement("td");
        commentIdCell.textContent = comment.Comment_ID;

        const contentCell = document.createElement("td");
        contentCell.textContent = comment.Content;

        const ratingCell = document.createElement("td");
        ratingCell.innerHTML = getStars(comment.Rating); // Convert rating to stars

        const createdDateCell = document.createElement("td");
        createdDateCell.textContent = comment.CreatedDate;

        row.appendChild(commentIdCell);
        row.appendChild(contentCell);
        row.appendChild(ratingCell);
        row.appendChild(createdDateCell);

        tableBody.appendChild(row);
      });
    } else {
      console.log("No comment data available");
    }
  });
}

// Convert rating value to stars
function getStars(rating) {
  const numStars = Math.floor(rating); // Get the number of stars from the rating
  let stars = "";

  for (let i = 0; i < numStars; i++) {
    stars += "⭐"; // Add a star to the string
  }

  return stars; // Return the stars string
}

// Handle star click event
const ratingStars = document.querySelectorAll("#rating-stars .star");

ratingStars.forEach((star) => {
  star.addEventListener("click", (e) => {
    // Get rating value from the star's data-value attribute
    const rating = e.target.getAttribute("data-value");
    ratingInput.value = rating; // Update hidden input field with rating value

    // Update the selected stars' colors
    updateStarSelection(rating);

    // Update the rating display with number of stars
    ratingDisplay.textContent = `${rating} star(s)`; // Display the number of selected stars
  });

  // Handle hover event to show light color on unselected stars
  star.addEventListener("mouseover", () => {
    const value = star.getAttribute("data-value");
    updateStarHover(value);
  });

  // Handle mouseout event to reset hover color
  star.addEventListener("mouseout", () => {
    updateStarHover(ratingInput.value); // Reset hover color when mouse leaves
  });
});

// Update the selected stars' color
function updateStarSelection(selectedRating) {
  ratingStars.forEach((star) => {
    const value = star.getAttribute("data-value");
    if (value <= selectedRating) {
      star.classList.add("selected"); // Add 'selected' class to selected stars
    } else {
      star.classList.remove("selected"); // Remove 'selected' class from unselected stars
    }
  });
}

// Update hover effect for stars
function updateStarHover(hoverRating) {
  ratingStars.forEach((star) => {
    const value = star.getAttribute("data-value");
    if (value <= hoverRating) {
      star.classList.add("hover"); // Add 'hover' class for hovered stars
    } else {
      star.classList.remove("hover"); // Remove 'hover' class from non-hovered stars
    }
  });
}

// Close modal when clicking on Close button
document.getElementById("closeModalx").addEventListener("click", function () {
  document.getElementById("rateModal").style.display = "none"; // Hide modal on Close
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
