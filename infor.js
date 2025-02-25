//   ..........................................................
document.querySelector(".chat-input button").addEventListener("click", () => {
  const input = document.querySelector(".chat-input input");
  const message = input.value.trim();

  if (message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "sent");
    messageElement.textContent = message;
    document.querySelector(".chat-messages").appendChild(messageElement);

    input.value = ""; // Clear the input
  }
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

// .....................................................................................................

function sendMessage() {
  const inputField = document.getElementById("chat-input");
  const message = inputField.value.trim();
  const chatMessages = document.getElementById("chat-messages");
  const spinner = document.getElementById("spinner");

  if (message) {
    // Hiển thị tin nhắn của người dùng
    const userMessage = document.createElement("div");
    userMessage.className = "message sent";
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);

    // Hiển thị biểu tượng xoay
    spinner.style.display = "inline-block";

    inputField.value = ""; // Xóa nội dung ô nhập

    // Mô phỏng chờ phản hồi (1 giây)
    setTimeout(() => {
      spinner.style.display = "none"; // Ẩn biểu tượng xoay

      // Tạo phản hồi dựa trên nội dung tin nhắn
      const botMessage = document.createElement("div");
      const container = document.querySelector(".attendance-listxx");
      botMessage.className = "message received";
      if (message === "dth_init") {
        botMessage.textContent = "Set up completed!";
      } else if (message === "dth -show task") {
        container.innerHTML = `
      <div class="table-container">
        <table id="resizableTable">
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Issue Title</th>
              <th>Release ID</th>
              <th>Release</th>
              <th>Issue Assignee</th>
              <th>IA Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CERT_BASIS_001</td>
              <td>[Active] Normal download</td>
              <td>CERT_DTHub_2024</td>
              <td>TraceTool_PS_Solution</td>
              <td>Ngo Huu Dat (MS/EJV53)</td>
              <td><span class="status new">New</span></td>
            </tr>
            <tr>
              <td>CERT_IQT_001</td>
              <td>[Active] More trials for user</td>
              <td>CERT_DTHub_2024</td>
              <td>TraceTool_PS_Solution</td>
              <td>Vu Duc Anh (MS/EJV53)</td>
              <td><span class="status new">New</span></td>
            </tr>
            <tr>
              <td>CERT_ADV_ACCESS</td>
              <td>[OnQueue] Advanced access...</td>
              <td>ADS_DTHub_2024</td>
              <td>TraceTool_PS_Solution</td>
              <td>Hide In Valid User</td>
              <td><span class="status in-progress">In Progress</span></td>
            </tr>
            <tr>
              <td>CERT_ADV_REQUEST</td>
              <td>[OnQueue] Advanced control...</td>
              <td>ADS_DTHub_2024</td>
              <td>TraceTool_PS_Solution</td>
              <td>Hide In Valid User</td>
              <td><span class="status in-progress">In Progress</span></td>
            </tr>
            <tr>
              <td>CERT_ADV_PROC</td>
              <td>[OnQueue] Process for request...</td>
              <td>ADS_DTHub_2024</td>
              <td>TraceTool_PS_Solution</td>
              <td>Hide In Valid User</td>
              <td><span class="status in-progress">In Progress</span></td>
            </tr>
          </tbody>
        </table>
        <div class="table-footer">
          © 2025 DTHub-Tracer, directly managing the system, all rights reserved
        </div>
      </div>
    `;
        botMessage.textContent = "Show task board completely!";
      } else if (message === "dth_proc_check") {
        botMessage.textContent = "Your process is not adapted! Try again..";
      } else {
        botMessage.textContent = "I didn't understand that command.";
      }

      chatMessages.appendChild(botMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight; // Cuộn xuống cuối cùng
    }, 1000);
  }
}

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
