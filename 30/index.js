const $ = (ele) => document.querySelector(ele);

const count = $("#count");
const love = $("#love");
const btn = $("#clickLoveBtn");

let clickTime = 0,timesClicked = 0;

window.onload = () => {
  love.addEventListener("click", (e) => {
    clickHandler(e);
  });
  btn.addEventListener("click", (e) => {
    clickHandler(e);
  })
}

function clickHandler(e) {
  if(clickTime === 0) clickTime = Date.now();
  if(Date.now() - clickTime < 400) {
    createHeart(e);
    clickTime = 0;
  }else{
    clickTime = Date.now();
  }
}

function createHeart(e) {
  const heart = document.createElement("div");
  heart.className = "heart grow";
  let x = e.clientX,y = e.clientY;
  let leftOffset = e.target.offsetLeft,topOffset = e.target.offsetTop;
  let xInside = x - leftOffset,yInside = y - topOffset;
  heart.style.left = `${xInside}px`;
  heart.style.top = `${yInside}px`;
  love.appendChild(heart);
  count.textContent = ++timesClicked;
  setTimeout(()=> heart.remove(),2000);
}