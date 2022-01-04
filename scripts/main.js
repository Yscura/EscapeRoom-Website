/* eslint-env browser */

(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin.
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        
        if (navigator.serviceWorker.controller) {
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  var audio_correct = document.getElementById("a_correct")
  var audio_wrong = document.getElementById("a_wrong")
  var delay = 1500;
  document.addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
      var page = getPage();
      checkpwd(page);
    }
  });


  function getPage(){
    var href = window.location.href;
    var page_t = href.slice(-7, -6);
    var page_e = href.slice(-6, -5);

    if(page_t == "e"){
      return page_e;
    }
    else{
      return page_t + page_e;
    }

  }

  function getPagePw(p){
    var pw;
    switch(p){
      case "1":
        //Informer
        pw = "49";
        break;

      case "2":
        //Sagrada familia
        pw = "172,5";
        break;
      
      case "3":
        //Periodic table
        pw = "89285531";
        break;

      case "4":
        //Count numbers
        pw = "13112221";
        break;

      case "5":
        //Reciept
        pw = "ratatouille";
        break;

      case "6":
        //Sunshine
        pw = "war";
        break;

      case "7":
        //Binary stongehenge
        pw = "stonehenge";
        break;

      case "8":
        //Mumin
        pw = "lilla my";
        break;

      case "9":
        //Davinci
        pw = "";
        break;

      case "10":
        //Start text
        pw = "think";
        break;

    }
    return pw;
  }
  

  function checkpwd(page){
    var pagePassword = getPagePw(page);
    var password = document.getElementById("psw").value;
    var pNext = parseInt(page) + 1;

    if(password == pagePassword){
      audio_correct.play();
      setTimeout(function(){
        window.location.href = "page" + pNext + ".html";
      }, delay);
    }
    else{
      if(password != ""){
        audio_wrong.play();
        document.getElementById("psw").value = '';
      }
    }
  }

  
})();
