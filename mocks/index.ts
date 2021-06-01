import { SetupWorkerApi } from 'msw'
import { SetupServerApi } from 'msw/lib/types/node'

export const msw: SetupWorkerApi | SetupServerApi = isServer()
  ? require('./server').server
  : require('./browser').worker

export function mock({ enabled }: { enabled?: boolean }) {
  if (isServer(msw)) {
    if (enabled) msw.listen()
    return Promise.resolve(msw)
  } else {
    return Promise.resolve(enabled ? msw.start().then(() => msw) : msw)
  }
}

export function isServer(_instance?: typeof msw): _instance is SetupServerApi {
  return typeof window === 'undefined'
}
