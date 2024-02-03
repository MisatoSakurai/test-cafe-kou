var player_data = {
    point:0,
    
    
}



var quiz_list ={
    "Q1":{
        title:"謎1",
        origin_image : "images/pro_quiz_image.png",
        magics:{
            "none":{
                image:"images/pro_quiz_image.png",
                answer:"答え1",
                hint:"ヒントです1",
                point: 10,
                answered:false,
                place:{
                    x: 10, y: 10,  // 座標%
                    w: 50, h: 50   // サイズ%
                }
            },
            "red":{
                image:"images/pro_quiz_image.png",
                answer:"答えred",
                hint:"ヒントですred",
                point: 10,
                answered:false,
                place:{
                    x: 10, y: 10,  // 座標%
                    w: 50, h: 50   // サイズ%
                }
            },
            "blue":{
                image:"images/pro_quiz_image.png",
                answer:"答えblue",
                hint:"ヒントですblue",
                point: 10,
                answered:false,
                place:{
                    x: 10, y: 10,  // 座標%
                    w: 50, h: 50   // サイズ%
                }
            },
            "yello":{},
            "add_char":{
                image:"images/add.png",
                answer:"答えadd",
                hint:"ヒントですadd",
                point: 10,
                answered:false,
                place:{
                    x: 10, y: 10,  // 座標%
                    w: 50, h: 50   // サイズ%
                }
            },
            "change_char":{},
            "scissors":{}
        },
        involved_magic:"none",
        number_of_quiz:3,
        answered_time:0,
        field:'Q1st',
    },
    "Q2":{
        title:"謎2",
        origin_image : "/images/pro_quiz_image", 
        answer:"答え2",
        hint:"ヒントです2",
        point: 20,
        involved_magic:"none",
        answered: false,
        field:'Q1st'
        
    },
    "Q3":{
        title:"謎3",
        origin_image : "/images/pro_quiz_image", 
        answer:"答え3",
        hint:"ヒントです3",
        point: 30,
        involved_magic:"none",
        answered: false,
        field:'Q1st'
    }   
}







var selected_magic = null;








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
    quiz_image.src = quiz_data.origin_image;
    quiz_data.involved_magic="none";
    
    answer_box.disabled = (quiz_data.answered_time >= quiz_data.number_of_quiz);
    
    if (quiz_data.answered_time >= quiz_data.number_of_quiz){
        answer_box.value = "-----"
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
    var quiz_id = null;
}


function checkA(){
    const quiz_data = quiz_list[quiz_id]
    const quiz_sheet = document.getElementById("Q_sheet");
    const players_answer_box = quiz_sheet.querySelector(".answer_box");
    const players_answer = players_answer_box.value;
    console.log(players_answer);
    console.log(quiz_data.magics[quiz_data.involved_magic].answer);
    console.log(players_answer == quiz_data.magics[quiz_data.involved_magic].answer);
    let pop_tl = "";
    let pop_tx = "";
    
    if(quiz_data.magics[quiz_data.involved_magic].answered == false){
        if(players_answer == quiz_data.magics[quiz_data.involved_magic].answer){
            console.log("正解！："+ quiz_data.magics[quiz_data.involved_magic].answer + "\n獲得経験値：" + quiz_data.point);
            quiz_data.answered = true;
            pop_tl = "正解!!";
            pop_tx = "A："+quiz_data.magics[quiz_data.involved_magic].answer +"<br>"+"獲得経験値：" + quiz_data.magics[quiz_data.involved_magic].point + "pt";
            quiz_data.magics[quiz_data.involved_magic].answered = true;
            quiz_data.answered_time += 1;
            player_data.point += quiz_data.magics[quiz_data.involved_magic].point;
            
            players_answer_box.value = "";

        }else{
            players_answer_box.value = "";
            console.log("不正解");
            pop_tl = "不正解";
            pop_tx = "答えが違うようだ...";
        }


        
    }else{
        pop_tl = "無効";
        pop_tx = "この問題はすでに解いているようだ";
    }
    
    
    popTitling(pop_tl);
    popTexting(pop_tx);

    openPop();

    
    
     
}



function hint(){
    const quiz_data = quiz_list[quiz_id]
    const quiz_sheet = document.getElementById("Q_sheet");
    let pop_tl = "";
    let pop_tx = "";
    if(quiz_data.magics[quiz_data.involved_magic].answered == false){
        console.log("ヒント");
        pop_tl = "ヒント";
        pop_tx = quiz_data.magics[quiz_data.involved_magic].hint;
        
    }else{
        pop_tl = "ヒント";
        pop_tx = "この問題はすでに解いているようだ";
    }
    
    
    popTitling(pop_tl);
    popTexting(pop_tx);

    openPop();
      
     
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
    const menu_back = document.getElementById("menu_back");
    menu_back.style.display = 'block';
    
}


function closeMenu(){
    document.querySelector(".slide_menu").classList.toggle('active');
    const menu_back = document.getElementById("menu_back");
    menu_back.style.display = 'none';
}








function openQuizMagic(n){
    if(quiz_data.involved_magic == "none"){
        selected_magic = n;
        magic_canvas = document.getElementById("quiz_magic_canvas");
        magic_back = document.getElementById("quiz_magic_back"); 
        magic_canvas.style.display = 'block';
        magic_back.style.display = 'block';
    }
    else{
        popTitling("魔法は追加できません");
        popTexting("1度謎を閉じてから再度開けて魔法をかけてください");

        openPop();
    }
}










function failedQuizMagic(){
    magic_canvas = document.getElementById("quiz_magic_canvas");
    magic_back = document.getElementById("quiz_magic_back"); 
    magic_canvas.style.display = 'none';
    magic_back.style.display = 'none';
    
    selected_magic = null;


    popTitling("失敗");
    popTexting("そこには使えないようだ");

    openPop();
    
}


function successQuizMagic(){
    magic_canvas = document.getElementById("quiz_magic_canvas");
    magic_back = document.getElementById("quiz_magic_back"); 
    magic_canvas.style.display = 'none';
    magic_back.style.display = 'none';
    
    quiz_data.involved_magic = selected_magic;
    selected_magic = null;
    
    const quiz_sheet = document.getElementById("Q_sheet");
    const quiz_image = quiz_sheet.querySelector(".quiz_image");
    quiz_image.src = quiz_data.magics[quiz_data.involved_magic].image;
    
    
    


    popTitling("成功！");
    popTexting("謎が変化した");
    
    
    
    

    openPop();
    
}



function useMagic(point){
    const square = quiz_data.magics[selected_magic].place
    const hit =
          (square.x <= point.x && point.x <= square.x + square.w)  // 横方向の判定
       && (square.y <= point.y && point.y <= square.y + square.h)  // 縦方向の判定

    if (hit) {
        console.log('hit!');
        successQuizMagic();
    }else{
        console.log('not hit');
        failedQuizMagic();
    }
}


