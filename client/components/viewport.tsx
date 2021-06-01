import { useColorModeValue, Flex } from '@chakra-ui/react'

export const Viewport: React.FC<Parameters<typeof Flex>[0]> = ({ children, ...rest }) => (
  <Flex
    height="100%"
    width="100%"
    alignItems="center"
    justifyContent="center"
    background={useColorModeValue('#FFF', 'gray.800')}
    sx={safeAreaInsetPadding}
  >
    <Flex
      {...rest}
      direction="column"
      px={[2, 4, 4, 6, 8]}
      width="100%"
      maxWidth={['48rem', '48rem', '54rem', '58rem']}
      transitionProperty="max-width"
      transitionDuration="normal"
    >
      {children}
    </Flex>
  </Flex>
)

const safeAreaInsetPadding = {
  pl: 'env(safe-area-inset-left)',
  pr: 'env(safe-area-inset-right)',
  pt: 'env(safe-area-inset-top)',
  pb: 'env(safe-area-inset-bottom)',
}
