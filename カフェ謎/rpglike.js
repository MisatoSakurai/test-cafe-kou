
//魔法のアイコンが選択された時に他のアイコンを白黒にする→魔法が使い終わったタイミングで元に戻す

//--data&variable-------






var player_data = {
    point:0,
    level:1,
}

const max_level = 4;
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
        name:'カラー',
        image:"images/icons/色変化.png",
        selected_image:"images/icons/色変化.png"
    },
    [magicType.ADD_CHAR]:{
        name:'スクエア',
        image:"images/icons/枠追加.png",
        selected_image:"images/icons/枠追加.png"
    },
    [magicType.CHANGE_CHAR]:{
        name:'文字トランス',
        image:"images/icons/文字変化.png",
        selected_image:"images/icons/文字変化.png"
    },
    [magicType.SCISSORS]:{
        name:'ハサミ',
        image:"images/icons/カット.png",
        selected_image:"images/icons/カット.png"
    }
});

//魔法の名前管理


let enable_magic_list = [];
//現在使える魔法一覧




const monster_book_list= [
    "にゃげぼうし",
    "ガーザイル",
    "キャンサービジョン",
    "バッドトークバット",
    "ブルースライム",
    "立つ辰",
]


const magic_book_list = [
    
    "スクエア",
    "カラー",
    "文字トランス",
    "ハサミ",
]








let now_status = status.TITLE;
//今の状況が、mapなのか、quizなのか、battleなのか、とかを保管する


let now_place = stage.PRAIRIE;
//今の場所が、map上のどこなのか（prairie、rocky、castle）を保管する





const level_list = {
    1:{needed_point:0, enable_magic:magicType.ADD_CHAR},
    2:{needed_point:5, enable_magic:magicType.CHANGE_COLOR},
    3:{needed_point:50, enable_magic:magicType.CHANGE_CHAR},
    4:{needed_point:500, enable_magic:magicType.SCISSORS},
}

//本当は、0,5,50,500


const point_list = {
    1:1,
    2:1,
    3:1,
    4:1
}


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


const quiz_place_list = {
    prairie:[1,2,3,6,8,12,13,16,17,19],
    castle:[4,5,7,9,10,11,14,15,18,20]
}




