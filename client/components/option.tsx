import {
  useColorModeValue,
  Button,
  ButtonProps,
  Center,
  Flex,
  FlexProps,
  Heading,
  VStack,
} from '@chakra-ui/react'
import React from 'react'

type OptionProps = ButtonProps & {
  icon?: unknown
  title?: unknown
  align?: 'left' | 'center' | 'right'
  readOnly?: boolean
}

export const Option: React.FC<OptionProps> = ({ icon, title, readOnly, children, ...props }) => {
  const contents = (
    <VStack flex="1" align="flex-start" justify="space-evenly">
      {Boolean(title) && (
        <Center my=".25rem">
          {icon}
          <Heading size="xs" fontSize=".75rem" mt=".125rem">
            {title}
          </Heading>
        </Center>
      )}
      {children}
    </VStack>
  )

  return readOnly ? (
    <Flex {...(useOptionProps(props) as FlexProps)}>{contents}</Flex>
  ) : (
    <Button {...useOptionProps(props)}>{contents}</Button>
  )
}

export function useOptionProps({ align, ...props }: Partial<OptionProps> = {}) {
  const buttonProps: ButtonProps = {
    fontSize: '17px',
    lineHeight: '1.75rem',

    size: 'lg',
    width: '100%',
    minWidth: '15rem',
    maxWidth: '32rem',
    height: '8.5rem',

    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 2,

    py: '.75rem',
    paddingInlineStart: '1.5rem',
    paddingInlineEnd: '1.5rem',

    variant: 'ghost',

    textAlign: 'left',
    alignItems: 'center',
    flexDirection: 'column',

    sx: { wordSpacing: '.125rem' },
  }

  const alignProps: ButtonProps =
    align === 'left'
      ? { textAlign: 'left', alignItems: 'flex-start' }
      : align === 'right'
      ? { textAlign: 'right', alignItems: 'flex-end' }
      : align === 'center'
      ? { textAlign: 'center', alignItems: 'center' }
      : {}

  const colorProps: ButtonProps = {
    backgroundColor: useColorModeValue('gray.50', 'gray.900'),
    color: useColorModeValue('gray.900', 'gray.100'),
    borderColor: useColorModeValue('gray.100', 'gray.700'),
  }

  return { ...buttonProps, ...alignProps, ...colorProps, ...props }
}
