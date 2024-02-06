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

function openBattle(n){
    const battle = document.getElementById(n)
    battle.style.display = 'block';
}

function closeBattle(n){
    const battle = document.getElementById(n)
    battle.style.display = 'none';
}

function openMagic(){
    const magic = document.getElementById('battle_magic')
    magic.style.display = 'block';
}

function closeMagic(){
    const magic = document.getElementById('battle_magic')
    magic.style.display = 'none';
}

function selectMagic(n){
    const magic = document.getElementById("magic" + n + "_explain")
    magic.style.display = 'block';
}

function closeExplain(n){
    const magic = document.getElementById("magic" + n + "_explain")
    magic.style.display = 'none';
}

function choiceMagic1(){
    const magic = document.getElementById('magic1_colorchoice')
    magic.style.display = 'block';
}

function closeChoice(){
    const magic = document.getElementById('magic1_colorchoice')
    const explain = magic.parentElement
    magic.style.display = 'none';
    explain.style.display = 'none';
}

var using = 0

function useMagic(n){
    const dialog = document.getElementById('using_magic')
    dialog.style.display = 'block'
    using = n
}

function stopUsing(){
    const dialog = document.getElementById('using_magic')
    const explain = document.getElementById(using + '_explain')
    dialog.style.display = 'none'
    if ((using === 2) || (using === 3)){
        explain.style.display = 'none'
    }
    using = 0
}

function fail(){
    if(using != 0){
        
    }
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
            B2 = document.getElementById('selectB2')
            monster.style.animation = 'tremble 1s ease-in-out 0s forwards, fall 0.5s ease-in-out 2s forwards'
            victory.style.display = 'block'
            runaway.style.display = 'block'
            B2.style.display = 'none'
        }
    }
}

function changeColor(n){
    if(using === 'magic1R'){
        if(n ==='monster1'){
            monster = document.getElementById('monster1')
            monster.style.color = 'red'
        }
    }
    if(using === 'magic1G'){
        if(n ==='monster1'){
            monster = document.getElementById('monster1')
            monster.style.color = 'green'
        }
    }
    if(using === 'magic1B'){
        if(n ==='monster1'){
            monster = document.getElementById('monster1')
            victory = document.getElementById('victory')
            runaway = document.getElementById('runaway')
            B1 = document.getElementById('selectB1')
            monster.style.color = 'blue'
            monster.style.animation = 'tremble 1s ease-in-out 0s forwards, runaway 0.5s ease-in-out 1s forwards'
            victory.style.display = 'block'
            runaway.style.display = 'block'
            B1.style.display = 'none'
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
        closeChoice()
    }
    stopUsing()
    closeMagic()
    closeBattle('B1')
    closeBattle('B2')
}