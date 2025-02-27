document.addEventListener("DOMContentLoaded", function () {
  const saokeButton = document.getElementById("saoke");
  attachCheckboxListeners();

  saokeButton.addEventListener("click", function () {
    // Chuyển đến trang mới
    // window.open("bill.html", "_blank"); // Thay "ten_trang_moi.html" bằng đường dẫn trang mới
    if (isClaimButtonPressed) {
      const userName = sessionStorage.getItem("userName");
      if (userName) {
        const database = firebase.database();
        const userRef = database.ref("Cert/" + userName);

        userRef
          .once("value")
          .then((snapshot) => {
            const value = snapshot.val().Value; // Lấy giá trị từ Firebase

            if (value == 0) {
              alert("You need to get permission first!");
            } else if (value == 1) {
              // Nếu Value = 1, set data-num = 90% và cập nhật nội dung
              downloadNextFile();
            }
          })
          .catch((error) => {
            console.error("Lỗi khi đọc dữ liệu từ Firebase:", error);
          });
      } else {
        console.log(
          "Không tìm thấy thông tin người dùng trong sessionStorage."
        );
      }
    } else {
      alert("⚠️ Error! You must claim the Item Report to check valid account!");
    }
  });
});

// document
//   .getElementById("work-product-box")
//   .addEventListener("click", function () {
//     console.log("Hello! hihi");
//     document.getElementById("work-item-popup").style.display = "flex"; // Hiện popup
//   });

// document.getElementById("close-popup").addEventListener("click", function () {
//   document.getElementById("work-item-popup").style.display = "none"; // Đóng popup
// });

// document.getElementById("request-btn").addEventListener("click", function () {
//   document.getElementById("file-input").click(); // Mở hộp thoại chọn file
// });
// document
//   .getElementById("file-input")
//   .addEventListener("change", function (event) {
//     const file = event.target.files[0];
//     if (!file) {
//       alert("Vui lòng chọn một file.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const data = e.target.result; // Dữ liệu gốc
//       uploadFile(file); // Tải lên file gốc
//     };
//     reader.readAsArrayBuffer(file); // Đọc file dưới dạng ArrayBuffer
//   });

// // Hàm tải lên Firebase
// function uploadFile(file) {
//   const storageRef = firebase.storage().ref();
//   const fileRef = storageRef.child(`Design/${file.name}`); // Sử dụng tên tệp gốc

//   // Hiển thị thông báo tải lên
//   document.getElementById("upload-status").style.display = "block";

//   const uploadTask = fileRef.put(file); // Tải lên file

//   uploadTask.on(
//     "state_changed",
//     function (snapshot) {
//       // Theo dõi tiến trình tải lên
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log("Upload is " + progress + "% done");
//     },
//     function (error) {
//       console.error("Error uploading file:", error);
//       document.getElementById("upload-status").style.display = "none"; // Ẩn thông báo tải lên
//       alert("Có lỗi xảy ra khi tải lên: " + error.message);
//     },
//     function () {
//       // Tải lên hoàn tất
//       uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//         console.log("File available at", downloadURL);
//         document.getElementById("upload-status").style.display = "none"; // Ẩn thông báo tải lên
//         alert("Request Successful, Get a Power File now!"); // Hiển thị thông báo
//         document.getElementById("close-popup").click(); // Đóng popup
//       });
//     }
//   );
// }

// // Down file...........................................................
// document.getElementById("fetch-btn").addEventListener("click", function () {
//   fetchFile();
// });

// function fetchFile() {
//   const invoiceRef = firebase.storage().ref().child("Design/Invoice.pdf");

//   // Kiểm tra xem file Invoice.pdf có tồn tại không
//   invoiceRef
//     .getDownloadURL()
//     .then(function () {
//       // Nếu tồn tại, tiếp tục tải file CERT.txt
//       const certRef = firebase.storage().ref().child("Design/CERT.txt");
//       const statusBar = document.createElement("div");
//       statusBar.id = "status-bar";
//       statusBar.style.width = "100%";
//       statusBar.style.height = "5px";
//       statusBar.style.backgroundColor = "blue";
//       document.body.appendChild(statusBar);

//       certRef
//         .getDownloadURL()
//         .then(function (url) {
//           const link = document.createElement("a");
//           link.href = url;
//           link.download = "CERT.txt"; // Đặt tên file khi tải xuống
//           document.body.appendChild(link);
//           link.click(); // Tự động click để tải file
//           document.body.removeChild(link);

//           // Cập nhật thanh trạng thái
//           statusBar.style.width = "100%"; // Hoàn thành tải xuống
//           alert("File has been downloaded successfully!"); // Thông báo khi tải xong
//         })
//         .catch(function (error) {
//           console.error("Error fetching CERT.txt:", error);
//           alert("Error fetching CERT.txt: " + error.message); // Thông báo lỗi
//         })
//         .finally(function () {
//           // Ẩn thanh trạng thái sau khi hoàn thành
//           setTimeout(() => {
//             document.body.removeChild(statusBar);
//           }, 2000); // Ẩn sau 2 giây
//         });
//     })
//     .catch(function () {
//       // Nếu file Invoice.pdf không tồn tại
//       alert("You do not have permission for this decision!");
//     });
// }

