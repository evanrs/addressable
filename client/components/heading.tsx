import { Heading as ChakraHeading, HeadingProps as ChakraHeadingProps } from '@chakra-ui/react'
import React from 'react'

export type HeadingProps = {
  icon?: React.ElementType | string | false
}

export const Heading: React.FC<HeadingProps> = ({ icon = '🚚', children }) => (
  <>
    {icon && (
      <ChakraHeading size="lg" my={['0.75rem', '1rem']}>
        {icon}
      </ChakraHeading>
    )}
    <ChakraHeading size="md" mb={[6, 8]}>
      {children}
    </ChakraHeading>
  </>
)
