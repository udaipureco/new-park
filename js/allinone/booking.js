// ================= FLOW RESET =================
sessionStorage.removeItem("allPreviewDone");
sessionStorage.removeItem("allPaymentDone");
sessionStorage.removeItem("allBookingDone");
sessionStorage.setItem("allBookingFlow", "active");


// ================= PRICES =================
var PRICES = {
  adult:   10,
  child:    5,
  motor:  100,
  shikara:100,
  paddle:  50,
  ev:      20
};


// ================= CHANGE QTY =================
function changeQty(type, delta){
  var el = document.getElementById(type);
  if(!el) return;
  var val = parseInt(el.value) || 0;
  val += delta;
  if(val < 0) val = 0;
  el.value = val;
  updateTotal();
}


// ================= TOTAL =================
function updateTotal(){
  var total = 0;
  Object.keys(PRICES).forEach(function(key){
    var el = document.getElementById(key);
    var qty = el ? (parseInt(el.value) || 0) : 0;
    total += qty * PRICES[key];
  });
  var bar = document.getElementById("totalBar");
  if(bar) bar.innerText = "TOTAL: \u20B9" + total;
}


// ================= HOME =================
function goHome(){
  sessionStorage.clear();
  localStorage.removeItem("allBookingData");
  window.location.replace("../../index.html");
}


// ================= NEXT =================
function nextStep(){

  var name   = (document.getElementById("name")   || {}).value || "";
  var mobile = (document.getElementById("mobile") || {}).value || "";
  var gmail  = (document.getElementById("gmail")  || {}).value || "";

  name   = name.trim();
  mobile = mobile.trim();
  gmail  = gmail.trim();

  var adult   = parseInt(document.getElementById("adult")   .value) || 0;
  var child   = parseInt(document.getElementById("child")   .value) || 0;
  var motor   = parseInt(document.getElementById("motor")   .value) || 0;
  var shikara = parseInt(document.getElementById("shikara") .value) || 0;
  var paddle  = parseInt(document.getElementById("paddle")  .value) || 0;
  var ev      = parseInt(document.getElementById("ev")      .value) || 0;

  var total = (adult * 10) + (child * 5) + (motor * 100) +
              (shikara * 100) + (paddle * 50) + (ev * 20);

  // ❌ VALIDATION
  if(total === 0){
    alert("Please select at least one item to book.");
    return;
  }

  if(!name){
    alert("Please enter your name.");
    return;
  }

  if(!mobile || mobile.length !== 10 || isNaN(Number(mobile))){
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  if(!gmail || !gmail.includes("@")){
    alert("Please enter a valid Gmail ID.");
    return;
  }

  // ✅ SAVE
  var data = {
    date: document.getElementById("date") ? document.getElementById("date").value : "--",
    adult: adult, child: child,
    motor: motor, shikara: shikara, paddle: paddle,
    ev: ev, total: total,
    name: name, mobile: mobile, gmail: gmail
  };

  localStorage.setItem("allBookingData", JSON.stringify(data));
  sessionStorage.setItem("allBookingFlow", "active");

  window.location.href = "preview.html";
}


// ================= INIT =================
document.addEventListener("DOMContentLoaded", function(){

  // DATE
  var dateEl = document.getElementById("date");
  if(dateEl){
    var now = new Date();
    var dd = String(now.getDate()).padStart(2, "0");
    var mm = String(now.getMonth() + 1).padStart(2, "0");
    var yyyy = now.getFullYear();
    dateEl.value = dd + "-" + mm + "-" + yyyy;
  }

  // AUTOFILL
  try{
    var raw = localStorage.getItem("allBookingData");
    if(raw){
      var saved = JSON.parse(raw);
      ["adult","child","motor","shikara","paddle","ev"].forEach(function(k){
        var el = document.getElementById(k);
        if(el && saved[k] !== undefined) el.value = saved[k];
      });
      ["name","mobile","gmail"].forEach(function(k){
        var el = document.getElementById(k);
        if(el && saved[k]) el.value = saved[k];
      });
    }
  }catch(e){}

  updateTotal();

  // SMOOTH SCROLL ON FOCUS
  document.querySelectorAll("input[type=text], input[type=tel], input[type=email]").forEach(function(inp){
    inp.addEventListener("focus", function(){
      setTimeout(function(){ inp.scrollIntoView({ behavior: "smooth", block: "center" }); }, 300);
    });
  });

});