var quiz_list ={
    1:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/31_寿司.png",
                answer:"カイロ",
                hint:"3つのイラストはとある食べ物を表しています。<br>そして、真ん中のイラストには海苔が巻かれているようです。",
            },
            [magicType.YELLOW]:{
                image:"images/quiz/31_寿司_色.png",
                answer:"カイゴ",
                place:{
                    x: 16, y: 12,  // 座標%
                    w: 16, h: 5   // サイズ%
                }
            }
        }
    },
    
    2:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/3_ハンガー傘.png",
                answer:"サンカク",
                hint:"右の棒を左の三角につけたとき、何に見えるでしょうか？上につけたときと下につけたときで違うようです。",
            },
        }
        
    },
    
    3:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/14_色付き英字.png",
                answer:["ラック","LUCK"],
                hint:"",
            },
            [magicType.RED]:{
                image:"images/quiz/14_色付き英字_色.png",
                answer:["ロック","LOCK"],
                place:{
                    x: 41, y: 41,  // 座標%
                    w: 5, h: 5   // サイズ%
                }
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/14_色付き英字_鋏.png",
                answer:["スター","STAR"],
                place:{
                    x: 20, y: 0,  // 座標%
                    w: 10, h: 10   // サイズ%
                }
            }
        }
        
    },
    
    4:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/5_語呂ろくろ.png",
                answer:"ゴロ",
                hint:"それぞれの文字がいくつあるかに着目しましょう。どうやら数字と文字で言葉が作られているようです。",
            },
            [magicType.ADD_CHAR]:{
                image:"images/quiz/5_語呂ろくろ_□.png",
                answer:"ロクロ",
                place:{
                    x: 65, y: 14,  // 座標%
                    w: 25, h: 29   // サイズ%
                }
            }
        }
        
    },
    
    5:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/9_剣盾_v3.png",
                answer:"ソフト",
                hint:"上の四角には攻撃と防御、下の四角には攻撃するものと防御するものが埋まるようです。",
            },
            [magicType.ADD_CHAR]:{
                image:"images/quiz/9_剣盾_v3_□.png",
                answer:"レフト",
                place:{
                    x: 50, y: 54,  // 座標%
                    w: 12, h: 10   // サイズ%
                }
            },
        }
        
    },
    6:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/12_★迷路.png",
                answer:"サイン",
                hint:"はじめは下の方に行きましょう。",
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/12_★迷路_字.png",
                answer:"サイテキカイ",
                place:{
                    x: 36, y: 9,  // 座標%
                    w: 4, h: 6   // サイズ%
                }
            },
        }
        
    },
    7:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/13_反転文字.png",
                answer:"ニモノ",
                hint:"右側の問題文は｢コレハナニ？｣と書かれています。これらにはどういった規則があるかを考えてみましょう。答えは3文字になります。",
            },
            [magicType.ADD_CHAR]:{
                image:"images/quiz/13_反転文字_□.png",
                answer:"エモノ",
                place:{
                    x: 36, y: 23,  // 座標%
                    w: 10, h: 14   // サイズ%
                }
            }
        }
        
    },
    8:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/11_26分数.png",
                answer:"ハード",
                hint:"26といえばアルファベットの個数が考えられます。各数字に対応したアルファベットに変換してみましょう。",
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/11_26分数_鋏.png",
                answer:"カード",
                place:{
                    x: 21, y: -2,  // 座標%
                    w: 10, h: 11   // サイズ%
                }
            }
        }
        
    },
    9:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/20_部首の名前.png",
                answer:"シカク",
                hint:"それぞれのカタカナは漢字に関するあるパーツを表しています。ウは上側、イは左側、リは右側に来ることが多いです。",
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/20_部首の名前_字.png",
                answer:"シズク",
                place:{
                    x: 18, y: 64,  // 座標%
                    w: 7, h: 10   // サイズ%
                }
            }
        }
        
    },
    10:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/23_ピースはめ.png",
                answer:"カタチ",
                hint:"赤矢印が｢たに｣になるようにピースを配置し、そこからうまくはまるように考えてみましょう。",
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/23_ピースはめ_鋏.png",
                answer:"クウキ",
                hint:"ピースは関係ないので赤矢印が通る2マスには｢た｣と｢に｣が入るようです。どうやらとある有名な表の一部を使っているようです。",
                place:{
                    x: 42, y: -2,  // 座標%
                    w: 5, h: 12   // サイズ%
                }
            }
        }
        
    },
    
    11:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/4_干支.png",
                answer:"マル",
                hint:"ヒントなし",
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/4_干支_字.png",
                answer:"シル",
                hint:"ヒントなし",
                place:{
                    x: 32, y: 57,  // 座標%
                    w: 7, h: 7   // サイズ%
                }
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/4_干支_ハサミ.png",
                answer:"マリ",
                hint:"ヒントなし",
                place:{
                    x: 79, y: -2,  // 座標%
                    w: 10, h: 12   // サイズ%
                }
            }
        }
    },
    12:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/24_じゃんけん.png",
                answer:"マカイ",
                hint:"",
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/24_じゃんけん_鋏.png",
                answer:"カイキ",
                place:{
                    x: 40, y: -2,  // 座標%
                    w: 10, h: 12   // サイズ%
                }
            }
        }
        
    },
    13:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/26_一口.png",
                answer:"ダシン",
                hint:"",
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/26_一口_鋏.png",
                answer:"カクチ",
                place:{
                    x: 21, y: -2,  // 座標%
                    w: 10, h: 12   // サイズ%
                }
            }
        }
        
    },
    14:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/29_上下文字つなぎ.png",
                answer:"カイフク",
                hint:"",
            },
            [magicType.ADD_CHAR]:{
                image:"images/quiz/29_上下文字つなぎ_□.png",
                answer:"モザイク",
                place:{
                    x: 68, y: 77,  // 座標%
                    w: 10, h: 10   // サイズ%
                }
            }
        }
        
    },
    15:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/30_サイコロ.png",
                answer:"プロジェクト",
                hint:"",
            },
            [magicType.RED]:{
                image:"images/quiz/30_サイコロ_色.png",
                answer:"プライド",
                place:{
                    x: 23, y: 33,  // 座標%
                    w: 53, h: 31   // サイズ%
                }
            }
        }
        
    },
    16:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/33_オセロ.png",
                answer:"イノリ",
                hint:"",
            },
            [magicType.BLUE]:{
                image:"images/quiz/33_オセロ_色.png",
                answer:"コイノボリ",
                place:{
                    x: 31, y: 46,  // 座標%
                    w: 7, h: 10   // サイズ%
                }
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/33_オセロ_字.png",
                answer:"サツキ",
                place:{
                    x: 18, y: 74,  // 座標%
                    w: 5, h: 5   // サイズ%
                }
            }
        }
        
    },
    17:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/35_道路.png",
                answer:"ドローン",
                hint:"赤矢印と青矢印は同じものの違う読み方を表しているようです。",
            }
        }
        
    },
    18:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/36_v.png",
                answer:"エール",
                hint:"それぞれの色の矢印の形に注目してみましょう。",
            },
        }
        
    },
    19:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/40_間.png",
                answer:"ヤミ",
                hint:"前後の文から、二行目の四角に入りそうな感じを推測してみましょう。",
            },
        }
        
    },
    20:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/25_数字埋め.png",
                answer:["オーブン","OVEN"],
                hint:"",
            },
            [magicType.ADD_CHAR]:{
                image:"images/quiz/25_数字埋め_□.png",
                answer:["ツリー","TREE"],
                place:{
                    x: 77, y: 35,  // 座標%
                    w: 8, h: 10   // サイズ%
                }
            }
        }
        
    }
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
    [speaker.G,"——今これはあなたの頭に直接語りかけていますよ"],
    [speaker.P,"「ど、どういうことだ！<br>そんなことはゲームの世界でしか起こらないだろ！」"],
    [speaker.G,"——いやここゲームの世界なんですけど"],
    [speaker.P,"「え…？」"],
    [speaker.N,"ありえない事実にあなたは驚きを隠せませんでした"],
    [speaker.P,"「ゲームの世界にいる…？」"],
    [speaker.G,"——はい、その通りです"],
    [speaker.N,"あなたはどうやらこのゲームの世界に迷いこんでしまったみたいですね"],
    ["action",{ func: showImg, subject: "images/board/導入看板.png" }],
    [speaker.G,"————この世界を抜け出したいならば看板に書かれたクリア条件を達成しゲームをクリアしてください"],
    [speaker.N,"あなたは目の前に置かれた看板を見ました<br>そこには確かにゲームクリア条件のようなものが書いてありました"],
    [speaker.P,"「これを達成すれば元の世界に戻れるということか！<br>頑張るぞ～」"],
    [speaker.G,"——ちょっと待ってください<br>あなたって普通の現代人ですよね？"],
    [speaker.P,"「ああ、そうです」"],
    [speaker.G,"——謎解きをしているあなたのような貧弱な人間は、魔王はおろか、そこにいるモンスターでも力で倒すことはできないと思いますよ"],
    [speaker.P,"「え～そんな～」"],
    [speaker.N,"絶望的な状況にあなたは落胆してしまいました"],
    [speaker.G,"——しかしあなたにも希望はあります<br>それは、”魔法”を使って敵を倒すことです！"],
    [speaker.P,"「魔法…？」"],
    [speaker.G,"——あなたは今レベル1の状態です<br>実はレベルが1つ上がると新たな魔法を使うことができるようになります"],
    [speaker.G,"——ちなみに今は魔法「スクエア」だけ使うことができる状態です"],
    [speaker.G,"——魔法をうまく使うことで敵を倒すことができるかもしれません<br>特にあなたのようなひらめきで世界を変えられるような方ならば"],
    [speaker.P,"「そうか、ゲットした魔法を使って敵を倒せばいいのか<br>でもどうしたらレベルを上げられるんだ？」"],
    [speaker.G,"——それは謎解きに正解することで経験値を獲得しレベルを上げることができます"],
    [speaker.G,"——今持っている魔法を使ってもよいですが……<br>レベルをあげて新たな魔法を手にする方がよいでしょう"],
    [speaker.P,"「じゃあ謎を解いて早くクリアしよう！」"],
    [speaker.N,"あなたは勇んでゲームを始めることにしたのでした……"],
    ["action",{ func: hideImg, subject: "images/board/導入看板.png" }],
    ["action",{ func: hideBack, subject: "story_sogen"}]
];

