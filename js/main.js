// ================= GLOBAL SETTINGS =================
history.scrollRestoration = 'manual';

// ================= TRACK CURRENT PAGE =================
if(window.UWSState) window.UWSState.trackPage();


// ================================================================
// MENU SYSTEM — managed by header-loader.js (openMenu/closeMenu)
// ================================================================

// ================= HOME BUTTON (homepage only) =================
function goHome(){
  if(window.closeMenu) closeMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ================= COMMON SCROLL FUNCTION =================
function scrollToSection(id){
  var section = document.getElementById(id);
  if(window.closeMenu) closeMenu();
  setTimeout(function(){
    if(section){
      var header = document.querySelector('.header');
      var offset = header ? header.offsetHeight + 20 : 120;
      var y = section.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, 300);
}


// ================================================================
// UNIFIED POPUP SYSTEM
// ================================================================

function openUWSPopup(popupEl){
  if(!popupEl) return;
  popupEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeUWSPopup(popupEl){
  if(!popupEl) return;
  popupEl.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function closeAllPopups(){
  document.querySelectorAll('.popup.active, .uws-popup.active').forEach(function(p){
    p.classList.remove('active');
  });
  document.body.style.overflow = 'auto';
}


// ================================================================
// NAVIGATE TO BOOKING — sets from_main flag before any redirect
// ================================================================
function navigateToBooking(href){
  sessionStorage.setItem('from_main', 'true');
  window.location.href = href;
}


// ================================================================
// MAIN CLICK DELEGATION (single listener — no duplicates)
// ================================================================
document.addEventListener('click', function(e){

  // --- ENTRY POPUP OPEN ---
  if(e.target.closest('#viewBtn')){
    var ep = document.getElementById('popup');
    if(ep) openUWSPopup(ep);
    return;
  }

  // --- ENTRY POPUP CLOSE ---
  if(e.target.closest('#closePopup')){
    var ep2 = document.getElementById('popup');
    if(ep2) closeUWSPopup(ep2);
    return;
  }

  // --- ENTRY POPUP BACKDROP ---
  var ep3 = document.getElementById('popup');
  if(ep3 && ep3.classList.contains('active') && e.target === ep3){
    closeUWSPopup(ep3);
    return;
  }

  // --- BOATING POPUP OPEN ---
  if(e.target.closest('#openBoatingPopup')){
    var bp = document.getElementById('boatingPopup');
    if(bp) openUWSPopup(bp);
    return;
  }

  // --- BOATING POPUP CLOSE ---
  if(e.target.closest('#closeBoating')){
    var bp2 = document.getElementById('boatingPopup');
    if(bp2) closeUWSPopup(bp2);
    return;
  }

  // --- EV POPUP OPEN ---
  if(e.target.closest('#openEvPopup')){
    var evp = document.getElementById('evPopup');
    if(evp) openUWSPopup(evp);
    return;
  }

  // --- EV POPUP CLOSE ---
  if(e.target.closest('#closeEv')){
    var evp2 = document.getElementById('evPopup');
    if(evp2) closeUWSPopup(evp2);
    return;
  }

  // --- ALL-IN-ONE POPUP OPEN ---
  if(e.target.closest('#openAllinonePopup')){
    var aip = document.getElementById('allinonePopup');
    if(aip) openUWSPopup(aip);
    return;
  }

  // --- ALL-IN-ONE POPUP CLOSE ---
  if(e.target.closest('#closeAllinonePopup')){
    var aip2 = document.getElementById('allinonePopup');
    if(aip2) closeUWSPopup(aip2);
    return;
  }

  // --- ANY POPUP BACKDROP CLICK ---
  var popupBackdrop = e.target.closest('.popup');
  if(popupBackdrop && e.target === popupBackdrop){
    closeUWSPopup(popupBackdrop);
    return;
  }

  // --- .uws-popup CLOSE BUTTON ---
  var closeBtn2 = e.target.closest('.uws-popup-close');
  if(closeBtn2){
    var parentPopup = closeBtn2.closest('.uws-popup');
    if(parentPopup) closeUWSPopup(parentPopup);
    return;
  }

  // --- .uws-popup BACKDROP ---
  var uwsPopupEl = e.target.closest('.uws-popup');
  if(uwsPopupEl && e.target === uwsPopupEl){
    closeUWSPopup(uwsPopupEl);
    return;
  }

  // --- FAQ TOGGLE ---
  var faqQuestion = e.target.closest('.faq-question');
  if(faqQuestion){
    var faqItem = faqQuestion.closest('.faq-item');
    if(faqItem){
      var isOpen = faqItem.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(function(item){
        item.classList.remove('active');
        var ans = item.querySelector('.faq-answer');
        if(ans) ans.style.maxHeight = null;
        var icn = item.querySelector('.faq-question span');
        if(icn) icn.innerText = '+';
      });
      if(!isOpen){
        faqItem.classList.add('active');
        var answer = faqItem.querySelector('.faq-answer');
        if(answer) answer.style.maxHeight = answer.scrollHeight + 'px';
        var icon = faqItem.querySelector('.faq-question span');
        if(icon) icon.innerText = '\u2212';
      }
    }
    return;
  }

  // --- FACILITY SECTION BOOKING LINKS (a[href*="booking.html"]) ---
  // Intercept <a href> links to booking pages and set from_main flag
  var bookingLink = e.target.closest('a[href*="booking.html"]');
  if(bookingLink){
    e.preventDefault();
    navigateToBooking(bookingLink.getAttribute('href'));
    return;
  }

  // --- LANGUAGE TOGGLE ---
  var langBtn = e.target.closest('[data-lang]');
  if(langBtn){
    // handled by language IIFE below
    return;
  }

});


// ================= BACK BUTTON =================
window.addEventListener('popstate', function(){
  closeAllPopups();
  if(window.isMenuOpen){
    if(window.closeMenu) closeMenu();
  }
});


// ================= MAP FUNCTIONS =================
function openMap(){
  window.open('https://goo.gl/maps/jsEZEF1yoknBL5tH9?g_st=ac', '_blank');
}
function getDirections(){
  window.open('https://maps.app.goo.gl/5J92GN5sQwnHfRf46', '_blank');
}


// ================================================================
// MENU SCROLL BUTTONS (delegated buttons — still attached directly
// since they only exist on homepage)
// ================================================================
document.getElementById('menuGalleryBtn')?.addEventListener('click', function(e){
  e.stopPropagation();
  scrollToSection('gallery');
});
document.getElementById('menuBoatingBtn')?.addEventListener('click', function(e){
  e.stopPropagation();
  scrollToSection('boating');
});
document.getElementById('menuLocationBtn')?.addEventListener('click', function(e){
  e.stopPropagation();
  scrollToSection('location');
});
document.getElementById('menuEvBtn')?.addEventListener('click', function(){
  scrollToSection('ev');
});

document.getElementById('menuCycleBtn')?.addEventListener('click', function(){
  if(window.closeMenu) closeMenu();
  document.body.style.overflow = 'auto';
  setTimeout(function(){ window.location.href = 'pages/bicycle/rent.html'; }, 200);
});

var attractionBtn = document.getElementById('menuAttractionBtn');
if(attractionBtn){
  attractionBtn.addEventListener('click', function(){
    var section = document.getElementById('attractions');
    if(window.closeMenu) closeMenu();
    document.body.style.overflow = 'auto';
    setTimeout(function(){
      if(section){
        var y = section.getBoundingClientRect().top + window.pageYOffset - 240;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 300);
  });
}

var ecoBtn = document.getElementById('menuEcoBtn');
if(ecoBtn){
  ecoBtn.addEventListener('click', function(){
    if(window.closeMenu) closeMenu();
    document.body.style.overflow = 'auto';
    setTimeout(function(){ window.location.href = 'pages/ecohut/ecohut.html'; }, 300);
  });
}

var bookingBtn = document.getElementById('menuBookingBtn');
if(bookingBtn){
  bookingBtn.addEventListener('click', function(){
    var section = document.getElementById('booking');
    if(window.closeMenu) closeMenu();
    document.body.style.overflow = 'auto';
    setTimeout(function(){
      if(section){
        var y = section.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 300);
  });
}

var rulesBtn = document.getElementById('menuRulesBtn');
if(rulesBtn){
  rulesBtn.addEventListener('click', function(){
    var section = document.getElementById('rules');
    if(window.closeMenu) closeMenu();
    document.body.style.overflow = 'auto';
    setTimeout(function(){
      if(section){
        var y = section.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 300);
  });
}


// ================================================================
// EV CART SYSTEM
// FIXED: starts at 0 (not 1); only saves on user interaction
// ================================================================
(function(){
  var count = 0; // FIX: was 1 — must start at 0 (no pre-filled default)
  var price = 20;

  var minusBtn  = document.getElementById('evMinus');
  var plusBtn   = document.getElementById('evPlus');
  var countText = document.getElementById('evCount');
  var totalText = document.getElementById('evTotal');

  function updateDisplay(){
    // Update UI display only — does NOT auto-save to state
    if(countText) countText.innerText = count;
    if(totalText) totalText.innerText = count * price;
  }

  function updateAndSave(){
    updateDisplay();
    // Save to shared state only when user explicitly interacts
    if(window.UWSState) window.UWSState.set({ ev: { ride: count } });
  }

  if(minusBtn){
    minusBtn.addEventListener('click', function(){
      if(count > 0){ count--; updateAndSave(); }
    });
  }
  if(plusBtn){
    plusBtn.addEventListener('click', function(){
      count++;
      updateAndSave();
    });
  }

  // EV "BOOK NOW" — save state and set from_main flag before redirect
  var evBookBtn = document.querySelector('[data-testid="ev-book-now"]');
  if(evBookBtn){
    evBookBtn.onclick = null; // remove any inline handler
    evBookBtn.addEventListener('click', function(e){
      e.preventDefault();
      if(window.UWSState) window.UWSState.set({ ev: { ride: count } });
      navigateToBooking('pages/ev/booking.html');
    });
  }

  // Restore from saved state (only if user previously set it in this session)
  // Do NOT restore if this is a fresh load with no saved data
  if(window.UWSState){
    var raw = localStorage.getItem('uws_booking_data');
    if(raw){
      try {
        var saved = JSON.parse(raw);
        // Only restore if there is genuinely saved data with a non-zero ride count
        if(saved && saved.ev && typeof saved.ev.ride === 'number' && saved.ev.ride > 0){
          count = saved.ev.ride;
        }
      } catch(e){}
    }
    // If no raw data exists → count stays 0 (clean state)
  }

  updateDisplay(); // Show initial count (no state save on init)
})();


// ================================================================
// ALL-IN-ONE BOOKING SYSTEM — saves to uws_booking_data
// ================================================================
document.addEventListener('DOMContentLoaded', function(){

  var prices = [10, 5, 100, 100, 50, 20];
  var keys   = ['adult', 'child', 'motor', 'shikara', 'paddle', 'ev_ride'];

  var items    = document.querySelectorAll('.booking-item');
  var totalBox = document.querySelector('.booking-total');

  // Restore from saved state (0 if no data)
  var counts = [0, 0, 0, 0, 0, 0];
  if(window.UWSState){
    var saved = window.UWSState.get();
    counts[0] = saved.entry.adult    || 0;
    counts[1] = saved.entry.child    || 0;
    counts[2] = saved.boating.motor  || 0;
    counts[3] = saved.boating.shikara|| 0;
    counts[4] = saved.boating.paddle || 0;
    counts[5] = saved.ev.ride        || 0;
  }

  function saveState(){
    if(!window.UWSState) return;
    window.UWSState.set({
      entry:   { adult: counts[0], child: counts[1] },
      boating: { motor: counts[2], shikara: counts[3], paddle: counts[4] },
      ev:      { ride: counts[5] }
    });
  }

  function updateUI(){
    var total = 0;
    items.forEach(function(item, index){
      var countSpan = item.querySelector('.booking-qty span');
      if(countSpan) countSpan.innerText = counts[index];
      total += counts[index] * prices[index];
    });
    if(totalBox) totalBox.innerText = 'TOTAL: \u20B9' + total;
  }

  items.forEach(function(item, index){
    var minus = item.querySelector('.booking-qty button:first-child');
    var plus  = item.querySelector('.booking-qty button:last-child');

    if(minus) minus.addEventListener('click', function(){
      if(counts[index] > 0){ counts[index]--; updateUI(); saveState(); }
    });
    if(plus) plus.addEventListener('click', function(){
      counts[index]++;
      updateUI();
      saveState();
    });
  });

  // VIEW DETAILS → open all-in-one info popup
  var viewDetailsBtn = document.querySelectorAll('.booking-btn')[0];
  if(viewDetailsBtn){
    viewDetailsBtn.addEventListener('click', function(){
      var popup = document.getElementById('allinonePopup');
      if(popup) openUWSPopup(popup);
    });
  }

  // BOOK NOW → save and navigate with from_main flag
  var bookNowBtn = document.querySelectorAll('.booking-btn')[1];
  if(bookNowBtn){
    bookNowBtn.addEventListener('click', function(){
      saveState();
      var total = 0;
      counts.forEach(function(c, i){ total += c * prices[i]; });
      localStorage.setItem('allBookingData', JSON.stringify({ counts: counts, total: total }));
      navigateToBooking('pages/allinone/booking.html');
    });
  }

  updateUI();
});


// ================================================================
// SCROLL ENTRANCE ANIMATIONS
// ================================================================
(function(){
  var revealSelectors = '.scroll-reveal, .scroll-reveal-stagger, .scroll-slide-left, .scroll-scale';

  if('IntersectionObserver' in window){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    function observeElements(){
      document.querySelectorAll(revealSelectors).forEach(function(el){
        if(!el.classList.contains('revealed')) observer.observe(el);
      });
    }

    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', observeElements);
    } else {
      observeElements();
    }
    setTimeout(observeElements, 1000);

  } else {
    document.querySelectorAll(revealSelectors).forEach(function(el){
      el.classList.add('revealed');
    });
  }
})();


// ================================================================
// HINDI / ENGLISH LANGUAGE TOGGLE
// ================================================================
(function(){

  var translations = {
    en: {
      hero_title: 'Explore Udaipur Wildlife Sanctuary',
      hero_subtitle: 'Discover the untamed beauty of nature,<br>home to diverse wildlife in the heart of Udaipur',
      adult_ticket: 'ADULT ENTRY<br><span>TICKET \u20B910</span>',
      child_ticket: 'CHILD ENTRY<br><span>TICKET \u20B95</span>',
      boating_title: 'Boating Experience',
      boating_text: 'Enjoy peaceful rides on serene waters surrounded by nature and wildlife.',
      ev_title: 'EV-CART Booking',
      ev_sub: 'Book your eco vehicle ride easily',
      booking_title: 'All In One Booking',
      booking_sub: 'Book everything in one place',
      bird_title: 'Udaipur Bird Sanctuary',
      wildlife_title: 'Udaipur Wildlife Sanctuary',
      loc_heading: 'LOCATION & TIMING',
      loc_holiday: 'Holiday & Timing',
      loc_open: '<strong>Opening Time:</strong> 9 AM \u2013 5 PM',
      loc_closed: 'Monday: Closed',
      loc_days: 'Tuesday \u2013 Sunday: Open',
      fac_heading: 'FACILITIES',
      gallery_heading: 'Photo Gallery',
      rules_heading: 'RULES & GUIDELINES',
      faq_heading: 'FREQUENTLY ASKED QUESTIONS',
      rule_1: 'Do Not Tease Animals',
      rule_2: 'Maintain Safe Distance',
      rule_3: 'No Outside Food',
      rule_4: 'Use Dustbin',
      rule_5: 'Follow Staff Instructions',
      rule_6: 'Children must be supervised',
      action_location: 'Location',
      action_contact: 'Contact Us',
      action_complain: 'Complain',
      footer_quick: 'Quick Links',
      footer_whats: "What's Here",
      footer_programs: 'Programs',
      footer_copy: '\u00A9 2026 Udaipur Wildlife Sanctuary',
      view_details: 'VIEW MORE DETAILS',
      book_ticket: 'BOOK TICKET',
      book_now: 'BOOK NOW',
      view_all: 'View All',
      view_more: 'View More Details',
      coming_soon: 'Coming Soon'
    },
    hi: {
      hero_title: '\u0909\u0926\u092F\u092A\u0941\u0930 \u0935\u0928\u094D\u092F\u091C\u0940\u0935 \u0905\u092D\u092F\u093E\u0930\u0923\u094D\u092F \u0915\u0940 \u0916\u094B\u091C \u0915\u0930\u0947\u0902',
      hero_subtitle: '\u092A\u094D\u0930\u0915\u0943\u0924\u093F \u0915\u0940 \u0905\u0926\u092E\u094D\u092F \u0938\u0941\u0902\u0926\u0930\u0924\u093E \u0915\u0940 \u0916\u094B\u091C \u0915\u0930\u0947\u0902,<br>\u0909\u0926\u092F\u092A\u0941\u0930 \u0915\u0947 \u0939\u0943\u0926\u092F \u092E\u0947\u0902 \u0935\u093F\u0935\u093F\u0927 \u0935\u0928\u094D\u092F\u091C\u0940\u0935\u094B\u0902 \u0915\u093E \u0918\u0930',
      adult_ticket: '\u0935\u092F\u0938\u094D\u0915 \u092A\u094D\u0930\u0935\u0947\u0936<br><span>\u091F\u093F\u0915\u091F \u20B910</span>',
      child_ticket: '\u092C\u093E\u0932 \u092A\u094D\u0930\u0935\u0947\u0936<br><span>\u091F\u093F\u0915\u091F \u20B95</span>',
      boating_title: '\u0928\u094C\u0915\u093E\u092F\u0928 \u0905\u0928\u0941\u092D\u0935',
      boating_text: '\u092A\u094D\u0930\u0915\u0943\u0924\u093F \u0914\u0930 \u0935\u0928\u094D\u092F\u091C\u0940\u0935\u094B\u0902 \u0938\u0947 \u0918\u093F\u0930\u0947 \u0936\u093E\u0902\u0924 \u092A\u093E\u0928\u0940 \u092A\u0930 \u0938\u0935\u093E\u0930\u0940 \u0915\u093E \u0906\u0928\u0902\u0926 \u0932\u0947\u0902\u0964',
      ev_title: '\u0908\u0935\u0940-\u0915\u093E\u0930\u094D\u091F \u092C\u0941\u0915\u093F\u0902\u0917',
      ev_sub: '\u0906\u0938\u093E\u0928\u0940 \u0938\u0947 \u0907\u0915\u094B \u0935\u093E\u0939\u0928 \u0930\u093E\u0907\u0921 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902',
      booking_title: '\u0911\u0932 \u0907\u0928 \u0935\u0928 \u092C\u0941\u0915\u093F\u0902\u0917',
      booking_sub: '\u0938\u092C \u0915\u0941\u091B \u090F\u0915 \u091C\u0917\u0939 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902',
      bird_title: '\u0909\u0926\u092F\u092A\u0941\u0930 \u092A\u0915\u094D\u0937\u0940 \u0905\u092D\u092F\u093E\u0930\u0923\u094D\u092F',
      wildlife_title: '\u0909\u0926\u092F\u092A\u0941\u0930 \u0935\u0928\u094D\u092F\u091C\u0940\u0935 \u0905\u092D\u092F\u093E\u0930\u0923\u094D\u092F',
      loc_heading: '\u0938\u094D\u0925\u093E\u0928 \u0914\u0930 \u0938\u092E\u092F',
      loc_holiday: '\u091B\u0941\u091F\u094D\u091F\u0940 \u0914\u0930 \u0938\u092E\u092F',
      loc_open: '<strong>\u0916\u0941\u0932\u0928\u0947 \u0915\u093E \u0938\u092E\u092F:</strong> \u0938\u0941\u092C\u0939 9 \u2013 \u0936\u093E\u092E 5',
      loc_closed: '\u0938\u094F\u092E\u0935\u093E\u0930: \u092C\u0902\u0926',
      loc_days: '\u092E\u0902\u0917\u0932\u0935\u093E\u0930 \u2013 \u0930\u0935\u093F\u0935\u093E\u0930: \u0916\u0941\u0932\u093E',
      fac_heading: '\u0938\u0941\u0935\u093F\u0927\u093E\u090F\u0902',
      gallery_heading: '\u092B\u094B\u091F\u094B \u0917\u0948\u0932\u0930\u0940',
      rules_heading: '\u0928\u093F\u092F\u092E \u0914\u0930 \u0926\u093F\u0936\u093E\u0928\u093F\u0930\u094D\u0926\u0947\u0936',
      faq_heading: '\u0905\u0915\u094D\u0938\u0930 \u092A\u0942\u091B\u0947 \u091C\u093E\u0928\u0947 \u0935\u093E\u0932\u0947 \u092A\u094D\u0930\u0936\u094D\u0928',
      rule_1: '\u091C\u093E\u0928\u0935\u0930\u094B\u0902 \u0915\u094B \u0928 \u091B\u0947\u0921\u093C\u0947\u0902',
      rule_2: '\u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0926\u0942\u0930\u0940 \u092C\u0928\u093E\u090F \u0930\u0916\u0947\u0902',
      rule_3: '\u092C\u093E\u0939\u0930 \u0915\u093E \u0916\u093E\u0928\u093E \u0928\u0939\u0940\u0902',
      rule_4: '\u0915\u0942\u0921\u093C\u0947\u0926\u093E\u0928 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902',
      rule_5: '\u0915\u0930\u094D\u092E\u091A\u093E\u0930\u093F\u092F\u094B\u0902 \u0915\u0947 \u0928\u093F\u0930\u094D\u0926\u0947\u0936 \u092E\u093E\u0928\u0947\u0902',
      rule_6: '\u092C\u091A\u094D\u091A\u094B\u0902 \u0915\u0940 \u0928\u093F\u0917\u0930\u093E\u0928\u0940 \u0915\u0930\u0947\u0902',
      action_location: '\u0938\u094D\u0925\u093E\u0928',
      action_contact: '\u0938\u0902\u092A\u0930\u094D\u0915 \u0915\u0930\u0947\u0902',
      action_complain: '\u0936\u093F\u0915\u093E\u092F\u0924',
      footer_quick: '\u0924\u094D\u0935\u0930\u093F\u0924 \u0932\u093F\u0902\u0915',
      footer_whats: '\u092F\u0939\u093E\u0901 \u0915\u094D\u092F\u093E \u0939\u0948',
      footer_programs: '\u0915\u093E\u0930\u094D\u092F\u0915\u094D\u0930\u092E',
      footer_copy: '\u00A9 2026 \u0909\u0926\u092F\u092A\u0941\u0930 \u0935\u0928\u094D\u092F\u091C\u0940\u0935 \u0905\u092D\u092F\u093E\u0930\u0923\u094D\u092F',
      view_details: '\u0935\u093F\u0935\u0930\u0923 \u0926\u0947\u0916\u0947\u0902',
      book_ticket: '\u091F\u093F\u0915\u091F \u092C\u0941\u0915 \u0915\u0930\u0947\u0902',
      book_now: '\u0905\u092D\u0940 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902',
      view_all: '\u0938\u092C \u0926\u0947\u0916\u0947\u0902',
      view_more: '\u0914\u0930 \u0926\u0947\u0916\u0947\u0902',
      coming_soon: '\u091C\u0932\u094D\u0926 \u0906 \u0930\u0939\u093E \u0939\u0948'
    }
  };

  var currentLang = localStorage.getItem('uws_lang') || 'en';

  function applyLanguage(lang){
    currentLang = lang;
    localStorage.setItem('uws_lang', lang);
    var t = translations[lang];
    if(!t) return;

    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      if(t[key] !== undefined){
        if(el.getAttribute('data-i18n-html') !== null || key.indexOf('subtitle') > -1){
          el.innerHTML = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function(el){
      var key = el.getAttribute('data-i18n-html');
      if(t[key] !== undefined) el.innerHTML = t[key];
    });

    var hindiBtn   = document.getElementById('langHindiBtn');
    var englishBtn = document.getElementById('langEnglishBtn');
    if(hindiBtn)   hindiBtn.classList.toggle('lang-active',   lang === 'hi');
    if(englishBtn) englishBtn.classList.toggle('lang-active', lang === 'en');
  }

  document.addEventListener('click', function(e){
    var btn = e.target.closest('[data-lang]');
    if(btn) applyLanguage(btn.getAttribute('data-lang'));
  });

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ applyLanguage(currentLang); });
  } else {
    applyLanguage(currentLang);
  }
})();


// ================================================================
// SCROLL TO LOCATION (exposed globally)
// ================================================================
function scrollToLocation(){
  var section = document.getElementById('location');
  if(section){
    var header = document.querySelector('.header');
    var offset = header ? header.offsetHeight + 20 : 120;
    var y = section.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}


function goToBirdPage() {
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = "pages/bird/bird.html";
  }, 200);
}