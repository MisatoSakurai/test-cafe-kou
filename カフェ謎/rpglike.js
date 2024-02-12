




//--data&variable-------

var player_data = {
    point:0,
    level:1,
}

var max_level = 4;
//maxのレベルを保管する


const status = Object.freeze({
    TITLE:"title_sheet",
    STORY:"story",
    MAP: 'map',
    QUIZ: 'quiz',
    BOARD: 'board',
    BOOK: 'monster_book',
    BATTLE: 'battle',
    CLEAR:"clear"
});
//存在するプレイヤーの状況を管理



const stage = Object.freeze({
    PRAIRIE: 'prairie',
    ROCKY: 'rocky',
    CASTLE: 'castle'
});
//存在するステージの名前を管理



const images = Object.freeze({
    QICON: 'images/icons/謎アイコン.png',
    DARKSTAR: 'images/icons/正解数アイコン（暗）.png',
    LIGHTSTAR: 'images/icons/正解数アイコン（明）.png',
    UP: 'images/icons/up_arrow.png',
    UNDER: 'images/icons/under_arrow.png',
    
});
//iconのimageを管理












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
//存在する魔法のidを管理


const magic_info = Object.freeze({
    [magicType.NONE]:{
        name:'なし'
    },
    [magicType.CHANGE_COLOR]:{
        name:'色変え魔法',
        image:"images/icons/色変化.png",
        selected_image:"images/icons/色変化.png"
    },
    [magicType.ADD_CHAR]:{
        name:'ロ足し魔法',
        image:"images/icons/枠追加.png",
        selected_image:"images/icons/枠追加.png"
    },
    [magicType.CHANGE_CHAR]:{
        name:'文字変え魔法',
        image:"images/icons/文字変化.png",
        selected_image:"images/icons/文字変化.png"
    },
    [magicType.SCISSORS]:{
        name:'ハサミ魔法',
        image:"images/icons/カット.png",
        selected_image:"images/icons/カット.png"
    }
});

//魔法の名前管理


let enable_magic_list = [];
//現在使える魔法一覧


let now_status = status.TITLE;
//今の状況が、mapなのか、quizなのか、battleなのか、とかを保管する


let now_place = stage.PRAIRIE;
//今の場所が、map上のどこなのか（prairie、rocky、castle）を保管する




var level_list = {
    1:{needed_point:0, enable_magic:magicType.ADD_CHAR},
    2:{needed_point:5, enable_magic:magicType.CHANGE_COLOR},
    3:{needed_point:50, enable_magic:magicType.CHANGE_CHAR},
    4:{needed_point:500, enable_magic:magicType.SCISSORS},
}

//本当は、0,5,50,500



var point_list = {
    1:2.5,
    2:7,
    3:8,
    4:1
}





var quiz_list ={
    "Q1":{
        field:stage.PRAIRIE,
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/prairie/1_寿司.png",
                answer:"カイロ",
                hint:"3つのイラストはとある食べ物を表しています。<br>そして、真ん中のイラストには海苔が巻かれているようです。",
            },
            [magicType.YELLOW]:{
                image:"images/quiz/prairie/1_寿司_色変え.png",
                answer:"カイゴ",
                hint:"3つのイラストはとある食べ物を表しています。そして、真ん中のイラストには海苔が巻かれているようです。",
                place:{
                    x: 16, y: 15,  // 座標%
                    w: 16, h: 5   // サイズ%
                }
            }
        }
    },
    "Q2":{
        field:stage.PRAIRIE,
        magics:{
            [magicType.NONE]:{
                image:"images/pro_quiz_image.png",
                answer:"答え2",
                hint:"ヒントです2",
            }
        }
        
    },
    "Q3":{
        field:stage.PRAIRIE,
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/prairie/3_ハンガー傘.png",
                answer:"サンカク",
                hint:"ヒントはありません",
            }
        }
    },
    "Q4":{
        field:stage.PRAIRIE,
        magics:{
            [magicType.NONE]:{
                image:"images/pro_quiz_image.png",
                answer:"答え4",
                hint:"ヒントです",
            }
        }
        
    },
    "Q5":{
        field:stage.PRAIRIE,
        magics:{
            [magicType.NONE]:{
                image:"images/pro_quiz_image.png",
                answer:"答え5",
                hint:"ヒントです",
            }
        }
        
    },
    "Q11":{
        field:stage.CASTLE,
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/castle/4_干支.png",
                answer:"マル",
                hint:"ヒントなし",
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/castle/4_干支_文字変え.png",
                answer:"シル",
                hint:"ヒントなし",
                place:{
                    x: 32, y: 57,  // 座標%
                    w: 7, h: 7   // サイズ%
                }
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/castle/4_干支_ハサミ.png",
                answer:"マリ",
                hint:"ヒントなし",
                place:{
                    x: 79, y: 0,  // 座標%
                    w: 10, h: 10   // サイズ%
                }
            }
        }
    },
}


