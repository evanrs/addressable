import React from 'react'
import { Container, Grid, Heading } from '@chakra-ui/react'
import { CheckCircleIcon, StarIcon } from '@chakra-ui/icons'
import { AddressInput } from '../providers'
import { Address } from './address'
import { Option } from './option'

export type CompareAddressProps = {
  usps?: AddressInput
  input?: AddressInput
  onSelect: (input?: AddressInput) => void
}

export const CompareAddress: React.FC<CompareAddressProps> = ({ usps, input, onSelect }) => {
  return (
    <Container centerContent>
      <Heading size="lg" my="1rem">
        📬
      </Heading>
      <Heading size="md" mb={8}>
        Which address do you use?
      </Heading>
      <Grid templateColumns={['1fr', '1fr', '1fr 1fr']} gap={8}>
        <Option
          title="Official USPS Address"
          icon={<StarIcon mr=".5rem" />}
          onClick={() => onSelect(usps)}
          align="left"
        >
          <Address address={usps} />
        </Option>
        <Option
          title="Unrecognized Address"
          icon={<CheckCircleIcon mr=".5rem" />}
          onClick={() => onSelect(input)}
          align="left"
        >
          <Address address={input} />
        </Option>
      </Grid>
    </Container>
  )
}
