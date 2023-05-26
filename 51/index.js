"use strict";

const $ = (v,el=document) => el.querySelector(v);
const $$ = (v,el=document) => el.querySelectorAll(v);

const vegetables = ["川味火锅", "水煮鱼","回锅肉","麻婆豆腐", "鱼香肉丝","水煮肉片","辣子鸡", "酸菜鱼","宫保鸡丁","甜皮鸭"];

const draggleList = $("#draggle-list");
const check= $(".check-btn");

const listItem = [];
let draggleStartIndex = 0;

function createList() {
    vegetables.map((item,idx) => ({value: item,sort: idx+Math.random()}))
    .sort((a,b) => a.sort - b.sort)
    .map(item => item.value)
    .forEach((item,idx) => {
        const liItem = document.createElement("li");
        liItem.setAttribute("data-index",idx);
        liItem.innerHTML = `
            <span class="number">${idx+1}</span>
            <div class="draggable">
                <p class="vegetable-name">${item}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
        listItem.push(liItem);
        draggleList.appendChild(liItem);
    });
    draggableHandler();
}

createList();

function draggableHandler(){
    const dragItems = $$(".draggable");
    dragItems.forEach(item => {
        item.addEventListener("dragstart",function(e){
            draggleStartIndex = +this.parentElement.getAttribute("data-index");
            console.log(draggleStartIndex);
        });
    });
    listItem.forEach(item => {
        item.addEventListener("dragover",function(e){
            e.preventDefault();
        });
        item.addEventListener("dragenter",function(e){
            this.classList.add("over");
        });
        item.addEventListener("dragleave",function(e){
            this.classList.remove("over");
        });
        item.addEventListener("drop",function(e){
            const dragEndIndex = +this.getAttribute("data-index");
            swap(draggleStartIndex, dragEndIndex);
            this.classList.remove("over");
        });
    });
}

function swap(start,end){
    const fromItem= listItem[start].querySelector(".draggable");
    const toItem = listItem[end].querySelector(".draggable");
    listItem[start].appendChild(toItem);
    listItem[end].appendChild(fromItem);
}
