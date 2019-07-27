// =================
// Naming convension
// =================
//
// cid: Card ID (number)
// eid: Expansion ID (number)
// sid: Supply ID
//   dsid: Dynamic Supply ID (e.g. random:10)
//   psid: Predefined Supply ID (e.g. basic-firstplay)
//   rsid: Random Supply ID (e.g. BAIAXAdA9BNBXBbB7B-CQ)
// pid: Page ID (e.g. supply:basic-firstplay)
//   apid: Actual Page ID (PID without parameters - e.g. "random" in "random:10")

const EID_BASIC = 1
const EID_FAREAST = 2
const EID_NORTHERN = 3
const EID_FAIRY = 4
const EID_SIX = 5
const EID_STAR = 6
const EID_INTERLUDE = 7
const EID_LEGIONS = 8

const ALL_CARDS = [] // TODO

const PID_TO_CHILD_PID_LIST_TABLE = { // {{{
  'home': [ // {{{
    'supplies:random',
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

export function childPidListFromPid (pid) {
  return PID_TO_CHILD_PID_LIST_TABLE[pid]
}

const PID_TO_TITLE_TABLE = { // {{{
  'home': 'ハトクランダム',
  'about': 'このアプリについて',
  'configure': '設定',
  'supplies:random': 'ランダム選択',
  'supply:random10': 'ランダムに10枚選択',
  'supply:random12': 'ランダムに12枚選択',
  'supply:random13': 'ランダムに13枚選択',
  'supply:random14': 'ランダムに14枚選択',
  'supplies:basic': '推奨サプライ(基本セット)',
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
  'supplies:fareast': '推奨サプライ(極東辺境領)',
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
  'supplies:northern': '推奨サプライ(北限の魔女)',
  'supply:northern-territory': '北限領',
  'supply:northern-parliament': '議会を占拠せよ',
  'supply:northern-witchandchurch': '魔女と教会',
  'supply:northern-society': '社交界',
  'supply:northern-guiltycrown': '罪の王冠',
  'supply:northern-darkness': '暗闘',
  'supply:northern-scandal': '開拓の醜聞',
  'supply:northern-teaparty': '魔女のお茶会',
  'supply:northern-swordsman': '異国の剣士',
  'supplies:fairy': '推奨サプライ(フェアリーガーデン)',
  'supply:fairy-primer': 'フェアリーガーデン入門',
  'supply:fairy-butlerandmaid': '執事とメイド',
  'supply:fairy-winter': '冬来たりなば',
  'supply:fairy-folklore': 'フォークロア',
  'supply:fairy-frontier': '辺境部族',
  'supply:fairy-carnival': '謝肉祭',
  'supply:fairy-holyornot': '聖か俗か',
  'supply:fairy-fairyandknight': '妖精と騎士',
  'supplies:six': '推奨サプライ(六都市同盟)',
  'supply:six-journey': '旅の始めに',
  'supply:six-alliance': '六都市同盟',
  'supply:six-trade': '大陸間交易',
  'supply:six-churchesandwars': '教会と戦争',
  'supply:six-inquisition': '異端審問',
  'supply:six-water': '水は巡る',
  'supply:six-rottenauthority': '絶対の権力は徹底的に腐敗する',
  'supplies:star': '推奨サプライ(星天前路)',
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
  return PID_TO_TITLE_TABLE[pid]
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
  // return delay(() => names.map(name => H.card_from_card_name(name).cid))
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

const PSID_TO_DELAYED_CIDS_TABLE = { // {{{
  'basic-firstplay': listByNames([ // {{{
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
  'basic-guide': listByNames([ // {{{
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
  'basic-guide2': listByNames([ // {{{
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
  'basic-intermediate': listByNames([ // {{{
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
  'basic-intermediate2': listByNames([ // {{{
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
  'basic-bigbusiness': listByNames([ // {{{
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
  'basic-greatwar': listByNames([ // {{{
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
  'basic-adventure': listByNames([ // {{{
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
  'basic-witchcraft': listByNames([ // {{{
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
  'basic-courtpolitics': listByNames([ // {{{
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
  'fareast-firstplay': listByNames([ // {{{
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
  'fareast-porttown': listByNames([ // {{{
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
  'fareast-prosperity': listByNames([ // {{{
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
  'fareast-mine': listByNames([ // {{{
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
  'fareast-citystrife': listByNames([ // {{{
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
  'fareast-scandal': listByNames([ // {{{
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
  'fareast-battlefield': listByNames([ // {{{
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
  'fareast-guildstrife': listByNames([ // {{{
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
  'fareast-kunoichi': listByNames([ // {{{
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
  'fareast-moneymoneymoney': listByNames([ // {{{
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
  'northern-territory': listByNames([ // {{{
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
  'northern-parliament': listByNames([ // {{{
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
  'northern-witchandchurch': listByNames([ // {{{
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
  'northern-society': listByNames([ // {{{
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
  'northern-guiltycrown': listByNames([ // {{{
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
  'northern-darkness': listByNames([ // {{{
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
  'northern-scandal': listByNames([ // {{{
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
  'northern-teaparty': listByNames([ // {{{
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
  'northern-swordsman': listByNames([ // {{{
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
  'fairy-primer': listByNames([ // {{{
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
  'fairy-butlerandmaid': listByNames([ // {{{
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
  'fairy-winter': listByNames([ // {{{
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
  'fairy-folklore': listByNames([ // {{{
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
  'fairy-frontier': listByNames([ // {{{
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
  'fairy-carnival': listByNames([ // {{{
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
  'fairy-holyornot': listByNames([ // {{{
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
  'fairy-fairyandknight': listByNames([ // {{{
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
  'six-journey': listByNames([ // {{{
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
  'six-alliance': listByNames([ // {{{
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
  'six-trade': listByNames([ // {{{
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
  'six-churchesandwars': listByNames([ // {{{
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
  'six-inquisition': listByNames([ // {{{
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
  'six-water': listByNames([ // {{{
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
  'six-rottenauthority': listByNames([ // {{{
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
  'star-journey': listByNames([ // {{{
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
  'star-risky': listByNames([ // {{{
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
  'star-war': listByNames([ // {{{
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
  'star-silkroad': listByNames([ // {{{
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
  'star-wisdom': listByNames([ // {{{
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
  'star-wish': listByNames([ // {{{
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
  'championship1-prelims1': listByNames([ // {{{
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
  'championship1-prelims2': listByNames([ // {{{
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
  'championship1-prelims3': listByNames([ // {{{
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
  'championship1-semifinals': listByNames([ // {{{
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
  'championship1-finals': listByNames([ // {{{
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
  'reference-all-actions': listByType('行動'),
  'reference-plain-actions': list(c =>
    hasType(c, '行動') &&
    !hasType(c, '攻撃') &&
    !hasType(c, '防衛')
  ),
  'reference-attacks': listByType('攻撃'),
  'reference-defenses': listByType('防衛'),
  'reference-territories': listByType('領地'),
  'reference-authorities': listByType('継承権'),
  'reference-misfortune': listByType('災い'),
  'reference-curses': list(c => c.cursed),
  'reference-princesses': listByType('プリンセス'),
  'reference-support': listByType('サポート'),
  'reference-subtype-army': listBySubtype('兵力'),
  'reference-subtype-trick': listBySubtype('計略'),
  'reference-subtype-magic': listBySubtype('魔法'),
  'reference-subtype-merchant': listBySubtype('商人'),
  'reference-subtype-maid': listBySubtype('侍女'),
  'reference-cost1orless': list(c => c.cost <= 1),
  'reference-cost2': listByCost(2),
  'reference-cost3': listByCost(3),
  'reference-cost4': listByCost(4),
  'reference-cost5': listByCost(5),
  'reference-cost6': listByCost(6),
  'reference-cost7ormore': list(c => c.cost >= 7),
  'reference-costspecial': list(c => typeof c.cost !== 'number'),
  'reference-link0': listByLink(0),
  'reference-link1': listByLink(1),
  'reference-link2': listByLink(2),
  'reference-unplayable': listByLink(undefined),
  'reference-basic': listByExpansion(EID_BASIC),
  'reference-fareast': listByExpansion(EID_FAREAST),
  'reference-northern': listByExpansion(EID_NORTHERN),
  'reference-fairy': listByExpansion(EID_FAIRY),
  'reference-six': listByExpansion(EID_SIX),
  'reference-star': listByExpansion(EID_STAR),
  'reference-interlude': listByExpansion(EID_INTERLUDE),
  'reference-legions': listByExpansion(EID_LEGIONS),
  'reference-rarity-basic': listByRarity('B'),
  'reference-rarity-common': listByRarity('C'),
  'reference-rarity-rare': listByRarity('R'),
  'reference-rarity-special': listByRarity(undefined),
  'Dummy entry to make folds simple.': []
} // }}}

export function cidsFromPsid (psid) {
  return force(PSID_TO_DELAYED_CIDS_TABLE[psid])
}

//  vim: foldmethod=marker
