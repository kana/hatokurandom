var hatokurandom = {};

(function (H, $) {
  // Naming convensions  //{{{1
  //
  // cid: Card ID
  // eid: Expansion ID
  // sid: Supply ID
  // rsid: Random Supply ID
  // psid: Predefined Supply ID
  // tid: Template ID
  // pid: Page ID

  // Constants  //{{{1
  H.EXPANSIONS = [  //{{{2
    {eid: 1, name: '基本セット'},
    {eid: 2, name: '極東辺境領'}
  ];

  H.CARDS = [  // Sorted by eid, cost, link, then name.  //{{{2
    {eid: 1, cost: 2, link: 1, cid: 0x01, name: '城壁', type: '行動・防衛'},
    {eid: 1, cost: 2, link: 1, cid: 0x02, name: '寄付', type: '行動'},
    {eid: 1, cost: 2, link: 1, cid: 0x03, name: '願いの泉', type: '行動'},
    {eid: 1, cost: 2, link: 2, cid: 0x04, name: '斥候', type: '行動・攻撃（兵力）'},
    {eid: 1, cost: 2, link: 2, cid: 0x05, name: '早馬', type: '行動'},
                               
    {eid: 1, cost: 3, link: 0, cid: 0x06, name: '交易船', type: '行動（商人）'},
    {eid: 1, cost: 3, link: 0, cid: 0x07, name: '埋もれた財宝', type: '行動'},
    {eid: 1, cost: 3, link: 0, cid: 0x08, name: '御用商人', type: '行動（商人）'},
    {eid: 1, cost: 3, link: 1, cid: 0x09, name: '召集令状', type: '行動'},
    {eid: 1, cost: 3, link: 1, cid: 0x0a, name: '焼き畑農業', type: '行動'},
    {eid: 1, cost: 3, link: 1, cid: 0x0b, name: '破城槌', type: '行動'},
    {eid: 1, cost: 3, link: 1, cid: 0x0c, name: '買収工作', type: '行動・攻撃（計略）'},
    {eid: 1, cost: 3, link: 1, cid: 0x0d, name: '隠れ家', type: '行動・防衛'},
    {eid: 1, cost: 3, link: 1, cid: 0x0e, name: '魔法の護符', type: '行動・防衛・呪い'},
                               
    {eid: 1, cost: 4, link: 0, cid: 0x0f, name: '歩兵大隊', type: '行動・攻撃（兵力）'},
    {eid: 1, cost: 4, link: 1, cid: 0x10, name: '図書館', type: '行動'},
    {eid: 1, cost: 4, link: 1, cid: 0x11, name: '追い立てられた魔獣', type: '行動・攻撃（計略）'},
    {eid: 1, cost: 4, link: 1, cid: 0x12, name: '都市開発', type: '行動（商人）'},
    {eid: 1, cost: 4, link: 1, cid: 0x13, name: '金貸し', type: '行動（商人）'},
    {eid: 1, cost: 4, link: 1, cid: 0x14, name: '魅了術の魔女', type: '行動・攻撃（魔法）'},
    {eid: 1, cost: 4, link: 2, cid: 0x15, name: 'シノビ', type: '行動（計略）'},
    {eid: 1, cost: 4, link: 2, cid: 0x16, name: '星詠みの魔女', type: '行動（魔法）'},
    {eid: 1, cost: 4, link: 2, cid: 0x17, name: '補給部隊', type: '行動（兵力）'},
                               
    {eid: 1, cost: 5, link: 0, cid: 0x18, name: '冒険者', type: '行動'},
    {eid: 1, cost: 5, link: 0, cid: 0x19, name: '呪詛の魔女', type: '行動・攻撃（魔法）'},
    {eid: 1, cost: 5, link: 0, cid: 0x1a, name: '近衛騎士団', type: '行動・攻撃（兵力）'},
    {eid: 1, cost: 5, link: 0, cid: 0x1b, name: '銀行', type: '行動（商人）'},
    {eid: 1, cost: 5, link: 1, cid: 0x1c, name: '皇室領', type: '継承権・領地'},
    {eid: 1, cost: 5, link: 1, cid: 0x1d, name: '錬金術師', type: '行動'},
                               
    {eid: 1, cost: 6, link: 0, cid: 0x1e, name: '噂好きの公爵夫人', type: '継承権'},
                               
    {eid: 2, cost: 2, link: 0, cid: 0x1f, name: 'お金好きの妖精', type: '行動（魔法）'},
                               
    {eid: 2, cost: 3, link: 0, cid: 0x20, name: '課税', type: '行動'},
    {eid: 2, cost: 3, link: 0, cid: 0x21, name: '貿易商人', type: '行動（魔法）'},
    {eid: 2, cost: 3, link: 1, cid: 0x22, name: '伝書鳩', type: '行動（計略）'},
    {eid: 2, cost: 3, link: 1, cid: 0x23, name: '弓兵隊', type: '行動（兵力）'},
                               
    {eid: 2, cost: 4, link: 0, cid: 0x24, name: 'サムライ', type: '行動・攻撃（兵力）'},
    {eid: 2, cost: 4, link: 1, cid: 0x25, name: 'クノイチ', type: '行動・防衛（計略）'},
    {eid: 2, cost: 4, link: 1, cid: 0x26, name: '見習い魔女', type: '行動・攻撃（魔法）'},
    {eid: 2, cost: 4, link: 1, cid: 0x27, name: '鉱山都市', type: '領地'},
    {eid: 2, cost: 4, link: 2, cid: 0x28, name: '港町', type: '領地'},
                               
    {eid: 2, cost: 5, link: 0, cid: 0x29, name: '割り符', type: '行動（商人）'},
    {eid: 2, cost: 5, link: 2, cid: 0x2a, name: '結盟', type: '行動'}
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

  // Utilities  //{{{1
  H.render = function (tid, data) {  //{{{2
    var _data = data || {};
    return $(
      $('#' + tid).html().replace(
        /{{([^{}]+)}}/g,
        function (_, key) {
          return _data[key] || '{{-' + key + '-}}';
        }
      )
    );
  };

  // Bootstrap  //{{{1
  $(document).ready(function () {
    $.mobile.defaultPageTransition = 'slide';
  });  //}}}1
})(hatokurandom, jQuery);

// __END__  {{{1
// vim: expandtab shiftwidth=2 softtabstop=2
// vim: foldmethod=marker
