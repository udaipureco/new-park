/* ================================================================
   UWS Digital — Header Loader
   Fetches /components/heading.html, injects it, highlights active
   menu item, and handles navigation for all pages.
   ================================================================ */

(function(){
  'use strict';

  // ===== MENU STATE =====
  var isMenuOpen = false;
  var _menuOpenThrottle = false; // prevent rapid double-clicks

  function openMenu(){
    if(_menuOpenThrottle) return;
    var menu = document.getElementById('menu');
    if(menu && !isMenuOpen){
      menu.classList.add('active');
      document.body.style.overflow = 'hidden';
      isMenuOpen = true;
      // replaceState instead of pushState: no extra history entry, no back-jump
      history.replaceState({ menu: true }, '');
      _menuOpenThrottle = true;
      setTimeout(function(){ _menuOpenThrottle = false; }, 400);
    }
  }

  function closeMenu(){
    var menu = document.getElementById('menu');
    if(menu && isMenuOpen){
      menu.classList.remove('active');
      document.body.style.overflow = 'auto';
      isMenuOpen = false;
      // Clear menu flag from current history state — no history.back() needed
      history.replaceState({}, '');
    }
  }

  // Expose globally
  window.openMenu  = openMenu;
  window.closeMenu = closeMenu;
  Object.defineProperty(window, 'isMenuOpen', {
    get: function(){ return isMenuOpen; },
    set: function(v){ isMenuOpen = v; }
  });

  // ===== goHome — works from any page =====
  window.goHome = function(){
    closeMenu();
    if(isOnHomepage()){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/';
    }
  };

  // ===== Detect if current page is homepage =====
  function isOnHomepage(){
    var path = window.location.pathname;
    return path === '/' || path === '/index.html';
  }

  // ===== Menu navigation map =====
  var menuNavMap = {
    home:        { section: null,           page: '/' },
    booking:     { section: 'booking',      page: '/#booking' },
    boating:     { section: 'boating',      page: '/#boating' },
    ev:          { section: 'ev',           page: '/#ev' },
    bicycle:     { section: null,           page: '/pages/bicycle/rent.html' },
    attractions: { section: 'attractions',  page: '/#attractions' },
    eco:         { section: null,           page: '/pages/ecohut/ecohut.html' },
    gallery:     { section: 'gallery',      page: '/pages/gallery/gallery.html' },
    plan:        { section: null,           page: '/' },
    location:    { section: 'location',     page: '/#location' },
    pricing:     { section: 'booking',      page: '/#booking' },
    rules:       { section: 'rules',        page: '/#rules' },
    contact:     { section: null,           page: '/pages/contact/contact.html' },
    feedback:    { section: null,           page: '/pages/complaint/complaint.html' },
    about:       { section: null,           page: '/' }
  };

  // ===== Scroll to section (homepage only) =====
  function scrollToSection(id){
    closeMenu();
    setTimeout(function(){
      var section = document.getElementById(id);
      if(section){
        var header = document.querySelector('.header');
        var offset = header ? header.offsetHeight + 20 : 80;
        var y = section.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 300);
  }

  // Expose for use in main.js
  window.scrollToSection = scrollToSection;
  window.scrollToLocation = function(){
    if(isOnHomepage()){
      scrollToSection('location');
    } else {
      window.location.href = '/#location';
    }
  };

  // ===== Active menu highlight =====
  function highlightActiveMenu(){
    var path = window.location.pathname;
    var items = document.querySelectorAll('.menu-list li[data-menu]');
    var activeKey = null;

    if(path === '/' || path === '/index.html'){
      activeKey = 'home';
    } else if(path.indexOf('/gallery/') > -1){
      activeKey = 'gallery';
    } else if(path.indexOf('/boating/') > -1){
      activeKey = 'boating';
    } else if(path.indexOf('/entry/') > -1){
      activeKey = 'booking';
    } else if(path.indexOf('/ev/') > -1){
      activeKey = 'ev';
    } else if(path.indexOf('/bicycle/') > -1){
      activeKey = 'bicycle';
    } else if(path.indexOf('/ecohut/') > -1){
      activeKey = 'eco';
    } else if(path.indexOf('/cafeteria/') > -1){
      activeKey = 'plan';
    } else if(path.indexOf('/parking/') > -1){
      activeKey = 'plan';
    } else if(path.indexOf('/contact/') > -1){
      activeKey = 'contact';
    } else if(path.indexOf('/complaint/') > -1){
      activeKey = 'feedback';
    }

    items.forEach(function(item){
      if(item.getAttribute('data-menu') === activeKey){
        item.classList.add('menu-active');
      }
    });
  }

  // ===== Single delegated click handler (ONE listener, no duplicates) =====
  document.addEventListener('click', function(e){

    // Open menu — hamburger button (with throttle guard in openMenu)
    if(e.target.closest('.header-menu-trigger') || e.target.closest('#heroMenuBtn')){
      openMenu();
      return;
    }

    // Close menu — close button inside menu panel
    if(e.target.closest('.close-btn') && e.target.closest('.menu-panel')){
      closeMenu();
      return;
    }

    // Close menu — click backdrop overlay
    var menuOverlay = document.getElementById('menu');
    if(menuOverlay && e.target === menuOverlay){
      closeMenu();
      return;
    }

    // Menu item click
    var menuItem = e.target.closest('.menu-list li[data-menu]');
    if(menuItem){
      var key = menuItem.getAttribute('data-menu');
      var nav = menuNavMap[key];
      if(!nav) return;

      if(isOnHomepage() && nav.section){
        scrollToSection(nav.section);
      } else {
        closeMenu();
        window.location.href = nav.page;
      }
      return;
    }

  });

  // ===== Back button: close menu if open, otherwise let browser navigate back =====
  window.addEventListener('popstate', function(){
    if(isMenuOpen){
      closeMenu();
    }
  });

  // ===== Load the heading component =====
  function loadHeader(){
    var container = document.getElementById('headerContainer');
    if(!container) return;

    fetch('/components/heading.html')
      .then(function(res){ return res.text(); })
      .then(function(html){
        container.innerHTML = html;
        highlightActiveMenu();
      })
      .catch(function(err){
        console.warn('Header load failed:', err);
        container.innerHTML = '<header class="header" style="text-align:center;padding:0.875rem 1rem;color:#efe6d6">UDAIPUR WILDLIFE SANCTUARY</header>';
      });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }

})();
