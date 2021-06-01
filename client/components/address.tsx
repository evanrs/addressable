import { Flex, Text } from '@chakra-ui/react'

import { AddressInput } from '../providers'

type AddressProps = { address?: AddressInput } & Parameters<typeof Flex>[0]
export const Address: React.FC<AddressProps> = ({ address, ...props }) => (
  <Flex direction="column" {...props}>
    <Text>
      {address?.street}
      {address?.unit ? `, ${address?.unit}` : ''}
    </Text>
    <Text>
      {address?.city}, {address?.state} {address?.postalCode}
    </Text>
  </Flex>
)
