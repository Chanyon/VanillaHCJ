"use strict";

const $ = (v,el=document) => el.querySelector(v);
const $$ = (v,el=document) => el.querySelectorAll(v);

const url = 'https://source.unsplash.com/random/';
const container = $(".container"),
changeBtn = $("#changeBtn"),
backBtn = $(".back"),
flexCenter = $(".flex-center");

function getRandomValue(min,max) {
    return Math.floor(Math.random() * (max - min) + min +1)+300;
}

function getRandomSize() {
    return `${getRandomValue(0,10)}x${getRandomValue(0,10)}`;
}

function Load(rows = 5,col = 3) {
    container.innerHTML = '';
    // container.style.maxWidth = `${col * }`
    for (let i = 0; i < rows * col; i++) {
        const img = document.createElement('img');
        img.src = `${url}${getRandomSize()}`;
        img.alt = "random image - "+i;
        img.loading = "lazy";
        container.appendChild(img);
    }
}

window.onload = function(){
    Load();
    changeBtn.addEventListener("click",() => Load());
    window.addEventListener("scroll",() => {
        const {scrollTop,scrollHeight} = document.documentElement;
        const {clientHeight} = flexCenter;
        let ret = flexCenter.getBoundingClientRect().top + window.innerHeight;
        backBtn.style.display = /*scrollTop + clientHeight > scrollHeight*/ ret <= 0? "block": "none";
    });
    backBtn.addEventListener("click",() => {
        document.documentElement.scrollTop = 0;
    })
}