const board_data = {
    magics:{
        [magicType.NONE]:{
            image:"images/board/導入看板.png",
        },
        [magicType.SCISSORS]:{
            image:"images/board/導入看板_ハサミ.png",
            place:{
                    x: 56, y: 16,  // 座標%
                    w: 6, h: 10   // サイズ%
                },
        }
    }
}


var selected_magic = null;
//今選択されている魔法の名前を一時保管する


var quiz_id = null;
//今解いている謎の名前(id)を一時保管する





const tutorialType = Object.freeze({
    STORY:"story",
    OPENQUIZ:"open_quiz_tutorial",
    TACKLEQUIZ:"how_to_tackle_quiz",
    ANSWEREDQUIZ:"answered_quiz_tutorial",
    MAGIC:"magic_tutorial",
    USEMAGICTOQUIZ:"let_use_magic_to_quiz",
    MONSTER:"monster_tutorial",
    MENU:"menu",
});
//tutorialの種類を管理








const speaker = Object.freeze({
    P:"player",
    N:"narration",
    G:"god"
});




const story_tutorial_list = [
    ["action",{ func: showBack, subject: "story_sogen"}],
    [speaker.P,"「……ここは…一体…？」"],
    [speaker.N,"ゲームを始めようとボタンを押したあなたは気づくと広い草原の中にいました"],
    [speaker.G,"——ようやく目覚めたのですね"],
    [speaker.N,"突如頭の中に語りかける声が聞こえてきました<br>しかし辺りを見回しても姿は見えません"],
    [speaker.G,"——周りにはいませんよ<br>これはあなたの頭に直接語りかけていますので"],
    [speaker.P,"「ど、どういうことだ！<br>そんなことはゲームの世界でしか起こらないだろ！」"],
    [speaker.G,"——いやここゲームの世界なんだけど"],
    [speaker.P,"「え…？」"],
    [speaker.N,"ありえない事実にあなたは驚きを隠せませんでした"],
    [speaker.P,"「ゲームの世界にいる…？」"],
    [speaker.G,"——はい、その通りです"],
    [speaker.N,"あなたはどうやらこのゲームの世界に迷いこんでしまったみたいです"],
    ["action",{ func: showImg, subject: "images/board/導入看板.png" }],
    [speaker.G,"——このゲームの世界は、ゲームをクリアすることで抜け出せるので、抜け出したいならば看板に書かれたクリア条件を達成してください"],
    [speaker.N,"あなたは目の前に置かれた看板を見ました<br>そこには確かにゲームクリア条件のようなものが書いてありました"],
    [speaker.P,"「これを達成すれば元の世界に戻れるということか！<br>頑張るぞ～」"],
    [speaker.G,"——ちょっと待ってください<br>あなたって普通の現代人ですよね？"],
    [speaker.P,"「ああ、そうです」"],
    [speaker.G,"——しかも謎解きとかいう机に向かってやるような趣味を普段からやられている方ですよね？"],
    [speaker.P,"「…まあ、そうですけど」"],
    [speaker.G,"——あなたのような貧弱な人間には力でモンスターを倒すことはできないと思いますよ"],
    [speaker.P,"「え～そんな～」"],
    [speaker.N,"絶望的な状況にあなたは落胆してしまいました"],
    [speaker.G,"——しかしあなたにも希望はあります<br>それは、”魔法”を使って敵を倒すことです！"],
    [speaker.P,"「魔法…？」"],
    [speaker.G,"——ゲームの世界に今入り込んだあなたはレベル1の状態ですね<br>実はレベルが1つ上がると新たな魔法を使うことができるようになります"],
    [speaker.G,"——魔法をうまく使うことで敵を倒すことができるかもしれません<br>特にあなたのようなひらめきで世界を変えられるような方ならば"],
    [speaker.P,"「そうか、それで得た魔法を使って敵を倒すことはできるかもしれないのか<br>レベルを上げるにはどうしたらいいんだ？」"],
    [speaker.G,"——それはもちろん、あなたの得意な謎解きに正解することで上げることができます"],
    [speaker.P,"「そうしたら謎を解いて早くクリアしよう！」"],
    [speaker.N,"あなたは勇んでゲームを始めることにしたのでした……"],
    ["action",{ func: hideImg, subject: "images/board/導入看板.png" }],
    ["action",{ func: hideBack, subject: "story_sogen"}]
]



const open_quiz_tutorial_list =[
    [speaker.G,"——それではこのゲームの進め方を説明しますね<br>謎の解き方について説明します"],
    ["action",{ func: pointOut, subject: "Q1_icon"}],
    [speaker.G,"——このアイコンがついている場所には謎があります。<br>試しにこのアイコンをタップしてみましょう"], 
    ["action",{ func: finishPoint, subject: "なし"}]
]




const tackle_quiz_tutorial_list = [
    [speaker.G,"——問題が出てきましたね、これを解き明かしていくことでレベルが上がります"],
    [speaker.G,"——答えがわかったら四角に入力して送信してみましょう<br>わからないときはヒントを活用してくださいね"]
]



