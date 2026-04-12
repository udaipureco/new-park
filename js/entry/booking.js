// ❌ block after success
if(sessionStorage.getItem("bookingDone") === "true"){
  window.location.replace("../../index.html");
}

// 🔥 RESET FLOW
sessionStorage.removeItem("previewDone");
sessionStorage.removeItem("paymentDone");
sessionStorage.removeItem("bookingDone");

// 🔥 START FLOW
sessionStorage.setItem("bookingFlow", "active");

// ================= PRICE =================
let prices = {
  adult: 10,
  child: 5
};

// ================= QTY =================
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

  let adult = parseInt(document.getElementById("adult").value) || 0;
  let child = parseInt(document.getElementById("child").value) || 0;

  let total = (adult * prices.adult) + (child * prices.child);

  let summaryHTML = "";

  if(adult > 0){
    summaryHTML += `<div><span>Adult (${adult})</span><span>₹${adult * prices.adult}</span></div>`;
  }

  if(child > 0){
    summaryHTML += `<div><span>Child (${child})</span><span>₹${child * prices.child}</span></div>`;
  }

  if(summaryHTML === ""){
    summaryHTML = "<div>No tickets selected</div>";
  }

  document.getElementById("summary").innerHTML = summaryHTML;
  document.querySelector(".final-total").innerText = "TOTAL ₹" + total;
}

// ================= HOME =================
function goHome(){
  sessionStorage.clear();
  localStorage.clear();
  window.location.replace("../../index.html");
}

// ================= NEXT =================
function nextStep(){

  let name = document.getElementById("name").value.trim();
  let mobile = document.getElementById("mobile").value.trim();
  let gmail = document.getElementById("gmail").value.trim();

  let adult = parseInt(document.getElementById("adult").value) || 0;
  let child = parseInt(document.getElementById("child").value) || 0;

  let total = (adult * 10) + (child * 5);

  // ❌ validation
  if(adult === 0 && child === 0){
    alert("Select at least 1 ticket");
    return;
  }

  if(!name || !mobile || !gmail){
    alert("Please fill all details");
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
  let bookingData = { name, mobile, gmail, adult, child, total };
  localStorage.setItem("bookingData", JSON.stringify(bookingData));

  // 🔥 FLOW FLAG
  sessionStorage.setItem("bookingFlow", "active");
  sessionStorage.setItem("fromPreview", "true");

  window.location.replace("preview.html");
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", function(){

  // 🔥 FLOW FIX
  let fromPreview = sessionStorage.getItem("fromPreview");

  if(!fromPreview){
    localStorage.removeItem("bookingData");
  }

  sessionStorage.removeItem("fromPreview");

  // ================= INPUT EVENTS =================
  let adultInput = document.getElementById("adult");
  let childInput = document.getElementById("child");

  if(adultInput && childInput){
    adultInput.addEventListener("input", updateTotal);
    childInput.addEventListener("input", updateTotal);
  }

  // ================= AUTOFILL =================
  let data = JSON.parse(localStorage.getItem("bookingData"));

  if(data){
    document.getElementById("name").value = data.name || "";
    document.getElementById("mobile").value = data.mobile || "";
    document.getElementById("gmail").value = data.gmail || "";
    document.getElementById("adult").value = data.adult || 0;
    document.getElementById("child").value = data.child || 0;
  }

  updateTotal();

  // ================= DATE SYSTEM =================
  const dateInput = document.getElementById("date");
  let nextBtn = document.querySelector(".bottom button:last-child");

  if(dateInput){
    let now = new Date();

    let dd = String(now.getDate()).padStart(2,'0');
    let mm = String(now.getMonth()+1).padStart(2,'0');
    let yyyy = now.getFullYear();

    dateInput.value = `${dd}-${mm}-${yyyy}`;
  }

  // ✅ BOOKING ALWAYS OPEN
  if(nextBtn){
    nextBtn.disabled = false;
    nextBtn.innerText = "NEXT ▶";
  }

});