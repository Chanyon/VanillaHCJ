
/*
* 1.添加任务 监听输入框事件，添加到一个任务集合中，同时任务数量也要加一
* 2.删除任务 从已经添加的任务列表中删除（tag element），同时任务数量也要减一
* 3.任务的完成与否，3.1 选中任务添加相应的样式 3.2 去除选中状态，则删除相应样式
* 4.任务状态【所有任务（包括完成，未完成），完成，未完成】,setAttribute("data-active","1"),[1|0]:1表示未完成，0表示已完成
* 5.在这个案例中能学到什么？事件操作？如何操作DOM对象？根据状态过滤数据，拿到想要的数据并渲染？
*/

const $ = (v,element = document) => element.querySelector(v);
const $$ = (v,element = document) => element.querySelectorAll(v);

const ul = $("#todo ul");
const newTodo = $("#new-todo");
const card = $("#card");
const span = $("#card > span");
const labels = $$("#todo>.card label");
const all = $("#all");
// 正在进行的任务
const active = $("#active");
const completed = $("#completed");

class TodoApp {
  constructor() {
    this.arrList = [];
    this.count = 0;
  }
  init() {
    const self = this;
    // input keyup event
    newTodo.addEventListener("keyup", e => {
      const { key } = e;
      const todoValue = newTodo.value;
      if (key === "Enter") {
        if (todoValue !== '') {
          self.addList(todoValue);
          newTodo.value = '';
          card.classList.replace("hide-card", "show-card");
          self.setSpanContent();
          if(all.checked){
            self.showAll();
          }else if(active.checked){
            self.showActive();
          }else if(completed.checked){
            self.showComplete();
          }else{
            alert("hello world ~~！");
          }
        }
      }
    });
    // ul click event
    ul.addEventListener("click",e => {
      if(e.target.localName === "input") {
        if(e.target.checked){
          e.target.parentNode.classList.add("check");
          e.target.parentNode.setAttribute("data-active","0");
          self.count -= 1;
          self.setSpanContent();
        }else{
          e.target.parentNode.classList.remove("check");
          e.target.parentNode.setAttribute("data-active","1");
          self.count += 1;
          self.setSpanContent();
        }
      }
      if(e.target.localName === "button"){
        const idx = self.arrList.indexOf(e.target.parentNode);
        // 从ul中删除 当前点击li
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        self.arrList.splice(idx,1);
        self.renderEle(self.arrList,ul);
        self.count -= 1;
        self.setSpanContent();
        
        //隐藏card 
        if(self.arrList.length === 0){
          card.classList.replace("show-card", "hide-card");
        }
      }
    });
    // showAll ,checkbox
    all.addEventListener("click",e => {
      this.showAll();
      this.showBorder(0);
    });
    active.addEventListener("click",e => {
      this.showActive();
      this.showBorder(1);
    });
    completed.addEventListener("click",e => {
      this.showComplete();
      this.showBorder(2);
    });
  }
  addList(value) {
    const li = document.createElement("li");
    li.classList.add('box');
    li.classList.add('list');
    li.setAttribute("data-active","1");
    const liHtml = `
      <input type="checkbox" id="checkbox"></input>
      ${value} 
      <button>X</button>
    `;
    li.innerHTML = liHtml;
    this.arrList.push(li);
    this.renderEle(this.arrList,ul);
    this.count += 1;
  }
  setSpanContent(){
    if(this.count <= 0){
      this.count = 0;
    }
    span.textContent = `${this.count} items left`;
  }
  renderEle(arrList,el = ul){
    el.innerHTML = '';
    arrList.forEach(li => el.appendChild(li));
  }

  showAll(){
    this.renderEle(this.arrList,ul);
  }
  showActive(){
    const activeList = this.arrList.filter(el => el.getAttribute("data-active") === "1");
    this.renderEle(activeList,ul);
  }
  showComplete(){
    const completedList = this.arrList.filter(el => el.getAttribute("data-active") === "0");
    this.renderEle(completedList,ul);
  }
  showBorder(idx){
    // 先移除所有，再给当前对象重新设置
    labels.forEach(el => el.classList.remove("show-border"));
    labels[idx].classList.add("show-border");
  }
}

const todo = new TodoApp();

todo.init();