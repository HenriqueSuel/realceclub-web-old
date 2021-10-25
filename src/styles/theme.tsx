import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    black: '#0A0A0A',
    white: '#fff',
    gray: {
      "900": "#141414",
      "800": "#333333",
      "700": "#3D3D3D",
      "600": "#474747",
      "500": "#5C5C5C",
      "400": "#707070",
      "300": "#858585",
      "200": "#A3A3A3",
      "100": "#CCCCCC",
    },
    red: '#FF331F',
    blue:'#054A91', /* #232ED1 */
    green: '#44cf6c',
    yellow: '#FFBF00',
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black'
      }
    }
  }
})