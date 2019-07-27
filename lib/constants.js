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

const PID_TO_CHILD_PID_LIST_TABLE = {
  'home': [ // {{{
    'supplies:random',
    'supplies:log',
    'supplies:basic',
    'supplies:fareast',
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
}

export function childPidListFromPid (pid) {
  return PID_TO_CHILD_PID_LIST_TABLE[pid]
}

//  vim: foldmethod=marker
