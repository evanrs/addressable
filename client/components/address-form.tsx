import { Grid } from '@chakra-ui/layout'
import { UseFormReturn } from 'react-hook-form'
import { AddressInput } from '../providers'
import { Field } from '.'

export type AddressFormProps = {
  form: UseFormReturn<AddressInput>
}

export const AddressForm: React.FC<AddressFormProps> = ({ form, children }) => {
  const handleSubmit = form.handleSubmit(
    (data, e) => console.log(data, e),
    (errors, e) => console.log(errors, e),
  )

  return (
    <Grid
      as="form"
      templateRows="1fr 1fr 1fr"
      gridAutoColumns="1fr"
      gap={4}
      maxWidth="40rem"
      mx="auto"
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