// .........................................................

function handleFileDownload() {
  var fileRef = firebase.storage().ref().child("Design/Invoice.pdf");

  fileRef
    .getDownloadURL()
    .then(function (url) {
      // Create a link element to initiate download
      var link = document.createElement("a");
      link.href = url;
      link.download = "Invoice.pdf"; // Suggest filename for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(function (error) {
      // Handle errors
      console.error("Download error:", error);
      alert("Error downloading file: " + error.message);
    });
}

// // Set up event listener for GET ISSUE button
// document.getElementById("saoke1").addEventListener("click", handleFileDownload);
document.getElementById("subject-box").addEventListener("click", function () {
  console.log("Hello");
  document.getElementById(
    "content-list"
  ).innerHTML = `  <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox001"
                      class="item-checkbox"
                      value="WI_BK_ElecCir"
                    />
                    <label for="checkbox001" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_ElecCir</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Electric Circuit subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox002"
                      class="item-checkbox"
                      value="WI_BK_BasElec"
                    />
                    <label for="checkbox002" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_BasElec</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Basic Electronics subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox003"
                      class="item-checkbox"
                      value="WI_BK_AppMath"
                    />
                    <label for="checkbox003" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_AppMath</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Applied Mathematics subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox004"
                      class="item-checkbox"
                      value="WI_BK_SenMea"
                    />
                    <label for="checkbox004" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_SenMea</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Sensor and Measurement subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox005"
                      class="item-checkbox"
                      value="WI_BK_DigSys"
                    />
                    <label for="checkbox005" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_DigSys</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Digital Systems subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox006"
                      class="item-checkbox"
                      value="WI_BK_SigSys"
                    />
                    <label for="checkbox006" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_SigSys</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Signal and Systems subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox007"
                      class="item-checkbox"
                      value="WI_BK_EleFiec"
                    />
                    <label for="checkbox007" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_EleFie</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Electromagnetic Field subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox008"
                      class="item-checkbox"
                      value="WI_BK_DataCom"
                    />
                    <label for="checkbox008" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_DataCom</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Data Communications subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox009"
                      class="item-checkbox"
                      value="WI_BK_MicEng"
                    />
                    <label for="checkbox009" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_MicEng</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Microprocessor Engineering subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox010"
                      class="item-checkbox"
                      value="WI_BK_MicLab"
                    />
                    <label for="checkbox010" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_MicLab</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Microprocessor Laboratory subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>
            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox011"
                      class="item-checkbox"
                      value="WI_BK_ComSys"
                    />
                    <label for="checkbox011" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_ComSys</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Communication Systems subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox012"
                      class="item-checkbox"
                      value="WI_BK_ComLab"
                    />
                    <label for="checkbox012" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_ComLab</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Communication System Lab subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox013"
                      class="item-checkbox"
                      value="WI_BK_ICSysDes"
                    />
                    <label for="checkbox013" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_ICSysDes</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Integrated Circuit System Design subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox014"
                      class="item-checkbox"
                      value="WI_BK_ICSDLab"
                    />
                    <label for="checkbox014" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_ICSDLab</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Integrated Circuit System Design Lab
                  subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox015"
                      class="item-checkbox"
                      value="WI_BK_WirComSys"
                    />
                    <label for="checkbox015" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_WirComSys</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Wireless Communication Systems subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox016"
                      class="item-checkbox"
                      value="WI_BK_VLSI"
                    />
                    <label for="checkbox016" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_VLSI</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to VLSI Design subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox017"
                      class="item-checkbox"
                      value="WI_BK_VLSILab"
                    />
                    <label for="checkbox017" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_VLSILab</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to VLSI Design Lab subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox018"
                      class="item-checkbox"
                      value="WI_BK_DSP"
                    />
                    <label for="checkbox018" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_DSP</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Digital Signal Processing subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox019"
                      class="item-checkbox"
                      value="WI_BK_DSPL"
                    />
                    <label for="checkbox019" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_DSPL</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Digital Signal Processing Lab subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox020"
                      class="item-checkbox"
                      value="WI_BK_IOT"
                    />
                    <label for="checkbox020" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_IOT</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Internet of Things subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox021"
                      class="item-checkbox"
                      value="WI_BK_IOTL"
                    />
                    <label for="checkbox021" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_IOTL</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Internet of Things Lab subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox022"
                      class="item-checkbox"
                      value="WI_BK_ArtInt"
                    />
                    <label for="checkbox022" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_ArtInt</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Artificial Intelligence subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox023"
                      class="item-checkbox"
                      value="WI_BK_MicroEng"
                    />
                    <label for="checkbox023" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_MicroEng</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Microwave Engineering subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox024"
                      class="item-checkbox"
                      value="WI_BK_DigCom"
                    />
                    <label for="checkbox024" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_DigCom</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Digital Communication subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox025"
                      class="item-checkbox"
                      value="WI_BK_MobCom"
                    />
                    <label for="checkbox025" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_MobCom</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Mobility Communications subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox026"
                      class="item-checkbox"
                      value="WI_BK_Calc1"
                    />
                    <label for="checkbox026" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_Calc1</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Calculus 1 subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox027"
                      class="item-checkbox"
                      value="WI_BK_Calc2"
                    />
                    <label for="checkbox027" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_Calc2</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Calculus 2 subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox028"
                      class="item-checkbox"
                      value="WI_BK_Calc3"
                    />
                    <label for="checkbox028" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_Calc3</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Calculus 3 subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="checkbox029"
                      class="item-checkbox"
                      value="WI_BK_AppProb"
                    />
                    <label for="checkbox029" class="checkmark"></label>
                  </div>
                  <p style="font-size: 15px">WI_BK_AppProb
                  </p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/text-books.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Applied Statistical Probability subject
                  subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

 `;

  // Gán lại sự kiện cho checkbox sau khi cập nhật nội dung
  attachCheckboxListeners();
});

