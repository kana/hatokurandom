import { chooseRandomCards, ogpImageUrlFromPid, permalinkFromPid, rsidFromXcards, sortXcards } from '../lib/utils'
import { DEFAULT_OPTIONS } from '../store/options'

export default function (req, res, next) {
  // This endpoint should verify whether each request is really sent from Slack
  // or not.  But there is no data to be modified by any request for this
  // applciation.  So that verification is intentionally omitted.
  const xcards = sortXcards(chooseRandomCards(10, DEFAULT_OPTIONS))
  const rsid = rsidFromXcards(xcards)
  const pid = `supply:${rsid}`
  const text = xcards.map(xcard => xcard.name).join('、')
  const title = '今回のサプライ'
  const permalink = permalinkFromPid(pid)
  const ogpImageUrl = ogpImageUrlFromPid(pid)

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    response_type: 'in_channel',
    attachments: [
      {
        fallback: text,
        color: '#edc0ed',
        title,
        title_link: permalink,
        text,
        image_url: ogpImageUrl
      }
    ]
  }))
}
