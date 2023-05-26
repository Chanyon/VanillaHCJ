const $ = (ele) => document.querySelector(ele);
const $$ = (ele) => document.querySelectorAll(ele);

const langEle = $("#lang");
const settingContainer = $("#setting-container");
const titleEle = $("#title");
const clipboard = $("#clipboard");
const result = $("#result");
const generatorBtn = $("#generate-btn");
let currentLanguage = 'en';

const siblings = el => [].filter.call(el.parentNode.children, item => item !== el);
const dataObject = {
  en: {
    title: "password generator",
    lang: ["en", "zh"],
    settings: [{
        label: "password length",
        type: 'number',
        id: "length",
      },
      {
        label: "Include uppercase letters",
        type: 'checkbox',
        id: "uppercase",
      },
      {
        label: "Include lowercase letters",
        type: 'checkbox',
        id: "lowercase",
      },
      {
        label: "Include numbers",
        type: 'checkbox',
        id: "numbers",
      },
      {
        label: "Include symbols",
        type: 'checkbox',
        id: "symbols",
      },
    ],
    btnContent: "Generator Password",
    confirmTitle: "Tips",
    confirmContent: "Password copied to clipboard!"
  },
  "zh": {
    "title": "密码生成器",
    "lang": ["英文", "中文"],
    "settings": [{
        "label": "密码长度",
        "type": "number",
        "id": "length"
      },
      {
        "label": "包含大写字母",
        "type": "checkbox",
        "id": "uppercase"
      },
      {
        "label": "包含小写字母",
        "type": "checkbox",
        "id": "lowercase"
      },
      {
        "label": "包含数字",
        "type": "checkbox",
        "id": "numbers"
      },
      {
        "label": "包含符号",
        "type": "checkbox",
        "id": "symbols"
      }
    ],
    "btnContent": "生成密码",
    "confirmTitle": "温馨提示",
    "confirmContent": "密码已复制到剪贴板上"
  }
};
const randomFunc = {
  upper:getRandomUpper,
  lower:getRandomLower,
  number:getRandomNumber,
  symbol:getRandomSymbol,
}

function getRandomUpper(){
  return String.fromCharCode(Math.floor(Math.random()*26)+65);
}

function getRandomLower(){
  return String.fromCharCode(Math.floor(Math.random()*26)+97);
}

function getRandomNumber(){
  return String.fromCharCode(Math.floor(Math.random()*10) + 48);
}

function getRandomSymbol(){
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random()*symbols.length)];
}

function createSettings() {
  const settings = dataObject[currentLanguage].settings;
  let settingContainerHtml = "";
  settings.forEach(setting => {
      settingContainerHtml += `
        <div class="setting-item">
          <label>${setting.label}</label>
          <input type="${setting.type}" id="${setting.id}">
        </div>
      `;
  });
  settingContainer.innerHTML = settingContainerHtml;
  settingContainer.querySelectorAll("input").forEach(ele => {
    if(ele.getAttribute("type") === "number"){
      [{prop:"value",value:20},{prop:"min",value:1},{prop:"max",value:20}].forEach(attr => ele.setAttribute(attr.prop,attr.value));
    }else{
      ele.setAttribute("checked",true);
    }
  });
}

function createLangItem(){
  const langArr = dataObject[currentLanguage].lang;
  let langHtml = "";
  langArr.forEach(lang => langHtml += `<div class="lang-item ${lang === currentLanguage ? 'lang-item-active': ''}" data-lang="${lang}">${lang}</div>`);
  langEle.innerHTML = langHtml;
  const langItems = langEle.children;
  langEle.addEventListener("click",e => {
    const {className} = e.target;
    if(className.includes("lang-item")){
      const currentDataLang = e.target.getAttribute("data-lang");
      if(currentDataLang == currentLanguage){
        return;
      }
      currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
      // 排他思想
      siblings(e.target).forEach(item => item.classList.remove("lang-item-active"));
      e.target.classList.add("lang-item-active");
      const data =  dataObject[currentLanguage];
      Array.from(langItems).forEach((item,idx) => item.textContent = data.lang[idx]);
      titleEle.textContent = data.title;
      generatorBtn.textContent = data.btnContent;
      settingContainer.querySelectorAll("label").forEach((item,idx) => item.textContent = data.settings[idx].label);
    }
  })
}

function generatorPassword(upper,lower,number,symbol,length){
  let password = "";
  let upperChar='',lowerChar='',numberChar='',symbolChar='';
  let ran = Math.random() < 0.5;
  for (let i = 0; i < length; i++) {
    if(upper) upperChar = randomFunc['upper']();
    if(lower) lowerChar = randomFunc['lower']();
    if(number) numberChar = randomFunc['number']();
    if(symbol) symbolChar = randomFunc['symbol']();
    password += (ran ? upperChar : lowerChar)+numberChar+symbolChar+upperChar;
  }

  return password.slice(0,length);
}

window.onload = () => {
  createSettings();
  createLangItem();
  generatorBtn.addEventListener("click",()=>{
    const length = $("#length").value;
    const upper = $("#uppercase").checked;
    const lower = $("#lowercase").checked;
    const number = $("#numbers").checked;
    const symbol = $("#symbols").checked;
    result.textContent = generatorPassword(upper,lower,number,symbol,length);
  });
  clipboard.addEventListener("click",()=>{
    const password = result.textContent;
    if(!password) return;
    const input = document.createElement("input");
    input.value = password;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    const data = dataObject[currentLanguage];
    ewConfirm({
      title:data.confirmTitle,
      content:data.confirmContent,
      showCancel:false
    });
  });
}
