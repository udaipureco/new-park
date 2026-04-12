// ❌ BLOCK DIRECT ACCESS
if(
  sessionStorage.getItem("bookingFlow") !== "active" ||
  sessionStorage.getItem("paymentDone") !== "true"
){
  window.location.replace("../../index.html");
}

// ✅ FINAL DONE
sessionStorage.setItem("bookingDone", "true");

// 🔥 BLOCK BACK BUTTON
history.pushState(null, null, location.href);
window.onpopstate = function () {
  history.go(1);
};

// HOME RESET
function goHome(){
  sessionStorage.clear();
  localStorage.clear();
  window.location.replace("../../index.html");
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", function(){

  try{

    let raw = localStorage.getItem("bookingData");

    if(!raw){
      console.log("No data found");
      return;
    }

    let data = JSON.parse(raw);

    if(!data){
      console.log("Invalid data");
      return;
    }

    // ================= BOOKING ID =================
    let bookingId = localStorage.getItem("bookingId");

    if(!bookingId){
      bookingId = "UWS-" + Math.floor(100000 + Math.random() * 900000);
      localStorage.setItem("bookingId", bookingId);
    }

    // 🔥 ALWAYS generate barcode
    generateBarcode(bookingId);

    // ================= SET DATA =================
    setText("bookingId", bookingId);
    setText("name", "Name: " + safe(data.name));
    setText("mobile", "Mobile: " + safe(data.mobile));
    setText("gmail", "Gmail: " + safe(data.gmail));

    setText("adult", "Adult: " + (data.adult || 0));
    setText("child", "Child: " + (data.child || 0));
    setText("total", "TOTAL ₹" + (data.total || 0));

    let now = new Date();
    setText("date", "Date: " + formatDate(now));

  }catch(e){
    console.log("Error:", e);
  }

});


// ================= BARCODE =================
function generateBarcode(id){

  let el = document.getElementById("barcode");

  if(!el) return;

  JsBarcode(el, id, {
    format: "CODE128",
    lineColor: "#000",
    width: 2,
    height: 60,
    displayValue: true
  });
}


// ================= HELPERS =================
function setText(id, value){
  let el = document.getElementById(id);
  if(el) el.innerText = value;
}

function safe(val){
  return val ? val : "-";
}

function formatDate(date){
  return date.toLocaleString("en-IN", {
    day:"2-digit",
    month:"short",
    year:"numeric",
    hour:"2-digit",
    minute:"2-digit"
  });
}


// ================= PDF =================
function downloadPDF(){

  const { jsPDF } = window.jspdf;

  let ticket = document.getElementById("ticket");

  html2canvas(ticket, {
    scale: 2, // 🔥 reduce size (3 → 2)
    useCORS: true
  }).then(canvas => {

    let img = canvas.toDataURL("image/jpeg", 0.8); // 🔥 compress

    let pdf = new jsPDF("p","mm","a4");

    let pageWidth = pdf.internal.pageSize.getWidth();
    let pageHeight = pdf.internal.pageSize.getHeight();

    // 🔥 FULL A4 FIT CALCULATION
    let imgWidth = pageWidth - 20; // margin
    let imgHeight = (canvas.height * imgWidth) / canvas.width;

    // 🔥 CENTER + FIT
    if(imgHeight > pageHeight - 20){
      imgHeight = pageHeight - 20;
      imgWidth = (canvas.width * imgHeight) / canvas.height;
    }

    let x = (pageWidth - imgWidth) / 2;
    let y = 10;

    pdf.addImage(img, 'JPEG', x, y, imgWidth, imgHeight);

    pdf.save("UWS_Ticket.pdf");

  });

}


// ================= HOME =================
function goHome(){
  localStorage.removeItem("bookingData");
  localStorage.removeItem("bookingId");
  window.location.href = "../../index.html";
}