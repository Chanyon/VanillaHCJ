"use strict";
const $ = (v,el=document) => el.querySelector(v);
const $$ = (v,el=document) => el.querySelectorAll(v);

const navList = $$('.nav');
const openBtn = $('.open-btn');
const closeBtn = $('.close-btn');

openBtn.addEventListener('click',() => {
    changeNav('open')
});
closeBtn.addEventListener('click',() => {
    changeNav('close')
})
function changeNav(type) {
    console.log(type);
    navList.forEach(nav => {
        nav.classList[type === 'open' ? 'add' : 'remove']('visible');
    });
}