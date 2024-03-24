




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
                    x: 66, y: 14,  // 座標%
                    w: 16, h: 8   // サイズ%
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
                hint:["それぞれの文字がいくつあるかに着目しましょう。","酸味であれば｢3ミ｣、斜めであれば｢7メ｣のように、文字の数とそのカタカナで言葉になっていました。"],
            },
            [magicType.RED]:{
                image:"images/quiz/3_色付き英字_色.png",
                color_image:"images/quiz/3_色付き英字_色_色覚特性.png",
                answer:["ロック","LOCK","Lock","lock"],
                hint:"カラーの赤色を使って2文字目を｢O｣にすることができます",
                place:{
                    x: 41, y: 41,  // 座標%
                    w: 5, h: 5   // サイズ%
                }
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/3_色付き英字_鋏.png",
                color_image:"images/quiz/3_色付き英字_鋏_色覚特性.png",
                answer:["スター","STAR","star","Star"],
                hint:"ハサミを使って｢むらさきいろ｣を｢きいろ｣にします",
                place:{
                    x: 20, y: 0,  // 座標%
                    w: 10, h: 10   // サイズ%
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
                hint:"カラーの青色を使ってイタリアをフランス国旗にしましょう。すると法則が国名と線対称の位置にある文字を拾う法則になります。",
                place:{
                    x: 23, y: 59,  // 座標%
                    w: 5, h: 12   // サイズ%
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
                    x: 68, y: 18,  // 座標%
                    w: 10, h: 10   // サイズ%
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
                    x: 36, y: 9,  // 座標%
                    w: 4, h: 6   // サイズ%
                }
            },
        }
        
    },
    7:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/7_曜日.png",
                answer:["アシタ","明日","ミョウニチ","アス"],
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
                hint:"アルファベット順でそれぞれの番目に対応するアルファベットを考えます。1文字目は8番目のアルファベットなので｢H｣のようにすると",
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
                image:"images/quiz/9_部首.png",
                answer:"シカク",
                hint:["それぞれのカタカナは漢字に関する形が似ているパーツを表しています。ウは上側、イは左側、リは右側に来ることが多いです。","それぞれのカタカナは似た部首を表していました。ネ、サ、ロは｢しめすへん｣、｢くさかんむり｣、｢くち｣か｢くちへん｣か｢くにがまえ｣を示しています"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/9_部首_字.png",
                answer:"シズク",
                hint:"文字トランスを使って｢サ｣を｢シ｣にすることで｢さんずい｣に変わります。",
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
                    x: 42, y: -2,  // 座標%
                    w: 5, h: 12   // サイズ%
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
                    x: 32, y: 57,  // 座標%
                    w: 7, h: 7   // サイズ%
                }
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/11_干支_鋏.png",
                answer:["マリ","鞠"],
                hint:"ハサミを使って｢イヌ｣を｢イ｣に変えます。すると｢トリ｣に変化します",
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
                    x: 40, y: -2,  // 座標%
                    w: 10, h: 12   // サイズ%
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
                    x: 21, y: -2,  // 座標%
                    w: 10, h: 12   // サイズ%
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
                    x: 23, y: 13,  // 座標%
                    w: 10, h: 10   // サイズ%
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
                hint:"カラーを使って問題の背景を赤くすると1の目が消えます。",
                place:{
                    x: 25, y: 42,  // 座標%
                    w: 48, h: 10   // サイズ%
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
                    x: 31, y: 46,  // 座標%
                    w: 7, h: 10   // サイズ%
                }
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/16_オセロ_字.png",
                answer:"サツキ",
                hint:"文字トランスを使って｢アオ｣を｢アカ｣にします。するとひっくり返るコマが左右方向になります",
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
                    x: 61, y: 35,  // 座標%
                    w: 5, h: 5   // サイズ%
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
                    x: 55, y: 33,  // 座標%
                    w: 10, h: 10   // サイズ%
                }
            }
        }
        
    }
}






window.onload = function (){
    for(const key in quiz_list){
        make_quiz(key);
    }
    const buttons = document.querySelectorAll('.Q_button');
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            //テキストの親要素を取得
            const body = e.currentTarget.nextElementSibling;
            

            if(!e.currentTarget.classList.contains("magic_button")){
                const elements = document.querySelectorAll('.open');
                elements.forEach(element => {
                    if(element!=body){
                        element.classList.remove('open');   
                    }
                });

            }


            body.classList.toggle('open');
            console.log("Q_button")
        });
    });
    
    var quiz_data = null;

}


function make_quiz(n){
    quiz_data = quiz_list[n];
    
    var parentElement = document.getElementById('main-content');
    
    var Q_div = document.createElement('div');
    Q_div.id = 'Q' + n;
    Q_div.className = 'Qs'; 
    
    var Q_button = document.createElement('button');
    Q_button.id = 'Q'+n+'_button';
    Q_button.className = 'Q_button';
    Q_button.textContent = 'No.' + n;
    
    var acodion_body = document.createElement('div');
    acodion_body.className = 'acodion_body';
    
    var nomal_answer = newQuizAndAnswer(magicType.NONE);
    acodion_body.appendChild(nomal_answer);
    for(const magictype in quiz_data.magics){
        if(magictype == magicType.NONE){
            continue;
        }
        
        var new_acodion_body = document.createElement('div');
        new_acodion_body.className = 'acodion_body';
    
        var magic_Q_button = document.createElement('button');
        magic_Q_button.id = 'Q' + n + '_' + magictype + '_button';
        magic_Q_button.className = 'Q_button magic_button';
        magic_Q_button.textContent = magic_info[magictype].name + 'の答え';
        var quiz_and_answer = newQuizAndAnswer(magictype);
        new_acodion_body.appendChild(quiz_and_answer);
        acodion_body.appendChild(magic_Q_button);
        acodion_body.appendChild(new_acodion_body);
        
    }
    Q_div.appendChild(Q_button);
    Q_div.appendChild(acodion_body);
    parentElement.appendChild(Q_div);
}




function newQuizAndAnswer(magictype){
    var quiz_and_answer = document.createElement('div');
    quiz_and_answer.className = 'quiz_and_answer';
    if(magictype == magicType.NONE){
        quiz_and_answer.classList.toggle('nomal_answer');
    }
    
    var quiz_image = document.createElement('img');
    quiz_image.className = 'quiz_image';
    quiz_image.src = quiz_data.magics[magictype].image;
    
    var explain_and_answer = document.createElement('div');
    explain_and_answer.className = 'explain_and_answer';
    
    var explain_p = document.createElement('p');
    explain_p.className = 'explain';
    explain_p.innerHTML = quiz_data.magics[magictype].hint;
    if(typeof(quiz_data.magics[magictype].hint) != "string"){
        hint = quiz_data.magics[magictype].hint.join(' ');
        explain_p.innerHTML = hint;
    }
    
    var answer_p = document.createElement('p');
    answer_p.className = 'answer';
    var answer = quiz_data.magics[magictype].answer;
    if(typeof(answer) != 'string'){
        answer = answer[0] + "," + answer[1];
    }
    answer_p.textContent = '答え：' + answer;
    
    
    explain_and_answer.appendChild(explain_p);
    explain_and_answer.appendChild(answer_p);
    quiz_and_answer.appendChild(quiz_image);
    quiz_and_answer.appendChild(explain_and_answer);
    
    return(quiz_and_answer);
}



