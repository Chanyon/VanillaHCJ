const $ = (ele) => document.querySelector(ele);
const $$ = (ele) => document.querySelectorAll(ele);

const nav = $("#nav");
const menu = $(".nav-menu");
const navList = $(".nav-list");
let display = false;
menu.addEventListener("click", () => {
    // const display = window.getComputedStyle(navList,null).getPropertyValue("display");
    if (!display) {
        navList.style.display = "block";
        navList.style.width = "100%";
        navList.style.height = "200px";
        display = true;
    } else {
        navList.style.display = "none";
        navList.style.width = "0";
        navList.style.height = "0";
        display = false;
    }
})

window.addEventListener("scroll", (e) => {
    if (window.scrollY > nav.offsetHeight + 100) {
        nav.classList.add("active");
    } else {
        nav.classList.remove("active");
    }
    
})