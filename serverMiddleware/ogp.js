import { readFileSync } from 'fs'
import { parse } from 'url'
import { parseSpecialPid, pidFromPath, xcardsFromPid } from '../lib/constants'

// Handler for /ogp/supply:{sid}
export default function (req, res, next) {
  const { pathname } = parse(req.url)

  // Note that pathname doesn't contain "/ogp".
  const pid = pidFromPath(pathname)
  const parsed = parseSpecialPid(pid)
  if (parsed.random || parsed.editable) {
    return notFound(res)
  }

  const xcards = xcardsFromPid(pid)
  if (!xcards) {
    return notFound(res)
  }

  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Cache-Control', `public, max-age=${365 * 24 * 60 * 60}`)
  res.statusCode = 200
  res.end(readFileSync('./static/apple-touch-icon.png'))
}

function notFound (res) {
  res.statusCode = 404
  res.end('')
}
