document.getElementById("master-btn").addEventListener("click", function () {
  document.getElementById("content").innerHTML = `
        <table class="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Artifact</th>
                    <th>Description</th>
                    <th>Main Component</th>
                    <th>Detail</th>
                    <th>Method</th>
                    <th>Work State</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01</td>
                    <td>Work Statement</td>
                    <td>Get list of your expected work item to cart</td>
                    <td>E-Print</td>
                    <td>List of Item name</td>
                    <td>Automation/Manual</td>
                    <td><button id="state_1">Available</button></td>
                  </tr>
                  <tr class="active">
                    <td>02</td>
                    <td>Subject</td>
                    <td>List of subject material file</td>
                    <td>File</td>
                    <td>Document/Presentation</td>
                    <td>Manual</td>
                    <td><button id="state_2">Available</button></td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>Project</td>
                    <td>List of mini project in practice</td>
                    <td>File</td>
                    <td>Document/Exe/Source</td>
                    <td>Manual</td>
                    <td><button id="state_3">Available</button></td>
                  </tr>
                  <tr>
                    <td>04</td>
                    <td>References</td>
                    <td>Manual/Books/Papers</td>
                    <td>File</td>
                    <td>Document</td>
                    <td>Manual</td>
                    <td><button id="state_4">Available</button></td>
                  </tr>
                </tbody>
              </table>
`;
  document.getElementById(
    "attendance_1"
  ).innerHTML = ` <div class="gradient-bar">
            <div class="color-1"></div>
            <div class="color-2"></div>
            <div class="color-3"></div>
            <div class="color-4"></div>
            <div class="color-5"></div>
            <div class="color-6"></div>
            <div class="color-7"></div>
            <div class="color-8"></div>
            <div class="color-9"></div>
          </div>
     <div class="info">

       <div id="myChart5""> <img src="./img/chart2.svg" class="responsive-img"></div>
</div>`;

  // let chartData = [
  //   {
  //     id: "collegeboard",
  //     name: "ITEM LIST BOARD",
  //     parent: "",
  //     cls: "bdegblue",
  //   },

  //   {
  //     id: "fkn1",
  //     fake: true,
  //     name: "1",
  //     parent: "collegeboard",
  //     sibling: "president",
  //   },
  //   {
  //     id: "president",
  //     name: "ACCESSIBILITY",
  //     parent: "collegeboard",
  //     cls: "byellow",
  //   },
  //   {
  //     id: "execasspres",
  //     name: "Power User to<br>Common User",
  //     parent: "collegeboard",
  //     sibling: "president",
  //     cls: "bwhite",
  //   },

  //   {
  //     id: "execvicepres",
  //     name: "Subject<br>Broad Item/<br>Specialized Item",
  //     parent: "president",
  //     cls: "bred",
  //   },
  //   {
  //     id: "chinof",
  //     name: "Internal Resources",
  //     parent: "execvicepres",
  //     cls: "bgreen",
  //   },
  //   {
  //     id: "assvicepres",
  //     name: "External Resources",
  //     parent: "execvicepres",
  //     cls: "bgreen",
  //   },

  //   { id: "fkn2", fake: true, name: "2", parent: "president" },
  //   { id: "fkn3", fake: true, name: "3", parent: "fkn2" },

  //   {
  //     id: "prmdir",
  //     name: "Manual Document & Lesson Script<br>Internal/External",
  //     parent: "fkn3",
  //     cls: "bblue",
  //   },
  //   {
  //     id: "prc",
  //     name: "Public Relations<br>Internal",
  //     parent: "prmdir",
  //     cls: "bwhite",
  //   },
  //   {
  //     id: "sw",
  //     name: "Shared Linkable Relations",
  //     parent: "prmdir",
  //     reference: "prc",
  //     cls: "bwhite",
  //   },

  //   {
  //     id: "fed",
  //     name: "Source Code & Executable File<br>Referenced Resources",
  //     parent: "fkn3",
  //     cls: "bblue",
  //   },
  //   { id: "safed", name: "Source Code", parent: "fed", cls: "bwhite" },
  //   {
  //     id: "dps",
  //     name: "Executable File<br>Extract",
  //     parent: "fed",
  //     reference: "safed",
  //     cls: "bwhite",
  //   },

  //   {
  //     id: "sdirsp",
  //     name: "Tool<br>Environment and<br>Manual",
  //     parent: "fkn3",
  //     cls: "bblue",
  //   },
  //   {
  //     id: "sra",
  //     name: "Environment Setup <br> User manual",
  //     parent: "sdirsp",
  //     cls: "bwhite",
  //   },
  //   {
  //     id: "rs",
  //     name: "Tools Supported",
  //     parent: "sdirsp",
  //     reference: "sra",
  //     cls: "bwhite",
  //   },

  //   {
  //     id: "vicepresle",
  //     name: "Technical Project<br>for Reference",
  //     parent: "president",
  //     cls: "bred",
  //   },
  //   {
  //     id: "assvicepresl",
  //     name: "Referenced Project",
  //     parent: "vicepresle",
  //     cls: "bgreen",
  //   },

  //   {
  //     id: "vicepresstu",
  //     name: "Reference Resources",
  //     parent: "president",
  //     cls: "bred",
  //   },
  // ];

  // let chartConfig4 = {
  //   type: "tree",
  //   options: {
  //     aspect: "tree-down",
  //     orgChart: true,
  //     packingFactor: 1,
  //     link: {
  //       lineColor: "#000",
  //       lineWidth: "2px",
  //     },
  //     "link[parent-prmdir]": {
  //       aspect: "side-before",
  //     },
  //     "link[parent-fed]": {
  //       aspect: "side-before",
  //     },
  //     "link[parent-sdirsp]": {
  //       aspect: "side-before",
  //     },
  //     node: {
  //       borderColor: "#000",
  //       borderWidth: "2px",
  //       fillAngle: 0,
  //       gradientStops: "0.01 0.5 0.55 0.99",
  //       shadow: true,
  //       shadowColor: "#ccc",
  //       shadowDistance: "4px",
  //       hoverState: {
  //         visible: false,
  //       },
  //       label: {
  //         color: "#000",
  //         fontSize: "10px",
  //       },
  //       hoverState: { visible: false }, // Tắt hiệu ứng mặc định
  //       tooltip: { text: "%text", bold: true }, // Tooltip mặc định
  //     },
  //     "node[cls-byellow]": {
  //       gradientColors: "#FDDA58 #FBF4BD #FBF4BD #FDDA58",
  //       label: {
  //         fontSize: "15px",
  //         fontWeight: "bold",
  //       },
  //       width: "200px",
  //       height: "60px",
  //     },
  //     "node[cls-bred]": {
  //       gradientColors: "#A15A58 #D6B2B2 #D6B2B2 #A15A58",
  //       width: "120px",
  //       height: "70px",
  //     },
  //     "node[cls-bdegblue]": {
  //       gradientColors: "#51B7CD #C0E0EB #C0E0EB #51B7CD",
  //       label: {
  //         fontSize: "15px",
  //         fontWeight: "bold",
  //       },
  //       width: "300px",
  //       height: "70px",
  //     },
  //     "node[cls-bblue]": {
  //       backgroundColor: "#B7DDE8",
  //       width: "180px",
  //       height: "65px",
  //     },
  //     "node[cls-bgreen]": {
  //       backgroundColor: "#C3D79A",
  //       width: "130px",
  //       height: "50px",
  //     },
  //     "node[cls-bwhite]": {
  //       backgroundColor: "#fff",
  //       offsetX: "30px",
  //       width: "140px",
  //       height: "50px",
  //     },
  //   },
  //   plotarea: {
  //     margin: "20px",
  //   },
  //   series: chartData,
  // };

  // zingchart.render({
  //   id: "myChart4",
  //   width: "1200px",
  //   height: "1000px",
  //   data: chartConfig4,
  // });
});

