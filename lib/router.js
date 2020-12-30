import { pidFromPath } from '~/lib/utils'

let staticRouteNamePathMap

export function setUp (routes) {
  staticRouteNamePathMap = new Map(routes.map(r => [r.path, r.name]))
}

function staticRouteNamePath (path) {
  return staticRouteNamePathMap.get(path) || 'pid'
}

export function toFromPath (path, params = {}) {
  const name = staticRouteNamePath(path)
  const pid = name !== 'pid' ? undefined : pidFromPath(path)
  return {
    name,
    params: {
      ...params,
      pid
    }
  }
}
