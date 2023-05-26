const $ = (ele) => document.querySelector(ele);
const $all = (ele) => document.querySelectorAll(ele);

const nav = $('#nav');
const toggled = $('#toggle');
toggled.addEventListener('click',()=>nav.classList.toggle('active'));