document.getElementById("project-box").addEventListener("click", function () {
  console.log("Hello");
  document.getElementById("content-list").innerHTML = `
             <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input type="checkbox" id="checkbox001" class="item-checkbox" value="WI_PJ_SenProI" />
                    <label for="checkbox001" class="checkmark"></label>
                  </div>

                  <p style="font-size: 15px">WI_PJ_SenProI</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/idea.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Senior Project 1 subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>
            
            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input type="checkbox" id="checkbox0022" class="item-checkbox" value="WI_PJ_SenProII" />
                    <label for="checkbox0022" class="checkmark"></label>
                  </div>

                  <p style="font-size: 15px">WI_PJ_SenProII</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/idea.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Senior Project 2 subject
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

            
            `;

  // Gán lại sự kiện cho checkbox sau khi cập nhật nội dung
  attachCheckboxListeners();
});

document.getElementById("refer-box").addEventListener("click", function () {
  console.log("Hello");
  document.getElementById("content-list").innerHTML = `
             <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input type="checkbox" id="checkbox0001" class="item-checkbox" value="WI_RF_CleCod" />
                    <label for="checkbox0001" class="checkmark"></label>
                  </div>

                  <p style="font-size: 15px">WI_RF_CleCod</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/idea.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Clean Code problem.
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>
            
            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input type="checkbox" id="checkbox0002" class="item-checkbox" value="WI_RF_CleArc" />
                    <label for="checkbox0002" class="checkmark"></label>
                  </div>

                  <p style="font-size: 15px">WI_RF_CleArc</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/idea.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Clean Architecture problem.
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>


            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input type="checkbox" id="checkbox0003" class="item-checkbox" value="WI_RF_AgTest" />
                    <label for="checkbox0003" class="checkmark"></label>
                  </div>

                  <p style="font-size: 15px">WI_RF_AgTest</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/idea.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to Agile Testing problem.
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>
            

            <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input type="checkbox" id="checkbox0004" class="item-checkbox" value="WI_RF_UXUI" />
                    <label for="checkbox0004" class="checkmark"></label>
                  </div>

                  <p style="font-size: 15px">WI_RF_UXUI</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/idea.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to UX and UI problem.
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>

             <div class="tab-body-item">
              <div class="item-top">
                <div class="item-top-title">
                  <div class="checkbox-wrapper">
                    <input type="checkbox" id="checkbox0005" class="item-checkbox" value="WI_RF_AmpCoo" />
                    <label for="checkbox0005" class="checkmark"></label>
                  </div>

                  <p style="font-size: 15px">WI_RF_AmpCoo</p>
                </div>
                <button class="item-top-btn">
                  <img src="./img/idea.png" alt="" />
                </button>
              </div>
              <div class="item-body">
                <p class="item-body-text">
                  References related to TI Amplifier Cookbook problem.
                </p>
                <div class="badge-group">
                  <span class="badge-brown">Preview</span>
                  <span class="badge-blue">Raise Request</span>
                  <span class="badge-green">Comment</span>
                </div>
              </div>
            </div>
            `;

  // Gán lại sự kiện cho checkbox sau khi cập nhật nội dung
  attachCheckboxListeners();
});

// Mảng lưu các mục đã chọn
let selectedItems = [];

