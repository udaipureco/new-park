/* ================================================================
   UWS Digital — Shared State Manager
   Single source of truth for booking data across all pages.
   Key: "uws_booking_data"
   ================================================================ */

(function(w){
  'use strict';

  var KEY = 'uws_booking_data';

  /* ---- Default empty state (ALL ZEROS — never pre-filled) ---- */
  var DEFAULT = {
    entry:   { adult: 0, child: 0 },
    boating: { motor: 0, shikara: 0, paddle: 0 },
    ev:      { ride: 0 },
    visitDate: ''
  };

  /* ---- Read state (always returns full object) ---- */
  function get(){
    try {
      var raw = localStorage.getItem(KEY);
      if(!raw) return deepCopy(DEFAULT);
      var d = JSON.parse(raw);
      return {
        entry:   Object.assign({}, DEFAULT.entry,   d.entry   || {}),
        boating: Object.assign({}, DEFAULT.boating, d.boating || {}),
        ev:      Object.assign({}, DEFAULT.ev,      d.ev      || {}),
        visitDate: d.visitDate || ''
      };
    } catch(e){
      return deepCopy(DEFAULT);
    }
  }

  /* ---- Write state (merges into existing) ---- */
  function set(partial){
    var current = get();
    if(partial.entry)   Object.assign(current.entry,   partial.entry);
    if(partial.boating) Object.assign(current.boating, partial.boating);
    if(partial.ev)      Object.assign(current.ev,      partial.ev);
    if(partial.visitDate !== undefined) current.visitDate = partial.visitDate;
    localStorage.setItem(KEY, JSON.stringify(current));
    return current;
  }

  /* ---- Clear state — removes key from localStorage ---- */
  function clear(){
    localStorage.removeItem(KEY);
  }

  /* ---- Reset state — writes default zeros (keeps key, all values 0) ---- */
  function reset(){
    localStorage.setItem(KEY, JSON.stringify(deepCopy(DEFAULT)));
  }

  /* ---- clearBookingData — global helper called after successful booking ---- */
  function clearBookingData(){
    reset();
    localStorage.removeItem('uwsBookingData');
    localStorage.removeItem('allBookingData');
    localStorage.removeItem('uwsBookingId');
  }

  /* ---- Deep copy helper ---- */
  function deepCopy(obj){
    return JSON.parse(JSON.stringify(obj));
  }

  /* ---- Track current page in sessionStorage ---- */
  function trackPage(){
    try {
      var path = w.location.pathname + w.location.search;
      sessionStorage.setItem('uws_current_page', path);
    } catch(e){}
  }

  /* ---- Detect if current load is a browser refresh ---- */
  function isPageRefresh(){
    try {
      if(w.performance && w.performance.getEntriesByType){
        var entries = w.performance.getEntriesByType('navigation');
        if(entries.length) return entries[0].type === 'reload';
      }
      if(w.performance && w.performance.navigation){
        return w.performance.navigation.type === 1;
      }
    } catch(e){}
    return false;
  }

  /* ---- Expose globally ---- */
  w.UWSState = {
    get: get,
    set: set,
    clear: clear,
    reset: reset,
    clearBookingData: clearBookingData,
    trackPage: trackPage,
    isPageRefresh: isPageRefresh
  };

  /* ---- Expose clearBookingData at window level (task requirement) ---- */
  w.clearBookingData = clearBookingData;

})(window);
