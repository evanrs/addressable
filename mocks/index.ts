import { SetupWorkerApi } from 'msw'
import { SetupServerApi } from 'msw/lib/types/node'

export const msw: SetupWorkerApi | SetupServerApi = isServer()
  ? require('./server').server
  : require('./browser').worker

export function mount(enabled: boolean) {
  if (enabled) isServer(msw) ? msw.listen() : msw.start()
  return msw
}

export function isServer(_instance?: typeof msw): _instance is SetupServerApi {
  return typeof window === 'undefined'
}
