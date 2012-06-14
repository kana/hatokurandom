(function (H, $) {
  describe('Error', function () {
    it('should return an error object', function () {
      expect(new H.Error('hi') instanceof Error).toBeTruthy();
    });
    it('should return a non-standard error object', function () {
      expect(new H.Error('hi') instanceof EvalError).toBeFalsy();
      expect(new H.Error('hi') instanceof RangeError).toBeFalsy();
      expect(new H.Error('hi') instanceof ReferenceError).toBeFalsy();
      expect(new H.Error('hi') instanceof SyntaxError).toBeFalsy();
      expect(new H.Error('hi') instanceof TypeError).toBeFalsy();
      expect(new H.Error('hi') instanceof URIError).toBeFalsy();
    });
    it('should return a custom error object', function () {
      expect(new H.Error('hi') instanceof H.Error).toBeTruthy();
    });
  });
  describe('KeyError', function () {
    it('should return a custom error object', function () {
      expect(new H.KeyError('Hi', 'hi') instanceof H.KeyError).toBeTruthy();
    });
    it('should return an object which inherits H.Error', function () {
      expect(new H.KeyError('Hi', 'hi') instanceof H.Error).toBeTruthy();
    });
  });
  describe('apid_from_pid', function () {
    it('should return pid as is if parameters are not included', function () {
      expect(H.apid_from_pid('home')).toEqual('home');
      expect(H.apid_from_pid('about')).toEqual('about');
    });
    it('should return apid if a given pid contains parameters', function () {
      expect(H.apid_from_pid('supplies:basic')).toEqual('supplies');
      expect(H.apid_from_pid('supply:basic-firstplay')).toEqual('supply');
    });
  });
  describe('card_from_card_name', function () {
    it('should return the corresponding card from a card name', function () {
      var card = H.CARDS[0];
      expect(H.card_from_card_name(card.name)).toBe(card);
    });
    it('should raise error if a given card name is not valid', function () {
      expect(function () {H.card_from_card_name('クノイチ');}).not.toThrow();
      expect(function () {H.card_from_card_name('くのいち');}).toThrow();
      expect(function () {H.card_from_card_name('くノ一');}).toThrow();
    });
  });
  describe('card_from_cid', function () {
    it('should return the corresponding card from a given cid', function () {
      var card = H.CARDS[0];
      expect(H.card_from_cid(card.cid)).toBe(card);
    });
    it('should raise error if a given cid is not valid', function () {
      expect(function () {H.card_from_cid(0x01);}).not.toThrow();
      expect(function () {H.card_from_cid(-0x01);}).toThrow();
      expect(function () {H.card_from_cid('xxx');}).toThrow();
    });
  });
  describe('card_names_from_psid', function () {
    var f = H.card_names_from_psid;
    it('should return card names from a given psid', function () {
      var psid = 'basic-firstplay';
      var card_names = H.PSID_TO_CARD_NAMES_TABLE[psid];
      expect(f(psid)).toBe(card_names);
    });
    it('should raise error if a given cid is not valid', function () {
      expect(function () {f('basic-guide');}).not.toThrow();
      expect(function () {f('Basic-Guide');}).toThrow();
      expect(function () {f('basic');}).toThrow();
    });
  });
  describe('child_pids_from_pid', function () {
    var f = H.child_pids_from_pid;
    it('should return child pids from a given pid', function () {
      var pid = 'supplies:basic';
      var child_pids = H.PID_TO_CHILD_PIDS_TABLE[pid];
      expect(f(pid)).toBe(child_pids);
    });
    it('should raise error if a given pid is not valid', function () {
      expect(function () {f('supplies:basic');}).not.toThrow();
      expect(function () {f('Supplies:basic');}).toThrow();
      expect(function () {f('supply');}).toThrow();
    });
  });
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
  describe('is_psid', function () {
    it('should return true for a valid psid', function () {
      expect(H.is_psid('basic-firstplay')).toBeTruthy();
      expect(H.is_psid('championship1-finals')).toBeTruthy();
    });
    it('should return false for a invalid psid', function () {
      expect(H.is_psid('foobarbaz')).toBeFalsy();
      expect(H.is_psid('BALAUAXAdAfAhAlAEAHAJ')).toBeFalsy();
    });
  });
  describe('is_rsid', function () {
    it('should return true for a valid rsid', function () {
      expect(H.is_rsid('B')).toBeTruthy();
      expect(H.is_rsid('BAD')).toBeTruthy();
      expect(H.is_rsid('BADgc')).toBeTruthy();
    });
    it('should return false for a psid', function () {
      expect(H.is_rsid('basic-firstplay')).toBeFalsy();
      expect(H.is_rsid('championship1-finals')).toBeFalsy();
    });
    it('should return true for an invalid rsid, unfortunately', function () {
      expect(H.is_rsid('This is neither a psid nor an rsid')).toBeTruthy();
    });
  });
  describe('meta_from_pid', function () {
    var f = H.meta_from_pid;
    it('should return meta from a given pid', function () {
      var pid = 'supplies:basic';
      var meta = H.PID_TO_META_TABLE[pid];
      expect(f(pid)).toBe(meta);
    });
    it('should return meta from a page with an rsid', function () {
      var pid = 'supply:BADgc';
      expect(H.PID_TO_META_TABLE[pid]).toBeUndefined();
      expect(f(pid)).toEqual(H.meta_from_rsid('BADgc'));
    });
    it('should raise error if a given pid is not valid', function () {
      expect(function () {f('supplies:basic');}).not.toThrow();
      expect(function () {f('Supplies:basic');}).toThrow();
      expect(function () {f('supply');}).toThrow();
    });
  });
  describe('meta_from_rsid', function () {
    it('should return meta from an rsid', function () {
      var meta = H.meta_from_rsid('B');

      expect(meta.long_title).toEqual('ランダムサプライ');
      expect(meta.short_title).toEqual('ランダムサプライ');
    });
    it('unfortunately works even if a given rsid is invalid', function () {
      var meta = H.meta_from_rsid('B');
      expect(H.meta_from_rsid('BAD')).toEqual(meta);
      expect(H.meta_from_rsid('BADgc')).toEqual(meta);
      expect(H.meta_from_rsid('This is not a valid rsid!')).toEqual(meta);
    });
  });
  describe('parent_pid_from_pid', function () {
    var f = H.parent_pid_from_pid;
    it('should return the parent pid from a given pid', function () {
      expect(f('supplies:basic')).toEqual('home');
    });
    it('should raise error if a given pid is not valid', function () {
      expect(function () {f('supplies:basic');}).not.toThrow();
      expect(function () {f('Supplies:basic');}).toThrow();
      expect(function () {f('supply');}).toThrow();
    });
    it('should return undefined to a directly visited rsid page', function () {
      var original = $.mobile.urlHistory.stack;

      $.mobile.urlHistory.stack = [];

      expect(f('supply:BADgc')).toBeUndefined();

      $.mobile.urlHistory.stack = original;
    });
    it('should return the previous pid for other rsid pages', function () {
      var original = $.mobile.urlHistory.stack;

      $.mobile.urlHistory.addNew('http://june29.jp/#hairstyle:mojamoja');
      $.mobile.urlHistory.addNew('http://june29.jp/#hairstyle:sarasara');

      expect(f('supply:BADgc')).toEqual('hairstyle:mojamoja');

      $.mobile.urlHistory.stack = original;
    });
  });
  describe('pid_from_url', function () {
    it('should return pid from a url object', function () {
      expect(H.pid_from_url($.mobile.path.parseUrl('/')))
        .toEqual('');
      expect(H.pid_from_url($.mobile.path.parseUrl('/#home')))
        .toEqual('home');
      expect(H.pid_from_url($.mobile.path.parseUrl('/#supplies:basic')))
        .toEqual('supplies:basic');
    });
    it('should reject any non-url object, especially a string', function () {
      expect(function () {H.pid_from_url($.mobile.path.parseUrl('/#home'));})
        .not.toThrow();
      expect(function () {H.pid_from_url('/#home');})
        .toThrow();
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
  describe('sid_from_pid', function () {
    it('should return sid from a pid', function () {
      expect(H.sid_from_pid('supply:basic-guide')).toEqual('basic-guide');
    });
  });
  describe('xcards_from_psid', function () {
    it('should return cards with extra information from a psid', function () {
      var xcards = H.xcards_from_psid('basic-firstplay');
      expect(xcards[0].name).toEqual('斥候');
      expect(xcards[0].dropped).toBeFalsy();
    });
    it('should not affect the card table', function () {
      var xcards = H.xcards_from_psid('basic-firstplay');
      expect(xcards[0].name).toEqual(H.card_from_cid(xcards[0].cid).name);
      expect(xcards[0]).not.toBe(H.card_from_cid(xcards[0].cid));
    });
  });
  describe('xcards_from_rsid', function () {
    it('should return xcards from rsid', function () {
      expect(H.xcards_from_rsid('B')).toEqual([]);
      expect(H.xcards_from_rsid('BAB')).toEqual([
        $.extend({dropped: false}, H.card_from_cid(0x01))
      ]);
      expect(H.xcards_from_rsid('BADgc')).toEqual([
        $.extend({dropped: false}, H.card_from_cid(0x03)),
        $.extend({dropped: true}, H.card_from_cid(0x1c)),
      ]);
    });
    it('should reject if rsid contains an invalid character', function () {
      expect(function () {H.xcards_from_rsid('B??');}).toThrow();
    });
    it('should reject if rsid contains trailing data', function () {
      expect(function () {H.xcards_from_rsid('BA');}).toThrow();
    });
    it('should reject if rsid contains an invalid cid', function () {
      expect(function () {H.xcards_from_rsid('BAA');}).toThrow();
    });
  });
  describe('xcards_from_sid', function () {
    it('should return xcards from normal psid', function () {
      expect(H.xcards_from_sid('basic-firstplay'))
        .toEqual(H.xcards_from_psid('basic-firstplay'));
    });
    it('should return xcards from rsid', function () {
      expect(H.xcards_from_sid('BADgc'))
        .toEqual(H.xcards_from_rsid('BADgc'));
    });
    it('should reject invalid psid/rsid', function () {
      expect(function () {H.xcards_from_rsid('BAA');}).toThrow();
    });
  });
})(hatokurandom, jQuery);




// __END__
// vim: expandtab shiftwidth=2 softtabstop=2
// vim: foldmethod=expr
// vim: foldexpr=getline(v\:lnum)=~#'\\v<x?(describe|it|beforeEach|afterEach)>.*<function>\\s*\\([^()]*\\)\\s*\\{'?'a1'\:(getline(v\:lnum)=~#'^\\s*});'?'s1'\:'=')
