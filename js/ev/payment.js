// ================= LOAD =================
document.addEventListener("DOMContentLoaded", function(){

  try{

    // 🔥 FLOW CHECK
    if(sessionStorage.getItem("evPreview") !== "done"){
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

    // ================= AMOUNT =================
    document.getElementById("amount").innerText = "₹" + data.total;

    // ================= USER =================
    document.getElementById("name").innerText = "👤 " + data.name;
    document.getElementById("mobile").innerText = "📱 " + data.mobile;

  }catch(err){
    console.log("Payment Error:", err);
    window.location.replace("booking.html");
  }

});


// ================= BACK =================
function goBack(){
  window.location.href = "preview.html";
}


// ================= PAY =================
function payNow(){

  let loading = document.getElementById("loading");

  loading.style.display = "block";

  // 🔥 simulate payment
  setTimeout(() => {

    sessionStorage.setItem("evDone", "true");

    window.location.href = "success.html";

  }, 2000);
}