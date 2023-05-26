"use strict";

const $ = (v,el=document) => el.querySelector(v);
const $$ = (v,el=document) => el.querySelectorAll(v);

const numGroup = $("#num-group");
const counter = $("#counter");
const final = $("#final");
const replyBtn = $("#replay");

function createNum(n){
    let spanHtml = "";
    for(let i=n-1; i>0; i--){
        spanHtml += `<span>${i}</span>`;
    }
    numGroup.innerHTML = spanHtml;
    runAnimation();
}
function runAnimation(){
    const numArr = $$("span",numGroup);
    const nextToLast = numArr.length -1;
    numArr[0].classList.add("in");
    numArr.forEach((num,idx) => {
        num.addEventListener("animationend",e=>{
            const {animationName} = e;
            if(animationName === "goIn" && idx !== nextToLast){
                num.classList.remove("in");
                num.classList.add("out");
            }else if(animationName === "goOut" && num.nextElementSibling){
                num.nextElementSibling.classList.add("in");
            }else{
                counter.classList.add("hide");
                final.classList.add("show");
            }
        })
    })
}
function resetAnimation(){
    counter.classList.remove("hide");
    final.classList.remove("show");
    const numArr = $$('span',numGroup);
    if(numArr.length > 0){
        numArr.forEach(num => num.classList.value = "");
        numArr[0].classList.add("in");
    }
}
window.onload = () => {
    createNum(10);
    replyBtn.addEventListener("click",()=>{
        resetAnimation();
        runAnimation();
    })
}
