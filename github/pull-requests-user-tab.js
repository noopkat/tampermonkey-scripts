// ==UserScript==
// @name         Github User Pull Requests Tab
// @namespace    http://noopkat.com
// @version      0.1
// @description  Creates a new submenu tab on the 'pull requests' page, that filters open pull requests by user. Handy if you want to see all pull requests open on all of your repos.
// @author       Suz Hinton aka @noopkat
// @match        *github.com/pulls*
// @grant        none
// ==/UserScript==

(function() {
  var username = document.querySelector('meta[name="user-login"]').getAttribute('content');
  var newLink = '<a href="/pulls?q=is%3Aopen+is%3Apr+user%3A' + username +'" id="' + username + '-user-tab" aria-label="Pull Requests for you" class="js-selected-navigation-item subnav-item" data-selected-links="dashboard_mentioned /pulls?q=is%3Aopen+is%3Apr+user%3A' + username + '" role="tab">User</a>';
  var container = document.getElementById('js-pjax-container');

  function insertUserTab() {
    container.querySelector('.subnav-links').innerHTML += newLink;
  }

  insertUserTab();

  var observer = new MutationObserver(function(mutations) {
    for (var i = 0; i < mutations.length; i += 1) {
      if (mutations[i].removedNodes.length) {
        insertUserTab();
        break;
      }
    };
  });

  var config = {attributes: true, childList: true, characterData: true};
  observer.observe(container, config);
})();
