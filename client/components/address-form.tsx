import { vestResolver } from '@hookform/resolvers/vest'
import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form'
import { Grid, GridProps } from '@chakra-ui/react'
import { Field } from './field'
import { AddressInput, validateAddress } from '../providers'

export type AddressFormProps = GridProps & {
  form: UseFormReturn<AddressInput>
}

export function useAddressForm(props: Omit<UseFormProps<AddressInput>, 'resolver'>) {
  return useForm<AddressInput>({ ...props, resolver: vestResolver(validateAddress) })
}

export const AddressForm: React.FC<AddressFormProps> = ({ form, children, ...gridProps }) => {
  const handleSubmit = form.handleSubmit(
    (data, e) => {},
    (errors, e) => {},
  )

  return (
    <Grid
      mx="auto"
      gap={[3, 4]}
      width="100%"
      maxWidth="40rem"
      gridAutoColumns="1fr"
      {...gridProps}
      as="form"
      onSubmit={handleSubmit}
    >
      <Field
        name="street"
        label="Street Address"
        placeholder="123 Grove St"
        autoComplete="address-line1"
        control={form.control}
      />

      <Field
        name="unit"
        label="Apartment"
        placeholder="4B"
        autoComplete="address-line2"
        control={form.control}
      />
      <Field
        name="city"
        label="City"
        placeholder="Anytown"
        autoComplete="locality"
        control={form.control}
      />

      <Grid templateColumns="1fr 1fr" gap={4}>
        <Field
          name="state"
          label="State"
          placeholder="OR"
          autoComplete="region"
          control={form.control}
        />
        <Field
          name="postalCode"
          label="ZIP"
          placeholder="12345"
          autoComplete="postal-code"
          control={form.control}
        />
      </Grid>

      {children}
    </Grid>
  )
}
