(function (H, $) {
  describe('decode_base64xml', function () {
    it('should decode a character to a 6-bit value', function () {
      for (var c in H.BASE64XML_DECODING_TABLE)
        expect(H.decode_base64xml(c)).toEqual([H.BASE64XML_DECODING_TABLE[c]]);
    });
    it('should decode a string to an array of 6-bit values', function () {
      expect(H.decode_base64xml('L0vE')).toEqual([0x0b, 0x34, 0x2f, 0x04]);
    });
    it('should fail to decode an invalid character', function () {
      expect(function () {H.decode_base64xml('ThisIsValid');}).not.toThrow();
      expect(function () {H.decode_base64xml('This is not valid');}).toThrow();
    });
    it('should decode original values from an encoded string', function () {
      var values = [0x0b, 0x34, 0x2f, 0x04];
      expect(H.decode_base64xml(H.encode_base64xml(values))).toEqual(values);
      var string = 'FOO-bar.bz2';
      expect(H.encode_base64xml(H.decode_base64xml(string))).toEqual(string);
    });
  });
  describe('encode_base64xml', function () {
    it('should encode a 6-bit value to a character', function () {
      for (var v in H.BASE64XML_ENCODING_TABLE)
        expect(H.encode_base64xml([v])).toEqual(H.BASE64XML_ENCODING_TABLE[v]);
    });
    it('should encode 6-bit values to a string', function () {
      expect(H.encode_base64xml([0x0b, 0x34, 0x2f, 0x04])).toEqual('L0vE');
    });
    it('should fail to encode a value greater than 0x3f', function () {
      expect(function () {H.encode_base64xml([0x3f]);}).not.toThrow();
      expect(function () {H.encode_base64xml([0x40]);}).toThrow();
    });
  });
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
