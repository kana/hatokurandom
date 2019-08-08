import { sortBy } from 'lodash-es'

// =================
// Naming convension
// =================
//
// cid: Card ID (number)
// eid: Expansion ID (number)
// pid: Page ID (e.g. "supply:basic-firstplay")
// rsid: Random Supply ID (e.g. "BAXBGBMBOBPBTB0B4CCCJ" in "supply:BAXBGBMBOBPBTB0B4CCCJ")
// card: { cid: ..., name: ..., ... }
// xcard: card + { dropped: boolean }

class InternalError extends Error {}

const LOCATION_ORIGIN = 'https://hatokurandom.whileimautomaton.net'

const EID_BASIC = 1
const EID_FAREAST = 2
const EID_NORTHERN = 3
const EID_FAIRY = 4
const EID_SIX = 5
const EID_STAR = 6
const EID_INTERLUDE = 7
const EID_LEGIONS = 8

export const EXPANSIONS = [ // {{{
  { eid: EID_BASIC, name: '基本セット', symbol: '基本', optionKey: 'includeExpansionBasic' },
  { eid: EID_FAREAST, name: '極東辺境領', symbol: '極東', optionKey: 'includeExpansionFareast' },
  { eid: EID_NORTHERN, name: '北限の魔女', symbol: '北限', optionKey: 'includeExpansionNorthern' },
  { eid: EID_FAIRY, name: 'フェアリーガーデン', symbol: 'ＦＧ', optionKey: 'includeExpansionFairy' },
  { eid: EID_SIX, name: '六都市同盟', symbol: '六都', optionKey: 'includeExpansionSix' },
  { eid: EID_STAR, name: '星天前路', symbol: '星天', optionKey: 'includeExpansionStar' },
  { eid: EID_INTERLUDE, name: '姫君たちの幕間劇', symbol: '幕間' },
  { eid: EID_LEGIONS, name: 'レギオンズ!', symbol: 'レ！' }
] // }}}

const EID_TO_EXPANSION_TABLE = new Map(EXPANSIONS.map(e => [e.eid, e]))

export function expansionFromEid (eid) {
  return EID_TO_EXPANSION_TABLE.get(eid)
}