const use_magic_list = [
    [speaker.G,"——どうやらここには謎がないみたいですね"],
    [speaker.G,"——ああ、そうだ、ひとつ言い忘れていたことがあるんですが"],
    [speaker.G,"——実はあなたが手に入れた魔法は謎に使うこともできるんです"],
    [speaker.G,"——謎を解く画面で左上に表示されるアイコンをタップし、使う場所を正しく選択すると謎に対して魔法を使うことができます"],
    [speaker.G,"——魔法が使える場所にはそれぞれルールがあるので注意してください"],
    [speaker.G,"——魔法を使うことで導かれた新たな答えも経験値を上げるのに使うことができるのでぜひ活用してください"],
    [speaker.G,"——それでは、健闘を祈ります"]
    
]

const answered_quiz_list = [
    [speaker.G,"——正解です！経験値が溜まりましたね<br>この調子で問題を解いていきましょう！"]
]

const got_magic_list = [
    ["action",{func: pointOut, subject:'B1_icon'}],
    [speaker.G,"——ついに魔法を手に入れたのですね！<br>これを使って敵と戦ってみましょう"], 
    ["action",{func: finishPoint, subject:'B1_icon'}]
]


const monster_tutorial_list = [
    [speaker.G,"——次に敵と倒す際の説明をします"],
    ["action",{func: pointOut, subject:"B1_icon"}],
    [speaker.G,"——敵のアイコンをタップすると…"],
    ["action",{func: finishPoint, subject:'B1_icon'}],
    ["action",{func: hideObj, subject:"B1_command"}],
    ["action",{func: openBattle, subject:'B1'}],
    [speaker.G,"——こんな画面になります"],
    [speaker.G,"——ここであなたは何か行動をすることができます"],
    [speaker.G,"——直接戦うこともできますが……確実にやられてしまうでしょう"],
    [speaker.G,"——そしてあなたの行動が終わると敵からの攻撃が来ます"],
    [speaker.G,"——普通の体であるあなたはほぼ確実にやられてしまうのでこの攻撃の前に敵を倒さなければなりません"],
    [speaker.G,"——｢魔法｣から選択して用いることで敵を倒しましょう<br>ちょっとしたひらめきで道を切り開くことができるかもしれません"],
    ["action",{func: closeBattle, subject:'B1'}],
    ["action",{func: finishHide, subject:"B1_command"}],
]





const menu_tutorial_list = [
    [speaker.G,"——最後にメニューについて軽く説明しておきますね"],
    ["action",{func: pointOut, subject:"menu_button"}],
    [speaker.G,"——右上のアイコンをタップすることでメニューを開くことができます"],
    ["action",{func:finishPoint, subject:"なし"}],
    ["action",{func:openMenu, subject:"なし"}],
    [speaker.G,"——ここには現在のレベルや魔法の説明など情報が載っています"],
    [speaker.G,"——次のレベルに行くには何問の謎に答える必要があるのかなども知ることができるのでぜひ活用してください"],
    ["action",{func: pointOut, subject:"menu_monster"}],
    [speaker.G,"——また、重要なのが「モンスター図鑑」というもの"],
    [speaker.G,"——これはすでに集まっているモンスターについての情報です<br>うまく倒せないときは参考にしてみてください"],
    ["action",{func: finishPoint, subject:"なし"}],
    ["action",{func:closeMenu, subject:"なし"}],
    [speaker.G,"——伝えることは以上です<br>この説明はメニューから再度見ることができるので必要があればそちらから参照してください"],
    [speaker.G,"——それでは、あなたが無事ゲームから抜け出せることを期待していますよ"],
]







let tutorials = {
    [tutorialType.STORY]:{
        finish:true,
        talk:story_tutorial_list
    },
    [tutorialType.OPENQUIZ]:{
        finish:true,
        talk:open_quiz_tutorial_list
    },
    [tutorialType.USEMAGICTOQUIZ]:{
        finish:false,
        talk:use_magic_list
    },
    [tutorialType.TACKLEQUIZ]:{
        finish:false,
        talk:tackle_quiz_tutorial_list
    },
    [tutorialType.ANSWEREDQUIZ]:{
        finish:false,
        talk:answered_quiz_list
    },
    [tutorialType.MAGIC]:{
        finish:false,
        talk:got_magic_list
    },
    [tutorialType.MONSTER]:{
        finish:false,
        talk:monster_tutorial_list
    },
    [tutorialType.MENU]:{
        finish:false,
        talk:menu_tutorial_list
    },
}
//各チュートリアルを終えているかどうか、各チュートリアルの会話list



const log_name = Object.freeze({
    CANTQUIT:"cannot_quit_game",
    WINMONSTER:"win_B1",
});


let log_list =  {
    [log_name.CANTQUIT]:[[speaker.N,"ERROR<br>ゲームをやめることができない"]],
    [log_name.WINMONSTER]:[[speaker.N,"次のステージへ進めるようになった！"]],
    
 
}


let current_dialog_num = -1;
//text_log用の

let current_tutorial = "";
//今やってるチュートリアル




