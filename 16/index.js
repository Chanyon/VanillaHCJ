const $ = (ele) => document.querySelector(ele);
const $all = (ele) => document.querySelectorAll(ele);

const remind = $("#remind");
const percent = $("#percent");
const cups = $all('.select-cup .cup');
const remindText = remind.querySelector('.cup-container');
// console.log(cups);
const hasClass = (el, className) => el.classList.contains(className);
const removeClass = (el, className) => el.classList.remove(className);
const addClass = (el, className) => el.classList.add(className);
const setText = (el, text) => el.textContent = text;
const setStyle = (el, propValue = {}) => {
    Object.keys(propValue).forEach(key => el.style[key] = propValue[key]);
};

function setHeightVisible(h1, v1, h2, v2) {
    let o1 = {
        height: h1,
        visibility: v1,
    };
    let o2 = {
        height: h2,
        visibility: v2
    };
    [remind,percent].forEach((el,index) => setStyle(el,(index === 0 ? o1:o2)));
}
function setTextContent(t1,t2){
    [percent,remindText].forEach((el,index) => setText(el,(index === 0 ? t1:t2)));
}

function handler(){
    const L = cups.length;
    console.log(L);
    const unitHei = 350 / L;
    for (let i = 0; i < L; i++){
        cups[i].addEventListener('click',()=>{
            if(hasClass(cups[i],'active')){
                if(!cups[i+1]) return;
                const last = hasClass(cups[i+1],'active');
                for (let j = i+1; j < L; j++) {
                   removeClass(cups[j],'active');
                }
                if(!last){
                    removeClass(cups[i],'active');
                }
            }else{
                for (let j = 0; j <= i; j++) {
                    addClass(cups[j],'active');
                }
            }
            const ACTIVES = $all('.cup.active');
            if(ACTIVES.length === L){
                setHeightVisible('0','hidden','350px','visible');
                setTextContent("100%","0L");
            }else if(ACTIVES.length === 0){
                setHeightVisible('350px','visible','0','hidden');
                setTextContent("12.5%","2L");
            }else{
                let h1 = unitHei*(L-ACTIVES.length)+'px';
                let h2 = unitHei*ACTIVES.length+'px';
                setHeightVisible(h1,'visible',h2,'visible');
                let t1 = (unitHei * ACTIVES.length / 350)*100 + '%';
                let t2 = (cups[i].textContent.replace(/ml/,"").replace(/s+/,"")-0)*(L-ACTIVES.length) / 1000 + 'L';
               console.log(t1,t2);
                setTextContent(t1,t2);
            }
        })
    }
}
window.onload = () =>{
    setHeightVisible('350px','visible','0','hidden');
    handler();
}