var player_data = {
    point:0,
    level:1,
}

var max_level = 6;

const status = Object.freeze({
    MAP: 'map',
    QUIZ: 'quiz',
    BATTLE: 'battle'
});


const magicType = Object.freeze({
    NONE:'none',
    CHANGE_COLOR:'change_color',
    RED: 'red',
    BLUE: 'blue',
    YELLOW: 'yellow',
    ADD_CHAR: 'add_char',
    CHANGE_CHAR: 'change_char',
    SCISSORS: 'scissors',
    EXTRA:'extra'
});



let now_status = status.MAP;




var level_list = {
    1:{needed_point:0, enable_magic:""},
    2:{needed_point:1, enable_magic:magicType.CHANGE_COLOR},
    3:{needed_point:3, enable_magic:magicType.ADD_CHAR},
    4:{needed_point:5, enable_magic:magicType.CHANGE_CHAR},
    5:{needed_point:6, enable_magic:magicType.SCISSORS},
    6:{needed_point:10000, enable_magic:magicType.EXTRA}
}




var quiz_list ={
    "Q1":{
        title:"謎1",
        field:'Q1st',
        //origin_image : "images/pro_quiz_image.png",
        magics:{
            [magicType.NONE]:{
                image:"images/pro_quiz_image.png",
                answer:"答え1",
                hint:"ヒントです1",
                point: 10,
            },
            [magicType.RED]:{
                image:"images/pro_quiz_image.png",
                answer:"答えred",
                hint:"ヒントですred",
                point: 10,
                place:{
                    x: 10, y: 10,  // 座標%
                    w: 50, h: 50   // サイズ%
                }
            },
            [magicType.ADD_CHAR]:{
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
            /*
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
            "yellow":{},
            
            "change_char":{},
            "scissors":{}
            */
        },
        /*
        involved_magic:"none",
        number_of_quiz:3,
        answered_time:0,
        */
    },
    "Q2":{
        title:"謎2",
        field:'Q1st',
        magics:{
            [magicType.NONE]:{
                image:"images/pro_quiz_image.png",
                answer:"答え1",
                hint:"ヒントです1",
                point: 10,
            },
            [magicType.RED]:{
                image:"images/pro_quiz_image.png",
                answer:"答えred",
                hint:"ヒントですred",
                point: 10,
                place:{
                    x: 10, y: 10,  // 座標%
                    w: 50, h: 50   // サイズ%
                }
            },
            [magicType.ADD_CHAR]:{
                image:"images/add.png",
                answer:"答えadd",
                hint:"ヒントですadd",
                point: 10,
                answered:false,
                place:{
                    x: 10, y: 10,  // 座標%
                    w: 50, h: 50   // サイズ%
                }
            }
        }
        
    },
    "Q3":{
        title:"謎3",
        field:'Q1st',
        magics:{
            [magicType.NONE]:{
                image:"images/pro_quiz_image.png",
                answer:"答え1",
                hint:"ヒントです1",
                point: 10,
            },
            [magicType.RED]:{
                image:"images/pro_quiz_image.png",
                answer:"答えred",
                hint:"ヒントですred",
                point: 10,
                place:{
                    x: 10, y: 10,  // 座標%
                    w: 50, h: 50   // サイズ%
                }
            },
            [magicType.ADD_CHAR]:{
                image:"images/add.png",
                answer:"答えadd",
                hint:"ヒントですadd",
                point: 10,
                answered:false,
                place:{
                    x: 10, y: 10,  // 座標%
                    w: 50, h: 50   // サイズ%
                }
            }
        }
    }   
}









var selected_magic = null;


var quiz_id = null;







window.onload = function(){
    initializeQuizDataList(quiz_list);
}




function initializeQuizDataList(q_list){
    for (let Q in q_list) {
        q_list[Q].origin_image = q_list[Q].magics[magicType.NONE].image;
        q_list[Q].involved_magic = magicType.NONE;
        q_list[Q].number_of_quiz = Object.keys(q_list).length;
        q_list[Q].answered_time = 0;
        for(let m in q_list[Q].magics){
            q_list[Q].magics[m].answered = false;
        }
    }
}








function openQ(n){
    quiz_id = n;
    quiz_data = quiz_list[quiz_id];
    const quiz_back = document.getElementById("Q_back");
    const quiz_sheet = document.getElementById("Q_sheet");
    const quiz_title = quiz_sheet.querySelector(".quiz_title");
    const quiz_image = quiz_sheet.querySelector(".quiz_image");
    const answer_box = quiz_sheet.querySelector(".answer_box");
    const magics = document.getElementById("magics");
    quiz_title.textContent = quiz_data.title;
    quiz_image.src = quiz_data.origin_image;
    quiz_data.involved_magic=magicType.NONE;
    
    answer_box.disabled = (quiz_data.answered_time >= quiz_data.number_of_quiz);
    
    if (quiz_data.answered_time >= quiz_data.number_of_quiz){
        answer_box.value = "-----"
    }else{
        answer_box.value = "";
    }
    
    now_status = status.QUIZ;
    magics.style.display = 'flex';
    quiz_sheet.style.display = 'block';
    quiz_back.style.display = 'block';
    
    const map = document.getElementById("map");
    map.style.filter = "blur(10px)";
}



function closeQ(){
    const quiz_back = document.getElementById("Q_back");
    const quiz_sheet = document.getElementById("Q_sheet");
    const magics = document.getElementById("magics");
    
    now_status = status.MAP;
    magics.style.display = 'none';
    quiz_sheet.style.display = 'none';
    quiz_back.style.display = 'none';
    const map = document.getElementById("map");
    map.style.filter = "none";
    var quiz_id = null;
    
    checkLevel()
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
        pop_tx = "この問題はすでに解いているようだ<br>正解："+quiz_data.magics[quiz_data.involved_magic].answer;
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
    checkLevel()
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
    menu_level = document.getElementById("menu_level");
    menu_point = document.getElementById("menu_point");
    menu_point_bar = document.getElementById("menu_point_bar");
    menu_level.textContent = "Lv." + player_data.level + " 主人公";
    menu_point.textContent = player_data.point+"pt";
    let now_level_point = level_list[player_data.level].needed_point
    let bar_percentage = 
        (player_data.point-now_level_point)*100/(level_list[player_data.level+1].needed_point-now_level_point);
    menu_point_bar.value = player_data.point;
    
}


function closeMenu(){
    document.querySelector(".slide_menu").classList.toggle('active');
    const menu_back = document.getElementById("menu_back");
    menu_back.style.display = 'none';
}





function openMagic(n) {
    selectMagic(n);
    if (now_status == status.QUIZ){
        openQuizMagic(n);
        console.log("openMagic")
    }else if(now_status==status.BATTLE){
        openBattleMagic(n);
    }
}


function selectMagic(n){
    past_selected_magic_icon = document.querySelector("."+selected_magic);
    if(past_selected_magic_icon != null){
        past_selected_magic_icon.style.border = "2px solid rgba(255,255,255,0)";
        //さっきまで選ばれていたmagicのボーダーをOFFにする
    }
    
    selected_magic = n;
    //selected_magicを更新する
    
    selected_magic_icon = document.querySelector("."+selected_magic);
    
    if(selected_magic_icon != null){
        selected_magic_icon.style.border = "2px solid rgba(255,255,255,1)"; 
    }
    
}



function openQuizMagic(n){
    if(quiz_data.involved_magic == magicType.NONE){
        magic_canvas = document.getElementById("quiz_magic_canvas");
        magic_back = document.getElementById("quiz_magic_back"); 
        magic_canvas.style.display = 'block';
        magic_back.style.display = 'block';
    }
    else{
        popTitling("技は追加できません");
        popTexting("1度謎を閉じてから再度開けて技をかけてください");

        openPop();
    }
}




function openColorMagic(){
    const open_color_back = document.getElementById("open_color_back");
    if(open_color_back.style.display != 'block'){
        document.querySelector(".color_menu").classList.toggle('open');
        open_color_back.style.display = 'block';
        console.log("openColorMagic")
    }
}

function closeColorMagic(){
    document.querySelector(".color_menu").classList.toggle('open');
    const open_color_back = document.getElementById("open_color_back");
    open_color_back.style.display = 'none';
    console.log("openColorMagic")
}














function failedQuizMagic(){
    magic_canvas = document.getElementById("quiz_magic_canvas");
    magic_back = document.getElementById("quiz_magic_back"); 
    magic_canvas.style.display = 'none';
    magic_back.style.display = 'none';
    
    selectMagic(null);


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
    selectMagic(null);
    
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




function checkLevel(){
    player_point = player_data.point;
    player_level = player_data.level;
    
    if(player_level<max_level){
        next_level_point = level_list[player_level+1].needed_point;
        if(player_point >= next_level_point){
            player_data.level += 1;

            let pop_tl = "新しい技を覚えた！";
            let pop_tx = "メニューから技を確認しよう！";

            popTitling(pop_tl);
            popTexting(pop_tx);


            openPop();

            const enableMagic = level_list[player_data.level].enable_magic;
            const new_magic_icon = document.querySelectorAll("." + enableMagic);
            new_magic_icon.forEach(icon => {
                icon.style.display = 'block';
                console.log("blockにした");
            });
        }



    }
    
}









