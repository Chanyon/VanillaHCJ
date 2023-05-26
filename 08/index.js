const labels = document.querySelectorAll('.form-control label');
const createLetter = v => v.split("")
.map((letter,index) => `<span style="transition-delay:${index*50}ms">${letter}</span>`).join("");

labels.forEach(item =>{
    item.innerHTML = createLetter(item.getAttribute("data-value"));
})