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

// .....................................................................................................

function sendMessage() {
  const inputField = document.getElementById("chat-input");
  const message = inputField.value.trim();
  const chatMessages = document.getElementById("chat-messages");
  const spinner = document.getElementById("spinner");
  const supportDiv = document.getElementById("support");

  if (message) {
    // Hiển thị tin nhắn của người dùng
    const userMessage = document.createElement("div");
    userMessage.className = "message sent";
    userMessage.innerHTML = `User&nbsp;&nbsp;&nbsp;>> ${message}`;
    chatMessages.appendChild(userMessage);

    // Hiển thị biểu tượng xoay
    spinner.style.display = "inline-block";

    inputField.value = ""; // Xóa nội dung ô nhập

    // Mô phỏng chờ phản hồi (1 giây)
    setTimeout(() => {
      spinner.style.display = "none"; // Ẩn biểu tượng xoay

      const botMessage = document.createElement("div");
      botMessage.className = "message received";

      if (message === "dth_init") {
        botMessage.textContent = "PwrUsr >> Set up completed!";
      } else if (message === "dth -show task") {
        const userName = sessionStorage.getItem("userName");
        var database = firebase.database();
        var taskListRef = database.ref(`TaskMem/${userName}/TaskList`);

        // Xóa nội dung bảng cũ
        document.querySelector(".attendance-listxx").innerHTML = `
            <div class="table-container">
              <table id="resizableTable">
                <thead>
                  <tr>
                    <th>No. Task</th>
                    <th>Task ID</th>
                    <th>Task Title</th>
                    <th>Task Type</th>
                    <th>Assignee</th>
                    <th>Date</th>
                    <th>Task Status</th>
                  </tr>
                </thead>
                <tbody id="taskTableBody"></tbody>
              </table>
              <div class="table-footer">
                © 2025 DTHub-Tracer, directly managing the system, all rights reserved
              </div>
            </div>
        `;

        var tableBody = document.getElementById("taskTableBody");
        var taskIndex = 1; // Đánh số Task_01, Task_02,...

        // Lấy danh sách Task từ Firebase
        taskListRef.once("value", (snapshot) => {
          if (!snapshot.exists()) {
            botMessage.textContent = "PwrUsr >> No tasks found!";
            return;
          }

          snapshot.forEach((childSnapshot) => {
            var taskKey = childSnapshot.key; // Lấy tên nhánh (Task_ID)

            // 🛑 Bỏ qua nếu tên Task_ID là "default"
            if (taskKey === "default") {
              return;
            }

            var taskData = childSnapshot.val();
            var taskIndexKey = `Task_${String(taskIndex).padStart(2, "0")}`; // Task_01, Task_02,...

            // Xác định trạng thái
            let statusText = "New";
            let statusClass = "new";
            if (taskData["Task Status"] === 1) {
              statusText = "In Progress";
              statusClass = "in-progress";
            } else if (taskData["Task Status"] === 2) {
              statusText = "Analyzed";
              statusClass = "analyzed";
            }

            // Thêm hàng vào bảng
            tableBody.innerHTML += `
                    <tr>
                        <td>${taskIndexKey}</td>
                        <td>${taskData.Task_ID || "N/A"}</td>
                        <td>${taskData["Task Title"] || "N/A"}</td>
                        <td>${taskData["Task Type"] || "N/A"}</td>
                        <td>${userName}</td>
                        <td><strong>${taskData.Date || "N/A"}</strong></td>
                        <td><span class="status ${statusClass}">${statusText}</span></td>
                    </tr>
                `;

            taskIndex++; // Tăng số thứ tự Task
          });

          botMessage.textContent = "PwrUsr >> Show task board completely!";
        });
      } else if (message === "dth_proc_check") {
        botMessage.textContent =
          "PwrUsr >> Your process is not adapted! Try again..";
      } else if (message === "dth -show upload") {
        // Chuyển `supportDiv` thành nơi upload file
        supportDiv.innerHTML = `
            <div class="upload-container">
              <label for="file-upload" class="upload-label">Drag & drop files here or click to select</label>
              <input type="file" id="file-upload" class="upload-input" multiple>
              <div id="upload-status"></div>
            </div>
          `;

        setupFileUpload(); // Kích hoạt chức năng upload
        botMessage.textContent =
          "PwrUsr >> Choose or Drag your file in the next file zone!";
      } else if (message.startsWith("dth -list")) {
        const userName = sessionStorage.getItem("userName");
        if (!userName) {
          botMessage.innerText = "User not found!";
          return;
        }

        const args = message.split(" ");
        const folderName = args.length > 2 ? args[2] : "all"; // Lấy tên thư mục hoặc mặc định là "all"

        var database = firebase.database();
        var taskMemRef = database.ref(`TaskMem/${userName}/FileList`);

        taskMemRef
          .once("value")
          .then((snapshot) => {
            let fileData = snapshot.val();
            if (!fileData || Object.keys(fileData).length === 0) {
              botMessage.innerText = "No files found!";
              return;
            }

            let formattedList = "";
            let totalFiles = 0;

            if (folderName === "all") {
              // 🟢 Liệt kê toàn bộ file trong tất cả các thư mục
              Object.entries(fileData).forEach(([folder, files]) => {
                let fileArray = files.split(", ");
                totalFiles += fileArray.length;
                formattedList += `📂 ${folder}:\n${fileArray
                  .map((f) => `- ${f}`)
                  .join("\n")}\n\n`;
              });

              botMessage.innerText = `Found ${totalFiles} file(s) in all folders:\n${formattedList.trim()}`;
            } else {
              // 🟢 Liệt kê file trong thư mục cụ thể
              let fileList = fileData[folderName];
              if (!fileList) {
                botMessage.innerText = `No files found in ${folderName}!`;
                return;
              }

              let filesArray = fileList.split(", ");
              formattedList = filesArray.map((file) => `- ${file}`).join("\n");
              botMessage.innerText = `📂 ${folderName} contains ${filesArray.length} file(s):\n${formattedList}`;
            }
          })
          .catch((error) => {
            console.error("Error retrieving file list:", error);
            botMessage.innerText = `Error retrieving files!`;
          });
      } else if (message == "dth -create member") {
        const userName = sessionStorage.getItem("userName");
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var database = firebase.database();

        // 🔹 Tạo một file rỗng trong Firebase Storage
        var fileRef = storageRef.child(`TaskMem/${userName}/Prefix.txt`);
        var emptyFile = new Blob([""], { type: "text/plain" });

        fileRef
          .put(emptyFile)
          .then(() => {
            console.log(
              `Thư mục TaskMem/${userName} và file Prefix.txt đã được tạo trong Storage!`
            );

            // 🔹 Tạo thư mục trong Firebase Realtime Database với FileList và State
            var taskMemRef = database.ref(`TaskMem/${userName}`);

            taskMemRef
              .set({
                FileList: {
                  default: "prefix.txt",
                },
                TaskList: {
                  default: 0, // Thêm nhánh State với giá trị mặc định là 0
                },
              })
              .then(() => {
                console.log(
                  `Thư mục TaskMem/${userName} đã được tạo trong Realtime Database!`
                );
                botMessage.textContent = `PwrUsr >> User ${userName} has been successfully initialized.`;
              })
              .catch((error) => {
                console.error(
                  "Lỗi khi tạo thư mục trong Realtime Database:",
                  error
                );
                botMessage.textContent =
                  "PwrUsr >> Error creating user folder in database";
              });
          })
          .catch((error) => {
            console.error("Lỗi khi tạo thư mục trong Storage:", error);
            botMessage.textContent =
              "PwrUsr >> Error creating user folder in storage";
          });
      } else if (message.startsWith("dth -make")) {
        const userName = sessionStorage.getItem("userName");
        var database = firebase.database();

        // Lấy các tham số từ câu lệnh
        const parts = message.split(" ");
        const entryKey = parts[2]; // Task_ID (VD: MID_MCU_01)
        const taskType = parts[3]; // Task Type (VD: Lab, Exam, Project,...)

        if (!entryKey || !taskType) {
          botMessage.textContent =
            "PwrUsr >> Invalid entry format! Use: dth -make XX Y";
          return;
        }

        // 🔹 Lấy ngày hiện tại (yyyy-mm-dd)
        const today = new Date().toISOString().split("T")[0];

        // 🔹 Tạo Task Title từ Task_ID
        const taskPrefix = entryKey.substring(0, 3); // MID, FIN, EXT
        const taskSuffix = entryKey.substring(4, 7); // MCU, DSP, AME, ICSD,...

        const typeMap = {
          MID: "Mid Term Test",
          FIN: "Final Term Test",
          EXT: "Extra Evaluation",
        };

        // Xác định Task Title
        const taskTitle = `${taskSuffix} ${typeMap[taskPrefix] || "Task"}`;

        // 🔹 Tạo nhánh mới trong TaskMem/UserName/TaskList
        var taskListRef = database.ref(
          `TaskMem/${userName}/TaskList/${entryKey}`
        );
        taskListRef
          .set({
            Task_ID: entryKey,
            "Task Title": taskTitle,
            "Task Type": taskType,
            Date: today,
            "Task Status": 0,
          })
          .then(() => {
            console.log(`Task ${entryKey} đã được thêm vào TaskList!`);
            botMessage.textContent = `PwrUsr >> Task '${entryKey}' created successfully for user ${userName}.`;
          })
          .catch((error) => {
            console.error("Lỗi khi tạo entry trong TaskList:", error);
            botMessage.textContent =
              "PwrUsr >> Error creating entry in TaskList.";
          });
      } else if (message == "dth -check exist") {
        const userName = sessionStorage.getItem("userName");

        if (!userName) {
          botMessage.textContent = "PwrUsr >> No login information found.";
          return;
        }

        const storageRef = firebase.storage().ref();
        const userFolderRef = storageRef.child(
          `TaskMem/${userName}/Prefix.txt`
        );

        userFolderRef
          .getMetadata()
          .then(() => {
            botMessage.textContent = `PwrUsr >> User ${userName} exists in the system.`;
          })
          .catch((error) => {
            if (error.code === "storage/object-not-found") {
              botMessage.textContent = `PwrUsr >> No user named ${userName} found, please create a new entry.`;
            } else {
              console.error("Error checking folder:", error);
              botMessage.textContent =
                "PwrUsr >> An error occurred while checking the user.";
            }
          });
      } else if (message.startsWith("dth -download ")) {
        const folderName = message.replace("dth -download ", "").trim();
        console.log(folderName);

        const storage = firebase.storage();
        const storageRef = storage.ref();

        // Danh sách file cần tải trong thư mục (phải biết trước)
        const fileList = ["chart1.svg"];

        fileList.forEach((fileName) => {
          const fileRef = storageRef.child(`TaskMem/${folderName}/${fileName}`);

          fileRef
            .getDownloadURL()
            .then((url) => {
              // Tạo thẻ <a> để tải file về
              const link = document.createElement("a");
              link.href = url;
              link.download = fileName;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            })
            .catch((error) => {
              console.error(`Error downloading ${fileName}:`, error);
            });
        });
      } else if (message.startsWith("dth -ass ")) {
        const folderName = message.split(" ")[2]; // Lấy tên thư mục từ lệnh
        if (!folderName) {
          botMessage.textContent = "PwrUsr >> Please provide a folder name!";
          return;
        }

        if (selectedFiles.length === 0) {
          botMessage.textContent = "PwrUsr >> No files selected for upload!";
          return;
        }

        var storage = firebase.storage();
        var database = firebase.database();
        var storageRef = storage.ref();
        var taskMemRef = database.ref("TaskMem");

        taskMemRef
          .once("value")
          .then((snapshot) => {
            let usersData = snapshot.val();
            if (!usersData) {
              botMessage.textContent = "PwrUsr >> No users found in TaskMem!";
              return;
            }

            let userNames = Object.keys(usersData); // Lấy danh sách tất cả UserName
            let totalUsers = userNames.length;
            let completedUsers = 0;

            userNames.forEach((userName) => {
              let userFileListRef = database.ref(
                `TaskMem/${userName}/FileList`
              );
              let uploadedFiles = [];

              selectedFiles.forEach((file) => {
                let fileRef = storageRef.child(
                  `TaskMem/${userName}/${folderName}/${file.name}`
                );

                fileRef
                  .put(file)
                  .then(() => {
                    console.log(
                      `Uploaded ${file.name} for ${userName} successfully!`
                    );
                    uploadedFiles.push(file.name);

                    if (uploadedFiles.length === selectedFiles.length) {
                      userFileListRef
                        .once("value")
                        .then((fileListSnapshot) => {
                          let existingData =
                            fileListSnapshot.val() || "prefix.txt";

                          if (typeof existingData === "string") {
                            existingData = { default: existingData };
                          }

                          let existingFiles = existingData[folderName]
                            ? existingData[folderName].split(", ")
                            : [];
                          let updatedFileList = [
                            ...new Set([...existingFiles, ...uploadedFiles]),
                          ];

                          existingData[folderName] = updatedFileList.join(", ");
                          return userFileListRef.set(existingData);
                        })
                        .then(() => {
                          console.log(
                            `File list updated successfully for ${userName}!`
                          );
                          completedUsers++;

                          if (completedUsers === totalUsers) {
                            botMessage.textContent = `PwrUsr >> Assigned files to ${totalUsers} users successfully!`;
                          }
                        })
                        .catch((error) => {
                          console.error(
                            `Error updating file list for ${userName}:`,
                            error
                          );
                        });
                    }
                  })
                  .catch((error) => {
                    console.error(
                      `Error uploading ${file.name} for ${userName}:`,
                      error
                    );
                  });
              });
            });
          })
          .catch((error) => {
            console.error("Error fetching user list:", error);
            botMessage.textContent = "PwrUsr >> Error fetching user list!";
          });
      } else if (message.startsWith("dth -push ")) {
        const folderName = message.split(" ")[2]; // Lấy tên thư mục từ lệnh
        if (!folderName) {
          botMessage.textContent = "PwrUsr >> Please provide a folder name!";
          return;
        }

        const userName = sessionStorage.getItem("userName");
        if (!userName) {
          botMessage.textContent = "PwrUsr >> User not found!";
          return;
        }

        if (selectedFiles.length === 0) {
          botMessage.textContent = "PwrUsr >> No files selected for upload!";
          return;
        }

        var storage = firebase.storage();
        var database = firebase.database();
        var storageRef = storage.ref();
        var taskMemRef = database.ref(`TaskMem/${userName}/FileList`);
        var taskListRef = database.ref(
          `TaskMem/${userName}/TaskList/${folderName}`
        ); // Đường dẫn TaskList

        let uploadedFiles = []; // Danh sách file đã upload thành công

        selectedFiles.forEach((file, index) => {
          let fileRef = storageRef.child(
            `TaskMem/${userName}/${folderName}/${file.name}`
          );

          fileRef
            .put(file)
            .then(() => {
              console.log(`Uploaded ${file.name} successfully!`);
              uploadedFiles.push(file.name);

              // Nếu tất cả file đã upload xong
              if (uploadedFiles.length === selectedFiles.length) {
                taskMemRef
                  .once("value")
                  .then((snapshot) => {
                    let existingData = snapshot.val() || "prefix.txt"; // Lấy dữ liệu hiện có

                    // Chuyển dữ liệu thành object nếu chưa phải object
                    if (typeof existingData === "string") {
                      existingData = { default: existingData };
                    }

                    // Nếu đã có danh sách file cho folder này, lấy danh sách cũ
                    let existingFiles = existingData[folderName]
                      ? existingData[folderName].split(", ")
                      : [];

                    // Gộp danh sách file cũ với file mới (loại bỏ trùng lặp)
                    let updatedFileList = [
                      ...new Set([...existingFiles, ...uploadedFiles]),
                    ];

                    // Cập nhật danh sách file mới vào folder tương ứng trong FileList
                    existingData[folderName] = updatedFileList.join(", ");

                    // Lưu vào Firebase
                    return taskMemRef.set(existingData);
                  })
                  .then(() => {
                    console.log("File list updated successfully!");

                    // **Cập nhật Task Status thành 1**
                    return taskListRef.update({ "Task Status": 1 });
                  })
                  .then(() => {
                    console.log("Task Status updated successfully!");
                    botMessage.textContent = `PwrUsr >> Uploaded ${uploadedFiles.length} file(s) to ${folderName} successfully!`;
                    supportDiv.innerHTML = ``;
                  })
                  .catch((error) => {
                    console.error("Error updating database:", error);
                    botMessage.textContent =
                      "PwrUsr >> Error updating database!";
                  });
              }
            })
            .catch((error) => {
              console.error(`Error uploading ${file.name}:`, error);
              botMessage.textContent = `PwrUsr >> Error uploading ${file.name}`;
            });
        });
      } else if (message.startsWith("dth -fetch")) {
        const userName = sessionStorage.getItem("userName");
        if (!userName) {
          botMessage.innerText = "User not found!";
          return;
        }

        const args = message.split(" ");
        if (args.length < 3) {
          botMessage.innerText = "Please specify the file name!";
          return;
        }

        const targetFile = args.slice(2).join(" "); // Lấy tên file cần tìm
        var database = firebase.database();
        var storage = firebase.storage();
        var taskMemRef = database.ref(`TaskMem/${userName}/FileList`);

        taskMemRef
          .once("value")
          .then((snapshot) => {
            let fileData = snapshot.val();
            if (!fileData || Object.keys(fileData).length === 0) {
              botMessage.innerText = "No files found!";
              return;
            }

            let bestMatch = null;
            let bestMatchFolder = null;
            let bestMatchScore = -1;

            Object.entries(fileData).forEach(([folder, files]) => {
              let fileArray = files.split(", ");
              fileArray.forEach((file) => {
                let similarity = getSimilarity(
                  targetFile.toLowerCase(),
                  file.toLowerCase()
                );
                if (similarity > bestMatchScore) {
                  bestMatchScore = similarity;
                  bestMatch = file;
                  bestMatchFolder = folder;
                }
              });
            });

            if (!bestMatch) {
              botMessage.innerText = `No matching file found for "${targetFile}"`;
              return;
            }

            // 🟢 Tải file từ Firebase Storage
            let fileRef = storage.ref(
              `TaskMem/${userName}/${bestMatchFolder}/${bestMatch}`
            );
            fileRef
              .getDownloadURL()
              .then((url) => {
                let downloadLink = document.createElement("a");
                downloadLink.href = url;
                downloadLink.download = bestMatch;
                downloadLink.innerHTML = `⬇️ ${bestMatch}`;
                downloadLink.style.display = "inline-block";
                downloadLink.style.marginTop = "0px";
                downloadLink.style.color = "#000000";
                downloadLink.style.backgroundColor = "none";
                downloadLink.style.textDecoration = "none";
                downloadLink.style.borderRadius = "5px";
                downloadLink.style.fontSize = "10px";
                downloadLink.style.fontWeight = "100";
                downloadLink.style.fontFamily = "Courier New";

                botMessage.innerHTML = `Best found in ${bestMatchFolder}<br>`;
                botMessage.appendChild(downloadLink);
              })
              .catch((error) => {
                console.error("Error fetching file:", error);
                botMessage.innerText = "Error retrieving file!";
              });
          })
          .catch((error) => {
            console.error("Error retrieving file list:", error);
            botMessage.innerText = "Error retrieving file list!";
          });
        chatMessages.scrollTop = chatMessages.scrollHeight; // Cuộn xuống cuối cùng
      } else {
        botMessage.textContent = "PwrUsr >> I didn't understand that command.";
      }

      chatMessages.appendChild(botMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight; // Cuộn xuống cuối cùng
    }, 500);
  }
}
let selectedFiles = []; // Biến lưu danh sách file đã chọn
function setupFileUpload() {
  const uploadInput = document.getElementById("file-upload");
  const uploadStatus = document.getElementById("upload-status");
  const uploadContainer = document.querySelector(".upload-container");

  if (!uploadInput) return;

  uploadInput.addEventListener("change", function (event) {
    selectedFiles = Array.from(event.target.files); // Lưu danh sách file
    handleFiles(selectedFiles);
  });

  uploadContainer.addEventListener("dragover", function (event) {
    event.preventDefault();
    uploadContainer.classList.add("drag-over");
  });

  uploadContainer.addEventListener("dragleave", function () {
    uploadContainer.classList.remove("drag-over");
  });

  uploadContainer.addEventListener("drop", function (event) {
    event.preventDefault();
    uploadContainer.classList.remove("drag-over");
    selectedFiles = Array.from(event.dataTransfer.files); // Lưu danh sách file
    handleFiles(selectedFiles);
  });

  function handleFiles(files) {
    if (files.length > 0) {
      uploadStatus.innerHTML = `<p>${files.length} file(s) selected for upload</p>`;
    }
  }
}

window.sendMessage = sendMessage;

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

function getSimilarity(str1, str2) {
  let matches = 0;
  let len = Math.max(str1.length, str2.length);
  for (let i = 0; i < len; i++) {
    if (str1[i] && str2[i] && str1[i] === str2[i]) {
      matches++;
    }
  }
  return matches / len; // Tính phần trăm ký tự giống nhau
}
