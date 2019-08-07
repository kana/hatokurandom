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

  const xcards = sortXcards(maybeXcards)
  if (xcards.length < 10 || xcards.length > 14) {
    return notFound(res)
  }

  const buffer = await sharp('ogp/bg.jpg')
    .composite(xcards.map(compositeRuleFor10))
    .jpeg({ quality: 80 })
    .toBuffer()

  res.setHeader('Content-Type', 'image/jpeg')
  res.setHeader('Cache-Control', `public, max-age=${1 * 24 * 60 * 60}`)
  res.statusCode = 200
  res.end(buffer)
}

const OGP_WIDTH = 1200
const OGP_HEIGHT = 630
const CARD_WIDTH = 184
const CARD_HEIGHT = 260

function compositeRuleFor10 (xcard, i) {
  const c = i % 5
  const r = Math.floor(i / 5)
  const xSpace = (OGP_WIDTH - CARD_WIDTH * 5) / 6
  const ySpace = (OGP_HEIGHT - CARD_HEIGHT * 2) / 3
  return {
    input: `ogp/cards/${xcard.cid}.jpg`,
    gravity: 'northwest',
    left: Math.floor(xSpace * (c + 1) + CARD_WIDTH * c),
    top: Math.floor(ySpace * (r + 1) + CARD_HEIGHT * r)
  }
}

function notFound (res) {
  res.statusCode = 404
  res.end('')
}
