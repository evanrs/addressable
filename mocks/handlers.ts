import { rest, graphql } from 'msw'
import { normalizedAddress } from './data'

const localhost = graphql.link('http://localhost:3000/graphql')
const normalizedAddressHandler = graphql.query('NormalizedAddress', (req, res, ctx) => {
  // const { input } = req.variables

  // console.log(input)

  // return res(ctx.data({ normalizedAddress }))
  return res(ctx.data({ john: true }))
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

    return res(ctx.json({ normalizedAddress }))
  }),
]
