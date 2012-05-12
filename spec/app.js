(function (H, $) {
  describe('generate_rsid', function () {
    var encode = function (b6s) {
      return $.map(
        b6s,
        function (b6) {return H.BASE64XML_ENCODING_TABLE[b6];}
      ).join('');
    };

    it('should generate a proper rsid', function () {
      expect(H.generate_rsid({
      })).toEqual(encode([
        0x01
      ]));
      expect(H.generate_rsid({
        0xa1: false,  // 1010 0001
        0xb2: true    // 1011 0010
      })).toEqual(encode([
        0x01,  // 000001
        0x02,  // 0-00010
        0x21,  // -100001
        0x22,  // 1-00010
        0x32   // -110010
      ]));
    });
  });
})(hatokurandom, jQuery);




// __END__
// vim: expandtab shiftwidth=2 softtabstop=2
// vim: foldmethod=expr
// vim: foldexpr=getline(v\:lnum)=~#'\\v<x?(describe|it)>.*<function>\\s*\\([^()]*\\)\\s*\\{'?'a1'\:(getline(v\:lnum)=~#'^\\s*});'?'s1'\:'=')
