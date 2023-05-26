const $ = (ele) => document.querySelector(ele);
const content = $('#joke-content');
const getJokeBtn = $('#getJoke');
const translateBtn = $('#translate');

const headerConfig = {
    headers:{
        Accept:'application/json',
    }
};

const api = 'https://icanhazdadjoke.com';
const on = (el,type,hander,useCapture = false)=>{
    if (el && type && hander) {
        el.addEventListener(type,hander,useCapture);
    }
}
on(translateBtn,'click',()=>{
    window.open('www.github.com');
});
on(getJokeBtn,'click',request);
async function request(){
    const res = await fetch(api,headerConfig);
    const data = await res.json();
    console.log(data);
    content.innerHTML = data.joke;
}