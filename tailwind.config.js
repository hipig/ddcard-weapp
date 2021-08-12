const _ = require('lodash')
const defaultTheme = require('tailwindcss/defaultTheme')
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
    borderColor: false,
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
      lime: colors.lime,
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
      18: '4.5rem',
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
      full: '100%',
    },
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
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
      screen: '100vh',
    }),
    inset: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing')),
      '1_2': '50%',
      '1_3': '33.333333%',
      '2_3': '66.666667%',
      '1_4': '25%',
      '2_4': '50%',
      '3_4': '75%',
      '-1_2': '-50%',
      '-1_3': '-33.333333%',
      '-2_3': '-66.666667%',
      '-1_4': '-25%',
      '-2_4': '-50%',
      '-3_4': '-75%',
      '-full': '-100%',
    }),
    translate: (theme, { negative }) => ({
      ...theme('spacing'),
      ...negative(theme('spacing')),
      '1_2': '50%',
      '1_3': '33.333333%',
      '2_3': '66.666667%',
      '1_4': '25%',
      '2_4': '50%',
      '3_4': '75%',
      '-1_2': '-50%',
      '-1_3': '-33.333333%',
      '-2_3': '-66.666667%',
      '-1_4': '-25%',
      '-2_4': '-50%',
      '-3_4': '-75%',
      '-full': '-100%',
    }),
    width: (theme) => ({
      ...theme('height'),
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
    }),
    screens: {},
    extend: {
      scale: {
        '25': '.25',
        '85': '.85',
        '200': '2',
      },
      boxShadow: {
        'gray': '0px 2px 0px ' + colors.coolGray[900],
      },
      animation: {
        fade: 'fade 0.2s ease-in',
        popup: 'popup 0.2s ease-in',
        slideUp: 'slideUp 0.1s ease-in',
        scale: 'scale 0.5s ease-in',
      },
      keyframes: {
        slideUp: {
          'from': {
            transform: 'translateY(1.5rem)',
            opacity: 0
          },
          'to': {
            transform: 'translateY(0)',
            opacity: 1
          },
        },
        fade: {
          'from': {
            opacity: 0
          },
          'to': {
            opacity: 1
          },
        },
        popup: {
          'from': {
            transform: 'scale(1.25, 1.25)',
            opacity: 0
          },
          'to': {
            transform: 'scale(1, 1)',
            opacity: 1
          },
        },
        scale: {
          '0%, 100%': {
            transform: 'scale(1, 1)'
          },
          '50%': {
            transform: 'scale(1.2, 1.2)'
          }
        }
      }
    }
  },
  variants: {},
  plugins: [
    plugin(function({ addUtilities, theme }) {
      const flattenColorPalette = (colors) =>
        Object.assign(
          {},
          ...Object.entries(colors).flatMap(([color, values]) =>
            typeof values == 'object'
              ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
                  [color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex,
                }))
              : [{ [`${color}`]: values }]
          )
        )

      const colors = flattenColorPalette(theme('borderColor'))

      const utilities = _.map(colors, (value, key) => {
        return {
          [`.border-${key}`]: {
            borderColor: `${value}`
          }
        }
      })

      addUtilities(utilities)
    }),
    plugin(function({ addUtilities, theme }) {
      const utilities = _.map(theme('boxShadow'), (value, key) => {
        return {
          [key === 'DEFAULT' ? `.shadow` : `.shadow-${key}`]: {
            boxShadow: `${value}`
          }
        }
      })

      addUtilities(utilities)
    }),
    plugin(function({ addComponents, theme }) {
      const round = (num) =>
        num
          .toFixed(7)
          .replace(/(\.[0-9]+?)0+$/, '$1')
          .replace(/\.0$/, '')
      const rem = (px) => `${round(px / 16)}rem`
      const em = (px, base) => `${round(px / base)}em`

      const prose = {
        '.prose': _.merge(
            {},
            ..._.castArray([
              {
                color: theme('colors.gray.700', defaultTheme.colors.gray[700]),
                maxWidth: '100%',
                '.a': {
                  color: theme('colors.gray.900', defaultTheme.colors.gray[900]),
                  textDecoration: 'underline',
                  fontWeight: '500',
                },
                '.strong': {
                  color: theme('colors.gray.900', defaultTheme.colors.gray[900]),
                  fontWeight: '600',
                },
                '.ol > .li': {
                  position: 'relative',
                },
                '.hr': {
                  borderColor: theme('colors.gray.200', defaultTheme.colors.gray[200]),
                  borderTopWidth: 1,
                },
                '.h1': {
                  color: theme('colors.gray.900', defaultTheme.colors.gray[900]),
                  fontWeight: '800',
                },
                '.h1 .strong': {
                  fontWeight: '900',
                },
                '.h2': {
                  color: theme('colors.gray.900', defaultTheme.colors.gray[900]),
                  fontWeight: '700',
                },
                '.h2 .strong': {
                  fontWeight: '800',
                },
                '.h3': {
                  color: theme('colors.gray.900', defaultTheme.colors.gray[900]),
                  fontWeight: '600',
                },
                '.h3 .strong': {
                  fontWeight: '700',
                },
                '.h4': {
                  color: theme('colors.gray.900', defaultTheme.colors.gray[900]),
                  fontWeight: '600',
                },
                '.h4 .strong': {
                  fontWeight: '700',
                },
                '.figure .figcaption': {
                  color: theme('colors.gray.500', defaultTheme.colors.gray[500]),
                },
                '.code': {
                  color: theme('colors.gray.900', defaultTheme.colors.gray[900]),
                  fontWeight: '600',
                },
                '.code::before': {
                  content: '"`"',
                },
                '.code::after': {
                  content: '"`"',
                },
                '.a .code': {
                  color: theme('colors.gray.900', defaultTheme.colors.gray[900]),
                },
                '.pre': {
                  color: theme('colors.gray.200', defaultTheme.colors.gray[200]),
                  backgroundColor: theme('colors.gray.800', defaultTheme.colors.gray[800]),
                  overflowX: 'auto',
                },
                '.pre .code': {
                  backgroundColor: 'transparent',
                  borderWidth: '0',
                  borderRadius: '0',
                  padding: '0',
                  fontWeight: '400',
                  color: 'inherit',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  lineHeight: 'inherit',
                },
                '.pre .code::before': {
                  content: 'none',
                },
                '.pre .code::after': {
                  content: 'none',
                },
              },
              {
                fontSize: rem(16),
                lineHeight: round(28 / 16),
                '.blockquote': {
                  marginTop: em(32, 20),
                  marginBottom: em(32, 20),
                  paddingLeft: em(20, 20),
                },
                '.h1': {
                  fontSize: em(36, 16),
                  marginTop: '0',
                  marginBottom: em(32, 36),
                  lineHeight: round(40 / 36),
                },
                '.h2': {
                  fontSize: em(24, 16),
                  marginTop: em(48, 24),
                  marginBottom: em(24, 24),
                  lineHeight: round(32 / 24),
                },
                '.h3': {
                  fontSize: em(20, 16),
                  marginTop: em(32, 20),
                  marginBottom: em(12, 20),
                  lineHeight: round(32 / 20),
                },
                '.h4': {
                  marginTop: em(24, 16),
                  marginBottom: em(8, 16),
                  lineHeight: round(24 / 16),
                },
                '.img': {
                  marginTop: em(32, 16),
                  marginBottom: em(32, 16),
                },
                '.video': {
                  marginTop: em(32, 16),
                  marginBottom: em(32, 16),
                },
                '.figure': {
                  marginTop: em(32, 16),
                  marginBottom: em(32, 16),
                },
                '.figure .figcaption': {
                  fontSize: em(14, 16),
                  lineHeight: round(20 / 14),
                  marginTop: em(12, 14),
                },
                '.code': {
                  fontSize: em(14, 16),
                },
                '.h2 .code': {
                  fontSize: em(21, 24),
                },
                '.h3 .code': {
                  fontSize: em(18, 20),
                },
                '.pre': {
                  fontSize: em(14, 16),
                  lineHeight: round(24 / 14),
                  marginTop: em(24, 14),
                  marginBottom: em(24, 14),
                  borderRadius: rem(6),
                  paddingTop: em(12, 14),
                  paddingRight: em(16, 14),
                  paddingBottom: em(12, 14),
                  paddingLeft: em(16, 14),
                },
                '.hr': {
                  marginTop: em(48, 16),
                  marginBottom: em(48, 16),
                }
              }
            ])
          )
      }

      addComponents(prose)
    })
  ]
};
