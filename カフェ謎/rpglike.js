function openQ(n){
    const quiz = document.getElementById(n)
    const quiz_back = quiz.parentElement
    quiz.style.display = 'block';
    quiz_back.style.display = 'block';
}

function closeQ(n){
    const quiz = document.getElementById(n)
    const quiz_back = quiz.parentElement
    quiz.style.display = 'none';
    quiz_back.style.display = 'none';
}

function checkA(n){
    const quiz = document.getElementById(n)
}