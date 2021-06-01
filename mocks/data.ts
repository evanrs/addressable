import { AddressInput, NormalizedAddressResponse } from '../client'

export const addressInput: AddressInput = {
  street: '19 Union Square West',
  unit: '12th floor',
  state: 'NY',
  city: 'New York',
  postalCode: '10001',
}

// no data here
export const normalizedAddress: NormalizedAddressResponse = {
  normalizedAddress: {
    city: 'New York',
    state: 'NY',
    street: '19 Union Sq W',
    unit: '12',
    postalCode: '10003',
  },
}
