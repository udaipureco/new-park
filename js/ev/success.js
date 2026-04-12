// 🔥 FLOW PROTECTION (MOST IMPORTANT)
if(sessionStorage.getItem("evDone") !== "true"){
  alert("Invalid access ❌");
  window.location.replace("booking.html");
}

document.addEventListener("DOMContentLoaded", function(){

  console.log("SUCCESS PAGE LOADED");

  // 🔥 CHECK ALL STORAGE
  console.log("bookingData:", localStorage.getItem("bookingData"));
  console.log("boatData:", localStorage.getItem("boatData"));
  console.log("evData:", localStorage.getItem("evData"));

  // 🔥 PRIORITY LOAD
  let rawData = localStorage.getItem("evData");

  if(!rawData){
    alert("❌ Data missing! Booking dubara karo");
    return; // ❌ redirect hata diya debug ke liye
  }

  let data;

  try{
    data = JSON.parse(rawData);
  }catch(e){
    console.log("JSON ERROR:", e);
    alert("Data corrupted");
    return;
  }

  console.log("FINAL DATA:", data);

  // ================= DATE =================
  document.getElementById("date").innerText = data.date || "--";

  // ================= BOOKING ID =================
  let bookingId = localStorage.getItem("bookingId");

  if(!bookingId){
    bookingId = "UWS" + Date.now();
    localStorage.setItem("bookingId", bookingId);
  }

  document.getElementById("bookingId").innerText = bookingId;

  // ================= USER =================
  document.getElementById("name").innerText = data.name || "--";
  document.getElementById("mobile").innerText = data.mobile || "--";

  // ================= TICKET =================
  let html = "";

  if(data.ev > 0){
    html += `
      <div class="row">
        <span>EV Cart (${data.ev})</span>
        <span>₹${data.total}</span>
      </div>
    `;
  }

  if(html === ""){
    html = `<div class="row"><span>No ticket found</span></div>`;
  }

  document.getElementById("ticketList").innerHTML = html;

  // ================= TOTAL =================
  document.getElementById("total").innerText = "TOTAL ₹" + (data.total || 0);

});