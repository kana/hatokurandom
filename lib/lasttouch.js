let lastTouch = 0

export function getLastTouchTime () {
  return lastTouch
}

export function updateLastTouchTime () {
  lastTouch = new Date().valueOf()
}
