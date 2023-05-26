"use strict";
const $ = (v,el=document) => el.querySelector(v);
const $$ = (v,el=document) => el.querySelectorAll(v);

const ratings = $$('.ratings-container .rating');
const send = $('#send');
const back = $('#back');
const sendPage = $('.send-page');
const receivePage = $('.receive-page');
const selectRatingItem = $('#selectRating');

let selectRating = $('.rating.active').innerText;

ratings.forEach((item) => {
    item.addEventListener('click',() => {
        removeClass(ratings);
        item.classList.add('active');
        selectRating = item.innerText;
    });
})

send.addEventListener('click',() => {
    selectRatingItem.innerText = selectRating;
    sendPage.classList.add('hide');
    receivePage.classList.remove('hide');
})

back.addEventListener('click',() => {
    // selectRating = $(".rating.active").innerText;
    // selectRatingItem.innerText = $(".rating.active").innerText;
    sendPage.classList.remove('hide');
    receivePage.classList.add('hide')
})
console.log(selectRatingItem);
function removeClass(elements) {
    for (let ele of Array.from(elements)) {
        ele.classList.remove('active');
    }
}