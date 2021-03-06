import { useQuery } from '@apollo/client'
import { Button, Center, Container, Flex, Spinner } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'

import { isEqual, trimRecord } from './tools'
import { useLocalState } from './hooks'
import { AddressInput, NormalizedAddressResponse } from './providers'
import { NormalizedAddressQuery } from './queries'
import { Address, AddressForm, CompareAddress, Option, Heading, useAddressForm } from './components'

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

  // save values from form, or promote when valid
  useEffect(() => {
    if (form.formState.submitCount > 0) {
      const values = trimRecord(form.getValues())
      setValues(values)
      if (form.formState.isSubmitSuccessful) {
        setSubmitted(values)
      }
    }
  }, [form.formState.submitCount])

  // store submission when valid
  useEffect(() => {
    if (form.formState.submitCount > 0 && form.formState.isSubmitSuccessful) {
      setSubmitted(form.getValues())
    }
  }, [form.formState.submitCount])

  // perform our request when they've submitted a valid value
  useEffect(() => {
    if (form.formState.isSubmitted) {
      query.refetch({ address: submitted })
    }
  }, [submitted])

  // manage state transitions
  useEffect(() => {
    if (query.data) {
      if (isEqual(form.getValues(), query.data.normalizedAddress.normalizedAddress)) {
        setState('review')
      } else if (state === 'form') {
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
    <Container centerContent>
      <Heading>What address are you moving from?</Heading>
      <AddressForm form={form} maxWidth="25rem">
        <Button
          type="submit"
          mt={4}
          size="lg"
          disabled={!form.formState.touchedFields || query.loading}
        >
          {query.loading ? <Spinner /> : <>Next</>}
        </Button>
      </AddressForm>
    </Container>
  ) : state === 'compare' ? (
    <CompareAddress
      usps={query.data?.normalizedAddress.normalizedAddress}
      input={submitted}
      onSelect={handleSelect}
    >
      <Heading icon="????">Which address do you use?</Heading>
    </CompareAddress>
  ) : state === 'review' ? (
    <AddressReview address={submitted} onRepeat={reset}></AddressReview>
  ) : (
    <Center>
      <Heading size="lg" ml="-3rem" mr="1.5rem">
        ????
      </Heading>
      {'This is an error.'}
    </Center>
  )
}

const AddressReview = ({ address, onRepeat }: { address?: AddressInput; onRepeat: () => void }) => {
  return (
    <Flex direction="column" alignItems="center">
      <Heading>Does this look correct?</Heading>

      <Option readOnly maxW="12rem" height="8rem">
        <Address address={address} />
      </Option>

      <Flex minHeight="1rem" mb={4} />

      <Button size="lg" mt={8} onClick={onRepeat}>
        Enter New Address
      </Button>
    </Flex>
  )
}
