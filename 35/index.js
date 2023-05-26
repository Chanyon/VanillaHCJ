"use strict";
const $ = (v,el=document) => el.querySelector(v);
const $$ = (v,el=document) => el.querySelectorAll(v);

const carousel_container = $(".carousel-container");
const carousel = $("#carousel");
const carousel_img_items = $$("img",carousel);
const prev = $("#prev"),next = $("#next");

let current_idx = 0;
let img_items_len = carousel_img_items.length;

let interval = setInterval(() => {
    autoRun();
},2000);

function createImg() {
    let img_first = carousel_img_items[0];
    let img0 = img_first.cloneNode(true);
    let img_last = carousel_img_items[img_items_len - 1].cloneNode(true);
    carousel.appendChild(img0);
    carousel.insertBefore(img_last,img_first);
}

function changeCarousel() {
    if(current_idx > img_items_len - 1) {
        current_idx = 0;
    }
    if(current_idx < 0) {
        current_idx = img_items_len - 1;
    }
    let translate_x = -current_idx * carousel_container.offsetWidth;
    carousel.style.transform = `translateX(${translate_x}px)`;
}

function autoRun() {
    current_idx += 1;
    changeCarousel();
    
}

function reset() {
    clearInterval(interval);
    interval = setInterval(() => {
        autoRun();
    },1500);
}

window.onload = () => {
    createImg();
    prev.addEventListener("click",(e) =>{
        e.preventDefault();
        current_idx -= 1;
        changeCarousel();
        reset();
    });
    next.addEventListener("click",(e) =>{
        e.preventDefault();
        current_idx += 1;
        changeCarousel();
        reset();
    });
}