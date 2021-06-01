// TODO … maybe don't include side-effecting imports 🤔
import 'ress/ress.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

import React from 'react'
import { extendTheme, theme as chakra, ChakraProvider as Chakra } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: `Poppins, ${chakra.fonts.heading}`,
    body: `Poppins, ${chakra.fonts.body}`,
  },
  config: { useSystemColorMode: true },
})

export const ChakraProvider: React.FC = ({ children }) => {
  return <Chakra theme={theme}>{children}</Chakra>
}
