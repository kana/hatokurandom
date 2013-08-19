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

  // Constants  //{{{1
  // Eids  //{{{2
  H.EID_BASIC = 1;
  H.EID_FAREAST = 2;
  H.EID_NORTHERN = 3;
  H.EID_FAIRY = 4;

  H.EXPANSIONS = [  //{{{2
    {eid: H.EID_BASIC, name: '基本セット'},
    {eid: H.EID_FAREAST, name: '極東辺境領'},
    {eid: H.EID_NORTHERN, name: '北限の魔女'},
    {eid: H.EID_FAIRY, name: 'フェアリーガーデン'}
  ];

  H.ALL_CARDS = [  //{{{2
    // Sorted by eid, cost, link, then name.
    // :'<,'>sort /cid: \S\+, \zs.*/ r
    //
    // Princess cards are counted as rare cards.
    // Reference: https://twitter.com/HeartofCrown/status/233840190383341568

    {cid: 0x34, eid: H.EID_BASIC, cost: 0, link: undefined, name: '呪い', types: ['呪い'], rarity: undefined},

    {cid: 0x2b, eid: H.EID_BASIC, cost: 1, link: 1, name: '農村', types: ['領地'], rarity: 'B'},

    {cid: 0x01, eid: H.EID_BASIC, cost: 2, link: 1, name: '城壁', types: ['行動', '防衛'], rarity: 'C'},
    {cid: 0x02, eid: H.EID_BASIC, cost: 2, link: 1, name: '寄付', types: ['行動'], rarity: 'C'},
    {cid: 0x03, eid: H.EID_BASIC, cost: 2, link: 1, name: '願いの泉', types: ['行動'], rarity: 'C'},
    {cid: 0x04, eid: H.EID_BASIC, cost: 2, link: 2, name: '斥候', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},
    {cid: 0x05, eid: H.EID_BASIC, cost: 2, link: 2, name: '早馬', types: ['行動'], rarity: 'C'},
    {cid: 0x2e, eid: H.EID_BASIC, cost: 2, link: undefined, name: '見習い侍女', types: ['継承権'], subtype: '侍女', rarity: undefined},

    {cid: 0x06, eid: H.EID_BASIC, cost: 3, link: 0, name: '交易船', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x07, eid: H.EID_BASIC, cost: 3, link: 0, name: '埋もれた財宝', types: ['行動'], rarity: 'C'},
    {cid: 0x08, eid: H.EID_BASIC, cost: 3, link: 0, name: '御用商人', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x09, eid: H.EID_BASIC, cost: 3, link: 1, name: '召集令状', types: ['行動'], rarity: 'C'},
    {cid: 0x0a, eid: H.EID_BASIC, cost: 3, link: 1, name: '焼き畑農業', types: ['行動'], rarity: 'C'},
    {cid: 0x0b, eid: H.EID_BASIC, cost: 3, link: 1, name: '破城槌', types: ['行動'], rarity: 'C'},
    {cid: 0x0c, eid: H.EID_BASIC, cost: 3, link: 1, name: '買収工作', types: ['行動', '攻撃'], subtype: '計略', rarity: 'C'},
    {cid: 0x2c, eid: H.EID_BASIC, cost: 3, link: 1, name: '都市', types: ['領地'], rarity: 'B'},
    {cid: 0x0d, eid: H.EID_BASIC, cost: 3, link: 1, name: '隠れ家', types: ['行動', '防衛'], rarity: 'C'},
    {cid: 0x0e, eid: H.EID_BASIC, cost: 3, link: 1, name: '魔法の護符', types: ['行動', '防衛', '呪い'], rarity: 'C'},
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

    {cid: 0x3f, eid: H.EID_NORTHERN, cost: 2, link: 1, name: 'ケットシー', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x40, eid: H.EID_NORTHERN, cost: 2, link: 1, name: '幸運の銀貨', types: ['行動'], rarity: 'C'},

    {cid: 0x41, eid: H.EID_NORTHERN, cost: 3, link: 1, name: '洗礼', types: ['行動'], rarity: 'C'},
    {cid: 0x43, eid: H.EID_NORTHERN, cost: 3, link: 2, name: '名馬', types: ['行動'], rarity: 'C'},
    {cid: 0x42, eid: H.EID_NORTHERN, cost: 3, link: undefined, name: '呪いの人形', types: ['呪い'], rarity: 'C'},

    {cid: 0x45, eid: H.EID_NORTHERN, cost: 4, link: 0, name: 'ドワーフの宝石職人', types: ['行動'], rarity: 'C'},
    {cid: 0x44, eid: H.EID_NORTHERN, cost: 4, link: 0, name: '宮廷闘争', types: ['行動', '攻撃'], subtype: '計略', rarity: 'C'},
    {cid: 0x3e, eid: H.EID_NORTHERN, cost: 4, link: 2, name: 'エルフの狙撃手', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},

    {cid: 0x47, eid: H.EID_NORTHERN, cost: 5, link: 0, name: '地方役人', types: ['行動'], rarity: 'C'},
    {cid: 0x3d, eid: H.EID_NORTHERN, cost: 5, link: 0, name: '豪商', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x46, eid: H.EID_NORTHERN, cost: 5, link: undefined, name: '貴族の一人娘', types: ['継承権'], rarity: 'C'},

    {cid: 0x48, eid: H.EID_NORTHERN, cost: 6, link: 0, name: '独占', types: ['行動'], rarity: 'C'},
    {cid: 0x49, eid: H.EID_NORTHERN, cost: 6, link: 1, name: '工業都市', types: ['領地'], rarity: 'C'},
    {cid: 0x3c, eid: H.EID_NORTHERN, cost: 6, link: undefined, name: '北限の魔女姫 アナスタシア', types: ['プリンセス'], rarity: 'R'},

    {cid: 0x4a, eid: H.EID_FAIRY, cost: 4, link: 1, name: '大農園', types: ['領地'], rarity: 'C'},
    {cid: 0x4b, eid: H.EID_FAIRY, cost: 5, link: 1, name: '収穫祭', types: ['行動'], rarity: 'C'},
    {cid: 0x4c, eid: H.EID_FAIRY, cost: 4, link: 0, name: '氷雪の精霊', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C'},
    {cid: 0x4d, eid: H.EID_FAIRY, cost: 2, link: 2, name: '密偵', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},
    {cid: 0x4e, eid: H.EID_FAIRY, cost: 2, link: 2, name: '巡礼', types: ['行動'], rarity: 'C'},
    {cid: 0x4f, eid: H.EID_FAIRY, cost: 2, link: 1, name: '家守の精霊', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x50, eid: H.EID_FAIRY, cost: 2, link: 2, name: '伝令', types: ['行動'], rarity: 'C'},
    {cid: 0x51, eid: H.EID_FAIRY, cost: 2, link: 1, name: '春風の妖精', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x52, eid: H.EID_FAIRY, cost: 3, link: 1, name: '司書', types: ['行動'], rarity: 'C'},
    {cid: 0x53, eid: H.EID_FAIRY, cost: 3, link: 1, name: '祝福', types: ['行動'], rarity: 'C'},
    {cid: 0x54, eid: H.EID_FAIRY, cost: 3, link: 2, name: '星巫女の託宣', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x55, eid: H.EID_FAIRY, cost: 3, link: 1, name: 'リーフフェアリー', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x56, eid: H.EID_FAIRY, cost: 3, link: 1, name: '旅芸人', types: ['行動'], rarity: 'C'},
    {cid: 0x57, eid: H.EID_FAIRY, cost: 3, link: 2, name: 'ギルドマスター', types: ['行動'], rarity: 'C'},
    {cid: 0x58, eid: H.EID_FAIRY, cost: 4, link: 1, name: 'ニンフ', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C'},
    {cid: 0x59, eid: H.EID_FAIRY, cost: 4, link: 0, name: '辻占い師', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x5a, eid: H.EID_FAIRY, cost: 4, link: 1, name: '御料地', types: ['領地'], rarity: 'C'},
    {cid: 0x5b, eid: H.EID_FAIRY, cost: 4, link: 0, name: '石弓隊', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},
    {cid: 0x5c, eid: H.EID_FAIRY, cost: 4, link: 0, name: '商船団', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x5d, eid: H.EID_FAIRY, cost: 4, link: 0, name: '行商人', types: ['行動'], subtype: '商人', rarity: 'C'},
    {cid: 0x5e, eid: H.EID_FAIRY, cost: 4, link: 0, name: 'ブラウニー', types: ['行動'], subtype: '魔法', rarity: 'C'},
    {cid: 0x5f, eid: H.EID_FAIRY, cost: 4, link: 1, name: '検地役人', types: ['行動', '攻撃'], rarity: 'C'},
    {cid: 0x60, eid: H.EID_FAIRY, cost: 5, link: 0, name: '聖堂騎士', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},
    {cid: 0x61, eid: H.EID_FAIRY, cost: 5, link: 1, name: '交易都市', types: ['領地'], rarity: 'C'},
    {cid: 0x62, eid: H.EID_FAIRY, cost: 5, link: 0, name: '鬼族の戦士', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C'},
    {cid: 0x63, eid: H.EID_FAIRY, cost: 5, link: undefined, name: 'メイド長', types: ['継承権'], subtype: '侍女', rarity: 'C'},
    {cid: 0x64, eid: H.EID_FAIRY, cost: 5, link: 0, name: '執事', types: ['行動'], rarity: 'C'},
    {cid: 0x65, eid: H.EID_FAIRY, cost: 5, link: 0, name: '徴税人', types: ['行動', '攻撃'], rarity: 'C'},
    {cid: 0x66, eid: H.EID_FAIRY, cost: 5, link: 1, name: '合併', types: ['行動'], rarity: 'C'},
    {cid: 0x67, eid: H.EID_FAIRY, cost: 6, link: undefined, name: '裁判官', types: ['継承権'], rarity: 'C'},

    {cid: 0x68, eid: H.EID_FAIRY, cost: 11, link: undefined, name: '妖精女王エルルーン', types: ['継承権'], rarity: 'R'}

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
    exclude_useless_cards: false,
    include_all_costs: false,
    include_basic: 'may',
    include_fairy: 'may',
    include_fareast: 'may',
    include_link_2: false,
    include_northern: 'may',
    include_pairs: false,
    statistical: false,
    try_count: 100
  };

  H.PSID_TO_CARD_NAMES_TABLE = (function () {  //{{{2
    var list = function (predicate) {
      return $.map($.grep(H.ALL_CARDS, predicate), function (c) {return c.name;});
    };
    var has_type = function (card, type) {
        return 0 <= card.types.indexOf(type);
    };
    var has_subtype = function (card, subtype) {
        return card.subtype == subtype;
    };
    var costs = function (card, cost) {
        return card.cost == cost;
    };
    var links = function (card, link_count) {
        return card.link == link_count;
    };
    var included = function (card, eid) {
        return card.eid == eid;
    };
    return {
      'basic-firstplay': [  //{{{
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
      ],  //}}}
      'basic-guide': [  //{{{
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
      ],  //}}}
      'basic-guide2': [  //{{{
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
      ],  //}}}
      'basic-intermediate': [  //{{{
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
      ],  //}}}
      'basic-intermediate2': [  //{{{
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
      ],  //}}}
      'basic-bigbusiness': [  //{{{
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
      ],  //}}}
      'basic-greatwar': [  //{{{
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
      ],  //}}}
      'basic-adventure': [  //{{{
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
      ],  //}}}
      'basic-witchcraft': [  //{{{
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
      ],  //}}}
      'basic-courtpolitics': [  //{{{
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
      ],  //}}}
      'fareast-firstplay': [  //{{{
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
      ],  //}}}
      'fareast-porttown': [  //{{{
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
      ],  //}}}
      'fareast-prosperity': [  //{{{
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
      ],  //}}}
      'fareast-mine': [  //{{{
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
      ],  //}}}
      'fareast-citystrife': [  //{{{
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
      ],  //}}}
      'fareast-scandal': [  //{{{
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
      ],  //}}}
      'fareast-battlefield': [  //{{{
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
      ],  //}}}
      'fareast-guildstrife': [  //{{{
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
      ],  //}}}
      'fareast-kunoichi': [  //{{{
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
      ],  //}}}
      'fareast-moneymoneymoney': [  //{{{
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
      ],  //}}}
      'northern-territory': [  //{{{
        'ケットシー',
        '幸運の銀貨',
        'エルフの狙撃手',
        'ドワーフの宝石職人',
        '豪商',
        '工業都市',
        '願いの泉',
        '破城槌',
        '図書館',
        '冒険者',
      ],  //}}}
      'northern-parliament': [  //{{{
        '名馬',
        '洗礼',
        'エルフの狙撃手',
        '豪商',
        '地方役人',
        '工業都市',
        '早馬',
        '交易船',
        '図書館',
        '呪詛の魔女',
      ],  //}}}
      'northern-witchandchurch': [  //{{{
        'ケットシー',
        '幸運の銀貨',
        '洗礼',
        '宮廷闘争',
        'ドワーフの宝石職人',
        '貴族の一人娘',
        '斥候',
        '早馬',
        '都市開発',
        '呪詛の魔女',
      ],  //}}}
      'northern-society': [  //{{{
        'ケットシー',
        '洗礼',
        '呪いの人形',
        '宮廷闘争',
        '貴族の一人娘',
        '豪商',
        '早馬',
        '図書館',
        '銀行',
        '噂好きの公爵夫人',
      ],  //}}}
      'northern-guiltycrown': [  //{{{
        '名馬',
        'ドワーフの宝石職人',
        '宮廷闘争',
        '地方役人',
        '工業都市',
        '願いの泉',
        '城壁',
        '破城槌',
        '歩兵大隊',
        '補給部隊',
      ],  //}}}
      'northern-darkness': [  //{{{
        'ケットシー',
        '呪いの人形',
        '名馬',
        'エルフの狙撃手',
        '宮廷闘争',
        '豪商',
        '独占',
        '早馬',
        '城壁',
        '錬金術師',
      ],  //}}}
      'northern-scandal': [  //{{{
        '名馬',
        'ドワーフの宝石職人',
        '地方役人',
        '豪商',
        '鉱山都市',
        '割り符',
        '願いの泉',
        '錬金術師',
        '銀行',
        '噂好きの公爵夫人',
      ],  //}}}
      'northern-teaparty': [  //{{{
        '幸運の銀貨',
        '名馬',
        '呪いの人形',
        'ドワーフの宝石職人',
        '地方役人',
        'お金好きの妖精',
        '伝書鳩',
        '見習い魔女',
        '結盟',
        '願いの泉',
      ],  //}}}
      'northern-swordsman': [  //{{{
        '洗礼',
        '名馬',
        '独占',
        '工業都市',
        '伝書鳩',
        'サムライ',
        '鉱山都市',
        '結盟',
        '早馬',
        '交易船',
      ],  //}}}
      'fairy-primer': [  //{{{
        '家守の精霊',
        '伝令',
        '春風の妖精',
        'リーフフェアリー',
        '旅芸人',
        '大農園',
        '石弓隊',
        '商船団',
        '収穫祭',
        '合併',
      ],  //}}}
      'fairy-butlerandmaid': [  //{{{
        '伝令',
        '春風の妖精',
        '星巫女の託宣',
        '旅芸人',
        '石弓隊',
        '商船団',
        '行商人',
        '検地役人',
        'メイド長',
        '執事',
      ],  //}}}
      'fairy-winter': [  //{{{
        '密偵',
        '伝令',
        '春風の妖精',
        '司書',
        '大農園',
        '氷雪の精霊',
        '石弓隊',
        '行商人',
        'ブラウニー',
        '執事',
      ],  //}}}
      'fairy-folklore': [  //{{{
        '密偵',
        '巡礼',
        '家守の精霊',
        'ニンフ',
        '辻占い師',
        '御料地',
        '行商人',
        'ブラウニー',
        '聖堂騎士',
        'メイド長',
      ],  //}}}
      'fairy-frontier': [  //{{{
        '密偵',
        '巡礼',
        '家守の精霊',
        '星巫女の託宣',
        '旅芸人',
        '商船団',
        '交易都市',
        '鬼族の戦士',
        '徴税人',
        '合併',
      ],  //}}}
      'fairy-carnival': [  //{{{
        '密偵',
        '春風の妖精',
        '祝福',
        '星巫女の託宣',
        'ギルドマスター',
        '大農園',
        '石弓隊',
        '聖堂騎士',
        'メイド長',
        '収穫祭',
      ],  //}}}
      'fairy-holyornot': [  //{{{
        '密偵',
        '巡礼',
        '家守の精霊',
        'リーフフェアリー',
        'ギルドマスター',
        '氷雪の精霊',
        '御料地',
        '交易都市',
        '収穫祭',
        '裁判官',
      ],  //}}}
      'fairy-fairyandknight': [  //{{{
        '家守の精霊',
        '春風の妖精',
        '祝福',
        'リーフフェアリー',
        '旅芸人',
        'ギルドマスター',
        'ニンフ',
        '大農園',
        '聖堂騎士',
        '合併',
      ],  //}}}
      'championship1-prelims1': [  //{{{
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
      ],  //}}}
      'championship1-prelims2': [  //{{{
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
      ],  //}}}
      'championship1-prelims3': [  //{{{
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
      ],  //}}}
      'championship1-semifinals': [  //{{{
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
      ],  //}}}
      'championship1-finals': [  //{{{
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
      ],  //}}}
      'reference-all-actions':  //{{{
        list(function (c) {return has_type(c, '行動');})
      ,  //}}}
      'reference-plain-actions':  //{{{
        list(function (c) {
          return has_type(c, '行動') &&
            !has_type(c, '攻撃') &&
            !has_type(c, '防衛');
        })
      ,  //}}}
      'reference-attacks':  //{{{
        list(function (c) {return has_type(c, '攻撃');})
      ,  //}}}
      'reference-defenses':  //{{{
        list(function (c) {return has_type(c, '防衛');})
      ,  //}}}
      'reference-territories':  //{{{
        list(function (c) {return has_type(c, '領地');})
      ,  //}}}
      'reference-authorities':  //{{{
        list(function (c) {return has_type(c, '継承権');})
      ,  //}}}
      'reference-curses':  //{{{
        list(function (c) {return has_type(c, '呪い');})
      ,  //}}}
      'reference-princesses':  //{{{
        list(function (c) {return has_type(c, 'プリンセス');})
      ,  //}}}
      'reference-subtype-army':  //{{{
        list(function (c) {return has_subtype(c, '兵力');})
      ,  //}}}
      'reference-subtype-trick':  //{{{
        list(function (c) {return has_subtype(c, '計略');})
      ,  //}}}
      'reference-subtype-magic':  //{{{
        list(function (c) {return has_subtype(c, '魔法');})
      ,  //}}}
      'reference-subtype-merchant':  //{{{
        list(function (c) {return has_subtype(c, '商人');})
      ,  //}}}
      'reference-subtype-maid':  //{{{
        list(function (c) {return has_subtype(c, '侍女');})
      ,  //}}}
      'reference-cost2':  //{{{
        list(function (c) {return costs(c, 2);})
      ,  //}}}
      'reference-cost3':  //{{{
        list(function (c) {return costs(c, 3);})
      ,  //}}}
      'reference-cost4':  //{{{
        list(function (c) {return costs(c, 4);})
      ,  //}}}
      'reference-cost5':  //{{{
        list(function (c) {return costs(c, 5);})
      ,  //}}}
      'reference-cost6':  //{{{
        list(function (c) {return costs(c, 6);})
      ,  //}}}
      'reference-cost7ormore':  //{{{
        list(function (c) {return 7 <= c.cost;})
      ,  //}}}
      'reference-link0':  //{{{
        list(function (c) {return links(c, 0);})
      ,  //}}}
      'reference-link1':  //{{{
        list(function (c) {return links(c, 1);})
      ,  //}}}
      'reference-link2':  //{{{
        list(function (c) {return links(c, 2);})
      ,  //}}}
      'reference-unplayable':  //{{{
        list(function (c) {return c.link === undefined;})
      ,  //}}}
      'reference-basic':  //{{{
        list(function (c) {return included(c, H.EID_BASIC);})
      ,  //}}}
      'reference-fareast':  //{{{
        list(function (c) {return included(c, H.EID_FAREAST);})
      ,  //}}}
      'reference-northern':  //{{{
        list(function (c) {return included(c, H.EID_NORTHERN);})
      ,  //}}}
      'reference-fairy':  //{{{
        list(function (c) {return included(c, H.EID_FAIRY);})
      ,  //}}}
      'reference-rarity-basic':  //{{{
        list(function (c) {return c.rarity == 'B';})
      ,  //}}}
      'reference-rarity-common':  //{{{
        list(function (c) {return c.rarity == 'C';})
      ,  //}}}
      'reference-rarity-rare':  //{{{
        list(function (c) {return c.rarity == 'R';})
      ,  //}}}
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
    '_random-14': 'supply:random14',
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
      'reference:princesses'
    ],  //}}}
    'references:subtype': [  //{{{
      'reference:subtype-army',
      'reference:subtype-trick',
      'reference:subtype-magic',
      'reference:subtype-merchant',
      'reference:subtype-maid',
    ],  //}}}
    'references:cost': [  //{{{
      'reference:cost2',
      'reference:cost3',
      'reference:cost4',
      'reference:cost5',
      'reference:cost6',
      'reference:cost7ormore'
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
      'reference:fairy'
    ],  //}}}
    'references:rarity': [  //{{{
      'reference:rarity-basic',
      'reference:rarity-common',
      'reference:rarity-rare'
    ],  //}}}
    '': []  // Dummy entry to make folds simple.
  };

  H.PID_TO_PARENT_PID_TABLE =  //{{{2
    (function () {
      var t = {};
      for (var parent_pid in H.PID_TO_CHILD_PIDS_TABLE) {
        var child_pids = H.PID_TO_CHILD_PIDS_TABLE[parent_pid];
        for (var i in child_pids)
          t[child_pids[i]] = parent_pid;
      }
      return t;
    })();

  H.PID_TO_META_TABLE =  {  //{{{2
    'home': {  //{{{
      title: 'ハトクランダム'
    },  //}}}
    'about': {  //{{{
      title: 'このアプリについて'
    },  //}}}
    'credits': {  //{{{
      title: 'バージョン情報'
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
      title: '呪いカード一覧'
    },  //}}}
    'reference:princesses': {  //{{{
      title: 'プリンセスカード一覧'
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
    'references:rarity': {  //{{{
      title: 'レアリティ別カードリスト'
    },  //}}}
    'reference:rarity-basic': {  //{{{
      title: 'ベーシックマーケットのカード一覧'
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
        t[value] = parseInt(key);
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
    if (checked)
      this.attr('checked', 'checked');
    else
      this.removeAttr('checked');
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
    H.Error.call(
      this,
      key_name + ' ' + JSON.stringify(key_value) + ' is not valid.'
    );
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
    if (card === undefined)
      throw new H.KeyError('CID', cid);
    return card;
  };

  H.card_names_from_psid = function (psid) {  //{{{2
    var card_names = H.PSID_TO_CARD_NAMES_TABLE[psid];
    if (card_names === undefined)
      throw new H.KeyError('PSID', psid);
    return card_names;
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
    }
    var selected_cards;

    var ok_count = 0;
    var try_count = options.try_count || H.DEFAULT_OPTIONS;
    for (var t = 1; t <= try_count; t++) {
      var rest_cards = available_cards.slice(0);
      if (options.exclude_banned_cards)
        rest_cards = $.grep(rest_cards, H.not(H.is_banned_card));
      rest_cards = filter_by_eid(rest_cards, options.include_basic != 'must_not', H.EID_BASIC);
      rest_cards = filter_by_eid(rest_cards, options.include_fareast != 'must_not', H.EID_FAREAST);
      rest_cards = filter_by_eid(rest_cards, options.include_northern != 'must_not', H.EID_NORTHERN);
      rest_cards = filter_by_eid(rest_cards, options.include_fairy != 'must_not', H.EID_FAIRY);

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
      if (options.include_all_costs) {
        var costs = {};
        for (var i in selected_cards)
          costs[selected_cards[i].cost] = true;
        if (!(costs[2] && costs[3] && costs[4] && (costs[5] || costs[6])))
          continue;
      }
      if (options.include_link_2) {
        var links = {};
        for (var i in selected_cards)
          links[selected_cards[i].link] = true;
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

    if (0 <= types.indexOf('呪い'))
      return '呪い';

    if (0 <= types.indexOf('プリンセス'))
      return 'プリンセス';

    if (0 <= types.indexOf('?'))
      return '?';

    throw new H.Error(
      JSON.stringify(types)
      + ' is not a valid type definition.'
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

  H.is_psid = function (sid) {  //{{{2
    return !!(H.PSID_TO_CARD_NAMES_TABLE[sid]);
  };

  H.is_rsid = function (sid) {  //{{{2
    // NB: This is not perfect -- the given sid might be invalid as an rsid.
    return !H.is_psid(sid);
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

  H.parent_pid_from_pid = function (pid) {  //{{{2
    var parend_pid = H.PID_TO_PARENT_PID_TABLE[pid];
    if (parend_pid === undefined) {
      if (/^supply:/.test(pid)) {
        var maybe_rsid = H.sid_from_pid(pid);
        if (H.is_rsid(maybe_rsid)) {
          var previous = $m.urlHistory.getPrev();
          if (previous) {
            // An rsid page might be visited from anywhere.  If a previous
            // page exists, it means that the previous page contains a link to
            // the current page.  Use the pid of the previous page.
            return H.pid_from_url($m.path.parseUrl(previous.url));
          } else {
            // But, in most cases, an rsid page is directly visited from the
            // outside of the application, for example, Twitter.  In this
            // case, there is no suitable page as the parent of the current
            // page.  Return undefined to indicate the absence of the parent.
            return undefined;
          }
        }
      }
      throw new H.KeyError('PID', pid);
    }
    return parend_pid;
  };

  H.parse_dsid = function (sid) {  //{{{2
    var match;

    match = /^random(\d\d)(:(.*))?$/.exec(sid);
    if (match) {
      return {
        valid: true,
        count: parseInt(match[1]),
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
    return pid == '' ? 'home' : pid;
  };

  H.render = function (tid, data) {  //{{{2
    var _data = data || {};
    return $(
      $('#' + tid).html().replace(
        /{{([^{}]+)}}/g,
        function (_, key) {
          var value = _data[key];
          return value == null ? '{{-' + key + '-}}' : value;
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
    return $.map(H.card_names_from_psid(psid), function (card_name) {
      return H.xcard_from_card(H.card_from_card_name(card_name));
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
    if (bs.length != 0) {
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
  H.complete_header = function (e, data) {  //{{{2
    var $page =
      typeof data.toPage == 'string'
      ? $('#' + (data.toPage == '/' ? 'home' : data.toPage))
      : data.toPage;
    if ($page.length == 0)
      return;
    if ($page.jqmData('role') == 'dialog')
      return;
    if ($page.find(':jqmData(role="header")').length != 0)
      return;

    var $header = H.render('header_template');

    var sid = $page.jqmData('sid');
    var $buttons = $header.find('.button');
    $buttons.click(function () {
      setTimeout(
        function () {
          $buttons.removeClass($m.activeBtnClass);
        },
        300
      );
    });

    var $reshuffle_button = $header.find('.reshuffle.button');
    if (H.is_dsid(sid)) {
      $reshuffle_button.click(function () {
        H.refresh_supply_view(
          $m.activePage.find('.supply'),
          H.xcards_from_sid(sid),
          sid,
          false
        );
      });
    } else {
      $reshuffle_button.addClass('disabled');
    }

    var $share_button = $header.find('.share.button');
    if ($page.attr('id') == 'supply') {
      $share_button.click(function (e) {
        // iPhone Safari seems not to trigger a click event for <a> if the
        // element has a href attribute.  So that we have to explicitly open
        // a new window instead of to set a permalink to the href attribute and
        // to let the Web browser open the permalink.
        var permalink = H.generate_permalink($page);
        var is_reference_page = /^reference-/.test($page.jqmData('sid'));
        window.open(
          [
            'https://twitter.com/intent/tweet',
            '?url=', encodeURIComponent(permalink),
            '&text=', encodeURIComponent(
              is_reference_page
              ? 'ハトクラの' + $page.jqmData('title')
              : 'ハトクラなう。今回のサプライ: '
                + H.list_card_names($page).join(', ')
            ),
            '&hashtags=', encodeURIComponent('hatokura'),
            '&related=', encodeURIComponent('HeartofCrown')
          ].join('')
        );
        e.preventDefault();
      });
    } else {
      $share_button.addClass('disabled');
    }

    $page.prepend($header);
    $page.jqmData(
      'title',
      $page.jqmData('title') || H.meta_from_pid($page.attr('id')).title
    );
    $page.page();
    $page.trigger('pagecreate');
  };

  H.generate_permalink = function ($supply_page) {  //{{{2
    var sid = $supply_page.jqmData('sid');
    if (!H.is_dsid(sid))
      return location.href;

    var $supply = $supply_page.find('.supply');
    var xcards = H.xcards_from_supply_view($supply);
    var rsid = H.rsid_from_xcards(
      sid == 'editor'
      ? $.grep(xcards, function (xcard) {return !xcard.dropped;})
      : xcards
    );
    var base_uri = $m.path.parseUrl(location.href).hrefNoHash;
    return base_uri + '#supply:' + rsid;
  };

  H.list_card_names = function ($supply_page) {  //{{{2
    var $supply = $supply_page.find('.supply');
    return $.map(
      $.grep(
        H.xcards_from_supply_view($supply),
        function (xcard) {return !xcard.dropped;}
      ),
      function (xcard) {return xcard.name;}
    );
  };

  H.load_options = function (kw) {  //{{{2
    for (var key in H.DEFAULT_OPTIONS) {
      var saved_value = $.cookie(key);
      var value =
        saved_value == null
        ? H.DEFAULT_OPTIONS[key]
        : JSON.parse(saved_value);

      H.options[key] = value;

      var $input =
        $('#configure :input')
        .filter(function () {return $(this).attr('name') == key;});
      if ($input.length == 0)
        ;  // There is no form; it's an internal option.
      else if ($input.is(':checkbox'))
        $input.check(value);
      else if ($input.is('select'))
        $input.val(value);
      else
        throw new H.Error('Form for "' + key + '" is not supported.');

      if (kw.is_resetting) {
        $input.trigger('change', kw);
        if ($input.is(':checkbox'))
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

  H.prepare_supplies_page = function (e, data, pid) {  //{{{2
    // NB: The structures of "card-references" and "references:*" are the same,
    // so that it would be better to use #supplies for "card-references" for
    // simplicity, but it is not acceptable.  Because jQuery Mobile's
    // transisions assume that fromPage and toPage are different, and
    // "card-references" has several links to "references:*".  If #supplies is
    // also used for "card-references", page transition between
    // "card-references" and "references:*" becomes broken.
    var $page =
      pid == 'card-references'
      ? $('#card-references')
      : $('#supplies');

    // See also [DOUBLE_TROUBLE].
    if (pid != $page.jqmData('pid')) {
      var meta = H.meta_from_pid(pid);
      var child_pids = H.child_pids_from_pid(pid);

      var $content = H.render('supplies_template');
      var $supplies = $content.find('.supplies');
      for (var i in child_pids) {
        var child_pid = child_pids[i];
        var child_meta = H.meta_from_pid(child_pid);
        $supplies.append(H.render('supplies_item_template', {
          pid: child_pid,
          title: child_meta.title
        }));
      }

      $page
        .empty()
        .append($content);
      $page.jqmData('title', meta.title);
      $page.page();
      $page.trigger('pagecreate');
    }

    data.options.dataUrl = data.toPage;
    $m.changePage($page, data.options);
    e.preventDefault();
  };

  H.prepare_supply_page = function (e, data, pid) {  //{{{2
    var $page = $('#supply');
    var sid = H.sid_from_pid(pid);

    // [DOUBLE_TROUBLE] For some reason, pagebeforechange and some events are
    // triggered twice by using the back/forward buttons in Web browsers.  To
    // avoid unnecessary recreation and reshuffling a random supply twice,
    // keep the curent content of $page if possible.
    if (sid != $page.jqmData('sid')) {
      var meta = H.meta_from_pid(pid);
      var initial_xcards = H.xcards_from_sid(sid);

      var $content = H.render('supply_template');
      var $supply = $content.find('.supply');
      H.refresh_supply_view($supply, initial_xcards, sid, true);

      // FIXME: DRY
      // The tails of H.prepare_supplies_page and H.prepare_supply_page
      // are almost same.
      $page
        .empty()
        .append($content);
      $page.jqmData('sid', sid);
      $page.jqmData('title', meta.title);
      $page.page();
      $page.trigger('pagecreate');
    }

    data.options.dataUrl = data.toPage;
    $m.changePage($page, data.options);
    e.preventDefault();
  };

  H.prepare_other_page = function (e, data, pid) {  //{{{2
    var new_pid = H.migrate_from_version_1(pid);
    if (new_pid) {
      var base_uri = $m.path.parseUrl(location.href).hrefNoHash;
      location.replace(base_uri + '#' + new_pid);
    }
  };

  H.refresh_supply_view = function ($supply, xcards, sid, is_first) {  //{{{2
    var refresh_if_dropped = function () {
      var updated_xcards = H.xcards_from_supply_view($supply);
      H.refresh_supply_view($supply, updated_xcards, sid, false);
    };
    var oo = Number.MAX_VALUE;
    var sorted_xcards =
      H.order_by(
        xcards,
        function (xcard) {return xcard.dropped ? 2 : 1;},
        function (xcard) {return xcard.cost === undefined ? oo : xcard.cost;},
        function (xcard) {return xcard.link === undefined ? oo : xcard.link;},
        function (xcard) {return xcard.name === '???' ? 2 : 1;},
        function (xcard) {return xcard.name;}
      );
    var editable = 10 < xcards.length && H.is_dsid(sid);
    $supply.empty();
    $.each(sorted_xcards, function (i, xcard) {
      var $xcard =
        H.render(
          'supply_item_template',
          $.extend(
            {
              cost: '?',
              dominant_type: H.dominant_type_from_types(xcard.types),
              subtype: ''
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
        $supply.append(H.render('supply_deadline_template'));
      $supply.append($xcard);
    });
    if (!is_first)
      $supply.listview('refresh');
    $('#supply_status i').attr(
      'class',
      xcards.fallback ? 'icon-exclamation-sign' : 'icon-ok-sign'
    );
  };

  H.reset_options = function () {  //{{{2
    for (var key in H.DEFAULT_OPTIONS)
      $.cookie(key, undefined);

    H.load_options({is_resetting: true});
  };

  H.save_option = function (key, value) {  //{{{2
    H.options[key] = value;
    $.cookie(key, JSON.stringify(value), {expires: 365});

    if (H.options.include_basic == 'must_not'
        && H.options.include_fareast == 'must_not'
        && H.options.include_northern == 'must_not'
        && H.options.include_fairy == 'must_not') {
      $('#configure [name="include_basic"]').val('may').change();
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

  H.xcards_from_supply_view = function ($supply) {  //{{{2
    return $supply.find('.card').map(function () {
      var $card = $(this);
      var xcard = H.xcard_from_card(H.card_from_cid($card.data('cid')));
      xcard.dropped = $card.find('.selected:checkbox:checked').length == 0;
      return xcard;
    }).get();
  };

  // Events  //{{{1
  if (H.is_running_specs())  //{{{2
    return;  // Do not register event handlers to avoid interference on specs.
  $(document).bind('pagebeforechange', function (e, data) {  //{{{2
    try {
      if (typeof data.toPage != 'string')
        return;

      if (!$m.path.isSameDomain(data.toPage, location.href))
        return;

      var url = $m.path.parseUrl(data.toPage);
      var pid = H.pid_from_url(url);
      var prepare = (function () {
        var apid = H.apid_from_pid(pid);
        if (apid == 'supplies'
            || apid == 'references'
            || apid == 'card-references')
          return H.prepare_supplies_page;
        else if (apid == 'supply' || apid == 'reference')
          return H.prepare_supply_page;
        else
          return H.prepare_other_page;
      })();

      prepare(e, data, pid);
    } catch (ex) {
      alert('Unexpected error: ' + ex.message);  // TODO: Friendly instruction.
      e.preventDefault();
    }
  });

  $(document).bind('pagebeforechange', function (e, data) {  //{{{2
    H.complete_header(e, data);
  });

  $(document).bind('swipeleft', function () {  //{{{2
    history.forward();
  });

  $(document).bind('swiperight', function () {  //{{{2
    history.back();
  });

  $(document).ready(function () {  //{{{2
    $.mobile.defaultPageTransition = 'slide';

    H.patch_the_title_for_the_initial_page();

    $('#configure :checkbox').change(function (e, kw) {
      if (!(kw && kw.is_resetting)) {
        var $input = $(e.target);
        H.save_option($input.attr('name'), $input.isChecked());
      }
    });
    $('#configure select').change(function (e, kw) {
      if (!(kw && kw.is_resetting)) {
        var $input = $(e.target);
        H.save_option($input.attr('name'), $input.val());
      }
    });
    H.load_options({is_resetting: false});

    $('#configure #button_to_reset_options').click(function (e) {
      H.reset_options();
      alert('初期設定に戻しました。');
    });

    if (navigator.userAgent.match(/OS (\S)+ like Mac OS X/i))
      $('body').addClass('iOS');

    var notification_table = {
      'checking': 'icon-signal',
      'error': 'icon-exclamation-sign',
      'noupdate': 'icon-ok-sign',
      'downloading': 'icon-download-alt',
      'progress': 'icon-download-alt',
      'updateready': 'icon-ok-sign',
      'cached': 'icon-ok-sign',
      'obsolete': 'icon-exclamation-sign'
    };
    $.each(notification_table, function (event_type, icon_class) {
      $(window.applicationCache).bind(event_type, function (e) {
        $('#notification #offline_mode').attr('class', event_type);
        $('#notification #offline_mode i').attr('class', icon_class);
        $('#notification #offline_mode .progress')
          .text(
            event_type == 'progress'
            ? [e.originalEvent.loaded, '/', e.originalEvent.total].join('')
            : ''
          );
      });
    });
  });
  //}}}1
})(hatokurandom, jQuery, jQuery.mobile);

// __END__  {{{1
// vim: expandtab shiftwidth=2 softtabstop=2
// vim: foldmethod=marker