document.getElementById("slave-btn").addEventListener("click", function () {
  document.getElementById("content").innerHTML = `
      
        <table class="table">
          <thead>
             <tr>
              <th>No</th>
              <th>Artifact</th>
              <th>Description</th>
              <th>Main Component</th>
              <th>Detail</th>
              <th>Method</th>
              <th>Work State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>Basic Certification</td>
              <td>Must be passed to get permission </td>
              <td>E-Form/Middle Level</td>
              <td>Do the test directly in web</td>
              <td>On-Site</td>
              <td><button id="state_1">Available</button></td>
            </tr>
            <tr>
              <td>02</td>
              <td>Manual Test</td>
              <td>Same to General test but done in local </td>
              <td>File</td>
              <td>Do the test directly in file then upload</td>
              <td>In-Local</td>
              <td><button id="state_2">In Progress</button></td>
            </tr>
          </tbody>
        </table>
   
  
    `;
  document.getElementById(
    "attendance_1"
  ).innerHTML = ` <div class="gradient-bar">
              <div class="color-1"></div>
              <div class="color-2"></div>
              <div class="color-3"></div>
              <div class="color-4"></div>
              <div class="color-5"></div>
              <div class="color-6"></div>
              <div class="color-7"></div>
              <div class="color-8"></div>
              <div class="color-9"></div>
            </div>
    <div id="myChart5""> <img src="./img/chart1.svg" class="responsive-img"></div>
    `;

  // full ZingChart schema can be found here:
  // https: //www.zingchart.com/docs/api/json-configuration/
  // let chartData5 = [
  //   {
  //     id: "execdir",
  //     name: "CERT PROCESS <br> CHECK ACCESSIBILITY",
  //     parent: "",
  //     cls: "bblack",
  //   },

  //   { id: "fkn3", fake: true, name: "3", parent: "execdir" },

  //   // orange
  //   {
  //     id: "dirtran",
  //     name: "Advance<br>Deep access<br>& System Level<br>Refresh",
  //     parent: "fkn3",
  //     cls: "borange",
  //   },

  //   {
  //     id: "adminasst",
  //     name: "Administrative<br>Assistant",
  //     parent: "dirtran",
  //     sibling: "fkn4",
  //     cls: "borange",
  //   },
  //   { id: "fkn4", fake: true, name: "4", parent: "dirtran" },
  //   { id: "fkn4d", fake: true, name: "4D", parent: "dirtran", sibling: "fkn4" },

  //   {
  //     id: "progcoo1",
  //     name: "System<br>Coordinator",
  //     parent: "fkn4",
  //     cls: "borange",
  //   },
  //   {
  //     id: "transplan",
  //     name: "Functional<br>Operation",
  //     parent: "progcoo1",
  //     cls: "borange",
  //   },
  //   {
  //     id: "gistech",
  //     name: "Functional<br>Unit",
  //     parent: "progcoo1",
  //     reference: "transplan",
  //     cls: "borange",
  //   },

  //   {
  //     id: "progcoo2",
  //     name: "System<br>Coordinator",
  //     parent: "fkn4",
  //     cls: "borange",
  //   },
  //   {
  //     id: "transplan2",
  //     name: "GUI<br>Planner",
  //     parent: "progcoo2",
  //     cls: "borange",
  //   },
  //   {
  //     id: "intern",
  //     name: "UX/UI",
  //     parent: "progcoo2",
  //     reference: "transplan2",
  //     cls: "borange",
  //   },

  //   {
  //     id: "progcoo3",
  //     name: "System<br>Coordinator",
  //     parent: "fkn4",
  //     cls: "borange",
  //   },
  //   {
  //     id: "transplan3",
  //     name: "Service<br>Planner",
  //     parent: "progcoo3",
  //     cls: "borange",
  //   },
  //   {
  //     id: "transplan4",
  //     name: "Service<br>Unit",
  //     parent: "progcoo3",
  //     reference: "transplan3",
  //     cls: "borange",
  //   },

  //   // blue
  //   {
  //     id: "dirfin",
  //     name: "IQ,<br>Trial slots",
  //     parent: "fkn3",
  //     cls: "blightblue",
  //   },

  //   {
  //     id: "accasst",
  //     name: "Common User<br>Power User<br>Administrative",
  //     parent: "dirfin",
  //     sibling: "fkn6",
  //     cls: "blightblue",
  //   },
  //   { id: "fkn6", fake: true, name: "6", parent: "dirfin" },
  //   { id: "fkn6d", fake: true, name: "6D", parent: "dirfin", sibling: "fkn6" },

  //   {
  //     id: "chacc",
  //     name: "Cert_IQ<br>Optional",
  //     parent: "fkn6",
  //     cls: "blightblue",
  //   },
  //   {
  //     id: "payacc",
  //     name: "Cert_IQT<br>Optional",
  //     parent: "fkn6",
  //     reference: "chacc",
  //     cls: "blightblue",
  //   },

  //   // red
  //   {
  //     id: "dir911",
  //     name: "Security,<br>Serive Operation",
  //     parent: "fkn3",
  //     cls: "bred",
  //   },

  //   {
  //     id: "adminasst2",
  //     name: "Administrative<br>Power User",
  //     parent: "dir911",
  //     sibling: "fkn5",
  //     cls: "bred",
  //   },
  //   { id: "fkn5", fake: true, name: "5", parent: "dir911" },
  //   { id: "fkn5d", fake: true, name: "5D", parent: "dir911", sibling: "fkn5" },

  //   {
  //     id: "911sm",
  //     name: "Seca-App <br> Function",
  //     parent: "fkn5",
  //     cls: "bred",
  //   },
  //   {
  //     id: "911ss",
  //     name: "Security <br> Management",
  //     parent: "911sm",
  //     cls: "bred rshifted",
  //   },
  //   {
  //     id: "911acs",
  //     name: "Security <br> Assurance",
  //     parent: "911sm",
  //     reference: "911ss",
  //     cls: "bred rshifted",
  //   },

  //   {
  //     id: "911ipm",
  //     name: "Data-App <br> Function",
  //     parent: "fkn5",
  //     cls: "bred",
  //   },

  //   {
  //     id: "911gism",
  //     name: "Vers-App<br>Function",
  //     parent: "fkn5",
  //     cls: "bred",
  //   },
  //   {
  //     id: "911giss",
  //     name: "Internal<br>Resources",
  //     parent: "911gism",
  //     cls: "bred rshifted",
  //   },
  //   {
  //     id: "911gist",
  //     name: "External<br>Resources",
  //     parent: "911gism",
  //     reference: "911giss",
  //     cls: "bred rshifted",
  //   },

  //   {
  //     id: "facman",
  //     name: "Chat-App<br>Function",
  //     parent: "fkn5",
  //     cls: "bred",
  //   },

  //   // dark blue
  //   {
  //     id: "dirwat",
  //     name: "Active Cert<br>Accessible",
  //     parent: "fkn3",
  //     cls: "bblue",
  //   },

  //   {
  //     id: "adminasst3",
  //     name: "Common User<br>Mandatory",
  //     parent: "dirwat",
  //     sibling: "fkn7",
  //     cls: "bblue",
  //   },
  //   { id: "fkn7", fake: true, name: "7", parent: "dirwat" },
  //   { id: "fkn7d", fake: true, name: "7D", parent: "dirwat", sibling: "fkn7" },
  //   { id: "cip", name: "Basic Cert", parent: "fkn7", cls: "bblue" },

  //   // green
  //   {
  //     id: "dirpr",
  //     name: "Extra<br>Development",
  //     parent: "fkn3",
  //     cls: "bgreen",
  //   },
  //   {
  //     id: "cdbg",
  //     name: "Multi-Access",
  //     parent: "dirpr",
  //     cls: "bgreen rshifted",
  //   },
  //   {
  //     id: "clci",
  //     name: "Direct-Message",
  //     parent: "dirpr",
  //     reference: "cdbg",
  //     cls: "bgreen rshifted",
  //   },
  //   {
  //     id: "edd",
  //     name: "P2P",
  //     parent: "dirpr",
  //     reference: "cdbg",
  //     cls: "bgreen rshifted",
  //   },
  //   {
  //     id: "grde",
  //     name: "Support<br>Provider",
  //     parent: "dirpr",
  //     reference: "cdbg",
  //     cls: "bgreen rshifted",
  //   },
  // ];

  // let chartConfig5 = {
  //   type: "tree",
  //   backgroundColor: "none",
  //   options: {
  //     aspect: "tree-down",
  //     orgChart: true,
  //     packingFactor: 1,
  //     link: {
  //       lineColor: "#000",
  //     },
  //     "link[parent-911sm]": {
  //       aspect: "side-before",
  //     },
  //     "link[parent-911gism]": {
  //       aspect: "side-before",
  //     },
  //     "link[parent-dirpr]": {
  //       aspect: "side-before",
  //     },
  //     node: {
  //       height: "65px",
  //       borderColor: "#333333",
  //       borderWidth: "1px",
  //       shadow: true,
  //       shadowAlpha: 0.5,
  //       shadowDistance: "2px",
  //       label: {
  //         color: "#fff",
  //         fontSize: "10px",
  //       },
  //       hoverState: {
  //         visible: false,
  //       },
  //       tooltip: {
  //         text: "%text",
  //         bold: true,
  //       },
  //     },
  //     "node[cls-rshifted]": {
  //       offsetX: "25px",
  //     },
  //     "node[cls-lshifted]": {
  //       offsetX: "-25px",
  //     },
  //     "node[cls-bblack]": {
  //       backgroundColor: "#000",
  //       width: "120px",
  //       offsetY: "120px",
  //     },
  //     "node[cls-borange]": {
  //       backgroundColor: "#F6931D",
  //       width: "80px",
  //     },
  //     "node[cls-bred]": {
  //       backgroundColor: "#C00000",
  //       width: "80px",
  //     },
  //     "node[cls-blightblue]": {
  //       backgroundColor: "#00B9C2",
  //       width: "80px",
  //     },
  //     "node[cls-bblue]": {
  //       backgroundColor: "#00408F",
  //       width: "80px",
  //     },
  //     "node[cls-bgreen]": {
  //       backgroundColor: "#70AD47",
  //       width: "80px",
  //     },
  //   },
  //   plotarea: {
  //     margin: "10px 20x 20x 0",
  //   },
  //   series: chartData5,
  // };

  // zingchart.render({
  //   id: "myChart5",
  //   width: "100%",
  //   height: "1000px",
  //   data: chartConfig5,
  // });
});

