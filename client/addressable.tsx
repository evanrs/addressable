import React from 'react'
import { useQuery } from '@apollo/client'
import { Button } from '@chakra-ui/button'
import { useForm } from 'react-hook-form'
import { AddressInput, NormalizedAddressResponse } from './providers'
import { AddressForm } from './components/address-form'
import { NormalizedAddressQuery } from './queries/normalized-address-query'

export const Addressable: React.FC = () => {
  const form = useAddressForm()

  const query = useQuery<NormalizedAddressResponse, { input: AddressInput }>(
    NormalizedAddressQuery,
    {
      skip: !form.formState.isSubmitSuccessful,
      variables: form.formState.isSubmitSuccessful ? { input: form.getValues() } : undefined,
    },
  )

  const handleSubmit = form.handleSubmit(
    (data, e) => console.log(data, e),
    (errors, e) => console.log(errors, e),
  )

  return (
    <AddressForm form={form}>
      <Button type="submit" onSubmit={handleSubmit} mt={4}>
        Next
      </Button>
    </AddressForm>
  )
}

function useAddressForm() {
  const form = useForm<AddressInput>({})

  return form
}