const open_quiz_tutorial_list =[
    [speaker.G,"——それではこのゲームの進め方を説明しますね<br>謎の解き方について説明します"],
    ["action",{ func: pointOut, subject: "Q1_icon"}],
    [speaker.G,"——この赤いハテナのマークがある場所には謎があります。<br>試しにこのマークをタップしてみましょう"], 
    ["action",{ func: finishPoint, subject: "なし"}]
];

const tackle_quiz_tutorial_list = [
    [speaker.G,"——謎が出てきましたね、赤いハテナマークが目印です<br>これを解き明かしていくことでレベルが上がります"],
    [speaker.G,"——答えがわかったら解答欄にカタカナで入力して送信してみましょう<br>ただし答えはすべて一般的な単語になります"],
    [speaker.G,"わからないときはヒントを活用してくださいね"]
];

const answered_quiz_list = [
    [speaker.G,"——正解です、さすがです！<br>この調子でどんどん謎を解きましょう！"]
];

const got_magic_list = [
    ["action",{func: pointOut, subject:'B1_icon'}],
    [speaker.G,"——ついに魔法を手に入れたのですね！<br>これを使って敵と戦ってみましょう"], 
    ["action",{func: finishPoint, subject:'B1_icon'}]
];

const monster_tutorial_list = [
    [speaker.G,"——次に敵と倒す際の説明をします"],
    ["action",{func: pointOut, subject:"B1_icon"}],
    [speaker.G,"——敵のアイコンをタップすると…"],
    ["action",{func: finishPoint, subject:'B1_icon'}],
    ["action",{func: hideObj, subject:"B1_command"}],
    ["action",{func: openBattle, subject:'B1'}],
    [speaker.G,"——こんな画面になります"],
    [speaker.G,"——ここであなたは｢たたかう｣、｢にげる｣、｢魔法｣のいずれかを行うことができます"],
    [speaker.G,"——ここであなたは何か行動をすることができます"],
    [speaker.G,"——「たたかう」で直接戦うこともできますが……<br>意味もなく次の敵からの攻撃で確実にやられてしまうでしょう"],
    [speaker.G,"——そしてあなたの行動が終わると敵からの攻撃が来ます"],
    [speaker.G,"——普通の体であるあなたはほぼ確実にやられてしまうのでこの攻撃の前に敵を倒さなければなりません"],
    [speaker.G,"——｢魔法｣を開くと現在修得している魔法が表示されるのでそこから選択して倒しましょう"],
    [speaker.G,"——もし戦いに負けてしまったとしても、戦う前の状態に戻るのでとりあえず戦ってみるのも作戦の一つでしょう"],
    ["action",{func: closeBattle, subject:'B1'}],
    ["action",{func: finishHide, subject:"B1_command"}],
];

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
    [speaker.G,"——説明は以上です<br>この説明はメニューから再度見ることができるので必要があれば参照してください"],
    [speaker.G,"——それでは、あなたが無事ゲームから抜け出せることを期待していますよ"],
];

