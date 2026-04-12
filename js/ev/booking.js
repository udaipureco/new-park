// ================= PRICE =================
let price = 20;


// ================= QTY =================
function changeQty(value){
  let el = document.getElementById("ev");
  let count = parseInt(el.value) || 0;

  count += value;
  if(count < 0) count = 0;

  el.value = count;

  updateTotal();
}


// ================= TOTAL =================
function updateTotal(){

  let ev = parseInt(document.getElementById("ev").value) || 0;

  let total = ev * price;

  let html = ev > 0 
    ? `<div>EV Cart (${ev}) - ₹${total}</div>` 
    : "No EV selected";

  let summary = document.getElementById("summary");
  let totalBox = document.getElementById("total");

  if(summary) summary.innerHTML = html;
  if(totalBox) totalBox.innerText = "TOTAL ₹" + total;
}


// ================= HOME =================
function goHome(){

  // 🔥 FULL RESET
  sessionStorage.clear();
  localStorage.removeItem("evData");

  window.location.replace("../../index.html");
}


// ================= NEXT =================
function nextStep(){

  let name = document.getElementById("name").value.trim();
  let mobile = document.getElementById("mobile").value.trim();
  let gmail = document.getElementById("gmail").value.trim();

  let ev = parseInt(document.getElementById("ev").value) || 0;

  let total = ev * price;

  let date = document.getElementById("date")?.value || "";

  // ❌ validation
  if(ev === 0){
    alert("Select at least 1 EV Cart");
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

  // ✅ FINAL DATA OBJECT
  let bookingData = {
    name,
    mobile,
    gmail,
    ev,
    total,
    date,
    time: new Date().toLocaleString()
  };

  console.log("SAVING DATA:", bookingData); // 🔥 DEBUG

  // 💾 SAVE
  localStorage.setItem("evData", JSON.stringify(bookingData));

  // 🔥 FLOW CONTROL
  sessionStorage.setItem("evFlow", "active");
  sessionStorage.setItem("fromBooking", "true");

  // 🚀 REDIRECT
  window.location.href = "preview.html";
}


// ================= INIT =================
document.addEventListener("DOMContentLoaded", function(){

  console.log("BOOKING PAGE LOADED");

  // 🔥 FLOW PROTECTION
  if(sessionStorage.getItem("evFlow") === "completed");
  

  // ================= DATE =================
  let dateInput = document.getElementById("date");

  if(dateInput){
    let now = new Date();

    let dd = String(now.getDate()).padStart(2,'0');
    let mm = String(now.getMonth()+1).padStart(2,'0');
    let yyyy = now.getFullYear();

    dateInput.value = `${dd}-${mm}-${yyyy}`;
  }

  // ================= AUTO FILL =================
  try{
    let raw = localStorage.getItem("evData");

    if(raw){
      let data = JSON.parse(raw);

      console.log("AUTO FILL DATA:", data);

      if(document.getElementById("name"))
        document.getElementById("name").value = data.name || "";

      if(document.getElementById("mobile"))
        document.getElementById("mobile").value = data.mobile || "";

      if(document.getElementById("gmail"))
        document.getElementById("gmail").value = data.gmail || "";

      if(document.getElementById("ev"))
        document.getElementById("ev").value = data.ev || 0;
    }
  }catch(e){
    console.log("AUTO FILL ERROR:", e);
  }

  // ================= UPDATE UI =================
  updateTotal();

  // ================= SMOOTH SCROLL =================
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