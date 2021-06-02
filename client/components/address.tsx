import { Flex, FlexProps, Text } from '@chakra-ui/react'

import { AddressInput } from '../providers'

export type AddressProps = { address?: AddressInput } & FlexProps
export const Address: React.FC<AddressProps> = ({ address, children, ...props }) => (
  <Flex direction="column" {...props}>
    {children}
    <Text>
      {address?.street}
      {address?.unit ? `, ${address?.unit}` : ''}
    </Text>
    <Text>
      {address?.city}, {address?.state} {address?.postalCode}
    </Text>
  </Flex>
)
