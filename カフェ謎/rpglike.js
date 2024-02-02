function openQ(n){
    const quiz = document.getElementById(n);
    const quiz_back = quiz.parentElement;
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
    const players_answer = document.getElementById(n).anser_box;
    console.log(players_answer);
    
}


var quiz ={
    "Q1":{
        quiz_image : "/images/pro_quiz_image",
        answer:"答え1", 
        point: 10
    },
    "Q2":{
        quiz_image : "/images/pro_quiz_image", 
        answer:"答え2", 
        point: 20
    },
    "Q3":{
        quiz_image : "/images/pro_quiz_image", 
        answer:"答え3", 
        point: 30
    }   
}
