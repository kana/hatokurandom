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

  // Constants  //{{{1
  // Eids  //{{{2
  H.EID_BASIC = 1;
  H.EID_FAREAST = 2;
  H.EID_NORTHERN = 3;

  H.EXPANSIONS = [  //{{{2
    {eid: H.EID_BASIC, name: '基本セット'},
    {eid: H.EID_FAREAST, name: '極東辺境領'},
    {eid: H.EID_NORTHERN, name: '北限の魔女'}
  ];

  H.CARDS = [  // Sorted by eid, cost, link, then name.  //{{{2
    {eid: H.EID_BASIC, cost: 2, link: 1, cid: 0x01, name: '城壁', types: ['行動', '防衛']},
    {eid: H.EID_BASIC, cost: 2, link: 1, cid: 0x02, name: '寄付', types: ['行動']},
    {eid: H.EID_BASIC, cost: 2, link: 1, cid: 0x03, name: '願いの泉', types: ['行動']},
    {eid: H.EID_BASIC, cost: 2, link: 2, cid: 0x04, name: '斥候', types: ['行動', '攻撃'], subtype: '兵力'},
    {eid: H.EID_BASIC, cost: 2, link: 2, cid: 0x05, name: '早馬', types: ['行動']},

    {eid: H.EID_BASIC, cost: 3, link: 0, cid: 0x06, name: '交易船', types: ['行動'], subtype: '商人'},
    {eid: H.EID_BASIC, cost: 3, link: 0, cid: 0x07, name: '埋もれた財宝', types: ['行動']},
    {eid: H.EID_BASIC, cost: 3, link: 0, cid: 0x08, name: '御用商人', types: ['行動'], subtype: '商人'},
    {eid: H.EID_BASIC, cost: 3, link: 1, cid: 0x09, name: '召集令状', types: ['行動']},
    {eid: H.EID_BASIC, cost: 3, link: 1, cid: 0x0a, name: '焼き畑農業', types: ['行動']},
    {eid: H.EID_BASIC, cost: 3, link: 1, cid: 0x0b, name: '破城槌', types: ['行動']},
    {eid: H.EID_BASIC, cost: 3, link: 1, cid: 0x0c, name: '買収工作', types: ['行動', '攻撃'], subtype: '計略'},
    {eid: H.EID_BASIC, cost: 3, link: 1, cid: 0x0d, name: '隠れ家', types: ['行動', '防衛']},
    {eid: H.EID_BASIC, cost: 3, link: 1, cid: 0x0e, name: '魔法の護符', types: ['行動', '防衛', '呪い']},

    {eid: H.EID_BASIC, cost: 4, link: 0, cid: 0x0f, name: '歩兵大隊', types: ['行動', '攻撃'], subtype: '兵力'},
    {eid: H.EID_BASIC, cost: 4, link: 1, cid: 0x10, name: '図書館', types: ['行動']},
    {eid: H.EID_BASIC, cost: 4, link: 1, cid: 0x11, name: '追い立てられた魔獣', types: ['行動', '攻撃'], subtype: '計略'},
    {eid: H.EID_BASIC, cost: 4, link: 1, cid: 0x12, name: '都市開発', types: ['行動'], subtype: '商人'},
    {eid: H.EID_BASIC, cost: 4, link: 1, cid: 0x13, name: '金貸し', types: ['行動'], subtype: '商人'},
    {eid: H.EID_BASIC, cost: 4, link: 1, cid: 0x14, name: '魅了術の魔女', types: ['行動', '攻撃'], subtype: '魔法'},
    {eid: H.EID_BASIC, cost: 4, link: 2, cid: 0x15, name: 'シノビ', types: ['行動'], subtype: '計略'},
    {eid: H.EID_BASIC, cost: 4, link: 2, cid: 0x16, name: '星詠みの魔女', types: ['行動'], subtype: '魔法'},
    {eid: H.EID_BASIC, cost: 4, link: 2, cid: 0x17, name: '補給部隊', types: ['行動'], subtype: '兵力'},

    {eid: H.EID_BASIC, cost: 5, link: 0, cid: 0x18, name: '冒険者', types: ['行動']},
    {eid: H.EID_BASIC, cost: 5, link: 0, cid: 0x19, name: '呪詛の魔女', types: ['行動', '攻撃'], subtype: '魔法'},
    {eid: H.EID_BASIC, cost: 5, link: 0, cid: 0x1a, name: '近衛騎士団', types: ['行動', '攻撃'], subtype: '兵力'},
    {eid: H.EID_BASIC, cost: 5, link: 0, cid: 0x1b, name: '銀行', types: ['行動'], subtype: '商人'},
    {eid: H.EID_BASIC, cost: 5, link: 1, cid: 0x1c, name: '皇室領', types: ['継承権', '領地']},
    {eid: H.EID_BASIC, cost: 5, link: 1, cid: 0x1d, name: '錬金術師', types: ['行動']},

    {eid: H.EID_BASIC, cost: 6, link: 0, cid: 0x1e, name: '噂好きの公爵夫人', types: ['継承権']},

    {eid: H.EID_FAREAST, cost: 2, link: 0, cid: 0x1f, name: 'お金好きの妖精', types: ['行動'], subtype: '魔法'},

    {eid: H.EID_FAREAST, cost: 3, link: 0, cid: 0x20, name: '課税', types: ['行動']},
    {eid: H.EID_FAREAST, cost: 3, link: 0, cid: 0x21, name: '貿易商人', types: ['行動'], subtype: '商人'},
    {eid: H.EID_FAREAST, cost: 3, link: 1, cid: 0x22, name: '伝書鳩', types: ['行動'], subtype: '計略'},
    {eid: H.EID_FAREAST, cost: 3, link: 1, cid: 0x23, name: '弓兵隊', types: ['行動', '攻撃'], subtype: '兵力'},

    {eid: H.EID_FAREAST, cost: 4, link: 0, cid: 0x24, name: 'サムライ', types: ['行動', '攻撃'], subtype: '兵力'},
    {eid: H.EID_FAREAST, cost: 4, link: 1, cid: 0x25, name: 'クノイチ', types: ['行動', '防衛'], subtype: '計略'},
    {eid: H.EID_FAREAST, cost: 4, link: 1, cid: 0x26, name: '見習い魔女', types: ['行動', '攻撃'], subtype: '魔法'},
    {eid: H.EID_FAREAST, cost: 4, link: 1, cid: 0x27, name: '鉱山都市', types: ['領地']},
    {eid: H.EID_FAREAST, cost: 4, link: 2, cid: 0x28, name: '港町', types: ['領地']},

    {eid: H.EID_FAREAST, cost: 5, link: 0, cid: 0x29, name: '割り符', types: ['行動'], subtype: '商人'},
    {eid: H.EID_FAREAST, cost: 5, link: 2, cid: 0x2a, name: '結盟', types: ['行動']}
  ];

  H.CID_TO_CARD_TABLE =  //{{{2
    (function () {
      var t = {};
      $.each(H.CARDS, function (_, c) {
        t[c.cid] = c;
      });
      return t;
    })();

  H.CARD_NAME_TO_CARD_TABLE =  //{{{2
    (function () {
      var t = {};
      $.each(H.CARDS, function (_, c) {
        t[c.name] = c;
      });
      return t;
    })();

  H.DEFAULT_OPTIONS = {  //{{{2
    exclulde_useless_cards: false,
    include_all_costs: false,
    include_link_2: false,
    include_pairs: false,
    use_basic: true,
    use_fareast: true,
    use_northern: true
  };

  H.PSID_TO_CARD_NAMES_TABLE = {  //{{{2
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
    '': []  // Dummy entry to make folds simple.
  };

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
    ],  //}}}
    'supplies:championship1': [  //{{{
      'supply:championship1-prelims1',
      'supply:championship1-prelims2',
      'supply:championship1-prelims3',
      'supply:championship1-semifinals',
      'supply:championship1-finals'
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

  H.PID_TO_META_TABLE = (function () {  //{{{2
    var table = {
      'home': {  //{{{
        long_title: 'ハトクランダム',
        short_title: 'ホーム'
      },  //}}}
      'about': {  //{{{
        long_title: 'このアプリについて',
        short_title: '概要'
      },  //}}}
      'supplies:random': {  //{{{
        long_title: 'ランダムサプライ'
      },  //}}}
      'supply:random10': {  //{{{
        long_title: 'ランダムに10枚選択'
      },  //}}}
      'supply:random12': {  //{{{
        long_title: 'ランダムに12枚選択'
      },  //}}}
      'supply:random13': {  //{{{
        long_title: 'ランダムに13枚選択'
      },  //}}}
      'supply:random14': {  //{{{
        long_title: 'ランダムに14枚選択'
      },  //}}}
      'supplies:basic': {  //{{{
        long_title: '推奨サプライ(基本セット)'
      },  //}}}
      'supply:basic-firstplay': {  //{{{
        long_title: 'ファーストプレイ'
      },  //}}}
      'supply:basic-guide': {  //{{{
        long_title: '入門用'
      },  //}}}
      'supply:basic-guide2': {  //{{{
        long_title: '入門用その2'
      },  //}}}
      'supply:basic-intermediate': {  //{{{
        long_title: '中級用'
      },  //}}}
      'supply:basic-intermediate2': {  //{{{
        long_title: '中級用その2'
      },  //}}}
      'supply:basic-bigbusiness': {  //{{{
        long_title: 'ビッグビジネス'
      },  //}}}
      'supply:basic-greatwar': {  //{{{
        long_title: '大戦争'
      },  //}}}
      'supply:basic-adventure': {  //{{{
        long_title: '冒険行'
      },  //}}}
      'supply:basic-witchcraft': {  //{{{
        long_title: 'ワルプルギスの夜'
      },  //}}}
      'supply:basic-courtpolitics': {  //{{{
        long_title: '宮廷政治'
      },  //}}}
      'supplies:fareast': {  //{{{
        long_title: '推奨サプライ(極東辺境領)'
      },  //}}}
      'supply:fareast-firstplay': {  //{{{
        long_title: '初めてのハトクラ'
      },  //}}}
      'supply:fareast-porttown': {  //{{{
        long_title: '港町の攻防'
      },  //}}}
      'supply:fareast-prosperity': {  //{{{
        long_title: '交易と繁栄'
      },  //}}}
      'supply:fareast-mine': {  //{{{
        long_title: '豊かな鉱脈'
      },  //}}}
      'supply:fareast-citystrife': {  //{{{
        long_title: '都市間抗争'
      },  //}}}
      'supply:fareast-scandal': {  //{{{
        long_title: '開発の醜聞'
      },  //}}}
      'supply:fareast-battlefield': {  //{{{
        long_title: '戦場の絆'
      },  //}}}
      'supply:fareast-guildstrife': {  //{{{
        long_title: 'ギルド間抗争'
      },  //}}}
      'supply:fareast-kunoichi': {  //{{{
        long_title: 'クノイチ忍法帖'
      },  //}}}
      'supply:fareast-moneymoneymoney': {  //{{{
        long_title: '金に色無し'
      },  //}}}
      'supplies:northern': {  //{{{
        long_title: '推奨サプライ(北限の魔女)'
      },  //}}}
      'supplies:championship1': {  //{{{
        long_title: '世界選手権'
      },  //}}}
      'supply:championship1-prelims1': {  //{{{
        long_title: '予選第1回戦'
      },  //}}}
      'supply:championship1-prelims2': {  //{{{
        long_title: '予選第2回戦'
      },  //}}}
      'supply:championship1-prelims3': {  //{{{
        long_title: '予選第3回戦'
      },  //}}}
      'supply:championship1-semifinals': {  //{{{
        long_title: '準決勝'
      },  //}}}
      'supply:championship1-finals': {  //{{{
        long_title: '決勝《王冠の行方》'
      },  //}}}
      '': {}  // Dummy entry to make folds simple.
    };
    for (var pid in table) {
      var meta = table[pid];
      if (meta.short_title === undefined)
        meta.short_title = meta.long_title;
    }
    return table;
  })();

  H.BASE64XML_ENCODING_TABLE = {  //{{{2
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
    0x3c: '8', 0x3d: '9', 0x3e: '.', 0x3f: '-'
  };

  H.BASE64XML_DECODING_TABLE =  //{{{2
    (function () {
      var t = {};
      $.each(H.BASE64XML_ENCODING_TABLE, function (key, value) {
        t[value] = parseInt(key);
      });
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

    var rest_cards = available_cards.slice(0);
    rest_cards = filter_by_eid(rest_cards, options.use_basic, H.EID_BASIC);
    rest_cards = filter_by_eid(rest_cards, options.use_fareast, H.EID_FAREAST);
    rest_cards = filter_by_eid(rest_cards, options.use_northern, H.EID_NORTHERN);

    var selected_cards = [];
    for (var i = 1; i <= count; i++) {
      var j = Math.floor(Math.random() * rest_cards.length);
      var c = rest_cards[j];
      rest_cards.splice(j, 1);
      selected_cards.push(c);
    }
    return selected_cards;
  };

  H.decode_base64xml = function (base64xml_encoded_string) {  //{{{2
    return $.map(
      base64xml_encoded_string.split(''),
      function (c) {
        var b = H.BASE64XML_DECODING_TABLE[c];
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

    throw new H.Error(
      JSON.stringify(types)
      + ' is not a valid type definition.'
    );
  };

  H.encode_base64xml = function (six_bit_buffer) {  //{{{2
    return $.map(
      six_bit_buffer,
      function (b) {
        var c = H.BASE64XML_ENCODING_TABLE[b];
        if (c === undefined)
          throw new H.KeyError('Value', b);
        return c;
      }
    ).join('');
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
      long_title: 'ランダムサプライ',
      short_title: 'ランダムサプライ'
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
    var match = /^random(\d\d)(:(.*))?$/.exec(sid);
    return {
      valid: !!match,
      count: match && parseInt(match[1]),
      rsid: match && match[3]
    };
  };

  H.pid_from_url = function (url) {  //{{{2
    return url.hash.substring(1);
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

    return H.encode_base64xml(bs);
  };

  H.sid_from_pid = function (pid) {  //{{{2
    return pid.replace(/.*:/, '');
  };

  H.xcard_from_card = function (card) {  //{{{2
    return $.extend({dropped: false}, card);
  };

  H.xcards_from_dsid_data = function (dsid_data) {  //{{{2
    if (!dsid_data.valid) {
      return [];
    } else if (dsid_data.rsid) {
      return H.xcards_from_rsid(dsid_data.rsid);
    } else {
      var cards =
        H.choose_random_cards(
          H.CARDS,
          dsid_data.count,
          H.options
        );
      return $.map(cards, H.xcard_from_card);
    }
  };

  H.xcards_from_psid = function (psid) {  //{{{2
    return $.map(H.card_names_from_psid(psid), function (card_name) {
      return H.xcard_from_card(H.card_from_card_name(card_name));
    });
  };

  H.xcards_from_rsid = function (rsid) {  //{{{2
    // An rsid is a string which is encoded from xcards with BASE64XML,
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

    var bs = H.decode_base64xml(rsid);
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
        window.open(
          [
            'https://twitter.com/intent/tweet',
            '?url=', encodeURIComponent(permalink),
            '&text=', encodeURIComponent('ハトクラなう。今回のサプライ:'),
            '&related=', encodeURIComponent('HeartofCrown,kana1')
          ].join('')
        );
        e.preventDefault();
      });
    } else {
      $share_button.addClass('disabled');
    }

    $page.prepend($header);
    $page.page();
    $page.trigger('pagecreate');
  };

  H.generate_permalink = function ($supply_page) {  //{{{2
    var sid = $supply_page.jqmData('sid');
    if (!H.is_dsid(sid))
      return location.href;

    var $supply = $supply_page.find('.supply');
    var rsid = H.rsid_from_xcards(H.xcards_from_supply_view($supply));
    var base_uri = $m.path.parseUrl(location.href).hrefNoHash;
    return base_uri + '#supply:' + rsid;
  };

  H.load_options = function () {  //{{{2
    for (var key in H.DEFAULT_OPTIONS) {
      var saved_value = $.cookie(key);
      var value =
        saved_value == null
        ? H.DEFAULT_OPTIONS[key]
        : JSON.parse(saved_value);
      H.options[key] = value;
      $('#configure input')
        .filter(function () {return $(this).attr('name') == key;})
        .check(value);
    }
  };

  H.prepare_supplies_page = function (e, data, pid) {  //{{{2
    var $page = $('#' + H.apid_from_pid(pid));

    // See also [DOUBLE_TROUBLE].
    if (pid != $page.jqmData('pid')) {
      var meta = H.meta_from_pid(pid);
      var child_pids = H.child_pids_from_pid(pid);

      var $content = H.render('supplies_template', {
        title: meta.long_title
      });
      var $supplies = $content.find('.supplies');
      for (var i in child_pids) {
        var child_pid = child_pids[i];
        var child_meta = H.meta_from_pid(child_pid);
        $supplies.append(H.render('supplies_item_template', {
          pid: child_pid,
          title: child_meta.long_title
        }));
      }

      $page
        .empty()
        .append($content);
      $page.jqmData('title', meta.long_title);
      $page.page();
      $page.trigger('pagecreate');
    }

    data.options.dataUrl = data.toPage;
    $m.changePage($page, data.options);
    e.preventDefault();
  };

  H.prepare_supply_page = function (e, data, pid) {  //{{{2
    var $page = $('#' + H.apid_from_pid(pid));
    var sid = H.sid_from_pid(pid);

    // [DOUBLE_TROUBLE] For some reason, pagebeforechange and some events are
    // triggered twice by using the back/forward buttons in Web browsers.  To
    // avoid unnecessary recreation and reshuffling a random supply twice,
    // keep the curent content of $page if possible.
    if (sid != $page.jqmData('sid')) {
      var meta = H.meta_from_pid(pid);
      var initial_xcards = H.xcards_from_sid(sid);

      var $content = H.render('supply_template', {
        title: meta.long_title
      });
      var $supply = $content.find('.supply');
      H.refresh_supply_view($supply, initial_xcards, sid, true);

      // FIXME: DRY
      // The tails of H.prepare_supplies_page and H.prepare_supply_page
      // are almost same.
      $page
        .empty()
        .append($content);
      $page.jqmData('sid', sid);
      $page.jqmData('title', meta.long_title);
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
    var sorted_xcards =
      H.order_by(
        xcards,
        function (xcard) {return xcard.dropped ? 2 : 1;},
        function (xcard) {return xcard.cost;},
        function (xcard) {return xcard.link;},
        function (xcard) {return xcard.name;}
      );
    $supply.empty();
    $.each(sorted_xcards, function (_, xcard) {
      var $xcard =
        H.render(
          'supply_item_template',
          $.extend(
            {
              dominant_type: H.dominant_type_from_types(xcard.types),
              subtype: ''
            },
            xcard
          )
        );
      $xcard
        .find('.dropped:checkbox')
        .check(xcard.dropped)
        .toggleClass('unavailable', xcards.length <= 10)
        .enable(10 < xcards.length && H.is_dsid(sid))
        .change(refresh_if_dropped);
      $xcard.toggleClass('dropped', xcard.dropped);
      $supply.append($xcard);
    });
    if (!is_first)
      $supply.listview('refresh');
  };

  H.save_option = function (key, value) {  //{{{1
    H.options[key] = value;
    $.cookie(key, JSON.stringify(value), {expires: 365});
  };

  H.xcards_from_supply_view = function ($supply) {  //{{{2
    return $supply.find('.card').map(function () {
      var $card = $(this);
      var xcard = H.xcard_from_card(H.card_from_cid($card.data('cid')));
      xcard.dropped = $card.find('.dropped:checkbox:checked').length != 0;
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
        if (apid == 'supplies')
          return H.prepare_supplies_page;
        else if (apid == 'supply')
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

  $(document).ready(function () {  //{{{2
    $.mobile.defaultPageTransition = 'slide';

    $('#configure input').change(function (e) {
      var $input = $(e.target);
      H.save_option($input.attr('name'), $input.isChecked());
    });
    H.load_options();

    var cache = window.applicationCache;
    var notice = function (message) {
      $('#balloon')
        .empty()
        .append(
          H.render('balloon_message_template', {message: message})
          .delay(3000)
          .fadeOut(500, function () {$(this).remove();})
        );
    };
    $(cache).bind('checking', function (e) {
      notice('更新を確認中……');
    });
    $(cache).bind('error', function (e) {
      notice('オフラインモード利用不可(E)');
    });
    $(cache).bind('noupdate', function (e) {
      notice('Version @@VERSION@@');
    });
    $(cache).bind('downloading', function (e) {
      notice('ダウンロード開始……');
    });
    $(cache).bind('progress', function (e) {
      notice(
        [
          'ダウンロード中…… (',
          e.originalEvent.loaded,
          '/',
          e.originalEvent.total,
          ')'
        ].join('')
      );
    });
    $(cache).bind('updateready', function (e) {
      notice('新バージョン利用準備完了');
    });
    $(cache).bind('cached', function (e) {
      notice('オフラインモード準備完了');
    });
    $(cache).bind('obsolete', function (e) {
      notice('オフラインモード利用不可(O)');
    });
  });
  //}}}1
})(hatokurandom, jQuery, jQuery.mobile);

// __END__  {{{1
// vim: expandtab shiftwidth=2 softtabstop=2
// vim: foldmethod=marker
