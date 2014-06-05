var hatokurandom = {};

(function (H, $, $m) {
  // Naming convensions  //{{{1
  //
  // cid: Card ID
  // eid: Expansion ID
  // sid: Supply ID
  //   dsid: Dynamic Supply ID
  //   psid: Predefined Supply ID
  //   rsid: Random Supply ID
  // tid: Template ID
  // pid: Page ID
  //   apid: Actual Page ID (PID without any query parameter)
  // lid: supply List ID
  // xcard: eXtra information + CARD
  // xcards: array of xcards + various flags
  //
  // rarity
  //   'B' = basic
  //   'C' = common
  //   'R' = rare
  //   undefined = unknown

  // Fundamental tools  //{{{1
  function delay(expressionAsFunction) {  //{{{2
    var result;
    var isEvaluated = false;

    return function () {
      if (!isEvaluated) {
        result = expressionAsFunction();
        isEvaluated = true;
      }
      return result;
    };
  }

  function force(promise) {  //{{{2
    return promise();
  }

  // Constants  //{{{1
  // Eids  //{{{2
  H.EID_BASIC = 1;
  H.EID_FAREAST = 2;
  H.EID_NORTHERN = 3;
  H.EID_FAIRY = 4;
  H.EID_SIX = 5;

  H.EXPANSIONS = [  //{{{2
    {eid: H.EID_BASIC, name: '基本セット', symbol: '基本'},
    {eid: H.EID_FAREAST, name: '極東辺境領', symbol: '極東'},
    {eid: H.EID_NORTHERN, name: '北限の魔女', symbol: '北限'},
    {eid: H.EID_FAIRY, name: 'フェアリーガーデン', symbol: 'ＦＧ'},
    {eid: H.EID_SIX, name: '六都市同盟', symbol: '六都'}
  ];

  H.ALL_CARDS = [  //{{{2
    // Sorted by eid, cost, link, then name.
    // :'<,'>sort /cid: \S\+, \zs.*/ r
    //
    // Princess cards are counted as rare cards.
    // Reference: https://twitter.com/HeartofCrown/status/233840190383341568

    // 基本セット  //{{{3

    {cid: 0x34, eid: H.EID_BASIC, cost: 0, link: undefined, name: '呪い', types: ['災い'], rarity: 'B'},

    {cid: 0x2b, eid: H.EID_BASIC, cost: 1, link: 1, name: '農村', types: ['領地'], rarity: 'B'},

    {cid: 0x01, eid: H.EID_BASIC, cost: 2, link: 1, name: '城壁', types: ['行動', '防衛'], rarity: 'C'},
    {cid: 0x02, eid: H.EID_BASIC, cost: 2, link: 1, name: '寄付', types: ['行動'], rarity: 'C'},
    {cid: 0x03, eid: H.EID_BASIC, cost: 2, link: 1, name: '願いの泉', types: ['行動'], rarity: 'C'},
    {cid: 0x04, eid: H.EID_BASIC, cost: 2, link: 2, name: '斥候', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},
    {cid: 0x05, eid: H.EID_BASIC, cost: 2, link: 2, name: '早馬', types: ['行動'], rarity: 'C'},
    {cid: 0x2e, eid: H.EID_BASIC, cost: 2, link: undefined, name: '見習い侍女', types: ['継承権'], subtype: '侍女', rarity: 'B'},

    {cid: 0x06, eid: H.EID_BASIC, cost: 3, link: 0, name: '交易船', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x07, eid: H.EID_BASIC, cost: 3, link: 0, name: '埋もれた財宝', types: ['行動'], rarity: 'C'},
    {cid: 0x08, eid: H.EID_BASIC, cost: 3, link: 0, name: '御用商人', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x09, eid: H.EID_BASIC, cost: 3, link: 1, name: '召集令状', types: ['行動'], rarity: 'C'},
    {cid: 0x0a, eid: H.EID_BASIC, cost: 3, link: 1, name: '焼き畑農業', types: ['行動'], rarity: 'C'},
    {cid: 0x0b, eid: H.EID_BASIC, cost: 3, link: 1, name: '破城槌', types: ['行動'], rarity: 'C'},
    {cid: 0x0c, eid: H.EID_BASIC, cost: 3, link: 1, name: '買収工作', types: ['行動', '攻撃'], subtype: '計略', rarity: 'C'},
    {cid: 0x2c, eid: H.EID_BASIC, cost: 3, link: 1, name: '都市', types: ['領地'], rarity: 'B'},
    {cid: 0x0d, eid: H.EID_BASIC, cost: 3, link: 1, name: '隠れ家', types: ['行動', '防衛'], rarity: 'C'},
    {cid: 0x0e, eid: H.EID_BASIC, cost: 3, link: 1, name: '魔法の護符', types: ['行動', '防衛', '災い'], rarity: 'C'},
    {cid: 0x2f, eid: H.EID_BASIC, cost: 3, link: undefined, name: '宮廷侍女', types: ['継承権'], subtype: '侍女', rarity: 'B'},

    {cid: 0x0f, eid: H.EID_BASIC, cost: 4, link: 0, name: '歩兵大隊', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},
    {cid: 0x10, eid: H.EID_BASIC, cost: 4, link: 1, name: '図書館', types: ['行動'], rarity: 'C'},
    {cid: 0x11, eid: H.EID_BASIC, cost: 4, link: 1, name: '追い立てられた魔獣', types: ['行動', '攻撃'], subtype: '計略', rarity: 'C'},
    {cid: 0x12, eid: H.EID_BASIC, cost: 4, link: 1, name: '都市開発', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x13, eid: H.EID_BASIC, cost: 4, link: 1, name: '金貸し', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x14, eid: H.EID_BASIC, cost: 4, link: 1, name: '魅了術の魔女', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C'},
    {cid: 0x15, eid: H.EID_BASIC, cost: 4, link: 2, name: 'シノビ', types: ['行動'], subtype: '計略', rarity: 'C'},
    {cid: 0x16, eid: H.EID_BASIC, cost: 4, link: 2, name: '星詠みの魔女', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x17, eid: H.EID_BASIC, cost: 4, link: 2, name: '補給部隊', types: ['行動'], subtype: '兵力', rarity: 'C'},

    {cid: 0x18, eid: H.EID_BASIC, cost: 5, link: 0, name: '冒険者', types: ['行動'], rarity: 'C'},
    {cid: 0x19, eid: H.EID_BASIC, cost: 5, link: 0, name: '呪詛の魔女', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C'},
    {cid: 0x1a, eid: H.EID_BASIC, cost: 5, link: 0, name: '近衛騎士団', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},
    {cid: 0x1b, eid: H.EID_BASIC, cost: 5, link: 0, name: '銀行', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x1c, eid: H.EID_BASIC, cost: 5, link: 1, name: '皇室領', types: ['継承権', '領地'], rarity: 'C'},
    {cid: 0x1d, eid: H.EID_BASIC, cost: 5, link: 1, name: '錬金術師', types: ['行動'], rarity: 'C'},
    {cid: 0x30, eid: H.EID_BASIC, cost: 5, link: undefined, name: '議員', types: ['継承権'], rarity: 'B'},

    {cid: 0x2d, eid: H.EID_BASIC, cost: 6, link: 1, name: '大都市', types: ['領地'], rarity: 'B'},
    {cid: 0x37, eid: H.EID_BASIC, cost: 6, link: undefined, name: '南洋の市姫 クラムクラム', types: ['プリンセス'], rarity: 'R'},
    {cid: 0x3a, eid: H.EID_BASIC, cost: 6, link: undefined, name: '双子の姫 レイン&シオン', types: ['プリンセス'], rarity: 'R'},
    {cid: 0x1e, eid: H.EID_BASIC, cost: 6, link: undefined, name: '噂好きの公爵夫人', types: ['継承権'], rarity: 'C'},
    {cid: 0x38, eid: H.EID_BASIC, cost: 6, link: undefined, name: '大方博雅の姫 ベルガモット', types: ['プリンセス'], rarity: 'R'},
    {cid: 0x39, eid: H.EID_BASIC, cost: 6, link: undefined, name: '姫将軍 フラマリア', types: ['プリンセス'], rarity: 'R'},
    {cid: 0x35, eid: H.EID_BASIC, cost: 6, link: undefined, name: '第一皇女 ルルナサイカ', types: ['プリンセス'], rarity: 'R'},
    {cid: 0x36, eid: H.EID_BASIC, cost: 6, link: undefined, name: '第二皇女 ラオリリ', types: ['プリンセス'], rarity: 'R'},

    {cid: 0x31, eid: H.EID_BASIC, cost: 8, link: undefined, name: '公爵', types: ['継承権'], rarity: 'B'},

    {cid: 0x32, eid: H.EID_BASIC, cost: 11, link: 1, name: '帝都カリクマ', types: ['継承権', '領地'], rarity: 'R'},

    {cid: 0x33, eid: H.EID_BASIC, cost: 13, link: undefined, name: '皇帝の冠', types: ['継承権'], rarity: 'R'},

    // 極東辺境領  //{{{3

    {cid: 0x1f, eid: H.EID_FAREAST, cost: 2, link: 0, name: 'お金好きの妖精', types: ['行動'], subtype: '魔法', rarity: 'C'},

    {cid: 0x20, eid: H.EID_FAREAST, cost: 3, link: 0, name: '課税', types: ['行動'], rarity: 'C'},
    {cid: 0x21, eid: H.EID_FAREAST, cost: 3, link: 0, name: '貿易商人', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x22, eid: H.EID_FAREAST, cost: 3, link: 1, name: '伝書鳩', types: ['行動'], subtype: '計略', rarity: 'C'},
    {cid: 0x23, eid: H.EID_FAREAST, cost: 3, link: 1, name: '弓兵隊', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},

    {cid: 0x24, eid: H.EID_FAREAST, cost: 4, link: 0, name: 'サムライ', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},
    {cid: 0x25, eid: H.EID_FAREAST, cost: 4, link: 1, name: 'クノイチ', types: ['行動', '防衛'], subtype: '計略', rarity: 'C'},
    {cid: 0x26, eid: H.EID_FAREAST, cost: 4, link: 1, name: '見習い魔女', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C'},
    {cid: 0x27, eid: H.EID_FAREAST, cost: 4, link: 1, name: '鉱山都市', types: ['領地'], rarity: 'C'},
    {cid: 0x28, eid: H.EID_FAREAST, cost: 4, link: 2, name: '港町', types: ['領地'], rarity: 'C'},

    {cid: 0x29, eid: H.EID_FAREAST, cost: 5, link: 0, name: '割り符', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x2a, eid: H.EID_FAREAST, cost: 5, link: 2, name: '結盟', types: ['行動'], rarity: 'C'},

    {cid: 0x3b, eid: H.EID_FAREAST, cost: 6, link: undefined, name: '極東の算法姫 オウカ', types: ['プリンセス'], rarity: 'R'},

    // 北限の魔女  //{{{3

    {cid: 0x3f, eid: H.EID_NORTHERN, cost: 2, link: 1, name: 'ケットシー', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x40, eid: H.EID_NORTHERN, cost: 2, link: 1, name: '幸運の銀貨', types: ['行動'], rarity: 'C'},

    {cid: 0x41, eid: H.EID_NORTHERN, cost: 3, link: 1, name: '洗礼', types: ['行動'], rarity: 'C'},
    {cid: 0x43, eid: H.EID_NORTHERN, cost: 3, link: 2, name: '名馬', types: ['行動'], rarity: 'C'},
    {cid: 0x42, eid: H.EID_NORTHERN, cost: 3, link: undefined, name: '呪いの人形', types: ['災い'], rarity: 'C'},

    {cid: 0x45, eid: H.EID_NORTHERN, cost: 4, link: 0, name: 'ドワーフの宝石職人', types: ['行動'], rarity: 'C'},
    {cid: 0x44, eid: H.EID_NORTHERN, cost: 4, link: 0, name: '宮廷闘争', types: ['行動', '攻撃'], subtype: '計略', rarity: 'C'},
    {cid: 0x3e, eid: H.EID_NORTHERN, cost: 4, link: 2, name: 'エルフの狙撃手', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},

    {cid: 0x47, eid: H.EID_NORTHERN, cost: 5, link: 0, name: '地方役人', types: ['行動'], rarity: 'C'},
    {cid: 0x3d, eid: H.EID_NORTHERN, cost: 5, link: 0, name: '豪商', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x46, eid: H.EID_NORTHERN, cost: 5, link: undefined, name: '貴族の一人娘', types: ['継承権'], rarity: 'C'},

    {cid: 0x48, eid: H.EID_NORTHERN, cost: 6, link: 0, name: '独占', types: ['行動'], rarity: 'C'},
    {cid: 0x49, eid: H.EID_NORTHERN, cost: 6, link: 1, name: '工業都市', types: ['領地'], rarity: 'C'},
    {cid: 0x3c, eid: H.EID_NORTHERN, cost: 6, link: undefined, name: '北限の魔女姫 アナスタシア', types: ['プリンセス'], rarity: 'R'},

    // フェアリーガーデン  //{{{3

    {cid: 0x4f, eid: H.EID_FAIRY, cost: 2, link: 1, name: '家守の精霊', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x51, eid: H.EID_FAIRY, cost: 2, link: 1, name: '春風の妖精', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x50, eid: H.EID_FAIRY, cost: 2, link: 2, name: '伝令', types: ['行動'], rarity: 'C'},
    {cid: 0x4d, eid: H.EID_FAIRY, cost: 2, link: 2, name: '密偵', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},
    {cid: 0x4e, eid: H.EID_FAIRY, cost: 2, link: 2, name: '巡礼', types: ['行動'], rarity: 'C'},

    {cid: 0x55, eid: H.EID_FAIRY, cost: 3, link: 1, name: 'リーフフェアリー', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x52, eid: H.EID_FAIRY, cost: 3, link: 1, name: '司書', types: ['行動'], rarity: 'C'},
    {cid: 0x56, eid: H.EID_FAIRY, cost: 3, link: 1, name: '旅芸人', types: ['行動'], rarity: 'C'},
    {cid: 0x53, eid: H.EID_FAIRY, cost: 3, link: 1, name: '祝福', types: ['行動'], rarity: 'C'},
    {cid: 0x57, eid: H.EID_FAIRY, cost: 3, link: 2, name: 'ギルドマスター', types: ['行動'], rarity: 'C'},
    {cid: 0x54, eid: H.EID_FAIRY, cost: 3, link: 2, name: '星巫女の託宣', types: ['行動'], subtype: '魔法', rarity: 'C'},

    {cid: 0x5e, eid: H.EID_FAIRY, cost: 4, link: 0, name: 'ブラウニー', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x4c, eid: H.EID_FAIRY, cost: 4, link: 0, name: '氷雪の精霊', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C'},
    {cid: 0x5b, eid: H.EID_FAIRY, cost: 4, link: 0, name: '石弓隊', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},
    {cid: 0x5d, eid: H.EID_FAIRY, cost: 4, link: 0, name: '行商人', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x59, eid: H.EID_FAIRY, cost: 4, link: 0, name: '辻占い師', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x58, eid: H.EID_FAIRY, cost: 4, link: 1, name: 'ニンフ', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C'},
    {cid: 0x4a, eid: H.EID_FAIRY, cost: 4, link: 1, name: '大農園', types: ['領地'], rarity: 'C'},
    {cid: 0x5a, eid: H.EID_FAIRY, cost: 4, link: 1, name: '御料地', types: ['領地'], rarity: 'C'},
    {cid: 0x5f, eid: H.EID_FAIRY, cost: 4, link: 1, name: '検地役人', types: ['行動', '攻撃'], rarity: 'C'},

    {cid: 0x5c, eid: H.EID_FAIRY, cost: 5, link: 0, name: '商船団', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x64, eid: H.EID_FAIRY, cost: 5, link: 0, name: '執事', types: ['行動'], rarity: 'C'},
    {cid: 0x65, eid: H.EID_FAIRY, cost: 5, link: 0, name: '徴税人', types: ['行動', '攻撃'], rarity: 'C'},
    {cid: 0x60, eid: H.EID_FAIRY, cost: 5, link: 0, name: '聖堂騎士', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},
    {cid: 0x62, eid: H.EID_FAIRY, cost: 5, link: 0, name: '鬼族の戦士', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},
    {cid: 0x61, eid: H.EID_FAIRY, cost: 5, link: 1, name: '交易都市', types: ['領地'], rarity: 'C'},
    {cid: 0x4b, eid: H.EID_FAIRY, cost: 5, link: 1, name: '収穫祭', types: ['行動'], rarity: 'C'},
    {cid: 0x66, eid: H.EID_FAIRY, cost: 5, link: 1, name: '合併', types: ['行動'], rarity: 'C'},
    {cid: 0x63, eid: H.EID_FAIRY, cost: 5, link: undefined, name: 'メイド長', types: ['継承権'], subtype: '侍女', rarity: 'C'},

    {cid: 0x67, eid: H.EID_FAIRY, cost: 6, link: undefined, name: '裁判官', types: ['継承権'], rarity: 'C'},

    {cid: 0x68, eid: H.EID_FAIRY, cost: 11, link: undefined, name: '妖精女王エルルーン', types: ['継承権'], rarity: 'R'},

    // 六都市同盟  //{{{3

    {cid: 0x69, eid: H.EID_SIX, cost: 6, link: undefined, name: 'オアシスの美姫 エムシエレ', types: ['プリンセス'], rarity: 'R'},
    {cid: 0x6a, eid: H.EID_SIX, cost: 9, link: 1, name: 'オアシス都市ネフェルティリ', types: ['領地'], rarity: 'R'},

    {cid: 0x6b, eid: H.EID_SIX, cost: '+2', link: undefined, name: 'メイド長クロナ', types: ['サポート'], rarity: 'R'},
    {cid: 0x6c, eid: H.EID_SIX, cost: '+2', link: undefined, name: '帝国議事堂', types: ['サポート'], rarity: 'R'},
    {cid: 0x6d, eid: H.EID_SIX, cost: '+2', link: undefined, name: '軍師シャオリン', types: ['サポート'], rarity: 'R'},
    {cid: 0x6e, eid: H.EID_SIX, cost: '+2', link: undefined, name: '豪農ニコル', types: ['サポート'], rarity: 'R'},
    {cid: 0x6f, eid: H.EID_SIX, cost: '+2', link: undefined, name: '政商ウィリアム', types: ['サポート'], rarity: 'R'},
    {cid: 0x70, eid: H.EID_SIX, cost: '+2', link: undefined, name: '聖ルモイ大聖堂', types: ['サポート'], rarity: 'R'},
    {cid: 0x71, eid: H.EID_SIX, cost: '+2', link: undefined, name: '先帝ヘラルドの王錫', types: ['サポート'], rarity: 'R'},
    {cid: 0x72, eid: H.EID_SIX, cost: '+2', link: undefined, name: '大魔女アウローラ', types: ['サポート'], rarity: 'R'},

    {cid: 0x73, eid: H.EID_SIX, cost: 3, link: 0, name: 'いたずら妖精', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C'},
    {cid: 0x74, eid: H.EID_SIX, cost: 5, link: 2, name: 'ニンジャマスター', types: ['行動'], rarity: 'C'},
    {cid: 0x75, eid: H.EID_SIX, cost: 3, link: 0, name: 'へそくり', types: ['行動'], rarity: 'C'},
    {cid: 0x76, eid: H.EID_SIX, cost: 4, link: 0, name: 'まじない師', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C'},
    {cid: 0x77, eid: H.EID_SIX, cost: 4, link: 0, name: '開発命令', types: ['行動', '攻撃'], rarity: 'C'},
    {cid: 0x78, eid: H.EID_SIX, cost: 5, link: 1, name: '学術都市', types: ['領地'], rarity: 'C'},
    {cid: 0x79, eid: H.EID_SIX, cost: 2, link: 2, name: '漁村', types: ['領地'], rarity: 'C'},
    {cid: 0x7a, eid: H.EID_SIX, cost: 5, link: 0, name: '十字軍', types: ['行動'], subtype: '兵力', rarity: 'C'},
    {cid: 0x7b, eid: H.EID_SIX, cost: 3, link: 2, name: '女学院', types: ['行動'], rarity: 'C'},
    {cid: 0x7c, eid: H.EID_SIX, cost: 12, link: undefined, name: '大公爵', types: ['継承権'], rarity: 'C'},
    {cid: 0x7d, eid: H.EID_SIX, cost: 5, link: 1, name: '転売屋', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x7e, eid: H.EID_SIX, cost: 5, link: 1, name: '独立都市', types: ['領地'], rarity: 'C'},
    {cid: 0x7f, eid: H.EID_SIX, cost: 5, link: 0, name: '砲兵部隊', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},
    {cid: 0x80, eid: H.EID_SIX, cost: 4, link: 1, name: '魔法のランプ', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x81, eid: H.EID_SIX, cost: 5, link: 0, name: '免罪符', types: ['行動'], rarity: 'C'},
    {cid: 0x82, eid: H.EID_SIX, cost: 5, link: 0, name: '傭兵団', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},

    {cid: 0x83, eid: H.EID_SIX, cost: 0, link: undefined, name: '不運', types: ['災い'], rarity: undefined}

    //{{{3
  ];

  H.COMMON_CARDS =  //{{{2
    (function () {
      return $.grep(H.ALL_CARDS, function (card) {
        return card.rarity == 'C' && card.cost !== undefined;
      });
    })();

  H.CID_TO_CARD_TABLE =  //{{{2
    (function () {
      var t = {};
      $.each(H.ALL_CARDS, function (_, c) {
        t[c.cid] = c;
      });

      var n = 0;
      for (var _ in t)
        n++;
      if (H.ALL_CARDS.length != n)
        throw new Error('Internal error: Duplicated CIDs.');

      return t;
    })();

  H.CARD_NAME_TO_CARD_TABLE =  //{{{2
    (function () {
      var t = {};
      $.each(H.ALL_CARDS, function (_, c) {
        t[c.name] = c;
      });
      return t;
    })();

  H.DEFAULT_OPTIONS = {  //{{{2
    exclude_banned_cards: true,
    exclude_banned_cards_for_fairy_garden: true,
    include_all_costs: false,
    include_basic: 'may',
    include_fairy: 'may',
    include_fareast: 'may',
    include_link_2: false,
    include_northern: 'may',
    include_six: 'may',
    sharing_tool: 'web_intent',
    sort_key: 'eid',
    statistical: false,
    try_count: 100
  };

  H.EID_TO_EXPANSION_TABLE =  //{{{2
    (function () {
      var t = {};
      $.each(H.EXPANSIONS, function (_, e) {
        t[e.eid] = e;
      });
      return t;
    })();

  H.PSID_TO_DELAYED_CIDS_TABLE = (function () {  //{{{2
    function by_names(names) {
      return delay(function () {
        return $.map(
          names,
          function (name) {
            return H.card_from_card_name(name).cid;
          }
        );
      });
    }
    function list(predicate) {
      return delay(function () {
        return $.map(
          $.grep(H.ALL_CARDS, predicate),
          function (c) {return c.cid;}
        );
      });
    }
    function by_type(type) {
      return list(function (card) {return has_type(card, type);});
    }
    function has_type(card, type) {
      return 0 <= card.types.indexOf(type);
    }
    function by_subtype(subtype) {
      return list(function (card) {return card.subtype == subtype;});
    }
    function by_cost(cost) {
      return list(function (card) {return card.cost == cost;});
    }
    function by_link(count) {
      return list(function (card) {return card.link === count;});
    }
    function by_expansion(eid) {
      return list(function (card) {return card.eid == eid;});
    }
    function by_rarity(rarity) {
      return list(function (card) {return card.rarity == rarity;});
    }
    return {
      'basic-firstplay': by_names([  //{{{
        '斥候',
        '願いの泉',
        '早馬',
        '交易船',
        '御用商人',
        '補給部隊',
        '図書館',
        '都市開発',
        '冒険者',
        '錬金術師'
      ]),  //}}}
      'basic-guide': by_names([  //{{{
        '斥候',
        '早馬',
        '願いの泉',
        '城壁',
        '破城槌',
        '交易船',
        '都市開発',
        '歩兵大隊',
        '御用商人',
        '錬金術師'
      ]),  //}}}
      'basic-guide2': by_names([  //{{{
        '寄付',
        '斥候',
        '願いの泉',
        '城壁',
        '破城槌',
        '焼き畑農業',
        '都市開発',
        '近衛騎士団',
        '冒険者',
        '錬金術師'
      ]),  //}}}
      'basic-intermediate': by_names([  //{{{
        '斥候',
        '寄付',
        '魔法の護符',
        '補給部隊',
        '図書館',
        '星詠みの魔女',
        '追い立てられた魔獣',
        '御用商人',
        '皇室領',
        '呪詛の魔女'
      ]),  //}}}
      'basic-intermediate2': by_names([  //{{{
        '早馬',
        '願いの泉',
        '買収工作',
        '召集令状',
        '交易船',
        '隠れ家',
        'シノビ',
        '金貸し',
        '歩兵大隊',
        '噂好きの公爵夫人'
      ]),  //}}}
      'basic-bigbusiness': by_names([  //{{{
        '願いの泉',
        '斥候',
        '買収工作',
        '補給部隊',
        '交易船',
        '図書館',
        '都市開発',
        '銀行',
        '金貸し',
        '錬金術師'
      ]),  //}}}
      'basic-greatwar': by_names([  //{{{
        '斥候',
        '早馬',
        '城壁',
        '破城槌',
        '交易船',
        '補給部隊',
        '歩兵大隊',
        'シノビ',
        '隠れ家',
        '近衛騎士団'
      ]),  //}}}
      'basic-adventure': by_names([  //{{{
        '寄付',
        '願いの泉',
        '埋もれた財宝',
        '補給部隊',
        '追い立てられた魔獣',
        '星詠みの魔女',
        '図書館',
        '錬金術師',
        '冒険者',
        '皇室領'
      ]),  //}}}
      'basic-witchcraft': by_names([  //{{{
        '寄付',
        '斥候',
        '願いの泉',
        '魔法の護符',
        '魅了術の魔女',
        '図書館',
        '星詠みの魔女',
        '追い立てられた魔獣',
        '隠れ家',
        '呪詛の魔女'
      ]),  //}}}
      'basic-courtpolitics': by_names([  //{{{
        '願いの泉',
        '買収工作',
        '召集令状',
        '魔法の護符',
        '魅了術の魔女',
        '星詠みの魔女',
        '近衛騎士団',
        '錬金術師',
        '皇室領',
        '噂好きの公爵夫人'
      ]),  //}}}
      'fareast-firstplay': by_names([  //{{{
        '港町',
        '斥候',
        '願いの泉',
        '早馬',
        '交易船',
        '図書館',
        '御用商人',
        '都市開発',
        '冒険者',
        '錬金術師'
      ]),  //}}}
      'fareast-porttown': by_names([  //{{{
        'お金好きの妖精',
        '弓兵隊',
        '港町',
        'クノイチ',
        '早馬',
        '隠れ家',
        '交易船',
        '追い立てられた魔獣',
        '錬金術師',
        '近衛騎士団'
      ]),  //}}}
      'fareast-prosperity': by_names([  //{{{
        '伝書鳩',
        '貿易商人',
        '課税',
        '鉱山都市',
        'サムライ',
        '港町',
        'クノイチ',
        '割り符',
        '早馬',
        '交易船'
      ]),  //}}}
      'fareast-mine': by_names([  //{{{
        'お金好きの妖精',
        '弓兵隊',
        '鉱山都市',
        '寄付',
        '城壁',
        '早馬',
        '破城槌',
        '図書館',
        '歩兵大隊',
        '錬金術師'
      ]),  //}}}
      'fareast-citystrife': by_names([  //{{{
        '伝書鳩',
        '弓兵隊',
        '港町',
        '鉱山都市',
        'サムライ',
        '割り符',
        '願いの泉',
        '早馬',
        '歩兵大隊',
        '錬金術師'
      ]),  //}}}
      'fareast-scandal': by_names([  //{{{
        'お金好きの妖精',
        '鉱山都市',
        '割り符',
        '願いの泉',
        '早馬',
        '都市開発',
        '皇室領',
        '錬金術師',
        '銀行',
        '噂好きの公爵夫人'
      ]),  //}}}
      'fareast-battlefield': by_names([  //{{{
        '伝書鳩',
        '弓兵隊',
        '結盟',
        '斥候',
        '城壁',
        '破城槌',
        '買収工作',
        '歩兵大隊',
        '補給部隊',
        '近衛騎士団'
      ]),  //}}}
      'fareast-guildstrife': by_names([  //{{{
        'お金好きの妖精',
        '伝書鳩',
        '貿易商人',
        '交易船',
        '弓兵隊',
        '見習い魔女',
        '鉱山都市',
        'サムライ',
        '結盟',
        '星詠みの魔女'
      ]),  //}}}
      'fareast-kunoichi': by_names([  //{{{
        '伝書鳩',
        '弓兵隊',
        '貿易商人',
        '港町',
        'クノイチ',
        '結盟',
        '早馬',
        '寄付',
        '交易船',
        '歩兵大隊'
      ]),  //}}}
      'fareast-moneymoneymoney': by_names([  //{{{
        'お金好きの妖精',
        '弓兵隊',
        '課税',
        'サムライ',
        '願いの泉',
        '寄付',
        '金貸し',
        'シノビ',
        '呪詛の魔女',
        '錬金術師'
      ]),  //}}}
      'northern-territory': by_names([  //{{{
        'ケットシー',
        '幸運の銀貨',
        'エルフの狙撃手',
        'ドワーフの宝石職人',
        '豪商',
        '工業都市',
        '願いの泉',
        '破城槌',
        '図書館',
        '冒険者'
      ]),  //}}}
      'northern-parliament': by_names([  //{{{
        '名馬',
        '洗礼',
        'エルフの狙撃手',
        '豪商',
        '地方役人',
        '工業都市',
        '早馬',
        '交易船',
        '図書館',
        '呪詛の魔女'
      ]),  //}}}
      'northern-witchandchurch': by_names([  //{{{
        'ケットシー',
        '幸運の銀貨',
        '洗礼',
        '宮廷闘争',
        'ドワーフの宝石職人',
        '貴族の一人娘',
        '斥候',
        '早馬',
        '都市開発',
        '呪詛の魔女'
      ]),  //}}}
      'northern-society': by_names([  //{{{
        'ケットシー',
        '洗礼',
        '呪いの人形',
        '宮廷闘争',
        '貴族の一人娘',
        '豪商',
        '早馬',
        '図書館',
        '銀行',
        '噂好きの公爵夫人'
      ]),  //}}}
      'northern-guiltycrown': by_names([  //{{{
        '名馬',
        'ドワーフの宝石職人',
        '宮廷闘争',
        '地方役人',
        '工業都市',
        '願いの泉',
        '城壁',
        '破城槌',
        '歩兵大隊',
        '補給部隊'
      ]),  //}}}
      'northern-darkness': by_names([  //{{{
        'ケットシー',
        '呪いの人形',
        '名馬',
        'エルフの狙撃手',
        '宮廷闘争',
        '豪商',
        '独占',
        '早馬',
        '城壁',
        '錬金術師'
      ]),  //}}}
      'northern-scandal': by_names([  //{{{
        '名馬',
        'ドワーフの宝石職人',
        '地方役人',
        '豪商',
        '鉱山都市',
        '割り符',
        '願いの泉',
        '錬金術師',
        '銀行',
        '噂好きの公爵夫人'
      ]),  //}}}
      'northern-teaparty': by_names([  //{{{
        '幸運の銀貨',
        '名馬',
        '呪いの人形',
        'ドワーフの宝石職人',
        '地方役人',
        'お金好きの妖精',
        '伝書鳩',
        '見習い魔女',
        '結盟',
        '願いの泉'
      ]),  //}}}
      'northern-swordsman': by_names([  //{{{
        '洗礼',
        '名馬',
        '独占',
        '工業都市',
        '伝書鳩',
        'サムライ',
        '鉱山都市',
        '結盟',
        '早馬',
        '交易船'
      ]),  //}}}
      'fairy-primer': by_names([  //{{{
        '家守の精霊',
        '伝令',
        '春風の妖精',
        'リーフフェアリー',
        '旅芸人',
        '大農園',
        '石弓隊',
        '商船団',
        '収穫祭',
        '合併'
      ]),  //}}}
      'fairy-butlerandmaid': by_names([  //{{{
        '伝令',
        '春風の妖精',
        '星巫女の託宣',
        '旅芸人',
        '石弓隊',
        '商船団',
        '行商人',
        '検地役人',
        'メイド長',
        '執事'
      ]),  //}}}
      'fairy-winter': by_names([  //{{{
        '密偵',
        '伝令',
        '春風の妖精',
        '司書',
        '大農園',
        '氷雪の精霊',
        '石弓隊',
        '行商人',
        'ブラウニー',
        '執事'
      ]),  //}}}
      'fairy-folklore': by_names([  //{{{
        '密偵',
        '巡礼',
        '家守の精霊',
        'ニンフ',
        '辻占い師',
        '御料地',
        '行商人',
        'ブラウニー',
        '聖堂騎士',
        'メイド長'
      ]),  //}}}
      'fairy-frontier': by_names([  //{{{
        '密偵',
        '巡礼',
        '家守の精霊',
        '星巫女の託宣',
        '旅芸人',
        '商船団',
        '交易都市',
        '鬼族の戦士',
        '徴税人',
        '合併'
      ]),  //}}}
      'fairy-carnival': by_names([  //{{{
        '密偵',
        '春風の妖精',
        '祝福',
        '星巫女の託宣',
        'ギルドマスター',
        '大農園',
        '石弓隊',
        '聖堂騎士',
        'メイド長',
        '収穫祭'
      ]),  //}}}
      'fairy-holyornot': by_names([  //{{{
        '密偵',
        '巡礼',
        '家守の精霊',
        'リーフフェアリー',
        'ギルドマスター',
        '氷雪の精霊',
        '御料地',
        '交易都市',
        '収穫祭',
        '裁判官'
      ]),  //}}}
      'fairy-fairyandknight': by_names([  //{{{
        '家守の精霊',
        '春風の妖精',
        '祝福',
        'リーフフェアリー',
        '旅芸人',
        'ギルドマスター',
        'ニンフ',
        '大農園',
        '聖堂騎士',
        '合併'
      ]),  //}}}
      'six-journey': by_names([  //{{{
        '漁村',
        '開発命令',
        '学術都市',
        '独立都市',
        '転売屋',
        '春風の妖精',
        '巡礼',
        '旅芸人',
        '行商人',
        '商船団'
      ]),  //}}}
      'six-alliance': by_names([  //{{{
        '漁村',
        '魔法のランプ',
        '開発命令',
        '独立都市',
        '転売屋',
        '砲兵部隊',
        '春風の妖精',
        '巡礼',
        '旅芸人',
        '行商人'
      ]),  //}}}
      'six-trade': by_names([  //{{{
        '漁村',
        '女学院',
        '魔法のランプ',
        '転売屋',
        '傭兵団',
        '密偵',
        '旅芸人',
        '石弓隊',
        '行商人',
        '収穫祭'
      ]),  //}}}
      'six-churchesandwars': by_names([  //{{{
        '学術都市',
        '十字軍',
        '傭兵団',
        '独立都市',
        '砲兵部隊',
        '密偵',
        '伝令',
        '司書',
        'ギルドマスター',
        '商船団'
      ]),  //}}}
      'six-inquisition': by_names([  //{{{
        'いたずら妖精',
        'まじない師',
        '魔法のランプ',
        '十字軍',
        '免罪符',
        'ニンジャマスター',
        '家守の精霊',
        'リーフフェアリー',
        'ギルドマスター',
        '祝福'
      ]),  //}}}
      'six-water': by_names([  //{{{
        '漁村',
        '女学院',
        'へそくり',
        '開発命令',
        '免罪符',
        'ニンジャマスター',
        '巡礼',
        'ニンフ',
        '商船団',
        '執事'
      ]),  //}}}
      'six-rottenauthority': by_names([  //{{{
        'へそくり',
        'まじない師',
        '開発命令',
        '独立都市',
        '転売屋',
        '免罪符',
        '大公爵',
        '巡礼',
        '伝令',
        '収穫祭'
      ]),  //}}}
      'championship1-prelims1': by_names([  //{{{
        '城壁',
        '願いの泉',
        '破城槌',
        '弓兵隊',
        '歩兵大隊',
        '都市開発',
        '補給部隊',
        '港町',
        '銀行',
        '錬金術師'
      ]),  //}}}
      'championship1-prelims2': by_names([  //{{{
        '早馬',
        '斥候',
        '願いの泉',
        '焼き畑農業',
        '伝書鳩',
        '貿易商人',
        '図書館',
        '見習い魔女',
        '冒険者',
        '割り符'
      ]),  //}}}
      'championship1-prelims3': by_names([  //{{{
        '早馬',
        '斥候',
        '城壁',
        '交易船',
        '伝書鳩',
        '貿易商人',
        '図書館',
        'シノビ',
        '錬金術師',
        '近衛騎士団'
      ]),  //}}}
      'championship1-semifinals': by_names([  //{{{
        '願いの泉',
        '斥候',
        '隠れ家',
        '召集令状',
        'シノビ',
        '追い立てられた魔獣',
        '鉱山都市',
        '錬金術師',
        '冒険者',
        '呪詛の魔女'
      ]),  //}}}
      'championship1-finals': by_names([  //{{{
        '早馬',
        '願いの泉',
        '斥候',
        '交易船',
        '御用商人',
        '課税',
        '呪詛の魔女',
        '割り符',
        '結盟',
        '噂好きの公爵夫人'
      ]),  //}}}
      'reference-all-actions': by_type('行動'),
      'reference-plain-actions': list(function (c) {  //{{{
        return has_type(c, '行動') &&
          !has_type(c, '攻撃') &&
          !has_type(c, '防衛');
      }),  //}}}
      'reference-attacks': by_type('攻撃'),
      'reference-defenses': by_type('防衛'),
      'reference-territories': by_type('領地'),
      'reference-authorities': by_type('継承権'),
      'reference-curses': by_type('災い'),
      'reference-princesses': by_type('プリンセス'),
      'reference-support': by_type('サポート'),
      'reference-subtype-army': by_subtype('兵力'),
      'reference-subtype-trick': by_subtype('計略'),
      'reference-subtype-magic': by_subtype('魔法'),
      'reference-subtype-merchant': by_subtype('商人'),
      'reference-subtype-maid': by_subtype('侍女'),
      'reference-cost1orless': list(function (c) {return c.cost <= 1;}),
      'reference-cost2': by_cost(2),
      'reference-cost3': by_cost(3),
      'reference-cost4': by_cost(4),
      'reference-cost5': by_cost(5),
      'reference-cost6': by_cost(6),
      'reference-cost7ormore': list(function (c) {return 7 <= c.cost;}),
      'reference-costspecial': list(function (c) {  //{{{
        return typeof c.cost !== 'number';
      }),  //}}}
      'reference-link0': by_link(0),
      'reference-link1': by_link(1),
      'reference-link2': by_link(2),
      'reference-unplayable': by_link(undefined),
      'reference-basic': by_expansion(H.EID_BASIC),
      'reference-fareast': by_expansion(H.EID_FAREAST),
      'reference-northern': by_expansion(H.EID_NORTHERN),
      'reference-fairy': by_expansion(H.EID_FAIRY),
      'reference-six': by_expansion(H.EID_SIX),
      'reference-rarity-special': by_rarity(undefined),
      'reference-rarity-basic': by_rarity('B'),
      'reference-rarity-common': by_rarity('C'),
      'reference-rarity-rare': by_rarity('R'),
      '': []  // Dummy entry to make folds simple.
    };
  })();

  H.PID_REPLACEMENT_TABLE_VERSION_1 = {  //{{{2
    '_about': 'about',
    '_basic': 'supplies:basic',
    '_basic-adventure': 'supply:basic-adventure',
    '_basic-bigbusiness': 'supply:basic-bigbusiness',
    '_basic-courtpolitics': 'supply:basic-courtpolitics',
    '_basic-firstplay': 'supply:basic-firstplay',
    '_basic-greatwar': 'supply:basic-greatwar',
    '_basic-guide': 'supply:basic-guide',
    '_basic-guide2': 'supply:basic-guide2',
    '_basic-intermediate': 'supply:basic-intermediate',
    '_basic-intermediate2': 'supply:basic-intermediate2',
    '_basic-witchcraft': 'supply:basic-witchcraft',
    '_championship': 'supplies:championship',
    '_championship-finals': 'supply:championship-finals',
    '_championship-prelims1': 'supply:championship-prelims1',
    '_championship-prelims2': 'supply:championship-prelims2',
    '_championship-prelims3': 'supply:championship-prelims3',
    '_championship-semifinals': 'supply:championship-semifinals',
    '_fareast': 'supplies:fareast',
    '_fareast-battlefield': 'supply:fareast-battlefield',
    '_fareast-citystrife': 'supply:fareast-citystrife',
    '_fareast-firstplay': 'supply:fareast-firstplay',
    '_fareast-guildstrife': 'supply:fareast-guildstrife',
    '_fareast-kunoichi': 'supply:fareast-kunoichi',
    '_fareast-mine': 'supply:fareast-mine',
    '_fareast-moneymoneymoney': 'supply:fareast-moneymoneymoney',
    '_fareast-porttown': 'supply:fareast-porttown',
    '_fareast-prosperity': 'supply:fareast-prosperity',
    '_fareast-scandal': 'supply:fareast-scandal',
    '_home': 'home',
    '_random': 'supplies:random',
    '_random-10': 'supply:random10',
    '_random-12': 'supply:random12',
    '_random-13': 'supply:random13',
    '_random-14': 'supply:random14'
  };

  H.PID_TO_CHILD_PIDS_TABLE = {  //{{{2
    'home': [  //{{{
      'supplies:random',
      'supplies:basic',
      'supplies:fareast',
      'supplies:championship1',
      'supply:editor',
      'card-references',
      'about'
    ],  //}}}
    'about': [  //{{{
      'credits'
    ],  //}}}
    'supplies:random': [  //{{{
      'supply:random10',
      'supply:random12',
      'supply:random13',
      'supply:random14'
    ],  //}}}
    'supplies:basic': [  //{{{
      'supply:basic-firstplay',
      'supply:basic-guide',
      'supply:basic-guide2',
      'supply:basic-intermediate',
      'supply:basic-intermediate2',
      'supply:basic-bigbusiness',
      'supply:basic-greatwar',
      'supply:basic-adventure',
      'supply:basic-witchcraft',
      'supply:basic-courtpolitics'
    ],  //}}}
    'supplies:fareast': [  //{{{
      'supply:fareast-firstplay',
      'supply:fareast-porttown',
      'supply:fareast-prosperity',
      'supply:fareast-mine',
      'supply:fareast-citystrife',
      'supply:fareast-scandal',
      'supply:fareast-battlefield',
      'supply:fareast-guildstrife',
      'supply:fareast-kunoichi',
      'supply:fareast-moneymoneymoney'
    ],  //}}}
    'supplies:northern': [  //{{{
      'supply:northern-territory',
      'supply:northern-parliament',
      'supply:northern-witchandchurch',
      'supply:northern-society',
      'supply:northern-guiltycrown',
      'supply:northern-darkness',
      'supply:northern-scandal',
      'supply:northern-teaparty',
      'supply:northern-swordsman'
    ],  //}}}
    'supplies:fairy': [  //{{{
      'supply:fairy-primer',
      'supply:fairy-butlerandmaid',
      'supply:fairy-winter',
      'supply:fairy-folklore',
      'supply:fairy-frontier',
      'supply:fairy-carnival',
      'supply:fairy-holyornot',
      'supply:fairy-fairyandknight'
    ],  //}}}
    'supplies:six': [  //{{{
      'supply:six-journey',
      'supply:six-alliance',
      'supply:six-trade',
      'supply:six-churchesandwars',
      'supply:six-inquisition',
      'supply:six-water',
      'supply:six-rottenauthority'
    ],  //}}}
    'supplies:championship1': [  //{{{
      'supply:championship1-prelims1',
      'supply:championship1-prelims2',
      'supply:championship1-prelims3',
      'supply:championship1-semifinals',
      'supply:championship1-finals'
    ],  //}}}
    'card-references': [  //{{{
      'references:type',
      'references:subtype',
      'references:cost',
      'references:link',
      'references:expansion',
      'references:rarity'
    ],  //}}}
    'references:type': [  //{{{
      'reference:all-actions',
      'reference:plain-actions',
      'reference:attacks',
      'reference:defenses',
      'reference:territories',
      'reference:authorities',
      'reference:curses',
      'reference:princesses',
      'reference:support'
    ],  //}}}
    'references:subtype': [  //{{{
      'reference:subtype-army',
      'reference:subtype-trick',
      'reference:subtype-magic',
      'reference:subtype-merchant',
      'reference:subtype-maid'
    ],  //}}}
    'references:cost': [  //{{{
      'reference:cost1orless',
      'reference:cost2',
      'reference:cost3',
      'reference:cost4',
      'reference:cost5',
      'reference:cost6',
      'reference:cost7ormore',
      'reference:costspecial'
    ],  //}}}
    'references:link': [  //{{{
      'reference:link0',
      'reference:link1',
      'reference:link2',
      'reference:unplayable'
    ],  //}}}
    'references:expansion': [  //{{{
      'reference:basic',
      'reference:fareast',
      'reference:northern',
      'reference:fairy',
      'reference:six'
    ],  //}}}
    'references:rarity': [  //{{{
      'reference:rarity-special',
      'reference:rarity-basic',
      'reference:rarity-common',
      'reference:rarity-rare'
    ],  //}}}
    '': []  // Dummy entry to make folds simple.
  };

  H.PID_TO_META_TABLE =  {  //{{{2
    'home': {  //{{{
      title: 'ハトクランダム'
    },  //}}}
    'about': {  //{{{
      title: 'このアプリについて'
    },  //}}}
    'tips': {  //{{{
      title: 'Tips'
    },  //}}}
    'credits': {  //{{{
      title: 'バージョン情報'
    },  //}}}
    'configure': {  //{{{
      title: '設定'
    },  //}}}
    'supplies:random': {  //{{{
      title: 'ランダム選択'
    },  //}}}
    'supply:random10': {  //{{{
      title: 'ランダムに10枚選択'
    },  //}}}
    'supply:random12': {  //{{{
      title: 'ランダムに12枚選択'
    },  //}}}
    'supply:random13': {  //{{{
      title: 'ランダムに13枚選択'
    },  //}}}
    'supply:random14': {  //{{{
      title: 'ランダムに14枚選択'
    },  //}}}
    'supplies:basic': {  //{{{
      title: '推奨サプライ(基本セット)'
    },  //}}}
    'supply:basic-firstplay': {  //{{{
      title: 'ファーストプレイ'
    },  //}}}
    'supply:basic-guide': {  //{{{
      title: '入門用'
    },  //}}}
    'supply:basic-guide2': {  //{{{
      title: '入門用その2'
    },  //}}}
    'supply:basic-intermediate': {  //{{{
      title: '中級用'
    },  //}}}
    'supply:basic-intermediate2': {  //{{{
      title: '中級用その2'
    },  //}}}
    'supply:basic-bigbusiness': {  //{{{
      title: 'ビッグビジネス'
    },  //}}}
    'supply:basic-greatwar': {  //{{{
      title: '大戦争'
    },  //}}}
    'supply:basic-adventure': {  //{{{
      title: '冒険行'
    },  //}}}
    'supply:basic-witchcraft': {  //{{{
      title: 'ワルプルギスの夜'
    },  //}}}
    'supply:basic-courtpolitics': {  //{{{
      title: '宮廷政治'
    },  //}}}
    'supplies:fareast': {  //{{{
      title: '推奨サプライ(極東辺境領)'
    },  //}}}
    'supply:fareast-firstplay': {  //{{{
      title: '初めてのハトクラ'
    },  //}}}
    'supply:fareast-porttown': {  //{{{
      title: '港町の攻防'
    },  //}}}
    'supply:fareast-prosperity': {  //{{{
      title: '交易と繁栄'
    },  //}}}
    'supply:fareast-mine': {  //{{{
      title: '豊かな鉱脈'
    },  //}}}
    'supply:fareast-citystrife': {  //{{{
      title: '都市間抗争'
    },  //}}}
    'supply:fareast-scandal': {  //{{{
      title: '開発の醜聞'
    },  //}}}
    'supply:fareast-battlefield': {  //{{{
      title: '戦場の絆'
    },  //}}}
    'supply:fareast-guildstrife': {  //{{{
      title: 'ギルド間抗争'
    },  //}}}
    'supply:fareast-kunoichi': {  //{{{
      title: 'クノイチ忍法帖'
    },  //}}}
    'supply:fareast-moneymoneymoney': {  //{{{
      title: '金に色無し'
    },  //}}}
    'supplies:northern': {  //{{{
      title: '推奨サプライ(北限の魔女)'
    },  //}}}
    'supply:northern-territory': {  //{{{
      title: '北限領'
    },  //}}}
    'supply:northern-parliament': {  //{{{
      title: '議会を占拠せよ'
    },  //}}}
    'supply:northern-witchandchurch': {  //{{{
      title: '魔女と教会'
    },  //}}}
    'supply:northern-society': {  //{{{
      title: '社交界'
    },  //}}}
    'supply:northern-guiltycrown': {  //{{{
      title: '罪の王冠'
    },  //}}}
    'supply:northern-darkness': {  //{{{
      title: '暗闘'
    },  //}}}
    'supply:northern-scandal': {  //{{{
      title: '開拓の醜聞'
    },  //}}}
    'supply:northern-teaparty': {  //{{{
      title: '魔女のお茶会'
    },  //}}}
    'supply:northern-swordsman': {  //{{{
      title: '異国の剣士'
    },  //}}}
    'supplies:fairy': {  //{{{
      title: '推奨サプライ(フェアリーガーデン)'
    },  //}}}
    'supply:fairy-primer': {  //{{{
      title: 'フェアリーガーデン入門'
    },  //}}}
    'supply:fairy-butlerandmaid': {  //{{{
      title: '執事とメイド'
    },  //}}}
    'supply:fairy-winter': {  //{{{
      title: '冬来たりなば'
    },  //}}}
    'supply:fairy-folklore': {  //{{{
      title: 'フォークロア'
    },  //}}}
    'supply:fairy-frontier': {  //{{{
      title: '辺境部族'
    },  //}}}
    'supply:fairy-carnival': {  //{{{
      title: '謝肉祭'
    },  //}}}
    'supply:fairy-holyornot': {  //{{{
      title: '聖か俗か'
    },  //}}}
    'supply:fairy-fairyandknight': {  //{{{
      title: '妖精と騎士'
    },  //}}}
    'supplies:six': {  //{{{
      title: '推奨サプライ(六都市同盟)'
    },  //}}}
    'supply:six-journey': {  //{{{
      title: '旅の始めに'
    },  //}}}
    'supply:six-alliance': {  //{{{
      title: '六都市同盟'
    },  //}}}
    'supply:six-trade': {  //{{{
      title: '大陸間交易'
    },  //}}}
    'supply:six-churchesandwars': {  //{{{
      title: '教会と戦争'
    },  //}}}
    'supply:six-inquisition': {  //{{{
      title: '異端審問'
    },  //}}}
    'supply:six-water': {  //{{{
      title: '水は巡る'
    },  //}}}
    'supply:six-rottenauthority': {  //{{{
      title: '絶対の権力は徹底的に腐敗する'
    },  //}}}
    'supplies:championship1': {  //{{{
      title: '世界選手権'
    },  //}}}
    'supply:championship1-prelims1': {  //{{{
      title: '予選第1回戦'
    },  //}}}
    'supply:championship1-prelims2': {  //{{{
      title: '予選第2回戦'
    },  //}}}
    'supply:championship1-prelims3': {  //{{{
      title: '予選第3回戦'
    },  //}}}
    'supply:championship1-semifinals': {  //{{{
      title: '準決勝'
    },  //}}}
    'supply:championship1-finals': {  //{{{
      title: '決勝《王冠の行方》'
    },  //}}}
    'supply:editor': {  //{{{
      title: '手動作成'
    },  //}}}
    'card-references': {  //{{{
      title: '機能別カードリスト'
    },  //}}}
    'references:type': {  //{{{
      title: 'タイプ別カードリスト'
    },  //}}}
    'reference:all-actions': {  //{{{
      title: '行動カード一覧(全て)'
    },  //}}}
    'reference:plain-actions': {  //{{{
      title: '行動カード一覧(攻撃/防衛以外)'
    },  //}}}
    'reference:attacks': {  //{{{
      title: '攻撃カード一覧'
    },  //}}}
    'reference:defenses': {  //{{{
      title: '防衛カード一覧'
    },  //}}}
    'reference:territories': {  //{{{
      title: '領地カード一覧'
    },  //}}}
    'reference:authorities': {  //{{{
      title: '継承権カード一覧'
    },  //}}}
    'reference:curses': {  //{{{
      title: '災いカード一覧'
    },  //}}}
    'reference:princesses': {  //{{{
      title: 'プリンセスカード一覧'
    },  //}}}
    'reference:support': {  //{{{
      title: 'サポートカード一覧'
    },  //}}}
    'references:subtype': {  //{{{
      title: 'サブタイプ別カードリスト'
    },  //}}}
    'reference:subtype-army': {  //{{{
      title: '兵力カード一覧'
    },  //}}}
    'reference:subtype-trick': {  //{{{
      title: '計略カード一覧'
    },  //}}}
    'reference:subtype-magic': {  //{{{
      title: '魔法カード一覧'
    },  //}}}
    'reference:subtype-merchant': {  //{{{
      title: '商人カード一覧'
    },  //}}}
    'reference:subtype-maid': {  //{{{
      title: '侍女カード一覧'
    },  //}}}
    'references:cost': {  //{{{
      title: 'コスト別カードリスト'
    },  //}}}
    'reference:cost1orless': {  //{{{
      title: 'コスト1以下のカード一覧'
    },  //}}}
    'reference:cost2': {  //{{{
      title: 'コスト2のカード一覧'
    },  //}}}
    'reference:cost3': {  //{{{
      title: 'コスト3のカード一覧'
    },  //}}}
    'reference:cost4': {  //{{{
      title: 'コスト4のカード一覧'
    },  //}}}
    'reference:cost5': {  //{{{
      title: 'コスト5のカード一覧'
    },  //}}}
    'reference:cost6': {  //{{{
      title: 'コスト6のカード一覧'
    },  //}}}
    'reference:cost7ormore': {  //{{{
      title: 'コスト7以上のカード一覧'
    },  //}}}
    'reference:costspecial': {  //{{{
      title: '特殊なコストのカード一覧'
    },  //}}}
    'references:link': {  //{{{
      title: 'リンク別カードリスト'
    },  //}}}
    'reference:link0': {  //{{{
      title: 'リンク0のカード一覧'
    },  //}}}
    'reference:link1': {  //{{{
      title: 'リンク1のカード一覧'
    },  //}}}
    'reference:link2': {  //{{{
      title: 'リンク2のカード一覧'
    },  //}}}
    'reference:unplayable': {  //{{{
      title: 'プレイできないカード一覧'
    },  //}}}
    'references:expansion': {  //{{{
      title: '収録セット別カードリスト'
    },  //}}}
    'reference:basic': {  //{{{
      title: '基本セットのカード一覧'
    },  //}}}
    'reference:fareast': {  //{{{
      title: '極東辺境領のカード一覧'
    },  //}}}
    'reference:northern': {  //{{{
      title: '北限の魔女のカード一覧'
    },  //}}}
    'reference:fairy': {  //{{{
      title: 'フェアリーガーデンのカード一覧'
    },  //}}}
    'reference:six': {  //{{{
      title: '六都市同盟のカード一覧'
    },  //}}}
    'references:rarity': {  //{{{
      title: 'レアリティ別カードリスト'
    },  //}}}
    'reference:rarity-special': {  //{{{
      title: '特殊なレアリティのカード一覧'
    },  //}}}
    'reference:rarity-basic': {  //{{{
      title: 'ベーシックカード一覧'
    },  //}}}
    'reference:rarity-common': {  //{{{
      title: 'コモンカード一覧'
    },  //}}}
    'reference:rarity-rare': {  //{{{
      title: 'レアカード一覧'
    },  //}}}
    '': {}  // Dummy entry to make folds simple.
  };

  H.BASE64_ENCODING_TABLE = {  //{{{2
    0x00: 'A', 0x01: 'B', 0x02: 'C', 0x03: 'D',
    0x04: 'E', 0x05: 'F', 0x06: 'G', 0x07: 'H',
    0x08: 'I', 0x09: 'J', 0x0a: 'K', 0x0b: 'L',
    0x0c: 'M', 0x0d: 'N', 0x0e: 'O', 0x0f: 'P',
    0x10: 'Q', 0x11: 'R', 0x12: 'S', 0x13: 'T',
    0x14: 'U', 0x15: 'V', 0x16: 'W', 0x17: 'X',
    0x18: 'Y', 0x19: 'Z', 0x1a: 'a', 0x1b: 'b',
    0x1c: 'c', 0x1d: 'd', 0x1e: 'e', 0x1f: 'f',
    0x20: 'g', 0x21: 'h', 0x22: 'i', 0x23: 'j',
    0x24: 'k', 0x25: 'l', 0x26: 'm', 0x27: 'n',
    0x28: 'o', 0x29: 'p', 0x2a: 'q', 0x2b: 'r',
    0x2c: 's', 0x2d: 't', 0x2e: 'u', 0x2f: 'v',
    0x30: 'w', 0x31: 'x', 0x32: 'y', 0x33: 'z',
    0x34: '0', 0x35: '1', 0x36: '2', 0x37: '3',
    0x38: '4', 0x39: '5', 0x3a: '6', 0x3b: '7',
    0x3c: '8', 0x3d: '9', 0x3e: '_', 0x3f: '-'

    // [COOPERATION_WITH_TWITTER]
    //
    // When Twitter links URLs in tweets, it ignores trailing "."s in URLs.
    // So that "http://foo/index.html." will be converted into
    // "<a href='http://foo/index.html'>http://foo/index.html</a>."
    // (note that the last "." is not treated as a part of the URL).
    //
    // Old versions used "." to encode 0x3e,
    // and resulting RSIDs might be ended with ".".
    // So that shared supplies might not be linked properly on Twitter.
    //
    // To avoid the problem, 0x3e is now encoded to "_" instead of ".".
  };

  H.BASE64_DECODING_TABLE =  //{{{2
    (function () {
      var t = {};

      $.each(H.BASE64_ENCODING_TABLE, function (key, value) {
        t[value] = parseInt(key, 10);
      });

      // '.' must be decoded to the same value as '_'
      // for backward compatibility.
      // Becasue RSIDs generated by old versions
      // might not be decoded without this treatment.
      //
      // See also [COOPERATION_WITH_TWITTER].
      t['.'] = t['_'];

      return t;
    })();

  // Utilities  //{{{1
  $.fn.check = function (checked) {  //{{{2
    this.prop('checked', checked);
    return this;
  };

  $.fn.enable = function (enabled) {  //{{{2
    if (enabled)
      this.removeAttr('disabled');
    else
      this.attr('disabled', 'disabled');
    return this;
  };

  $.fn.isChecked = function () {  //{{{2
    return 0 < this.filter(':checked').length;
  };

  H.Error = function (message) {  //{{{2
    this.message = message;
  };
  H.Error.prototype = new Error();
  H.Error.prototype.constructor = H.Error;

  H.KeyError = function (key_name, key_value) {  //{{{2
    if (arguments.length == 2) {
      var key_name = arguments[0];
      var key_value = arguments[1];
      H.Error.call(
        this,
        key_name + ' ' + JSON.stringify(key_value) + ' is not valid.'
      );
    } else {
      H.Error.call(this, arguments[0]);
    }
  };
  H.KeyError.prototype = new H.Error();
  H.KeyError.prototype.constructor = H.KeyError;

  H.apid_from_pid = function (pid) {  //{{{2
    return pid.replace(/:.*/, '');
  };

  H.card_from_card_name = function (card_name) {  //{{{2
    var card = H.CARD_NAME_TO_CARD_TABLE[card_name];
    if (card === undefined)
      throw new H.KeyError('Card name', card_name);
    return card;
  };

  H.card_from_cid = function (cid) {  //{{{2
    var card = H.CID_TO_CARD_TABLE[cid];
    if (card === undefined) {
      throw new H.KeyError(
        [
          'カード(CID ', JSON.stringify(cid), ')は存在しません。\n',
          '\n',
          '最近になって新しい拡張がリリースされましたか?\n',
          '・その場合はアプリをリロードすれば大体直ります。\n',
          '・そうでなければURLに誤りがある可能性があります。'
        ].join('')
      );
    }
    return card;
  };

  H.child_pids_from_pid = function (pid) {  //{{{2
    var child_pids = H.PID_TO_CHILD_PIDS_TABLE[pid];
    if (child_pids === undefined)
      throw new H.KeyError('PID', pid);
    return child_pids;
  };

  H.choose_random_cards = function (available_cards, count, options) {  //{{{2
    var filter_by_eid = function (cards, use, eid) {
      if (!use)
        return $.grep(cards, function (card) {return card.eid != eid;});
      else
        return cards;
    };
    var any = function (cards, eid) {
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].eid == eid)
          return true;
      }
      return false;
    };
    var selected_cards;

    var ok_count = 0;
    var try_count = options.try_count || H.DEFAULT_OPTIONS;
    for (var t = 1; t <= try_count; t++) {
      var rest_cards = available_cards.slice(0);
      if (options.exclude_banned_cards)
        rest_cards = $.grep(rest_cards, H.not(H.is_banned_card));
      rest_cards = $.grep(rest_cards, function (c) {return !c.imperfect;});
      rest_cards = filter_by_eid(rest_cards, options.include_basic != 'must_not', H.EID_BASIC);
      rest_cards = filter_by_eid(rest_cards, options.include_fareast != 'must_not', H.EID_FAREAST);
      rest_cards = filter_by_eid(rest_cards, options.include_northern != 'must_not', H.EID_NORTHERN);
      rest_cards = filter_by_eid(rest_cards, options.include_fairy != 'must_not', H.EID_FAIRY);
      rest_cards = filter_by_eid(rest_cards, options.include_six != 'must_not', H.EID_SIX);

      selected_cards = [];
      for (var i = 1; i <= count && 1 <= rest_cards.length; i++) {
        var j = Math.floor(Math.random() * rest_cards.length);
        var c = rest_cards[j];
        rest_cards.splice(j, 1);
        selected_cards.push(c);
      }
      if (i <= count)
        break;

      if (options.include_basic == 'must') {
        if (!any(selected_cards, H.EID_BASIC))
          continue;
      }
      if (options.include_fareast == 'must') {
        if (!any(selected_cards, H.EID_FAREAST))
          continue;
      }
      if (options.include_northern == 'must') {
        if (!any(selected_cards, H.EID_NORTHERN))
          continue;
      }
      if (options.include_fairy == 'must') {
        if (!any(selected_cards, H.EID_FAIRY))
          continue;
      }
      if (options.include_six == 'must') {
        if (!any(selected_cards, H.EID_SIX))
          continue;
      }
      if (options.include_all_costs) {
        var costs = {};
        for (var ic in selected_cards)
          costs[selected_cards[ic].cost] = true;
        if (!(costs[2] && costs[3] && costs[4] && (costs[5] || costs[6])))
          continue;
      }
      if (options.include_link_2) {
        var links = {};
        for (var il in selected_cards)
          links[selected_cards[il].link] = true;
        if (links[0] && !links[2])
          continue;
      }
      if (options.exclude_banned_cards_for_fairy_garden) {
        if (any(selected_cards, H.EID_FAIRY) &&
            selected_cards.some(H.is_banned_card_for_fairy_garden))
          continue;
      }

      if (options.statistical) {
        ok_count++;
        continue;
      }
      return selected_cards;
    }

    if (options.statistical) {
      return {
        try_count: try_count,
        ok_count: ok_count,
        probability: (ok_count * 100 / try_count) + '%'
      };
    }
    selected_cards.fallback = true;
    return selected_cards;
  };

  H.cids_from_psid = function (psid) {  //{{{2
    var delayed_cids = H.PSID_TO_DELAYED_CIDS_TABLE[psid];
    if (delayed_cids === undefined)
      throw new H.KeyError('PSID', psid);
    return force(delayed_cids);
  };

  H.decode_base64 = function (base64_encoded_string) {  //{{{2
    return $.map(
      base64_encoded_string.split(''),
      function (c) {
        var b = H.BASE64_DECODING_TABLE[c];
        if (b === undefined)
          throw new H.KeyError('Character', c);
        return b;
      }
    );
  };

  H.dominant_type_from_types = function (types) {  //{{{2
    if (0 <= types.indexOf('継承権'))
      return '継承権';
    if (0 <= types.indexOf('領地'))
      return '領地';

    if (0 <= types.indexOf('攻撃'))
      return '攻撃';
    if (0 <= types.indexOf('防衛'))
      return '防衛';
    if (0 <= types.indexOf('行動'))
      return '行動';

    if (0 <= types.indexOf('災い'))
      return '災い';

    if (0 <= types.indexOf('プリンセス'))
      return 'プリンセス';

    if (0 <= types.indexOf('サポート'))
      return 'サポート';

    if (0 <= types.indexOf('?'))
      return '?';

    throw new H.Error(
      JSON.stringify(types) +
      ' is not a valid type definition.'
    );
  };

  H.encode_base64 = function (six_bit_buffer) {  //{{{2
    return $.map(
      six_bit_buffer,
      function (b) {
        var c = H.BASE64_ENCODING_TABLE[b];
        if (c === undefined)
          throw new H.KeyError('Value', b);
        return c;
      }
    ).join('');
  };

  H.is_banned_card = function (card) {  //{{{2
    return card.name == '埋もれた財宝' ||
      card.name == '買収工作' ||
      card.name == '魅了術の魔女';
  };

  H.is_banned_card_for_fairy_garden = function (card) {  //{{{2
    return 0 <= card.types.indexOf('防衛') ||
      card.name == '破城槌' ||
      card.name == '埋もれた財宝' ||
      card.name == '星詠みの魔女' ||
      card.name == 'シノビ' ||
      card.name == '魅了術の魔女' ||
      card.name == '歩兵大隊' ||
      card.name == '近衛騎士団' ||
      card.name == '弓兵隊' ||
      card.name == 'サムライ';
  };

  H.is_dsid = function (sid) {  //{{{2
    return H.parse_dsid(sid).valid;
  };

  H.is_dynamic_page_url = function (location_href) {  //{{{2
    var url = $m.path.parseUrl(location_href);
    var pid = H.pid_from_url(url);
    var apid = H.apid_from_pid(pid);
    return pid != apid;
  };

  H.is_psid = function (sid) {  //{{{2
    return !!(H.PSID_TO_DELAYED_CIDS_TABLE[sid]);
  };

  H.is_rsid = function (sid) {  //{{{2
    // NB: This is not perfect -- the given sid might be invalid as an rsid.
    return !H.is_psid(sid);
  };

  H.is_running_in_standalone_mode = function () {  //{{{2
    return window.navigator.standalone;
  };

  H.is_running_specs = function () {  //{{{2
    return document.title == 'Jasmine Spec Runner';
  };

  H.meta_from_pid = function (pid) {  //{{{2
    var meta = H.PID_TO_META_TABLE[pid];
    if (meta === undefined) {
      var maybe_rsid = H.sid_from_pid(pid);
      if (/^supply:/.test(pid) && H.is_rsid(maybe_rsid))
        return H.meta_from_rsid(maybe_rsid);
      else
        throw new H.KeyError('PID', pid);
    }
    return meta;
  };

  H.meta_from_rsid = function (rsid) {  //{{{2
    // FIXME: In future, rsids might contain titles.
    return {
      title: 'ランダムサプライ'
    };
  };

  H.migrate_from_version_1 = function (maybe_old_pid) {  //{{{2
    var new_pid = H.PID_REPLACEMENT_TABLE_VERSION_1[maybe_old_pid];
    if (new_pid)
      return new_pid;

    var m = /^_supply\.(.*)$/.exec(maybe_old_pid);
    if (m)
      return 'supply:' + m[1];

    return false;
  };

  H.not = function (predicate) {  //{{{2
    return function () {
      return !predicate.apply(this, arguments);
    };
  };

  H.options = $.extend({}, H.DEFAULT_OPTIONS);  //{{{2

  H.order_by = function (xs /* , key_selector1, ... */) {  //{{{2
    var _xs = xs.slice(0);
    var key_selectors = arguments;
    _xs.sort(function (a, b) {
      for (var i = 1; i < key_selectors.length; i++) {
        var ka = key_selectors[i](a);
        var kb = key_selectors[i](b);

        if (ka < kb)
          return -1;
        else if (kb < ka)
          return 1;
        else
          continue;
      }
      return 0;
    });
    return _xs;
  };

  H.parse_dsid = function (sid) {  //{{{2
    var match;

    match = /^random(\d+)(:(.*))?$/.exec(sid);
    if (match) {
      return {
        valid: true,
        count: parseInt(match[1], 10),
        random: true,
        rsid: match[3]
      };
    }

    match = /^editor$/.exec(sid);
    if (match) {
      return {
        valid: true,
        editor: true
      };
    }

    return {
      valid: false
    };
  };

  H.pid_from_url = function (url) {  //{{{2
    // jQuery Mobile omits the fragment of a url for the home page.
    var pid = url.hash.substring(1);
    return pid === '' ? 'home' : pid;
  };

  H.render = function (tid, data) {  //{{{2
    var _data = data || {};
    return $(
      $('#' + tid).html().replace(
        /{{([^{}]+)}}/g,
        function (_, key) {
          var value = _data[key];
          return value === undefined ? '{{-' + key + '-}}' : value;
        }
      )
    );
  };

  H.rsid_from_xcards = function (xcards) {  //{{{2
    // See also H.xcards_from_rsid.
    var bs = [];

    var version = 0x01;
    bs.push(version);

    var sorted_xcards = H.order_by(xcards, function (xc) {return xc.cid;});
    for (var i in sorted_xcards) {
      var xcard = sorted_xcards[i];
      var bd = xcard.dropped ? 1 : 0;
      var bcid = xcard.cid;
      bs.push((bd << 5) | (bcid >> 6));
      bs.push(bcid & ((1 << 6) - 1));
    }

    return H.encode_base64(bs);
  };

  H.sid_from_pid = function (pid) {  //{{{2
    if (/^supply:/.test(pid))
      return pid.replace(/.*:/, '');
    if (/^reference:/.test(pid))
      return pid.replace(/:/, '-');
    return undefined;
  };

  H.xcard_from_card = function (card) {  //{{{2
    return $.extend({dropped: false}, card);
  };

  H.xcards_from_dsid_data = function (dsid_data) {  //{{{2
    if (!dsid_data.valid) {
      return [];
    } else if (dsid_data.rsid) {
      return H.xcards_from_rsid(dsid_data.rsid);
    } else if (dsid_data.random) {
      var cards =
        H.choose_random_cards(
          H.COMMON_CARDS,
          dsid_data.count,
          H.options
        );
      var xcards = $.map(cards, H.xcard_from_card);
      xcards.fallback = cards.fallback;
      return xcards;
    } else if (dsid_data.editor) {
      return $.map(
        H.COMMON_CARDS,
        function (card) {
          var xcard = H.xcard_from_card(card);
          xcard.dropped = true;
          return xcard;
        }
      );
    } else {
      return [];
    }
  };

  H.xcards_from_psid = function (psid) {  //{{{2
    return $.map(H.cids_from_psid(psid), function (cid) {
      return H.xcard_from_card(H.card_from_cid(cid));
    });
  };

  H.xcards_from_rsid = function (rsid) {  //{{{2
    // An rsid is a string which is encoded from xcards with BASE64,
    // so that each character in rsid is corresponding to a 6-bit value.
    // To simplify both encoding and decoding,
    // we use only an array of 6-bit values to convert rsid from/to xcards.
    //
    // The first character in an rsid represents a version of rsid/xcards
    // conversion.  There is only one version at the moment,
    // and the version is 0x01 ('A').
    //
    // The rest of characters in an rsid represent xcards.
    //
    // A xcard is represented with 12-bit value.
    // The most significant bit represents a dropped status,
    // where 0 means available and 1 means dropped.
    // The rest bits represent a cid.
    // Other information of a xcard is retrieved by H.card_from_cid.

    var bs = H.decode_base64(rsid);
    var xcards = [];

    var version = bs.shift();
    if (version != 0x01)
      throw new H.Error(JSON.stringify(version) + ' is not a valid version.');

    while (2 <= bs.length) {
      var b1 = bs.shift();
      var b2 = bs.shift();
      var dropped = !!(b1 & (1 << 5));
      var cid = ((b1 & ((1 << 5) - 1)) << 6) | b2;
      var xcard = H.xcard_from_card(H.card_from_cid(cid));
      xcard.dropped = dropped;
      xcards.push(xcard);
    }
    if (bs.length !== 0) {
      throw new H.Error([
        JSON.stringify(rsid), 'is not valid RSID;',
        'it contains trailing data:', JSON.stringify(bs)
      ].join(' '));
    }

    return xcards;
  };

  H.xcards_from_sid = function (sid) {  //{{{2
    var match = H.parse_dsid(sid);
    if (match.valid) {
      return H.xcards_from_dsid_data(match);
    } else if (H.is_psid(sid)) {
      return H.xcards_from_psid(sid);
    } else {
      return H.xcards_from_rsid(sid);
    }
  };

  // Core  //{{{1
  H.adjust_header = function ($page) {  //{{{2
    $('#header').toggleClass('disabled', $page.attr('id') == 'configure');
    $('#header .reshuffle.button').toggleClass(
      'disabled',
      !H.is_dsid($page.jqmData('sid'))
    );
    $('#header .share.button').toggleClass(
      'disabled',
      !($page.attr('id') == 'supply' || $page.attr('id') == 'reference')
    );
  };

  H.adjust_the_initial_page_if_it_is_dynamic_page = function () {  //{{{2
    // From users' point of view, this app has many pages like
    // #supply:random10, #supply:fareast-firstplay, etc.
    // But several pages such as #supply are actually exist as DOM elements.
    // When a user visits #{apid}:{query}, this app replaces the content of
    // #{apid} then shows #{apid} instead of #{apid}:{query}.
    //
    // Unfortunately, this contept does not match jQuery Mobile initialization.
    // When an app is accessed with a hash of some page, $m.initializePage()
    // shows that page as the initial page if it exists as a DOM element.
    // Otherwise, the first page (for this app, #home) is shown instead.
    //
    // As a workaround for this mismatch, a dummy page which has
    // #{apid}:{query} as its ID is inserted.  This dummy page just fakes
    // $m.initializePage().  So that it will never be shown.
    //
    // NB: This workaround may not work for future versions of jQuery Mobile.
    if (H.is_dynamic_page_url(location.href)) {
      var url = $m.path.parseUrl(location.href);
      var pid = H.pid_from_url(url);
      var apid = H.apid_from_pid(pid);
      var $dummy_page = $('#' + apid).clone().attr('id', pid);
      $('body').append($dummy_page);
    }
  };

  H.adjust_title = function (pid) {  //{{{2
    var apid = H.apid_from_pid(pid);
    var $page = $('#' + apid);
    if ($page.length != 1)  // Seems not to be a valid page.  Skip.
      return;

    var meta = H.meta_from_pid(pid);
    $page.jqmData('title', meta.title);
  };

  H.back = function (go_home_as_fallback, transition) {  //{{{2
    // NB: $m.navigate.history is not documented API.
    // This code might not work with newer versions of jQuery Mobile.
    if (1 <= $m.navigate.history.activeIndex) {
      // $m.back() uses window.history.go to back if $m.hashListeningEnabled.
      // This is the same as using the browser's "Back" button.  But Back and
      // Forward buttons do not work on iOS7 if application cache is enabled.
      // So that dialogs cannot be closed, because close buttons of dialogs are
      // implemented as back buttons.  [IOS7_HISTORY_BUG]
      //
      // As a workaround for this issue, we manually goes to the previous
      // page instead of $m.back().  This workaround should be removed when
      // the bug is fixed in later releases of iOS.
      var browser_history_available =
        !window.navigator.standalone ||
        window.applicationCache.status == window.applicationCache.UNCACHED;
      if (browser_history_available) {
        $m.back();
      } else {
        $(':mobile-pagecontainer').pagecontainer(
          'change',
          $m.navigate.history.stack[$m.navigate.history.activeIndex - 1].url,
          {transition: transition, reverse: true}
        );
      }
    } else {
      if (go_home_as_fallback) {
        // If a dialog such as #configure is directly accessed, there is no
        // valid page to back.  Close the dialog by going to #home instead.
        $(':mobile-pagecontainer').pagecontainer(
          'change',
          '#home',
          {transition: transition, reverse: true}
        );
      } else {
        // Since there is no valid page to back, nothing to do.
      }
    }
  };

  H.generate_permalink = function ($card_list_page) {  //{{{2
    var online_version_url_base = location.href.replace('/offline', '/');
    var sid = $card_list_page.jqmData('sid');
    if (!H.is_dsid(sid))
      return online_version_url_base;

    var $card_list = $card_list_page.find('.card_list');
    var xcards = H.xcards_from_card_list_view($card_list);
    var rsid = H.rsid_from_xcards(
      sid == 'editor' ?
      $.grep(xcards, function (xcard) {return !xcard.dropped;}) :
      xcards
    );
    var base_uri = $m.path.parseUrl(online_version_url_base).hrefNoHash;
    return base_uri + '#supply:' + rsid;
  };

  H.get_current_page = function () {  //{{{2
    return $(':mobile-pagecontainer').pagecontainer('getActivePage');
  };

  H.initialize_header = function () {  //{{{2
    $('#header').toolbar();
    $('#header > [data-role="navbar"]').navbar();

    $('#header .button').click(function () {
      var $button = $(this);
      setTimeout(
        function () {
          $button.removeClass('ui-btn-active');
        },
        300
      );
    });

    $('#header .reshuffle.button').click(function () {
      if ($(this).is('.disabled'))
        return;

      var $page = H.get_current_page();
      var sid = $page.jqmData('sid');
      H.refresh_card_list_view(
        $page.find('.card_list'),
        H.xcards_from_sid(sid),
        sid,
        false
      );
    });

    $('#header .share.button').click(function (e) {
      // Here we want to open a new window to share a link.  If the app is
      // running in standalone mode on iOS devices, we want to switches to
      // Mobile Safari to open a new window.
      //
      // But window.open doesn't work if the app is running in standalone mode
      // on iOS7.  In this case, it opens URL in the current screen of the app.
      // So that it's not possible to back to the app.

      if ($(this).is('.disabled'))
        return false;

      var $page = H.get_current_page();
      var permalink = H.generate_permalink($page);
      var is_reference_page = /^reference-/.test($page.jqmData('sid'));
      var base_message =
        is_reference_page ?
        'ハトクラの' + $page.jqmData('title') :
        'ハトクラなう。今回のサプライ: ' + H.list_card_names($page).join(', ');
      var ss =
        H.options.sharing_tool == 'web_intent' ?
        ['https://twitter.com/intent/tweet',
         '?url=', encodeURIComponent(permalink),
         '&text=', encodeURIComponent(base_message),
         '&hashtags=', encodeURIComponent('hatokura'),
         '&related=', encodeURIComponent('HeartofCrown')] :
        ['twitter://post?message=',
         encodeURIComponent(base_message),
         encodeURIComponent(' ' + permalink),
         encodeURIComponent(' ' + '#hatokura')];
      var link_to_share_permalink = ss.join('');

      $(this).attr('href', link_to_share_permalink);
      H.save_state_before_sharing_if_necessary(permalink);
      return;  // Let the browser opens the adjusted href.
    });
  };

  H.initialize_configure = function () {  //{{{2
    $('#configure_close_button').click(function () {
      H.back(true, 'pop');
    });
  };

  H.list_card_names = function ($card_list_page) {  //{{{2
    var $card_list = $card_list_page.find('.card_list');
    return $.map(
      $.grep(
        H.xcards_from_card_list_view($card_list),
        function (xcard) {return !xcard.dropped;}
      ),
      function (xcard) {return xcard.name;}
    );
  };

  H.load_options = function (kw) {  //{{{2
    for (var key in H.DEFAULT_OPTIONS) {
      var saved_value = $.cookie(key);
      var value =
        saved_value === null ?
        H.DEFAULT_OPTIONS[key] :
        JSON.parse(saved_value);

      H.options[key] = value;

      var $input =
        $('#configure :input')
        .filter(function () {return $(this).attr('name') == key;});
      if ($input.length === 0) {
        // There is no form; it's an internal option.
      } else if ($input.is(':checkbox')) {
        $input.check(value);
      } else if ($input.is(':radio')) {
        $input.each(function () {
          $(this).check($(this).val() == value);
        });
      } else if ($input.is('select')) {
        $input.val(value);
      } else {
        throw new H.Error('Form for "' + key + '" is not supported.');
      }

      if (kw.is_resetting) {
        $input.trigger('change', kw);
        if ($input.is(':checkbox, :radio'))
          $input.checkboxradio('refresh');
      }
    }
  };

  H.patch_the_title_for_the_initial_page = function () {  //{{{2
    // For some reason, jQuery Mobile use the <title> element rather than the
    // data-title of a page if the page is deeply linked or the page is
    // reloaded.  So that we have to force using the title of the visited page.
    var url = $m.path.parseUrl(location.href);
    var pid = H.pid_from_url(url);
    var meta = H.meta_from_pid(pid);
    document.title = meta.title;
  };

  H.prepare_dynamic_page_content = function (pid, apid) {  //{{{2
    if (apid == 'supply' || apid == 'reference')
      return H.prepare_dynamic_page_content_cards(pid, apid);
    else
      return H.prepare_dynamic_page_content_pages(pid, apid);
  };

  H.prepare_dynamic_page_content_cards = function (pid, apid) {  //{{{2
    var $page = $('#' + apid);
    var sid = H.sid_from_pid(pid);

    // Reuse the last content to avoid unnecessary regeneration (especially for
    // a random supply page) if the next page is already visited before witht
    // the same parameters.
    if (sid == $page.jqmData('sid'))
      return $page;
    $page.jqmData('sid', sid);

    var initial_xcards = H.xcards_from_sid(sid);

    var $content = H.render('card_list_template');
    var $card_list = $content.find('.card_list');
    H.refresh_card_list_view($card_list, initial_xcards, sid, true);

    $card_list.listview();
    $page.empty().append($content);

    return $page;
  };

  H.prepare_dynamic_page_content_pages = function (pid, apid) {  //{{{2
    var child_pids = H.child_pids_from_pid(pid);

    var $content = H.render('page_list_template');
    var $page_list = $content.find('.page_list');
    for (var i in child_pids) {
      var child_pid = child_pids[i];
      var child_meta = H.meta_from_pid(child_pid);
      $page_list.append(H.render('page_list_item_template', {
        pid: child_pid,
        title: child_meta.title
      }));
    }

    var $page = $('#' + apid);
    $page_list.listview();
    $page.empty().append($content);

    return $page;
  };

  H.redirect_to_new_url_from_iui_era_url_if_necessary = function () {  //{{{2
    var url = $m.path.parseUrl(location.href);
    var pid = H.pid_from_url(url);
    var new_pid = H.migrate_from_version_1(pid);
    if (new_pid) {
      var base_uri = $m.path.parseUrl(location.href).hrefNoHash;
      location.replace(base_uri + '#' + new_pid);
    }
  };

  H.refresh_card_list_view = function ($card_list, xcards, sid, is_first) {  //{{{2
    var refresh_if_dropped = function () {
      var updated_xcards = H.xcards_from_card_list_view($card_list);
      H.refresh_card_list_view($card_list, updated_xcards, sid, false);
    };
    var oo = Number.MAX_VALUE;
    var sorted_xcards =
      H.order_by(
        xcards,
        function (xcard) {return xcard.dropped ? 2 : 1;},
        function (xcard) {return H.options.sort_key == 'eid' ? xcard.eid : 0;},
        function (xcard) {return xcard.cost === undefined ? oo : 0;},
        function (xcard) {return typeof xcard.cost === 'string' ? oo : xcard.cost;},
        function (xcard) {return xcard.link === undefined ? oo : xcard.link;},
        function (xcard) {return xcard.name === '???' ? 2 : 1;},
        function (xcard) {return xcard.name;}
      );
    var editable = 10 < xcards.length && H.is_dsid(sid);
    $card_list.empty();
    $.each(sorted_xcards, function (i, xcard) {
      var $xcard =
        H.render(
          'card_list_item_template',
          $.extend(
            {
              cost: '?',
              dominant_type: H.dominant_type_from_types(xcard.types),
              subtype: '',
              esym: H.EID_TO_EXPANSION_TABLE[xcard.eid].symbol
            },
            xcard
          )
        );
      $xcard
        .find('.selected:checkbox')
        .check(!xcard.dropped)
        .toggleClass('unavailable', !editable)
        .enable(editable)
        .change(refresh_if_dropped);
      $xcard.toggleClass('dropped', xcard.dropped);
      if (editable && i == 10)
        $card_list.append(H.render('supply_deadline_template'));
      $card_list.append($xcard);
    });
    if (!is_first)
      $card_list.listview('refresh');
    $('#supply_status').attr(
      'class',
      xcards.fallback ? 'failed' : 'succeeded'
    );
  };

  H.reset_options = function () {  //{{{2
    for (var key in H.DEFAULT_OPTIONS)
      $.cookie(key, undefined);

    H.load_options({is_resetting: true});
  };

  H.restore_state_before_sharing_if_necessary = function () {  //{{{2
    if (!H.is_running_in_standalone_mode())
      return;

    var s = $.cookie('state_before_sharing');
    if (s === null)
      return;

    // TODO: Is it better to remove state_before_sharing after restoring?
    var v = JSON.parse(s);
    // Use only hash to avoid reloading page.  Because the base URL of a saved
    // permalink is not the same as the base URL of the currently running app.
    location.replace($m.path.parseUrl(v.url).hash);
  };

  H.save_option = function (key, value) {  //{{{2
    H.options[key] = value;
    $.cookie(key, JSON.stringify(value), {expires: 365});

    if (H.options.include_basic == 'must_not' &&
        H.options.include_fareast == 'must_not' &&
        H.options.include_northern == 'must_not' &&
        H.options.include_fairy == 'must_not' &&
        H.options.include_six == 'must_not') {
      $('#configure [name="include_basic"]').val('may').change();
    }
  };

  H.save_state_before_sharing_if_necessary = function (permalink) {  //{{{2
    if (!H.is_running_in_standalone_mode())
      return;

    // Fairly enough length of time
    // * To review the supply after preparation of a new game, and
    // * Not to interrupt generating a new supply for further games.
    var RESTORABLE_PERIOD_IN_MILLISECONDS = 5 * 60 * 1000;
    var now = Date.now();
    $.cookie(
      'state_before_sharing',
      JSON.stringify({
        url: permalink
      }),
      {expires: new Date(now + RESTORABLE_PERIOD_IN_MILLISECONDS)}
    );
  };

  H.set_up_options_if_necessary = (function () {  //{{{2
    var is_initialized = false;
    return function () {
      if (!is_initialized) {
        $('#configure :input').change(function (e, kw) {
          if (!(kw && kw.is_resetting)) {
            var $input = $(e.target);
            if ($input.is(':checkbox')) {
              H.save_option($input.attr('name'), $input.isChecked());
            } else if ($input.is(':radio')) {
              H.save_option($input.attr('name'), $input.val());
            } else if ($input.is('select')) {
              H.save_option($input.attr('name'), $input.val());
            }
          }
        });
        H.load_options({is_resetting: false});

        $('#configure #button_to_reset_options').click(function (e) {
          H.reset_options();
          alert('初期設定に戻しました。');
        });

        is_initialized = true;
      }
    };
  })();

  H.suggest_new_uri_for_heroku_migration_if_necessary = function () {  //{{{2
    var old_domain = 'hatokurandom.heroku.com';
    var new_domain = 'hatokurandom.herokuapp.com';
    if (location.hostname == old_domain) {
      var message =
        '現在アクセスされている ' + old_domain + ' ですが、' +
        '諸事情により2014-09-22から利用できなくなりました。' +
        '今後は ' + new_domain + ' でアクセスするようお願いします。' +
        '\n\n' +
        new_domain + ' へ移動してもよいでしょうか?';
      if (confirm(message))
        location.href = location.href.replace(location.host, new_domain);
    }
  };

  H.test_supply_generation = function (options) {  //{{{2
    // For interactive investigation; not called from anywhere.
    var s = H.choose_random_cards(
      H.COMMON_CARDS,
      10,
      $.extend({}, H.DEFAULT_OPTIONS, {statistical: true}, options)
    );
    var keys = ['ok_count', 'try_count', 'probability'];
    for (var i in keys)
      console.log([keys[i], s[keys[i]]]);
  };

  H.xcards_from_card_list_view = function ($card_list) {  //{{{2
    return $card_list.find('.card').map(function () {
      var $card = $(this);
      var xcard = H.xcard_from_card(H.card_from_cid($card.data('cid')));
      xcard.dropped = $card.find('.selected:checkbox:checked').length === 0;
      return xcard;
    }).get();
  };

  // Events  //{{{1
  if (H.is_running_specs())  //{{{2
    return;  // Do not register event handlers to avoid interference on specs.

  $(document).on('pagebeforechange', function (e, data) {  //{{{2
    // From the reference:
    //
    // > Triggered twice during the page change cyle:
    // > First prior to any page loading or transition
    // > and next after page loading completes successfully, but before the
    // > browser history has been modified by the navigation process.
    // >
    // > When received with data.toPage set to a string, the event indicates
    // > that navigation is about to commence. The value stored in data.toPage
    // > is the URL of the page that will be loaded.
    // >
    // > When received with data.toPage set to a jQuery object, the event
    // > indicates that the destination page has been loaded and navigation
    // > will continue.

    try {
      if (typeof(data.toPage) != 'string')
        return;

      var url = $m.path.parseUrl(data.toPage);
      var pid = H.pid_from_url(url);
      var apid = H.apid_from_pid(pid);

      H.adjust_title(pid);

      if (apid != pid || apid == 'card-references') {
        var $page = H.prepare_dynamic_page_content(pid, apid);
        data.options.dataUrl = data.toPage;
        data.toPage = $page;
      } else {
        // Let jQuery Mobile process this request.
      }
    } catch (ex) {
      alert('Unexpected error: ' + ex.message);  // TODO: Friendly instruction.
      e.preventDefault();
    }
  });

  $(document).on('pagecontainerbeforetransition', ':mobile-pagecontainer', function (e, ui) {  //{{{2
    H.adjust_header(ui.toPage);
  });

  $(document).on('swiperight', function (e) {  //{{{2
    // It would be better to add a gesture to forward history.  But H.back()
    // has a side effect on jQuery Mobile's history stack to provide its
    // functionality against [IOS7_HISTORY_BUG].  As a result, users cannot
    // forward repatedly.  And forwarding is not often used.  So that
    // forwarding is not supported at this moment.
    if (H.is_running_in_standalone_mode())
      H.back();
  });

  $(document).ready(function () {  //{{{2
    H.redirect_to_new_url_from_iui_era_url_if_necessary();
    H.suggest_new_uri_for_heroku_migration_if_necessary();
    H.restore_state_before_sharing_if_necessary();

    $m.defaultPageTransition = 'slide';

    H.patch_the_title_for_the_initial_page();

    H.set_up_options_if_necessary();

    H.initialize_header();
    H.initialize_configure();

    H.adjust_the_initial_page_if_it_is_dynamic_page();

    if (navigator.userAgent.match(/OS (\S)+ like Mac OS X/i))
      $('body').addClass('iOS');

    var notification_table = {
      'checking': 'fa fa-signal',
      'noupdate': 'fa fa-check-circle',  // The current app is up to date.
      'downloading': 'fa fa-download',
      'progress': 'fa fa-download',
      'cached': 'fa fa-check-circle',  // The current app is newly cached.
      'updateready': 'fa fa-refresh',  // New version has been cached.
      'obsolete': 'fa fa-exclamation-circle',
      'error': 'fa fa-exclamation-circle'
    };
    $.each(notification_table, function (event_type, icon_class) {
      $(window.applicationCache).on(event_type, function (e) {
        $('#notification #offline_mode').attr('class', event_type);
        $('#notification #offline_mode i').attr('class', icon_class);
        $('#notification #offline_mode .progress')
          .text(
            event_type == 'progress' ?
            [e.originalEvent.loaded, '/', e.originalEvent.total].join('') :
            ''
          );
      });
    });

    $m.initializePage();
  });

  //}}}1
})(hatokurandom, jQuery, jQuery.mobile);

// __END__  {{{1
// vim: expandtab shiftwidth=2 softtabstop=2
// vim: foldmethod=marker
