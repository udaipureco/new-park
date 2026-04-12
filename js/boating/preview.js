// ❌ direct access block
if(sessionStorage.getItem("boatingFlow") !== "active"){
  window.location.replace("../../index.html");
}

document.addEventListener("DOMContentLoaded", function(){

  let raw = localStorage.getItem("boatingData");

  if(!raw){
    window.location.replace("booking.html");
    return;
  }

  let data = JSON.parse(raw);

  // ================= DATE =================
  let now = new Date();
  let dd = String(now.getDate()).padStart(2,'0');
  let mm = String(now.getMonth()+1).padStart(2,'0');
  let yyyy = now.getFullYear();

  document.getElementById("visitDate").innerText = `${dd}-${mm}-${yyyy}`;

  // ================= TICKET =================
  let html = "";

  if(data.motor > 0){
    html += `<div><span>Motor (${data.motor})</span><span>₹${data.motor * 100}</span></div>`;
  }

  if(data.shikara > 0){
    html += `<div><span>Shikara (${data.shikara})</span><span>₹${data.shikara * 100}</span></div>`;
  }

  if(data.paddle > 0){
    html += `<div><span>Paddle (${data.paddle})</span><span>₹${data.paddle * 50}</span></div>`;
  }

  document.getElementById("ticketBox").innerHTML = html;
  document.getElementById("totalAmount").innerText = "TOTAL ₹" + data.total;

  // ================= USER =================
  document.getElementById("nameBox").innerText = "Name: " + data.name;
  document.getElementById("mobileBox").innerText = "Mobile: " + data.mobile;
  document.getElementById("gmailBox").innerText = "Gmail: " + data.gmail;

});


// 🔙 BACK
function goBack(){
  sessionStorage.setItem("fromBoatingPreview", "true");
  window.location.replace("booking.html");
}

// 💳 PAYMENT
function goPayment(){

  let agree = document.getElementById("agree");

  if(!agree.checked){
    alert("Please accept Terms & Conditions");
    return;
  }

  sessionStorage.setItem("boatingPreviewDone", "true");

  window.location.replace("payment.html");
}