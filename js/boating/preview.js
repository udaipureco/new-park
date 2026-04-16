// ================= FLOW GUARD =================
if (sessionStorage.getItem("bookingStarted") !== "true" || !localStorage.getItem("uwsBookingData")) {
  window.location.replace("../../index.html");
}

sessionStorage.setItem("previewVisited", "true");


// ================= HELPERS =================
function infoRow(label, price) {
  return '<div class="info-row"><span>' + label + '</span><span>\u20B9' + price + '</span></div>';
}


// ================= LOAD =================
document.addEventListener("DOMContentLoaded", function () {
  try {
    var raw = localStorage.getItem("uwsBookingData");
    if (!raw) { window.location.replace("booking.html"); return; }

    var d = JSON.parse(raw);
    if (d.type !== "BOATING") { window.location.replace("booking.html"); return; }

    // DATE
    var dateEl = document.getElementById("dateText");
    if (dateEl) dateEl.innerText = (d.meta && d.meta.date) ? d.meta.date : "--";

    // BOATING
    var boatEl = document.getElementById("boatingDetails");
    var html = "";
    if (d.items) {
      if (d.items.motor   > 0) html += infoRow("Motor Boat ("   + d.items.motor   + ")", d.items.motor   * 100);
      if (d.items.shikara > 0) html += infoRow("Shikara Boat (" + d.items.shikara + ")", d.items.shikara * 100);
      if (d.items.paddle  > 0) html += infoRow("Paddle Boat ("  + d.items.paddle  + ")", d.items.paddle  * 50);
    }
    if (boatEl) boatEl.innerHTML = html || '<p class="no-items">None selected</p>';

    // TOTAL
    var totalBar = document.getElementById("totalBar");
    if (totalBar) totalBar.innerText = "TOTAL: \u20B9" + (d.total || 0);

    // VISITOR
    var u = d.user || {};
    var nameEl   = document.getElementById("nameText");
    var mobileEl = document.getElementById("mobileText");
    var gmailEl  = document.getElementById("gmailText");
    if (nameEl)   nameEl.innerText   = "Name:   " + (u.name   || "--");
    if (mobileEl) mobileEl.innerText = "Mobile: " + (u.mobile || "--");
    if (gmailEl)  gmailEl.innerText  = "Gmail:  " + (u.email  || "--");

  } catch (err) {
    window.location.replace("booking.html");
  }
});


// ================= BACK =================
function goBack() {
  sessionStorage.setItem("fromPreview", "true");
  window.location.replace("booking.html");
}


// ================= CONFIRM =================
function confirmBooking() {
  var terms = document.getElementById("terms");
  if (!terms || !terms.checked) {
    alert("Please accept the Terms & Conditions to proceed.");
    return;
  }

  var raw = localStorage.getItem("uwsBookingData");
  if (!raw) { window.location.replace("booking.html"); return; }

  var d;
  try { d = JSON.parse(raw); } catch (e) { window.location.replace("booking.html"); return; }

  if ((d.total || 0) <= 0) {
    alert("Invalid booking amount. Please go back and select items.");
    return;
  }

  sessionStorage.setItem("paymentPending", "true");
  window.location.href = "payment.html";
}
