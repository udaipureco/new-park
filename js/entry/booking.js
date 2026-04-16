// ================= TRACK PAGE =================
if(window.UWSState) window.UWSState.trackPage();

// ================= FLOW RESET =================
// Block re-entry after booking is complete
if(sessionStorage.getItem('bookingCompleted') === 'true'){
  window.location.replace('../../index.html');
}

// Reset flow flags (booking data handled below based on origin)
sessionStorage.removeItem('previewVisited');
sessionStorage.removeItem('paymentDone');
sessionStorage.removeItem('bookingCompleted');
sessionStorage.setItem('bookingStarted', 'true');


// ================= PRICES =================
var PRICES = { adult: 10, child: 5 };


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
  var adult = parseInt(document.getElementById('adult').value) || 0;
  var child = parseInt(document.getElementById('child').value) || 0;
  var total = (adult * PRICES.adult) + (child * PRICES.child);

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

  var adult = parseInt(document.getElementById('adult').value) || 0;
  var child = parseInt(document.getElementById('child').value) || 0;
  var total = (adult * PRICES.adult) + (child * PRICES.child);

  if(adult === 0 && child === 0){
    alert('Please select at least 1 ticket.');
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
    type: 'ENTRY',
    items: { adult: adult, child: child, motor: 0, shikara: 0, paddle: 0, ev: 0 },
    user: { name: name, mobile: mobile, email: gmail },
    total: total,
    meta: {
      bookingId: '',
      date: document.getElementById('date') ? document.getElementById('date').value : '--',
      time: new Date().toLocaleString('en-IN')
    }
  };

  localStorage.setItem('uwsBookingData', JSON.stringify(bookingData));
  if(window.UWSState) window.UWSState.set({ entry: { adult: adult, child: child } });

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
        if(d.type === 'ENTRY' && d.items){
          var adultEl = document.getElementById('adult');
          var childEl = document.getElementById('child');
          if(adultEl) adultEl.value = d.items.adult || 0;
          if(childEl) childEl.value = d.items.child || 0;
          if(d.user){
            if(document.getElementById('name'))   document.getElementById('name').value   = d.user.name   || '';
            if(document.getElementById('mobile')) document.getElementById('mobile').value = d.user.mobile || '';
            if(document.getElementById('gmail'))  document.getElementById('gmail').value  = d.user.email  || '';
          }
        }
      }
    } catch(e){}

  } else if(fromMain){
    // --- Case 2: Came from homepage BOOK TICKET button → prefill quantities ---
    sessionStorage.removeItem('from_main');
    if(window.UWSState){
      var saved = window.UWSState.get();
      if(saved.entry && (saved.entry.adult > 0 || saved.entry.child > 0)){
        var adultEl2 = document.getElementById('adult');
        var childEl2 = document.getElementById('child');
        if(adultEl2) adultEl2.value = saved.entry.adult || 0;
        if(childEl2) childEl2.value = saved.entry.child || 0;
      }
    }

  } else if(isRefresh){
    // --- Case 3: User refreshed the page → keep everything (browser restores inputs) ---
    // No action needed — browser retains form values on refresh

  } else {
    // --- Case 4: Direct navigation (new tab / address bar / bookmark) → clean slate ---
    if(window.UWSState) window.UWSState.reset();
    var adultEl3 = document.getElementById('adult');
    var childEl3 = document.getElementById('child');
    if(adultEl3) adultEl3.value = 0;
    if(childEl3) childEl3.value = 0;
  }

  updateTotal();

  // Smooth scroll on input focus (mobile keyboard fix)
  document.querySelectorAll('input[type=text], input[type=tel], input[type=email]').forEach(function(inp){
    inp.addEventListener('focus', function(){
      setTimeout(function(){ inp.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 300);
    });
  });

  // Live total update
  ['adult', 'child'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.addEventListener('input', updateTotal);
  });

});
