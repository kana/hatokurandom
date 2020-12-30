import { parseCardDetailPid, pidFromPath } from '~/lib/utils'

let staticRouteNamePathMap

export function setUp (routes) {
  staticRouteNamePathMap = new Map(routes.map(r => [r.path, r.name]))
}

export function toFromPath (path, params = {}) {
  const name = staticRouteNamePathMap.get(path)
  if (name) {
    return {
      name,
      params
    }
  }

  const card = parseCardDetailPid(pidFromPath(path))
  if (card) {
    return {
      name: 'cards-cid',
      params: {
        ...params,
        cid: card.cid
      }
    }
  }

  return {
    name: 'pid',
    params: {
      ...params,
      pid: pidFromPath(path)
    }
  }
}
