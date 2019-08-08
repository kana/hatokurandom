export default async function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    response_type: 'in_channel',
    attachments: [
      {
        fallback: '',
        color: '#edc0ed',
        title: '異端審問',
        title_link: 'https://hatokurandom.whileimautomaton.net/supply:six-inquisition',
        text: '免罪符、十字軍……',
        image_url: 'https://hatokurandom.whileimautomaton.net/ogp/supply:six-inquisition'
      }
    ]
  }))
}
