import {
  Flex,
  Button,
  Grid,
  Heading,
  useColorMode,
  SystemStyleObject,
  useColorModeValue,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, RepeatIcon, ChatIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { useState } from 'react'

const mailto = `mailto:me@evanrs.com?subject=${encodeURIComponent(
  'Evan, nice work on Addressable 👏',
)}&body=${encodeURIComponent('Hey Evan,\n\nI just wanted say …')}&cc=evanrs@gmail.com`

export type SupervisorProps = {
  repeat?: () => void
  reset?: () => void
}

export const Supervisor = ({ repeat, reset }: SupervisorProps) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { top, bottom, hover, onHoverProps } = useCustomHoverStates(false)
  const buttonProps = {
    variant: 'ghost',
    py: 0,
    px: 0,
    width: '3rem',
    height: '2.5rem',
    color: 'unset',
  }

  return (
    <>
      {/* top */}
      <Layout position="top" {...onHoverProps} sx={top}>
        <Heading size="md">addressable</Heading>
        <Grid width="max-content" templateColumns="repeat(3, min-content)" gap={[1, 1, 2, 2]}>
          <Button {...buttonProps} as="a" href={mailto}>
            <ChatIcon />
          </Button>
          <Button {...buttonProps} onClick={toggleColorMode}>
            {colorMode === 'dark' ? <SunIcon boxSize={5} /> : <MoonIcon boxSize={4} />}
          </Button>

          {repeat != null && (
            <Button {...buttonProps} onClick={repeat}>
              <RepeatIcon />
            </Button>
          )}
          {reset != null && (
            <Button {...buttonProps} onClick={reset}>
              <SmallCloseIcon boxSize={6} />
            </Button>
          )}
        </Grid>
      </Layout>
      {/* bottom */}
      <Layout position="bottom" justifyContent="flex-end" {...onHoverProps} sx={bottom}>
        <Button
          color=""
          variant="ghost"
          width="max-content"
          py={2}
          px={4}
          as="a"
          href={mailto}
          size="lg"
          sx={{
            ':not(:hover)': {
              transition: 'all',
              transitionDuration: hover ? '1s' : '2.5s',
              transitionTimingFunction: hover ? 'ease-out' : 'ease',
            },
            '.surprise': { opacity: 0, transition: 'all 2.5s ease-in-out' },
            ':hover': { '.surprise': { opacity: 1, transition: 'all 200ms ease' } },
          }}
        >
          <ChatIcon className="surprise" />
          <Flex pr={3} />
          <Heading size="sm">Evan Schneider</Heading>
        </Button>
      </Layout>
    </>
  )
}

type LayoutProps = Omit<Parameters<typeof Flex>[0], 'position'> & {
  position: 'top' | 'bottom'
}

const Layout: React.FC<LayoutProps> = ({ children, position, ...props }) => {
  props[position] = position === 'top' ? [3, 3, 3, 5] : [2, 3, 3, 5, 5]

  return (
    <Flex
      cursor="default"
      userSelect="none"
      position="fixed"
      left={[2, 4, 4, 6, 6].map((v) => v + 4)}
      right={[2, 4, 4, 6, 6]}
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      {children}
    </Flex>
  )
}

function useCustomHoverStates(initialState?: boolean) {
  const [hover, setHover] = useState(Boolean(initialState))

  const onHoverProps = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  }

  const sx: SystemStyleObject = {
    willChange: 'color',
    transitionProperty: 'color',
    transitionDuration: 'normal',
  }

  const top = useColorModeValue(
    { color: 'gray.400', ':hover': { color: 'gray.400' } },
    { color: 'gray.600', ':hover': { color: 'gray.500' } },
  )

  const bottom = useColorModeValue(
    { color: hover ? 'pink.400' : 'gray.200', ':hover': { color: 'gray.600' } },
    { color: hover ? 'pink.200' : 'gray.700', ':hover': { color: 'gray.200' } },
  )

  return { top: { ...sx, ...top }, bottom: { ...sx, ...bottom }, hover, onHoverProps }
}
