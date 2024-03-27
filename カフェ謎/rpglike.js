
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
    [magicType.RED]:{
        name:'カラー(赤)',
    },
    [magicType.BLUE]:{
        name:'カラー(青)',
    },
    [magicType.YELLOW]:{
        name:'カラー(黄)',
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
    "にゃげぼうし",
    "ガーザイル",
    "キャンサービジョン",
    "バッドトークバット",
    "ブルースライム",
    "立つ辰",
    "ガーゴイル",
    "魔王"
]


const magic_book_list = [
    
    /*"スクエア",*/
    "カラー",
    "文字トランス",
    "ハサミ",
]








let now_status = status.TITLE;
//今の状況が、mapなのか、quizなのか、battleなのか、とかを保管する


let now_place = stage.PRAIRIE;
//今の場所が、map上のどこなのか（prairie、rocky、castle）を保管する
 




const level_list = {
    1:{needed_point:0, enable_magic:"none"}, //スクエアを消しました
    2:{needed_point:50, enable_magic:magicType.CHANGE_COLOR},
    3:{needed_point:550, enable_magic:magicType.CHANGE_CHAR},
    4:{needed_point:5550, enable_magic:magicType.SCISSORS},
    5:{needed_point:55550, enable_magic:"none"},
}

//本当は、0,5,50,500


const point_list = {
    1:10,
    2:10,
    3:10,
    4:10
}


