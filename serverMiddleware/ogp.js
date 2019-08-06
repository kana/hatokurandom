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

  res.end(xcards.map(xcard => xcard.name).join(' '))
}

function notFound (res) {
  res.statusCode = 404
  res.end('')
}
