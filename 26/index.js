class Book{
  constructor(bookName, author, cbs){
    this.bookName = bookName;
    this.author = author;
    this.cbs = cbs;
  }
}
class UI{
  constructor(){
    this.form = document.querySelector("#form-item");
    this.container = document.querySelector(".container");
  }
  addBookList(book){
    const list = document.querySelector(".book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.bookName}</td>
      <td>${book.author}</td>
      <td>${book.cbs}</td>
      <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row);
  }
  alertShow(message,className){
    const div = document.createElement("div");
    div.className = className;
    div.id = "show";
    div.innerText = `${message}`
    this.container.insertBefore(div,this.form);
  }
  clearShow(){
    this.show = document.querySelector("#show");
    this.show.remove();
  }
  deleteBook(target){
    if(target.className == "delete"){
      target.parentElement.parentElement.remove();
    }
  }
  clearFiled(bookName,author,cbs){
    bookName.value = "";
    author.value = "";
    cbs.value = "";
  }
}

document.querySelector('#btn').addEventListener('click', function(e){
  e.preventDefault();
  const bookName = document.querySelector("#book-name");
  const author = document.querySelector("#author");
  const cbs = document.querySelector("#cbs");
  const book = new Book(bookName.value, author.value, cbs.value);
  const ui = new UI();
  if(bookName.value === '' && author.value ==='' && cbs.value === ''){
    ui.alertShow("不能为空","error");
    setTimeout(()=>{
      ui.clearShow();
    },2000)
    return;
  }else{
    ui.addBookList(book);
    ui.alertShow("添加成功","success");
    setTimeout(()=>{
      ui.clearShow();
      ui.clearFiled(bookName,author, cbs);
    },2000)
  }

  const deletes = document.querySelector(".delete");
  deletes.addEventListener("click",(e)=>{
    ui.deleteBook(e.target);
  })

})