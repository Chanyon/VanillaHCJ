"use strict";
const $ = (v,el=document) => el.querySelector(v);
const $$ = (v,el=document) => el.querySelectorAll(v);

const search = $("#search");
const result = $("#result");

let filterData = [];

async function requestData() {
    const data = await fetch('https://randomuser.me/api?results=50');
    const {results} = await data.json();
    // result.innerHTML = "";
    // results.forEach( user => {
    //     const listItem = document.createElement("li");
    //     const {picture: {large},name: {first,last},location: {city,country}} = user;
    //     listItem.innerHTML = `
    //     <img src="${large}" alt="${first+'-'+last}"/>    
    //     <div class="user-info">
    //         <h4>${first} ${last}</h4>
    //         <p>${city},${country}</p>
    //     </div>
    //     `;
    //     filterData.push(listItem);
    //     result.appendChild(listItem);
    // })
    return results;
}

function createElementLi(data) {
    result.innerHTML = "";
    data.forEach(user => {
        const listItem = document.createElement("li");
        const {picture: {large},name: {first,last},location: {city,country}} = user;
        listItem.innerHTML = `
        <img src="${large}" alt="${first+'-'+last}"/>    
        <div class="user-info">
            <h4>${first} ${last}</h4>
            <p>${city},${country}</p>
        </div>
        `;
        result.appendChild(listItem);
    })
}

// function filterHandler(value) {
//     filterData.forEach(item => {
//         if(item.innerText.toLowerCase().indexOf(value.toLowerCase().trim()) > -1) {
//             item.classList.remove('hide');
//         }else {
//             item.classList.add('hide');
//         }
//     })
// }

function filterHandler2(value,ret = []) {
    const filterData = ret.filter(user => {
        const {name: {first,last},location: {city,country}} = user;
        return first.toLowerCase().includes(value.toLowerCase().trim()) 
        || last.toLowerCase().includes(value.toLowerCase().trim())
        || city.toLowerCase().includes(value.toLowerCase().trim())
        || country.toLowerCase().includes(value.toLowerCase().trim());
    });
    createElementLi(filterData);
}

window.onload = async () => {
    const ret = await requestData();
    createElementLi(ret);
    search.addEventListener("input",e => {
        const {value} = e.target;
        filterHandler2(value,ret);
    })
}