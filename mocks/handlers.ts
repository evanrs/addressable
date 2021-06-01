import { rest, graphql } from 'msw'
import { normalizedAddress } from './data'

const normalizedAddressHandler = graphql.query('NormalizedAddress', (req, res, ctx) => {
  return res(ctx.data({ normalizedAddress: { normalizedAddress } }))
})
export const handlers = [
  normalizedAddressHandler,

  rest.post(/graphql/, async (req, res, ctx) => {
    console.log(req)
    console.log('parse', normalizedAddressHandler.parse(req))
    console.log(
      'predicate',
      normalizedAddressHandler.predicate(req, normalizedAddressHandler.parse(req)),
    )
    console.log('run', await normalizedAddressHandler.run(req))
    normalizedAddressHandler.run(req)

    return res(ctx.json({ normalizedAddress: { normalizedAddress } }))
  }),
]
