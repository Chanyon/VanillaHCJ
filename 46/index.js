"use strict";
const $ = (v,el=document) => el.querySelector(v);
const $$ = (v,el=document) => el.querySelectorAll(v);

const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript8",
        correct: "d",
    },
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript6",
        correct: "c",
    },
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript4",
        correct: "a",
    },
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript1",
        correct: "b",
    },
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript2",
        correct: "a",
    }
];

const quizContainer = $('#quiz');
const question = $('#question');
const answerInput = $$(".quiz-content ul li input");
const answerText = $$(".answer-text");
const submit = $("#submit");
let currentQ = 0,score = 0;

window.onload = ()=>{
    loadQuiz();
    submit.addEventListener("click",e => { 
        const answer = getSelected();
        const len = quizData.length - 1;
        if(answer === quizData[currentQ].correct && currentQ <= len){
            score += 1;
        }
        currentQ += 1;
        if(currentQ <= len){
            loadQuiz();
        console.log(currentQ);
        }else{
            quizContainer.innerHTML =  `
            <h2>You answer ${score} / ${quizData.length} questions correctly!</h2>
            <button type="button" class="btn" onclick="location.reload()">reload</button>
            `;
        }
        
    })
}

function loadQuiz(){
    initQuiz();
    let currentQuizData = quizData[currentQ];
    question.innerText = currentQuizData.question;
    answerText.forEach((item) => {
        const key = item.getAttribute('for');
        item.innerText = currentQuizData[key];
    });
}

function initQuiz() {
    answerInput.forEach(item => item.checked = false);
}

function getSelected(){
    let answer = undefined;
    answerInput.forEach(item =>{
        if(item.checked) {
            answer = item.id;
        }
    });
    return answer;
}

