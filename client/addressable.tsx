import React, { DependencyList, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Flex, Grid, Heading, Text, Button } from '@chakra-ui/react'

import { AddressForm, useAddressForm } from './components'
import { AddressInput, NormalizedAddressResponse } from './providers'
import { NormalizedAddressQuery } from './queries'
import { isEqual, Storage } from './tools'
import { useLocalState } from './hooks'

const storage = Storage<AddressInput>('addressable')

type WorkflowState = 'form' | 'compare' | 'review'

export const Addressable: React.FC = () => {
  const [state, setState] = useState<WorkflowState>('form')
  const [values, setValues] = useState<AddressInput>()
  const [submitted, setSubmitted] = useState<AddressInput>()
  const form = useAddressForm({ defaultValues: values })

  // save state
  useEffect(() => {
    if (form.formState.submitCount > 0) {
      const values = sanitize(form.getValues())
      setValues(values)
      if (form.formState.isSubmitSuccessful) {
        setSubmitted(values)
      }
    }
  }, [form.formState.submitCount])

  const query = useQuery<
    { normalizedAddress: NormalizedAddressResponse },
    { address: AddressInput }
  >(NormalizedAddressQuery, { variables: { address: values as AddressInput } })

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
      console.log(
        'form.getValues()',
        form.getValues(),
        'query.data.normalizedAddress.normalizedAddress',
        query.data.normalizedAddress.normalizedAddress,
        'isEqual(form.getValues(), query.data.normalizedAddress.normalizedAddress)',
        isEqual(form.getValues(), query.data.normalizedAddress.normalizedAddress),
      )
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
    <Compare
      usps={query.data?.normalizedAddress.normalizedAddress}
      input={values}
      onSelect={(values) => {
        setState('review')
        setValues(values)
      }}
    />
  ) : state === 'review' ? (
    <AddressReview
      address={values}
      onRepeat={() => {
        setState('form')
        setValues({})
      }}
    ></AddressReview>
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

const Compare = ({
  usps,
  input,
  onSelect,
}: {
  usps?: AddressInput
  input?: AddressInput
  onSelect: (input?: AddressInput) => void
}) => {
  return (
    <Flex direction="column" alignItems="center">
      <Heading size="lg" my="1rem">
        🚚
      </Heading>
      <Heading size="md" mb={6}>
        Which address do you use?
      </Heading>
      <Grid templateColumns="1fr 1fr" gap={6} _hover={{ ':hover': { cursor: 'pointer' } }}>
        <Address address={usps} onClick={() => onSelect(usps)} />
        <Address address={input} onClick={() => onSelect(input)} />
      </Grid>
    </Flex>
  )
}

type AddressProps = { address?: AddressInput } & Parameters<typeof Flex>[0]
const Address = ({ address, ...props }: AddressProps) => (
  <Flex direction="column" {...props}>
    <Text>
      {address?.street}
      {address?.unit ? `, ${address?.unit}` : ''}
    </Text>
    <Text>
      {address?.city}, {address?.state} {address?.postalCode}
    </Text>
  </Flex>
)

function sanitize<T extends Record<string, string>>(values: T): T {
  const acc = {} as any
  for (const k of Object.keys(values)) {
    acc[k] = values[k]?.trim?.() ?? values[k]
  }
  return acc as T
}