let monster_list = {
    'B1':{
        point:440,
        finish:false,
        hint:["まずはモンスター図鑑を使ってブルースライムの情報を見てみましょう。何か倒すヒントになる情報があるかもしれません。","どうやら色違いのレッドスライムは出会うと逃げ出してしまうようです。ブルースライムをレッドスライムにすることでここは切り抜けられそうです。","あなたはレベルを上げることで「カラー」という魔法を手にすることができます。その魔法を使うことができないか考えてみましょう。","レッドスライムは色違いなのでブルースライムと色以外の形は同じということになります。ではブルースライムに何かをすることでレッドスライムに変えることができるのではないでしょうか。","魔法「カラー」で赤を選択し、ブルースライムに対して使ってみましょう。するとレッドスライムに変化し逃げ出してしまうので次に進むことができます。"],
        name:"ブルースライム"
    },
    'B2':{
        point:4930,
        finish:false,
        hint:["まずはモンスター図鑑を使ってガーゴイル(仮)の情報を見てみましょう。何か倒すヒントになる情報があるかもしれません。","ガーゴイルには弱点が見当たらないように思えます。どうにかして他のモンスターにすることで倒すことができないでしょうか。","あなたはレベルを上げて「文字トランス」を手に入れることができます。戦闘画面の説明をヒントにその魔法で戦う方法を考えてみましょう。","説明メニューの戦闘画面を見ると「左上の情報に対応したモンスターが現れる」とあります。ここの情報を変えることでモンスターも変化すると考えられそうです。","もしガーゴイル(仮)に似た名前のモンスターがいて、文字トランスを使うことでそのモンスターになれば戦況を変えることができるのではないでしょうか。","似た名前のモンスターでガーザイル(仮)というモンスターが存在します。このモンスターはガーゴイル(仮)と異なり飛ぶことができないので、いま空中にいるガーゴイル(仮)から変化すると落ちて死んでしまうと推測できます。","文字トランスを使って戦闘画面のモンスター名を変更してみましょう。"],
        name:"ガーゴイル"
    },
    'B3':{
        hint:["魔王に対してはどのような魔法を使っても倒すきっかけは作れないようです。魔王を倒さずに進めるためにもあなたの目的を改めて確認してみましょう。","説明メニューからあなたの目的は｢ゲームをクリアすること｣だとわかります。クリア条件である｢魔王を倒すこと｣が不可能だとわかった今、何をすべきか考えてみましょう。","クリア条件が達成できないのであれば、クリア条件を変えてしまえばゲームをクリアすることができるかもしれません。クリア条件ははじめのマップの看板にありましたね。","看板に書かれたクリア条件の材質が謎の紙と一致していることに注目してみましょう。謎の紙に対して使う魔法が同様に使えるのではないでしょうか。","魔王を倒すことができないと考え、クリア条件を変えることでゲームをクリアするという発想の転換をする必要がありました。看板のクリア条件は謎の紙の材質と一致しているためハサミの魔法を使うことができます。文章ができるようにハサミを使うとクリア条件が「ゲームを止める」と変化します。クリア条件を変えた上でクリア条件を実行してみましょう。"],
        name:"Mr.魔王"
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
                image:"images/quiz/1_寿司.png",
                answer:"カイロ",
                hint:["3つのイラストはとある食べ物を表しています。<br>真ん中は海苔が巻かれたものを表しています。","これらはお寿司のイラストを示していました。<br>右からイカ、イクラ、マグロとなります"],
            },
            [magicType.YELLOW]:{
                image:"images/quiz/1_寿司_色.png",
                hint:["カラーを使ってマグロをタマゴにすることができます。"],
                answer:"カイゴ",
                place:{
                    x: 64, y: 12,  // 座標%
                    w: 20, h: 12   // サイズ%
                }
            }
        }
    },
    
    2:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/2_ハンガー傘.png",
                answer:"サンカク",
                hint:["右の図形を左の三角につけたとき、何に見えるかを考えましょう。上につけると家で使うもの、下につけると雨の日に使うものになるようです。","右の棒を三角の上につけると｢はんがー｣、下につけると｢かさ｣になります。"],
            },
        }
        
    },
    
    3:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/3_色付き英字.png",
                color_image:"images/quiz/3_色付き英字_色覚特性.png",
                answer:["ラック","LUCK","luck","Luck"],
                hint:["指示に従って3つの色以外を無視して現れる文字を考えてみましょう。4文字の英単語が出てきます。","紫、赤、緑の色だけを拾うと一番左はLのように考えられます。同様に行うとU、C、Kとなります。"],
            },
            [magicType.RED]:{
                image:"images/quiz/3_色付き英字_色.png",
                color_image:"images/quiz/3_色付き英字_色_色覚特性.png",
                answer:["ロック","LOCK","Lock","lock"],
                hint:"カラーの赤色を使って2文字目を｢O｣にすることができます。",
                place:{
                    x: 39, y: 39,  // 座標%
                    w: 9, h: 9   // サイズ%
                }
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/3_色付き英字_鋏.png",
                color_image:"images/quiz/3_色付き英字_鋏_色覚特性.png",
                answer:["スター","STAR","star","Star"],
                hint:"ハサミを使って｢むらさきいろ｣を｢きいろ｣にします。",
                place:{
                    x: 18, y: 0,  // 座標%
                    w: 14, h: 12   // サイズ%
                }
            }
        }
        
    },
    
    4:{
        color_vision: false,
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/4_国旗.png",
                answer:"スミカ",
                hint:["2つの国旗のうち、上側はイタリアを表しています。表でイタリアがミツバチになる法則を考えてみましょう。","上の表で国旗の国名の一つ下のマスを読む法則になっていました。ドイツの一つ下を読んでみましょう"],
            },
            [magicType.BLUE]:{
                image:"images/quiz/4_国旗_色.png",
                answer:"コアラ",
                hint:"カラーの青色を使ってイタリアをフランス国旗にしましょう。すると法則が国名と点対称の位置にある文字を拾う法則になります。",
                place:{
                    x: 21, y: 57,  // 座標%
                    w: 7, h: 14   // サイズ%
                }
            }
        }
        
    },
    
    5:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/5_りんごなし.png",
                answer:["アニ","兄"],
                hint:["上のイラストである魚、しおり、なしをそれぞれの丸に入るように表記を変えてみましょう。","イラストをローマ字で表記すると丸にピッタリ入ります。NASHIと入れて線で結ばれた文字を順に読んでみましょう"],
            },
            [magicType.RED]:{
                image:"images/quiz/5_りんごなし_色.png",
                answer:["イロ","色"],
                hint:"カラーの赤色を用いるとなしがりんごに変わります。RINGOと埋めてみましょう",
                place:{
                    x: 66, y: 16,  // 座標%
                    w: 14, h: 14   // サイズ%
                }
            },
        }
        
    },
    6:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/6_★迷路.png",
                answer:"サイン",
                hint:["はじめは下の方に行きましょう。","下の方に行き、1つ目の曲がり角を曲がりゴールまで行きます。"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/6_★迷路_字.png",
                answer:"サイテキカイ",
                hint:"文字トランスを使って｢ミッツ｣を｢ムッツ｣にすることで迷路の通るルートが変わります。",
                place:{
                    x: 34, y: 7,  // 座標%
                    w: 6, h: 8   // サイズ%
                }
            },
        }
        
    },
    7:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/7_曜日.png",
                answer:["アシタ","明日","ミョウニチ","みょうにち","アス","あす"],
                hint:["それぞれ漢字に変換して漢字に変換してみましょう。「鏡」の左半分を＋１すると「境」になるようです。","漢字に変換して考えると、「金」に＋１で「土」、「月」に＋３で「木」となる事から、数字の分だけ曜日を進めればいいことが分かります。"],
            }
        }
        
    },
    8:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/8_26分数.png",
                answer:"ハード",
                hint:["26といえばアルファベットの個数が考えられます。各数字に対応したアルファベットに変換してみましょう。","アルファベット順でそれぞれの番目に対応するアルファベットを考えます。1文字目は8番目のアルファベットなので｢H｣のようにします。"],
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/8_26分数_鋏.png",
                answer:"カード",
                hint:"ハサミを使い左端を切ると8を3にすることができます。",
                place:{
                    x: 19, y: -3,  // 座標%
                    w: 14, h: 13   // サイズ%
                }
            }
        }
        
    },
    9:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/9_部首.png",
                answer:"シカク",
                hint:["それぞれのカタカナは漢字に関する形が似ているパーツを表しています。ウは上側、イは左側、リは右側に来ることが多いです。","それぞれのカタカナは似た部首を表していました。ネ、サ、ロは｢しめすへん｣、｢くさかんむり｣、｢くち｣か｢くちへん｣か｢くにがまえ｣を示しています"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/9_部首_字.png",
                answer:"シズク",
                hint:"文字トランスを使って｢サ｣を｢シ｣にすることで｢さんずい｣に変わります。",
                place:{
                    x: 16, y: 62,  // 座標%
                    w: 5, h: 12   // サイズ%
                }
            }
        }
        
    },
    10:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/10_ピースはめ.png",
                answer:"カタチ",
                hint:["赤矢印が｢たに｣になるようにピースを配置し、そこからうまくはまるように考えてみましょう。","赤い矢印が｢たに｣であることをヒントに右上のピースが左上に入ります。"],
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/10_ピースはめ_鋏.png",
                answer:"クウキ",
                hint:"ハサミを使い真ん中を切ることで別の問題にすることができます。｢たに｣のヒントから5×5のマス目は五十音表を示しています。",
                afterInvolvedHint:"赤い矢印が通る2マスには｢たに｣が入ります。これはとある表の右側を切り取ったものを表しています。",
                place:{
                    x: 40, y: -2,  // 座標%
                    w: 7, h: 14   // サイズ%
                }
            }
        }
        
    },
    11:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/11_干支.png",
                answer:"マル",
                hint:["これは12匹の動物の並びを使います。その上でいくつか進めてマスの中に埋めましょう。","これらは十二支を表していました。その順番で進めたり戻したりすると｢ウマ｣、｢サル｣が入ります"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/11_干支_字.png",
                answer:"シル",
                hint:"文字トランスを使って｢トラ｣を｢トリ｣に変えます。すると｢ウシ｣に変化します。",
                place:{
                    x: 30, y: 55,  // 座標%
                    w: 9, h: 9   // サイズ%
                }
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/11_干支_鋏.png",
                answer:["マリ","鞠"],
                hint:"ハサミを使って｢イヌ｣を｢イ｣に変えます。すると｢トリ｣に変化します",
                place:{
                    x: 77, y: -2,  // 座標%
                    w: 14, h: 14   // サイズ%
                }
            }
        }
    },
    12:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/12_じゃんけん.png",
                answer:"マカイ",
                hint:["左側の手と戦ったときの結果をそれぞれで考えてみましょう。","チョキと戦ったときの結果が右側に入ります。マケ、カチ、アイコとなります"],
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/12_じゃんけん_鋏.png",
                answer:"カイサ",
                hint:"ハサミを使って真ん中を切ることで3つの手が表すものを入れる謎に変わります。順にカミ、イシ、ハサミが入ります。",
                afterInvolvedHint:"それぞれの手そのものが何を表しているかを考えてみましょう。",
                place:{
                    x: 38, y: -2,  // 座標%
                    w: 14, h: 16   // サイズ%
                }
            }
        }
        
    },
    13:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/13_一口.png",
                answer:"ダシン",
                hint:["漢字のパーツを足したり引いたりしているようです。","漢字のパーツで足し引きすると、上から｢間(あいだ)｣、｢古(いにしえ)｣、｢女(おんな)｣になります。"],
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/13_一口_鋏.png",
                answer:"カクチ",
                hint:"「ハサミ」を使って一番左の漢字を切り取ります。「プラス」「マイナス」を漢数字としてみなすと、上から「十日（とおか）」「一口（ひとくち）」「一次（いちじ）」となります。",
                afterInvolvedHint:"漢字のパーツで足し引きすると、上から｢間(あいだ)｣、｢古(いにしえ)｣、｢女(おんな)｣になります。",
                place:{
                    x: 19, y: -2,  // 座標%
                    w: 14, h: 14   // サイズ%
                }
            }
        }
        
    },
    14:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/14_色の名前.png",
                answer:"フリー",
                hint:["三角形の印は、50音で一つ進めることを表しているようです。","一行目には「ブラウン」、二行目には「ブルー」が埋まります。"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/14_色の名前_字.png",
                answer:"クルー",
                hint:"文字トランスを使うと、1行目は「グリーン」、二行目は「グレー」が埋まります。",
                place:{
                    x: 21, y: 11,  // 座標%
                    w: 14, h: 14   // サイズ%
                }
            }
        }
        
    },
    15:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/15_サイコロ.png",
                answer:"プロジェクト",
                hint:["すごろくのように目が出たものとしてコマを進めてみましょう。","Sから3マス進み、1マス進み、…と繰り返し止まったマスを順に読みます"],
            },
            [magicType.RED]:{
                image:"images/quiz/15_サイコロ_色.png",
                answer:"ポスター",
                hint:"カラーを使ってサイコロの背景を赤くすると１の目が消えます。",
                place:{
                    x: 23, y: 40,  // 座標%
                    w: 52, h: 14   // サイズ%
                }
            }
        }
        
    },
    16:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/16_オセロ.png",
                answer:"イノリ",
                hint:["オセロなので、同じ色で挟まれた色はひっくり返る法則があります。どのコマがひっくり返るか考えましょう。","置いたマスから下側、右下側のコマがひっくり返ります。"],
            },
            [magicType.BLUE]:{
                image:"images/quiz/16_オセロ_色.png",
                answer:"コイノボリ",
                hint:"カラーを使って｢ん｣のコマを青色にします。すると左下側にもひっくり返ります",
                place:{
                    x: 29, y: 44,  // 座標%
                    w: 11, h: 14   // サイズ%
                }
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/16_オセロ_字.png",
                answer:"サツキ",
                hint:"文字トランスを使って｢アオ｣を｢アカ｣にします。するとひっくり返るコマが左右方向になります",
                place:{
                    x: 16, y: 72,  // 座標%
                    w: 9, h: 9   // サイズ%
                }
            }
        }
        
    },
    17:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/17_v.png",
                answer:"エール",
                hint:["それぞれの色の矢印の形に注目してみましょう。たとえば赤矢印は真ん中に｢ン｣があって｢文意(ブンイ)｣になっており、赤矢印は｢ブイ｣を表しているようです。","各矢印はその矢印の形のアルファベットと対応しているようです。黒矢印は｢エル(L)｣に対応しているため、真ん中に｢ー｣が入ります"],
            },
        }
        
    },
    18:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/18_間.png",
                answer:["ヤミ", "闇"],
                hint:["前後の文から、点線がついた四角に入りそうな漢字を推測してみましょう。構成する二つの漢字のうちの一方は「門」です。","四角に｢間｣を入れると、｢間を構成する二つの漢字の間に立を入れてできる漢字は？｣という分が出来上がります。"],
            },
        }
        
    },
    19:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/19_方位.png",
                answer:"ノウド",
                hint:["4つの方向を表す言葉を考えてみましょう。","4つの単語は4方位を表します。右には「イースト」が埋まるので、そこから時計回りに「サウス」「ウエスト」「ノース」が埋まります。"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/19_方位_字.png",
                answer:"サイド",
                hint:"文字トランスを使うと、右には「ウエスト」が埋まるので、そこから時計回りに「ノース」「イースト」「サウス」が埋まります。",
                place:{
                    x: 59, y: 33,  // 座標%
                    w: 9, h: 9   // サイズ%
                }
            }
        }
        
    },
    20:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/20_県名.png",
                answer:["アキス","空き巣"],
                hint:["まずは赤い波線の共通点が何か考えてみましょう。どうやら47個あるもののようです。","赤い波線はすべて都道府県名になっているという法則がありました。上から青森、秋田、静岡となります。"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/20_県名_字.png",
                answer:"アイス",
                hint:"文字トランスを使ってタをチに変えると、2行目が表す都道府県が愛知に変わります。",
                place:{
                    x: 53, y: 31,  // 座標%
                    w: 14, h: 14   // サイズ%
                }
            }
        }
        
    }
}





