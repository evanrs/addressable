import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Button } from '@chakra-ui/button'

import { AddressForm, useAddressForm } from './components'
import { AddressInput, NormalizedAddressResponse } from './providers'
import { NormalizedAddressQuery } from './queries'
import { Storage } from './tools'
import { Flex } from '@chakra-ui/layout'

const storage = Storage<AddressInput>('addressable')
const defaultValues = storage.get('form')

type WorkflowState = 'form' | 'compare' | 'review'

export const Addressable: React.FC = () => {
  const [state, setState] = useState<WorkflowState>('form')
  const form = useAddressForm({ defaultValues })

  useEffect(() => {
    storage.set('form', form.getValues())
  }, [form.formState.submitCount])

  const query = useQuery<NormalizedAddressResponse, { input: AddressInput }>(
    NormalizedAddressQuery,
    {
      skip: !form.formState.isSubmitSuccessful,
      variables: form.formState.isSubmitSuccessful ? { input: form.getValues() } : undefined,
    },
  )

  useEffect(() => {
    console.log(query.data)
  }, [query.data])

  return state === 'form' ? (
    <AddressForm form={form} maxWidth="25rem">
      <Button type="submit" mt={4} size="lg">
        Next
      </Button>
    </AddressForm>
  ) : state === 'compare' ? (
    'compare'
  ) : state === 'review' ? (
    'review'
  ) : (
    'This is an error.'
  )
}
