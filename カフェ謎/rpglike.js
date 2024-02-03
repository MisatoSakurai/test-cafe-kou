


var quiz_list ={
    "Q1":{
        title:"謎1",
        image : "images/pro_quiz_image.png",
        answer:"答え1", 
        point: 10,
        answered: false,
        field:'Q1st'
    },
    "Q2":{
        title:"謎2",
        image : "/images/pro_quiz_image", 
        answer:"答え2", 
        point: 20,
        answered: false,
        field:'Q1st'
    },
    "Q3":{
        title:"謎3",
        image : "/images/pro_quiz_image", 
        answer:"答え3", 
        point: 30,
        answered: false,
        field:'Q1st'
    }   
}


var quiz_id = null;


function openQ(n){
    quiz_id = n;
    quiz_data = quiz_list[quiz_id];
    const quiz_back = document.getElementById("Q_back");
    const quiz_sheet = document.getElementById("Q_sheet");
    const quiz_title = quiz_sheet.querySelector(".quiz_title");
    const quiz_image = quiz_sheet.querySelector(".quiz_image");
    const answer_box = quiz_sheet.querySelector(".answer_box");
    quiz_title.textContent = quiz_data.title;
    quiz_image.src = quiz_data.image;
    
    answer_box.disabled = quiz_data.answered;
    
    if (quiz_data.answered){
        answer_box.value = "正解済み（A：" + quiz_data.answer +")"
    }else{
        answer_box.value = "";
    }
    
    
    quiz_sheet.style.display = 'block';
    quiz_back.style.display = 'block';
    
    const map = document.getElementById("map");
    map.style.filter = "blur(10px)";
}

function closeQ(){
    const quiz_back = document.getElementById("Q_back");
    const quiz_sheet = document.getElementById("Q_sheet");
    quiz_sheet.style.display = 'none';
    quiz_back.style.display = 'none';
    const map = document.getElementById("map");
    map.style.filter = "none";
}


function checkA(){
    const quiz_data = quiz_list[quiz_id]
    const quiz_sheet = document.getElementById("Q_sheet");
    const players_answer_box = quiz_sheet.querySelector(".answer_box");
    const players_answer = players_answer_box.value;
    console.log(players_answer);
    console.log(quiz_data.answer);
    console.log(players_answer == quiz_data.answer);
    
    
    
    
    if(quiz_data.answered == false){
        if(players_answer == quiz_data.answer){
            console.log("正解！："+ quiz_data.answer + "\n獲得経験値：" + quiz_data.point);
            quiz_data.answered = true;
            var pop_title = "正解!!";
            var pop_text = "A："+quiz_data.answer +"<br>"+"獲得経験値：" + quiz_data.point + "pt";
            players_answer_box.disabled = true;
            players_answer_box.value = "正解済み（A：" + quiz_data.answer +")"

        }else{
            players_answer_box.value = "";
            console.log("不正解");
            var pop_title = "不正解...";
            var pop_text = "答えが違うようだ...";
        }


        popTitling(pop_title);
        popTexting(pop_text);

        openPop();
        
    }
    
    
     
}








function openPop(){
    const pop = document.getElementById("pop");
    const pop_back = document.getElementById("pop_back");
    pop.style.display = 'block'; 
    pop_back.style.display = 'block';
}


function closePop(){
    const pop = document.getElementById("pop");
    const pop_back = document.getElementById("pop_back");
    pop.style.display = 'none';
    pop_back.style.display = 'none';
}

function popTexting(s){
    const pop = document.getElementById("pop");
    const pop_text = pop.querySelector("#pop_text");
    pop_text.innerHTML = s;
}

function popTitling(t) {
    const pop = document.getElementById("pop");
    const pop_text = pop.querySelector("#pop_title");
    pop_title.textContent = t;
}








function openMenu(){
  document.querySelector(".slide_menu").classList.toggle('active');
}













