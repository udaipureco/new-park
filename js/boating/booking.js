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
var PRICES = { motor: 100, shikara: 100, paddle: 50 };


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
  var motor   = parseInt(document.getElementById('motor').value)   || 0;
  var shikara = parseInt(document.getElementById('shikara').value) || 0;
  var paddle  = parseInt(document.getElementById('paddle').value)  || 0;
  var total   = (motor * PRICES.motor) + (shikara * PRICES.shikara) + (paddle * PRICES.paddle);

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

  var motor   = parseInt(document.getElementById('motor').value)   || 0;
  var shikara = parseInt(document.getElementById('shikara').value) || 0;
  var paddle  = parseInt(document.getElementById('paddle').value)  || 0;
  var total   = (motor * PRICES.motor) + (shikara * PRICES.shikara) + (paddle * PRICES.paddle);

  if(motor === 0 && shikara === 0 && paddle === 0){
    alert('Please select at least 1 boat.');
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
    type: 'BOATING',
    items: { adult: 0, child: 0, motor: motor, shikara: shikara, paddle: paddle, ev: 0 },
    user: { name: name, mobile: mobile, email: gmail },
    total: total,
    meta: {
      bookingId: '',
      date: document.getElementById('date') ? document.getElementById('date').value : '--',
      time: new Date().toLocaleString('en-IN')
    }
  };

  localStorage.setItem('uwsBookingData', JSON.stringify(bookingData));
  if(window.UWSState) window.UWSState.set({ boating: { motor: motor, shikara: shikara, paddle: paddle } });

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
        if(d.type === 'BOATING' && d.items){
          ['motor', 'shikara', 'paddle'].forEach(function(k){
            var el = document.getElementById(k);
            if(el) el.value = d.items[k] || 0;
          });
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
      if(saved.boating){
        var b = saved.boating;
        if(b.motor > 0 || b.shikara > 0 || b.paddle > 0){
          if(document.getElementById('motor'))   document.getElementById('motor').value   = b.motor   || 0;
          if(document.getElementById('shikara')) document.getElementById('shikara').value = b.shikara || 0;
          if(document.getElementById('paddle'))  document.getElementById('paddle').value  = b.paddle  || 0;
        }
      }
    }

  } else if(isRefresh){
    // --- Case 3: Page refresh → keep current state (browser restores inputs) ---
    // No action needed

  } else {
    // --- Case 4: Direct navigation → clean slate ---
    if(window.UWSState) window.UWSState.reset();
    ['motor', 'shikara', 'paddle'].forEach(function(k){
      var el = document.getElementById(k);
      if(el) el.value = 0;
    });
  }

  updateTotal();

  document.querySelectorAll('input[type=text], input[type=tel], input[type=email]').forEach(function(inp){
    inp.addEventListener('focus', function(){
      setTimeout(function(){ inp.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 300);
    });
  });

  ['motor', 'shikara', 'paddle'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.addEventListener('input', updateTotal);
  });

});
