import { server } from '../mocks/server'

process.env.API_BASE_URL = 'http://localhost:3000'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
