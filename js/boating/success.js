// ❌ direct access block
if(sessionStorage.getItem("boatingDone") !== "true"){
  window.location.replace("../../index.html");
}

// 🔥 HARD BACK BLOCK
history.pushState(null, null, location.href);
window.onpopstate = function () {
  window.location.replace("../../index.html");
};

document.addEventListener("DOMContentLoaded", function(){

  let data = JSON.parse(localStorage.getItem("boatingData"));

  if(!data){
    window.location.replace("booking.html");
    return;
  }

  // 📅 DATE
  let now = new Date();
  let dd = String(now.getDate()).padStart(2,'0');
  let mm = String(now.getMonth()+1).padStart(2,'0');
  let yyyy = now.getFullYear();

  document.getElementById("date").innerText = `${dd}-${mm}-${yyyy}`;

  // 🆔 BOOKING ID (UNIQUE)
  let bookingId = "UWS" + Date.now();
  document.getElementById("bookingId").innerText = bookingId;

  // 🎫 DETAILS
  let html = "";

  if(data.motor > 0){
    html += `<div><span>Motor (${data.motor})</span><span>₹${data.motor*100}</span></div>`;
  }

  if(data.shikara > 0){
    html += `<div><span>Shikara (${data.shikara})</span><span>₹${data.shikara*100}</span></div>`;
  }

  if(data.paddle > 0){
    html += `<div><span>Paddle (${data.paddle})</span><span>₹${data.paddle*50}</span></div>`;
  }

  document.getElementById("details").innerHTML = html;

  // 💰 TOTAL
  document.getElementById("total").innerText = "TOTAL ₹" + data.total;

  // 👤 USER
  document.getElementById("name").innerText = data.name;
  document.getElementById("mobile").innerText = data.mobile;

});


// 🏠 HOME RESET
function goHome(){
  sessionStorage.clear();
  localStorage.removeItem("boatingData");
  window.location.replace("../../index.html");
}


// 📄 DOWNLOAD PDF (PERFECT FIT)
async function downloadPDF(){

  let ticket = document.getElementById("ticket");

  const canvas = await html2canvas(ticket, {scale:2});
  const img = canvas.toDataURL("image/png");

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p","mm","a4");

  let width = pdf.internal.pageSize.getWidth();
  let height = (canvas.height * width) / canvas.width;

  pdf.addImage(img, "PNG", 0, 10, width, height);
  pdf.save("UWS_Ticket.pdf");
}