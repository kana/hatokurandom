(function (H, $) {
  describe('render', function () {
    beforeEach(function () {
      $('body').append('<div id="test1"><span>hi <em>hi</em> hi</span></div>');
      $('body').append('<div id="test2"><span>{{message}}</span></div>');
    });
    afterEach(function () {
      $('#test1, #test2').remove();
    });
    it('should return a jQuery-wrapped element', function () {
      var $x = H.render('test1');
      expect($x.html()).toEqual('hi <em>hi</em> hi');
    });
    it('should replace placeholders with given values', function () {
      var $x = H.render('test2', {message: 'morning'});
      expect($x.html()).toEqual('morning');
    });
    it('should use dummy values if proper values are not given', function () {
      var $x = H.render('test2', {});
      expect($x.html()).toEqual('{{-message-}}');
    });
  });
})(hatokurandom, jQuery);




// __END__
// vim: expandtab shiftwidth=2 softtabstop=2
// vim: foldmethod=expr
// vim: foldexpr=getline(v\:lnum)=~#'\\v<x?(describe|it|beforeEach|afterEach)>.*<function>\\s*\\([^()]*\\)\\s*\\{'?'a1'\:(getline(v\:lnum)=~#'^\\s*});'?'s1'\:'=')
