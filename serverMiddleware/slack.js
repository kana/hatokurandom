export default async function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    response_type: 'in_channel',
    text: 'https://hatokurandom.whileimautomaton.net/supply:six-inquisition',
    unfurl_links: true
  }))
}
