const $ = (ele) => document.querySelector(ele);
const $$ = (ele) => document.querySelectorAll(ele);

const background = $("#background");
const prev = $("#prev");
const next = $("#next");
const slideItems = $$(".slide-container > .slide-item");
let currentActive = 0;

function setBackgroundImage() {
    if (!slideItems[currentActive]) return;
    let url = slideItems[currentActive].style.backgroundImage;
    background.style.backgroundImage = url;
}

function setSlideItem() {
    const currentSlide = slideItems[currentActive];
    if (!currentSlide) return;
    // const sibling = [].filter.call(slideItems,slide => slide !== currentSlide);
    // currentSlide.classList.add('active');
    slideItems.forEach(slide => {
        slide.classList.remove('active');
    });
    currentSlide.classList.add('active');

}

function slideHandler() {
    setBackgroundImage();
    setSlideItem();
}

function prevHandler() {
    prev.addEventListener('click', () => {
        if (currentActive <= 0) {
            currentActive = slideItems.length - 1;
        } else {
            currentActive -= 1;
        }
        slideHandler();
        console.log(currentActive);

    });
}

function nextHandler() {
    next.addEventListener("click", () => {
        if (currentActive >= slideItems.length - 1) {
            currentActive = 0;
        } else {
            currentActive += 1;
        }
        slideHandler();
        console.log(currentActive);

    })
}
window.onload = function () {
    slideHandler();
    prevHandler();
    nextHandler();
}