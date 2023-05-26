const $ = (ele) => document.querySelector(ele);
const $$ = (ele) => document.querySelectorAll(ele);

const btn = $("#btn");

btn.addEventListener("click",function(e){
    let x = e.clientX;
    let y = e.clientY;
    let left = this.offsetLeft;
    let top = this.offsetTop;
    
    let  circleX = x - left;
    let circleY = y - top;
    console.log(left,top);
    const span = document.createElement("span");
    span.classList.add('circle');
    span.style.left = circleX + "px";
    span.style.top = circleY + "px";
    btn.appendChild(span);
    setTimeout(() => span.remove(),1000);
});

function debounce(fn,wait) {
    let timer = null;
    return function() {
        if(timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn,wait);
    }
}