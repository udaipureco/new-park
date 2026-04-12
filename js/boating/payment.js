// ❌ direct access block
if(sessionStorage.getItem("boatingPreviewDone") !== "true"){
  window.location.replace("../../index.html");
}

document.addEventListener("DOMContentLoaded", function(){

  let data = JSON.parse(localStorage.getItem("boatingData"));

  if(!data){
    window.location.replace("booking.html");
    return;
  }

  document.getElementById("amount").innerText = "₹" + data.total;
});


// 🔙 BACK
function goBack(){
  window.location.replace("preview.html");
}


// 💳 PAY
function payNow(){

  let btn = document.getElementById("payBtn");
  let loading = document.getElementById("loading");

  btn.style.display = "none";
  loading.style.display = "block";

  // fake payment delay
  setTimeout(() => {

    // ✅ MARK DONE
    sessionStorage.setItem("boatingDone", "true");

    // 🔥 clear flow
    sessionStorage.removeItem("boatingFlow");

    window.location.replace("success.html");

  }, 2500);
}