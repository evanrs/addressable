import React, { DependencyList, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Flex, Grid, Heading, Text, Button } from '@chakra-ui/react'

import { Address, AddressForm, CompareAddress, useAddressForm } from './components'
import { AddressInput, NormalizedAddressResponse } from './providers'
import { NormalizedAddressQuery } from './queries'
import { isEqual, trimRecord } from './tools'
import { useLocalState } from './hooks'

type WorkflowState = 'form' | 'compare' | 'review'

export const Addressable: React.FC = () => {
  const [state, setState] = useState<WorkflowState>('form')
  const [values, setValues] = useLocalState<AddressInput>('form')
  const [submitted, setSubmitted] = useState<AddressInput>()

  const form = useAddressForm({ defaultValues: values })

  const query = useQuery<
    { normalizedAddress: NormalizedAddressResponse },
    { address: AddressInput }
  >(NormalizedAddressQuery, { variables: { address: submitted as AddressInput } })

  // save state
  useEffect(() => {
    if (form.formState.submitCount > 0) {
      const values = trimRecord(form.getValues())
      setValues(values)
      if (form.formState.isSubmitSuccessful) {
        setSubmitted(values)
      }
    }
  }, [form.formState.submitCount])

  useEffect(() => {
    if ((form.formState.submitCount > 0, form.formState.isSubmitSuccessful)) {
      setSubmitted(form.getValues())
    }
  }, [form.formState.submitCount])

  useEffect(() => {
    if (form.formState) query.refetch({ address: submitted })
  }, [submitted])

  useEffect(() => {
    if (query.data) {
      if (isEqual(form.getValues(), query.data.normalizedAddress.normalizedAddress)) {
        setState('review')
      } else {
        setState('compare')
      }
    }
  }, [query.data])

  const handleSelect = useCallback((value?: AddressInput) => {
    setState('review')
    setSubmitted(value)
  }, [])

  const reset = useCallback(() => {
    setState('form')
    setValues(undefined)
    setSubmitted(undefined)
    form.reset()
  }, [])

  return state === 'form' ? (
    <AddressForm form={form} maxWidth="25rem">
      <Button type="submit" mt={4} size="lg">
        Next
      </Button>
    </AddressForm>
  ) : state === 'compare' ? (
    <CompareAddress
      usps={query.data?.normalizedAddress.normalizedAddress}
      input={submitted}
      onSelect={handleSelect}
    />
  ) : state === 'review' ? (
    <AddressReview address={submitted} onRepeat={reset}></AddressReview>
  ) : (
    <>This is an error.</>
  )
}

const AddressReview = ({ address, onRepeat }: { address?: AddressInput; onRepeat: () => void }) => {
  return (
    <Flex direction="column" alignItems="center">
      <Heading size="lg" my="1rem">
        🚚
      </Heading>
      <Heading size="md" mb={6}>
        Does this look correct?
      </Heading>
      <Address address={address} />
      <Button size="lg" mt={12} onClick={onRepeat}>
        Enter New Address
      </Button>
    </Flex>
  )
}
