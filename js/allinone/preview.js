// ================= BLOCK DIRECT ACCESS =================
if(
  sessionStorage.getItem("allBookingFlow") !== "active" ||
  !localStorage.getItem("allBookingData")
){
  window.location.replace("../../index.html");
}

// ================= MARK STEP =================
sessionStorage.setItem("allPreviewDone", "true");


// ================= HELPERS =================
function row(label, price){
  return '<div class="info-row"><span>' + label + '</span><span>\u20B9' + price + '</span></div>';
}


// ================= LOAD =================
document.addEventListener("DOMContentLoaded", function(){

  try{
    var raw = localStorage.getItem("allBookingData");
    if(!raw){ window.location.replace("booking.html"); return; }

    var d = JSON.parse(raw);

    // DATE
    var dateEl = document.getElementById("dateText");
    if(dateEl) dateEl.innerText = d.date || "--";

    // ENTRY
    var entryEl = document.getElementById("entryDetails");
    var entryHTML = "";
    if(d.adult > 0) entryHTML += row("Adult (" + d.adult + ")", d.adult * 10);
    if(d.child > 0) entryHTML += row("Child (" + d.child + ")", d.child * 5);
    if(entryEl) entryEl.innerHTML = entryHTML || '<p class="no-items">None selected</p>';

    // BOATING
    var boatEl = document.getElementById("boatingDetails");
    var boatHTML = "";
    if(d.motor   > 0) boatHTML += row("Motor Boat ("   + d.motor   + ")", d.motor   * 100);
    if(d.shikara > 0) boatHTML += row("Shikara Boat (" + d.shikara + ")", d.shikara * 100);
    if(d.paddle  > 0) boatHTML += row("Paddle Boat ("  + d.paddle  + ")", d.paddle  * 50);
    if(boatEl) boatEl.innerHTML = boatHTML || '<p class="no-items">None selected</p>';

    // EV
    var evEl = document.getElementById("evDetails");
    var evHTML = "";
    if(d.ev > 0) evHTML += row("EV Cart Ride (" + d.ev + ")", d.ev * 20);
    if(evEl) evEl.innerHTML = evHTML || '<p class="no-items">None selected</p>';

    // TOTAL
    var totalBar = document.getElementById("totalBar");
    if(totalBar) totalBar.innerText = "TOTAL: \u20B9" + (d.total || 0);

    // VISITOR
    var nameEl   = document.getElementById("nameText");
    var mobileEl = document.getElementById("mobileText");
    var gmailEl  = document.getElementById("gmailText");
    if(nameEl)   nameEl.innerText   = "Name:   " + (d.name   || "--");
    if(mobileEl) mobileEl.innerText = "Mobile: " + (d.mobile || "--");
    if(gmailEl)  gmailEl.innerText  = "Gmail:  " + (d.gmail  || "--");

  }catch(err){
    console.error("Preview error:", err);
    window.location.replace("booking.html");
  }

});


// ================= BACK =================
function goBack(){
  window.location.replace("booking.html");
}


// ================= CONFIRM =================
function confirmBooking(){

  var terms = document.getElementById("terms");

  if(!terms || !terms.checked){
    alert("Please accept the Terms & Conditions to proceed.");
    return;
  }

  var raw = localStorage.getItem("allBookingData");
  if(!raw){ window.location.replace("booking.html"); return; }

  var d;
  try{ d = JSON.parse(raw); }catch(e){ window.location.replace("booking.html"); return; }

  if((d.total || 0) <= 0){
    alert("Invalid booking amount. Please go back and select items.");
    return;
  }

  sessionStorage.setItem("allPaymentPending", "true");
  window.location.href = "payment.html";
}
