export default function (req, res, next) {
  // Force cache also pages which are basically static.
  res.setHeader('Cache-Control', 'public, max-age=31536000')

  next()
}
