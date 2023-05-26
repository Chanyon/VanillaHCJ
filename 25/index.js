const $ = (ele) => document.querySelector(ele);
const $$ = (ele) => document.querySelectorAll(ele);

const leftSlide = $(".left-slide");
const slideContainer = $(".slide-container");
const rightSlide = $(".right-slide");
const arrowDown = $(".arrow-down-btn");
const arrowUp = $(".arrow-up-btn");
let slideLeftItems;
const slideRightItems = $$(".right-slide-item");
let L;
let currentIndex = 0,
    width = window.innerWidth,
    position = 0;

function isHorizontal() {
    return width <= 869;
}

function setPositionValue() {
    position = isHorizontal() ? width : window.innerHeight;
}

function setPosition(el) {
    let itemWidth, slideLeftWidth, slideRightWidth, left, top;
    if (isHorizontal()) {
        itemWidth = width + "px";
        slideLeftWidth = slideRightWidth = width * L + "px";
        left = -(width * (L - 1)) + "px";
        top = 0;
    }else{
        itemWidth = "100%";
        slideLeftWidth ="35%";
        slideRightWidth ="65%";
        left = 0;
        top =`-${(L-1)*100}vh`;
    }
    [...slideLeftItems,...slideRightItems].forEach(item =>item.style.width = itemWidth);
    leftSlide.style.width = slideLeftWidth;
    rightSlide.style.width = slideRightWidth;
    [{prop:"left",val:left},{prop:"top",val:top}].forEach(item => el.style[item.prop] = item.val);
}
function changeSlide(direction){
    if(direction === "up"){
        currentIndex += 1;
        console.log(currentIndex);
        if(currentIndex > L -1){
            currentIndex = 0;
        }
    }
    if(direction === "down"){
        currentIndex -= 1;
        if(currentIndex < 0){
            currentIndex = L -1;
        }
    }
    setTransform()
}
function setTransform(){
    let translate = isHorizontal() ? "translateX" : "translateY";
    let val = `${position*currentIndex}`
    leftSlide.style.transform = `${translate}(${val}px)`;
    rightSlide.style.transform = `${translate}(-${val}px)`;
}

function setHtml() {
    const leftObj = [{
            name: "美女1",
            description: "这是一个美女"
        },
        {
            name: "美女2",
            description: "这是一个美女"
        },
        {
            name: "美女3",
            description: "这是一个美女"
        },
        {
            name: "美女4",
            description: "这是一个美女"
        }
    ]
    let html = '';
    leftObj.forEach(item => {
        html += `
    <div class="left-slide-item">
    <h1>${item.name}</h1>
    <p>${item.description}</p>
    </div>
    `
    })
    leftSlide.innerHTML = html;
}
window.onload = function () {
    setHtml();
    slideLeftItems = $$(".left-slide-item");
    L = slideLeftItems.length;
    setPositionValue();
    setPosition(leftSlide);
    window.addEventListener("resize",()=>{
        width = window.innerWidth;
        setPositionValue();
        setPosition(leftSlide);
        setTransform();
    })
    arrowDown.addEventListener("click",()=> changeSlide("down"));
    arrowUp.addEventListener("click",()=> changeSlide("up"));
}