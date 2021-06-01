import React, { useEffect, useState } from 'react'
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react'
import { useController, UseControllerProps, FieldPath, FieldValues } from 'react-hook-form'

export type InputProps = Parameters<typeof Input>[0]

export type Setter<K = string | number, V = string | number | undefined> = (
  name: K,
  value?: V,
) => void

export const fieldStyleProps = {
  variant: 'filled',
  fontSize: ['2.5vw', 'xs', 'xs', 13, 'sm'],
  px: [2, 2, 2, 4],
}

export type FieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = InputProps & UseControllerProps<TFieldValues, TName>

export const Field = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FieldProps<TFieldValues, TName>,
) => {
  const { field, fieldState, formState } = useController(props)

  return (
    <FormControl isInvalid={Boolean(fieldState.error)}>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Input
        {...fieldStyleProps}
        {...props}
        {...field}
        value={(field.value ?? '') as InputProps['value']}
      />
      <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
    </FormControl>
  )
}
