"use strict";
const $ = (v,el=document) => el.querySelector(v);
const $$ = (v,el=document) => el.querySelectorAll(v);

const nav_items = $("#background");
const carousel = $("#password");

password.addEventListener("input",e => {
    const {value} = e.currentTarget;
    const blur = 20 - value.length * 2;
    background.style.filter =  `blur(${blur}px)`;
})