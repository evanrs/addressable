import React from 'react'
import { Flex, Grid, Heading } from '@chakra-ui/react'
import { Address } from './address'
import { AddressInput } from '../providers'

export type CompareAddressProps = {
  usps?: AddressInput
  input?: AddressInput
  onSelect: (input?: AddressInput) => void
}
export const CompareAddress: React.FC<CompareAddressProps> = ({ usps, input, onSelect }) => {
  return (
    <Flex direction="column" alignItems="center">
      <Heading size="lg" my="1rem">
        📬
      </Heading>
      <Heading size="md" mb={6}>
        Which address do you use?
      </Heading>
      <Grid templateColumns="1fr 1fr" gap={6} _hover={{ ':hover': { cursor: 'pointer' } }}>
        <Address address={usps} onClick={() => onSelect(usps)} />
        <Address address={input} onClick={() => onSelect(input)} />
      </Grid>
    </Flex>
  )
}
