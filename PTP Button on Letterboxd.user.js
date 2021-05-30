// ==UserScript==
// @name         PTP Button on Letterboxd
// @version      1.0.0
// @namespace    https://github.com/chrisjp
// @description  Adds a button on Letterboxd film pages linking to the film's PTP page.
// @license      MIT

// @updateURL    https://raw.githubusercontent.com/chrisjp/ptpBtnOnLB/master/PTP%20Button%20on%20Letterboxd.user.js
// @downloadURL  https://raw.githubusercontent.com/chrisjp/ptpBtnOnLB/master/PTP%20Button%20on%20Letterboxd.user.js
// @homepageURL  https://github.com/chrisjp/ptpBtnOnLB
// @supportURL   https://github.com/chrisjp/ptpBtnOnLB/issues

// @include      https://letterboxd.com/film/*
// @include      https://letterboxd.com/film/*/crew/*
// @include      https://letterboxd.com/film/*/studios/*
// @include      https://letterboxd.com/film/*/genres/*
// @exclude      https://letterboxd.com/film/*/views/*
// @exclude      https://letterboxd.com/film/*/lists/*
// @exclude      https://letterboxd.com/film/*/likes/*
// @exclude      https://letterboxd.com/film/*/fans/*
// @exclude      https://letterboxd.com/film/*/ratings/*
// @exclude      https://letterboxd.com/film/*/reviews/*
// ==/UserScript==

(function() {
    'use strict';

    var imdbId = getImdbId();
    if(imdbId)
    {
        addPtpButton(imdbId);
    }
})();

// Get the IMDb ID of a film from its link on the page
function getImdbId()
{
    var imdbId = false;
    // loop through elements with the .micro-button class and check the data-track-action attribute
    Array.from(document.querySelectorAll('.micro-button')).forEach(function(button) {
        if (button.dataset.trackAction == 'IMDb')
        {
            imdbId = button.href.split('/title/')[1].replace('/maindetails', '');
        }
    });
    return imdbId;
}

// Add a button linking to PTP next to the IMDb and TMDB buttons
function addPtpButton(imdbId)
{
    // Create an anchor element linking to the PTP search page
    var linkPtp = document.createElement("a");
    linkPtp.innerHTML = "PTP";
    linkPtp.classList.add('micro-button');
    linkPtp.href = 'https://passthepopcorn.me/torrents.php?action=advanced&searchstr=' + imdbId + '&order_by=relevance';

    // Add the element after the existing .micro-button's
    var microButtons = document.querySelectorAll(".micro-button");
    microButtons[microButtons.length-1].after(linkPtp);
    microButtons[microButtons.length-1].after("\n");
}
