"use strict";
const $ = (v,el=document) => el.querySelector(v);
const $$ = (v,el=document) => el.querySelectorAll(v);

const nav_items = $$("#nav>ul li");
const carousel = $$(".carousel-item");

nav_items.forEach((item,idx) => {
    item.addEventListener("click",()=>{
        hideAllItems(nav_items);
        hideAllItems(carousel);
        item.classList.add("active");
        carousel[idx].classList.add("active");
    })
})

function hideAllItems(elements,className = "active"){
    elements.forEach(item => item.classList.remove(className))
}