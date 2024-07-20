




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
        name:'通常'
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
    [magicType.ADD_CHAR+1]:{
        name:'スクエア1',
        image:"images/icons/枠追加.png",
        selected_image:"images/icons/枠追加.png"
    },
    [magicType.ADD_CHAR+2]:{
        name:'スクエア2',
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
                image:"images/quiz/1_寿司.webp",
                answer:["カイロ","海路","回路","懐炉"],
                hint:["3つのイラストはとある食べ物を表しています。<br>真ん中は海苔が巻かれたものを表しています。","これらはお寿司のイラストを示していました。<br>右からイカ、イクラ、マグロとなります"],
            },
            [magicType.YELLOW]:{
                image:"images/quiz/1_寿司_色.webp",
                hint:["カラーを使ってマグロをタマゴにすることができます。"],
                answer:["カイゴ","介護"],
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
                image:"images/quiz/2_ハンガー傘.webp",
                answer:["サンカク","三角"],
                hint:["右の図形を左の三角につけたとき、何に見えるかを考えましょう。上につけると家で使うもの、下につけると雨の日に使うものになるようです。","右の棒を三角の上につけると｢はんがー｣、下につけると｢かさ｣になります。"],
            },
        }
        
    },
    
    3:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/3_色付き英字.webp",
                color_image:"images/quiz/3_色付き英字_色覚特性.webp",
                answer:["ラック","LUCK","luck","Luck"],
                hint:["指示に従って3つの色以外を無視して現れる文字を考えてみましょう。4文字の英単語が出てきます。","紫、赤、緑の色だけを拾うと一番左はLのように考えられます。同様に行うとU、C、Kとなります。"],
            },
            [magicType.RED]:{
                image:"images/quiz/3_色付き英字_色.webp",
                color_image:"images/quiz/3_色付き英字_色_色覚特性.webp",
                answer:["ロック","LOCK","Lock","lock"],
                hint:"カラーの赤色を使って2文字目を｢O｣にすることができます。",
                place:{
                    x: 39, y: 39,  // 座標%
                    w: 9, h: 9   // サイズ%
                }
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/3_色付き英字_鋏.webp",
                color_image:"images/quiz/3_色付き英字_鋏_色覚特性.webp",
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
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/4_オセロ.webp",
                answer:["イノリ","祈り"],
                hint:["オセロなので、同じ色で挟まれた色はひっくり返る法則があります。どのコマがひっくり返るか考えましょう。","置いたマスから下側、右下側のコマがひっくり返ります。"],
            },
            [magicType.BLUE]:{
                image:"images/quiz/4_オセロ_色.webp",
                answer:["コイノボリ","鯉のぼり"],
                hint:"カラーを使って｢ん｣のコマを青色にします。すると左下側にもひっくり返ります",
                place:{
                    x: 29, y: 44,  // 座標%
                    w: 11, h: 14   // サイズ%
                }
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/4_オセロ_字.webp",
                answer:["サツキ","皐月"],
                hint:"文字トランスを使って｢アオ｣を｢アカ｣にします。するとひっくり返るコマが左右方向になります",
                place:{
                    x: 16, y: 72,  // 座標%
                    w: 9, h: 9   // サイズ%
                }
            }
        }
        
    },
    5:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/5_語呂ろくろ.webp",
                answer:["ゴロ","語呂"],
                hint:["それぞれの文字がいくつあるかに着目しましょう。","酸味であれば｢3ミ｣、斜めであれば｢7メ｣のように、文字の数とそのカタカナで言葉になっています。"],
            },
            [magicType.ADD_CHAR]:{
                image:"images/quiz/5_語呂ろくろ_四角.webp",
                answer:["ロクロ","鹿路","轆轤"],
                hint:"",//未記入
                place:{
                    x: 72, y: 7,  // 座標%
                    w: 15, h: 15   // サイズ%
                }//魔法変更済み
            },
        }
        
    },
    6:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/6_星迷路.webp",
                answer:"サイン",
                hint:["はじめは下の方に行きましょう。","下の方に行き、1つ目の曲がり角を曲がりゴールまで行きます。"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/6_星迷路_字.webp",
                answer:["サイテキカイ","最適解"],
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
                image:"images/quiz/7_方位.webp",
                answer:["ノウド","濃度"],
                hint:["4つの方向を表す言葉を考えてみましょう。","4つの単語は4方位を表します。右には「イースト」が埋まるので、そこから時計回りに「サウス」「ウエスト」「ノース」が埋まります。"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/7_方位_字.webp",
                answer:["サイド","彩度","再度"],
                hint:"文字トランスを使うと、右には「ウエスト」が埋まるので、そこから時計回りに「ノース」「イースト」「サウス」が埋まります。",
                place:{
                    x: 59, y: 33,  // 座標%
                    w: 9, h: 9   // サイズ%
                }
            }
        }
        
    },
    
    8:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/8_26分数.webp",
                answer:"ハード",
                hint:["26といえばアルファベットの個数が考えられます。各数字に対応したアルファベットに変換してみましょう。","アルファベット順でそれぞれの番目に対応するアルファベットを考えます。1文字目は8番目のアルファベットなので｢H｣のようにします。"],
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/8_26分数_鋏.webp",
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
                image:"images/quiz/9_りんごなし.webp",
                answer:["アニ","兄","ani","ANI","Ani"],
                hint:["上のイラストである魚、しおり、なしをそれぞれの丸に入るように表記を変えてみましょう。","イラストをローマ字で表記すると丸にピッタリ入ります。NASHIと入れて線で結ばれた文字を順に読んでみましょう"],
            },
            [magicType.RED]:{
                image:"images/quiz/9_りんごなし_色.webp",
                answer:["イロ","色","IRO","Iro","iro"],
                hint:"カラーの赤色を用いるとなしがりんごに変わります。RINGOと埋めてみましょう",
                place:{
                    x: 66, y: 16,  // 座標%
                    w: 14, h: 14   // サイズ%
                }
            },
        }
        
    },
    10:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/10_魚類.webp",
                answer:["ケンマ","研磨"],
                hint:["左のシルエットに対応したものを右に入れましょう。｢日｣は日本語、｢英｣は英語を表しています。","2つのシルエットは｢サケ/サーモン｣、｢ヒト/ヒューマン｣を表していました。数字の順に拾ってみましょう"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/10_魚類_字.webp",
                answer:"メンマ",
                hint:"文字トランスを使って2行目の｢サ｣を｢シ｣にしましょう。｢サメ/シャーク｣となります。",
                place:{
                    x: 49, y: 29,  // 座標%
                    w: 10, h: 10   // サイズ%
                }//魔法変更済み
            },
        }
        
    },
    11:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/11_色境界.webp",
                answer:["ヨケイ","余計"],
                hint:["一見カラフルなただの図形のようですが、カタカナが隠されています。","色の境目を見てみるとカタカナになっています。"],
            },
            [magicType.BLUE]:{
                image:"images/quiz/11_色境界_色.webp",
                answer:["コケイ","固形","古形","湖系","固型"],
                hint:"カラーを使って1文字目の図形の色を変えましょう。ヨがコに変化します。",
                place:{
                    x: 13, y: 34,  // 座標%
                    w: 20, h: 10   // サイズ%
                }//魔法変更済み
            },
        }
        
    },
    12:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/12_じゃんけん.webp",
                answer:["マカイ","魔界"],
                hint:["左側の手と戦ったときの結果をそれぞれで考えてみましょう。","チョキと戦ったときの結果が右側に入ります。マケ、カチ、アイコとなります"],
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/12_じゃんけん_鋏.webp",
                answer:["カイサ","階差","海砂"],
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
                image:"images/quiz/13_一口.webp",
                answer:["ダシン","打診"],
                hint:["漢字のパーツを足したり引いたりしているようです。","漢字のパーツで足し引きすると、上から｢間(あいだ)｣、｢古(いにしえ)｣、｢女(おんな)｣になります。"],
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/13_一口_鋏.webp",
                answer:["カクチ","各地"],
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
                image:"images/quiz/14_九九.webp",
                answer:["インシ","印紙","院試","因子"],
                hint:["右のイラストは｢しし｣、｢にく｣を表しています。小学校で習う知識を使い図形を言い表してみましょう。","左の図形を九九で言ったものを表していました。上は4×4なので｢しし｣、真ん中は2×9なので｢にく｣となります。"],
            },
            [magicType.ADD_CHAR]:{
                image:"images/quiz/14_九九_四角.webp",
                answer:["インゴ","隠語","イン語"],
                hint:"",//未記入
                place:{
                    x: 30, y: 74,  // 座標%
                    w: 10, h: 15   // サイズ%
                }//魔法変更済み
            },
        }
        
    },
    15:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/15_色の名前.webp",
                answer:"フリー",
                hint:["三角形の印は、50音で一つ進めることを表しているようです。","一行目には「ブラウン」、二行目には「ブルー」が埋まります。"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/15_色の名前_字.webp",
                answer:"クルー",
                hint:"文字トランスを使うと、1行目は「グリーン」、二行目は「グレー」が埋まります。",
                place:{
                    x: 21, y: 11,  // 座標%
                    w: 14, h: 14   // サイズ%
                }
            }
        }
        
    },
    
    16:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/16_灰.webp",
                answer:["イロ","色"],
                hint:["それぞれの色の名前を考えてみましょう。ひとつは少し読み方を工夫して入れる必要があるようです。","縦向き、横向きに読んで色の名前になるように文字を入れます。ハイ、クロ、ハクと入れると成立します。"],
            }
        }
        
    },
    
    17:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/17_反転文字.webp",
                answer:["ニモノ","煮物"],
                hint:["右側の問題文は｢コレハナニ？｣と書かれています。どういった規則があるかを考えてみましょう。","不思議な図形は、半分に割った左側を見る法則です。"],
            },
            [magicType.ADD_CHAR]:{
                image:"images/quiz/17_反転文字_四角.webp",
                answer:["エモノ","獲物"],
                hint:"",//未記入
                place:{
                    x: 38, y: 23,  // 座標%
                    w: 15, h: 15   // サイズ%
                }//魔法変更済み
            }
        }
    },
    
    18:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/18_柿.webp",
                answer:["ツチ","土"],
                hint:["これは、とある表の一部を示しています。赤い規則をヒントに考えてみましょう。","これは、五十音表の一部を表していました。赤い矢印は｢カキ｣となり植物の名前となります。"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/18_柿_字.webp",
                answer:["テツ","鉄"],
                hint:"文字トランスを使って｢シ｣を｢ス｣にしましょう。赤い矢印が｢キク｣となり成立します。",
                place:{
                    x: 44, y: 31,  // 座標%
                    w: 15, h: 15   // サイズ%
                }//魔法変更済み
            }
        }
    },
    
    19:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/19_栗.webp",
                answer:["スナ","砂"],
                hint:["右のイラストはハコ、クリを表しています。例から下線部に薄い部分と濃い部分がある法則を読み解きましょう。","下線部の濃淡はカタカナの画数のうち、何画目を拾うかを表していました。ネの2, 4画目を見るとス、チの2, 3画目を見るとナになります。"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/19_栗_字.webp",
                answer:["スソ","裾"],
                hint:"文字トランスを用いて｢チ｣を｢ツ｣にすると2, 3画目を見ると｢ソ｣になります。",
                place:{
                    x: 33, y: 65,  // 座標%
                    w: 10, h: 15   // サイズ%
                }//魔法変更済み
            },
        }
        
    },
    20:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/20_県名.webp",
                answer:["アキス","空き巣"],
                hint:["まずは赤い波線の共通点が何か考えてみましょう。どうやら47個あるもののようです。","赤い波線はすべて都道府県名になっているという法則がありました。上から青森、秋田、静岡となります。"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/20_県名_字.webp",
                answer:"アイス",
                hint:"文字トランスを使ってタをチに変えると、2行目が表す都道府県が愛知に変わります。",
                place:{
                    x: 53, y: 31,  // 座標%
                    w: 14, h: 14   // サイズ%
                }
            }
        }
        
    },
    
    
    21:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/21_干支.webp",
                answer:["マル","丸"],
                hint:["これは12匹の動物の並びを使います。その上でいくつか進めてマスの中に埋めましょう。","これらは十二支を表していました。その順番で進めたり戻したりすると｢ウマ｣、｢サル｣が入ります"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/21_干支_字.webp",
                answer:["シル","汁","知る"],
                hint:"文字トランスを使って｢トラ｣を｢トリ｣に変えます。すると｢ウシ｣に変化します。",
                place:{
                    x: 30, y: 55,  // 座標%
                    w: 9, h: 9   // サイズ%
                }
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/21_干支_鋏.webp",
                answer:["マリ","鞠"],
                hint:"ハサミを使って｢イヌ｣を｢イ｣に変えます。すると｢トリ｣に変化します",
                place:{
                    x: 77, y: -2,  // 座標%
                    w: 14, h: 14   // サイズ%
                }
            }
        }
    },
    22:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/22_ア行.webp",
                answer:["ヤカラ","輩"],
                hint:["1行目は｢あたま｣、2行目は｢さかな｣を表しています。数字と文字を対応させて法則を考えてみましょう。","この漢数字はア行の何番目の文字かを表していました。一が｢あ｣と対応させていきましょう"],
            },
            [magicType.ADD_CHAR]:{
                image:"images/quiz/22_ア行_四角.webp",
                answer:["タカラ","宝"],
                hint:"スクエアを使って八を四にすると｢や｣が｢た｣に変化します。",
                place:{
                    x: 15, y: 71,  // 座標%
                    w: 10, h: 15   // サイズ%
                }//魔法変更済み
            },
        }
        
    },
    23:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/23_鏡もじ.webp",
                answer:"ボット",
                hint:["すべての赤い線には共通の法則が成り立っています。それぞれが文字になるにはどういった法則になればよいか考えてみましょう。","赤い線で線対称となるように折り返すという法則がありました。その法則を適用すると｢BOX｣｢TOUCH｣となり右側には｢ボックス｣｢タッチ｣が入り矢印も｢口｣で成立します。"],
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/23_鏡もじ_鋏.webp",
                answer:"エイト",
                hint:"ハサミを使って左側をXとHだけ残すと｢エックス｣｢エイチ｣が入ります。",
                place:{
                    x: 39, y: -5,  // 座標%
                    w: 10, h: 20   // サイズ%
                }//魔法変更済み
            },
        }
        
    },
    24:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/24_曜日.webp",
                answer:["アシタ","明日","ミョウニチ","みょうにち","アス","あす"],
                hint:["それぞれ漢字に変換して漢字に変換してみましょう。「鏡」の左半分を＋１すると「境」になるようです。","漢字に変換して考えると、「金」に＋１で「土」、「月」に＋３で「木」となる事から、数字の分だけ曜日を進めればいいことが分かります。"],
            }
        }
        
    },
    25:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/25_しりとり.webp",
                answer:["シコウ","思考","志向","指向","試行","嗜好","至高","施行","歯垢","施工"],
                hint:["6つの単語がひとつながりになるようにしりとりをしましょう。初めは｢こうどう｣からになります。","こうどう→うけつけ→けいかい→いしばし→しょうひ→ひとくち とするとしりとりが成立します。"],
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/25_しりとり_鋏.webp",
                answer:["ヒオケ","火桶"],
                hint:"ハサミを使って公道を公にして受付を無くすと順番が変化します。",
                place:{
                    x: 66, y: -5,  // 座標%
                    w: 10, h: 20   // サイズ%
                }//魔法変更済み
            },
            [magicType.ADD_CHAR]:{
                image:"images/quiz/25_しりとり_四角.webp",
                answer:["イコウ","威光","以降","移行","意向","遺構","偉功"],
                hint:"スクエアを使って口を回にすると｢ひとくち｣が｢いっかい｣になりしりとりが変わります。",
                place:{
                    x: 20, y: 20,  // 座標%
                    w: 10, h: 10   // サイズ%
                }//魔法変更済み
            },
        }
        
    },
    26:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/26_サイコロ.webp",
                answer:"プロジェクト",
                hint:["すごろくのように目が出たものとしてコマを進めてみましょう。","Sから3マス進み、1マス進み、…と繰り返し止まったマスを順に読みます"],
            },
            [magicType.RED]:{
                image:"images/quiz/26_サイコロ_色.webp",
                answer:"ポスター",
                hint:"カラーを使ってサイコロの背景を赤くすると１の目が消えます。",
                place:{
                    x: 23, y: 40,  // 座標%
                    w: 52, h: 14   // サイズ%
                }
            }
        }
        
    },
    27:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/27_色あみだ.webp",
                answer:["キカク","企画","規格"],
                hint:["この図は左右で何かが共通していることを表しています。色をそのまま色の名前で捉えて考えてみましょう。","左のカラフルな四角形を色の名前で変換すると、左右で使われている文字が似ていることがわかります。過不足なく共通しているとすると答えがわかります。"],
            },
            [magicType.BLUE]:{
                image:"images/quiz/27_色あみだ_色.webp",
                answer:["キオク","記憶"],
                hint:"カラーで赤を青にすると使われる文字が変わります。",
                place:{
                    x: 16, y: 65,  // 座標%
                    w: 15, h: 10   // サイズ%
                }//魔法変更済
            },
        }
        
    },
    
    
    28:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/28_ピースはめ.webp",
                answer:["カタチ","形"],
                hint:["赤矢印が｢たに｣になるようにピースを配置し、そこからうまくはまるように考えてみましょう。","赤い矢印が｢たに｣であることをヒントに右上のピースが左上に入ります。"],
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/28_ピースはめ_鋏.webp",
                answer:["クウキ","空気"],
                hint:"ハサミを使い真ん中を切ることで別の問題にすることができます。｢たに｣のヒントから5×5のマス目は五十音表を示しています。",
                afterInvolvedHint:"赤い矢印が通る2マスには｢たに｣が入ります。これはとある表の右側を切り取ったものを表しています。",
                place:{
                    x: 40, y: -2,  // 座標%
                    w: 7, h: 14   // サイズ%
                }
            }
        }
        
    },
    29:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/29_覆面算.webp",
                answer:["クウハク","空白"],
                hint:["まずは一番下の49となる数字を考えましょう。そこから真ん中、一番上と考えていくとわかりやすいと思います。","丸＝7、六角＝9、四角＝8となります"],
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/29_覆面算_鋏.webp",
                answer:["タナバタ","七夕"],
                hint:"ハサミを使って49を4にすると、丸＝2、六角＝4、四角＝3となります。",
                place:{
                    x: 66, y: -5,  // 座標%
                    w: 14, h: 20   // サイズ%
                }//魔法変更済
            },
        }
        
    },
    30:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/30_プリクラ.webp",
                answer:["セイリ","整理","正理","生理"],
                hint:["左下のイラストは｢キントレ｣、右下のイラストは｢プリクラ｣を示しています。","左端からプリクラ、ライム、オムスビ、オンセン、キントレが入ります。"],
            },
            [magicType.YELLOW]:{
                image:"images/quiz/30_プリクラ_色.webp",
                answer:["ギモン","疑問"],
                hint:"カラーを使ってライムをレモンにすると、左端からキントレ、レモン、オンセン、オニギリ、プリクラが入ります。",
                place:{
                    x: 70, y: 20,  // 座標%
                    w: 15, h: 20   // サイズ%
                }//魔法変更済
            },
        }
        
    },
    31:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/31_月.webp",
                answer:["ゲカ","外科"],
                hint:["左のイラストは空に浮かぶアレを表しています。","2つとも状態の違う月を表していました。｢まんげつ｣｢みかづき｣と入れます。"],
            },
            [magicType.RED]:{
                image:"images/quiz/31_月_色.webp",
                answer:["ヨカ","余暇"],
                hint:"カラーの赤を使って｢まんげつ｣を｢たいよう｣に変えることができます。",
                place:{
                    x: 15, y: 21,  // 座標%
                    w: 20, h: 25   // サイズ%
                }//魔法変更済
            },
            [magicType.SCISSORS]:{
                image:"images/quiz/31_月_鋏.webp",
                answer:["ゲン","弦","限","源","元"],
                hint:"ハサミを使って左側を切ると｢ハンゲツ｣と｢シンゲツ｣になります。",
                place:{
                    x: 20, y: -5,  // 座標%
                    w: 12, h: 20   // サイズ%
                }//魔法変更済
            },
        }
        
    },
    32:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/32_eat.webp",
                answer:["ダンク","dunk","Dunk","DUNK"],
                hint:["橙、緑の矢印はそれぞれのものを口へ運ぶ際の動作を表しています。","2本の矢印はそれぞれを口へ運ぶ動作を示していました。上はDRINK、下はEATであり、イラストがTEAとRICEであるとわかります。"],
            },
        }
        
    },
    33:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/33_部首.webp",
                answer:["シカク","四角","資格","視覚","死角","刺客"],
                hint:["それぞれのカタカナは漢字に関する形が似ているパーツを表しています。ウは上側、イは左側、リは右側に来ることが多いです。","それぞれのカタカナは似た部首を表していました。ネ、サ、ロは｢しめすへん｣、｢くさかんむり｣、｢くち｣か｢くちへん｣か｢くにがまえ｣を示しています"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/33_部首_字.webp",
                answer:["シズク","雫","滴"],
                hint:"文字トランスを使って｢サ｣を｢シ｣にすることで｢さんずい｣に変わります。",
                place:{
                    x: 19, y: 62,  // 座標%
                    w: 10, h: 12   // サイズ%
                }
            }
        }
        
    },
    34:{
        color_vision: false,
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/34_国旗.webp",
                answer:["スミカ","住処","栖","棲家"],
                hint:["2つの国旗のうち、上側はイタリアを表しています。表でイタリアがミツバチになる法則を考えてみましょう。","上の表で国旗の国名の一つ下のマスを読む法則になっていました。ドイツの一つ下を読んでみましょう"],
            },
            [magicType.BLUE]:{
                image:"images/quiz/34_国旗_色.webp",
                answer:"コアラ",
                hint:"カラーの青色を使ってイタリアをフランス国旗にしましょう。すると法則が国名と点対称の位置にある文字を拾う法則になります。",
                place:{
                    x: 21, y: 57,  // 座標%
                    w: 7, h: 14   // サイズ%
                }
            }
        }
        
    },
    35:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/35_間.webp",
                answer:["ヤミ","闇"],
                hint:["前後の文から、点線がついた四角に入りそうな漢字を推測してみましょう。構成する二つの漢字のうちの一方は「門」です。","四角に｢間｣を入れると、｢間を構成する二つの漢字の間に立を入れてできる漢字は？｣という分が出来上がります。"],
            },
        }
        
    },
    36:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/36_数字埋め.webp",
                answer:["オーブン","OVEN","Oven","oven"],
                hint:["4つの数字は英単語にして埋めてみましょう。","文字数の関係から一番下にはONEが入り、その上にはTHREEが入ります。他についても同様に考えてみましょう。"],
            },
            [magicType.ADD_CHAR]:{
                image:"images/quiz/36_数字埋め_四角.webp",
                answer:["ツリー","TREE","Tree","tree"],
                hint:"",//未記入
                place:{
                    x: 78, y: 32,  // 座標%
                    w: 10, h: 15   // サイズ%
                }//魔法変更済
            },
        }
        
    },
    37:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/37_トランプ.webp",
                answer:"ジンクス",
                hint:["デザインなどから推測して、カードに関する4種類の単語を下に入れていきましょう。","カードと既に出ているものからトランプのAJQKが入ると推測されます。上からエース、ジャック、クイーン、キングと入れます"],
            },
            [magicType.CHANGE_CHAR]:{
                image:"images/quiz/37_トランプ_字.webp",
                answer:"ダスト",
                hint:"文字トランスを使って｢キ｣を｢ク｣にすると、トランプのスートが入ります。上からハート、スペード、ダイヤ、クラブが入ります",
                place:{
                    x: 38, y: 73,  // 座標%
                    w: 10, h: 15   // サイズ%
                }//魔法変更済
            },
        }
        
    },
    38:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/38_ワープ迷路.webp",
                answer:["ナガサキ","長崎"],
                hint:["ワープしながらゴールを目指しましょう。まずは下に進み｢な｣を通ります。","緑、黄を使ってSからGへ行くことができます。"],
            },
            [magicType.BLUE]:{
                image:"images/quiz/38_ワープ迷路_色.webp",
                answer:["ナゴヤ","名古屋"],
                hint:"カラーを使って緑の四角を青色にしましょう。ルートが変わります。",
                place:{
                    x: 35, y: 61,  // 座標%
                    w: 10, h: 14   // サイズ%
                }//魔法変更済
            },
            [magicType.ADD_CHAR]:{
                image:"images/quiz/38_ワープ迷路_四角.webp",
                answer:["ナハ","那覇"],
                hint:"スクエアを使って｢な｣の下に四角を配置すると下の白い四角へワープできます。そこから上にあるGへ進みましょう",
                place:{
                    x: 26, y: 62,  // 座標%
                    w: 10, h: 12   // サイズ%
                }//魔法変更済
            },
        }
        
    },
    39:{
        magics:{
            [magicType.NONE]:{
                image:"images/quiz/39_色紙.webp",
                answer:["キン","金","菌"],
                hint:["人と口、色と紙で熟語のペアができます。それぞれ何という熟語になるか考えてみましょう。","人と口で人口、色と紙で色紙となります。上に｢しきし｣、下に｢じんこう｣と入れます。"],
            },
            [magicType.ADD_CHAR+1]:{
                image:"images/quiz/39_色紙_四角1.webp",
                answer:["トロ","吐露"],
                hint:"スクエアを使って口に重なるように配置すると｢じんこう｣が｢ひとめ｣になります。下に｢いろがみ｣を入れます。",
                place:{
                    x: 22, y: 37,  // 座標%
                    w: 10, h: 14   // サイズ%
                }//魔法変更済
            },
            [magicType.ADD_CHAR+2]:{
                image:"images/quiz/39_色紙_四角2.webp",
                answer:["ロン","論"],
                hint:"スクエアを使って右のマスを一つ増やすと｢しきし｣が｢いろがみ｣になって入ります。",
                place:{
                    x: 78, y: 44,  // 座標%
                    w: 10, h: 12   // サイズ%
                }//魔法変更済
            },
        }
        
    },
}








