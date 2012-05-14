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
    'championship-prelims1': [  //{{{
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
    'championship-prelims2': [  //{{{
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
    'championship-prelims3': [  //{{{
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
    'championship-semifinals': [  //{{{
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
    'championship-finals': [  //{{{
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
    '': []
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

  H.BASE64XML_DECODING_TABLE =  //{{{2
    (function () {
      var t = {};
      $.each(H.BASE64XML_ENCODING_TABLE, function (key, value) {
        t[value] = parseInt(key);
      });
      return t;
    })();

  // Utilities  //{{{1
  H.get_current_pid = function () {  //{{{2
    return location.hash.replace('#_', '');
  };

  H.cards_from_supply_data = function (supply_data) {  //{{{2
    return $.map(
      supply_data,
      function (dropped_status, card_id) {
        return $.extend(
          {
            dropped: dropped_status
          },
          H.CID_TO_CARD_TABLE[card_id]
        );
      }
    );
  };

  H.render = function (tid, data) {  //{{{2
    return $(
      $('#' + tid).html().replace(
        /{{([^{}]+)}}/g,
        function (_, key) {
          return data[key];
        }
      )
    )
  };

  H.replace_content = function ($page, cards) {  //{{{2
    var _cards = cards.slice(0);
    _cards.sort(function (c1, c2) {
      var r;

      r = (c1.dropped ? 1 : 0) - (c2.dropped ? 1 : 0);
      if (r != 0)
        return r;

      r = c1.cost - c2.cost;
      if (r != 0)
        return r;

      r = c1.link - c2.link;
      if (r != 0)
        return r;

      if (c1.name < c2.name)
        return -1;
      if (c1.name > c2.name)
        return 1;
      return 0;
    });

    var list_to = function ($page, $rendered) {
      $rendered
        .appendTo($page)
        .hide()
        .fadeIn(350);
    };

    $page
      .children()
      .fadeOut(150)
      .promise()
      .done(function () {
        var is_random_mode = /^random-/.test($page.attr('id'));
        $(this).remove();
        $.each(_cards, function (i, c) {
          if (i % 5 == 0) {
            list_to($page, H.render('separator-template', {
              label: (i + 1) + '-' + Math.min((i + 5), _cards.length)
            }));
          }
          var $card = H.render('card-template', c);
          if (c.dropped) {
            $card.find('.dropped:checkbox').attr('checked', 'checked');
            $card.addClass('dropped');
          }
          list_to($page, $card);
        });

        var droppable = 10 < cards.length && is_random_mode;
        var $dropped_checkboxes = $page.find('.dropped:checkbox');
        if (droppable) {
          $page.addClass('droppable');
          $dropped_checkboxes
            .change(function () {
              H.replace_content(
                $page,
                H.cards_from_supply_data(H.gather_supply_data())
              );
            });
        } else {
          $dropped_checkboxes.attr('disabled', 'disabled');
        }
      });
  };

  H.choose_a_random_supply = function (count) {  //{{{2
    var rest_cards = H.CARDS.slice(0);
    var cs = [];
    for (var i = 1; i <= count; i++) {
      var j = Math.floor(Math.random() * rest_cards.length);
      var c = rest_cards[j];
      rest_cards.splice(j, 1);
      cs.push(c);
    }
    return cs;
  };

  H.choose_a_predefined_supply = function (psid) {  //{{{2
    var card_names = H.PSID_TO_CARD_NAMES_TABLE[psid];
    console.log(psid);
    console.log(card_names);
    if (!card_names) {
      alert('Error: No such predefined supply "' + psid + '"');
      return [];
    }

    var cs =
      $.map(card_names, function (n) {
        var c = H.CARD_NAME_TO_CARD_TABLE[n];
        if (c == null) {
          alert('Error: No such card "' + n + '"');
          return null;
        }
        return c;
      });
    return $.grep(cs, function (c) {return c != null;});
  };

  H.show_the_current_supply = function () {  //{{{2
    if (/^#_supply\./.test(location.hash)) {
      var supply_data =
        H.decode_random_supply_from_rsid(location.hash.replace('#_supply.', ''));
      if (supply_data == null) {
        iui.showPageById('home');
        return;
      }

      var $page = H.render('supply-page-template', {pid: H.get_current_pid()});
      $('body').append($page);
      H.replace_content(
        $page,
        H.cards_from_supply_data(supply_data)
      );
    } else if (/^#_/.test(location.hash)) {
      $('.generate').filter(function () {
        return $(this).attr('href') == '#' + H.get_current_pid();
      }).click();
    } else {
      // The currently accessed URI might not be a supply page.  Do nothing.
    }
  };

  H.gather_supply_data = function () {  //{{{2
    var pid = H.get_current_pid();
    var table = {};  // card_id => dropped_status
    $('body > *')
      .filter(function () {return $(this).attr('id') == pid;})
      .find('.card')
      .each(function () {
        table[$(this).find('.cid').text()] =
          $(this).find('.dropped:checkbox').attr('checked') == 'checked';
      });
    return table;
  };

  H.generate_rsid = function (supply_data) {  //{{{2
    // permalink_id = version card*
    // card = dropped_status card_id
    //
    // version: 6 bit
    // dropped_status: 1 bit
    // card_id: 11 bit

    var buffer = [];  // each element is a 6-bit number.
    var card_ids = $.map(supply_data, function (_, card_id) {return card_id;});
    card_ids.sort();

    buffer.push(0x01);  // version
    $.each(card_ids, function (_, card_id) {
      var dropped_status = supply_data[card_id] ? 0x01 : 0x00;
      buffer.push((dropped_status << 5) | (card_id >> 6));
      buffer.push(card_id & ((1 << 6) - 1));
    });

    return $.map(
      buffer,
      function (b) {return H.BASE64XML_ENCODING_TABLE[b];}
    ).join('');
  };

  H.generate_permalink = function (supply_data) {  //{{{2
    return location.href.replace(
      /#.*$/,
      '#_supply.' + H.generate_rsid(supply_data)
    );
  };

  H.decode_random_supply_from_rsid = function (rsid) {  //{{{2
    var buffer =
      $.map(
        rsid.split(''),
        function (c) {return H.BASE64XML_DECODING_TABLE[c];}
      );

    var version = buffer.shift();
    if (version != 0x01) {
      alert('Error: Invalid supply version: ' + version);
      return null;
    }

    var supply_data = {};

    while (2 <= buffer.length) {
      var b1 = buffer.shift();
      var b2 = buffer.shift();
      var dropped_status = !!(b1 >> 5);
      var card_id = ((b1 & ((1 << 5) - 1)) << 5) | b2;
      supply_data[card_id] = dropped_status;
    }

    if (buffer.length != 0) {
      alert('Error: Trailing characters in supply id');
      return null;
    }

    return supply_data;
  };

  // Bootstrap  //{{{1
  $(document).ready(function () {
    // Create a page for each supply.
    $('.generate').each(function () {
      var pid = $(this).attr('href').substring(1);
      $('body').append(
        $('<ul>')
        .attr('id', pid)
        .attr('title', $.trim($(this).text()))
      );
    });

    $('.generate').click(function () {
      var pid = $(this).attr('href').substring(1);
      var $page = $('#' + pid);
      if (/^random-/.test(pid)) {
        var count = pid.substring('random-'.length);
        H.replace_content($page, H.choose_a_random_supply(count));
      } else {
        var psid = pid;
        H.replace_content($page, H.choose_a_predefined_supply(psid));
      }
    });

    $('#share').click(function () {
      var permalink = H.generate_permalink(H.gather_supply_data());
      $(this).attr(
        'href',
        'https://twitter.com/intent/tweet' +
          '?url=' +
            encodeURIComponent(permalink) +
          '&text=' +
            encodeURIComponent('ハトクラなう。今回のサプライ:') +
          '&related=' +
            encodeURIComponent('HeartofCrown,kana1')
      );
    });

    $('#regenerate').click(function (e) {
      H.show_the_current_supply();
      e.preventDefault();
    });

    $(window).bind('hashchange', function () {
      var $footer = $('body > .footer');
      if (/^#_random-/.test(location.hash))
        $footer.fadeIn('fast');
      else
        $footer.fadeOut('fast');
    });
    $(window).trigger('hashchange');

    // Show a supply if the current page is directly opened via bookmarks etc.
    H.show_the_current_supply();
  });  //}}}1
})(hatokurandom, jQuery);

// __END__  {{{1
// vim: expandtab shiftwidth=2 softtabstop=2
// vim: foldmethod=marker
