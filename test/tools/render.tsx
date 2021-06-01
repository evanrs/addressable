import React from 'react'
import { render as __render } from '@testing-library/react'

export * from '@testing-library/react'

// TODO remove fragment when types are corrected
const Providers: React.FC = ({ children }) => <>{children}</>

export const render = (root: React.ReactElement, options = {}) =>
  __render(root, { wrapper: Providers, ...options })
