import { SystemStyleObject } from '@chakra-ui/styled-system'

export const opacityTransistionFor = (
  value?: boolean | number,
  transitionDuration: 'fast' | 'normal' | 'slow' | string = 'normal',
): SystemStyleObject => {
  const opacity = typeof value === 'number' ? value : value ? 1 : 0

  return {
    opacity,
    transitionProperty: 'opacity',
    transitionDuration,
    transitionTimingFunction: opacity <= 0.5 ? 'ease-in' : 'ease-out',
    visibility: opacity > 0 ? 'visible' : 'hidden',
  }
}
