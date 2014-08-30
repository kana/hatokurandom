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
      expect(new H.KeyError('Hi hi') instanceof H.KeyError).toBeTruthy();
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
      var card = H.ALL_CARDS[0];
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
      var card = H.ALL_CARDS[0];
      expect(H.card_from_cid(card.cid)).toBe(card);
    });
    it('should raise error if a given cid is not valid', function () {
      expect(function () {H.card_from_cid(0x01);}).not.toThrow();
      expect(function () {H.card_from_cid(-0x01);}).toThrow();
      expect(function () {H.card_from_cid('xxx');}).toThrow();
    });
  });
  describe('child_page_hints_from_pid', function () {
    var f = H.child_page_hints_from_pid;
    it('should return child page hints from a given pid', function () {
      var pid = 'supplies:basic';
      var hints = f(pid);
      expect(hints.length).toBeGreaterThan(0);
      expect(hints[0].pid).not.toBeUndefined();
      expect(hints[0].title).not.toBeUndefined();
    });
    it('should raise error if a given pid is not valid', function () {
      expect(function () {f('supplies:basic');}).not.toThrow();
      expect(function () {f('Supplies:basic');}).toThrow();
      expect(function () {f('supply');}).toThrow();
    });
  });
  describe('choose_available_cards', function () {
    it('drops banned cards', function () {
      var c1 = H.card_from_card_name('埋もれた財宝');
      var c2 = H.card_from_card_name('星詠みの魔女');
      var c3 = H.card_from_card_name('魅了術の魔女');
      var given_cards = [c1, c2, c3];
      var result = H.choose_available_cards(given_cards, H.DEFAULT_OPTIONS);
      expect(result).toEqual([c2]);
    });
    it('drops imperfect cards', function () {
      var c1 = H.card_from_card_name('冒険者');
      var c2 = {imperfect: true};
      var c3 = H.card_from_card_name('割り符');
      var given_cards = [c1, c2, c3];
      var result = H.choose_available_cards(given_cards, H.DEFAULT_OPTIONS);
      expect(result).toEqual([c1, c3]);
    });
    describe('include_{set}', function () {
      var cbs = H.card_from_card_name('銀行');
      var cft = H.card_from_card_name('割り符');
      var cne = H.card_from_card_name('豪商');
      var cfg = H.card_from_card_name('商船団');
      var csa = H.card_from_card_name('転売屋');
      var given_cards = [cbs, cft, cne, cfg, csa];
      var f = function (custom_options) {
        return H.choose_available_cards(
          given_cards,
          $.extend({}, H.DEFAULT_OPTIONS, custom_options)
        );
      };
      it('drops Basic Set cards if configured so', function () {
        expect(f({include_basic: 'must_not'})).toEqual([cft, cne, cfg, csa]);
      });
      it('drops Fareast Territory cards if configured so', function () {
        expect(f({include_fareast: 'must_not'})).toEqual([cbs, cne, cfg, csa]);
      });
      it('drops Northern Enchantress cards if configured so', function () {
        expect(f({include_northern: 'must_not'})).toEqual([cbs, cft, cfg, csa]);
      });
      it('drops Fairy Garden cards if configured so', function () {
        expect(f({include_fairy: 'must_not'})).toEqual([cbs, cft, cne, csa]);
      });
      it('drops Six Cities Alliance cards if configured so', function () {
        expect(f({include_six: 'must_not'})).toEqual([cbs, cft, cne, cfg]);
      });
    });
  });
  describe('choose_supply_cards', function () {
    describe('basics', function () {
      it('should return a subset of given cards', function () {
        var cards = H.choose_supply_cards(H.COMMON_CARDS, 10, H.DEFAULT_OPTIONS);
        for (var i = 0; i < cards.length; i++) {
          var c1 = cards[i];
          expect(
            $.grep(H.COMMON_CARDS, function (c2) {return c2 == c1;}).length
          ).toEqual(1);
        }
      });
      it('should choose cards without duplicates', function () {
        var cards = H.choose_supply_cards(H.COMMON_CARDS, 10, H.DEFAULT_OPTIONS);
        for (var i = 0; i < cards.length; i++) {
          var c1 = cards[i];
          expect(
            $.grep(cards, function (c2) {return c2 == c1;}).length
          ).toEqual(1);
        }
      });
      it('should choose random cards each time', function () {
        var cards1 = H.choose_supply_cards(H.COMMON_CARDS, 10, H.DEFAULT_OPTIONS);
        var cards2;
        do {
          cards2 = H.choose_supply_cards(H.COMMON_CARDS, 10, H.DEFAULT_OPTIONS);
        } while (cards1 == cards2);
        expect(cards1).not.toEqual(cards2);
      });
      it('should return invalid result if there is no more card', function () {
        var cards = H.choose_supply_cards(
          [
            H.card_from_card_name('早馬'),
            H.card_from_card_name('斥候'),
            H.card_from_card_name('寄付'),
            H.card_from_card_name('願いの泉')
          ],
          5,
          $.extend(
            {},
            H.DEFAULT_OPTIONS,
            {
              try_count: 1
            }
          )
        );
        expect(cards.length).toEqual(4);
        expect(cards.fallback).toBeTruthy();
      });
    });
    describe('include_{expansion}', function () {
      it('should reject "must_not" expansions', function () {
        var filter_by_eid = function (eid, cards) {
          return $.grep(cards, function (card) {return card.eid == eid;});
        };
        var test = function (eid, options) {
          expect(
            filter_by_eid(
              eid,
              H.choose_supply_cards(
                H.COMMON_CARDS,
                H.COMMON_CARDS.length
                - filter_by_eid(eid, H.COMMON_CARDS).length,
                $.extend(
                  {},
                  H.DEFAULT_OPTIONS,
                  {exclude_banned_cards: false},
                  options
                )
              )
            )
          ).toEqual([]);
        };

        test(H.EID_BASIC, {include_basic: 'must_not'});
        test(H.EID_FAREAST, {include_fareast: 'must_not'});
        test(H.EID_NORTHERN, {include_northern: 'must_not'});
        test(H.EID_FAIRY, {include_fairy: 'must_not'});
        test(H.EID_SIX, {include_six: 'must_not'});
      });
      it('should include "must" expansions', function () {
        var filter_by_eid = function (eid, cards) {
          return $.grep(cards, function (card) {return card.eid == eid;});
        };
        var test = function (eid, options) {
          var cards =
            H.choose_supply_cards(
              H.COMMON_CARDS,
              10,
              $.extend({}, H.DEFAULT_OPTIONS, options)
            );
          expect(
            1 <= filter_by_eid(eid, cards).length
            || cards.fallback
          ).toBeTruthy();
        };

        test(H.EID_BASIC, {include_basic: 'must'});
        test(H.EID_FAREAST, {include_fareast: 'must'});
        test(H.EID_NORTHERN, {include_northern: 'must'});
        test(H.EID_FAIRY, {include_fairy: 'must'});
        test(H.EID_SIX, {include_six: 'must'});
      });
    });
    describe('statistical', function () {
      it('should return statistical result if requested', function () {
        var s =
          H.choose_supply_cards(
            H.COMMON_CARDS,
            10,
            $.extend({}, H.DEFAULT_OPTIONS, {statistical: true})
          );
        expect(s.ok_count).not.toBeLessThan(0);
        expect(s.try_count).toEqual(H.DEFAULT_OPTIONS.try_count);
        expect(typeof s.probability).toEqual('string');
      });
      it('should return statistical result with given try count', function () {
        var s =
          H.choose_supply_cards(
            H.COMMON_CARDS,
            10,
            $.extend({}, H.DEFAULT_OPTIONS, {statistical: true, try_count: 33})
          );
        expect(s.ok_count).not.toBeLessThan(0);
        expect(s.try_count).toEqual(33);
        expect(typeof s.probability).toEqual('string');
      });
    });
    describe('with include_all_costs', function () {
      var test = function (card_set, fallback) {
        var cards =
          H.choose_supply_cards(
            card_set,
            card_set.length,
            $.extend(
              {},
              H.DEFAULT_OPTIONS,
              {
                exclude_banned_cards: false,
                include_all_costs: true,
                try_count: 1
              }
            )
          );
        expect(!!(cards.fallback)).toEqual(fallback);
        expect(H.order_by(cards, function (c) {return c.cid;}))
          .toEqual(card_set);
      };
      it('should return a valid result with cost 2-5', function () {
        test(
          [
            H.card_from_card_name('早馬'),
            H.card_from_card_name('交易船'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('冒険者')
          ],
          false
        );
      });
      it('should return a valid result with cost 2-4 & 6', function () {
        test(
          [
            H.card_from_card_name('早馬'),
            H.card_from_card_name('交易船'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('噂好きの公爵夫人')
          ],
          false
        );
      });
      it('should return a valid result with cost 2-4 & 12', function () {
        test(
          [
            H.card_from_card_name('早馬'),
            H.card_from_card_name('交易船'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('大公爵')
          ],
          false
        );
      });
      it('should not return a valid result without cost 5-6', function () {
        test(
          [
            H.card_from_card_name('早馬'),
            H.card_from_card_name('交易船'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('魅了術の魔女')
          ],
          true
        );
      });
    });
    describe('with include_link_2', function () {
      var test = function (card_set, fallback) {
        var cards =
          H.choose_supply_cards(
            card_set,
            card_set.length,
            $.extend(
              {},
              H.DEFAULT_OPTIONS,
              {
                exclude_banned_cards: false,
                include_link_2: true,
                try_count: 1
              }
            )
          );
        expect(!!(cards.fallback)).toEqual(fallback);
        expect(H.order_by(cards, function (c) {return c.cid;}))
          .toEqual(card_set);
      };
      it('should not return a valid result with link 0, 0, 0', function () {
        test(
          [
            H.card_from_card_name('歩兵大隊'),
            H.card_from_card_name('サムライ'),
            H.card_from_card_name('割り符')
          ],
          true
        );
      });
      it('should not return a valid result with link 0, 0, 1', function () {
        test(
          [
            H.card_from_card_name('歩兵大隊'),
            H.card_from_card_name('サムライ'),
            H.card_from_card_name('鉱山都市')
          ],
          true
        );
      });
      it('should return a valid result with link 0, 0, 2', function () {
        test(
          [
            H.card_from_card_name('歩兵大隊'),
            H.card_from_card_name('サムライ'),
            H.card_from_card_name('港町')
          ],
          false
        );
      });
      it('should return a valid result with link 0, 1, 2', function () {
        test(
          [
            H.card_from_card_name('歩兵大隊'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('補給部隊')
          ],
          false
        );
      });
      it('should return a valid result with link 1, 1, 1', function () {
        test(
          [
            H.card_from_card_name('図書館'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('魅了術の魔女')
          ],
          false
        );
      });
      it('should return a valid result with link 1, 1, 2', function () {
        test(
          [
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('魅了術の魔女'),
            H.card_from_card_name('補給部隊')
          ],
          false
        );
      });
      it('should return a valid result with link 2, 2, 2', function () {
        test(
          [
            H.card_from_card_name('シノビ'),
            H.card_from_card_name('星詠みの魔女'),
            H.card_from_card_name('補給部隊')
          ],
          false
        );
      });
    });
    describe('with exclude_banned_cards', function () {
      var test = function (card_set, valid) {
        var cards =
          H.choose_supply_cards(
            card_set,
            card_set.length,
            $.extend(
              {},
              H.DEFAULT_OPTIONS,
              {
                exclude_banned_cards: true,
                try_count: 1
              }
            )
          );
        expect(!cards.fallback).toEqual(valid);
        expect(cards.length).toEqual(card_set.length - (valid ? 0 : 1));
      };
      it('should return valid result from non-banned cards', function () {
        test(
          [
            H.card_from_card_name('早馬'),
            H.card_from_card_name('交易船'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('冒険者')
          ],
          true
        );
      });
      it('should return invalid result with banned cards', function () {
        test(
          [
            H.card_from_card_name('早馬'),
            H.card_from_card_name('交易船'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('冒険者'),
            H.card_from_card_name('埋もれた財宝')
          ],
          false
        );
        test(
          [
            H.card_from_card_name('早馬'),
            H.card_from_card_name('交易船'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('冒険者'),
            H.card_from_card_name('買収工作')
          ],
          false
        );
        test(
          [
            H.card_from_card_name('早馬'),
            H.card_from_card_name('交易船'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('冒険者'),
            H.card_from_card_name('魅了術の魔女')
          ],
          false
        );
      });
    });
    describe('with exclude_banned_cards_for_fairy_garden', function () {
      var test = function (card_set, valid, length) {
        var cards =
          H.choose_supply_cards(
            card_set,
            card_set.length,
            $.extend(
              {},
              H.DEFAULT_OPTIONS,
              {
                exclude_banned_cards: false,
                exclude_banned_cards_for_fairy_garden: true,
                try_count: 1
              }
            )
          );
        expect(!cards.fallback).toEqual(valid);
        expect(cards.length).toEqual(card_set.length);
      };
      it('should return valid result from non-banned cards', function () {
        test(
          [
            H.card_from_card_name('伝令'),
            H.card_from_card_name('交易船'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('買収工作')
          ],
          true
        );
      });
      it('should return valid result with banned cards if Fairy Garden cards are not included', function () {
        test(
          [
            H.card_from_card_name('早馬'),
            H.card_from_card_name('交易船'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('冒険者'),
            H.card_from_card_name('埋もれた財宝')
          ],
          true
        );
        test(
          [
            H.card_from_card_name('早馬'),
            H.card_from_card_name('交易船'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('冒険者'),
            H.card_from_card_name('魅了術の魔女')
          ],
          true
        );
      });
      it('should return invalid result with banned cards if Fairy Garden cards are included', function () {
        test(
          [
            H.card_from_card_name('伝令'),
            H.card_from_card_name('交易船'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('冒険者'),
            H.card_from_card_name('埋もれた財宝')
          ],
          false
        );
        test(
          [
            H.card_from_card_name('伝令'),
            H.card_from_card_name('交易船'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('冒険者'),
            H.card_from_card_name('魅了術の魔女')
          ],
          false
        );
      });
    });
    describe('with not-fully-unveiled cards', function () {
      var test = function (card_set, expected_validness, expected_length) {
        var cards =
          H.choose_supply_cards(
            card_set,
            card_set.length,
            $.extend(
              {},
              H.DEFAULT_OPTIONS,
              {try_count: 1}
            )
          );
        expect(!cards.fallback).toEqual(expected_validness);
        expect(cards.length).toEqual(expected_length);
      };
      it('never includes cards marked as "imperfect"', function () {
        test(
          [
            H.card_from_card_name('伝令'),
            H.card_from_card_name('交易船'),
            H.card_from_card_name('都市開発'),
            H.card_from_card_name('冒険者'),
            H.card_from_card_name('裁判官')
          ],
          true,
          5
        );
        test(
          [
            H.card_from_card_name('伝令'),
            $.extend({imperfect: true}, H.card_from_card_name('交易船')),
            H.card_from_card_name('都市開発'),
            $.extend({imperfect: true}, H.card_from_card_name('冒険者')),
            H.card_from_card_name('工業都市')
          ],
          false,
          3
        );
      });
    });
  });
  describe('cids_from_psid', function () {
    var f = H.cids_from_psid;
    it('should return CIDs from a given psid', function () {
      var psid = 'basic-firstplay';
      var cids = H.PSID_TO_DELAYED_CIDS_TABLE[psid]();
      expect(f(psid)).toBe(cids);
    });
    it('should raise error if a given cid is not valid', function () {
      expect(function () {f('basic-guide');}).not.toThrow();
      expect(function () {f('Basic-Guide');}).toThrow();
      expect(function () {f('basic');}).toThrow();
    });
  });
  describe('decode_base64', function () {
    it('should decode a character to a 6-bit value', function () {
      for (var c in H.BASE64_DECODING_TABLE)
        expect(H.decode_base64(c)).toEqual([H.BASE64_DECODING_TABLE[c]]);
    });
    it('should decode a string to an array of 6-bit values', function () {
      expect(H.decode_base64('L0vE')).toEqual([0x0b, 0x34, 0x2f, 0x04]);
    });
    it('should fail to decode an invalid character', function () {
      expect(function () {H.decode_base64('ThisIsValid');}).not.toThrow();
      expect(function () {H.decode_base64('This is not valid');}).toThrow();
    });
    it('should decode original values from an encoded string', function () {
      var values = [0x0b, 0x34, 0x2f, 0x04];
      expect(H.decode_base64(H.encode_base64(values))).toEqual(values);
      var string = 'FOO-bar_bz2';
      expect(H.encode_base64(H.decode_base64(string))).toEqual(string);
    });
    it('should decode "." as if "_" for backward compatibility', function () {
      expect(H.decode_base64('.')).toEqual(H.decode_base64('_'));
    });
  });
  describe('dominant_type_from_types', function () {
    var f = H.dominant_type_from_types;
    it('should return the dominant type from given types', function () {
      expect(f(['継承権', '領地'])).toEqual('継承権');  // 皇室領
      expect(f(['継承権'])).toEqual('継承権');  // 噂好きの公爵夫人
      expect(f(['行動', '攻撃'])).toEqual('攻撃');  // 斥候
      expect(f(['行動', '防衛', '災い'])).toEqual('防衛');  // 魔法の護符
      expect(f(['行動', '防衛'])).toEqual('防衛');  // 城壁
      expect(f(['行動'])).toEqual('行動');  // 寄付
      expect(f(['領地'])).toEqual('領地');  // 鉱山都市
      expect(f(['災い'])).toEqual('災い');  // 呪い
      expect(f(['プリンセス'])).toEqual('プリンセス');  // 第一皇女 ルルナサイカ
      expect(f(['サポート'])).toEqual('サポート');  // 軍師シャオリン
      expect(f(['?'])).toEqual('?');  // カードリスト判明までの仮データ
    });
    it('should ignore the order of given types', function () {
      expect(f(['領地', '継承権'])).toEqual(f(['継承権', '領地']));
    });
    it('should fail if there is no valid type', function () {
      expect(function () {f(['xyzzy', '継承権', '領地']);}).not.toThrow();
      expect(function () {f(['xyzzy', 'zzyxy']);}).toThrow();
    });
  });
  describe('encode_base64', function () {
    it('should encode a 6-bit value to a character', function () {
      for (var v in H.BASE64_ENCODING_TABLE)
        expect(H.encode_base64([v])).toEqual(H.BASE64_ENCODING_TABLE[v]);
    });
    it('should encode 6-bit values to a string', function () {
      expect(H.encode_base64([0x0b, 0x34, 0x2f, 0x04])).toEqual('L0vE');
    });
    it('should fail to encode a value greater than 0x3f', function () {
      expect(function () {H.encode_base64([0x3f]);}).not.toThrow();
      expect(function () {H.encode_base64([0x40]);}).toThrow();
    });
  });
  describe('is_banned_card', function () {
    var f = function (n) {return H.is_banned_card(H.card_from_card_name(n));};
    it('should return true for banned cards', function () {
      expect(f('埋もれた財宝')).toBeTruthy();
      expect(f('買収工作')).toBeTruthy();
      expect(f('魅了術の魔女')).toBeTruthy();
    });
    it('should return false for non-banned cards', function () {
      expect(f('割り符')).toBeFalsy();
    });
  });
  describe('is_banned_card_for_fairy_garden', function () {
    var f = function (n) {return H.is_banned_card_for_fairy_garden(H.card_from_card_name(n));};
    it('should return true for banned cards', function () {
      expect(f('城壁')).toBeTruthy();
      expect(f('隠れ家')).toBeTruthy();
      expect(f('破城槌')).toBeTruthy();
      expect(f('埋もれた財宝')).toBeTruthy();
      expect(f('星詠みの魔女')).toBeTruthy();
      expect(f('シノビ')).toBeTruthy();
      expect(f('魅了術の魔女')).toBeTruthy();
      expect(f('歩兵大隊')).toBeTruthy();
      expect(f('近衛騎士団')).toBeTruthy();
      expect(f('弓兵隊')).toBeTruthy();
      expect(f('サムライ')).toBeTruthy();
    });
    it('should return false for non-banned cards', function () {
      expect(f('割り符')).toBeFalsy();
    });
  });
  describe('is_dynamic_page_url', function () {
    it('should return true for a dynamic page URL', function () {
      expect(H.is_dynamic_page_url('http://example.com/#a:b')).toBeTruthy();
    });
    it('should return false for a static page URL', function () {
      expect(H.is_dynamic_page_url('http://example.com/#abc')).toBeFalsy();
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
  describe('is_running_specs', function () {
    it('should return true if specs seem to be run', function () {
      expect(H.is_running_specs()).toBeTruthy();
    });
    it('should return false if specs seem not to be run', function () {
      var original_title = document.title;
      document.title = 'ハトクランダム';

      expect(H.is_running_specs()).toBeFalsy();

      document.title = original_title;

      expect(H.is_running_specs()).toBeTruthy();
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

      expect(meta.title).toEqual('ランダムサプライ');
    });
    it('unfortunately works even if a given rsid is invalid', function () {
      var meta = H.meta_from_rsid('B');
      expect(H.meta_from_rsid('BAD')).toEqual(meta);
      expect(H.meta_from_rsid('BADgc')).toEqual(meta);
      expect(H.meta_from_rsid('This is not a valid rsid!')).toEqual(meta);
    });
  });
  describe('migrate_from_version_1', function () {
    var f = H.migrate_from_version_1;
    it('should return new-style pid from old-style pid', function () {
      expect(f('_home')).toEqual('home');
      expect(f('_about')).toEqual('about');
      expect(f('_basic')).toEqual('supplies:basic');
      expect(f('_random-10')).toEqual('supply:random10');
      expect(f('_supply.BADgc')).toEqual('supply:BADgc');
    });
    it('should return false from invalid pid for version 1', function () {
      expect(f('_credit')).toBeFalsy();
    });
  });
  describe('not', function () {
    it('should return inverted value from given predicate', function () {
      var plus = function (a, b) {return a + b;};
      expect(H.not(function () {return true;})()).toBeFalsy();
      expect(H.not(function () {return false;})()).toBeTruthy();
      expect(H.not(plus)(1, 1)).toBeFalsy();
      expect(H.not(plus)(1, 0)).toBeFalsy();
      expect(H.not(plus)(1, -1)).toBeTruthy();
    });
  });
  describe('order_by', function () {
    it('should sort a array with key selectors', function () {
      var xs = [
        {car: 123, cdr: '9'},
        {car: 23, cdr: '9'},
        {car: 23, cdr: '700'},
        {car: 23, cdr: '80'},
        {car: 3, cdr: '9'}
      ];
      var xsd =
        H.order_by(
          xs,
          function (x) {return x.car;},
          function (x) {return x.cdr;}
        );
      expect(xsd.length).toEqual(xs.length);
      expect(xsd[0]).toBe(xs[4]);
      expect(xsd[1]).toBe(xs[2]);
      expect(xsd[2]).toBe(xs[3]);
      expect(xsd[3]).toBe(xs[1]);
      expect(xsd[4]).toBe(xs[0]);
    });
    it('should return a new array, not sort in-place', function () {
      var xs = [
        {car: 123, cdr: '9'},
        {car: 23, cdr: '9'},
        {car: 23, cdr: '700'},
        {car: 23, cdr: '80'},
        {car: 3, cdr: '9'}
      ];
      expect(
        H.order_by(
          xs,
          function (x) {return x.cdr;},
          function (x) {return x.car;}
        )
      ).not.toBe(xs);
    });
  });
  describe('parse_dsid', function () {
    describe('with "random"', function () {
      it('should return "success" data from dsid without rsid', function () {
        var m10 = H.parse_dsid('random10');
        expect(m10.valid).toBeTruthy();
        expect(m10.count).toEqual(10);
        expect(m10.editor).toBeFalsy();
        expect(m10.random).toBeTruthy();
        expect(m10.rsid).toBeFalsy();
        var m99 = H.parse_dsid('random99');
        expect(m99.valid).toBeTruthy();
        expect(m99.count).toEqual(99);
        expect(m99.editor).toBeFalsy();
        expect(m99.random).toBeTruthy();
        expect(m99.rsid).toBeFalsy();
        var m100 = H.parse_dsid('random100');
        expect(m100.valid).toBeTruthy();
        expect(m100.count).toEqual(100);
        expect(m100.editor).toBeFalsy();
        expect(m100.random).toBeTruthy();
        expect(m100.rsid).toBeFalsy();
      });
      it('should return "success" data from dsid with rsid', function () {
        var m = H.parse_dsid('random11:BADgc');
        expect(m.valid).toBeTruthy();
        expect(m.count).toEqual(11);
        expect(m.editor).toBeFalsy();
        expect(m.random).toBeTruthy();
        expect(m.rsid).toEqual('BADgc');
      });
    });
    describe('with "editor"', function () {
      it('should return "success" data for the supply editor', function () {
        var m = H.parse_dsid('editor');
        expect(m.valid).toBeTruthy();
        expect(m.count).toBeFalsy();
        expect(m.editor).toBeTruthy();
        expect(m.random).toBeFalsy();
        expect(m.rsid).toBeFalsy();
      });
    });
    describe('with others', function () {
      it('should return "failure" data from non-dsid', function () {
        var rsid_result = H.parse_dsid('BADgc');
        expect(rsid_result.valid).toBeFalsy();
        expect(rsid_result.count).toBeFalsy();
        expect(rsid_result.rsid).toBeFalsy();
        var psid_result = H.parse_dsid('basic-firstplay');
        expect(psid_result).toEqual(rsid_result);
      });
    });
  });
  describe('pid_from_purl', function () {
    it('should return pid from a url object', function () {
      expect(H.pid_from_purl($.mobile.path.parseUrl('/#home')))
        .toEqual('home');
      expect(H.pid_from_purl($.mobile.path.parseUrl('/#supplies:basic')))
        .toEqual('supplies:basic');
    });
    it('should return pid of the home from url without fragment', function () {
      expect(H.pid_from_purl($.mobile.path.parseUrl('/')))
        .toEqual('home');
    });
    it('should reject any non-url object, especially a string', function () {
      expect(function () {H.pid_from_purl($.mobile.path.parseUrl('/#home'));})
        .not.toThrow();
      expect(function () {H.pid_from_purl('/#home');})
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
      expect($x.html()).toEqual('');
    });
    it('should treat an empty string as a valid value', function () {
      var $x = H.render('test2', {message: ''});
      expect($x.html()).toEqual('');
    });
  });
  describe('rsid_from_xcards', function () {
    it('should return rsid from xcards', function () {
      expect(H.rsid_from_xcards([])).toEqual('B');
      expect(H.rsid_from_xcards([
        $.extend({dropped: false}, H.card_from_cid(0x01))
      ])).toEqual('BAB');
      expect(H.rsid_from_xcards([
        $.extend({dropped: false}, H.card_from_cid(0x03)),
        $.extend({dropped: true}, H.card_from_cid(0x1c))
      ])).toEqual('BADgc');
    });
    it('should return rsid as if given xcards are sorted', function () {
      expect(
        H.rsid_from_xcards([
          $.extend({dropped: false}, H.card_from_cid(0x01)),
          $.extend({dropped: true}, H.card_from_cid(0x02)),
          $.extend({dropped: false}, H.card_from_cid(0x04)),
          $.extend({dropped: true}, H.card_from_cid(0x08)),
          $.extend({dropped: false}, H.card_from_cid(0x10))
        ])
      ).toEqual(
        H.rsid_from_xcards([
          $.extend({dropped: false}, H.card_from_cid(0x10)),
          $.extend({dropped: false}, H.card_from_cid(0x04)),
          $.extend({dropped: true}, H.card_from_cid(0x02)),
          $.extend({dropped: false}, H.card_from_cid(0x01)),
          $.extend({dropped: true}, H.card_from_cid(0x08))
        ])
      );
    });
    it('should return rsid from xcards with cid >= 0x40', function () {
      // This is a problematic case.  Because cards with cid >= 0x40 consit of
      // 7 or more bits and require 2 character in BASE64.
      expect(
        H.rsid_from_xcards([
          {dropped: false, cid: 0x3f},
          {dropped: true, cid: 0x3f},
          {dropped: false, cid: 0x40},
          {dropped: true, cid: 0x40},
          {dropped: false, cid: 0x41},
          {dropped: true, cid: 0x41},
          {dropped: false, cid: 0x82},
          {dropped: true, cid: 0x82},
          {dropped: false, cid: 0x104},
          {dropped: true, cid: 0x104},
          {dropped: false, cid: 0x208},
          {dropped: true, cid: 0x208},
          {dropped: false, cid: 0x410},
          {dropped: true, cid: 0x410}
        ])
      ).toEqual('BA-g-BAhABBhBCCiCEEkEIIoIQQwQ');
    });
  });
  describe('sid_from_pid', function () {
    it('should return sid from a pid of a supply page', function () {
      expect(H.sid_from_pid('supply:basic-guide')).toEqual('basic-guide');
    });
    it('should return sid from a pid of a reference page', function () {
      expect(H.sid_from_pid('reference:attacks')).toEqual('reference-attacks');
    });
    it('should return undefined from a pid of other page', function () {
      expect(H.sid_from_pid('supplies:basic')).toBeUndefined();
    });
  });
  describe('xcard_from_card', function () {
    it('should return xcard from card, with default values', function () {
      var card = H.ALL_CARDS[0];
      var default_values = {dropped: false};
      expect(H.xcard_from_card(card))
        .toEqual($.extend({}, default_values, card));
      expect(H.xcard_from_card(card)).not.toBe(H.xcard_from_card(card));
      expect(H.xcard_from_card(card)).not.toBe(card);
    });
  });
  describe('xcards_from_dsid_data', function () {
    var f = function (x) {return H.xcards_from_dsid_data(H.parse_dsid(x));};
    it('should return an empty array from "failure" data', function () {
      expect(f('basic-guide')).toEqual([]);
      expect(f('BADgc')).toEqual([]);
    });
    it('should return xcards from rsid inside dsid', function () {
      expect(f('random10:BADgc')).toEqual(H.xcards_from_rsid('BADgc'));
    });
    it('should return xcards randomly from dsid without rsid', function () {
      var xcards1 = f('random10');
      var xcards2;
      do {
        xcards2 = f('random10');
      } while (xcards1 == xcards2);
      expect(xcards1).not.toEqual(xcards2);

      expect(f('random10').length).toEqual(10);
      expect(f('random12').length).toEqual(12);
      expect(f('random20').length).toEqual(20);
      expect(f('random4').length).toEqual(4);
    });
    it('should return xcards randomly with the current options', function () {
      var original_options = H.options;
      this.after(function () {
        H.options = original_options;
      });//

      var filter_by_eid = function (eid, cards) {
        return $.grep(cards, function (card) {return card.eid == eid;});
      };
      var card_count_not_in_basic =
        H.COMMON_CARDS.length
        - filter_by_eid(H.EID_BASIC, H.COMMON_CARDS).length;

      H.options = $.extend({}, original_options, {include_basic: 'may'});
      expect(filter_by_eid(H.EID_BASIC, f('random' + H.COMMON_CARDS.length)))
        .not.toEqual([]);
      H.options = $.extend({}, original_options, {include_basic: 'must_not'});
      expect(filter_by_eid(H.EID_BASIC, f('random' + card_count_not_in_basic)))
        .toEqual([]);
    });
    it('should return "fallback" xcards if generation is failed', function () {
      var original_cards = H.COMMON_CARDS;
      var original_options = H.options;
      this.after(function () {
        H.COMMON_CARDS = original_cards;
        H.options = original_options;
      });//

      H.COMMON_CARDS = original_cards;
      H.options = $.extend({}, original_options, {include_all_costs: true});
      var xcards1 = f('random10');
      expect(xcards1.length).toEqual(10);
      expect(!!(xcards1.fallback)).toBeFalsy();

      H.COMMON_CARDS = [
        H.card_from_card_name('歩兵大隊'),
        H.card_from_card_name('図書館'),
        H.card_from_card_name('追い立てられた魔獣'),
        H.card_from_card_name('都市開発'),
        H.card_from_card_name('金貸し'),
        H.card_from_card_name('魅了術の魔女'),
        H.card_from_card_name('シノビ'),
        H.card_from_card_name('星詠みの魔女'),
        H.card_from_card_name('補給部隊'),
        H.card_from_card_name('サムライ')
      ];
      H.options =
        $.extend(
          {},
          original_options,
          {
            exclude_banned_cards: false,
            include_all_costs: true
          }
        );
      var xcards2 = f('random10');
      expect(xcards2.length).toEqual(10);
      expect(!!(xcards2.fallback)).toBeTruthy();
    });
    it('should return xcards of all cards for the supply editor', function () {
      expect(f('editor')).toEqual(
        $.map(
          H.COMMON_CARDS,
          function (card) {
            var xcard = H.xcard_from_card(card);
            xcard.dropped = true;
            return xcard;
          }
        )
      );
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
    it('should return xcards from rsid including cid >= 0x40', function () {
      // This is a problematic case.  Because cards with cid >= 0x40 consit of
      // 7 or more bits and require 2 character in BASE64.
      var original_table = H.CID_TO_CARD_TABLE;
      this.after(function () {
        H.CID_TO_CARD_TABLE = original_table;
      });//
      H.CID_TO_CARD_TABLE = $.extend(
        {},
        original_table,
        {
          0x3f: {cid: 0x3f},
          0x40: {cid: 0x40},
          0x41: {cid: 0x41},
          0x82: {cid: 0x82},
          0x104: {cid: 0x104},
          0x208: {cid: 0x208},
          0x410: {cid: 0x410}
        }
      );
      expect(H.xcards_from_rsid('BA-g-BAhABBhBCCiCEEkEIIoIQQwQ')).toEqual([
        {dropped: false, cid: 0x3f},
        {dropped: true, cid: 0x3f},
        {dropped: false, cid: 0x40},
        {dropped: true, cid: 0x40},
        {dropped: false, cid: 0x41},
        {dropped: true, cid: 0x41},
        {dropped: false, cid: 0x82},
        {dropped: true, cid: 0x82},
        {dropped: false, cid: 0x104},
        {dropped: true, cid: 0x104},
        {dropped: false, cid: 0x208},
        {dropped: true, cid: 0x208},
        {dropped: false, cid: 0x410},
        {dropped: true, cid: 0x410}
      ]);
    });
  });
  describe('xcards_from_sid', function () {
    it('should return xcards from normal psid', function () {
      expect(H.xcards_from_sid('basic-firstplay'))
        .toEqual(H.xcards_from_psid('basic-firstplay'));
    });
    it('should handle special psid - randomXX', function () {
      var xcards1 = H.xcards_from_sid('random10');
      var xcards2;
      do {
        xcards2 = H.xcards_from_sid('random10');
      } while (xcards1 == xcards2);
      expect(xcards1).not.toEqual(xcards2);

      expect(H.xcards_from_sid('random10').length).toEqual(10);
      expect(H.xcards_from_sid('random12').length).toEqual(12);
      expect(H.xcards_from_sid('random20').length).toEqual(20);
      expect(H.xcards_from_sid('random4').length).toEqual(4);
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
// vim: foldexpr=getline(v\:lnum)=~#'\\v<x?(describe|it|beforeEach|afterEach)>.*<function>\\s*\\([^()]*\\)\\s*\\{'?'a1'\:(getline(v\:lnum)=~#'^\\s*});$'?'s1'\:'=')
