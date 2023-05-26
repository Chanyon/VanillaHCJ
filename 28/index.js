const $ = (ele) => document.querySelector(ele);
const container = $("#toast-container");
const autoBtn = $("#autoBtn");
const notAutoBtn = $("#notAutoBtn");
const messages = [
  "消息内容1",
  "消息内容2",
  "消息内容3",
  "消息内容4",
  "消息内容5"
];
const type = ["success","info","error","warning","default"];
const getRandom = data => data[Math.floor(Math.random()*data.length)];
const createElement = el => document.createElement(el);
const randomRange = (min,max) => Math.floor(Math.random()*(max-min+1))+min;
const maxWidth = window.innerWidth,maxHeight = window.innerHeight-65;

let leftPositions = [],topPositions = [];
for(let i = 0;i<20;i++){
  leftPositions.push(randomRange(0,maxWidth));
  topPositions.push(randomRange(0,maxHeight));
}
autoBtn.addEventListener("click",()=>{
  const randomType = getRandom(type);
  const radomMessage = getRandom(messages);
  const left = getRandom(leftPositions);
  const top = getRandom(topPositions);
  createNotification({
    message:radomMessage,
    type:randomType,
    left,
    top
  },auto = true);
})

notAutoBtn.addEventListener("click",()=>{
  const randomType = getRandom(type);
  const radomMessage = getRandom(messages);
  const left = getRandom(leftPositions);
  const top = getRandom(topPositions);
  createNotification({
    message:radomMessage,
    type:randomType,
    left,
    top
  });
})


function createNotification(obj,auto = false,autoTime = 1000){
  const {message,type,left,top} = obj;
  let toastItem = createElement("div");
  let closeItem;
  if(!auto){
    closeItem = createElement("span");
    closeItem.innerHTML = "&times;";
    closeItem.className = "toast-close-btn";
  }
  toastItem.className = `toast toast-${type}`;
  toastItem.textContent = message;
  if(closeItem) toastItem.appendChild(closeItem);
  container.appendChild(toastItem);
  const leftValue = (left - toastItem.clientWidth) <= 0 ? 0:left - toastItem.clientWidth -30;
  const topValue = (top - toastItem.clientHeight) <= 0 ? 0:top - toastItem.clientHeight - 10;
  toastItem.style.left = leftValue+"px";
  toastItem.style.top = topValue+"px";
  if(auto){
    setTimeout(() =>{
      toastItem.remove();
    },autoTime);
  }else{
    closeItem.addEventListener("click",()=>{
      toastItem.remove();
    })
  }
}
