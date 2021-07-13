const _ = require('lodash')
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {

  darkMode: false,
  corePlugins: {
    preflight: false,
    divideColor: false,
    divideOpacity: false,
    divideStyle: false,
    divideWidth: false,
    space: false,
    placeholderColor: false,
    placeholderOpacity: false,
    ringWidth: false,
    boxShadow: false,
    container: false,
  },
  separator: '_',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: colors.black,
      white: colors.white,

      gray: colors.coolGray,
      red: colors.red,
      orange: colors.orange,
      yellow: colors.amber,
      green: colors.emerald,
      teal: colors.teal,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.purple,
      pink: colors.pink,
    },
    spacing: {
      px: '1px',
      0: '0',
      '0_5': '0.125rem',
      1: '0.25rem',
      '1_5': '0.375rem',
      2: '0.5rem',
      '2_5': '0.625rem',
      3: '0.75rem',
      '3_5': '0.875rem',
      4: '1rem',
      '4_5': '1.125rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
      128: '32rem',
      '1_2': '50%',
      '1_3': '33.333333%',
      '2_3': '66.666667%',
      '1_4': '25%',
      '2_4': '50%',
      '3_4': '75%',
      '1__5': '20%',
      '2__5': '40%',
      '3__5': '60%',
      '4__5': '80%',
      '1_6': '16.666667%',
      '2_6': '33.333333%',
      '3_6': '50%',
      '4_6': '66.666667%',
      '5_6': '83.333333%',
      '1_12': '8.333333%',
      '2_12': '16.666667%',
      '3_12': '25%',
      '4_12': '33.333333%',
      '5_12': '41.666667%',
      '6_12': '50%',
      '7_12': '58.333333%',
      '8_12': '66.666667%',
      '9_12': '75%',
      '10_12': '83.333333%',
      '11_12': '91.666667%',
      'full': '100%'
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      'yellow': '6px 6px #FBBF24',
      'gray': '0px 2px 0px ' + colors.coolGray[900],
    },
    lineHeight: (theme) => theme('spacing'),
    translate: (theme) => theme('spacing'),
    inset: theme => theme('spacing'),
    width: (theme) => ({
      ...theme('spacing'),
      auto: 'auto',
      screen: '100vw',
    }),
    maxWidth: (theme) => theme('spacing'),
    height: (theme) => theme('width'),
    maxHeight: (theme) => theme('spacing'),
    scale: {
      '0': '0',
      '25': '.25',
      '50': '.5',
      '75': '.75',
      '85': '.85',
      '90': '.9',
      '95': '.95',
      '100': '1',
      '105': '1.05',
      '110': '1.1',
      '125': '1.25',
      '150': '1.5',
      '200': '2',
    },
    screens: {},
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 1s infinite',
      },
      keyframes: {
        fadeInUp: {
         'from': {
           transform: 'translate3d(0, 100%, 0)',
           opacity: 0
          },
          'to': {
            transform: 'translate3d(0, 0, 0)',
            opacity: 1
           },
       }
      }
    }
  },
  variants: {},
  plugins: [
    plugin(function({ addUtilities, theme, e }) {
      const newUtilities = _.map(theme('boxShadow'), (value, key) => {
        let prefix = 'shadow-'
        if(key === 'DEFAULT' ) {
          key = ''
          prefix = 'shadow'
        }
        return {
          [`.${e(`${prefix}${key}`)}`]: {
            boxShadow: `${value}`
          }
        }
      })

      addUtilities(newUtilities)
    })
  ]
};