document.getElementById("overview-btn").addEventListener("click", function () {
  document.getElementById("content").innerHTML = `
     
        <table class="table">
          <thead>
              <tr>
              <th>No</th>
              <th>Artifact</th>
              <th>Description</th>
              <th>Main Component</th>
              <th>Detail</th>
              <th>Method</th>
              <th>Work State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>Check Process</td>
              <td>Check your process before clone execution</td>
              <td>Work Statement/Cert Key</td>
              <td>E-File</td>
              <td>Automation</td>
              <td><button id="state_1">Available</button></td>
            </tr>
            <tr>
              <td>02</td>
              <td>Clone Package</td>
              <td>Download file by fetch button</td>
              <td>Your expected package</td>
              <td>Process cert</td>
              <td>Automation</td>
              <td><button id="state_2">In Progress</button></td>
            </tr>
        
          </tbody>
        </table>
    `;

  document.getElementById(
    "attendance_1"
  ).innerHTML = ` <div class="gradient-bar">
              <div class="color-1"></div>
              <div class="color-2"></div>
              <div class="color-3"></div>
              <div class="color-4"></div>
              <div class="color-5"></div>
              <div class="color-6"></div>
              <div class="color-7"></div>
              <div class="color-8"></div>
              <div class="color-9"></div>
            </div>
       <figure>
        <ul class="tree">
          <li>
            <span>Package Process</span>
            <ul>
              <li>
                <span>Check process</span>
                <ul>
                  <li>
                    <span>Cert Key</span>
                    <ul>
                      <li><span>Accessible</span></li>
                    </ul>
                  </li>
                  <li>
                    <span>Item Type</span>
                    <ul>
                      <li><span>Common Subject</span></li>
                      <li><span>Technical Project</span></li>
                      <li><span>References</span></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <span>Clone package</span>
                <ul>
                  <li>
                    <span>Trace Report</span>
                    <ul>
                      <li><span>Order form</span></li>
                    </ul>
                  </li>
                  <li>
                    <span>Fetch Item</span>
                    <ul>
                      <li><span>Click</span></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <span>Exception</span>
                <ul>
                  <li>
                    <span>System Refreshment</span>
                    <ul>
                      <li><span>Retry - Logout</span></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </figure>`;
});
// .............................................................................................................................
document.getElementById("feed-btn").addEventListener("click", function () {
  document.getElementById("content").innerHTML = `
     
        <table class="table">
          <thead>
              <tr>
              <th>No</th>
              <th>Artifact</th>
              <th>Description</th>
              <th>Main Component</th>
              <th>Detail</th>
              <th>Method</th>
              <th>Work State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>Raise Question/Request</td>
              <td>Leave comment for your request or concern</td>
              <td>E-Form</td>
              <td>FIF (Fill In Form)</td>
              <td>Manual</td>
              <td><button id="state_1">Available</button></td>
            </tr>
            <tr>
              <td>02</td>
              <td>Raise Issue</td>
              <td>Leave comment for your issue/report the system problem</td>
              <td>E-Form</td>
              <td>FIF</td>
              <td>Manual</td>
              <td><button id="state_2">In Progress</button></td>
            </tr>
        
          </tbody>
        </table>
    
      
    `;
  document.getElementById(
    "attendance_1"
  ).innerHTML = ` <div class="gradient-bar">
              <div class="color-1"></div>
              <div class="color-2"></div>
              <div class="color-3"></div>
              <div class="color-4"></div>
              <div class="color-5"></div>
              <div class="color-6"></div>
              <div class="color-7"></div>
              <div class="color-8"></div>
              <div class="color-9"></div>
            </div>

    <figure>
        <ul class="tree">
          <li>
            <span>Feedback Process</span>
            <ul>
              <li>
                <span>Leave Quest</span>
                <ul>
                  <li>
                    <span>Raw Quest</span>
                    <ul>
                      <li><span>FIF</span></li>
                    </ul>
                  </li>
                  <li>
                    <span>Attached Quest</span>
                    <ul>
                      <li><span>FIF - Image</span></li>
                      <li><span>FIF - Document</span></li>
                      <li><span>FIF - Supported File</span></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <span>Leave Issue</span>
                <ul>
                  <li>
                    <span>Support Information</span>
                    <ul>
                      <li><span>FIF</span></li>
                    </ul>
                  </li>
                  <li>
                    <span>Mismatch Detection</span>
                    <ul>
                      <li><span>FIF</span></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <span>Leave Rate</span>
                <ul>
                  <li>
                    <span>Raise Comment - Vote</span>
                    <ul>
                      <li><span>FIF</span></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </figure>`;
});