const use_magic_list = [
    [speaker.G,"——どうやらここには謎がないみたいですね"],
    [speaker.G,"——ああ、そうだ、ひとつ言い忘れていたことがあるんですが"],
    [speaker.G,"——実はあなたが手に入れた魔法は謎に使うこともできるんです"],
    [speaker.G,"——謎を解く画面で左上に表示されるアイコンをタップし、使う場所を正しく選択すると謎に対して魔法を使うことができます"],
    [speaker.G,"——魔法が使える場所にはそれぞれルールがあるので注意してください"],
    [speaker.G,"——また複数の魔法を同時にかけることはできません"],
    [speaker.G,"——魔法を使って新たな問題をつくり、その謎を解くとさらに経験値が上がるのでぜひ活用してください"],
    [speaker.G,"——また、問題の上にある星はこの問題でできる正解数を表していて、正解すると光るので参考に使ってください"],
    [speaker.G,"——それでは、健闘を祈ります"]
    
];





let tutorial_finish = {
    [tutorialType.STORY]:{
        finish:false,
    },
    [tutorialType.OPENQUIZ]:{
        finish:false,
    },
    [tutorialType.USEMAGICTOQUIZ]:{
        finish:false,
    },
    [tutorialType.TACKLEQUIZ]:{
        finish:false,
    },
    [tutorialType.ANSWEREDQUIZ]:{
        finish:false,
    },
    [tutorialType.MAGIC]:{
        finish:false,
    },
    [tutorialType.MONSTER]:{
        finish:false,
    },
    [tutorialType.MENU]:{
        finish:false,
    },
}


