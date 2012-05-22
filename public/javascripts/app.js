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
