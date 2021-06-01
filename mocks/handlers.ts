import { rest, graphql } from 'msw'
import { normalizedAddress } from './data'

const normalizedAddressHandler = graphql.query('NormalizedAddress', (req, res, ctx) => {
  return res(ctx.data({ normalizedAddress: { normalizedAddress } }))
})
export const handlers = [
  normalizedAddressHandler,

  rest.post(/graphql/, async (req, res, ctx) => {
    return res(ctx.json({ normalizedAddress: { normalizedAddress } }))
  }),
]
