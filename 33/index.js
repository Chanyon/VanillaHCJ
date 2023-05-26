"use strict";
const check_box_element = document.querySelectorAll(".switch-container > input[type=checkbox]");
check_box_element.forEach(element => element.addEventListener("change", e => {
    const index = Array.from(check_box_element).indexOf(e.target);
    if (Array.from(check_box_element).every(v => v.checked)) {
        if (index === 0) {
            check_box_element[2].checked = false;
        }
        else if (index === 1) {
            check_box_element[0].checked = false;
        }
        else {
            check_box_element[1].checked = false;
        }
    }
}));

