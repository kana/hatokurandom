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
