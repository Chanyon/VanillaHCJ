const $ = (ele) => document.querySelector(ele);
const $$ = (ele) => document.querySelectorAll(ele);

const dragItems = $$(".drag-item");
const dragFill = $(".drag-fill")

function random(n){
    return Math.floor(Math.random()*n);
}
function setFillImage(){
    dragFill.style.backgroundImage = `url("https://www.eveningwater.com/my-web-projects/js/26/img/${random(15)}.jpg")`;
}

function on(ele,type,handler,useCapture = false){
    if(ele && type && handler){
        ele.addEventListener(type, handler, useCapture);
    }
}

function off(ele,type,handler,useCapture = false){
    if(ele && type && handler){
        ele.removeEventListener(type, handler, useCapture);
    }
}

function onDragStart(){
    this.classList.add('drag-move');
    setTimeout(()=> this.className = "invisible",200);
}

function onDragEnd(){
    this.classList.add("drag-fill");
}
function onDragOver(e){
    e.preventDefault();	
}
function onDragEnter(e){
    e.preventDefault();
    this.classList.add('drag-active')
}
function onDragLeave(){
    this.className = "drag-item";
}
function onDrop(){
    this.className = "drag-item";
    this.appendChild(dragFill);
}
window.onload = ()=>{
    setFillImage();
    on(dragFill,'dragstart',onDragStart);
    on(dragFill,'dragend',onDragEnd);
    dragItems.forEach(item => {
        on(item,'dragover',onDragOver);
        on(item,'dragenter',onDragEnter);
        on(item,'dragleave',onDragLeave);
        on(item,'drop',onDrop);
    })
}