const board_data = {
    magics:{
        [magicType.NONE]:{
            image:"images/board/看板.png",
        },
        [magicType.SCISSORS]:{
            image:"images/board/看板_ハサミ.png",
            place:{
                    x: 64, y: 6,  // 座標%
                    w: 10, h: 12   // サイズ%
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
    ENDING:"ending"
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
    [speaker.N,"突如頭の中に語りかける声が聞こえてきました<br>しかし辺りを見回しても声の主の姿は見えません"],
    [speaker.G,"——これはあなたの頭の中に直接語りかけています<br>ここはゲームの世界ですから"],
    [speaker.P,"「え…？<br>ゲームの世界にいる…？」"],
    [speaker.N,"ありえない事実にあなたは驚きを隠せませんでした"],
    [speaker.G,"——あなたはどうやらこのゲームの世界に迷いこんでしまったみたいですね"],
    ["action",{ func: showImg, subject: "images/board/看板.png" }],
    [speaker.G,"——この世界を抜け出したいならば看板に書かれたクリア条件を達成しゲームをクリアしてください"],
    [speaker.N,"あなたは目の前に置かれた看板を見ました<br>そこには確かにゲームクリア条件のようなものが書いてありました"],
    [speaker.P,"「間違って転生してしまったゲームから抜けるために魔王を倒してバッドエンドを食い止める——これを達成すれば元の世界に戻れるということか！<br>頑張るぞ～」"],
    [speaker.G,"——ちょっと待ってください<br>あなたって普通の現代人ですよね？"],
    [speaker.P,"「ああ、そうです」"],
    [speaker.G,"——謎解きをしているあなたのような貧弱な人間には魔王は倒せないでしょう<br>そこらへんのモンスターでさえ力では倒せないと思います"],
    [speaker.P,"「え～そんな～」"],
    [speaker.N,"絶望的な状況にあなたは落胆してしまいました"],
    [speaker.G,"——しかしあなたにも希望はあります<br>それは、”魔法”を使って敵を倒すことです！"],
    [speaker.P,"「魔法…？」"],
    [speaker.G,"——あなたは今レベル1の状態ですが、実はレベルが1つ上がると新たな魔法を修得します"],
    [speaker.G,"——魔法をうまく使うことで敵を倒すことができるかもしれません<br>特にあなたのようなひらめきで世界を変えられるような方ならば"],
    [speaker.P,"「そうか、レベルを上げて手に入れた魔法を使って敵を倒せばいいのか<br>でもレベルを上げるにはどうしたらいいんだ？」"],
    [speaker.G,"——謎解きに正解し経験値をためることで、レベルを上げることができますよ"],
    [speaker.G,"——今持っている魔法を使ってもよいですが……<br>レベルをあげて新たな魔法を手にする方がよいでしょう"],
    [speaker.P,"「じゃあ謎を解いて早くクリアしよう！」"],
    [speaker.N,"あなたは勇んでゲームを始めることにしたのでした……"],
    ["action",{ func: hideImg, subject: "images/board/看板.png" }],
    ["action",{ func: hideBack, subject: "story_sogen"}]
];

const open_quiz_tutorial_list =[
    [speaker.G,"——それではこのゲームの進め方を説明しますね<br>謎の解き方について説明します"],
    ["action",{ func: pointOut, subject: "Q1_icon"}],
    [speaker.G,"——この赤いハテナのマークがある場所には謎があります。<br>試しにこのマークをタップしてみましょう"], 
    ["action",{ func: finishPoint, subject: "なし"}]
];

const tackle_quiz_tutorial_list = [
    [speaker.G,"——謎が出てきましたね、赤いハテナマークが謎の目印です<br>これを解き明かしていくことでレベルが上がります"],
    [speaker.G,"——答えがわかったら解答欄に入力してみましょう<br>ただし答えは存在する単語になります"],
    [speaker.G,"わからないときはヒントを活用してくださいね"]
];

const answered_quiz_list = [
    [speaker.G,"————正解です、さすがです！<br>1つ正解すると10ptの経験値がたまるので、この調子で謎を解いていきましょう！"]
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
    [speaker.G,"——「たたかう」で直接戦うこともできますが……あなた程度の攻撃はスライムにすら通用せずそのまま敵からの攻撃で確実にやられてしまうでしょう"],
    [speaker.G,"——｢まほう｣を開くと現在修得している魔法が表示されるのでそこから選択して倒しましょう"],
    [speaker.G,"——戦いに負けてしまうと戦う前の状態に戻ります"],
    ["action",{func: closeBattle, subject:'B1'}],
    ["action",{func: finishHide, subject:"B1_command"}],
];

const menu_tutorial_list = [
    [speaker.G,"——最後にメニューについて軽く説明しておきますね"],
    ["action",{func: pointOut, subject:"menu_button"}],
    [speaker.G,"——右上のアイコンをタップすることでメニューを開くことができます"],
    ["action",{func:finishPoint, subject:"なし"}],
    ["action",{func:openMenu, subject:"なし"}],
    [speaker.G,"——ここには様々な情報が載っているので困ったら開いてみましょう"],
    ["action",{func:closeMenu, subject:"なし"}],
    [speaker.G,"——説明は以上です<br>それでは、あなたが無事ゲームから抜け出せることを期待していますよ"],
];

const use_magic_list = [
    [speaker.G,"——どうやらここには謎がないみたいですね"],
    [speaker.G,"——ああ、ひとつ言い忘れていたことがあって、"],
    [speaker.G,"——実はあなたが持つ魔法はモンスター以外の謎などにも使えるんです"],
    [speaker.G,"——謎を解く画面で左上のアイコンをタップし、使う場所を正しく選択すると魔法が発動します<br>複数の魔法は同時には使えず魔法のルールも残っているのでご注意ください"],
    [speaker.G,"——魔法によってできた新たな謎を解くとさらに経験値が上がります"],
    [speaker.G,"——また、上の星はその謎でできる正解数を表しています"],
];


const ending_list = [
    ["action",{ func: showBack, subject: "ending"}],
    [speaker.P,"「……ここは…？」"],
    [speaker.N,"まばゆい光に包まれたあなたは、気がつくと(カフェ謎の会場名)の席に座っていました"],
    [speaker.P,"「…そうか、自分の合わない世界だったのなら<br>守らないといけないと思い込んでいた世界のルールを変えてしまえばよかったのか」"],
    [speaker.N,"人生というゲームを進んでいたあなたは気づかない間にこんなことを忘れていたようです"],
    [speaker.P,"「これからも進んで行こう、<br>時には悩み苦しむこともあるかもしれないけど大丈夫、<br>困ったときは新たな世界に行くことだってできるんだから」"],
    [speaker.P,"「それじゃあ今日も頑張っていくぞ～！」"],
    [speaker.N,"あなたは勇んでリアルの世界を進むことにしたのでした……"],
    ["action",{ func: showBack, subject: "clear_sheet"}],
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
    [tutorialType.ENDING]:{
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
    [tutorialType.ENDING]:{
        talk:ending_list
    },
}
//各チュートリアルを終えているかどうか、各チュートリアルの会話list



const log_name = Object.freeze({
    CANTQUIT:"cannot_quit_game",
    WINMONSTER:"win_monster",
    LOSEMONSTER:"lose_monster"
});


const log_list =  {
    [log_name.CANTQUIT]:[[speaker.N,"ERROR<br>ゲームをやめることができない"]],
    [log_name.WINMONSTER]:[[speaker.N,"次のステージへ進めるようになった！"]],
    [log_name.LOSEMONSTER]:{
        'B1':[[speaker.P,"「負けてしまった…他の方法を考えよう」"],[speaker.P,"「敵について何か情報が得られれば…」"]],
        'B2':[[speaker.P,"「負けてしまった…他の方法を考えよう」"]],
        'B3':[[speaker.P,"「負けてしまった…」"]]
    }
    
 
}


let current_dialog_num = -1;
//text_log用の

let current_tutorial = "";
//今やってるチュートリアル



let meet_clear_condition = false;



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
        
        if(q_data.magics[magicType.NONE].hint == "" || q_data.magics[magicType.NONE].hint == null ){
            q_data.magics[magicType.NONE].hint = "ヒントはありません";
        }
        for(let m in q_list[n].magics){
            q_data.magics[m].answered = false;
            q_data.magics[m].point = 1;
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


function debugMode(){

    player_data = {
        point:40000,
        level:4,
    };

    tutorial_finish = {
        [tutorialType.STORY]:{
            finish:true,
        },
        [tutorialType.OPENQUIZ]:{
            finish:true,
        },
        [tutorialType.USEMAGICTOQUIZ]:{
            finish:true,
        },
        [tutorialType.TACKLEQUIZ]:{
            finish:true,
        },
        [tutorialType.ANSWEREDQUIZ]:{
            finish:true,
        },
        [tutorialType.MAGIC]:{
            finish:true,
        },
        [tutorialType.MONSTER]:{
            finish:true,
        },
        [tutorialType.MENU]:{
            finish:true,
        },
        [tutorialType.ENDING]:{
            finish:false,
        },
    };
    
    saveData();
    window.location.reload();
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
        clear_out_sheet = document.getElementById("clear_back_sheet");
        clear_out_sheet.style.display = 'block';
        white_out_time = 1.5;
        setTimeout(function() {
            clear_out_sheet.style.transition = "opacity " + white_out_time + "s";
            clear_out_sheet.style.opacity = '100%';
        }, 100); 

        setTimeout(function() {
            title_sheet.style.display = 'none';
        }, 100 + white_out_time * 1000);

        setTimeout(function() {
            clear_out_sheet.style.transition = "opacity " + white_out_time + "s";
            clear_out_sheet.style.opacity = '0%';
            title_sheet.style.display = 'none';
            now_status = status.STORY;
            doTutorial(tutorialType.STORY);
            closeGeneTextLog();

        }, 100 + white_out_time * 1000 * 1.5); 

        setTimeout(function() {
            clear_out_sheet.style.display = 'none';
            openGeneTextLog();
        }, 100 + white_out_time * 1000 * 2.5) + 100; 
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
        
    }
}




function clearGame(){
    /*popTexting("クリアの条件を満たした！");
    popTitling("CLEAR");
    openPop();*/
    
    white_out_time = 1.5;
    

    clear_out_sheet = document.getElementById("clear_back_sheet");
    title_sheet = document.getElementById("title_sheet");
    clear_out_sheet.style.display = 'block';
    now_status = status.CLEAR;
    
    setTimeout(function() {
        clear_out_sheet.style.transition = "opacity " + white_out_time + "s";
        clear_out_sheet.style.opacity = '100%';
    }, 100); 
    
    setTimeout(function() {
        title_sheet.style.display = 'none';
    }, 100 + white_out_time * 1000);
    
    setTimeout(function() {
        clear_out_sheet.style.transition = "opacity " + white_out_time + "s";
        clear_out_sheet.style.opacity = '0%';
        showEnding();
        closeGeneTextLog();

        
    }, 100 + white_out_time * 1000 * 1.5); 
    
    setTimeout(function() {
        clear_out_sheet.style.display = 'none';
        openGeneTextLog();
    }, 100 + white_out_time * 1000 * 2.5); 

}









function showEnding(){
    doTutorial(tutorialType.ENDING);
}






function showClearImg(subject){
    clear_sheet = document.getElementById("clear_sheet");
    white_out_time = 2;
    
    clear_sheet.style.display = 'block';
    clear_sheet.style.backgroundImage = "images/background/"
    
    setTimeout(function() {
        clear_sheet.style.transition = "opacity " + white_out_time + "s";
        clear_sheet.style.opacity = '100%';
    }, 100); 
    
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

function pointOut(subject,pointer_name="pointer"){
    target = document.getElementById(subject);
    if (target == null) {
        target = document.querySelector(subject);
    }
    rect = target.getBoundingClientRect();
    style = window.getComputedStyle(target);
    marginbottom= parseInt(style.getPropertyValue("margin-bottom"), 10);
    pointer = document.getElementById(pointer_name);
    pointer.style.top = rect.top + rect.height + marginbottom + 5 +  "px";
    pointer.style.left = rect.left + rect.width/2 + "px";
    pointer.style.display = "block";
    
    
    if(pointer_name = "quiz_select_icon"){
        pointer.addEventListener('click', function() {
            // 下の要素をクリックしたことにします
            target.click();
        });
    }
        
    
}


function finishPoint(subject,pointer_name="pointer") {
    pointer = document.getElementById(pointer_name);
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
        current_dialog_list = tutorial_talk[current_tutorial].talk;
        displayNextDialog();
    }
    else{
        tutorial_page.style.display="none";
        closeGeneTextLog();
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
        
        if (n==tutorialType.ENDING){
            tutorial_finish[tutorialType.ENDING].finish = false;
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
                text_log_speaker.textContent = "天の声";
                text_log_speaker.style.display = "block";
                //text_log_speaker.style.marginLeft = "3%";
            }
            if(scene[0] == speaker.P){
                text_log_speaker.textContent = "主人公";
                text_log_speaker.style.display = "block";
                //text_log_speaker.style.marginLeft = "3%";
            }
            if(scene[0] == speaker.N){
                text_log_speaker.textContent = "";
                text_log_speaker.style.marginLeft = "0";
                text_log_speaker.style.display = "none";
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
            tutorial_finish[current_tutorial].finish = true;
            saveData();
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
    pointOut(quiz_data.icon_id,pointer = "quiz_select_icon");

    
    
    
    quiz_image.src = quiz_data.magics[magicType.NONE].image;
    quiz_data.involved_magic=magicType.NONE;
    
    answer_box.disabled = (quiz_data.answered_time >= quiz_data.number_of_quiz);
    
    if (quiz_data.answered_time >= quiz_data.number_of_quiz){
        answer_box.value = "-----"
    }else{
        answer_box.value = "";
    }
    
    
    //星について
    removeAllStars();
    
    
    now_num_ans = quiz_data.enable_num_of_quiz;
    
    let stars = "★".repeat(quiz_data.answered_time);
    stars += "☆".repeat(now_num_ans - quiz_data.answered_time);
    
    const magichint = document.querySelector(".magicHintButton");
    
    if(quiz_data.answered_time >= 1 && now_num_ans > quiz_data.answered_time){
        magichint.style.display = 'block';
    }else{
        magichint.style.display = 'none';
    }
    
    createStars(quiz_data.answered_time,images.LIGHTSTAR);
    createStars(now_num_ans - quiz_data.answered_time,images.DARKSTAR);
    
    
    //色覚特性について
    colorVisionButton = document.getElementById("colorVisionButton");
    
    if(quiz_data.magics[magicType.NONE].color_image){
        colorVisionButton.style.display = "block";
        if(quiz_data.color_vision){
            quiz_image.src = quiz_data.magics[quiz_data.involved_magic].color_image;
        }
        
        colorVisionButton = document.getElementById("colorVisionButton");
        if(quiz_data.color_vision){
            colorVisionButton.textContent = "元に戻す";
        }else{
            colorVisionButton.textContent = "色がわかりにくい場合";
        }
    }else{
        colorVisionButton.style.display = "none";
    }
    
    
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
            var answer = quiz_data.magics[quiz_data.involved_magic].answer
            if(typeof(answer)!="string"){
                answer = answer[0] + "," + answer[1];
            }
            pop_tx = "A："+ answer +"<br>"+"獲得経験値：" + point_list[player_data.level] + "pt";
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
            saveData();

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



function hint(n,magictype=null,is_magic_hint=false){
    
    
    const quiz_data = quiz_list[quiz_id]
    const quiz_sheet = document.getElementById("Q_sheet");
    const pop_button = document.getElementById("pop_button");
    let pop_tl = "ヒント";
    let pop_tx = "";
    let hintText = quiz_data.magics[quiz_data.involved_magic].hint;
    if(quiz_data.magics[quiz_data.involved_magic].afterInvolvedHint != null){
        hintText = quiz_data.magics[quiz_data.involved_magic].afterInvolvedHint;
    }
    closePop();
    
    const magichint = document.querySelector(".magicHintButton");
    if(quiz_data.answered_time >= 1){
        magichint.style.display = 'block';
    }else{
        magichint.style.display = 'none';
    }
    
    
    console.log(is_magic_hint);
    if(is_magic_hint){
        pop_tl = "魔法のヒント";
        count = 0;
        
        
    //魔法のヒント、クリック時
        if(magictype == null){
            s = "この謎に今かけられる魔法は<br>";
            for(var magic of enable_magic_list){
                if(quiz_data.magics[magic] != null){
                    if(quiz_data.magics[magic].hint != null){
                        if(enable_magic_list.includes(magic)){
                            s += magic_info[magic].name + "<br>";
                            count += 1;
                            var magicAnswer = document.getElementById(magic + "_hint");
                            if(isColorMagic(magic)){
                                var magicAnswer = document.getElementById(magicType.CHANGE_COLOR + "_hint");
                            }
                            magicAnswer.style.display = 'block';
                        }
                    }
                }
            }
            if(count == 0){
                s = "この謎に今かけられる魔法はありません";
            }
            pop_tx = s;
        }
        
        
    //個別の魔法のヒント
        else{
            if(magictype == magicType.CHANGE_COLOR){
                for (var magic in quiz_data.magics){
                    if(isColorMagic(magic)){
                        magictype = magic;
                    }
                }
            }
            hintText = quiz_data.magics[magictype].hint;
            
            var answer = quiz_data.magics[magictype].answer
            if(typeof(answer)!="string"){
                answer = answer[0] + "," + answer[1];
            }
            
            
            if(typeof(hintText)=="string") {
                pop_tx = hintText + "<br>答えは「" + answer + "」です。";

            }else{
                var answer = quiz_data.magics[quiz_data.involved_magic].answer
                console.log(hintText);
                console.log(hintText.length,n);
                if(typeof(answer)!="string"){
                    answer = answer[0] + "," + answer[1];
                }
                if(n >= hintText.length-1){
                    pop_tx = hintText[n] + "<br>答えは「" + answer + "」です。";
                }else{
                    pop_tx = hintText[n];

                    if(n < hintText.length-2){
                        pop_button.textContent = "次のヒント";
                    }else{
                        pop_button.textContent = "答え";
                    }

                    pop_button.setAttribute('onclick', "hint(" + (n+1) + ","+ magictype + ",true)");
                    console.log("hint(" + (n+1) + ","+ magictype + ",true)");
                    pop_button.style.display = 'block';
                }
            }
            

        }
        
        
        
    }
    
    
    //普通のヒント if(quiz_data.magics[quiz_data.involved_magic].answered == false)
    else {
        var answer = quiz_data.magics[quiz_data.involved_magic].answer
        if(typeof(answer)!="string"){
            answer = answer[0] + "," + answer[1];
        }
        if(typeof(hintText)=="string") {
            pop_tx = hintText;
            
        }else{
            var answer = quiz_data.magics[quiz_data.involved_magic].answer
            if(typeof(answer)!="string"){
                answer = answer[0] + "," + answer[1];
            }
            if(n >= hintText.length-1){
                pop_tx = hintText[n] + "<br>答えは「" + answer + "」です。";
            }else{
                pop_tx = hintText[n];

                if(n < hintText.length-2){
                    pop_button.textContent = "次のヒント";
                }else{
                    pop_button.textContent = "答え";
                }

                pop_button.setAttribute('onclick', "hint(" + (n+1) + ")");
                pop_button.style.display = 'block';
            }
        }

        
    }
    
    
//    //普通のヒント、すでに解いている
//    else{
//        /*if(quiz_data.answered_time < quiz_data.enable_num_of_quiz){
//            pop_tx = "この状態では";
//        }*/
//        pop_tx = "この問題はすでに解いているようだ";
//    }
    
    
    
    popTitling(pop_tl);
    popTexting(pop_tx);

    openPop();
      
     
}








function monster_hint(monster,n=0){
    hintText = monster_list[monster].hint;
    pop_tx = hintText[n];
    pop_tl = monster_list[monster].name+"を倒すヒント";

    closePop();

    if(n < hintText.length-1){
        pop_button.textContent = "次のヒント";
        pop_button.setAttribute('onclick', "monster_hint('" + monster + "',"  + (n+1) + ")");
        pop_button.style.display = 'block';
    }
    
    popTitling(pop_tl);
    popTexting(pop_tx);

    openPop();
    
}




function colorVision() {
    colorVisionButton = document.getElementById("colorVisionButton");
    const quiz_sheet = document.getElementById("Q_sheet");
    const quiz_image = quiz_sheet.querySelector(".quiz_image");
    if(quiz_data.color_vision){
        quiz_data.color_vision = false;
        colorVisionButton.textContent = "色がわかりにくい場合";
        quiz_image.src = quiz_data.magics[quiz_data.involved_magic].image;
    }else{
        quiz_data.color_vision = true;
        colorVisionButton.textContent = "元に戻す";
        quiz_image.src = quiz_data.magics[quiz_data.involved_magic].color_image;
    }
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
    const pop_button = document.getElementById("pop_button");
    const pop_back = document.getElementById("pop_back");
    pop.style.display = 'none';
    pop_back.style.display = 'none';
    pop_button.style.display = 'none';
    pop_button.setAttribute('onclick', "");
    clearPopButtons()
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



function clearPopButtons(){
    magic_hints = document.querySelectorAll(".magic_hint_buttons")
    magic_hints.forEach(magic_hint => {
            magic_hint.style.display = "none";
    });
    monster_hints = document.querySelectorAll(".monster_hint_buttons")
    monster_hints.forEach(monster_hint => {
            monster_hint.style.display = "none";
    });
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
            menu_point.textContent = "MAX";
        }else{
            bar_percentage = now_level_player_point*100/next_level_need_point;
            menu_point.innerHTML = now_level_player_point +"pt/<span style='font-size:15px'>" + next_level_need_point + "pt</span>";
        }
        
        
        
        
        menu_point_bar.value = bar_percentage;
    }
}


function closeMenu(nashi){
    document.querySelector(".slide_menu").classList.toggle('active');
    document.querySelector(".menu_button").classList.toggle('active');
    const menu_back = document.getElementById("menu_back");
    menu_back.style.display = 'none';
    closeExplains();
    closeMonsterHint();
}








//--magic-------



function isColorMagic(n){
    let r = (n == magicType.RED || n == magicType.BLUE || n == magicType.YELLOW);
    return r
}


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
        if(isColorMagic(n)){
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
    if(quiz_data.color_vision){
        quiz_image.src = quiz_data.magics[quiz_data.involved_magic].color_image;
    }
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
    
    const quit_button = document.getElementById("quit_button");
    quit_button.src = "images/title/ゲームやめるボタン_明.png";

    popTitling("成功！");
    popTexting("看板が変化した");
    
    openPop();
    
}





function levelUp(new_level){

    const enableMagic = level_list[new_level].enable_magic;
    const new_magic_icon = document.querySelectorAll("." + enableMagic);
    if(new_magic_icon.length == 0){
        return;
    }
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
        saveData();
             
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
            saveData();

            
            if(!tutorial_finish[tutorialType.MAGIC].finish){
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




function bookShowImg(n,bookType){
    const book_img = document.getElementById(bookType + "_book_image");
    book_img.src = "images/book/book_image/" + bookType +"/" + n + ".png";
    
}






function openExplain(){
    const menu_explain_box = document.getElementById('menu_explain_box');
    if(tutorial_finish[tutorialType.USEMAGICTOQUIZ].finish){
        menu_quiz_explain = document.getElementById("menu_quiz_explain");
        menu_quiz_explain.setAttribute('onclick',  "openExplainSheet('謎画面の説明_2')");
    }
    if(menu_explain_box.style.display=="block"){
        menu_explain_box.style.display="none";
        
    }else{
        menu_explain_box.style.display="block";
        closeMonsterHint();
    }
}




function openMonsterHint(){
    const menu_monster_hint_box = document.getElementById('menu_monster_hint_box');
    if(menu_monster_hint_box.style.display=="block"){
        menu_monster_hint_box.style.display="none";
        
    }else{
        menu_monster_hint_box.style.display="block";
        b=true;
        for(var monster in monster_list){
            if(b){
                var monster_hint = document.getElementById(monster + "_hint");
                monster_hint.style.display = 'block';
            }
            b=monster_list[monster].finish;
        }
        closeExplains();
    }
}




function closeExplains(){
    const menu_explain_box = document.getElementById("menu_explain_box");
    menu_explain_box.style.display="none";
}

function closeMonsterHint(){
    const menu_monster_hint_box = document.getElementById("menu_monster_hint_box");
    menu_monster_hint_box.style.display="none";
}



function openExplainSheet(n){
    const back = document.getElementById("QB_back");
    explain_img = document.getElementById("explain_image");
    explain_img.src = "images/explains/" + n + ".png";
    explain_sheet = document.getElementById("explain_sheet");
    explain_sheet.style.display = "block";
    now_status = status.BOOK;
    back.style.display = 'block';
    const map = document.getElementById("map");
    map.style.filter = "blur(10px)";
}



function closeExplainSheet(){
    const back = document.getElementById("QB_back");
    explain_sheet = document.getElementById("explain_sheet");
    explain_sheet.style.display = "none";
    now_status = status.MAP;
    back.style.display = 'none';
    const map = document.getElementById("map");
    map.style.filter = "none";
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
    if(n == 'rocky'){
        menu_quiz_explain = document.getElementById("menu_quiz_explain");
        menu_quiz_explain.setAttribute('onclick',  "openExplainSheet('謎画面の説明_2')");
    }
    
    pointer = document.getElementById("quiz_select_icon");
    pointer.style.display = "none";
    
    
    
    
}









function removeMapMonster(n){
    if(n=='B1'){
        b1_icon = document.getElementById("B1_icon");
        b1_icon.style.display= 'none';
        move_button = document.getElementById("button_move_to_rocky");
        move_button.style.display = 'block';
        monster_list["B1"].finish = true;
    }
    if(n=="B2") {
        b2_icon = document.getElementById("B2_icon");
        b2_icon.style.display= 'none';
        move_button = document.getElementById("button_move_to_castle");
        move_button.style.display = 'block';
        monster_list["B2"].finish = true;
        
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
            player_data.point += monster_list['B2'].point;
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
             player_data.point += monster_list['B1'].point;
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
    saveData();
}


function afterLoseMonster(n){
    current_dialog_num = -1;
    current_dialog_list = log_list[log_name.LOSEMONSTER]["B" + n];
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
        blackout.style.display = 'none';
        afterLoseMonster(n);
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

