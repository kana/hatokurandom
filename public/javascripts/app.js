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
    ]  //}}}
    // FIXME: Add missing definitions.
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

    $page.empty();
    $.each(_cards, function (_, c) {
      $page.append(
        $(
          $('#card-template').html().replace(
            /{{([^{}]+)}}/g,
            function (_, key) {
              return c[key];
            }
          )
        )
      );
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
  });
})(jQuery);

// __END__  {{{1
// vim: expandtab shiftwidth=2 softtabstop=2
// vim: foldmethod=marker
