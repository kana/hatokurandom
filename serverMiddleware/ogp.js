import { readFileSync } from 'fs'
import sharp from 'sharp'
import { parse } from 'url'
import { parseSpecialPid, pidFromPath, sortXcards, xcardsFromPid } from '../lib/constants'

// Handler for /ogp/supply:{sid}
export default async function (req, res, next) {
  const { pathname } = parse(req.url)

  // Note that pathname doesn't contain "/ogp".
  const pid = pidFromPath(pathname)
  const parsed = parseSpecialPid(pid)
  if (parsed.random || parsed.editable) {
    return notFound(res)
  }

  const maybeXcards = xcardsFromPid(pid)
  if (!maybeXcards) {
    return notFound(res)
  }

  // TODO: Generate image with dropped cards.
  const xcards = sortXcards(maybeXcards).filter(xcard => !xcard.dropped)
  if (xcards.length !== 10) {
    return notFound(res)
  }

  const ogpWidth = 1200
  const ogpHeight = 630
  const cardWidth = 184
  const cardHeight = 260
  const buffer = await sharp('ogp/bg.jpg')
    .composite(xcards.map((xcard, i) => {
      const c = i % 5
      const r = Math.floor(i / 5)
      const xSpace = (ogpWidth - cardWidth * 5) / 6
      const ySpace = (ogpHeight - cardHeight * 2) / 3
      return {
        input: `ogp/cards/${xcard.cid}.jpg`,
        gravity: 'northwest',
        left: Math.floor(xSpace * (c + 1) + cardWidth * c),
        top: Math.floor(ySpace * (r + 1) + cardHeight * r)
      }
    }))
    .jpeg({ quality: 80 })
    .toBuffer()

  res.setHeader('Content-Type', 'image/jpeg')
  res.setHeader('Cache-Control', `public, max-age=${1 * 24 * 60 * 60}`)
  res.statusCode = 200
  res.end(buffer)
}

function notFound (res) {
  res.statusCode = 404
  res.end('')
}
