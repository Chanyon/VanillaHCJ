const $ = (ele) => document.querySelector(ele);

const count = $("#count");
const love = $("#love");
const btn = $("#clickLoveBtn");

const text = $("#text");
const speed = $("#speed > input");
const string = "I Love You.";
let idx = 0;
let time = 400 / Number(speed.value);

function writeText(){
  text.textContent = string.slice(0, idx);
  idx += 1;
  if(idx > string.length) idx = 1;
  setTimeout(()=>{
    writeText();
  },time);
}
writeText();

speed.addEventListener('input', e => time = 400 / Number(e.target.value));