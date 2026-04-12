// ================= GLOBAL SETTINGS =================
history.scrollRestoration = "manual";


// ================= MENU STATE CONTROL =================
let isMenuOpen = false;


// ================= MENU FUNCTIONS =================

function openMenu(){
  const menu = document.getElementById("menu");

  if(menu && !isMenuOpen){
    menu.classList.add("active");
    document.body.style.overflow = "hidden";

    isMenuOpen = true;

    history.pushState({menu:true}, "");
  }
}

function closeMenu(skipHistory = false){
  const menu = document.getElementById("menu");

  if(menu && isMenuOpen){
    menu.classList.remove("active");
    document.body.style.overflow = "auto";

    isMenuOpen = false;

    if(!skipHistory && history.state && history.state.menu){
      history.back();
    }
  }
}


// ================= HOME BUTTON =================

function goHome(){
  closeMenu();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ================= MAIN INIT (Event Delegation) =================

document.addEventListener("click", function(e){

  // MENU OPEN — hero menu btn or header hamburger
  if(e.target.closest("#heroMenuBtn") || e.target.closest(".menu-icon") || e.target.closest("[data-testid='header-menu-btn']")){
    openMenu();
    return;
  }

  // MENU CLOSE — close button
  if(e.target.closest(".close-btn")){
    closeMenu();
    return;
  }

  // MENU OVERLAY — click outside panel to close
  var menuOverlay = document.getElementById("menu");
  if(menuOverlay && e.target === menuOverlay){
    closeMenu();
    return;
  }

  // ENTRY POPUP OPEN
  if(e.target.closest("#viewBtn")){
    var entryPopup = document.getElementById("popup");
    if(entryPopup){
      entryPopup.style.display = "flex";
      document.body.style.overflow = "hidden";
      history.pushState({popup:true}, "");
    }
    return;
  }

  // ENTRY POPUP CLOSE
  if(e.target.closest("#closePopup")){
    var entryPopup = document.getElementById("popup");
    if(entryPopup){
      entryPopup.style.display = "none";
      document.body.style.overflow = "auto";
      history.back();
    }
    return;
  }

  // ENTRY POPUP BACKDROP
  var entryPopup = document.getElementById("popup");
  if(entryPopup && e.target === entryPopup){
    entryPopup.style.display = "none";
    document.body.style.overflow = "auto";
    history.back();
    return;
  }

  // FAQ TOGGLE
  var faqQuestion = e.target.closest(".faq-question");
  if(faqQuestion){
    var faqItem = faqQuestion.closest(".faq-item");
    if(faqItem){
      var isOpen = faqItem.classList.contains("active");
      // Close all FAQ items
      document.querySelectorAll(".faq-item").forEach(function(item){
        item.classList.remove("active");
        var ans = item.querySelector(".faq-answer");
        if(ans) ans.style.maxHeight = null;
        var icn = item.querySelector(".faq-question span");
        if(icn) icn.innerText = "+";
      });
      // Open clicked if it was closed
      if(!isOpen){
        faqItem.classList.add("active");
        var answer = faqItem.querySelector(".faq-answer");
        if(answer) answer.style.maxHeight = answer.scrollHeight + "px";
        var icon = faqItem.querySelector(".faq-question span");
        if(icon) icon.innerText = "\u2212";
      }
    }
    return;
  }
});

// ================= BACK BUTTON =================
window.addEventListener("popstate", function(){
  var entryPopup = document.getElementById("popup");
  if(entryPopup && entryPopup.style.display === "flex"){
    entryPopup.style.display = "none";
    document.body.style.overflow = "auto";
    return;
  }

  if(isMenuOpen){
    closeMenu(true);
    return;
  }
});


// ================= COMMON SCROLL FUNCTION =================

function scrollToSection(id){

  const section = document.getElementById(id);

  closeMenu();

  setTimeout(() => {

    if(section){
      const header = document.querySelector(".header");
      const offset = header ? header.offsetHeight + 20 : 120;

      const y = section.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }

  }, 300);
}


// ================= MENU SCROLL BUTTONS =================

document.getElementById("menuGalleryBtn")?.addEventListener("click", (e) => {
  e.stopPropagation(); // 🔥 FIX
  scrollToSection("gallery");
});

document.getElementById("menuBoatingBtn")?.addEventListener("click", (e) => {
  e.stopPropagation(); // 🔥 FIX
  scrollToSection("boating");
});

document.getElementById("menuLocationBtn")?.addEventListener("click", (e) => {
  e.stopPropagation(); // 🔥 FIX
  scrollToSection("location");
});


// ================= MAP FUNCTIONS =================

function openMap(){
  window.open("https://goo.gl/maps/jsEZEF1yoknBL5tH9?g_st=ac", "_blank");
}

function getDirections(){
  window.open("https://maps.app.goo.gl/5J92GN5sQwnHfRf46", "_blank");
}


// ================= BOATING POPUP =================

(function(){

  const popup = document.getElementById("boatingPopup");

  document.getElementById("openBoatingPopup")?.addEventListener("click", () => {
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  document.getElementById("closeBoating")?.addEventListener("click", () => {
    popup.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", (e) => {
    if(e.target === popup){
      popup.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

})();


// ================= EV POPUP =================

(function(){

  const popup = document.getElementById("evPopup");

  document.getElementById("openEvPopup")?.addEventListener("click", () => {
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  document.getElementById("closeEv")?.addEventListener("click", () => {
    popup.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", (e) => {
    if(e.target === popup){
      popup.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

})();

// ================= MENU EV SCROLL =================
document.getElementById("menuEvBtn")?.addEventListener("click", () => {
  scrollToSection("ev");
});

// ================= MENU BICYCLE REDIRECT =================
document.getElementById("menuCycleBtn")?.addEventListener("click", () => {

  // menu close
  closeMenu();

  // scroll unlock
  document.body.style.overflow = "auto";

  // redirect
  setTimeout(() => {
    window.location.href = "pages/bicycle/rent.html";
  }, 200);

});

// ================= MENU ATTRACTIONS SCROLL (FINAL PERFECT VIEW) =================
const attractionBtn = document.getElementById("menuAttractionBtn");

if(attractionBtn){
  attractionBtn.addEventListener("click", () => {

    const section = document.getElementById("attractions");

    // menu close
    closeMenu();
    document.body.style.overflow = "auto";

    // history fix
    if(history.state?.menu){
  history.back();
}

    setTimeout(() => {
      if(section){

        // 🔥 EXTRA OFFSET (MAIN FIX)
        const extraOffset = 240; // 👈 isko adjust kar sakte ho (140–180 best)

        const y = section.getBoundingClientRect().top + window.pageYOffset - extraOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth"
        });

      }
    }, 300);

  });
}

// ================= MENU ECO STAY REDIRECT =================
const ecoBtn = document.getElementById("menuEcoBtn");

if(ecoBtn){
  ecoBtn.addEventListener("click", () => {

    // menu close
    closeMenu();
    document.body.style.overflow = "auto";

    // history fix
    if(history.state?.menu){
  history.back();
}

    // smooth redirect delay
    setTimeout(() => {
      window.location.href = "pages/ecohut/ecohut.html";
    }, 300);

  });
}

// ================= MENU BOOKING SCROLL =================
const bookingBtn = document.getElementById("menuBookingBtn");

if(bookingBtn){
  bookingBtn.addEventListener("click", () => {

    const section = document.getElementById("booking");

    // menu close
    closeMenu();
    document.body.style.overflow = "auto";

    // history fix
    if(history.state?.menu){
  history.back();
}

    setTimeout(() => {
      if(section){

        // 🔥 OFFSET (perfect view)
        const offset = 90;

        const y = section.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: y,
          behavior: "smooth"
        });

      }
    }, 300);

  });
}

// ================= MENU RULES SCROLL =================
const rulesBtn = document.getElementById("menuRulesBtn");

if(rulesBtn){
  rulesBtn.addEventListener("click", () => {

    const section = document.getElementById("rules");

    // menu close
    closeMenu();
    document.body.style.overflow = "auto";

    // history fix
    if(history.state?.menu){
  history.back();
}

    setTimeout(() => {
      if(section){

        // 🔥 same offset (perfect alignment)
        const offset = 70;

        const y = section.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: y,
          behavior: "smooth"
        });

      }
    }, 300);

  });
}

// ================= EV CART SYSTEM =================

(function(){

  let count = 1;
  const price = 20;

  const minusBtn = document.getElementById("evMinus");
  const plusBtn = document.getElementById("evPlus");
  const countText = document.getElementById("evCount");
  const totalText = document.getElementById("evTotal");

  function updateUI(){
    countText.innerText = count;
    totalText.innerText = count * price;
  }

  // ➖ Minus Button
  if(minusBtn){
    minusBtn.addEventListener("click", () => {
      if(count > 1){
        count--;
        updateUI();
      }
    });
  }

  // ➕ Plus Button
  if(plusBtn){
    plusBtn.addEventListener("click", () => {
      count++;
      updateUI();
    });
  }

  // 🔥 Initial Update
  updateUI();

})();

// ================= ALL BOOKING SYSTEM =================

document.addEventListener("DOMContentLoaded", function(){

  // PRICE LIST
  // Legacy booking system removed (IDs not in use)
  // All-in-one booking handled by the system below
});

// ================= FAQ TOGGLE (handled via event delegation above) =================

function scrollToLocation(){

  const section = document.getElementById("location");

  if(section){

    const header = document.querySelector(".header");

    const offset = header ? header.offsetHeight + 20 : 120;

    const y = section.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });

  }

}


  //===== all in one boking =====
document.addEventListener("DOMContentLoaded", function(){

  // ================= PRICE LIST =================
  const prices = [10, 5, 100, 100, 50, 20];

  const items = document.querySelectorAll(".booking-item");
  const totalBox = document.querySelector(".booking-total");

  // ================= STATE =================
  let counts = [0, 0, 0, 0, 0, 0];

  // ================= UPDATE UI =================
  function updateUI(){

    let total = 0;

    items.forEach((item, index) => {

      const countSpan = item.querySelector(".booking-qty span");
      countSpan.innerText = counts[index];

      total += counts[index] * prices[index];

    });

    totalBox.innerText = "TOTAL: ₹" + total;
  }

  // ================= BUTTON LOGIC =================
  items.forEach((item, index) => {

    const minus = item.querySelector(".booking-qty button:first-child");
    const plus = item.querySelector(".booking-qty button:last-child");

    minus.addEventListener("click", () => {
      if(counts[index] > 0){
        counts[index]--;
        updateUI();
      }
    });

    plus.addEventListener("click", () => {
      counts[index]++;
      updateUI();
    });

  });

  // ================= VIEW DETAILS =================
  document.querySelector(".booking-btn")?.addEventListener("click", () => {

    alert("Total Booking: ₹" + totalBox.innerText.replace("TOTAL: ₹",""));

  });

  // ================= BOOK NOW =================
  document.querySelectorAll(".booking-btn")[1]?.addEventListener("click", () => {

    const data = {
      counts: counts,
      total: totalBox.innerText.replace("TOTAL: ₹","")
    };

    localStorage.setItem("allBookingData", JSON.stringify(data));

    window.location.href = "pages/allbooking/preview.html";

  });

  // ================= INIT =================
  updateUI();

});

function initMenu(){

  const heroMenuBtn = document.getElementById("heroMenuBtn");
  const headerMenuBtn = document.querySelector(".header .menu");
  const closeMenuBtn = document.querySelector(".close-btn");

  // OPEN
  heroMenuBtn && heroMenuBtn.addEventListener("click", openMenu);
  headerMenuBtn && headerMenuBtn.addEventListener("click", openMenu);

  // CLOSE
  closeMenuBtn && closeMenuBtn.addEventListener("click", () => {
    closeMenu();
  });
}


// ================= SCROLL ENTRANCE ANIMATIONS =================

(function(){
  var revealSelectors = '.scroll-reveal, .scroll-reveal-stagger, .scroll-slide-left, .scroll-scale';

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    function observeElements(){
      document.querySelectorAll(revealSelectors).forEach(function(el){
        if (!el.classList.contains('revealed')) {
          observer.observe(el);
        }
      });
    }

    // Run on load and after short delay for dynamically injected content
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeElements);
    } else {
      observeElements();
    }
    // Re-observe after heading loads
    setTimeout(observeElements, 1000);

  } else {
    // Fallback: reveal everything immediately
    document.querySelectorAll(revealSelectors).forEach(function(el){
      el.classList.add('revealed');
    });
  }
})();


