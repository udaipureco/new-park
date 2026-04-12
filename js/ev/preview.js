// ================= LOAD PAGE =================
document.addEventListener("DOMContentLoaded", function(){

  document.body.style.opacity = "0";

  try{

    // 🔥 DIRECT ACCESS BLOCK
    if(sessionStorage.getItem("evFlow") !== "active"){
      window.location.replace("booking.html");
      return;
    }

    // 🔥 GET DATA
    let raw = localStorage.getItem("evData");

    if(!raw){
      window.location.replace("booking.html");
      return;
    }

    let data = JSON.parse(raw);

    if(!data || typeof data !== "object"){
      window.location.replace("booking.html");
      return;
    }

    // ================= DATE =================
    let dateBox = document.getElementById("dateBox");
    if(dateBox){
      dateBox.innerText = data.date || "--";
    }

    // ================= TICKET =================
    let ticketBox = document.getElementById("ticketDetails");

    if(ticketBox){

      let html = "";

      if(data.ev > 0){
        html += `
          <div class="info">
            <span>EV Cart (${data.ev})</span>
            <span style="float:right;font-weight:700;">
              ₹${data.total}
            </span>
          </div>
        `;
      }

      if(html === ""){
        html = `<div class="info">No EV selected</div>`;
      }

      ticketBox.innerHTML = html;
    }

    // ================= TOTAL =================
    let totalBox = document.getElementById("totalAmount");
    if(totalBox){
      totalBox.innerText = "TOTAL ₹" + (data.total || 0);
    }

    // ================= USER =================
    document.getElementById("name").innerText = "👤 Name: " + (data.name || "--");
    document.getElementById("mobile").innerText = "📱 Mobile: " + (data.mobile || "--");
    document.getElementById("gmail").innerText = "📧 Gmail: " + (data.gmail || "--");

    // 🔥 FLOW SAVE
    sessionStorage.setItem("evPreview", "done");

    // 🔥 SHOW PAGE
    setTimeout(()=>{
      document.body.style.opacity = "1";
    },100);

  }catch(err){

    console.log("Preview Error:", err);
    window.location.replace("booking.html");
  }

});


// ================= HOME =================
function goHome(){

  // 🔥 FULL RESET
  sessionStorage.clear();
  localStorage.removeItem("evData");

  window.location.replace("../../index.html");
}


// ================= BACK =================
function goBack(){

  sessionStorage.setItem("fromPreview", "true");

  window.location.href = "booking.html";
}


// ================= PAYMENT =================
function goPayment(){

  let check = document.getElementById("agree");

  if(!check || !check.checked){
    alert("⚠️ Please accept Terms & Conditions");
    return;
  }

  // 🔥 FLOW CHECK FIX
  if(sessionStorage.getItem("evPreview") !== "done"){
    alert("Session expired, please book again");
    window.location.replace("booking.html");
    return;
  }

  // 🔥 NEXT FLOW
  sessionStorage.setItem("evPayment", "active");

  window.location.href = "payment.html";
}