let monster_list = {
    'B1':{
        point:10,
        finish:false
    },
    'B2':{
        point:10,
        finish:false
    }
}












let meet_clear_condition = false;





//-- initialize --------

window.onload = function(){
    initializeMagicIcons();
    initializeQuizDataList(quiz_list);
}




function initializeQuizDataList(q_list){
    for (let Q in q_list) {
        q_list[Q].origin_image = q_list[Q].magics[magicType.NONE].image;
        q_list[Q].involved_magic = magicType.NONE;
        q_list[Q].number_of_quiz = Object.keys(q_list[Q].magics).length;
        q_list[Q].answered_time = 0;
        q_list[Q].enable_num_of_quiz = 1;
        q_list[Q].icon_id = Q + "_icon";
        q_icon = document.getElementById(q_list[Q].icon_id);
        console.log(q_icon);
        q_icon.src = images.QICON;
        for(let m in q_list[Q].magics){
            q_list[Q].magics[m].answered = false;
            q_list[Q].magics[m].point = 1;
        }
    }
}



function initializeMagicIcons(){
    for (let M in magicType){
        magic_id = magicType[M];
        magic_icon = document.getElementById(magic_id + "_icon");
        if(magic_icon == null){
            continue;
        }
        console.log("url(" + magic_info[magic_id].image + ")");
        magic_icon.style.backgroundImage = "url(" + magic_info[magic_id].image + ")";
    }
}






//-- title & tutorial ------

function startGame(){
    title_sheet = document.getElementById("title_sheet");
    if (tutorials[tutorialType.STORY].finish){
        map = document.getElementById("map");
        title_sheet.style.display = 'none';
        map.style.display = 'block';
        now_status = status.MAP;
        if(!tutorials[tutorialType.OPENQUIZ].finish){
            doTutorial(tutorialType.OPENQUIZ);
        }
        
        
    }else{
        title_sheet.style.display = 'none';
        now_status = status.STORY;
        doTutorial(tutorialType.STORY);
    }
}




function quitGame(){
    if(meet_clear_condition){
        clearGame();
    }
    else{
        
        
        popTexting("");
        popTitling("ERROR");
        openPop();
        
        /*showLog(log_name.CANTQUIT)*/
    }
}




function clearGame(){
    /*popTexting("クリアの条件を満たした！");
    popTitling("CLEAR");
    openPop();*/

    clear_sheet = document.getElementById("clear_sheet");
    title_sheet = document.getElementById("title_sheet");
    clear_sheet.style.display = 'block';
    title_sheet.style.display = 'none';
    now_status = status.CLEAR;


}





function moveTitle(){
    title_sheet = document.getElementById("title_sheet");
    map = document.getElementById("map");
    title_sheet.style.display = 'block';
    map.style.display = 'none';
    closeMenu();
    now_status = status.TITLE;
}






function showBack(subject){
    back = document.getElementById(subject);
    back.style.display = "block";
}


function hideBack(subject){
    back = document.getElementById(subject);
    back.style.display = "none";
}




function showImg(subject){
    image = document.getElementById("tutorial_image");
    image.src = subject;
    image.style.display = "block";
}

function hideImg(subject){
    image = document.getElementById("tutorial_image");
    image.src = subject;
    image.style.display = "none";
}

function pointOut(subject){
    target = document.getElementById(subject);
    if (target == null) {
        target = document.querySelector(subject);
    }
    rect = target.getBoundingClientRect();
    style = window.getComputedStyle(target);
    marginbottom= parseInt(style.getPropertyValue("margin-bottom"), 10);
    pointer = document.getElementById("pointer");
    pointer.style.top = rect.top + rect.height + marginbottom + 5 +  "px";
    pointer.style.left = rect.left + rect.width/2 + "px";
    pointer.style.display = "block";
}


function finishPoint(subject) {
    pointer = document.getElementById("pointer");
    pointer.style.display = "none";
}


function hideObj(subject){
    obj = document.getElementById(subject);
    obj.style.display = "none";
}

function finishHide(subject){
    sub = document.getElementById(subject);
    sub.style.display = "block";
}






function doTutorial(n){
    tutorial_page = document.getElementById("tutorial");
    
    
    if (!tutorials[n].finish){
        
        openGeneTextLog()
        tutorial_page.style.display="block";
        
        current_tutorial = n;
        current_dialog_num = -1;
        current_dialog_list = tutorials[current_tutorial].talk;
        displayNextDialog();
    }
    else{
        tutorial_page.style.display="none";
        closeGeneTextLog()
        current_tutorial ="";
        
        if (n==tutorialType.STORY){
            startGame();
        }
        
        if (n==tutorialType.ANSWEREDQUIZ){
            if(!tutorials[tutorialType.MONSTER].finish){
                doTutorial(tutorialType.MONSTER);
            }
        }
        if (n==tutorialType.MONSTER){
            if(!tutorials[tutorialType.MENU].finish){
                doTutorial(tutorialType.MENU);
            }
        }
    }
    
}