// ================= HINDI / ENGLISH LANGUAGE TOGGLE =================

(function(){

  var translations = {
    en: {
      hero_title: "Explore Udaipur Wildlife Sanctuary",
      hero_subtitle: "Discover the untamed beauty of nature,<br>home to diverse wildlife in the heart of Udaipur",
      adult_ticket: "ADULT ENTRY<br><span>TICKET \u20B910</span>",
      child_ticket: "CHILD ENTRY<br><span>TICKET \u20B95</span>",
      boating_title: "Boating Experience",
      boating_text: "Enjoy peaceful rides on serene waters surrounded by nature and wildlife.",
      ev_title: "EV-CART Booking",
      ev_sub: "Book your eco vehicle ride easily",
      booking_title: "All In One Booking",
      booking_sub: "Book everything in one place",
      bird_title: "Udaipur Bird Sanctuary",
      wildlife_title: "Udaipur Wildlife Sanctuary",
      loc_heading: "LOCATION & TIMING",
      loc_holiday: "Holiday & Timing",
      loc_open: "<strong>Opening Time:</strong> 9 AM \u2013 5 PM",
      loc_closed: "Monday: Closed",
      loc_days: "Tuesday \u2013 Sunday: Open",
      fac_heading: "FACILITIES",
      gallery_heading: "Photo Gallery",
      rules_heading: "RULES & GUIDELINES",
      faq_heading: "FREQUENTLY ASKED QUESTIONS",
      rule_1: "Do Not Tease Animals",
      rule_2: "Maintain Safe Distance",
      rule_3: "No Outside Food",
      rule_4: "Use Dustbin",
      rule_5: "Follow Staff Instructions",
      rule_6: "Children must be supervised",
      action_location: "Location",
      action_contact: "Contact Us",
      action_complain: "Complain",
      footer_quick: "Quick Links",
      footer_whats: "What's Here",
      footer_programs: "Programs",
      footer_copy: "\u00A9 2026 Udaipur Wildlife Sanctuary",
      view_details: "VIEW MORE DETAILS",
      book_ticket: "BOOK TICKET",
      book_now: "BOOK NOW",
      view_all: "View All",
      view_more: "View More Details",
      coming_soon: "Coming Soon"
    },
    hi: {
      hero_title: "\u0909\u0926\u092F\u092A\u0941\u0930 \u0935\u0928\u094D\u092F\u091C\u0940\u0935 \u0905\u092D\u092F\u093E\u0930\u0923\u094D\u092F \u0915\u0940 \u0916\u094B\u091C \u0915\u0930\u0947\u0902",
      hero_subtitle: "\u092A\u094D\u0930\u0915\u0943\u0924\u093F \u0915\u0940 \u0905\u0926\u092E\u094D\u092F \u0938\u0941\u0902\u0926\u0930\u0924\u093E \u0915\u0940 \u0916\u094B\u091C \u0915\u0930\u0947\u0902,<br>\u0909\u0926\u092F\u092A\u0941\u0930 \u0915\u0947 \u0939\u0943\u0926\u092F \u092E\u0947\u0902 \u0935\u093F\u0935\u093F\u0927 \u0935\u0928\u094D\u092F\u091C\u0940\u0935\u094B\u0902 \u0915\u093E \u0918\u0930",
      adult_ticket: "\u0935\u092F\u0938\u094D\u0915 \u092A\u094D\u0930\u0935\u0947\u0936<br><span>\u091F\u093F\u0915\u091F \u20B910</span>",
      child_ticket: "\u092C\u093E\u0932 \u092A\u094D\u0930\u0935\u0947\u0936<br><span>\u091F\u093F\u0915\u091F \u20B95</span>",
      boating_title: "\u0928\u094C\u0915\u093E\u092F\u0928 \u0905\u0928\u0941\u092D\u0935",
      boating_text: "\u092A\u094D\u0930\u0915\u0943\u0924\u093F \u0914\u0930 \u0935\u0928\u094D\u092F\u091C\u0940\u0935\u094B\u0902 \u0938\u0947 \u0918\u093F\u0930\u0947 \u0936\u093E\u0902\u0924 \u092A\u093E\u0928\u0940 \u092A\u0930 \u0938\u0935\u093E\u0930\u0940 \u0915\u093E \u0906\u0928\u0902\u0926 \u0932\u0947\u0902\u0964",
      ev_title: "\u0908\u0935\u0940-\u0915\u093E\u0930\u094D\u091F \u092C\u0941\u0915\u093F\u0902\u0917",
      ev_sub: "\u0906\u0938\u093E\u0928\u0940 \u0938\u0947 \u0907\u0915\u094B \u0935\u093E\u0939\u0928 \u0930\u093E\u0907\u0921 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902",
      booking_title: "\u0911\u0932 \u0907\u0928 \u0935\u0928 \u092C\u0941\u0915\u093F\u0902\u0917",
      booking_sub: "\u0938\u092C \u0915\u0941\u091B \u090F\u0915 \u091C\u0917\u0939 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902",
      bird_title: "\u0909\u0926\u092F\u092A\u0941\u0930 \u092A\u0915\u094D\u0937\u0940 \u0905\u092D\u092F\u093E\u0930\u0923\u094D\u092F",
      wildlife_title: "\u0909\u0926\u092F\u092A\u0941\u0930 \u0935\u0928\u094D\u092F\u091C\u0940\u0935 \u0905\u092D\u092F\u093E\u0930\u0923\u094D\u092F",
      loc_heading: "\u0938\u094D\u0925\u093E\u0928 \u0914\u0930 \u0938\u092E\u092F",
      loc_holiday: "\u091B\u0941\u091F\u094D\u091F\u0940 \u0914\u0930 \u0938\u092E\u092F",
      loc_open: "<strong>\u0916\u0941\u0932\u0928\u0947 \u0915\u093E \u0938\u092E\u092F:</strong> \u0938\u0941\u092C\u0939 9 \u2013 \u0936\u093E\u092E 5",
      loc_closed: "\u0938\u094B\u092E\u0935\u093E\u0930: \u092C\u0902\u0926",
      loc_days: "\u092E\u0902\u0917\u0932\u0935\u093E\u0930 \u2013 \u0930\u0935\u093F\u0935\u093E\u0930: \u0916\u0941\u0932\u093E",
      fac_heading: "\u0938\u0941\u0935\u093F\u0927\u093E\u090F\u0902",
      gallery_heading: "\u092B\u094B\u091F\u094B \u0917\u0948\u0932\u0930\u0940",
      rules_heading: "\u0928\u093F\u092F\u092E \u0914\u0930 \u0926\u093F\u0936\u093E\u0928\u093F\u0930\u094D\u0926\u0947\u0936",
      faq_heading: "\u0905\u0915\u094D\u0938\u0930 \u092A\u0942\u091B\u0947 \u091C\u093E\u0928\u0947 \u0935\u093E\u0932\u0947 \u092A\u094D\u0930\u0936\u094D\u0928",
      rule_1: "\u091C\u093E\u0928\u0935\u0930\u094B\u0902 \u0915\u094B \u0928 \u091B\u0947\u0921\u093C\u0947\u0902",
      rule_2: "\u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0926\u0942\u0930\u0940 \u092C\u0928\u093E\u090F \u0930\u0916\u0947\u0902",
      rule_3: "\u092C\u093E\u0939\u0930 \u0915\u093E \u0916\u093E\u0928\u093E \u0928\u0939\u0940\u0902",
      rule_4: "\u0915\u0942\u0921\u093C\u0947\u0926\u093E\u0928 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902",
      rule_5: "\u0915\u0930\u094D\u092E\u091A\u093E\u0930\u093F\u092F\u094B\u0902 \u0915\u0947 \u0928\u093F\u0930\u094D\u0926\u0947\u0936 \u092E\u093E\u0928\u0947\u0902",
      rule_6: "\u092C\u091A\u094D\u091A\u094B\u0902 \u0915\u0940 \u0928\u093F\u0917\u0930\u093E\u0928\u0940 \u0915\u0930\u0947\u0902",
      action_location: "\u0938\u094D\u0925\u093E\u0928",
      action_contact: "\u0938\u0902\u092A\u0930\u094D\u0915 \u0915\u0930\u0947\u0902",
      action_complain: "\u0936\u093F\u0915\u093E\u092F\u0924",
      footer_quick: "\u0924\u094D\u0935\u0930\u093F\u0924 \u0932\u093F\u0902\u0915",
      footer_whats: "\u092F\u0939\u093E\u0901 \u0915\u094D\u092F\u093E \u0939\u0948",
      footer_programs: "\u0915\u093E\u0930\u094D\u092F\u0915\u094D\u0930\u092E",
      footer_copy: "\u00A9 2026 \u0909\u0926\u092F\u092A\u0941\u0930 \u0935\u0928\u094D\u092F\u091C\u0940\u0935 \u0905\u092D\u092F\u093E\u0930\u0923\u094D\u092F",
      view_details: "\u0935\u093F\u0935\u0930\u0923 \u0926\u0947\u0916\u0947\u0902",
      book_ticket: "\u091F\u093F\u0915\u091F \u092C\u0941\u0915 \u0915\u0930\u0947\u0902",
      book_now: "\u0905\u092D\u0940 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902",
      view_all: "\u0938\u092C \u0926\u0947\u0916\u0947\u0902",
      view_more: "\u0914\u0930 \u0926\u0947\u0916\u0947\u0902",
      coming_soon: "\u091C\u0932\u094D\u0926 \u0906 \u0930\u0939\u093E \u0939\u0948"
    }
  };

  var currentLang = localStorage.getItem('uws_lang') || 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('uws_lang', lang);

    var t = translations[lang];
    if (!t) return;

    // Update all data-i18n elements (text content)
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        if (el.getAttribute('data-i18n-html') !== null || key.indexOf('subtitle') > -1) {
          el.innerHTML = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });

    // Update all data-i18n-html elements (innerHTML)
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    // Update button active states
    var hindiBtn = document.getElementById('langHindiBtn');
    var englishBtn = document.getElementById('langEnglishBtn');
    if (hindiBtn && englishBtn) {
      hindiBtn.classList.toggle('lang-active', lang === 'hi');
      englishBtn.classList.toggle('lang-active', lang === 'en');
    }
  }

  // Event delegation for language buttons
  document.addEventListener('click', function(e) {
    var langBtn = e.target.closest('[data-lang]');
    if (langBtn) {
      var lang = langBtn.getAttribute('data-lang');
      applyLanguage(lang);
    }
  });

  // Apply saved language on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      applyLanguage(currentLang);
    });
  } else {
    applyLanguage(currentLang);
  }

})();
