import { rest } from 'msw'
import { setupServer } from 'msw/node'

const api = setupServer(
  rest.post('*/api/prorate', (req, res, ctx) => {
    return res(ctx.json({}))
  }),
)

export { api, rest }
