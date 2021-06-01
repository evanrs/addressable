import { Type, Static } from '@sinclair/typebox'

export type AddressInput = Static<typeof AddressInput>
export const AddressInput = Type.Object({
  street: Type.String({
    title: 'Street Address',
    // arbitrary min lenght
    minLength: 3,
  }),
  unit: Type.Optional(Type.String()),
  state: Type.String({ title: 'State' }),
  city: Type.String({ title: 'City' }),
  postalCode: Type.String({
    title: 'Postal Code',
    pattern: '^[0-9]{5}(?:-[0-9]{4})?$',
  }),
})

export type NormalizedAddressResponse = Static<typeof AddressInput>
export const NormalizedAddressResponse = AddressInput
