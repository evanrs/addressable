import React, { DependencyList, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Button } from '@chakra-ui/button'

import { AddressForm, useAddressForm } from './components'
import { AddressInput, NormalizedAddressResponse } from './providers'
import { NormalizedAddressQuery } from './queries'
import { isEqual, Storage } from './tools'
import { useLocalState } from './hooks'

const storage = Storage<AddressInput>('addressable')

type WorkflowState = 'form' | 'compare' | 'review'

export const Addressable: React.FC = () => {
  const [values, setValues] = useLocalState<AddressInput>('addr:values')
  const [state, setState] = useState<WorkflowState>('form')

  const form = useAddressForm({
    defaultValues: values,
  })

  // save state
  useEffect(() => {
    setValues(form.getValues())
  }, [form.formState.submitCount])

  const query = useQuery<
    { normalizedAddress: NormalizedAddressResponse },
    { address: AddressInput }
  >(NormalizedAddressQuery, { variables: { address: values as AddressInput } })

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      const values = form.getValues()
      console.log('fetching')
      query.refetch({ address: form.getValues() })
    }
  }, [form.formState.submitCount, form.formState.isSubmitSuccessful])

  useEffect(() => {
    if (query.data) {
      if (isEqual(form.getValues(), query.data.normalizedAddress.normalizedAddress)) {
        setState('review')
      } else {
        setState('compare')
      }
    }
  }, [query.data])

  return state === 'form' ? (
    <AddressForm form={form} maxWidth="25rem">
      <Button type="submit" mt={4} size="lg">
        Next
      </Button>
    </AddressForm>
  ) : state === 'compare' ? (
    <>compare</>
  ) : state === 'review' ? (
    <>review</>
  ) : (
    <>This is an error.</>
  )
}
