const $= v => document.querySelector(v);
const searchBtn = $("#searchBtn");
const searchContaniner=$(".search");
const searchInput = $(".input");

searchBtn.addEventListener('click',()=>{
    searchContaniner.classList.toggle('active');
    searchInput.focus();
})