// .............................................................................
document.getElementById("forum-btn").addEventListener("click", function () {
  document.getElementById("content").innerHTML = `
     
        <table class="table">
          <thead>
              <tr>
              <th>No</th>
              <th>Artifact</th>
              <th>Description</th>
              <th>Main Component</th>
              <th>Detail</th>
              <th>Method</th>
              <th>Work State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>To be updated!</td>
              <td>Leave comment for your request or concern</td>
              <td>E-Form</td>
              <td>FIF (Fill In Form)</td>
              <td>Manual</td>
              <td><button id="state_1">Available</button></td>
            </tr>
            <tr>
              <td>02</td>
              <td>Raise Issue</td>
              <td>Leave comment for your issue/report the system problem</td>
              <td>E-Form</td>
              <td>FIF</td>
              <td>Manual</td>
              <td><button id="state_2">In Progress</button></td>
            </tr>
        
          </tbody>
        </table>
    
      
    `;
  document.getElementById(
    "attendance_1"
  ).innerHTML = ` <div class="gradient-bar">
              <div class="color-1"></div>
              <div class="color-2"></div>
              <div class="color-3"></div>
              <div class="color-4"></div>
              <div class="color-5"></div>
              <div class="color-6"></div>
              <div class="color-7"></div>
              <div class="color-8"></div>
              <div class="color-9"></div>
            </div>
       <div id="wordcloud"></div>`;

  const words = [
    ["you", 50],
    ["Force", 30],
    ["Jedi", 25],
    ["Luke", 20],
    ["dark", 20],
    ["not", 20],
    ["will", 18],
    ["your", 17],
    ["of", 16],
    ["have", 15],
    ["destiny", 14],
    ["fear", 13],
    ["anger", 12],
    ["train", 12],
    ["aggression", 11],
    ["attack", 10],
    ["power", 9],
    ["peace", 8],
    ["wisdom", 8],
    ["knowledge", 7],
    ["you", 50],
    ["Force", 30],
    ["Jedi", 25],
    ["Luke", 20],
    ["dark", 20],
    ["not", 20],
    ["will", 18],
    ["your", 17],
    ["of", 16],
    ["have", 15],
    ["destiny", 14],
    ["fear", 13],
    ["anger", 12],
    ["train", 12],
    ["aggression", 11],
    ["attack", 10],
    ["power", 9],
    ["peace", 8],
    ["wisdom", 8],
    ["knowledge", 7],
    ["you", 50],
    ["Force", 30],
    ["Jedi", 25],
    ["Luke", 20],
    ["dark", 20],
    ["not", 20],
    ["will", 18],
    ["your", 17],
    ["of", 16],
    ["have", 15],
    ["destiny", 14],
    ["fear", 13],
    ["anger", 12],
    ["train", 12],
    ["aggression", 11],
    ["attack", 10],
    ["power", 9],
    ["peace", 8],
    ["wisdom", 8],
    ["knowledge", 7],
    ["you", 50],
    ["Force", 30],
    ["Jedi", 25],
    ["Luke", 20],
    ["dark", 20],
    ["not", 20],
    ["will", 18],
    ["your", 17],
    ["of", 16],
    ["have", 15],
    ["destiny", 14],
    ["fear", 13],
    ["anger", 12],
    ["train", 12],
    ["aggression", 11],
    ["attack", 10],
    ["power", 9],
    ["peace", 8],
    ["wisdom", 8],
    ["knowledge", 7],
  ];

  WordCloud(document.getElementById("wordcloud"), {
    list: words,
    gridSize: 10,
    weightFactor: 1.5,
    fontFamily: "Arial, sans-serif",
    color: function () {
      return "hsl(" + Math.random() * 360 + ", 100%, 50%)";
    },
    backgroundColor: "#fff",
  });
});
// Function to handle multiple file downloads
function handleFilesDownload() {
  // List of file names to download
  var fileNames = ["Requirement.docx", "SDK.pptx"];

  var folderPath = "Requirement"; // Path to the folder
  var storage = firebase.storage();
  var storageRef = storage.ref();

  fileNames.forEach(function (fileName) {
    var fileRef = storageRef.child(folderPath).child(fileName); // Set path to each file

    fileRef
      .getDownloadURL()
      .then(function (url) {
        // Create a link element to initiate download
        var link = document.createElement("a");
        link.href = url;
        link.download = fileName; // Suggest filename for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(function (error) {
        // Handle errors
        console.error("Download error for " + fileName + ":", error);
        alert("Error downloading file: " + error.message);
      });
  });
}

// Set up event listener for FETCH BUTTON
document
  .getElementById("fetch-btn")
  .addEventListener("click", handleFilesDownload);

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
