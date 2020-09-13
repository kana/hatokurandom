import { pidFromPath } from '~/lib/utils'

let nameFromPathMap

export function setUp (routes) {
  nameFromPathMap = new Map(routes.map(r => [r.path, r.name]))
}

function nameFromPath (path) {
  return nameFromPathMap.get(path) || 'pid'
}

export function toFromPath (path, params = {}) {
  const name = nameFromPath(path)
  const pid = name !== 'pid' ? undefined : pidFromPath(path)
  return {
    name,
    params: {
      ...params,
      pid
    }
  }
}
