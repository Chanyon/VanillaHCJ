"use strict";
const $ = (v,el=document) => el.querySelector(v);
const $$ = (v,el=document) => el.querySelectorAll(v);
const scale = (num, in_min, in_max, out_min, out_max) => (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
const range = $("#range");
const label = $("#label");

const getStyle = (el,prop) => getComputedStyle(el).getPropertyValue(prop);

range.addEventListener("input" , e => {
    const rangeValue = +e.target.value;
    // const label = e.target.nextElementSibling;
    const range_width = getStyle(e.target, "width");
    const label_width = getStyle(label, "width");

    const num_width = +(range_width.slice(0, range_width.length - 2));
    const num_label = +(label_width.slice(0, label_width.length - 2));
    const min = +e.target.min,
    max = +e.target.max;

    const left = rangeValue * (num_width / max) + scale(rangeValue,min,max,num_label / 2,-num_label / 2);
    label.style.left = `${left}px`;
    label.innerText = rangeValue;
})

