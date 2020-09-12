let nameFromPathMap

export function setUp (routes) {
  nameFromPathMap = new Map(routes.map(r => [r.path, r.name]))
}

export function nameFromPath (path) {
  return nameFromPathMap.get(path) || 'pid'
}
