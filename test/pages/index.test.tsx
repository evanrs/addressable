import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import { Home } from '../../pages'
import { render, fireEvent, waitFor, screen } from '../tools'

describe('Home page', () => {
  it('matches snapshot', async () => {
    const result = render(<Home />, {})
    await waitFor(() => screen.getByText('Unknown'))

    expect(result.asFragment()).toMatchSnapshot()
  })
})
