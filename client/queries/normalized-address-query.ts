import { gql } from '@apollo/client'

export const NormalizedAddressQuery = gql`
  query NormalizedAddress($address: AddressInput!) {
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
