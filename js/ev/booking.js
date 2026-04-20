// ================= TRACK PAGE =================
if(window.UWSState) window.UWSState.trackPage();

// ================= FLOW RESET =================
if(sessionStorage.getItem('bookingCompleted') === 'true'){
  window.location.replace('../../index.html');
}

sessionStorage.removeItem('previewVisited');
sessionStorage.removeItem('paymentDone');
sessionStorage.removeItem('bookingCompleted');
sessionStorage.setItem('bookingStarted', 'true');


// ================= PRICES =================
var PRICES = { ev: 20 };


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
  var ev    = parseInt(document.getElementById('ev').value) || 0;
  var total = ev * PRICES.ev;

  var bar = document.getElementById('totalBar');
  if(bar) bar.innerText = 'TOTAL: \u20B9' + total;
}


// ================= HOME =================
function goHome(){
  sessionStorage.clear();
  if(window.UWSState) window.UWSState.clearBookingData();
  window.location.replace('../../index.html');
}


// ================= NEXT =================
function nextStep(){
  var name   = (document.getElementById('name')   || {}).value || '';
  var mobile = (document.getElementById('mobile') || {}).value || '';
  var gmail  = (document.getElementById('gmail')  || {}).value || '';

  name   = name.trim();
  mobile = mobile.trim();
  gmail  = gmail.trim();

  var ev    = parseInt(document.getElementById('ev').value) || 0;
  var total = ev * PRICES.ev;

  if(ev === 0){
    alert('Please select at least 1 EV Cart.');
    return;
  }
  if(!name){
    alert('Please enter your name.');
    return;
  }
  if(!mobile || mobile.length !== 10 || isNaN(Number(mobile))){
    alert('Please enter a valid 10-digit mobile number.');
    return;
  }
  if(!gmail || !gmail.includes('@')){
    alert('Please enter a valid Gmail ID.');
    return;
  }

  var bookingData = {
    type: 'EV',
    items: { adult: 0, child: 0, motor: 0, shikara: 0, paddle: 0, ev: ev },
    user: { name: name, mobile: mobile, email: gmail },
    total: total,
    meta: {
      bookingId: '',
      date: document.getElementById('date') ? document.getElementById('date').value : '--',
      time: new Date().toLocaleString('en-IN')
    }
  };

  localStorage.setItem('uwsBookingData', JSON.stringify(bookingData));
  if(window.UWSState) window.UWSState.set({ ev: { ride: ev } });

  sessionStorage.setItem('bookingStarted', 'true');
  window.location.href = 'preview.html';
}


// ================= INIT =================
document.addEventListener('DOMContentLoaded', function(){

  // DATE — set today
  var dateEl = document.getElementById('date');
  if(dateEl){
    var now  = new Date();
    var dd   = String(now.getDate()).padStart(2, '0');
    var mm   = String(now.getMonth() + 1).padStart(2, '0');
    var yyyy = now.getFullYear();
    dateEl.value = dd + '-' + mm + '-' + yyyy;
  }

  // -------------------------------------------------------
  // ORIGIN DETECTION — determines what data to show
  // -------------------------------------------------------
  var fromPreview = sessionStorage.getItem('fromPreview');
  var fromMain    = sessionStorage.getItem('from_main');
  var isRefresh   = window.UWSState ? window.UWSState.isPageRefresh() : false;

  if(fromPreview){
    // --- Case 1: Came back from preview page → restore full form ---
    sessionStorage.removeItem('fromPreview');
    try {
      var raw = localStorage.getItem('uwsBookingData');
      if(raw){
        var d = JSON.parse(raw);
        if(d.type === 'EV' && d.items){
          var evEl = document.getElementById('ev');
          if(evEl) evEl.value = d.items.ev || 0;
          if(d.user){
            if(document.getElementById('name'))   document.getElementById('name').value   = d.user.name   || '';
            if(document.getElementById('mobile')) document.getElementById('mobile').value = d.user.mobile || '';
            if(document.getElementById('gmail'))  document.getElementById('gmail').value  = d.user.email  || '';
          }
        }
      }
    } catch(e){}

  } else if(fromMain){
    // --- Case 2: Came from homepage BOOK NOW button → prefill EV quantity ---
    sessionStorage.removeItem('from_main');
    if(window.UWSState){
      var saved = window.UWSState.get();
      if(saved.ev && saved.ev.ride > 0){
        var evEl2 = document.getElementById('ev');
        if(evEl2) evEl2.value = saved.ev.ride;
      }
    }

  } else if(isRefresh){
    // --- Case 3: Page refresh → keep current state (browser retains inputs) ---
    // No action needed

  } else {
    // --- Case 4: Direct navigation → clean slate ---
    if(window.UWSState) window.UWSState.reset();
    var evEl3 = document.getElementById('ev');
    if(evEl3) evEl3.value = 0;
  }

  updateTotal();

  document.querySelectorAll('input[type=text], input[type=tel], input[type=email]').forEach(function(inp){
    inp.addEventListener('focus', function(){
      setTimeout(function(){ inp.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 300);
    });
  });

  var evEl4 = document.getElementById('ev');
  if(evEl4) evEl4.addEventListener('input', updateTotal);

});
