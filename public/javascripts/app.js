(function ($) {
  var CARDS = [  //{{{
    {name: '斥候', type: '行動・攻撃（兵力）', cost: 2, link: 2, set: '基本セット'},
    {name: '城壁', type: '行動・防衛', cost: 2, link: 1, set: '基本セット'},
    {name: '早馬', type: '行動', cost: 2, link: 2, set: '基本セット'},
    {name: '寄付', type: '行動', cost: 2, link: 1, set: '基本セット'},
    {name: '願いの泉', type: '行動', cost: 2, link: 1, set: '基本セット'},
    {name: 'お金好きの妖精', type: '行動（魔法）', cost: 2, link: 0, set: '極東辺境領'},

    {name: '召集令状', type: '行動', cost: 3, link: 1, set: '基本セット'},
    {name: '隠れ家', type: '行動・防衛', cost: 3, link: 1, set: '基本セット'},
    {name: '買収工作', type: '行動・攻撃（計略）', cost: 3, link: 1, set: '基本セット'},
    {name: '魔法の護符', type: '行動・防衛・呪い', cost: 3, link: 1, set: '基本セット'},
    {name: '埋もれた財宝', type: '行動', cost: 3, link: 0, set: '基本セット'},
    {name: '御用商人', type: '行動（商人）', cost: 3, link: 0, set: '基本セット'},
    {name: '焼き畑農業', type: '行動', cost: 3, link: 1, set: '基本セット'},
    {name: '交易船', type: '行動（商人）', cost: 3, link: 0, set: '基本セット'},
    {name: '破城槌', type: '行動', cost: 3, link: 1, set: '基本セット'},
    {name: '貿易商人', type: '行動（魔法）', cost: 3, link: 0, set: '極東辺境領'},
    {name: '伝書鳩', type: '行動（計略）', cost: 3, link: 1, set: '極東辺境領'},
    {name: '課税', type: '行動', cost: 3, link: 0, set: '極東辺境領'},
    {name: '弓兵隊', type: '行動（兵力）', cost: 3, link: 1, set: '極東辺境領'},

    {name: '追い立てられた魔獣', type: '行動・攻撃（計略）', cost: 4, link: 1, set: '基本セット'},
    {name: '星詠みの魔女', type: '行動（魔法）', cost: 4, link: 2, set: '基本セット'},
    {name: '補給部隊', type: '行動（兵力）', cost: 4, link: 2, set: '基本セット'},
    {name: '図書館', type: '行動', cost: 4, link: 1, set: '基本セット'},
    {name: '都市開発', type: '行動（商人）', cost: 4, link: 1, set: '基本セット'},
    {name: '魅了術の魔女', type: '行動・攻撃（魔法）', cost: 4, link: 1, set: '基本セット'},
    {name: '歩兵大隊', type: '行動・攻撃（兵力）', cost: 4, link: 0, set: '基本セット'},
    {name: '金貸し', type: '行動（商人）', cost: 4, link: 1, set: '基本セット'},
    {name: 'シノビ', type: '行動（計略）', cost: 4, link: 2, set: '基本セット'},
    {name: '港町', type: '領地', cost: 4, link: 2, set: '極東辺境領'},
    {name: '鉱山都市', type: '領地', cost: 4, link: 1, set: '極東辺境領'},
    {name: '見習い魔女', type: '行動・攻撃（魔法）', cost: 4, link: 1, set: '極東辺境領'},
    {name: 'クノイチ', type: '行動・防衛（計略）', cost: 4, link: 1, set: '極東辺境領'},
    {name: 'サムライ', type: '行動・攻撃（兵力）', cost: 4, link: 0, set: '極東辺境領'},

    {name: '近衛騎士団', type: '行動・攻撃（兵力）', cost: 5, link: 0, set: '基本セット'},
    {name: '銀行', type: '行動（商人）', cost: 5, link: 0, set: '基本セット'},
    {name: '皇室領', type: '継承権・領地', cost: 5, link: 1, set: '基本セット'},
    {name: '呪詛の魔女', type: '行動・攻撃（魔法）', cost: 5, link: 0, set: '基本セット'},
    {name: '冒険者', type: '行動', cost: 5, link: 0, set: '基本セット'},
    {name: '錬金術師', type: '行動', cost: 5, link: 1, set: '基本セット'},
    {name: '結盟', type: '行動', cost: 5, link: 2, set: '極東辺境領'},
    {name: '割り符', type: '行動（商人）', cost: 5, link: 0, set: '極東辺境領'},

    {name: '噂好きの公爵夫人', type: '継承権', cost: 6, link: 0, set: '基本セット'}
  ];  //}}}
  var CARD_TABLE =
    (function () {
      var t = {};
      $.each(CARDS, function (_, c) {
        t[c.name] = c;
      });
      return t;
    })();

  var CARD_NAMES_TABLE = {
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

  var render = function (template_id, data) {
    return $(
      $('#' + template_id).html().replace(
        /{{([^{}]+)}}/g,
        function (_, key) {
          return data[key];
        }
      )
    )
  };

  var replace_content = function ($page, cards) {
    var _cards = cards.slice(0);
    _cards.sort(function (c1, c2) {
      var r = c1.cost - c2.cost;
      if (r != 0)
        return r;
      if (c1.name < c2.name)
        return -1;
      if (c1.name > c2.name)
        return 1;
      return 0;
    });

    var list_to = function ($page, template_id, data) {
      render(template_id, data)
        .appendTo($page)
        .hide()
        .fadeIn(350);
    };

    $page
      .children()
      .fadeOut(150)
      .promise()
      .done(function () {
        $(this).remove();
        $.each(_cards, function (i, c) {
          if (i % 5 == 0) {
            list_to($page, 'separator-template', {
              label: (i + 1) + '-' + Math.min((i + 5), _cards.length)
            });
          }
          list_to($page, 'card-template', c);
        });
      });
  };

  var choose_a_random_supply = function (count) {
    var rest_cards = CARDS.slice(0);
    var cs = [];
    for (var i = 1; i <= count; i++) {
      var j = Math.floor(Math.random() * rest_cards.length);
      var c = rest_cards[j];
      rest_cards.splice(j, 1);
      cs.push(c);
    }
    return cs;
  };

  var choose_a_fixed_supply = function (supply_id) {
    var card_names = CARD_NAMES_TABLE[supply_id];
    if (!card_names) {
      alert('Error: No such card set "' + supply_id + '"');
      return [];
    }

    var cs =
      $.map(card_names, function (n) {
        var c = CARD_TABLE[n];
        if (c == null) {
          alert('Error: No such card "' + n + '"');
          return null;
        }
        return c;
      });
    return $.grep(cs, function (c) {return c != null;});
  };

  var show_the_current_supply = function () {
    $('.generate').filter(function () {
      return $(this).attr('href') == location.hash.replace('#_', '#');
    }).click();
  };

  $(document).ready(function () {
    // Create a page for each supply.
    $('.generate').each(function () {
      $('body').append(
        $('<ul>')
        .attr('id', $(this).attr('href').substring(1))
        .attr('title', $.trim($(this).text()))
      );
    });

    $('.generate').click(function () {
      var id = $(this).attr('href').substring(1);
      var $page = $('#' + id);
      if (/^random-/.test(id)) {
        var count = id.substring('random-'.length);
        replace_content($page, choose_a_random_supply(count));
      } else {
        var supply_id = id;
        replace_content($page, choose_a_fixed_supply(supply_id));
      }
    });

    $('#regenerate').click(function (e) {
      show_the_current_supply();
      e.preventDefault();
    });

    $(window).bind('hashchange', function () {
      if (/^#_random-/.test(location.hash))
        $('#regenerate').show();
      else
        $('#regenerate').hide();
    });
    $(window).trigger('hashchange');

    $(document).on('change', '.dropped:checkbox', function () {
      $(this).parents('.card')
        .toggleClass('dropped', $(this).attr('checked') != null);
    });

    // Show a supply if the current page is directly opened via bookmarks etc.
    show_the_current_supply();
  });
})(jQuery);

// __END__  {{{1
// vim: expandtab shiftwidth=2 softtabstop=2
// vim: foldmethod=marker
