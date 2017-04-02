// ==UserScript==
// @id              picasaweb
// @name            Picasa rss links generator
// @version         3.0
// @description     Generate link for album easy downloading
// @include         https://get.google.com/albumarchive/*
// @grant           GM_xmlhttpRequest
// ==/UserScript==

(function picasaweb_extention()
{
    var user = /\d{21}/.exec( window.location.href )[0];

    GM_xmlhttpRequest({
        method : "GET",
        url : 'https://picasaweb.google.com/data/feed/base/user/' + user,
        onload : function( data ){
            var pre = 'https://picasaweb.google.com/data/feed/base/user/';
            var post = '/?alt=rss&kind=photo&hl=en_US';

            if( data ){
                albumsList = document.createElement('div');
                albumsList.style = 'padding: 30px 0;';

                parser = new DOMParser();
                xmlDoc = parser.parseFromString(data.responseText, "text/xml");
                hrefs = xmlDoc.getElementsByTagName("summary");

                for (i=0; i<hrefs.length; i++) {
                    album = /\d{21}\/(.*)"><img/.exec(hrefs[i].childNodes[0].nodeValue)[1];
                    image = /src="(.*)" alt/.    exec(hrefs[i].childNodes[0].nodeValue)[1];

                    albumRss = pre + user + '/album/' + album + post;

                    innerDiv = document.createElement('div');
                    innerDiv.style = 'display: inline-block; padding: 10px;';

                    albumElement       = document.createElement('a');
                    albumElement.style = 'margin-top: -7px;padding-left: 10px;';
                    albumElement.href  = albumRss;

                    img = document.createElement('img');
                    img.src = image;

                    albumElement.appendChild(img);
                    innerDiv.    appendChild(albumElement);
                    albumsList.  appendChild(innerDiv);
                }

                var elem = document.querySelector('div[role=list]');
                elem.insertBefore(albumsList, elem.childNodes[0]);
            }
        }
    });
})();