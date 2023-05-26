"use strict";
const $ = (v,el=document) => el.querySelector(v);
const $$ = (v,el=document) => el.querySelectorAll(v);

const codeContainer = $("#code-container");
const propObj = {
    placeholder: 0,
    min: 0,
    max: 10,
    required: true,
    type: "number",
};
window.onload = () => {
    createInputNumber(10);
}

function createInputNumber(n) {
    for (let i = 0; i < n; i++) {
        const item = document.createElement("input");
        // 动态设置属性
        Reflect.ownKeys(propObj).forEach(key => item.setAttribute(key,propObj[key]));
        item.classList.add("code");
        codeContainer.appendChild(item);
    }
    onFocusHandler($$(".code",codeContainer));
}

function onFocusHandler(nodeList) {
    onFocus(nodeList[0]);
    nodeList.forEach((node,idx) => {
        node.addEventListener("keydown",e => {
            const {key} = e;
            if(key >= 0 &&  key <= 9){
                nodeList[idx].value = "";
                setTimeout(()=>{
                    if(idx <= nodeList.length){
                        onFocus(nodeList[idx+1]);
                    }
                },0);
            }else{
                if(idx >= 0 && key === "Backspace"){
                    setTimeout(()=> onFocus(nodeList[idx-1]),0);
                }
            }
        });
    });
}
// 获取焦点
function onFocus(node){
    if(!node) return;
    const {nodeName} = node;
    return nodeName && nodeName.toLowerCase() === "input" && node.focus();
}