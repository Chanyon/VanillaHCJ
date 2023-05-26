const scale = (n,inMin,inMax,outerMin,outerMax) => (n-inMin)*(outerMax-outerMin)/(inMax-inMin)+outerMin;
const text = document.querySelector('.loading-text');
const bg = document.querySelector('.background');

let load = 0,timer = null;

let blurryLoading = ()=>{
    load += 1;
    if (load>99) {
        clearTimeout(timer);
    } else {
        timer = setTimeout(blurryLoading,20);
    }
    text.textContent = `页面加载${load}%`;
    text.style.opacity = scale(load,0,100,1,0);
    bg.style.filter =  `blur(${scale(load,0,100,3,0)}px)`
}
blurryLoading();