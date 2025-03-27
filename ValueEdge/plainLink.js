// ==UserScript==
// @name         ValueEdge: Add Plain Link
// @namespace    https://github.com/ahr-huber/monkey-scripts/
// @version      2025-03-27
// @description  Adds a plain <a> tag to the link popup.
// @license      MIT
// @author       Andreas Huber
// @match        https://*.saas.microfocus.com/*
// @grant        none
// @sandbox      DOM
// ==/UserScript==

(function() {
    'use strict';

    function openLinkInNewWindow(){
        const description = document.querySelector(".fr-wrapper");
        if(description == null){
            window.setTimeout(()=>{openLinkInNewWindow()}, 500);
        }else{
            const links = document.querySelectorAll(".fr-wrapper a");
            links.forEach((link) =>{
                link.addEventListener("click", () =>{
                    document.querySelectorAll(".fr-buttons a").forEach(a => a.remove());
                    _addPlainLinkToButtons(link.getAttribute("href"));
                });
            });
        }
    }

    function _addPlainLinkToButtons(href) {
        const buttons = document.querySelector(".fr-buttons");
        if (buttons == null) {
            window.setTimeout(()=>{_addPlainLinkToButtons(href)}, 50);
        }else{
            document.querySelector(".fr-buttons").style="display:flex; align-items: center;"
            const a = document.createElement("a");
            a.textContent = "plain";
            a.setAttribute("href", href);
            a.setAttribute("title", href);
            a.addEventListener("mouseup", () => {
                document.querySelector(".fr-popup.fr-active").classList.remove("fr-active"); // close popup
            });
            document.querySelector(".fr-buttons").appendChild(a);
        }
    }

    openLinkInNewWindow();
})();