function openGeneTextLog(){
    text_log = document.getElementById("gene_text_log");
    text_log.style.display = "flex";
    text_log_back = document.getElementById("text_log_back");
    text_log_back.style.display = "block";
}

function closeGeneTextLog(){
    text_log = document.getElementById("gene_text_log");
    text_log.style.display = "none";
    text_log_back = document.getElementById("text_log_back");
    text_log_back.style.display = "none";
}




function displayNextDialog(){
    text_log = document.getElementById("gene_text_log");
    text_log_speaker = text_log.querySelector(".text_log_speaker");
    text_log_sentence = text_log.querySelector(".text_log_sentence");
    text_log_back = document.getElementById("text_log_back");
    text_log_back.style.display = "block";
    
    
    pop_back = document.getElementById("pop_back");
    if(pop_back.style.display != "none" && current_dialog_num != -1){
        if(current_dialog_list[current_dialog_num][0]!="action"){
            return;
        }
    }
    //↑popが表示されているときに変に動かないようにしてる
    
    openGeneTextLog();
    
    
    
    if (current_dialog_num < current_dialog_list.length-1){
        current_dialog_num += 1;
        scene = current_dialog_list[current_dialog_num];
        if(scene[0] != "action") {
            
            text_log_sentence.innerHTML = scene[1];
            //文章を変える
            
            if(scene[0] == speaker.G){
                text_log_speaker.textContent = "＊";
                //text_log_speaker.style.marginLeft = "3%";
            }
            if(scene[0] == speaker.P){
                text_log_speaker.textContent = "主";
                //text_log_speaker.style.marginLeft = "3%";
            }
            if(scene[0] == speaker.N){
                text_log_speaker.textContent = "";
                text_log_speaker.style.marginLeft = "0";
            } 
        }
        else{
            
            scene[1].func(scene[1].subject);
            displayNextDialog();
        }
    }
    
    
    else{
        current_dialog_num = -1;
        current_dialog_list =[];
        closeGeneTextLog();
        if (current_tutorial != "") {
            tutorials[current_tutorial].finish = true;
            doTutorial(current_tutorial);
        }
        checkLevel();
    }
}















//-- quiz --------


function createStarElement(image) {
    var star = document.createElement("div");
    star.classList.add("star");
    if(image == images.DARKSTAR){
        star.classList.add("dark_star");
    }else{
        star.classList.add("light_star");
    }
    return star;
}

function createStars(n,image) {
    var starsContainer = document.getElementById("quiz_stars");
    for (var i = 0; i < n; i++) {
        var star = createStarElement(image);
        starsContainer.appendChild(star);
    }
}

function removeAllStars() {
    var starsContainer = document.getElementById("quiz_stars");
    starsContainer.innerHTML = ""; // 子要素をすべて削除
}



function openQ(n){
    quiz_id = n;
    quiz_data = quiz_list[quiz_id];
    const quiz_back = document.getElementById("QB_back");
    const quiz_sheet = document.getElementById("Q_sheet");
    const quiz_image = quiz_sheet.querySelector(".quiz_image");
    const answer_box = quiz_sheet.querySelector(".answer_box");
    const magics = document.getElementById("magics");
    
    
    
    quiz_image.src = quiz_data.origin_image;
    quiz_data.involved_magic=magicType.NONE;
    
    answer_box.disabled = (quiz_data.answered_time >= quiz_data.number_of_quiz);
    
    if (quiz_data.answered_time >= quiz_data.number_of_quiz){
        answer_box.value = "-----"
    }else{
        answer_box.value = "";
    }
    
    removeAllStars();
    
    
    now_num_ans = quiz_data.enable_num_of_quiz;
    
    let stars = "★".repeat(quiz_data.answered_time);
    stars += "☆".repeat(now_num_ans - quiz_data.answered_time);
    
    createStars(quiz_data.answered_time,images.LIGHTSTAR);
    createStars(now_num_ans - quiz_data.answered_time,images.DARKSTAR);
    
    
    
    now_status = status.QUIZ;
    magics.style.display = 'flex';
    quiz_sheet.style.display = 'block';
    quiz_back.style.display = 'block';
    
    const map = document.getElementById("map");
    map.style.filter = "blur(10px)";
    
    
    if(!tutorials[tutorialType.TACKLEQUIZ].finish){
        doTutorial(tutorialType.TACKLEQUIZ);
    }
}



function closeQ(){
    const quiz_back = document.getElementById("QB_back");
    const quiz_sheet = document.getElementById("Q_sheet");
    const magics = document.getElementById("magics");
    
    now_status = status.MAP;
    magics.style.display = 'none';
    quiz_sheet.style.display = 'none';
    quiz_back.style.display = 'none';
    const map = document.getElementById("map");
    map.style.filter = "none";
    var quiz_id = null;
}

function kataToHira(text) {
    return text.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}