let tutorial_talk = {
    [tutorialType.STORY]:{
        talk:story_tutorial_list
    },
    [tutorialType.OPENQUIZ]:{
        talk:open_quiz_tutorial_list
    },
    [tutorialType.USEMAGICTOQUIZ]:{
        talk:use_magic_list
    },
    [tutorialType.TACKLEQUIZ]:{
        talk:tackle_quiz_tutorial_list
    },
    [tutorialType.ANSWEREDQUIZ]:{
        talk:answered_quiz_list
    },
    [tutorialType.MAGIC]:{
        talk:got_magic_list
    },
    [tutorialType.MONSTER]:{
        talk:monster_tutorial_list
    },
    [tutorialType.MENU]:{
        talk:menu_tutorial_list
    },
}
//各チュートリアルを終えているかどうか、各チュートリアルの会話list



const log_name = Object.freeze({
    CANTQUIT:"cannot_quit_game",
    WINMONSTER:"win_B1",
});


const log_list =  {
    [log_name.CANTQUIT]:[[speaker.N,"ERROR<br>ゲームをやめることができない"]],
    [log_name.WINMONSTER]:[[speaker.N,"次のステージへ進めるようになった！"]],
    
 
}


let current_dialog_num = -1;
//text_log用の

let current_tutorial = "";
//今やってるチュートリアル



let meet_clear_condition = true;



//-- initialize & save_data--------


let save_data = {
    player_data:player_data,
    quiz_list:quiz_list,
    tutorial_finish:tutorial_finish,
    monster_list:monster_list,
    meet_clear_condition:meet_clear_condition
}



window.onload = function(){
    initializeMagicIcons();
    initializeQuizDataList(quiz_list);
    initializeBookList(monster_book_list,"monster");
    initializeBookList(magic_book_list,"magic");
    
    string_storage_data = sessionStorage.getItem('save_data');
    if(string_storage_data == null){
        var string_save_data = JSON.stringify(save_data);
        sessionStorage.setItem('save_data',string_save_data);
        console.log("セーブデータ初期化");
    }
    else{
        var storage_data = JSON.parse(string_storage_data);
        player_data = storage_data.player_data;
        quiz_list = storage_data.quiz_list;
        tutorial_finish = storage_data.tutorial_finish;
        monster_list = storage_data.monster_list;
        meet_clear_condition = storage_data.meet_clear_condition;
        console.log("セーブデータを復旧");
    }
    
    
    checkLevel(true);
    checkRemovedMonsters();
    reload_q_icon();
}


function checkRemovedMonsters(){
    for (var mon_name in monster_list){
       if(monster_list[mon_name].finish){
           removeMapMonster(mon_name);
       } 
    }
}




function saveData(){
    save_data = {
        player_data:player_data,
        quiz_list:quiz_list,
        tutorial_finish:tutorial_finish,
        monster_list:monster_list,
        meet_clear_condition:meet_clear_condition
    }
    var string_save_data = JSON.stringify(save_data);
    sessionStorage.setItem('save_data',string_save_data);
    console.log("セーブしました");
    
}




function reload_q_icon(){
    for (Q in quiz_list){
        quiz_data  = quiz_list[Q];
        q_icon = document.getElementById(quiz_data.icon_id);
        if(q_icon != null){
            q_icon.style.filter = "grayscale(100%)";
            if(quiz_data.answered_time < quiz_data.enable_num_of_quiz){
                    q_icon.style.filter = "grayscale(0%)";
            }
        }
        
    }

}






function make_q_icon(n,place) {
    var parent_id = place + "_q_icons";
    var parent = document.getElementById(parent_id);
    var q_icon = document.createElement("img");
    q_icon.classList.add("selectQ");
    q_icon.id = "Q" + n + "_icon";
    q_icon.src = images.QICON;
    q_icon.alt = "Q";
    q_icon.setAttribute('onclick', "openQ('"+ n + "')");
    parent.appendChild(q_icon);
}



