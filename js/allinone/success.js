// ================= BLOCK DIRECT ACCESS =================
if(
  sessionStorage.getItem("allBookingFlow") !== "active" ||
  sessionStorage.getItem("allPaymentDone") !== "true"
){
  window.location.replace("../../index.html");
}

// ================= FINAL DONE FLAG =================
sessionStorage.setItem("allBookingDone", "true");

// ================= BLOCK BACK BUTTON =================
history.pushState(null, null, location.href);
window.onpopstate = function(){ history.go(1); };


// ================= HOME =================
function goHome(){
  sessionStorage.clear();
  if(window.UWSState) window.UWSState.clearBookingData();
  window.location.replace("../../index.html");
}


// ================= HELPERS =================
function setText(id, text){
  var el = document.getElementById(id);
  if(el) el.innerText = text;
}

function infoRow(label, value){
  return '<div class="info-row"><span>' + label + '</span><strong>' + value + '</strong></div>';
}


// ================= INIT =================
document.addEventListener("DOMContentLoaded", function(){

  try{
    var raw = localStorage.getItem("allBookingData");
    if(!raw){ console.warn("No booking data found."); return; }

    var d = JSON.parse(raw);

    // BOOKING ID
    var bid = localStorage.getItem("allBookingId");
    if(!bid){
      bid = "UWS-" + Math.floor(100000 + Math.random() * 900000);
      localStorage.setItem("allBookingId", bid);
    }
    setText("bookingId", bid);

    // DATE
    setText("dateText", d.date || "--");

    // ENTRY
    var entryEl = document.getElementById("entryDetails");
    var entryHTML = "";
    if(d.adult > 0) entryHTML += infoRow("Adult (" + d.adult + ")", "\u20B9" + (d.adult * 10));
    if(d.child > 0) entryHTML += infoRow("Child (" + d.child + ")", "\u20B9" + (d.child * 5));
    if(entryEl) entryEl.innerHTML = entryHTML || '<div class="info-row"><span>None</span></div>';

    // BOATING
    var boatEl = document.getElementById("boatingDetails");
    var boatHTML = "";
    if(d.motor   > 0) boatHTML += infoRow("Motor Boat ("   + d.motor   + ")", "\u20B9" + (d.motor   * 100));
    if(d.shikara > 0) boatHTML += infoRow("Shikara Boat (" + d.shikara + ")", "\u20B9" + (d.shikara * 100));
    if(d.paddle  > 0) boatHTML += infoRow("Paddle Boat ("  + d.paddle  + ")", "\u20B9" + (d.paddle  * 50));
    if(boatEl) boatEl.innerHTML = boatHTML || '<div class="info-row"><span>None</span></div>';

    // EV
    var evEl = document.getElementById("evDetails");
    var evHTML = "";
    if(d.ev > 0) evHTML += infoRow("EV Cart (" + d.ev + ")", "\u20B9" + (d.ev * 20));
    if(evEl) evEl.innerHTML = evHTML || '<div class="info-row"><span>None</span></div>';

    // VISITOR
    setText("nameText",   d.name   || "--");
    setText("mobileText", d.mobile || "--");
    setText("gmailText",  d.gmail  || "--");

    // TOTAL
    setText("totalText", "\u20B9" + (d.total || 0));

  }catch(e){
    console.error("Success page error:", e);
  }

});


// ================= PDF DOWNLOAD =================
function downloadPDF(){

  var ticket = document.getElementById("ticket");
  if(!ticket){ alert("Ticket not found."); return; }

  html2canvas(ticket, { scale: 2, useCORS: true }).then(function(canvas){

    var img = canvas.toDataURL("image/jpeg", 0.85);
    var jsPDF = window.jspdf.jsPDF;
    var pdf = new jsPDF("p", "mm", "a4");

    var pageWidth  = pdf.internal.pageSize.getWidth();
    var pageHeight = pdf.internal.pageSize.getHeight();

    var imgWidth  = pageWidth - 20;
    var imgHeight = (canvas.height * imgWidth) / canvas.width;

    if(imgHeight > pageHeight - 20){
      imgHeight = pageHeight - 20;
      imgWidth  = (canvas.width * imgHeight) / canvas.height;
    }

    var x = (pageWidth - imgWidth) / 2;

    pdf.addImage(img, "JPEG", x, 10, imgWidth, imgHeight);
    pdf.save("UWS_AllInOne_Ticket.pdf");

  }).catch(function(err){
    alert("PDF generation failed. Please try again.");
    console.error(err);
  });
}
