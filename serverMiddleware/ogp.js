import { URL } from 'url'
import sharp from 'sharp'
import { LOCATION_ORIGIN, parseSpecialSupplyPid, pidFromPath, sortXcards, xcardsFromPid } from '../lib/utils'

// Handler for /ogp/supply:{sid}
export default async function (req, res, next) {
  const { pathname } = new URL(req.url, LOCATION_ORIGIN)

  // Note that pathname doesn't contain "/ogp".
  const pid = pidFromPath(pathname)
  const parsed = parseSpecialSupplyPid(pid)
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

  const images = await Promise.all(xcards.map(xcard => imageFromXcard(xcard, xcards)))
  const compositeRule = xcards.length === 10 ? compositeRuleFor10 : compositeRuleFor12To14
  const rules = await Promise.all(images.map((image, i) => compositeRule(image, i, xcards.length)))

  const buffer = await sharp('ogp/bg.jpg')
    .composite(rules)
    .jpeg({ quality: 80 })
    .toBuffer()

  res.setHeader('Content-Type', 'image/jpeg')
  res.setHeader('Cache-Control', `public, max-age=${1 * 24 * 60 * 60}`)
  res.statusCode = 200
  res.end(buffer)
}

function imageFromXcard (xcard, xcards) {
  const variant = calculateImageVariant(xcard, xcards)
  return sharp(`ogp/cards/${xcard.cid}${variant}.jpg`).grayscale(xcard.dropped).toBuffer()
}

function calculateImageVariant (xcard, xcards) {
  if (xcard.name === '呪いの人形') {
    const i = xcards.map(xcard => xcard.cid).reduce((acc, n) => acc + n) % 5
    return 'abcde'[i]
  } else {
    return ''
  }
}

const OGP_WIDTH = 1200
const OGP_HEIGHT = 630
const CARD_WIDTH = 184
const CARD_HEIGHT = 260
const KEPT_CARD_WIDTH = 156
const KEPT_CARD_HEIGHT = 220
const DROPPED_CARD_WIDTH = 78
const DROPPED_CARD_HEIGHT = 110

function compositeRuleFor10 (image, i, _n) {
  const c = i % 5
  const r = Math.floor(i / 5)
  const xSpace = (OGP_WIDTH - CARD_WIDTH * 5) / 6
  const ySpace = (OGP_HEIGHT - CARD_HEIGHT * 2) / 3
  return {
    input: image,
    gravity: 'northwest',
    left: Math.floor(xSpace * (c + 1) + CARD_WIDTH * c),
    top: Math.floor(ySpace * (r + 1) + CARD_HEIGHT * r)
  }
}

async function compositeRuleFor12To14 (image, i, n) {
  const kept = i < 10
  const resizedImage = await sharp(image)
    .resize(
      kept
        ? { width: KEPT_CARD_WIDTH, height: KEPT_CARD_HEIGHT }
        : { width: DROPPED_CARD_WIDTH, height: DROPPED_CARD_HEIGHT }
    )
    .toBuffer()
  const c = i % 5
  const r = Math.floor(i / 5)
  const ySpace = (OGP_HEIGHT - (KEPT_CARD_HEIGHT * 2 + DROPPED_CARD_HEIGHT)) / 4
  const xPadding = kept
    ? (OGP_WIDTH - KEPT_CARD_WIDTH * 5) / 6
    : 20
  const xMargin = kept
    ? xPadding
    : (OGP_WIDTH - (DROPPED_CARD_WIDTH * (n - 10) + xPadding * (n - 10 - 1))) / 2
  return {
    input: resizedImage,
    gravity: 'northwest',
    left: Math.floor(
      kept
        ? xMargin + (KEPT_CARD_WIDTH + xPadding) * c
        : xMargin + (DROPPED_CARD_WIDTH + xPadding) * c
    ),
    top: Math.floor(ySpace * (r + 1) + KEPT_CARD_HEIGHT * r)
  }
}

function notFound (res) {
  res.statusCode = 404
  res.end('')
}