function initializeBookList(book_list,bookType) {
    var book_link_list_id = bookType + "_book_link_list";
    var book_link_list = document.getElementById(book_link_list_id);
    for (var n of book_list){
        var link = document.createElement("img");
        link.classList.add("book_link");
        link.id = n + "_book_link";
        
        link.src = "images/book/scroll_bar/" + bookType + "/" + n + ".png";
        link.alt = n;
        link.setAttribute('onclick', "bookShowImg('"+ n + "','" + bookType + "')");
        
        if(bookType == "magic"){
            if(n != "スクエア"){
                link.src = "images/book/scroll_bar/magic/none.png";
                link.alt = "?????";
                link.setAttribute('onclick', "bookShowImg('none','magic')");
            }
        }
        
        book_link_list.appendChild(link);
    }
    
}




function initializeQuizDataList(q_list){
    for (let n in q_list) {
        q_data = q_list[n];
        q_data.involved_magic = magicType.NONE;
        q_data.number_of_quiz = Object.keys(q_data.magics).length;
        q_data.answered_time = 0;
        q_data.icon_id = "Q" + n + "_icon";
        q_data.enable_num_of_quiz = 1;
        place = "";
        n = parseInt(n);
        if(quiz_place_list.prairie.includes(n)){
            place = "prairie";
            q_data.field = stage.PRAIRIE;
        }
        else if(quiz_place_list.castle.includes(n)){
            place = "castle";
            q_data.field = stage.CASTLE;
        }
        
        
        make_q_icon(n,place);
        
        if(q_data.magics[magicType.NONE].hint == null || q_data.magics[magicType.NONE].hint == ""){
            q_data.magics[magicType.NONE].hint == "ヒントはありません";
        }
        for(let m in q_list[n].magics){
            q_data.magics[m].answered = false;
            q_data.magics[m].point = 1;
            if(q_data.magics[m].hint == null || q_data.magics[m].hint == ""){
                q_data.magics[m].hint = q_data.magics[magicType.NONE].hint;
            }
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
        magic_icon.style.backgroundImage = "url(" + magic_info[magic_id].image + ")";
    }
}





function wantDelete() {
    delete_or_not = document.getElementById("delete_or_not");
    delete_or_not.style.display = "block";
    
}



function deleteAllData() {
    sessionStorage.removeItem('save_data');
    window.location.reload();
}

function notDelete(){
    delete_or_not = document.getElementById("delete_or_not");
    delete_or_not.style.display = "none";
}







//-- title & tutorial ------

function startGame(){
    title_sheet = document.getElementById("title_sheet");
    if (tutorial_finish[tutorialType.STORY].finish){
        map = document.getElementById("map");
        title_sheet.style.display = 'none';
        map.style.display = 'block';
        now_status = status.MAP;
        
        
        if(!tutorial_finish[tutorialType.OPENQUIZ].finish){
            doTutorial(tutorialType.OPENQUIZ);
        }
        
        else if(!tutorial_finish[tutorialType.MONSTER].finish && tutorial_finish[tutorialType.ANSWEREDQUIZ].finish){
            doTutorial(tutorialType.MONSTER);
        }
        
        else if(!tutorial_finish[tutorialType.MENU].finish && tutorial_finish[tutorialType.MONSTER].finish){
            doTutorial(tutorialType.MENU);
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
    
    
    if (!tutorial_finish[n].finish){
        
        openGeneTextLog()
        tutorial_page.style.display="block";
        
        current_tutorial = n;
        current_dialog_num = -1;
        console.log("tutorial_talk[current_tutorial].talk[0]");
        console.log(tutorial_talk[current_tutorial].talk[0]);
        console.log("story_tutorial_list[0]");
        console.log(story_tutorial_list[0]);
        current_dialog_list = tutorial_talk[current_tutorial].talk;
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
            if(!tutorial_finish[tutorialType.MONSTER].finish){
                doTutorial(tutorialType.MONSTER);
            }
        }
        if (n==tutorialType.MONSTER){
            if(!tutorial_finish[tutorialType.MENU].finish){
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
    
    console.log(current_dialog_num);
    
    
    if (current_dialog_num < current_dialog_list.length-1){
        current_dialog_num += 1;
        scene = current_dialog_list[current_dialog_num];
        console.log(scene);
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
            console.log(scene[1]);
            scene[1].func(scene[1].subject);
            displayNextDialog();
        }
    }
    
    
    else{
        current_dialog_num = -1;
        current_dialog_list =[];
        closeGeneTextLog();
        if (current_tutorial != "") {
            tutorial_finish[current_tutorial].finish = true;
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
    const answer_box = document.getElementById("answer_box");
    const magics = document.getElementById("magics");
    
    
    
    quiz_image.src = quiz_data.magics[magicType.NONE].image;
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
    
    
    if(!tutorial_finish[tutorialType.TACKLEQUIZ].finish){
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
    const players_answer_box = document.getElementById("answer_box");
    const players_answer = players_answer_box.value;
    let pop_tl = "";
    let pop_tx = "";
    
    collect = false;
    answers = quiz_data.magics[quiz_data.involved_magic].answer;
    if(typeof(answers)=="string") {
        collect = (players_answer == answers || players_answer == kataToHira(answers));
    }
    
    
    else{
        for( a in answers){
            if(players_answer == answers[a] ){
                collect = true;
                break;
            }
            if(a == 0){
                if(players_answer == kataToHira(answers[a])){
                    collect = true;
                    break;
                }
            }
        }
    }
    
    
    
    
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
            
            if(!tutorial_finish[tutorialType.ANSWEREDQUIZ].finish){
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
        let bar_percentage = 0;
        let now_level_point = level_list[player_data.level].needed_point;
        
        next_level_need_point = level_list[player_data.level+1].needed_point-now_level_point;
        now_level_player_point = player_data.point-now_level_point;
        
        
        if(player_data.level == max_level){
            menu_level.textContent = "Lv.MAX 主人公";
            bar_percentage = 100;
        }else{
            bar_percentage = now_level_player_point*100/next_level_need_point;
        }
        
        menu_point.textContent = now_level_player_point +"pt/" + next_level_need_point + "pt";
        
        
        //menu_point.textContent = (next_level_need_point - now_level_player_point) + "問";
        
        
        
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
    
    magic_icons = document.querySelectorAll(".magic_icon");
    color_icons = document.querySelectorAll(".color_menu li");
    
    selected_magic = n;
    //selected_magicを更新する
    
    selected_magic_icon = document.querySelector("."+selected_magic);
    
    if(selected_magic_icon != null){
        magic_icons.forEach(icon => {
            icon.style.filter = "grayscale(100%)";
        });
        color_icons.forEach(icon => {
            //icon.style.filter = "grayscale(70%)";
            icon.style.borderColor = "rgba(0, 0, 0, 0)";
        });
        selected_magic_icon.style.filter = "grayscale(0%)";
        if(n == magicType.RED || n == magicType.BLUE || n == magicType.YELLOW){
            selected_magic_icon.style.borderColor = "rgba(0, 0, 0, 1)";
        }
    }else{
        magic_icons.forEach(icon => {
            icon.style.filter = "grayscale(0%)";
        });
        color_icons.forEach(icon => {
            icon.style.borderColor = "rgba(0, 0, 0, 0)";
        });
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
            selectMagic(null);
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
            selectMagic(null);
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





function levelUp(new_level){

    const enableMagic = level_list[new_level].enable_magic;
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


    n = magic_info[enableMagic].name;

    book_link = document.getElementById(n + "_book_link");
    book_link.src = "images/book/scroll_bar/magic/" + n + ".png";
    book_link.alt = n;
    book_link.setAttribute('onclick', "bookShowImg('"+ n + "','magic')");

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


}







function checkLevel(init = false){
    player_point = player_data.point;
    player_level = player_data.level;
    
    
    if(init == true){
        for (var l in level_list){
            next_level_point = level_list[l].needed_point;
            if(player_point >= next_level_point){
                levelUp(l);
            }
        }
             
    }
    
    else if(player_level<max_level){
        next_level_point = level_list[player_level+1].needed_point;
        if(player_point >= next_level_point){
            player_data.level += 1;
            levelUp(player_data.level);
            
            const enableMagic = level_list[player_data.level].enable_magic;
            let pop_tl = "新しい技「" + magic_info[enableMagic].name+ "」を覚えた！";
            let pop_tx = "メニューから技を確認しよう！";

            popTitling(pop_tl);
            popTexting(pop_tx);


            openPop();

            
            if(!tutorial_finish[tutorialType.MAGIC].finish){
                doTutorial(tutorialType.MAGIC);
            }
        }



    }
    saveData();
    
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




function bookShowImg(n,bookType){
    const book_img = document.getElementById(bookType + "_book_image");
    book_img.src = "images/book/book_image/" + bookType +"/" + n + ".png";
    
}











function moveMap(n){
    current_stage = document.getElementById(now_place);
    next_stage = document.getElementById(n);
    current_stage.style.display = 'none';
    next_stage.style.display = 'block'
    
    now_place = n;
    if(n=='rocky' && tutorial_finish[tutorialType.USEMAGICTOQUIZ].finish == false){
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

var now_on = 0

function openBattle(n){
    const battle = document.getElementById(n)
    battle.style.display = 'block';
    now_on = n
}

function closeBattle(n){
    const battle = document.getElementById(n)
    battle.style.display = 'none';
    now_on = 0
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
    if ((using === 'magic2') || (using === 'magic3') || (using === 'magic4')){
        explain.style.display = 'none'
    }
    using = 0
}



clicked_id = 0



function changeName(n){
    clicked_id = n
    if(using === 'magic2'){
        if(n === 'B2'){
            document.getElementById('B2_name').textContent = 'ガーザイル';
            monster = document.getElementById('monster2')
            victory = document.getElementById('victory')
            runaway = document.getElementById('fall')
            monster.src = "images/mobs/飛べない敵.png";
            monster.style.animation = 'tremble 0.7s ease-in-out 0s forwards, fall 0.5s ease-in-out 1.8s forwards'
            victory.style.display = 'block'
            runaway.style.display = 'block'
            removeMapMonster('B2');
            player_data.point += 492;
            if((using != 'magic2') && (using != 'magic3') && (using != 'magic4')){
                closeBattleChoice()
            }
            stopBattleUsing()
        }
    }
}

function changeColor(n){
    clicked_id = n
    if(using === 'magic1R'){
        if(n === 'monster1'){
            monster = document.getElementById('monster1')
            victory = document.getElementById('victory')
            runaway = document.getElementById('runaway')
            document.getElementById('B1_name').textContent = 'レッドスライム'
            monster.src = "images/mobs/スライム_赤.png";
            monster.style.animation = 'tremble 1s ease-in-out 0s forwards, runaway 0.5s ease-in-out 1s forwards'
            victory.style.display = 'block'
            runaway.style.display = 'block'
            removeMapMonster('B1');
            player_data.point += 43;
            if((using != 'magic2') && (using != 'magic3') && (using != 'magic4')){
                closeBattleChoice()
            }
            stopBattleUsing()
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
    closeBattleMagic()
    closeBattle('B1')
    closeBattle('B2')
    closeBattle('B3')
    
    
    //以下text_logを出すものです
    current_dialog_num = -1;
    current_dialog_list = log_list[log_name.WINMONSTER];
    displayNextDialog();
    
    
}

function soonFail(n){
    failed_message = document.getElementById('failed')
    failed_paragraph = document.getElementById('failed_paragraph')
    blackout = document.getElementById('blackout')
    blackout.style.display = 'block'
    failed_message.style.display = 'block'
    blackout.style.animation = 'darkerlighter 5s ease-in-out 1.8s forwards'
    setTimeout(()=>{
        if (n === 1){
            failed_paragraph.textContent = "ブルースライムの体当たり!";
        }else if (n === 2){
            failed_paragraph.textContent = "ガーゴイルのひっかき!";
        }else if (n === 3){
            failed_paragraph.textContent = "魔王のなんかすごい攻撃!";
        }
    }, 900)
    setTimeout(()=>{
        failed_paragraph.textContent = "あなたは力尽きてしまった";
    }, 1800)
    setTimeout(()=>{
        failed_paragraph = document.getElementById('failed_paragraph')
        failed_paragraph.textContent = "効いていないようだ";
        document.getElementById('failed').style.display = 'none'
        if((using != 'magic2') && (using != 'magic3') && (using != 'magic4')){
            closeBattleChoice()
        }
        stopBattleUsing()
        closeBattleMagic()
        closeBattle('B1')
        closeBattle('B2')
        closeBattle('B3')
    },4000)
    setTimeout(()=>{
        blackout.style.display = 'none'
    },6800)
}


function fail(){
    if (using != 0){
        if ((!((using === 'magic1R') && (clicked_id === 'monster1'))) && (!((using === 'magic2') && (clicked_id === 'B2')))){
            if(now_on === 'B1'){
                soonFail(1)
            }else if(now_on === 'B2'){
                soonFail(2)
            }else if(now_on === 'B3'){
                soonFail(3)
            }
        }
    }
}


//ここまで所有格さん

