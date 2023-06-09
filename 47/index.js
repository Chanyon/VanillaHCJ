"use strict";
const testimonials = [
    {
        name: 'Miyah Myles',
        position: 'Marketing',
        photo:'https://th.bing.com/th/id/OIP._c3rkHmwzV7LCmHA2MDa0wAAAA?w=225&h=220&c=7&r=0&o=5&dpr=2&pid=1.7',
        text:
            "I've worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer. He stresses on good, clean code and pays heed to the details. I love developers who respect each and every aspect of a throughly thought out design and do their best to put it in code. He goes over and beyond and transforms ART into PIXELS - without a glitch, every time.",
    },
    {
        name: 'June Cha',
        position: 'Software Engineer',
        photo: 'https://th.bing.com/th/id/OIP._c3rkHmwzV7LCmHA2MDa0wAAAA?w=225&h=220&c=7&r=0&o=5&dpr=2&pid=1.7',
        text:
            'This guy is an amazing frontend developer that delivered the task exactly how we need it, do your self a favor and hire him, you will not be disappointed by the work delivered. He will go the extra mile to make sure that you are happy with your project. I will surely work again with him!',
    },
    {
        name: 'Iida Niskanen',
        position: 'Data Entry',
        photo: 'https://th.bing.com/th/id/OIP._c3rkHmwzV7LCmHA2MDa0wAAAA?w=225&h=220&c=7&r=0&o=5&dpr=2&pid=1.7',
        text:
            "This guy is a hard worker. Communication was also very good with him and he was very responsive all the time, something not easy to find in many freelancers. We'll definitely repeat with him.",
    },
    {
        name: 'Renee Sims',
        position: 'Receptionist',
        photo: 'https://th.bing.com/th/id/OIP._c3rkHmwzV7LCmHA2MDa0wAAAA?w=225&h=220&c=7&r=0&o=5&dpr=2&pid=1.7',
        text:
            "This guy does everything he can to get the job done and done right. This is the second time I've hired him, and I'll hire him again in the future.",
    },
    {
        name: 'Jonathan Nunfiez',
        position: 'Graphic Designer',
        photo: 'https://th.bing.com/th/id/OIP._c3rkHmwzV7LCmHA2MDa0wAAAA?w=225&h=220&c=7&r=0&o=5&dpr=2&pid=1.7',
        text:
            "I had my concerns that due to a tight deadline this project can't be done. But this guy proved me wrong not only he delivered an outstanding work but he managed to deliver 1 day prior to the deadline. And when I asked for some revisions he made them in MINUTES. I'm looking forward to work with him again and I totally recommend him. Thanks again!",
    },
    {
        name: 'Sasha Ho',
        position: 'Accountant',
        photo:'https://th.bing.com/th/id/OIP._c3rkHmwzV7LCmHA2MDa0wAAAA?w=225&h=220&c=7&r=0&o=5&dpr=2&pid=1.7',
        text:
            'This guy is a top notch designer and front end developer. He communicates well, works fast and produces quality work. We have been lucky to work with him!',
    },
    {
        name: 'Veeti Seppanen',
        position: 'Director',
        photo: 'https://th.bing.com/th/id/OIP._c3rkHmwzV7LCmHA2MDa0wAAAA?w=225&h=220&c=7&r=0&o=5&dpr=2&pid=1.7',
        text:
            'This guy is a young and talented IT professional, proactive and responsible, with a strong work ethic. He is very strong in PSD2HTML conversions and HTML/CSS technology. He is a quick learner, eager to learn new technologies. He is focused and has the good dynamics to achieve due dates and outstanding results.',
    },
];

const $ = (v,el=document) => el.querySelector(v);
const $$ = (v,el=document) => el.querySelectorAll(v);

const testimonial = $('.testimonial');
const userImage = $('.user-img');
const userName = $('.user-name');
const role = $('.role');
const orderContent = $('.order-content');
const progress = $('.progress-bar');
let timerId = null;
let currentIdx = 1;
function updateTestimonial(){
    const {text,name,position,photo} = testimonials[currentIdx];
    const renderEle = [testimonial,userName,role];
    userImage.setAttribute('src',photo);
    orderContent.innerHTML = currentIdx + 1;
    [text,name,position].forEach((item,idx) => renderEle[idx].innerHTML = item);
    currentIdx++;
    if(currentIdx > testimonials.length - 1) {
        currentIdx = 0;
    }
}
let bf = 0,testimonialWidth;
function setProgressWidth(parentEle){
    testimonialWidth = parentEle.offsetWidth;
    // bf = 0;
    timerId = setInterval(() => {
        progress.style.width = `${bf}px`;
        bf +=  testimonialWidth / 10;
        if(bf >= testimonialWidth) {
            // clearInterval(timerId);
            bf = 0;
        }
    },1000);
}

window.onload = function(){
    setProgressWidth(testimonial);

    setInterval(function(){
        updateTestimonial();
    },1000 * 10);

}

