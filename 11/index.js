const $ = (ele) => document.querySelector(ele);
const container = $('.container');
window.addEventListener('keydown',event =>{
    createKeyCodetemplate(event);
});

function createKeyCodetemplate(e){
    const {key,keyCode,code} = e;
    let temp = '';
    const list = [
        {title:'event.key',content:key === " "?"Space":key},
        {title:'event.keyCode',content:keyCode},
        {title:'event.code',content:code}
    ];
    list.forEach(item=>{
        temp += `<div class="key"><small>${item.title}</small>${item.content}</div>`
    })
    container.innerHTML = temp;
}