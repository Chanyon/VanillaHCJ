const $ = (ele) => document.querySelector(ele);
const $$ = (ele) => document.querySelectorAll(ele);
const scale = (n,inMin,inMax,outerMin,outerMax) => (n - inMin) * (outerMax - outerMin) / (inMax - inMin) + outerMin;

const langText = {
    'zh':{
        'mode-dark-text':"黑暗模式",
        'mode-light-text':"明亮模式",
        'lang-text':"中文",
        'time-before-text':"上午",
        'time-after-text':"下午",
        'date-day-text':"日"
    },
    'en':{
        "mode-dark-text":"dark mode",
        "mode-light-text":"light mode",
        "lang-text":"English",
        "time-before-text":"AM",
        "time-after-text":"PM",
        "date-day-text":""
    }
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayZHs = ["星期日","星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthZHs = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

const modeBtn = $("#mode-btn");
const langBtn = $("#lang-btn");
const timeEle = $("#time");
const dateEle = $("#date");
const hourEle = $(".hour");
const minuteEle = $(".minute");
const secondEle = $(".second");
const body = document.body;
let currentLang = "zh";
let timer = null;


modeBtn.addEventListener('click',(e)=>{
    let isDark = body.classList.contains('dark');
    if(isDark){
        body.classList.remove('dark');
        e.target.textContent = langText[currentLang]['mode-dark-text'];
    }else{
        body.classList.add('dark');
        e.target.textContent = langText[currentLang]['mode-light-text'];
    }
})
langBtn.addEventListener('click',(e)=>{
    let isDark = body.classList.contains('dark');
    currentLang = currentLang === 'zh'?'en':'zh';
    modeBtn.textContent = langText[currentLang][`mode-${isDark ? 'light' : 'dark'}-text`];
    e.target.textContent = langText[currentLang === 'zh'?"en":"zh"]['lang-text'];
    // if(timer !== null){
    //     clearInterval(timer);
    // }
    setCurrentDate();
})
function setTransForm(el,value){
    el.style.transform = value;
}
function setCurrentDate(){
    const date = new Date();
    let month = date.getMonth(),
    day = date.getDay(),
    time = date.getDate(),
    hour = date.getHours(),
    hourForClock = (hour % 12),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    amPm = hour >= 12 ? langText[currentLang]['time-after-text'] : langText[currentLang]['time-before-text'],
    w = currentLang === 'zh' ? dayZHs:days,
    m = currentLang === 'zh' ? monthZHs:months;
    timeEle.innerHTML = `${hour}:${minute > 10 ? minute:'0'+minute}&nbsp;${amPm}`;
    dateEle.innerHTML =`${w[day]},${m[month]}<span class="circle">${time}</span>${langText[currentLang]['date-day-text']}`;
    let values = [
        `translate(-50%,-100%) rotate(${scale(hourForClock,0,11,0,360)}deg)`,
        `translate(-50%,-100%) rotate(${scale(minute,0,59,0,360)}deg)`,
        `translate(-50%,-100%) rotate(${scale(second,0,59,0,360)}deg)`
    ];
    let secondValue =`translate(-50%,-100%) rotate(360deg)`;
    // if(second === 59){
    //     setTransForm(secondEle,secondValue);
    // }
    [hourEle,minuteEle,secondEle].forEach((item,index) => setTransForm(item, values[index]));
    // console.log(hourForClock);
    // console.log(second,scale(second,0,59,0,360));
}
window.onload = () => {
    setCurrentDate();
    timer = setInterval(setCurrentDate,1000);
}