// Hàm gán sự kiện cho checkbox
function attachCheckboxListeners() {
  document.querySelectorAll(".item-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        selectedItems.push(this.value);
      } else {
        selectedItems = selectedItems.filter((item) => item !== this.value);
      }
      console.log("Selected Items:", selectedItems);
    });
  });
}
let isClaimButtonPressed = false;
// ...........................................................................................................

// Xuất PDF khi nhấn nút "saokex"
document.getElementById("saokex").addEventListener("click", function () {
  isClaimButtonPressed = true;
  if (selectedItems.length === 0) {
    alert("Vui lòng chọn ít nhất một mục!");
    return;
  }

  const userName = sessionStorage.getItem("userName");

  if (userName) {
    const database = firebase.database();
    const userRef = database.ref("Cert/" + userName);

    userRef
      .once("value")
      .then((snapshot) => {
        const value = snapshot.val().Value; // Lấy giá trị từ Firebase
        console.log(value);
        let certState = "0";
        if (value == 0) {
          // Nếu Value = 0, set data-num = 10% và cập nhật nội dung
          certState = "Invalid";
        } else if (value == 1) {
          certState = "Accessible";
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFont("courier");
        doc.setFontSize(10);

        // Vẽ bảng tiêu đề
        const startX = 10;
        const startY = 10;
        const col1Width = 30;
        const col2Width = 160;
        const rowHeight = 8;

        const headers = [
          ["Report", "LIST OF ORDERED ITEMS"],
          ["Cert", certState],
          ["Date", ""],
          // Không nối chuỗi mà để tách riêng từng cột cho dòng "Customer"
          ["Customer", userNameWithoutAccent, "Author", ""],
        ];

        // Vẽ bảng tiêu đề
        headers.forEach((row, index) => {
          const yPos = startY + index * rowHeight;

          // Vẽ ô cột 1 (nét đứt)
          doc.rect(startX, yPos, col1Width, rowHeight);
          doc.text(row[0], startX + 2, yPos + 5);
          console.log(certState);
          if (index == 0) {
            doc.rect(startX + col1Width, yPos, col2Width, rowHeight);
            doc.text(row[1], startX + col1Width + 2, yPos + 5);
          }
          if (index == 1) {
            console.log("Chungchi:" + certState);
            doc.rect(startX + col1Width, yPos, col2Width, rowHeight);
            doc.text(certState, startX + col1Width + 2, yPos + 5);
          }
          // Vẽ ô cột 2 (nét đứt)
          if (index == 2) {
            doc.rect(startX + col1Width, yPos, col2Width - 100, rowHeight);
            doc.text(
              new Date().toLocaleDateString(),
              startX + col1Width + 2,
              yPos + 5
            );

            // Vẽ ô cột thứ 3 và thứ 4 cho dòng "Customer"
            doc.rect(
              startX + col1Width + col2Width - 100,
              yPos,
              col1Width,
              rowHeight
            ); // Cột 3
            doc.text("Time", startX + col1Width + 62, yPos + 5);

            doc.rect(startX + col1Width, yPos, col2Width, rowHeight); // Cột 4
            doc.text(
              new Date().toLocaleTimeString(),
              startX + col1Width + 93,
              yPos + 5
            );
          }

          // Dòng 4: Tách ra thành 4 cột
          if (index == 3) {
            doc.rect(startX + col1Width, yPos, col2Width - 100, rowHeight);
            doc.text(row[1], startX + col1Width + 2, yPos + 5);

            // Vẽ ô cột thứ 3 và thứ 4 cho dòng "Customer"
            doc.rect(
              startX + col1Width + col2Width - 100,
              yPos,
              col1Width,
              rowHeight
            ); // Cột 3
            doc.text("Author", startX + col1Width + 62, yPos + 5);

            doc.rect(startX + col1Width, yPos, col2Width, rowHeight); // Cột 4
            doc.text("Do Trung Hau", startX + col1Width + 93, yPos + 5);
          } else {
            doc.rect(startX + col1Width, yPos, col2Width, rowHeight);
            doc.text(row[1], startX + col1Width + 2, yPos + 5);
          }
        });

        // Tạo khoảng cách trước bảng dữ liệu
        const tableStartY = startY + headers.length * rowHeight + 10;

        // Định nghĩa bảng ánh xạ mã môn học
        const subjectMap = {
          SenProI: "Senior Project 1",
          SenProII: "Senior Project 2",
          BasElec: "Basic Electronics",
          AppMath: "Applied Mathematics",
          SenMea: "Sensor Measurement",
          DigSys: "Digital Systems",
          SigSys: "Signal Systems",
          EleFie: "Electromagnetic field",
          DataCom: "Data Communications",
          MicEng: "Microprocessor Engineering",
          MicLab: "Microprocessor Lab",
          ComSys: "Communication Systems",
          ComLab: "Communication System Lab",
          ICSysDes: "Integrated Circuit System Design",
          ICSDLab: "IC System Design Lab",
          WirComSys: "Wireless Communication Systems",
          VLSI: "Very Large Scale Integration",
          VLSILab: "VLSI Lab",
          DSP: "Digital Signal Processing",
          DSPL: "Digital Signal Processing Lab",
          IOT: "Internet of Things",
          IOTL: "Internet of Things Lab",
          ArtInt: "Artificial Intelligence",
          MicroEng: "Microwave Engineering",
          DigCom: "Digital Communications",
          MobCom: "Mobility Communications",
          Calc1: "Calculus 1",
          Calc2: "Calculus 2",
          Calc3: "Calculus 3",
          AppProb: "Applied Statistical Probability",
          ElecCir: "Electronic Circuit",
          CleCod: "Clean Code",
          CleArc: "Clean Architecture",
          AgTest: "Agile Testing",
          UXUI: "The Design of Everyday Things",
          AmpCoo: "TI - Amplifier Cookbook",
        };

        // In tiêu đề bảng
        const tableHeaders = [
          "No",
          "Work item",
          "Subject",
          "Version",
          "State",
          "Queue",
        ];
        doc.text(tableHeaders[0], 10, tableStartY);
        doc.text(tableHeaders[1], 20, tableStartY);
        doc.text(tableHeaders[2], 60, tableStartY);
        doc.text(tableHeaders[3], 132, tableStartY);
        doc.text(tableHeaders[4], 155, tableStartY);
        doc.text(tableHeaders[5], 180, tableStartY);

        // Vẽ đường kẻ bảng
        doc.setLineDash([2, 2]);
        doc.line(10, tableStartY + 2, 200, tableStartY + 2);
        // Vẽ khung bao quanh toàn trang
        // doc.rect(5, 5, 200, 287); // (x, y, width, height)

        const specialSubjects = [
          "WI_BK_ElecCir",
          "WI_BK_AppMath",
          "WI_BK_WirComSys",
          "WI_BK_MobCom",
          "WI_BK_Calc1",
          "WI_BK_Calc2",
          "WI_BK_AppProb",
          "WI_PJ_SenProI",
          "WI_PJ_SenProII",
        ];

        selectedItems.forEach((item, index) => {
          const workItem = item;
          const abbreviation = workItem.split("_")[2];
          const subject = subjectMap[abbreviation] || "Unknown";
          const version = "V10.0.0";

          // Kiểm tra nếu workItem chứa một trong các môn học đặc biệt
          const isSpecial = specialSubjects.some((sub) =>
            workItem.includes(sub)
          );

          const state = isSpecial ? "Empty" : "Available";
          const queue = isSpecial ? "Unable" : "Completed";

          const yPosition = tableStartY + 8 + index * 10;

          doc.text(String(index + 1).padStart(2, "0"), 10, yPosition);
          doc.text(workItem, 20, yPosition);
          doc.text(subject, 60, yPosition);
          doc.text(version, 132, yPosition);
          doc.text(state, 155, yPosition);
          doc.text(queue, 180, yPosition);

          doc.line(10, yPosition + 2, 200, yPosition + 2);
        });

        // Lưu file PDF
        doc.save("Ordered Items.pdf");
      })
      .catch((error) => {
        console.error("Lỗi khi đọc dữ liệu từ Firebase:", error);
      });
  } else {
    console.log("Không tìm thấy thông tin người dùng trong sessionStorage.");
  }
});

// .......................................................................................
const userName = sessionStorage.getItem("userName");
function convertToNonAccentVietnamese(str) {
  const map = {
    á: "a",
    à: "a",
    ả: "a",
    ã: "a",
    ạ: "a",
    ă: "a",
    ắ: "a",
    ằ: "a",
    ẳ: "a",
    ẵ: "a",
    ặ: "a",
    â: "a",
    ấ: "a",
    ầ: "a",
    ẩ: "a",
    ẫ: "a",
    ậ: "a",
    é: "e",
    è: "e",
    ẻ: "e",
    ẽ: "e",
    ẹ: "e",
    ê: "e",
    ế: "e",
    ề: "e",
    ể: "e",
    ễ: "e",
    ệ: "e",
    í: "i",
    ì: "i",
    ỉ: "i",
    ĩ: "i",
    ị: "i",
    ó: "o",
    ò: "o",
    ỏ: "o",
    õ: "o",
    ọ: "o",
    ô: "o",
    ố: "o",
    ồ: "o",
    ổ: "o",
    ỗ: "o",
    ộ: "o",
    ơ: "o",
    ớ: "o",
    ờ: "o",
    ở: "o",
    ỡ: "o",
    ợ: "o",
    ú: "u",
    ù: "u",
    ủ: "u",
    ũ: "u",
    ụ: "u",
    ư: "u",
    ứ: "u",
    ừ: "u",
    ử: "u",
    ữ: "u",
    ự: "u",
    ý: "y",
    ỳ: "y",
    ỷ: "y",
    ỹ: "y",
    ỵ: "y",
    đ: "d",
    // Các ký tự viết hoa
    Á: "A",
    À: "A",
    Ả: "A",
    Ã: "A",
    Ạ: "A",
    Ă: "A",
    Ắ: "A",
    Ằ: "A",
    Ẳ: "A",
    Ẵ: "A",
    Ặ: "A",
    Â: "A",
    Ấ: "A",
    Ầ: "A",
    Ẩ: "A",
    Ẫ: "A",
    Ậ: "A",
    É: "E",
    È: "E",
    Ẻ: "E",
    Ẽ: "E",
    Ẹ: "E",
    Ê: "E",
    Ế: "E",
    Ề: "E",
    Ể: "E",
    Ễ: "E",
    Ệ: "E",
    Í: "I",
    Ì: "I",
    Ỉ: "I",
    Ĩ: "I",
    Ị: "I",
    Ó: "O",
    Ò: "O",
    Ỏ: "O",
    Õ: "O",
    Ọ: "O",
    Ô: "O",
    Ố: "O",
    Ồ: "O",
    Ổ: "O",
    Ỗ: "O",
    Ộ: "O",
    Ơ: "O",
    Ớ: "O",
    Ờ: "O",
    Ở: "O",
    Ỡ: "O",
    Ợ: "O",
    Ú: "U",
    Ù: "U",
    Ủ: "U",
    Ũ: "U",
    Ụ: "U",
    Ư: "U",
    Ứ: "U",
    Ừ: "U",
    Ử: "U",
    Ữ: "U",
    Ự: "U",
    Ý: "Y",
    Ỳ: "Y",
    Ỷ: "Y",
    Ỹ: "Y",
    Ỵ: "Y",
    Đ: "D",
  };

  return str
    .split("")
    .map((char) => map[char] || char)
    .join("");
}
// Chuyển userName thành không dấu
const userNameWithoutAccent = convertToNonAccentVietnamese(userName);

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

// document.getElementById("explore-pay").addEventListener("click", function () {
//   window.location.href = "infor.html";
// });

// ............................................................................................
// Đảm bảo khai báo workerSrc trước khi gọi pdf.js

// // Mảng để lưu các "Work item" bắt đầu với "WI_"
// let workItems = [];

// // Khi nhấn vào phần tử với id 'work-product-box', mở file input
// document
//   .getElementById("work-product-box")
//   .addEventListener("click", function () {
//     document.getElementById("pdf-file-input").click();
//   });

// // Khi người dùng chọn một file PDF
// document
//   .getElementById("pdf-file-input")
//   .addEventListener("change", function (event) {
//     const file = event.target.files[0];
//     const userName = sessionStorage.getItem("userName");

//     if (userName) {
//       const database = firebase.database();
//       const userRef = database.ref("Cert/" + userName);

//       userRef
//         .once("value")
//         .then((snapshot) => {
//           const value = snapshot.val().Value; // Lấy giá trị từ Firebase
//           console.log(value);
//           let certState = "0";
//           if (value == 0) {
//             // Nếu Value = 0, set data-num = 10% và cập nhật nội dung
//             certState = "Invalid";
//           } else if (value == 1) {
//             certState = "Accessible";
//           }
//           if (file && file.type === "application/pdf") {
//             const reader = new FileReader();

//             reader.onload = function (e) {
//               const typedarray = new Uint8Array(e.target.result);

//               // Sử dụng pdf.js để đọc file PDF
//               pdfjsLib
//                 .getDocument(typedarray)
//                 .promise.then(function (pdf) {
//                   // Duyệt qua từng trang của file PDF
//                   let numPages = pdf.numPages;

//                   // Đọc từng trang trong PDF
//                   for (let pageNum = 1; pageNum <= numPages; pageNum++) {
//                     pdf.getPage(pageNum).then(function (page) {
//                       page.getTextContent().then(function (textContent) {
//                         // Lọc ra nội dung từ cột "Work item"
//                         let textItems = textContent.items;
//                         textItems.forEach((item) => {
//                           const text = item.str.trim();

//                           // Kiểm tra nếu text bắt đầu bằng "WI_" và lưu vào mảng workItems
//                           if (text.startsWith("WI_")) {
//                             workItems.push(text);
//                           }
//                         });

//                         // In ra mảng workItems sau khi đọc xong
//                         console.log("Work Items:", workItems);
//                         // console.log(textItems);

//                         const { jsPDF } = window.jspdf;
//                         const doc = new jsPDF();

//                         doc.setFont("courier");
//                         doc.setFontSize(10);

//                         // Vẽ bảng tiêu đề
//                         const startX = 10;
//                         const startY = 10;
//                         const col1Width = 30;
//                         const col2Width = 160;
//                         const rowHeight = 8;

//                         const headers = [
//                           ["Report", "LIST OF ORDERED ITEMS"],
//                           ["Certificated", certState],
//                           ["Date", ""],
//                           // Không nối chuỗi mà để tách riêng từng cột cho dòng "Customer"
//                           ["Customer", userNameWithoutAccent, "Author", ""],
//                         ];

//                         // Vẽ bảng tiêu đề
//                         headers.forEach((row, index) => {
//                           const yPos = startY + index * rowHeight;

//                           // Vẽ ô cột 1 (nét đứt)
//                           doc.rect(startX, yPos, col1Width, rowHeight);
//                           doc.text(row[0], startX + 2, yPos + 5);
//                           console.log(certState);
//                           if (index == 0) {
//                             doc.rect(
//                               startX + col1Width,
//                               yPos,
//                               col2Width,
//                               rowHeight
//                             );
//                             doc.text(row[1], startX + col1Width + 2, yPos + 5);
//                           }
//                           if (index == 1) {
//                             console.log("Chungchi:" + certState);
//                             doc.rect(
//                               startX + col1Width,
//                               yPos,
//                               col2Width,
//                               rowHeight
//                             );
//                             doc.text(
//                               certState,
//                               startX + col1Width + 2,
//                               yPos + 5
//                             );
//                           }
//                           // Vẽ ô cột 2 (nét đứt)
//                           if (index == 2) {
//                             doc.rect(
//                               startX + col1Width,
//                               yPos,
//                               col2Width - 100,
//                               rowHeight
//                             );
//                             doc.text(
//                               new Date().toLocaleDateString(),
//                               startX + col1Width + 2,
//                               yPos + 5
//                             );

//                             // Vẽ ô cột thứ 3 và thứ 4 cho dòng "Customer"
//                             doc.rect(
//                               startX + col1Width + col2Width - 100,
//                               yPos,
//                               col1Width,
//                               rowHeight
//                             ); // Cột 3
//                             doc.text("Time", startX + col1Width + 62, yPos + 5);

//                             doc.rect(
//                               startX + col1Width,
//                               yPos,
//                               col2Width,
//                               rowHeight
//                             ); // Cột 4
//                             doc.text(
//                               new Date().toLocaleTimeString(),
//                               startX + col1Width + 93,
//                               yPos + 5
//                             );
//                           }

//                           // Dòng 4: Tách ra thành 4 cột
//                           if (index == 3) {
//                             doc.rect(
//                               startX + col1Width,
//                               yPos,
//                               col2Width - 100,
//                               rowHeight
//                             );
//                             doc.text(row[1], startX + col1Width + 2, yPos + 5);

//                             // Vẽ ô cột thứ 3 và thứ 4 cho dòng "Customer"
//                             doc.rect(
//                               startX + col1Width + col2Width - 100,
//                               yPos,
//                               col1Width,
//                               rowHeight
//                             ); // Cột 3
//                             doc.text(
//                               "Author",
//                               startX + col1Width + 62,
//                               yPos + 5
//                             );

//                             doc.rect(
//                               startX + col1Width,
//                               yPos,
//                               col2Width,
//                               rowHeight
//                             ); // Cột 4
//                             doc.text(
//                               "Do Trung Hau",
//                               startX + col1Width + 93,
//                               yPos + 5
//                             );
//                           } else {
//                             doc.rect(
//                               startX + col1Width,
//                               yPos,
//                               col2Width,
//                               rowHeight
//                             );
//                             doc.text(row[1], startX + col1Width + 2, yPos + 5);
//                           }
//                         });

//                         // Tạo khoảng cách trước bảng dữ liệu
//                         const tableStartY =
//                           startY + headers.length * rowHeight + 10;

//                         // Định nghĩa bảng ánh xạ mã môn học
//                         const subjectMap = {
//                           SenProI: "Senior Project 1",
//                           SenProII: "Senior Project 2",
//                           BasElec: "Basic Electronics",
//                           AppMath: "Applied Mathematics",
//                           SenMea: "Sensor Measurement",
//                           DigSys: "Digital Systems",
//                           SigSys: "Signal Systems",
//                           EleFiec: "Electric Fields",
//                           DataCom: "Data Communications",
//                           MicEng: "Microelectronics Engineering",
//                           MicLab: "Microelectronics Lab",
//                           ComSys: "Communication Systems",
//                           ComLab: "Communication Lab",
//                           ICSysDes: "Integrated Circuit System Design",
//                           ICSDLab: "IC System Design Lab",
//                           WirComSys: "Wireless Communication Systems",
//                           VLSI: "Very Large Scale Integration",
//                           VLSILab: "VLSI Lab",
//                           DSP: "Digital Signal Processing",
//                           DSPL: "Digital Signal Processing Lab",
//                           IOT: "Internet of Things",
//                           IOTL: "Internet of Things Lab",
//                           ArtInt: "Artificial Intelligence",
//                           MicroEng: "Microengineering",
//                           DigCom: "Digital Communications",
//                           MobCom: "Mobile Communications",
//                           CalcuI: "Calculus I",
//                           CalcuII: "Calculus II",
//                           CalcuIII: "Calculus III",
//                           AppProb: "Applied Probability",
//                           ElecCir: "Electronic Circuit",
//                         };

//                         // In tiêu đề bảng
//                         const tableHeaders = [
//                           "No",
//                           "Work item",
//                           "Subject",
//                           "Version",
//                           "State",
//                           "Queue",
//                         ];
//                         doc.text(tableHeaders[0], 10, tableStartY);
//                         doc.text(tableHeaders[1], 20, tableStartY);
//                         doc.text(tableHeaders[2], 60, tableStartY);
//                         doc.text(tableHeaders[3], 132, tableStartY); //10 20 60 132 155 180
//                         doc.text(tableHeaders[4], 155, tableStartY);
//                         doc.text(tableHeaders[5], 180, tableStartY);

//                         // Vẽ đường kẻ bảng
//                         doc.setLineDash([2, 2]);
//                         doc.line(10, tableStartY + 2, 200, tableStartY + 2);
//                         // Vẽ khung bao quanh toàn trang
//                         doc.rect(5, 5, 200, 287); // (x, y, width, height)

//                         // In dữ liệu bảng từ workItems
//                         workItems.forEach((item, index) => {
//                           const parts = item.split("_"); // Tách theo dấu "_"
//                           const abbreviation = parts.length > 2 ? parts[2] : ""; // Lấy phần thứ 3 (MicLab, DigSys,...)
//                           const subject = subjectMap[abbreviation] || "Unknown"; // Đối chiếu với subjectMap
//                           const version = "V10.0.0";
//                           const state = "Available";
//                           const queue = "Completed";

//                           const yPosition = tableStartY + 8 + index * 10;

//                           doc.text(
//                             String(index + 1).padStart(2, "0"),
//                             10,
//                             yPosition
//                           );
//                           doc.text(item, 20, yPosition);
//                           doc.text(subject, 60, yPosition);
//                           doc.text(version, 132, yPosition);
//                           doc.text(state, 155, yPosition);
//                           doc.text(queue, 180, yPosition);

//                           doc.line(10, yPosition + 2, 200, yPosition + 2);

//                           console.log(abbreviation);
//                         });

//                         // Lưu file PDF
//                         doc.save("DTHub_List_Items.pdf");
//                       });
//                     });
//                   }
//                 })
//                 .catch(function (error) {
//                   console.error("Error reading PDF: ", error);
//                 });
//             };

//             // Đọc file PDF dưới dạng ArrayBuffer
//             reader.readAsArrayBuffer(file);
//           } else {
//             alert("Please select a valid PDF file.");
//           }
//           // Nếu Value = 1, set data-num = 90% và cập nhật nội dung
//         })
//         .catch((error) => {
//           console.error("Lỗi khi đọc dữ liệu từ Firebase:", error);
//         });
//     } else {
//       console.log("Không tìm thấy thông tin người dùng trong sessionStorage.");
//     }
//   });

// .....................................................tai file......................................................
// Khởi tạo Firebase Storage
const storage = firebase.storage();
// Mảng workItems chứa các tên file cần tải
let currentIndex = 0; // Biến đếm để duyệt từng phần tử trong mảng

// Hàm tải file dựa trên phần tử hiện tại trong workItems
function downloadNextFile() {
  if (selectedItems.length === 0) {
    alert("The file list is empty! There are no files to download.");
    return;
  }

  if (currentIndex >= selectedItems.length) {
    alert("All files have been downloaded.");
    return;
  }

  const specialSubjects = [
    "WI_BK_ElecCir",
    "WI_BK_AppMath",
    "WI_BK_WirComSys",
    "WI_BK_MobCom",
    "WI_BK_Calc1",
    "WI_BK_Calc2",
    "WI_BK_AppProb",
    "WI_PJ_SenProI",
    "WI_PJ_SenProII",
  ];

  const workItem = selectedItems[currentIndex];

  // Kiểm tra nếu workItem thuộc danh sách môn đặc biệt
  if (specialSubjects.some((sub) => workItem.includes(sub))) {
    alert(
      `The file named "${workItem}" is not available on the system. Please proceed with another document.`
    );
    currentIndex++; // Bỏ qua file này và tiếp tục với file tiếp theo
    return;
  }

  const storageBucket = "dht-trace.appspot.com"; // Firebase Storage bucket
  const fileName = `${workItem}.rar`; // Tạo tên file
  const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(
    fileName
  )}?alt=media`;

  // Tạo thẻ <a> để tải file
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  currentIndex++; // Chuyển sang file tiếp theo
}

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
