import vest, { test, enforce } from 'vest'
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

export const validateAddress = vest.create((data = {}) => {
  test('street', 'Street Address is required', () => {
    enforce(data.street).isNotEmpty()
  })

  test('city', 'City is required', () => {
    enforce(data.city).isNotEmpty()
  })

  test('state', 'State is required', () => {
    enforce(data.state).isNotEmpty()
  })

  test('postalCode', 'Postal Code is required', () => {
    enforce(data.postalCode).isNotEmpty()
  })

  test('postalCode', 'Postal Code should be at least 5 digits', () => {
    enforce(data.postalCode).matches(AddressInput.properties.postalCode.pattern ?? '')
  })
})