const ALL_CARDS = [ // {{{
  // Sorted by eid, cost, link, then name.
  // :'<,'>sort /cid: \S\+, \zs.*/ r
  //
  // Princess cards are counted as rare cards.
  // Reference: https://twitter.com/HeartofCrown/status/233840190383341568

  // 基本セット {{{

  { cid: 0x34, eid: EID_BASIC, cost: 0, link: undefined, name: '呪い', types: ['災い'], cursed: true, rarity: 'B' },

  { cid: 0x2b, eid: EID_BASIC, cost: 1, link: 1, name: '農村', types: ['領地'], rarity: 'B' },

  { cid: 0x01, eid: EID_BASIC, cost: 2, link: 1, name: '城壁', types: ['行動', '防衛'], rarity: 'C' },
  { cid: 0x02, eid: EID_BASIC, cost: 2, link: 1, name: '寄付', types: ['行動'], rarity: 'C' },
  { cid: 0x03, eid: EID_BASIC, cost: 2, link: 1, name: '願いの泉', types: ['行動'], rarity: 'C' },
  { cid: 0x04, eid: EID_BASIC, cost: 2, link: 2, name: '斥候', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C' },
  { cid: 0x05, eid: EID_BASIC, cost: 2, link: 2, name: '早馬', types: ['行動'], rarity: 'C' },
  { cid: 0x2e, eid: EID_BASIC, cost: 2, link: undefined, name: '見習い侍女', types: ['継承権'], subtype: '侍女', rarity: 'B' },

  { cid: 0x06, eid: EID_BASIC, cost: 3, link: 0, name: '交易船', types: ['行動'], subtype: '商人', rarity: 'C' },
  { cid: 0x07, eid: EID_BASIC, cost: 3, link: 0, name: '埋もれた財宝', types: ['行動'], rarity: 'C' },
  { cid: 0x08, eid: EID_BASIC, cost: 3, link: 0, name: '御用商人', types: ['行動'], subtype: '商人', rarity: 'C' },
  { cid: 0x09, eid: EID_BASIC, cost: 3, link: 1, name: '召集令状', types: ['行動'], rarity: 'C' },
  { cid: 0x0a, eid: EID_BASIC, cost: 3, link: 1, name: '焼き畑農業', types: ['行動'], rarity: 'C' },
  { cid: 0x0b, eid: EID_BASIC, cost: 3, link: 1, name: '破城槌', types: ['行動'], rarity: 'C' },
  { cid: 0x0c, eid: EID_BASIC, cost: 3, link: 1, name: '買収工作', types: ['行動', '攻撃'], subtype: '計略', rarity: 'C' },
  { cid: 0x2c, eid: EID_BASIC, cost: 3, link: 1, name: '都市', types: ['領地'], rarity: 'B' },
  { cid: 0x0d, eid: EID_BASIC, cost: 3, link: 1, name: '隠れ家', types: ['行動', '防衛'], rarity: 'C' },
  { cid: 0x0e, eid: EID_BASIC, cost: 3, link: 1, name: '魔法の護符', types: ['行動', '防衛', '災い'], cursed: true, rarity: 'C' },
  { cid: 0x2f, eid: EID_BASIC, cost: 3, link: undefined, name: '宮廷侍女', types: ['継承権'], subtype: '侍女', rarity: 'B' },

  { cid: 0x0f, eid: EID_BASIC, cost: 4, link: 0, name: '歩兵大隊', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C' },
  { cid: 0x10, eid: EID_BASIC, cost: 4, link: 1, name: '図書館', types: ['行動'], rarity: 'C' },
  { cid: 0x11, eid: EID_BASIC, cost: 4, link: 1, name: '追い立てられた魔獣', types: ['行動', '攻撃'], subtype: '計略', rarity: 'C' },
  { cid: 0x12, eid: EID_BASIC, cost: 4, link: 1, name: '都市開発', types: ['行動'], subtype: '商人', rarity: 'C' },
  { cid: 0x13, eid: EID_BASIC, cost: 4, link: 1, name: '金貸し', types: ['行動'], subtype: '商人', rarity: 'C' },
  { cid: 0x14, eid: EID_BASIC, cost: 4, link: 1, name: '魅了術の魔女', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C' },
  { cid: 0x15, eid: EID_BASIC, cost: 4, link: 2, name: 'シノビ', types: ['行動'], subtype: '計略', rarity: 'C' },
  { cid: 0x16, eid: EID_BASIC, cost: 4, link: 2, name: '星詠みの魔女', types: ['行動'], subtype: '魔法', rarity: 'C' },
  { cid: 0x17, eid: EID_BASIC, cost: 4, link: 2, name: '補給部隊', types: ['行動'], subtype: '兵力', rarity: 'C' },

  { cid: 0x18, eid: EID_BASIC, cost: 5, link: 0, name: '冒険者', types: ['行動'], rarity: 'C' },
  { cid: 0x19, eid: EID_BASIC, cost: 5, link: 0, name: '呪詛の魔女', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C' },
  { cid: 0x1a, eid: EID_BASIC, cost: 5, link: 0, name: '近衛騎士団', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C' },
  { cid: 0x1b, eid: EID_BASIC, cost: 5, link: 0, name: '銀行', types: ['行動'], subtype: '商人', rarity: 'C' },
  { cid: 0x1c, eid: EID_BASIC, cost: 5, link: 1, name: '皇室領', types: ['継承権', '領地'], rarity: 'C' },
  { cid: 0x1d, eid: EID_BASIC, cost: 5, link: 1, name: '錬金術師', types: ['行動'], rarity: 'C' },
  { cid: 0x30, eid: EID_BASIC, cost: 5, link: undefined, name: '議員', types: ['継承権'], rarity: 'B' },

  { cid: 0x2d, eid: EID_BASIC, cost: 6, link: 1, name: '大都市', types: ['領地'], rarity: 'B' },
  { cid: 0x37, eid: EID_BASIC, cost: 6, link: undefined, name: '南洋の市姫 クラムクラム', types: ['プリンセス'], rarity: 'R' },
  { cid: 0x3a, eid: EID_BASIC, cost: 6, link: undefined, name: '双子の姫 レイン&シオン', types: ['プリンセス'], rarity: 'R' },
  { cid: 0x1e, eid: EID_BASIC, cost: 6, link: undefined, name: '噂好きの公爵夫人', types: ['継承権'], rarity: 'C' },
  { cid: 0x38, eid: EID_BASIC, cost: 6, link: undefined, name: '大方博雅の姫 ベルガモット', types: ['プリンセス'], rarity: 'R' },
  { cid: 0x39, eid: EID_BASIC, cost: 6, link: undefined, name: '姫将軍 フラマリア', types: ['プリンセス'], rarity: 'R' },
  { cid: 0x35, eid: EID_BASIC, cost: 6, link: undefined, name: '第一皇女 ルルナサイカ', types: ['プリンセス'], rarity: 'R' },
  { cid: 0x36, eid: EID_BASIC, cost: 6, link: undefined, name: '第二皇女 ラオリリ', types: ['プリンセス'], rarity: 'R' },

  { cid: 0x31, eid: EID_BASIC, cost: 8, link: undefined, name: '公爵', types: ['継承権'], rarity: 'B' },

  { cid: 0x32, eid: EID_BASIC, cost: 11, link: 1, name: '帝都カリクマ', types: ['継承権', '領地'], rarity: 'R' },

  { cid: 0x33, eid: EID_BASIC, cost: 13, link: undefined, name: '皇帝の冠', types: ['継承権'], rarity: 'R' },

  // }}}
  // 極東辺境領 {{{

  { cid: 0x1f, eid: EID_FAREAST, cost: 2, link: 0, name: 'お金好きの妖精', types: ['行動'], subtype: '魔法', rarity: 'C' },

  { cid: 0x20, eid: EID_FAREAST, cost: 3, link: 0, name: '課税', types: ['行動'], rarity: 'C' },
  { cid: 0x21, eid: EID_FAREAST, cost: 3, link: 0, name: '貿易商人', types: ['行動'], subtype: '商人', rarity: 'C' },
  { cid: 0x22, eid: EID_FAREAST, cost: 3, link: 1, name: '伝書鳩', types: ['行動'], subtype: '計略', rarity: 'C' },
  { cid: 0x23, eid: EID_FAREAST, cost: 3, link: 1, name: '弓兵隊', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C' },

  { cid: 0x24, eid: EID_FAREAST, cost: 4, link: 0, name: 'サムライ', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C' },
  { cid: 0x25, eid: EID_FAREAST, cost: 4, link: 1, name: 'クノイチ', types: ['行動', '防衛'], subtype: '計略', rarity: 'C' },
  { cid: 0x26, eid: EID_FAREAST, cost: 4, link: 1, name: '見習い魔女', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C' },
  { cid: 0x27, eid: EID_FAREAST, cost: 4, link: 1, name: '鉱山都市', types: ['領地'], rarity: 'C' },
  { cid: 0x28, eid: EID_FAREAST, cost: 4, link: 2, name: '港町', types: ['領地'], rarity: 'C' },

  { cid: 0x29, eid: EID_FAREAST, cost: 5, link: 0, name: '割り符', types: ['行動'], subtype: '商人', rarity: 'C' },
  { cid: 0x2a, eid: EID_FAREAST, cost: 5, link: 2, name: '結盟', types: ['行動'], rarity: 'C' },

  { cid: 0x3b, eid: EID_FAREAST, cost: 6, link: undefined, name: '極東の算法姫 オウカ', types: ['プリンセス'], rarity: 'R' },

  // }}}
  // 北限の魔女 {{{

  { cid: 0x3f, eid: EID_NORTHERN, cost: 2, link: 1, name: 'ケットシー', types: ['行動'], subtype: '魔法', rarity: 'C' },
  { cid: 0x40, eid: EID_NORTHERN, cost: 2, link: 1, name: '幸運の銀貨', types: ['行動'], rarity: 'C' },

  { cid: 0x41, eid: EID_NORTHERN, cost: 3, link: 1, name: '洗礼', types: ['行動'], rarity: 'C' },
  { cid: 0x43, eid: EID_NORTHERN, cost: 3, link: 2, name: '名馬', types: ['行動'], rarity: 'C' },
  { cid: 0x42, eid: EID_NORTHERN, cost: 3, link: undefined, name: '呪いの人形', types: ['災い'], cursed: true, rarity: 'C' },

  { cid: 0x45, eid: EID_NORTHERN, cost: 4, link: 0, name: 'ドワーフの宝石職人', types: ['行動'], rarity: 'C' },
  { cid: 0x44, eid: EID_NORTHERN, cost: 4, link: 0, name: '宮廷闘争', types: ['行動', '攻撃'], subtype: '計略', rarity: 'C' },
  { cid: 0x3e, eid: EID_NORTHERN, cost: 4, link: 2, name: 'エルフの狙撃手', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C' },

  { cid: 0x47, eid: EID_NORTHERN, cost: 5, link: 0, name: '地方役人', types: ['行動'], rarity: 'C' },
  { cid: 0x3d, eid: EID_NORTHERN, cost: 5, link: 0, name: '豪商', types: ['行動'], subtype: '商人', rarity: 'C' },
  { cid: 0x46, eid: EID_NORTHERN, cost: 5, link: undefined, name: '貴族の一人娘', types: ['継承権'], rarity: 'C' },

  { cid: 0x48, eid: EID_NORTHERN, cost: 6, link: 0, name: '独占', types: ['行動'], rarity: 'C' },
  { cid: 0x49, eid: EID_NORTHERN, cost: 6, link: 1, name: '工業都市', types: ['領地'], rarity: 'C' },
  { cid: 0x3c, eid: EID_NORTHERN, cost: 6, link: undefined, name: '北限の魔女姫 アナスタシア', types: ['プリンセス'], rarity: 'R' },

  // }}}
  // フェアリーガーデン  //{{{

  { cid: 0x4f, eid: EID_FAIRY, cost: 2, link: 1, name: '家守の精霊', types: ['行動'], subtype: '魔法', rarity: 'C' },
  { cid: 0x51, eid: EID_FAIRY, cost: 2, link: 1, name: '春風の妖精', types: ['行動'], subtype: '魔法', rarity: 'C' },
  { cid: 0x50, eid: EID_FAIRY, cost: 2, link: 2, name: '伝令', types: ['行動'], rarity: 'C' },
  { cid: 0x4d, eid: EID_FAIRY, cost: 2, link: 2, name: '密偵', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C' },
  { cid: 0x4e, eid: EID_FAIRY, cost: 2, link: 2, name: '巡礼', types: ['行動'], rarity: 'C' },

  { cid: 0x55, eid: EID_FAIRY, cost: 3, link: 1, name: 'リーフフェアリー', types: ['行動'], subtype: '魔法', rarity: 'C' },
  { cid: 0x52, eid: EID_FAIRY, cost: 3, link: 1, name: '司書', types: ['行動'], rarity: 'C' },
  { cid: 0x56, eid: EID_FAIRY, cost: 3, link: 1, name: '旅芸人', types: ['行動'], rarity: 'C' },
  { cid: 0x53, eid: EID_FAIRY, cost: 3, link: 1, name: '祝福', types: ['行動'], rarity: 'C' },
  { cid: 0x57, eid: EID_FAIRY, cost: 3, link: 2, name: 'ギルドマスター', types: ['行動'], rarity: 'C' },
  { cid: 0x54, eid: EID_FAIRY, cost: 3, link: 2, name: '星巫女の託宣', types: ['行動'], subtype: '魔法', rarity: 'C' },

  { cid: 0x5e, eid: EID_FAIRY, cost: 4, link: 0, name: 'ブラウニー', types: ['行動'], subtype: '魔法', rarity: 'C' },
  { cid: 0x4c, eid: EID_FAIRY, cost: 4, link: 0, name: '氷雪の精霊', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C' },
  { cid: 0x5b, eid: EID_FAIRY, cost: 4, link: 0, name: '石弓隊', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C' },
  { cid: 0x5d, eid: EID_FAIRY, cost: 4, link: 0, name: '行商人', types: ['行動'], subtype: '商人', rarity: 'C' },
  { cid: 0x59, eid: EID_FAIRY, cost: 4, link: 0, name: '辻占い師', types: ['行動'], subtype: '魔法', rarity: 'C' },
  { cid: 0x58, eid: EID_FAIRY, cost: 4, link: 1, name: 'ニンフ', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C' },
  { cid: 0x4a, eid: EID_FAIRY, cost: 4, link: 1, name: '大農園', types: ['領地'], rarity: 'C' },
  { cid: 0x5a, eid: EID_FAIRY, cost: 4, link: 1, name: '御料地', types: ['領地'], rarity: 'C' },
  { cid: 0x5f, eid: EID_FAIRY, cost: 4, link: 1, name: '検地役人', types: ['行動', '攻撃'], rarity: 'C' },

  { cid: 0x5c, eid: EID_FAIRY, cost: 5, link: 0, name: '商船団', types: ['行動'], subtype: '商人', rarity: 'C' },
  { cid: 0x64, eid: EID_FAIRY, cost: 5, link: 0, name: '執事', types: ['行動'], rarity: 'C' },
  { cid: 0x65, eid: EID_FAIRY, cost: 5, link: 0, name: '徴税人', types: ['行動', '攻撃'], rarity: 'C' },
  { cid: 0x60, eid: EID_FAIRY, cost: 5, link: 0, name: '聖堂騎士', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C' },
  { cid: 0x62, eid: EID_FAIRY, cost: 5, link: 0, name: '鬼族の戦士', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C' },
  { cid: 0x61, eid: EID_FAIRY, cost: 5, link: 1, name: '交易都市', types: ['領地'], rarity: 'C' },
  { cid: 0x4b, eid: EID_FAIRY, cost: 5, link: 1, name: '収穫祭', types: ['行動'], rarity: 'C' },
  { cid: 0x66, eid: EID_FAIRY, cost: 5, link: 1, name: '合併', types: ['行動'], rarity: 'C' },
  { cid: 0x63, eid: EID_FAIRY, cost: 5, link: undefined, name: 'メイド長', types: ['継承権'], subtype: '侍女', rarity: 'C' },

  { cid: 0x67, eid: EID_FAIRY, cost: 6, link: undefined, name: '裁判官', types: ['継承権'], rarity: 'C' },

  { cid: 0x68, eid: EID_FAIRY, cost: 11, link: undefined, name: '妖精女王エルルーン', types: ['継承権'], rarity: 'R' },

  // }}}
  // 六都市同盟 {{{

  { cid: 0x69, eid: EID_SIX, cost: 6, link: undefined, name: 'オアシスの美姫 エムシエレ', types: ['プリンセス'], rarity: 'R' },
  { cid: 0x6a, eid: EID_SIX, cost: 9, link: 1, name: 'オアシス都市ネフェルティリ', types: ['領地'], rarity: 'R' },

  { cid: 0x6b, eid: EID_SIX, cost: '+2', link: undefined, name: 'メイド長クロナ', types: ['サポート'], rarity: 'R' },
  { cid: 0x6c, eid: EID_SIX, cost: '+2', link: undefined, name: '帝国議事堂', types: ['サポート'], rarity: 'R' },
  { cid: 0x6d, eid: EID_SIX, cost: '+2', link: undefined, name: '軍師シャオリン', types: ['サポート'], rarity: 'R' },
  { cid: 0x6e, eid: EID_SIX, cost: '+2', link: undefined, name: '豪農ニコル', types: ['サポート'], rarity: 'R' },
  { cid: 0x6f, eid: EID_SIX, cost: '+2', link: undefined, name: '政商ウィリアム', types: ['サポート'], rarity: 'R' },
  { cid: 0x70, eid: EID_SIX, cost: '+2', link: undefined, name: '聖ルモイ大聖堂', types: ['サポート'], rarity: 'R' },
  { cid: 0x71, eid: EID_SIX, cost: '+2', link: undefined, name: '先帝ヘラルドの王錫', types: ['サポート'], rarity: 'R' },
  { cid: 0x72, eid: EID_SIX, cost: '+2', link: undefined, name: '大魔女アウローラ', types: ['サポート'], rarity: 'R' },

  { cid: 0x73, eid: EID_SIX, cost: 3, link: 0, name: 'いたずら妖精', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C' },
  { cid: 0x74, eid: EID_SIX, cost: 5, link: 2, name: 'ニンジャマスター', types: ['行動'], rarity: 'C' },
  { cid: 0x75, eid: EID_SIX, cost: 3, link: 0, name: 'へそくり', types: ['行動'], rarity: 'C' },
  { cid: 0x76, eid: EID_SIX, cost: 4, link: 0, name: 'まじない師', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C' },
  { cid: 0x77, eid: EID_SIX, cost: 4, link: 0, name: '開発命令', types: ['行動', '攻撃'], rarity: 'C' },
  { cid: 0x78, eid: EID_SIX, cost: 5, link: 1, name: '学術都市', types: ['領地'], rarity: 'C' },
  { cid: 0x79, eid: EID_SIX, cost: 2, link: 2, name: '漁村', types: ['領地'], rarity: 'C' },
  { cid: 0x7a, eid: EID_SIX, cost: 5, link: 0, name: '十字軍', types: ['行動'], subtype: '兵力', rarity: 'C' },
  { cid: 0x7b, eid: EID_SIX, cost: 3, link: 2, name: '女学院', types: ['行動'], rarity: 'C' },
  { cid: 0x7c, eid: EID_SIX, cost: 12, link: undefined, name: '大公爵', types: ['継承権'], rarity: 'C' },
  { cid: 0x7d, eid: EID_SIX, cost: 5, link: 1, name: '転売屋', types: ['行動'], subtype: '商人', rarity: 'C' },
  { cid: 0x7e, eid: EID_SIX, cost: 5, link: 1, name: '独立都市', types: ['領地'], rarity: 'C' },
  { cid: 0x7f, eid: EID_SIX, cost: 5, link: 0, name: '砲兵部隊', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C' },
  { cid: 0x80, eid: EID_SIX, cost: 4, link: 1, name: '魔法のランプ', types: ['行動'], subtype: '魔法', rarity: 'C' },
  { cid: 0x81, eid: EID_SIX, cost: 5, link: 0, name: '免罪符', types: ['行動'], rarity: 'C' },
  { cid: 0x82, eid: EID_SIX, cost: 5, link: 0, name: '傭兵団', types: ['行動', '攻撃'], subtype: '兵力', rarity: 'C' },

  { cid: 0x83, eid: EID_SIX, cost: 0, link: undefined, name: '不運', types: ['災い'], rarity: undefined },

  // }}}
  // 星天前路 {{{

  { cid: 0x84, eid: EID_STAR, cost: 6, link: undefined, name: '古王朝の裔姫 ルウェリー', types: ['プリンセス'], rarity: 'R' },

  { cid: 0x85, eid: EID_STAR, cost: '+2', link: undefined, name: '帝立魔法図書館', types: ['サポート'], rarity: 'R' },
  { cid: 0x86, eid: EID_STAR, cost: '+2', link: undefined, name: '帝宮の宝物庫', types: ['サポート'], rarity: 'R' },

  { cid: 0x87, eid: EID_STAR, cost: 4, link: 0, name: '義賊', types: ['行動', '攻撃'], rarity: 'C' },
  { cid: 0x88, eid: EID_STAR, cost: 5, link: 1, name: '離れ小島', types: ['領地'], rarity: 'C' },
  { cid: 0x89, eid: EID_STAR, cost: 5, link: 1, name: 'ウィッチドクター', types: ['行動'], subtype: '魔法', rarity: 'C' },
  { cid: 0x8a, eid: EID_STAR, cost: 5, link: undefined, name: '富豪の愛娘', types: ['継承権'], rarity: 'C' },
  { cid: 0x8b, eid: EID_STAR, cost: 4, link: 1, name: '家庭教師', types: ['行動'], rarity: 'C' },
  { cid: 0x8c, eid: EID_STAR, cost: 4, link: 1, name: 'カンフーマスター', types: ['行動', '攻撃'], rarity: 'C' },
  { cid: 0x8d, eid: EID_STAR, cost: 3, link: 2, name: '灯台', types: ['領地'], rarity: 'C' },
  { cid: 0x8e, eid: EID_STAR, cost: 5, link: 0, name: 'キョンシー', types: ['行動', '攻撃'], subtype: '魔法', rarity: 'C' },
  { cid: 0x8f, eid: EID_STAR, cost: 5, link: 1, name: 'キャラバン', types: ['行動'], subtype: '商人', rarity: 'C' },
  { cid: 0x90, eid: EID_STAR, cost: 4, link: 0, name: '先行投資', types: ['行動'], rarity: 'C' },

  // }}}
  // 姫君たちの幕間劇 {{{

  { cid: 0x91, eid: EID_INTERLUDE, cost: 3, link: undefined, name: 'お付の侍女 リリー', types: ['継承権'], rarity: 'R' },
  { cid: 0x92, eid: EID_INTERLUDE, cost: 3, link: undefined, name: 'お付の侍女 ホノカ', types: ['継承権'], rarity: 'R' },
  { cid: 0x93, eid: EID_INTERLUDE, cost: 3, link: undefined, name: 'お付の侍女 ミンニャン', types: ['継承権'], rarity: 'R' },
  { cid: 0x94, eid: EID_INTERLUDE, cost: 3, link: undefined, name: 'お付の侍女 シャリファ', types: ['継承権'], rarity: 'R' },

  { cid: 0x95, eid: EID_INTERLUDE, cost: 2, link: 2, name: '従者', types: ['行動'], rarity: 'B' },
  { cid: 0x96, eid: EID_INTERLUDE, cost: 2, link: 1, name: '屋敷', types: ['領地'], rarity: 'B' },

  // }}}
  // レギオンズ! {{{

  { cid: 0x97, eid: EID_LEGIONS, cost: 8, link: undefined, name: '妖精姫 エルルーン', types: ['プリンセス'], rarity: 'R' }

  // }}}
] // }}}

export const COMMON_CARDS = ALL_CARDS.filter(card => card.rarity === 'C')

const CID_TO_CARD_TABLE = new Map(ALL_CARDS.map(card => [card.cid, card]))

export function cardFromCid (cid) {
  return CID_TO_CARD_TABLE.get(cid)
}

const PID_TO_CHILD_PIDS_TABLE = { // {{{
  'home': [ // {{{
    'supplies:random',
    'supplies:log',
    'supplies:basic',
    'supplies:fareast',
    'supplies:northern',
    'supplies:fairy',
    'supplies:six',
    'supplies:star',
    'supplies:championship1',
    'supply:editor',
    'card-references',
    'about'
  ], // }}}
  'preferences': [ // {{{
    'preferences/banned-cards'
  ], // }}}
  'supplies:random': [ // {{{
    'supply:random10',
    'supply:random12',
    'supply:random13',
    'supply:random14'
  ], // }}}
  'supplies:basic': [ // {{{
    'supply:basic-firstplay',
    'supply:basic-guide',
    'supply:basic-guide2',
    'supply:basic-intermediate',
    'supply:basic-intermediate2',
    'supply:basic-bigbusiness',
    'supply:basic-greatwar',
    'supply:basic-adventure',
    'supply:basic-witchcraft',
    'supply:basic-courtpolitics'
  ], // }}}
  'supplies:fareast': [ // {{{
    'supply:fareast-firstplay',
    'supply:fareast-porttown',
    'supply:fareast-prosperity',
    'supply:fareast-mine',
    'supply:fareast-citystrife',
    'supply:fareast-scandal',
    'supply:fareast-battlefield',
    'supply:fareast-guildstrife',
    'supply:fareast-kunoichi',
    'supply:fareast-moneymoneymoney'
  ], // }}}
  'supplies:northern': [ // {{{
    'supply:northern-territory',
    'supply:northern-parliament',
    'supply:northern-witchandchurch',
    'supply:northern-society',
    'supply:northern-guiltycrown',
    'supply:northern-darkness',
    'supply:northern-scandal',
    'supply:northern-teaparty',
    'supply:northern-swordsman'
  ], // }}}
  'supplies:fairy': [ // {{{
    'supply:fairy-primer',
    'supply:fairy-butlerandmaid',
    'supply:fairy-winter',
    'supply:fairy-folklore',
    'supply:fairy-frontier',
    'supply:fairy-carnival',
    'supply:fairy-holyornot',
    'supply:fairy-fairyandknight'
  ], // }}}
  'supplies:six': [ // {{{
    'supply:six-journey',
    'supply:six-alliance',
    'supply:six-trade',
    'supply:six-churchesandwars',
    'supply:six-inquisition',
    'supply:six-water',
    'supply:six-rottenauthority'
  ], // }}}
  'supplies:star': [ // {{{
    'supply:star-journey',
    'supply:star-risky',
    'supply:star-war',
    'supply:star-silkroad',
    'supply:star-wisdom',
    'supply:star-wish'
  ], // }}}
  'supplies:championship1': [ // {{{
    'supply:championship1-prelims1',
    'supply:championship1-prelims2',
    'supply:championship1-prelims3',
    'supply:championship1-semifinals',
    'supply:championship1-finals'
  ], // }}}
  'card-references': [ // {{{
    'references:type',
    'references:subtype',
    'references:cost',
    'references:link',
    'references:expansion',
    'references:rarity'
  ], // }}}
  'references:type': [ // {{{
    'reference:all-actions',
    'reference:plain-actions',
    'reference:attacks',
    'reference:defenses',
    'reference:territories',
    'reference:authorities',
    'reference:misfortune',
    'reference:curses',
    'reference:princesses',
    'reference:support'
  ], // }}}
  'references:subtype': [ // {{{
    'reference:subtype-army',
    'reference:subtype-trick',
    'reference:subtype-magic',
    'reference:subtype-merchant',
    'reference:subtype-maid'
  ], // }}}
  'references:cost': [ // {{{
    'reference:cost1orless',
    'reference:cost2',
    'reference:cost3',
    'reference:cost4',
    'reference:cost5',
    'reference:cost6',
    'reference:cost7ormore',
    'reference:costspecial'
  ], // }}}
  'references:link': [ // {{{
    'reference:link0',
    'reference:link1',
    'reference:link2',
    'reference:unplayable'
  ], // }}}
  'references:expansion': [ // {{{
    'reference:basic',
    'reference:fareast',
    'reference:northern',
    'reference:fairy',
    'reference:six',
    'reference:star',
    'reference:interlude',
    'reference:legions'
  ], // }}}
  'references:rarity': [ // {{{
    'reference:rarity-basic',
    'reference:rarity-common',
    'reference:rarity-rare',
    'reference:rarity-special'
  ], // }}}
  'Dummy entry to make folds simple.': []
} // }}}

export function childPidsFromPid (pid) {
  return PID_TO_CHILD_PIDS_TABLE[pid]
}

const PID_TO_PARENT_PID_TABLE = (() => { // {{{
  const t = {}
  for (const parentPid in PID_TO_CHILD_PIDS_TABLE) {
    for (const childPid of PID_TO_CHILD_PIDS_TABLE[parentPid]) {
      t[childPid] = parentPid
    }
  }
  return t
})() // }}}

export function parentPidFromPid (pid) {
  return PID_TO_PARENT_PID_TABLE[pid]
}

const PID_TO_TITLE_TABLE = { // {{{
  'home': 'ハトクランダム',
  'about': 'このアプリについて',
  'preferences': '設定',
  'preferences/banned-cards': '禁止カードの設定',
  'supplies:random': 'ランダム選択',
  'supply:random10': 'ランダムに10枚選択',
  'supply:random12': 'ランダムに12枚選択',
  'supply:random13': 'ランダムに13枚選択',
  'supply:random14': 'ランダムに14枚選択',
  'supplies:log': '過去に選択したサプライ',
  'supplies:basic': '推奨サプライ（基本セット）',
  'supply:basic-firstplay': 'ファーストプレイ',
  'supply:basic-guide': '入門用',
  'supply:basic-guide2': '入門用その2',
  'supply:basic-intermediate': '中級用',
  'supply:basic-intermediate2': '中級用その2',
  'supply:basic-bigbusiness': 'ビッグビジネス',
  'supply:basic-greatwar': '大戦争',
  'supply:basic-adventure': '冒険行',
  'supply:basic-witchcraft': 'ワルプルギスの夜',
  'supply:basic-courtpolitics': '宮廷政治',
  'supplies:fareast': '推奨サプライ（極東辺境領）',
  'supply:fareast-firstplay': '初めてのハトクラ',
  'supply:fareast-porttown': '港町の攻防',
  'supply:fareast-prosperity': '交易と繁栄',
  'supply:fareast-mine': '豊かな鉱脈',
  'supply:fareast-citystrife': '都市間抗争',
  'supply:fareast-scandal': '開発の醜聞',
  'supply:fareast-battlefield': '戦場の絆',
  'supply:fareast-guildstrife': 'ギルド間抗争',
  'supply:fareast-kunoichi': 'クノイチ忍法帖',
  'supply:fareast-moneymoneymoney': '金に色無し',
  'supplies:northern': '推奨サプライ（北限の魔女）',
  'supply:northern-territory': '北限領',
  'supply:northern-parliament': '議会を占拠せよ',
  'supply:northern-witchandchurch': '魔女と教会',
  'supply:northern-society': '社交界',
  'supply:northern-guiltycrown': '罪の王冠',
  'supply:northern-darkness': '暗闘',
  'supply:northern-scandal': '開拓の醜聞',
  'supply:northern-teaparty': '魔女のお茶会',
  'supply:northern-swordsman': '異国の剣士',
  'supplies:fairy': '推奨サプライ（フェアリーガーデン）',
  'supply:fairy-primer': 'フェアリーガーデン入門',
  'supply:fairy-butlerandmaid': '執事とメイド',
  'supply:fairy-winter': '冬来たりなば',
  'supply:fairy-folklore': 'フォークロア',
  'supply:fairy-frontier': '辺境部族',
  'supply:fairy-carnival': '謝肉祭',
  'supply:fairy-holyornot': '聖か俗か',
  'supply:fairy-fairyandknight': '妖精と騎士',
  'supplies:six': '推奨サプライ（六都市同盟）',
  'supply:six-journey': '旅の始めに',
  'supply:six-alliance': '六都市同盟',
  'supply:six-trade': '大陸間交易',
  'supply:six-churchesandwars': '教会と戦争',
  'supply:six-inquisition': '異端審問',
  'supply:six-water': '水は巡る',
  'supply:six-rottenauthority': '絶対の権力は徹底的に腐敗する',
  'supplies:star': '推奨サプライ（星天前路）',
  'supply:star-journey': '遠路に幸あれかし',
  'supply:star-risky': 'ハイリスクハイリターン',
  'supply:star-war': '政争と戦争',
  'supply:star-silkroad': 'シルクロード',
  'supply:star-wisdom': '知は力なり',
  'supply:star-wish': '天の星よ我が路行を照らせ',
  'supplies:championship1': '世界選手権',
  'supply:championship1-prelims1': '予選第1回戦',
  'supply:championship1-prelims2': '予選第2回戦',
  'supply:championship1-prelims3': '予選第3回戦',
  'supply:championship1-semifinals': '準決勝',
  'supply:championship1-finals': '決勝《王冠の行方》',
  'supply:editor': '手動作成',
  'card-references': '機能別カードリスト',
  'references:type': 'タイプ別カードリスト',
  'reference:all-actions': '行動カード一覧(全て)',
  'reference:plain-actions': '行動カード一覧(攻撃/防衛以外)',
  'reference:attacks': '攻撃カード一覧',
  'reference:defenses': '防衛カード一覧',
  'reference:territories': '領地カード一覧',
  'reference:authorities': '継承権カード一覧',
  'reference:misfortune': '災いカード一覧',
  'reference:curses': '「呪い」でもあるカード一覧',
  'reference:princesses': 'プリンセスカード一覧',
  'reference:support': 'サポートカード一覧',
  'references:subtype': 'サブタイプ別カードリスト',
  'reference:subtype-army': '兵力カード一覧',
  'reference:subtype-trick': '計略カード一覧',
  'reference:subtype-magic': '魔法カード一覧',
  'reference:subtype-merchant': '商人カード一覧',
  'reference:subtype-maid': '侍女カード一覧',
  'references:cost': 'コスト別カードリスト',
  'reference:cost1orless': 'コスト1以下のカード一覧',
  'reference:cost2': 'コスト2のカード一覧',
  'reference:cost3': 'コスト3のカード一覧',
  'reference:cost4': 'コスト4のカード一覧',
  'reference:cost5': 'コスト5のカード一覧',
  'reference:cost6': 'コスト6のカード一覧',
  'reference:cost7ormore': 'コスト7以上のカード一覧',
  'reference:costspecial': '特殊なコストのカード一覧',
  'references:link': 'リンク別カードリスト',
  'reference:link0': 'リンク0のカード一覧',
  'reference:link1': 'リンク1のカード一覧',
  'reference:link2': 'リンク2のカード一覧',
  'reference:unplayable': 'プレイできないカード一覧',
  'references:expansion': '収録セット別カードリスト',
  'reference:basic': '基本セットのカード一覧',
  'reference:fareast': '極東辺境領のカード一覧',
  'reference:northern': '北限の魔女のカード一覧',
  'reference:fairy': 'フェアリーガーデンのカード一覧',
  'reference:six': '六都市同盟のカード一覧',
  'reference:star': '星天前路のカード一覧',
  'reference:interlude': '姫君たちの幕間劇のカード一覧',
  'reference:legions': 'レギオンズ！のカード一覧',
  'references:rarity': 'レアリティ別カードリスト',
  'reference:rarity-basic': 'ベーシックカード一覧',
  'reference:rarity-common': 'コモンカード一覧',
  'reference:rarity-rare': 'レアカード一覧',
  'reference:rarity-special': 'レアリティが未定義のカード一覧',
  'Dummy entry to make folds simple.': ''
} // }}}

export function titleFromPid (pid) {
  const title = PID_TO_TITLE_TABLE[pid]
  if (title) {
    return title
  }

  const parsed = parseSpecialPid(pid)
  if (parsed.special && parsed.xcards) {
    return 'ランダム'
  }

  return '???'
}

function delay (expressionAsFunction) {
  let result
  let isEvaluated = false

  return () => {
    if (!isEvaluated) {
      result = expressionAsFunction()
      isEvaluated = true
    }
    return result
  }
}

function force (promise) {
  return promise()
}

function list (predicate) {
  return delay(() => ALL_CARDS.filter(predicate).map(c => c.cid))
}

function listByNames (names) {
  return list(card => names.includes(card.name))
}

function listByType (type) {
  return list(card => hasType(card, type))
}

function hasType (card, type) {
  return card.types.indexOf(type) >= 0
}

function listBySubtype (subtype) {
  return list(card => card.subtype === subtype)
}

function listByCost (cost) {
  return list(card => card.cost === cost)
}

function listByLink (count) {
  return list(card => card.link === count)
}

function listByExpansion (eid) {
  return list(card => card.eid === eid)
}

function listByRarity (rarity) {
  return list(card => card.rarity === rarity)
}

const PID_TO_DELAYED_CIDS_TABLE = { // {{{
  'supply:basic-firstplay': listByNames([ // {{{
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
  ]), // }}}
  'supply:basic-guide': listByNames([ // {{{
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
  ]), // }}}
  'supply:basic-guide2': listByNames([ // {{{
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
  ]), // }}}
  'supply:basic-intermediate': listByNames([ // {{{
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
  ]), // }}}
  'supply:basic-intermediate2': listByNames([ // {{{
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
  ]), // }}}
  'supply:basic-bigbusiness': listByNames([ // {{{
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
  ]), // }}}
  'supply:basic-greatwar': listByNames([ // {{{
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
  ]), // }}}
  'supply:basic-adventure': listByNames([ // {{{
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
  ]), // }}}
  'supply:basic-witchcraft': listByNames([ // {{{
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
  ]), // }}}
  'supply:basic-courtpolitics': listByNames([ // {{{
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
  ]), // }}}
  'supply:fareast-firstplay': listByNames([ // {{{
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
  ]), // }}}
  'supply:fareast-porttown': listByNames([ // {{{
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
  ]), // }}}
  'supply:fareast-prosperity': listByNames([ // {{{
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
  ]), // }}}
  'supply:fareast-mine': listByNames([ // {{{
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
  ]), // }}}
  'supply:fareast-citystrife': listByNames([ // {{{
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
  ]), // }}}
  'supply:fareast-scandal': listByNames([ // {{{
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
  ]), // }}}
  'supply:fareast-battlefield': listByNames([ // {{{
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
  ]), // }}}
  'supply:fareast-guildstrife': listByNames([ // {{{
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
  ]), // }}}
  'supply:fareast-kunoichi': listByNames([ // {{{
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
  ]), // }}}
  'supply:fareast-moneymoneymoney': listByNames([ // {{{
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
  ]), // }}}
  'supply:northern-territory': listByNames([ // {{{
    'ケットシー',
    '幸運の銀貨',
    'エルフの狙撃手',
    'ドワーフの宝石職人',
    '豪商',
    '工業都市',
    '願いの泉',
    '破城槌',
    '図書館',
    '冒険者'
  ]), // }}}
  'supply:northern-parliament': listByNames([ // {{{
    '名馬',
    '洗礼',
    'エルフの狙撃手',
    '豪商',
    '地方役人',
    '工業都市',
    '早馬',
    '交易船',
    '図書館',
    '呪詛の魔女'
  ]), // }}}
  'supply:northern-witchandchurch': listByNames([ // {{{
    'ケットシー',
    '幸運の銀貨',
    '洗礼',
    '宮廷闘争',
    'ドワーフの宝石職人',
    '貴族の一人娘',
    '斥候',
    '早馬',
    '都市開発',
    '呪詛の魔女'
  ]), // }}}
  'supply:northern-society': listByNames([ // {{{
    'ケットシー',
    '洗礼',
    '呪いの人形',
    '宮廷闘争',
    '貴族の一人娘',
    '豪商',
    '早馬',
    '図書館',
    '銀行',
    '噂好きの公爵夫人'
  ]), // }}}
  'supply:northern-guiltycrown': listByNames([ // {{{
    '名馬',
    'ドワーフの宝石職人',
    '宮廷闘争',
    '地方役人',
    '工業都市',
    '願いの泉',
    '城壁',
    '破城槌',
    '歩兵大隊',
    '補給部隊'
  ]), // }}}
  'supply:northern-darkness': listByNames([ // {{{
    'ケットシー',
    '呪いの人形',
    '名馬',
    'エルフの狙撃手',
    '宮廷闘争',
    '豪商',
    '独占',
    '早馬',
    '城壁',
    '錬金術師'
  ]), // }}}
  'supply:northern-scandal': listByNames([ // {{{
    '名馬',
    'ドワーフの宝石職人',
    '地方役人',
    '豪商',
    '鉱山都市',
    '割り符',
    '願いの泉',
    '錬金術師',
    '銀行',
    '噂好きの公爵夫人'
  ]), // }}}
  'supply:northern-teaparty': listByNames([ // {{{
    '幸運の銀貨',
    '名馬',
    '呪いの人形',
    'ドワーフの宝石職人',
    '地方役人',
    'お金好きの妖精',
    '伝書鳩',
    '見習い魔女',
    '結盟',
    '願いの泉'
  ]), // }}}
  'supply:northern-swordsman': listByNames([ // {{{
    '洗礼',
    '名馬',
    '独占',
    '工業都市',
    '伝書鳩',
    'サムライ',
    '鉱山都市',
    '結盟',
    '早馬',
    '交易船'
  ]), // }}}
  'supply:fairy-primer': listByNames([ // {{{
    '家守の精霊',
    '伝令',
    '春風の妖精',
    'リーフフェアリー',
    '旅芸人',
    '大農園',
    '石弓隊',
    '商船団',
    '収穫祭',
    '合併'
  ]), // }}}
  'supply:fairy-butlerandmaid': listByNames([ // {{{
    '伝令',
    '春風の妖精',
    '星巫女の託宣',
    '旅芸人',
    '石弓隊',
    '商船団',
    '行商人',
    '検地役人',
    'メイド長',
    '執事'
  ]), // }}}
  'supply:fairy-winter': listByNames([ // {{{
    '密偵',
    '伝令',
    '春風の妖精',
    '司書',
    '大農園',
    '氷雪の精霊',
    '石弓隊',
    '行商人',
    'ブラウニー',
    '執事'
  ]), // }}}
  'supply:fairy-folklore': listByNames([ // {{{
    '密偵',
    '巡礼',
    '家守の精霊',
    'ニンフ',
    '辻占い師',
    '御料地',
    '行商人',
    'ブラウニー',
    '聖堂騎士',
    'メイド長'
  ]), // }}}
  'supply:fairy-frontier': listByNames([ // {{{
    '密偵',
    '巡礼',
    '家守の精霊',
    '星巫女の託宣',
    '旅芸人',
    '商船団',
    '交易都市',
    '鬼族の戦士',
    '徴税人',
    '合併'
  ]), // }}}
  'supply:fairy-carnival': listByNames([ // {{{
    '密偵',
    '春風の妖精',
    '祝福',
    '星巫女の託宣',
    'ギルドマスター',
    '大農園',
    '石弓隊',
    '聖堂騎士',
    'メイド長',
    '収穫祭'
  ]), // }}}
  'supply:fairy-holyornot': listByNames([ // {{{
    '密偵',
    '巡礼',
    '家守の精霊',
    'リーフフェアリー',
    'ギルドマスター',
    '氷雪の精霊',
    '御料地',
    '交易都市',
    '収穫祭',
    '裁判官'
  ]), // }}}
  'supply:fairy-fairyandknight': listByNames([ // {{{
    '家守の精霊',
    '春風の妖精',
    '祝福',
    'リーフフェアリー',
    '旅芸人',
    'ギルドマスター',
    'ニンフ',
    '大農園',
    '聖堂騎士',
    '合併'
  ]), // }}}
  'supply:six-journey': listByNames([ // {{{
    '漁村',
    '開発命令',
    '学術都市',
    '独立都市',
    '転売屋',
    '春風の妖精',
    '巡礼',
    '旅芸人',
    '行商人',
    '商船団'
  ]), // }}}
  'supply:six-alliance': listByNames([ // {{{
    '漁村',
    '魔法のランプ',
    '開発命令',
    '独立都市',
    '転売屋',
    '砲兵部隊',
    '春風の妖精',
    '巡礼',
    '旅芸人',
    '行商人'
  ]), // }}}
  'supply:six-trade': listByNames([ // {{{
    '漁村',
    '女学院',
    '魔法のランプ',
    '転売屋',
    '傭兵団',
    '密偵',
    '旅芸人',
    '石弓隊',
    '行商人',
    '収穫祭'
  ]), // }}}
  'supply:six-churchesandwars': listByNames([ // {{{
    '学術都市',
    '十字軍',
    '傭兵団',
    '独立都市',
    '砲兵部隊',
    '密偵',
    '伝令',
    '司書',
    'ギルドマスター',
    '商船団'
  ]), // }}}
  'supply:six-inquisition': listByNames([ // {{{
    'いたずら妖精',
    'まじない師',
    '魔法のランプ',
    '十字軍',
    '免罪符',
    'ニンジャマスター',
    '家守の精霊',
    'リーフフェアリー',
    'ギルドマスター',
    '祝福'
  ]), // }}}
  'supply:six-water': listByNames([ // {{{
    '漁村',
    '女学院',
    'へそくり',
    '開発命令',
    '免罪符',
    'ニンジャマスター',
    '巡礼',
    'ニンフ',
    '商船団',
    '執事'
  ]), // }}}
  'supply:six-rottenauthority': listByNames([ // {{{
    'へそくり',
    'まじない師',
    '開発命令',
    '独立都市',
    '転売屋',
    '免罪符',
    '大公爵',
    '巡礼',
    '伝令',
    '収穫祭'
  ]), // }}}
  'supply:star-journey': listByNames([ // {{{
    '灯台',
    '義賊',
    'キャラバン',
    '先行投資',
    '春風の妖精',
    '伝令',
    '石弓隊',
    'ブラウニー',
    '星巫女の託宣',
    '交易都市'
  ]), // }}}
  'supply:star-risky': listByNames([ // {{{
    'カンフーマスター',
    '離れ小島',
    'ウィッチドクター',
    '先行投資',
    '家守の精霊',
    '巡礼',
    '旅芸人',
    'メイド長',
    '行商人',
    '氷雪の精霊'
  ]), // }}}
  'supply:star-war': listByNames([ // {{{
    '離れ小島',
    '灯台',
    '家庭教師',
    '富豪の愛娘',
    'キョンシー',
    'ウィッチドクター',
    '伝令',
    '聖堂騎士',
    '検地役人',
    '交易都市'
  ]), // }}}
  'supply:star-silkroad': listByNames([ // {{{
    '義賊',
    'キャラバン',
    '離れ小島',
    '先行投資',
    'ウィッチドクター',
    'いたずら妖精',
    '魔法のランプ',
    '免罪符',
    '家守の精霊',
    'リーフフェアリー'
  ]), // }}}
  'supply:star-wisdom': listByNames([ // {{{
    'カンフーマスター',
    '家庭教師',
    'キャラバン',
    '離れ小島',
    '富豪の愛娘',
    '独立都市',
    '巡礼',
    '春風の妖精',
    '収穫祭',
    '裁判官'
  ]), // }}}
  'supply:star-wish': listByNames([ // {{{
    '灯台',
    '義賊',
    'キャラバン',
    '離れ小島',
    '先行投資',
    'へそくり',
    '独立都市',
    '家守の精霊',
    '密偵',
    '星巫女の託宣'
  ]), // }}}
  'supply:championship1-prelims1': listByNames([ // {{{
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
  ]), // }}}
  'supply:championship1-prelims2': listByNames([ // {{{
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
  ]), // }}}
  'supply:championship1-prelims3': listByNames([ // {{{
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
  ]), // }}}
  'supply:championship1-semifinals': listByNames([ // {{{
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
  ]), // }}}
  'supply:championship1-finals': listByNames([ // {{{
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
  ]), // }}}
  'reference:all-actions': listByType('行動'),
  'reference:plain-actions': list(c =>
    hasType(c, '行動') &&
    !hasType(c, '攻撃') &&
    !hasType(c, '防衛')
  ),
  'reference:attacks': listByType('攻撃'),
  'reference:defenses': listByType('防衛'),
  'reference:territories': listByType('領地'),
  'reference:authorities': listByType('継承権'),
  'reference:misfortune': listByType('災い'),
  'reference:curses': list(c => c.cursed),
  'reference:princesses': listByType('プリンセス'),
  'reference:support': listByType('サポート'),
  'reference:subtype-army': listBySubtype('兵力'),
  'reference:subtype-trick': listBySubtype('計略'),
  'reference:subtype-magic': listBySubtype('魔法'),
  'reference:subtype-merchant': listBySubtype('商人'),
  'reference:subtype-maid': listBySubtype('侍女'),
  'reference:cost1orless': list(c => c.cost <= 1),
  'reference:cost2': listByCost(2),
  'reference:cost3': listByCost(3),
  'reference:cost4': listByCost(4),
  'reference:cost5': listByCost(5),
  'reference:cost6': listByCost(6),
  'reference:cost7ormore': list(c => c.cost >= 7),
  'reference:costspecial': list(c => typeof c.cost !== 'number'),
  'reference:link0': listByLink(0),
  'reference:link1': listByLink(1),
  'reference:link2': listByLink(2),
  'reference:unplayable': listByLink(undefined),
  'reference:basic': listByExpansion(EID_BASIC),
  'reference:fareast': listByExpansion(EID_FAREAST),
  'reference:northern': listByExpansion(EID_NORTHERN),
  'reference:fairy': listByExpansion(EID_FAIRY),
  'reference:six': listByExpansion(EID_SIX),
  'reference:star': listByExpansion(EID_STAR),
  'reference:interlude': listByExpansion(EID_INTERLUDE),
  'reference:legions': listByExpansion(EID_LEGIONS),
  'reference:rarity-basic': listByRarity('B'),
  'reference:rarity-common': listByRarity('C'),
  'reference:rarity-rare': listByRarity('R'),
  'reference:rarity-special': listByRarity(undefined),
  'Dummy entry to make folds simple.': []
} // }}}

export function xcardsFromPid (pid, options = {}) {
  const delayedCids = PID_TO_DELAYED_CIDS_TABLE[pid]
  if (delayedCids !== undefined) {
    return force(delayedCids).map(cid => ({
      ...cardFromCid(cid),
      dropped: false
    }))
  }

  const parsed = parseSpecialPid(pid)
  if (parsed.random) {
    return chooseRandomCards(parsed.count, options).map(card => ({
      ...card,
      dropped: false
    }))
  }
  if (parsed.xcards) {
    return parsed.xcards
  }

  return undefined
}

export function chooseRandomCards (cardCount, options) {
  const availableCards = COMMON_CARDS.filter(card =>
    (options.includeExpansionBasic === 'must_not' ? card.eid !== EID_BASIC : true) &&
    (options.includeExpansionFareast === 'must_not' ? card.eid !== EID_FAREAST : true) &&
    (options.includeExpansionNorthern === 'must_not' ? card.eid !== EID_NORTHERN : true) &&
    (options.includeExpansionFairy === 'must_not' ? card.eid !== EID_FAIRY : true) &&
    (options.includeExpansionSix === 'must_not' ? card.eid !== EID_SIX : true) &&
    (options.includeExpansionStar === 'must_not' ? card.eid !== EID_STAR : true) &&
    (options.excludeBannedCardsForAll ? !isBannedCardForAll(card) : true) &&
    !options.excludeBannedCardsByUser.includes(card.cid)
  )
  const tryCount = 1000
  let _try = 0
  while (true) {
    const restCards = availableCards.slice()
    const chosenCards = []
    for (let _i = 0; _i < cardCount && restCards.length >= 1; _i++) {
      const j = Math.floor(Math.random() * restCards.length)
      const c = restCards[j]
      restCards.splice(j, 1)
      chosenCards.push(c)
    }

    _try++
    if (_try >= tryCount || isValidCombinationOfCards(chosenCards, options)) {
      return chosenCards
    }
  }
}

function isBannedCardForAll (card) {
  return card.name === '埋もれた財宝' ||
    card.name === '買収工作' ||
    card.name === '魅了術の魔女'
}

function isBannedCardForFairy (card) {
  return card.types.includes('防衛') ||
    card.name === '破城槌' ||
    card.name === '埋もれた財宝' ||
    card.name === '星詠みの魔女' ||
    card.name === 'シノビ' ||
    card.name === '魅了術の魔女' ||
    card.name === '歩兵大隊' ||
    card.name === '近衛騎士団' ||
    card.name === '弓兵隊' ||
    card.name === 'サムライ'
}

function isBannedCardForStar (card) {
  return isBannedCardForFairy(card) ||
    card.name === '割り符'
}

function isValidCombinationOfCards (cards, options) {
  return (options.includeExpansionBasic === 'must' ? hasExpansionCard(cards, EID_BASIC) : true) &&
    (options.includeExpansionFareast === 'must' ? hasExpansionCard(cards, EID_FAREAST) : true) &&
    (options.includeExpansionNorthern === 'must' ? hasExpansionCard(cards, EID_NORTHERN) : true) &&
    (options.includeExpansionFairy === 'must' ? hasExpansionCard(cards, EID_FAIRY) : true) &&
    (options.includeExpansionSix === 'must' ? hasExpansionCard(cards, EID_SIX) : true) &&
    (options.includeExpansionStar === 'must' ? hasExpansionCard(cards, EID_STAR) : true) &&
    (options.includeAllCosts ? hasAllCosts(cards) : true) &&
    (options.includeLink2 ? cards.some(card => card.link === 2) : true) &&
    (options.excludeBannedCardsForFairy ? !hasBannedCardsForFairy(cards) : true) &&
    (options.excludeBannedCardsForStar ? !hasBannedCardsForStar(cards) : true)
}

function hasExpansionCard (cards, eid) {
  return cards.some(card => card.eid === eid)
}

function hasAllCosts (cards) {
  const costs = new Set()
  for (const card of cards) {
    costs.add(Math.min(card.cost, 5))
  }
  return costs.has(2) && costs.has(3) && costs.has(4) && costs.has(5)
}

function hasBannedCardsForFairy (cards) {
  return cards.some(card => card.eid === EID_FAIRY) &&
    cards.some(isBannedCardForFairy)
}

function hasBannedCardsForStar (cards) {
  return cards.some(card => card.eid === EID_STAR) &&
    cards.some(isBannedCardForStar)
}

export function parseSpecialPid (pid) {
  const match = /^supply:random(\d+)$/.exec(pid)
  if (match) {
    const count = parseInt(match[1], 10)
    return {
      count,
      editable: count > 10,
      random: true,
      special: true
    }
  }

  const maybeRsid = pid.replace(/^supply:/, '')
  try {
    return {
      editable: false,
      special: true,
      xcards: xcardsFromRsid(maybeRsid)
    }
  } catch (InternalError) {
    // Ignore.  Treat this case as 404 by pages/_pid.vue
  }

  if (pid === 'supply:editor') {
    return {
      editable: true,
      special: true,
      xcards: COMMON_CARDS.map(card => ({
        ...card,
        dropped: true
      }))
    }
  }

  return {
    editable: false,
    special: false
  }
}

export function isCardListPid (pid) {
  return PID_TO_DELAYED_CIDS_TABLE[pid] !== undefined ||
    parseSpecialPid(pid).special
}

export function isPageListPid (pid) {
  return PID_TO_CHILD_PIDS_TABLE[pid] !== undefined
}

export function isPredefinedSupplyPid (pid) {
  return PID_TO_DELAYED_CIDS_TABLE[pid]
}

const BASE64_ENCODING_TABLE = { // {{{
  /* eslint-disable object-property-newline */
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
  0x3c: '8', 0x3d: '9', 0x3e: '_', 0x3f: '-'
  /* eslint-enable object-property-newline */

  // [COOPERATION_WITH_TWITTER]
  //
  // When Twitter links URLs in tweets, it ignores trailing "."s in URLs.
  // So that "http://foo/index.html." will be converted into
  // "<a href='http://foo/index.html'>http://foo/index.html</a>."
  // (note that the last "." is not treated as a part of the URL).
  //
  // Old versions used "." to encode 0x3e,
  // and resulting RSIDs might be ended with ".".
  // So that shared supplies might not be linked properly on Twitter.
  //
  // To avoid the problem, 0x3e is now encoded to "_" instead of ".".
} // }}}

const BASE64_DECODING_TABLE = (() => { // {{{
  const t = {}

  for (const key in BASE64_ENCODING_TABLE) {
    const value = BASE64_ENCODING_TABLE[key]
    t[value] = parseInt(key, 10)
  }

  // '.' must be decoded to the same value as '_'
  // for backward compatibility.
  // Becasue RSIDs generated by old versions
  // might not be decoded without this treatment.
  //
  // See also [COOPERATION_WITH_TWITTER].
  t['.'] = t['_'] // eslint-disable-line dot-notation

  return t
})() // }}}

function encodeBase64 (sixBitByteBuffer) {
  return sixBitByteBuffer.map((b) => {
    const c = BASE64_ENCODING_TABLE[b]
    if (c === undefined) {
      throw new InternalError(`Invalid value to encodeBase64: ${b}`)
    }
    return c
  }).join('')
}

function decodeBase64 (base64EncodedString) {
  return base64EncodedString.split('').map((c) => {
    const b = BASE64_DECODING_TABLE[c]
    if (b === undefined) {
      throw new InternalError(`Invalid value to decodeBase64: ${c}`)
    }
    return b
  })
}

export function rsidFromXcards (xcards) {
  // See also xcardsFromRsid.
  const bs = []

  const version = 0x01
  bs.push(version)

  // Sort by only cid to avoid multiple rsids for the same xcard set.
  const sortedXcards = sortBy(xcards, ['cid'])

  for (const xcard of sortedXcards) {
    const bd = xcard.dropped ? 1 : 0
    const bcid = xcard.cid
    bs.push((bd << 5) | (bcid >> 6))
    bs.push(bcid & ((1 << 6) - 1))
  }

  return encodeBase64(bs)
}

export function xcardsFromRsid (rsid) {
  // Example:
  //
  //   rsid = "BAXBGBMBOBPBTB0B4CCCJ"
  //        = version ("B") + xcards ("AX" + "BG" + "BM" + ... + "B4" + "CC" + "CJ")
  //
  //   ---------------------------------------------------------
  //   |       B |         A |      X |         B |      G | ...
  //   |---------|-----------|--------|-----------|--------|-----
  //   | 0000001 | 0   00000 | 010111 | 0   00001 | 000110 | ...
  //   |---------|--------------------|--------------------|-----
  //   |         | 0 | 00000   010111 | 0 | 00001   000110 | ...
  //   |    0x01 |---|----------------|---|----------------|----
  //   |         | 0 |           0x17 | 0 |           0x46 | ...
  //   |---------|---|----------------|---|----------------|-----
  //   | version | ^ |            cid | ^ |            cid | ...
  //   |         | | |      (補給部隊)| | |(ギルドマスター)|
  //               |                    |
  //            dropped              dropped
  //
  // An rsid is a string which is encoded from xcards with BASE64,
  // so that each character in rsid is corresponding to a 6-bit value.
  // To simplify both encoding and decoding,
  // we use only an array of 6-bit values to convert rsid from/to xcards.
  //
  // The first character in an rsid represents a version of rsid/xcards
  // conversion.  There is only one version at the moment,
  // and the version is 0x01 ('B').
  //
  // The rest of characters in an rsid represent xcards.
  //
  // An xcard is represented with 12-bit value.
  // The most significant bit represents a dropped status,
  // where 0 means available and 1 means dropped.
  // The rest bits represent a cid.
  // Other information of an xcard is retrieved by cardFromCid.

  const bs = decodeBase64(rsid)
  const xcards = []

  const version = bs.shift()
  if (version !== 0x01) {
    throw new InternalError(`Invalid version: ${version}`)
  }

  while (bs.length >= 2) {
    const b1 = bs.shift()
    const b2 = bs.shift()
    const dropped = !!(b1 & (1 << 5))
    const cid = ((b1 & ((1 << 5) - 1)) << 6) | b2
    const xcard = {
      ...cardFromCid(cid),
      dropped
    }
    xcards.push(xcard)
  }
  if (bs.length !== 0) {
    throw new InternalError(`Trailing characters in rsid: ${JSON.stringify(bs)}`)
  }

  return xcards
}

export function pidFromPath (path) {
  return path.slice(1) || 'home'
}

export function pathFromPid (pid) {
  return pid === 'home' ? '/' : `/${pid}`
}

export function sidFromPid (pid) {
  const match = pid.match(/^supply:(.+)$/)
  return match ? match[1] : null
}

export function pidFromSid (sid) {
  return `supply:${sid}`
}

export function sortXcards (xcards) {
  return sortBy(xcards, [
    'dropped',
    'eid',
    'cost',
    'link',
    'name',
    'cid'
  ])
}

export function excerptFromPid (pid) {
  const parentPid = parentPidFromPid(pid)
  if (parentPid) {
    const match = titleFromPid(parentPid).match(/^推奨サプライ（(.*)）$/)
    if (match) {
      return match[1]
    }
  }

  const xcards = sortXcards(xcardsFromPid(pid))
  return xcards.map(xcard => xcard.name[0]).join(' ')
}

export function transition (to, from) {
  return {
    name: isForwardTransition(to, from) ? 'page-forward' : 'page-backward',
    mode: ''
  }
}

function isForwardTransition (to, from) {
  // On page load, from is undefined.
  if (!from) {
    return true
  }

  if (to.path === '/') {
    return false
  }

  if (!to.path.startsWith('/preferences') && from.path.startsWith('/preferences')) {
    return false
  }

  const childPids = childPidsFromPid(pidFromPath(to.path))
  if (!childPids) {
    return true
  }

  return !childPids.includes(pidFromPath(from.path))
}

export function permalinkFromPid (pid) {
  return `${LOCATION_ORIGIN}/${pid}`
}

export function ogpImageUrlFromPid (pid) {
  const version = 1
  return `${LOCATION_ORIGIN}/ogp/${pid}?v=${version}`
}

export function ogpMetaFromPid (pid) {
  // TODO: Return proper meta for non-supply pages.
  if (!pid.match(/^supply:/)) {
    return []
  }

  const parsed = parseSpecialPid(pid)
  if (parsed.random || parsed.editable) {
    return []
  }

  const xcards = sortXcards(xcardsFromPid(pid)).filter(xcard => !xcard.dropped)
  const parentPid = parentPidFromPid(pid)
  const parentTitle = parentPid ? titleFromPid(parentPid) : null

  const title = parentTitle && parentTitle.startsWith('推奨')
    ? `${titleFromPid(pid)} ── ${parentTitle}`
    : titleFromPid(pid)
  const description = xcards.map(xcard => xcard.name).join('、')
  const image = ogpImageUrlFromPid(pid)
  const url = permalinkFromPid(pid)

  return [
    { hid: 'og:url', property: 'og:url', content: url },
    { hid: 'og:title', property: 'og:title', content: title },
    { hid: 'og:description', property: 'og:description', content: description },
    { hid: 'og:image', property: 'og:image', content: image },
    { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
    { hid: 'twitter:title', property: 'twitter:title', content: title },
    { hid: 'twitter:description', property: 'twitter:description', content: description },
    { hid: 'twitter:image', property: 'twitter:image', content: image }
  ]
}

//  vim: foldmethod=marker
