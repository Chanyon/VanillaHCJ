const $ = (ele) => document.querySelector(ele);
const $all = (ele) => document.querySelectorAll(ele);

const choicesTextarea = $("#choicesTextarea");
const tags = $("#tags");

choicesTextarea.addEventListener('keyup',e =>{
    const value = e.target.value;
    const isCommand = value.indexOf(',') > -1;
    const splitSymbol = isCommand ? ',' : ' ';
    createTags(value, splitSymbol);
    if(e.keyCode === 13){
        setTimeout(() => {
            e.target.value = '';
        },100)
    }
    // console.log(e.keyCode)
    randomTag();
});
 
function createTags(value, splitSymbol) {
    if(!value || !value.length) return;
    const words = value.split(splitSymbol).map(v => v.trim()).filter(v => v);
    tags.innerHTML = '';
    words.forEach(word => {
        let tag = document.createElement('span');
        tag.classList.add('tag');
        tag.innerText = word;
        tags.appendChild(tag);
    });
}

function randomTag(){
    let time = 20;
    let timer = null;
    let randTagHighLight = () =>{
        const randomTagElement = pickerRandomTag();
        timer = setTimeout(randTagHighLight,100);
        setTimeout(()=>{
            unHighLight(randomTagElement);
        },100);
    }
    randTagHighLight();
    setTimeout(()=>{
        clearTimeout(timer);
        setTimeout(()=>{
            const randomTagElement = pickerRandomTag();
            highlightTag(randomTagElement);
        },100);
    },time * 100);
}

function pickerRandomTag(){
    const tags = $all("#tags .tag");
    return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(el){
    el && el.classList.add('highlight');
}

function unHighLight(el){
    el && el.classList.remove('highlight');
}
