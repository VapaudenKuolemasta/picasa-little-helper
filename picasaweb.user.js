// ==UserScript==
// @id              picasaweb
// @name            Picasa little helper
// @version         2.0
// @description     Album download helper
// @include         https://picasaweb.google.com/*
// @match           https://picasaweb.google.com/*
// ==/UserScript==

(function picasaweb_extention(){
    var links = document.querySelectorAll('img[class^="SPRITE_"]');
    var link_b = 'https://picasaweb.google.com/data/feed/base/user/';
    var link_f = '?alt=rss&kind=photo&hl=en_US';
    
    
    for (i=0; i<links.length; i++) {
        var parts = /google\.com\/(\d+)\/(.+)/.exec( links[i].parentElement.getAttribute('href').split('?')[0] );
        if( parts ){
            links[i].parentElement.setAttribute('href', link_b + parts[1] + '/album/' + parts[2] + link_f);
            links[i].parentElement.parentElement.parentElement.getElementsByClassName('gphoto-album-cover-title')[0].textContent = _user.nickname + ' (' + _user.name + ')\\' + parts[2];
        }
    }
})();