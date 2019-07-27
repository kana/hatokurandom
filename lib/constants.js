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

export const menus = [
  { pid: 'basic', name: '推奨サプライ(基本セット)' },
  { pid: 'fareast', name: '推奨サプライ(極東辺境領)' },
  { pid: 'northern', name: '推奨サプライ(北限の魔女)' },
  { pid: 'fairygarden', name: '推奨サプライ(フェアリーガーデン)' }
]

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

//  vim: foldmethod=marker
