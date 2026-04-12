// ❌ BLOCK DIRECT ACCESS
if(
  sessionStorage.getItem("bookingFlow") !== "active" ||
  !localStorage.getItem("bookingData")
){
  window.location.replace("../../index.html");
}

// ✅ MARK STEP DONE
sessionStorage.setItem("previewDone", "true");

document.addEventListener("DOMContentLoaded", function(){

  let data = JSON.parse(localStorage.getItem("bookingData"));

  let html = "";

  if(data.adult > 0){
    html += `<div>Adult (${data.adult})</div>`;
  }

  if(data.child > 0){
    html += `<div>Child (${data.child})</div>`;
  }

  document.getElementById("summary").innerHTML = html;
  document.getElementById("total").innerText = "₹" + data.total;
});

// NEXT
function goPayment(){
  window.location.replace("payment.html");
}

// BACK
function goBack(){
  window.location.replace("booking.html");
}

// ================= PAGE LOAD =================
document.addEventListener("DOMContentLoaded", function(){

  try {

    let raw = localStorage.getItem("bookingData");

    // ❌ no data → redirect
    if(!raw){
      window.location.replace("booking.html");
      return;
    }

    let data = JSON.parse(raw);

    // 🎫 Ticket HTML
    let ticketHTML = "";

    if(data.adult > 0){
      ticketHTML += `
        <div>
          <span>Adult (${data.adult})</span>
          <span>₹${data.adult * 10}</span>
        </div>
      `;
    }

    if(data.child > 0){
      ticketHTML += `
        <div>
          <span>Child (${data.child})</span>
          <span>₹${data.child * 5}</span>
        </div>
      `;
    }

    if(ticketHTML === ""){
      ticketHTML = "<div>No tickets selected</div>";
    }

    // UI update
    document.getElementById("ticketDetails").innerHTML = ticketHTML;

    document.getElementById("totalAmount").innerText =
      "TOTAL ₹" + (data.total || 0);

    document.getElementById("name").innerText =
      "Name: " + (data.name || "-");

    document.getElementById("mobile").innerText =
      "Mobile: " + (data.mobile || "-");

    document.getElementById("gmail").innerText =
      "Gmail: " + (data.gmail || "-");

  } catch (err) {
    console.error("Preview Load Error:", err);
    window.location.replace("booking.html");
  }

});


// ================= BACK =================
function goBack(){
  window.location.replace("booking.html");
}


// ================= PAYMENT =================
function confirmBooking(){

  let check = document.getElementById("terms");

  if(!check.checked){
    alert("Please accept Terms & Conditions");
    return;
  }

  let raw = localStorage.getItem("bookingData");

  if(!raw){
    window.location.replace("booking.html");
    return;
  }

  let data;

  try {
    data = JSON.parse(raw);
  } catch {
    window.location.replace("booking.html");
    return;
  }

  // ❌ invalid total
  if((data.total || 0) <= 0){
    alert("Invalid booking");
    return;
  }

  // ✅ GO TO PAYMENT PAGE
  window.location.href = "payment.html";
}