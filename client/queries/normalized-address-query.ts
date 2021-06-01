import { gql } from '@apollo/client'

export const NormalizedAddressQuery = gql`
  query normalizedAddress($address: AddressInput!) {
    normalizedAddress(input: $address) {
      normalizedAddress {
        city
        state
        street
        unit
        postalCode
      }
    }
  }
`
