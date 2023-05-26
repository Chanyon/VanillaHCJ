const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const postContainer = $("#post-container");
const loading = $("#loading");
const menuE = $(".menu");
const topEl = $("#top");
const filter = $(".filter");

let page = 1;
const limit = 10; //每页十条数据

async function loadPost() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
  return await res.json();
}

async function showPost() {
  const posts = await loadPost();
  posts.forEach((post,idx) => {
    const postEl = document.createElement("div");
    const menuItemEl = postEl.cloneNode(true);
    menuItemEl.classList.add("menu-item");
    if(idx === 0) menuItemEl.classList.add("active");
    menuItemEl.setAttribute("data-id",post.id);
    postEl.classList.add("post");

    menuItemEl.innerHTML = `
      <span>${post.id}.</span><p>${post.title}</p>
    `;
    postEl.innerHTML = `
      <div class="number" id="post-title-${post.id}">${post.id}</div>
      <div class="post-info">
          <h2>${ post.title}</h2>
          <p class="post-body">${ post.body}</p>
      </div>
    `;

    postContainer.appendChild(postEl);
    menuE.appendChild(menuItemEl);
  });
  clickUpdate();
}

function clickUpdate(){
  const menuItem = $$(".menu .menu-item");
  const menuItemArr = [].slice.call(menuItem);
  menuItemArr.forEach(menu => {
    menu.addEventListener("click", e => {
      menuItemArr.forEach(item => {
        item.classList.remove('active');
      });
      e.currentTarget.classList.add('active');
      const data_id = e.currentTarget.getAttribute("data-id");
      // console.log(data_id);
      const totalHeight = $(`#post-title-${data_id}`).getBoundingClientRect().top;
      // console.log(totalHeight);
      const scrollTop = document.body.scrollTop = document.documentElement.scrollTop;
      console.log(scrollTop);
      let val = 10;
      let timer = null;
      const updateTop = () => {
        val += 135;
        document.body.scrollTop = scrollTop + val;
        if (val > (totalHeight + scrollTop)){
          clearTimeout(timer);
          document.body.scrollTop = document.documentElement.scrollTop = totalHeight + scrollTop;
        }else {
          timer = setTimeout(updateTop,parseInt(1000/30));
        }
      };
      updateTop();
    })
  });
}

showPost();

function showLoading(){
  loading.style.opacity = "1";
  setTimeout(() => {
    loading.style.opacity = "0";
    setTimeout(()=>{
      page += 1;
      showPost();
    },100)
  },1000);
}

window.addEventListener("scroll",() => {
  const {scrollTop,scrollHeight,clientHeight} = document.documentElement || document.body;
  topEl.style.display = scrollTop + clientHeight >= scrollHeight - 10 ? "block" : "none";
  console.log(scrollTop,scrollHeight,clientHeight);
  // 判断当前滚动高度 + client高度 是否大于整个滚动高度
  if(scrollTop+clientHeight >= scrollHeight-5){
    showLoading();
  }
});

topEl.addEventListener("click",() => {
  let val = document.body.scrollTop = document.documentElement.scrollTop;
  let timer = undefined;
  const updateTop = () => {
    val -= 100;
    document.body.scrollTop = document.documentElement.scrollTop = val;
    if(val <= 0) {
      if(timer !== undefined) clearTimeout(timer);
      document.documentElement.scrollTop = 0;
      topEl.style.display = "none";
    }else {
      timer = setTimeout(updateTop,16);
    }
  };
  updateTop();
});

// filter
function filterPost(e) {
  const value = e.target.value.toLowerCase();
  const posts = $$(".post");
  const menu_children = menuE.querySelectorAll(".menu-item");
  posts.forEach((post,idx) => {
    const title = post.querySelector(".post-info h2").innerText.toLowerCase();
    const body = post.querySelector(".post-info .post-body").innerText.toLowerCase();
    const expression = title.indexOf(value) > -1 ||body.indexOf(value) > -1;
    post.style.display = expression ? "block" : "none";
  });
}

filter.addEventListener("input",filterPost);