function checkA(){
    const quiz_data = quiz_list[quiz_id]
    const quiz_sheet = document.getElementById("Q_sheet");
    const players_answer_box = quiz_sheet.querySelector(".answer_box");
    const players_answer = players_answer_box.value;
    let pop_tl = "";
    let pop_tx = "";
    
    collect = (players_answer == quiz_data.magics[quiz_data.involved_magic].answer || 
               players_answer == kataToHira(quiz_data.magics[quiz_data.involved_magic].answer));
    
    if(quiz_data.magics[quiz_data.involved_magic].answered == false){
        if(collect){
            
            quiz_data.answered = true;
            pop_tl = "正解!!";
            pop_tx = "A："+quiz_data.magics[quiz_data.involved_magic].answer +"<br>"+"獲得経験値：" + point_list[player_data.level] + "pt";
            quiz_data.magics[quiz_data.involved_magic].answered = true;
            quiz_data.answered_time += 1;
            player_data.point += point_list[player_data.level];
            
            players_answer_box.value = "";
            closeQ();
            
            if(quiz_data.answered_time >= quiz_data.enable_num_of_quiz){
                q_icon = document.getElementById(quiz_data.icon_id);
                q_icon.style.filter = "grayscale(100%)";
            }
            
            if(!tutorials[tutorialType.ANSWEREDQUIZ].finish){
                doTutorial(tutorialType.ANSWEREDQUIZ);
            }

        }else{
            players_answer_box.value = "";
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







//-- pop ------


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









//-- menu ------


function openMenu(nashi){
    const menu_back = document.getElementById("menu_back");
    
    if(menu_back.style.display == 'block'){
        closeMenu();
    }
    else{
        document.querySelector(".slide_menu").classList.toggle('active');
        document.querySelector(".menu_button").classList.toggle('active');

        menu_back.style.display = 'block';
        menu_level = document.getElementById("menu_level");
        menu_point = document.getElementById("menu_point");
        menu_point_bar = document.getElementById("menu_point_bar");
        menu_level.textContent = "Lv." + player_data.level + " 主人公";
        if(player_data.level == max_level){
                menu_level.textContent = "Lv.MAX 主人公";
        }
        menu_point.textContent = player_data.point+"pt";
        let now_level_point = level_list[player_data.level].needed_point
        
        let bar_percentage = 
            (player_data.point-now_level_point)*100/(level_list[player_data.level+1].needed_point-now_level_point);
        menu_point_bar.value = bar_percentage;
    }
}


function closeMenu(nashi){
    document.querySelector(".slide_menu").classList.toggle('active');
    document.querySelector(".menu_button").classList.toggle('active');
    const menu_back = document.getElementById("menu_back");
    menu_back.style.display = 'none';
}








//--magic-------


function openColorMagic(){
    const open_color_back = document.getElementById("open_color_back");
    if(open_color_back.style.display != 'block'){
        document.querySelector(".color_menu").classList.toggle('open');
        open_color_back.style.display = 'block';
    }else{
        closeColorMagic();
    }
}

function closeColorMagic(){
    if(open_color_back.style.display == 'block'){
        document.querySelector(".color_menu").classList.toggle('open');
        const open_color_back = document.getElementById("open_color_back");
        open_color_back.style.display = 'none';
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
        selected_magic_icon.style.border = "2px solid rgba(0,0,0,1)"; 
    }
    
}





function openMagic(n) {
    selectMagic(n);
    
    if (now_status == status.QUIZ){
        if(quiz_data.involved_magic == magicType.NONE){
            magic_canvas = document.getElementById("magic_canvas");
            magic_canvas.style.display = 'block';
        }
        else{
            popTitling("技は追加できません");
            popTexting("1度謎を閉じてから再度開けて技をかけてください");

            openPop();
        }
        
    }
    
    else if(now_status==status.BATTLE){
        openBattleMagic(n);
    }
    
    else if (now_status == status.BOARD){
        if(!meet_clear_condition){
            magic_canvas = document.getElementById("magic_canvas");
            magic_canvas.style.display = 'block';
        }
        else{
            popTitling("技は追加できません");
            popTexting("この看板は修復不可能なようです");
            openPop();
        }
        
    }
}




function useMagic(e){
    var rect = null;
    let square = {
        x: 0, y: 0,  // 座標%
        w: -50, h: -50   // サイズ%
    }
    if(now_status == status.QUIZ){
        rect = document.getElementById("quiz_magic_judge_canvas").getBoundingClientRect(); 
        if (quiz_data.magics[selected_magic]!= null){
            square = quiz_data.magics[selected_magic].place;
        }
    }
    else if(now_status == status.BOARD){
        rect = document.getElementById("board_magic_judge_canvas").getBoundingClientRect();
        if (board_data.magics[selected_magic]!=null){
            square = board_data.magics[selected_magic].place;
        }
    }
    
    const point = {
        x: (e.clientX - rect.left)*100/rect.width,
        y: (e.clientY - rect.top)*100/rect.height
    };
    
    const hit =
          (square.x <= point.x && point.x <= square.x + square.w)  // 横方向の判定
       && (square.y <= point.y && point.y <= square.y + square.h);  // 縦方向の判定

    
    console.log(point);
    if (hit) {
        successMagic();
    }else{
        failedMagic();
    }
    closeColorMagic();
}






function makeBook(e){
    
    
    rect = document.querySelector(".book_content").getBoundingClientRect(); 
    
    const point = {
        x: (e.clientX - rect.left)*100/rect.width,
        y: (e.clientY - rect.top)*100/rect.height
    };
    
    
    console.log(point);
}









function failedMagic(){
    magic_canvas = document.getElementById("magic_canvas");
    magic_canvas.style.display = 'none';
    
    selectMagic(null);


    popTitling("失敗");
    popTexting("そこには使えないようだ");

    openPop();
    
}




function successMagic(){
    magic_canvas = document.getElementById("magic_canvas");
    magic_canvas.style.display = 'none';
    
    if(now_status == status.QUIZ){
        successQuizMagic();
    }
    else if(now_status == status.BOARD){
        successBoardMagic();
    }
}





function successQuizMagic(){
    
    quiz_data.involved_magic = selected_magic;
    selectMagic(null);
    
    const quiz_sheet = document.getElementById("Q_sheet");
    const quiz_image = quiz_sheet.querySelector(".quiz_image");
    quiz_image.src = quiz_data.magics[quiz_data.involved_magic].image;

    popTitling("成功！");
    popTexting("謎が変化した");
    
    openPop();
    
}




function successBoardMagic(){
    
    meet_clear_condition = true;
    selectMagic(null);
    
    const board_sheet = document.getElementById("board_sheet");
    const board_image = document.getElementById("board_image");
    board_image.src = board_data.magics[magicType.SCISSORS].image;

    popTitling("成功！");
    popTexting("看板が変化した");
    
    openPop();
    
}











function checkLevel(){
    player_point = player_data.point;
    player_level = player_data.level;
    
    if(player_level<max_level){
        next_level_point = level_list[player_level+1].needed_point;
        if(player_point >= next_level_point){
            player_data.level += 1;
            
            
            const enableMagic = level_list[player_data.level].enable_magic;
            const new_magic_icon = document.querySelectorAll("." + enableMagic);
            new_magic_icon.forEach(icon => {
                icon.style.display = 'block';
            });
            
            if(enableMagic == magicType.CHANGE_COLOR){
                enable_magic_list.push(magicType.RED);
                enable_magic_list.push(magicType.BLUE);
                enable_magic_list.push(magicType.YELLOW);
                
            }else{
                enable_magic_list.push(enableMagic);
            }

            let pop_tl = "新しい技「" + magic_info[enableMagic].name+ "」を覚えた！";
            let pop_tx = "メニューから技を確認しよう！";

            popTitling(pop_tl);
            popTexting(pop_tx);


            openPop();
            
            for (Q in quiz_list){
                quiz_data  = quiz_list[Q];
                now_num_ans = 1;
                for(var magic of enable_magic_list){
                    if(quiz_data.magics[magic] != null){
                        now_num_ans += 1;
                    }
                }
                
                quiz_data.enable_num_of_quiz = now_num_ans;
                
                if(quiz_data.answered_time < quiz_data.enable_num_of_quiz){
                    q_icon = document.getElementById(quiz_data.icon_id);
                    if(q_icon != null){
                        q_icon.style.filter = "grayscale(0%)";
                    }
                }
            }

            
            
            
            
            
            if(!tutorials[tutorialType.MAGIC].finish){
                doTutorial(tutorialType.MAGIC);
            }
        }



    }
    
}








function openBoard(){
    const board_back = document.getElementById("QB_back");
    const board_sheet = document.getElementById("board_sheet");
    const magics = document.getElementById("magics");
    const board_image = document.getElementById("board_image");
    if (meet_clear_condition){
        board_image.src = board_data.magics[magicType.SCISSORS].image;
    }else{
        board_image.src = board_data.magics[magicType.NONE].image;
    }
    
    now_status = status.BOARD;
    magics.style.display = 'flex';
    board_sheet.style.display = 'block';
    board_back.style.display = 'block';
    
    const map = document.getElementById("map");
    map.style.filter = "blur(10px)";
}




function closeBoard(){
    const board_back = document.getElementById("QB_back");
    const board_sheet = document.getElementById("board_sheet");
    const magics = document.getElementById("magics");
    
    now_status = status.MAP;
    magics.style.display = 'none';
    board_sheet.style.display = 'none';
    board_back.style.display = 'none';
    const map = document.getElementById("map");
    map.style.filter = "none";
}










function openBook(n){
    const book_back = document.getElementById("QB_back");
    const book_sheet = document.getElementById(n);
    const book_image = book_sheet.querySelector(".book_content .book_image");
    const book_title = book_sheet.querySelector(".book_title");
    
    now_status = status.BOOK;
    book_sheet.style.display = 'block';
    book_back.style.display = 'block';
    const map = document.getElementById("map");
    map.style.filter = "blur(10px)";
}




function closeBook(n){
    const book_back = document.getElementById("QB_back");
    const book_sheet = document.getElementById(n);
    now_status = status.MAP;
    book_sheet.style.display = 'none';
    book_back.style.display = 'none';
    const map = document.getElementById("map");
    map.style.filter = "none";
}




function magicBookShowImg(n){
    const book_img = document.getElementById("magic_book_image");
    //book_img.src = "images/book/magic/" + n;
    
}



function monsterBookShowImg(n){
    const book_img = document.getElementById("monster_book_image");
    //book_img.src = "images/book/monster/" + n;
    
}











function moveMap(n){
    current_stage = document.getElementById(now_place);
    next_stage = document.getElementById(n);
    current_stage.style.display = 'none';
    next_stage.style.display = 'block'
    
    now_place = n;
    if(n=='rocky' && tutorials[tutorialType.USEMAGICTOQUIZ].finish == false){
        doTutorial(tutorialType.USEMAGICTOQUIZ);
    }
    
}









function removeMapMonster(n){
    if(n=='B1'){
        b1_icon = document.getElementById("B1_icon");
        b1_icon.style.display= 'none';
        move_button = document.getElementById("button_move_to_rocky");
        move_button.style.display = 'block';
    }
    if(n=="B2") {
        b2_icon = document.getElementById("B2_icon");
        b2_icon.style.display= 'none';
        move_button = document.getElementById("button_move_to_castle");
        move_button.style.display = 'block';
        
    }
    
    
}








function showLog(n){
    current_dialog_num = -1;
    current_dialog_list = log_list[n];
    displayNextDialog();
}








//ここから所有格さん


function openBattle(n){
    const battle = document.getElementById(n)
    battle.style.display = 'block';
}

function closeBattle(n){
    const battle = document.getElementById(n)
    battle.style.display = 'none';
}

function openBattleMagic(){
    const magic = document.getElementById('battle_magic')
    magic.style.display = 'block';
}

function closeBattleMagic(){
    const magic = document.getElementById('battle_magic')
    magic.style.display = 'none';
}

function selectBattleMagic(n){
    const magic = document.getElementById("magic" + n + "_explain")
    magic.style.display = 'block';
}

function closeBattleMagicExplain(n){
    const magic = document.getElementById("magic" + n + "_explain")
    magic.style.display = 'none';
}

function choiceBattleMagic1(){
    const magic = document.getElementById('magic1_colorchoice')
    magic.style.display = 'block';
}

function closeBattleChoice(){
    const magic = document.getElementById('magic1_colorchoice')
    const explain = magic.parentElement
    magic.style.display = 'none';
    explain.style.display = 'none';
}

var using = 0

function useBattleMagic(n){
    const dialog = document.getElementById('using_magic')
    dialog.style.display = 'block'
    using = n
}

function stopBattleUsing(){
    const dialog = document.getElementById('using_magic')
    const explain = document.getElementById(using + '_explain')
    dialog.style.display = 'none'
    if ((using === 2) || (using === 3)){
        explain.style.display = 'none'
    }
    using = 0
}







function changeName(n){
    if(using === 'magic2'){
        if(n ==='B1'){
            document.getElementById('B1_name').textContent = 'ドラゴン';
        }
        if(n ==='B2'){
            document.getElementById('B2_name').textContent = '翼の折れたガーゴイル';
            monster = document.getElementById('monster2')
            victory = document.getElementById('victory')
            runaway = document.getElementById('fall')
            monster.style.animation = 'tremble 1s ease-in-out 0s forwards, fall 0.5s ease-in-out 2s forwards'
            victory.style.display = 'block'
            runaway.style.display = 'block'
            removeMapMonster('B2');
            player_data.point += 492;
            
        }
    }
}

function changeColor(n){
    if(using === 'magic1R'){
        if(n ==='monster1'){
            monster = document.getElementById('monster1')
            victory = document.getElementById('victory')
            runaway = document.getElementById('runaway')
            monster.src = "images/mobs/スライム_赤.png";
            monster.style.animation = 'tremble 1s ease-in-out 0s forwards, runaway 0.5s ease-in-out 1s forwards'
            victory.style.display = 'block'
            runaway.style.display = 'block'
            removeMapMonster('B1');
            player_data.point += 43;
        }
    }
    if(using === 'magic1G'){
        if(n ==='monster1'){
            monster = document.getElementById('monster1')
            //monster.style.color = 'green'
        }
    }
    if(using === 'magic1B'){
        if(n ==='monster1'){
            monster = document.getElementById('monster1')
            //monster.style.color = 'blue'
        }
    }
}

function finishBattle(){
    const victory = document.getElementById('victory')
    const runaway = document.getElementById('runaway')
    const fall = document.getElementById('fall')
    victory.style.display = 'none'
    runaway.style.display = 'none'
    fall.style.display = 'none'
    if((using != 2) && (using != 3)){
        closeBattleChoice()
    }
    stopBattleUsing()
    closeBattleMagic()
    closeBattle('B1')
    closeBattle('B2')
    
    
    //以下text_logを出すものです
    current_dialog_num = -1;
    current_dialog_list = log_list[log_name.WINMONSTER];
    displayNextDialog();
    
    
}




function fail(n){
    
}

//ここまで所有格さん