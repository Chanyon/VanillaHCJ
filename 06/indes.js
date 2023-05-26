let boxElements = null;
function debounce(fn,waittime = 100){
    let timer = null;
    return function(){
        if (timer!=null) {
            clearTimeout(timer);
        } else {
            timer = setTimeout(fn,waittime);
        }
    }
}

function createTemplate(num){
    let _create = t => document.createElement(t);
    const body = document.body;
    for (let index = 0; index < num; index++) {
       const parent = _create('div');
       parent.classList.add('box');
       const child = _create('h3');
       child.textContent = "content";
       parent.appendChild(child);
       body.appendChild(parent);
    }
    return [].filter.call(body.children,el=>el.classList.contains('box'));
}
function showBox(){
    if(!boxElements) return;
    let triggerBottom = window.innerHeight/5*4;
    boxElements.forEach((box) => {
        const top = box.getBoundingClientRect().top;
        
        if (top <= triggerBottom) {
            box.classList.add('show');
        }else{
            box.classList.remove('show');
        }
    });
}

window.onload = function(){
    boxElements = createTemplate(20);
    showBox();
    window.addEventListener('scroll',showBox);
}