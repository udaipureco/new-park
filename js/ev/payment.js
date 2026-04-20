// ================= FLOW GUARD =================
if (
  sessionStorage.getItem("bookingStarted") !== "true" ||
  sessionStorage.getItem("previewVisited") !== "true"
) {
  window.location.replace("../../index.html");
}

sessionStorage.setItem("paymentDone", "true");


// ================= LOAD AMOUNT =================
document.addEventListener("DOMContentLoaded", function () {
  var raw = localStorage.getItem("uwsBookingData");
  if (!raw) { window.location.replace("booking.html"); return; }

  try {
    var d = JSON.parse(raw);
    var amountEl = document.getElementById("amount");
    if (amountEl) amountEl.innerText = "\u20B9" + (d.total || 0);
  } catch (e) {
    window.location.replace("booking.html");
  }
});


// ================= PAY =================
function payNow() {
  var btn     = document.getElementById("payBtn");
  var loading = document.getElementById("loading");
  if (btn)     btn.style.display = "none";
  if (loading) loading.style.display = "block";

  setTimeout(function () {
    window.location.replace("success.html");
  }, 2500);
}


// ================= BACK =================
function goBack() {
  window.location.replace("preview.html");
}
