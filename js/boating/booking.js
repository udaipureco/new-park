// ================= FLOW CONTROL =================

// ❌ direct access block (after success)
if(sessionStorage.getItem("boatingDone") === "true"){
  window.location.replace("../../index.html");
}

// 🔥 reset flow
sessionStorage.removeItem("boatingPreviewDone");
sessionStorage.removeItem("boatingPaymentDone");
sessionStorage.removeItem("boatingDone");

// 🔥 start flow
sessionStorage.setItem("boatingFlow", "active");


// ================= PRICE =================
let prices = {
  motor: 100,
  shikara: 100,
  paddle: 50
};


// ================= CHANGE QTY =================
function changeQty(type, value){
  let el = document.getElementById(type);
  let count = parseInt(el.value) || 0;

  count += value;
  if(count < 0) count = 0;

  el.value = count;

  updateTotal();
}


// ================= TOTAL =================
function updateTotal(){

  let motor = parseInt(document.getElementById("motor").value) || 0;
  let shikara = parseInt(document.getElementById("shikara").value) || 0;
  let paddle = parseInt(document.getElementById("paddle").value) || 0;

  let total =
    (motor * prices.motor) +
    (shikara * prices.shikara) +
    (paddle * prices.paddle);

  let html = "";

  if(motor > 0){
    html += `<div>Motor (${motor}) - ₹${motor * prices.motor}</div>`;
  }

  if(shikara > 0){
    html += `<div>Shikara (${shikara}) - ₹${shikara * prices.shikara}</div>`;
  }

  if(paddle > 0){
    html += `<div>Paddle (${paddle}) - ₹${paddle * prices.paddle}</div>`;
  }

  if(html === ""){
    html = "<div>No boats selected</div>";
  }

  document.getElementById("summaryBox").innerHTML = html;
  document.getElementById("totalAmount").innerText = "TOTAL ₹" + total;
}


// ================= HOME =================
function goHome(){
  sessionStorage.clear();
  localStorage.removeItem("boatingData");
  window.location.replace("../../index.html");
}


// ================= NEXT =================
function nextStep(){

  let name = document.getElementById("name").value.trim();
  let mobile = document.getElementById("mobile").value.trim();
  let gmail = document.getElementById("gmail").value.trim();

  let motor = parseInt(document.getElementById("motor").value) || 0;
  let shikara = parseInt(document.getElementById("shikara").value) || 0;
  let paddle = parseInt(document.getElementById("paddle").value) || 0;

  let total =
    (motor * prices.motor) +
    (shikara * prices.shikara) +
    (paddle * prices.paddle);

  // ❌ validation
  if(motor === 0 && shikara === 0 && paddle === 0){
    alert("Select at least 1 boat");
    return;
  }

  if(!name || !mobile || !gmail){
    alert("Fill all details");
    return;
  }

  if(mobile.length !== 10){
    alert("Enter valid mobile number");
    return;
  }

  if(!gmail.includes("@")){
    alert("Enter valid Gmail");
    return;
  }

  // ✅ SAVE DATA
  let boatingData = {
    name,
    mobile,
    gmail,
    motor,
    shikara,
    paddle,
    total
  };

  localStorage.setItem("boatingData", JSON.stringify(boatingData));

  // 🔥 flow flag
  sessionStorage.setItem("boatingFlow", "active");
  sessionStorage.setItem("fromBoatingPreview", "true");

  // 🚀 redirect
  window.location.replace("preview.html");
}


// ================= INIT =================
document.addEventListener("DOMContentLoaded", function(){

  // 🔥 new visit vs back fix
  let fromPreview = sessionStorage.getItem("fromBoatingPreview");

  if(!fromPreview){
    localStorage.removeItem("boatingData");
  }

  sessionStorage.removeItem("fromBoatingPreview");


  // ================= INPUT EVENTS =================
  let motorInput = document.getElementById("motor");
  let shikaraInput = document.getElementById("shikara");
  let paddleInput = document.getElementById("paddle");

  if(motorInput && shikaraInput && paddleInput){
    motorInput.addEventListener("input", updateTotal);
    shikaraInput.addEventListener("input", updateTotal);
    paddleInput.addEventListener("input", updateTotal);
  }


  // ================= AUTOFILL =================
  let data = JSON.parse(localStorage.getItem("boatingData"));

  if(data){
    document.getElementById("name").value = data.name || "";
    document.getElementById("mobile").value = data.mobile || "";
    document.getElementById("gmail").value = data.gmail || "";

    document.getElementById("motor").value = data.motor || 0;
    document.getElementById("shikara").value = data.shikara || 0;
    document.getElementById("paddle").value = data.paddle || 0;
  }


  updateTotal();


  // ================= DATE =================
  const dateInput = document.getElementById("date");

  if(dateInput){
    let now = new Date();

    let dd = String(now.getDate()).padStart(2,'0');
    let mm = String(now.getMonth()+1).padStart(2,'0');
    let yyyy = now.getFullYear();

    dateInput.value = `${dd}-${mm}-${yyyy}`;
  }


  // ================= SMOOTH SCROLL FIX =================
  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("focus", function(){

      setTimeout(() => {
        this.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 300);

    });
  });

});