const quiz_place_list = {
    prairie:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    castle:[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    extra:[29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
}


window.onload = function (){
    for(const v of quiz_place_list.prairie){
        make_quiz(v,"prairie");
    }
    for(const v of quiz_place_list.castle){
        make_quiz(v,"castle");
    }
    for(const v of quiz_place_list.extra){
        make_quiz(v,"extra");
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


function make_quiz(n,place){
    quiz_data = quiz_list[n];
    
    var parentElement = document.getElementById('main-content');
    
    var Q_div = document.createElement('div');
    Q_div.id = 'Q' + n;
    Q_div.className = 'Qs'; 
    
//    var Q_button = document.createElement('button');
//    Q_button.id = 'Q'+n+'_button';
//    Q_button.className = 'Q_button '+place;
//    Q_button.textContent = 'No.' + n;
    
//    var acodion_body = document.createElement('div');
//    acodion_body.className = 'acodion_body';
    
//    var nomal_answer = newQuizAndAnswer(magicType.NONE);
//    acodion_body.appendChild(nomal_answer);
    
    
    var quiz_image = document.createElement('img');
    quiz_image.className = 'quiz_image';
    // console.log(n);
    quiz_image.src = quiz_data.magics[magicType.NONE].image;
    
    var hr = document.createElement('hr');
    hr.style.color = "black";
    hr.setAttribute('noshade', 'noshade');



    for(const magictype in quiz_data.magics){

        
        var new_acodion_body = document.createElement('div');
        new_acodion_body.className = 'acodion_body';
    
        var magic_Q_button = document.createElement('button');
        magic_Q_button.id = 'Q' + n + '_' + magictype + '_button';
        magic_Q_button.className = 'Q_button magic_button';
        magic_Q_button.textContent = magic_info[magictype].name + 'の答え';
        var quiz_and_answer = newQuizAndAnswer(magictype);
        new_acodion_body.appendChild(quiz_and_answer);
        Q_div.appendChild(magic_Q_button);
        Q_div.appendChild(new_acodion_body);
        
    }
    
    
//    Q_div.appendChild(Q_button);
//    Q_div.appendChild(acodion_body);
    parentElement.appendChild(hr);
    parentElement.appendChild(quiz_image);
    parentElement.appendChild(Q_div);
}




function make_quiz_2(n,place){
    quiz_data = quiz_list[n];
    
    var parentElement = document.getElementById('main-content');
    
    var Q_div = document.createElement('div');
    Q_div.id = 'Q' + n;
    Q_div.className = 'Qs'; 
    
//    var Q_button = document.createElement('button');
//    Q_button.id = 'Q'+n+'_button';
//    Q_button.className = 'Q_button '+place;
//    Q_button.textContent = 'No.' + n;
    
//    var acodion_body = document.createElement('div');
//    acodion_body.className = 'acodion_body';
    
//    var nomal_answer = newQuizAndAnswer(magicType.NONE);
//    acodion_body.appendChild(nomal_answer);
    
    
    var quiz_image = document.createElement('img');
    quiz_image.className = 'quiz_image';
    quiz_image.src = quiz_data.magics[magicType.NONE].image;
    
    var hr = document.createElement('hr');
    hr.style.color = "black";
    hr.setAttribute('noshade', 'noshade');
    
    var open_magic_Q_button = document.createElement('button');
    open_magic_Q_button.id = 'Q' + n + '_open_magic_button';
    open_magic_Q_button.className = 'Q_button open_magic_button';
    open_magic_Q_button.textContent = '魔法の答え';
    var open_magic_acodion_body = document.createElement('div');
    open_magic_acodion_body.className = 'acodion_body';
    
    let need_magic_button = false;

    for(const magictype in quiz_data.magics){
        
        if(typeof quiz_data.magics.magicType == "string"){
            continue;
        }
        var new_acodion_body = document.createElement('div');
        new_acodion_body.className = 'acodion_body';
    
        var magic_Q_button = document.createElement('button');
        magic_Q_button.id = 'Q' + n + '_' + magictype + '_button';
        magic_Q_button.textContent = magic_info[magictype].name + 'の答え';
        var quiz_and_answer = newQuizAndAnswer(magictype);
        new_acodion_body.appendChild(quiz_and_answer);
        
        if(magictype == magicType.NONE){
            magic_Q_button.className = 'Q_button';
            Q_div.appendChild(magic_Q_button);
            Q_div.appendChild(new_acodion_body);
        }else{
            
            magic_Q_button.className = 'Q_button magic_button';
            need_magic_button = true;
            open_magic_acodion_body.appendChild(magic_Q_button);
            open_magic_acodion_body.appendChild(new_acodion_body);
        }
        
    }
    
    
//    Q_div.appendChild(Q_button);
//    Q_div.appendChild(acodion_body);
    if(need_magic_button){
        Q_div.appendChild(open_magic_Q_button);
        Q_div.appendChild(open_magic_acodion_body);
    }
    parentElement.appendChild(quiz_image);
    parentElement.appendChild(Q_div);
    parentElement.appendChild(hr)
}






function newQuizAndAnswer(magictype){
    var quiz_and_answer = document.createElement('div');
    quiz_and_answer.className = 'quiz_and_answer';
    if(magictype == magicType.NONE){
        quiz_and_answer.classList.toggle('nomal_answer');
    }else{
        var quiz_image = document.createElement('img');
        quiz_image.className = 'quiz_image';
        quiz_image.src = quiz_data.magics[magictype].image;
        quiz_and_answer.appendChild(quiz_image);

    }

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
    answer_p.className = 'answer_button';
    var answer = quiz_data.magics[magictype].answer;
    if(typeof(answer) != 'string'){
        answer = answer[0] + "," + answer[1];
    }
    answer_p.textContent = '答えを表示';
    answer_p.addEventListener('click', (e) => {
        showAnswer(e.target,answer,true);
    })
    
    
    explain_and_answer.appendChild(explain_p);
    explain_and_answer.appendChild(answer_p);
    quiz_and_answer.appendChild(explain_and_answer);
    
    return(quiz_and_answer);
}






function showAnswer(answer_p,answer,show){
    if(show){
        answer_p.textContent = '答え：' + answer;
        console.log(answer_p);
        answer_p.className = 'answer_p';
        answer_p.removeEventListener('click', (e) => {
            showAnswer(e.target,answer,true);
        })
    }
}