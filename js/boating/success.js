// ================= FLOW GUARD =================
if (
  sessionStorage.getItem("bookingStarted") !== "true" ||
  sessionStorage.getItem("paymentDone") !== "true"
) {
  window.location.replace("../../index.html");
}

sessionStorage.setItem("bookingCompleted", "true");

// Block back button
history.pushState(null, null, location.href);
window.onpopstate = function () { history.go(1); };


// ================= HOME =================
function goHome() {
  sessionStorage.clear();
  if(window.UWSState) window.UWSState.clearBookingData();
  window.location.replace("../../index.html");
}


// ================= HELPERS =================
function setText(id, text) {
  var el = document.getElementById(id);
  if (el) el.innerText = text;
}

function infoRow(label, value) {
  return '<div class="ticket-info-row"><span>' + label + '</span><strong>' + value + '</strong></div>';
}


// ================= INIT =================
document.addEventListener("DOMContentLoaded", function () {
  try {
    var raw = localStorage.getItem("uwsBookingData");
    if (!raw) { console.warn("No booking data."); return; }

    var d = JSON.parse(raw);

    // BOOKING ID
    var bid = localStorage.getItem("uwsBookingId");
    if (!bid) {
      bid = "UWS-" + Math.floor(100000 + Math.random() * 900000);
      localStorage.setItem("uwsBookingId", bid);
    }
    if (!d.meta) d.meta = {};
    d.meta.bookingId = bid;
    localStorage.setItem("uwsBookingData", JSON.stringify(d));

    setText("bookingId", bid);
    setText("dateText", (d.meta && d.meta.date) ? d.meta.date : "--");

    // BOATING
    var boatEl = document.getElementById("boatingDetails");
    var boatHTML = "";
    if (d.items) {
      if (d.items.motor   > 0) boatHTML += infoRow("Motor Boat ("   + d.items.motor   + ")", "\u20B9" + (d.items.motor   * 100));
      if (d.items.shikara > 0) boatHTML += infoRow("Shikara Boat (" + d.items.shikara + ")", "\u20B9" + (d.items.shikara * 100));
      if (d.items.paddle  > 0) boatHTML += infoRow("Paddle Boat ("  + d.items.paddle  + ")", "\u20B9" + (d.items.paddle  * 50));
    }
    if (boatEl) boatEl.innerHTML = boatHTML || '<div class="ticket-info-row"><span>None</span></div>';

    // VISITOR
    var u = d.user || {};
    setText("nameText",   u.name   || "--");
    setText("mobileText", u.mobile || "--");
    setText("gmailText",  u.email  || "--");

    setText("totalText", "\u20B9" + (d.total || 0));

  } catch (e) {
    console.error("Success page error:", e);
  }
});


// ================= PDF =================
function downloadPDF() {
  var ticket = document.getElementById("ticket");
  if (!ticket) { alert("Ticket not found."); return; }

  html2canvas(ticket, { scale: 2, useCORS: true }).then(function (canvas) {
    var img   = canvas.toDataURL("image/jpeg", 0.85);
    var jsPDF = window.jspdf.jsPDF;
    var pdf   = new jsPDF("p", "mm", "a4");
    var pw    = pdf.internal.pageSize.getWidth();
    var ph    = pdf.internal.pageSize.getHeight();
    var iw    = pw - 20;
    var ih    = (canvas.height * iw) / canvas.width;

    if (ih > ph - 20) {
      ih = ph - 20;
      iw = (canvas.width * ih) / canvas.height;
    }

    var x = (pw - iw) / 2;
    pdf.addImage(img, "JPEG", x, 10, iw, ih);
    pdf.save("UWS_Boating_Ticket.pdf");
  }).catch(function (err) {
    alert("PDF generation failed. Please try again.");
    console.error(err);
  });
}
