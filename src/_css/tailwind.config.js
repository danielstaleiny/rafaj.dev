module.exports = {
  prefix: '',
  mode: 'jit',
  purge: {
    content: ['_site/**/*.html'],
    defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:\.\/]+/g) || [],
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  important: false,
  separator: ':',
  theme: {
    // Sets default parameters for container
    container: {
      padding: '2rem',
      center: true,
    },
    // .{screen}:{utility}
    screens: {
      t: '50em', // 800px tablet or medium size
      d: '73em', // 1168px desktop or large size
      w: {
        raw:
          '(min-aspect-ratio: 13/9), (hover: hover) and (orientation: landscape)',
      }, //orientation: landscape or wide screen
    },
    colors: {
      transparent: 'transparent',
      black: 'black',
      fg: '#111111',
      white: '#ffffff',
      bg: '#f5f8f6',
      gray: {
        100: '#f7fafc',
        200: '#edf2f7',
        300: '#e2e8f0',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        700: '#4a5568',
        800: '#2d3748',
        900: '#1a202c',
      },
      red: {
        100: '#fff5f5',
        200: '#fed7d7',
        300: '#feb2b2',
        400: '#fc8181',
        500: '#f56565',
        600: '#e53e3e',
        700: '#c53030',
        800: '#9b2c2c',
        900: '#742a2a',
      },
      orange: {
        base: '#df967c',
        100: '#fffaf0',
        200: '#feebc8',
        300: '#fbd38d',
        400: '#f6ad55',
        500: '#ed8936',
        600: '#dd6b20',
        700: '#c05621',
        800: '#9c4221',
        900: '#7b341e',
      },
      yellow: {
        100: '#fffff0',
        200: '#fefcbf',
        300: '#faf089',
        400: '#f6e05e',
        500: '#ecc94b',
        600: '#d69e2e',
        700: '#b7791f',
        800: '#975a16',
        900: '#744210',
      },
      green: {
        100: '#f0fff4',
        200: '#c6f6d5',
        300: '#9ae6b4',
        400: '#68d391',
        500: '#48bb78',
        600: '#38a169',
        700: '#2f855a',
        800: '#276749',
        900: '#22543d',
      },
      teal: {
        100: '#e6fffa',
        200: '#b2f5ea',
        300: '#81e6d9',
        400: '#4fd1c5',
        500: '#38b2ac',
        600: '#319795',
        700: '#2c7a7b',
        800: '#285e61',
        900: '#234e52',
      },
      blue: {
        100: '#ebf8ff',
        200: '#bee3f8',
        300: '#90cdf4',
        400: '#63b3ed',
        500: '#4299e1',
        600: '#3182ce',
        700: '#2b6cb0',
        800: '#2c5282',
        900: '#2a4365',
      },
      indigo: {
        100: '#ebf4ff',
        200: '#c3dafe',
        300: '#a3bffa',
        400: '#7f9cf5',
        500: '#667eea',
        600: '#5a67d8',
        700: '#4c51bf',
        800: '#434190',
        900: '#3c366b',
      },
      purple: {
        100: '#faf5ff',
        200: '#e9d8fd',
        300: '#d6bcfa',
        400: '#b794f4',
        500: '#9f7aea',
        600: '#805ad5',
        700: '#6b46c1',
        800: '#553c9a',
        900: '#44337a',
      },
      pink: {
        100: '#fff5f7',
        200: '#fed7e2',
        300: '#fbb6ce',
        400: '#f687b3',
        500: '#ed64a6',
        600: '#d53f8c',
        700: '#b83280',
        800: '#97266d',
        900: '#702459',
      },
    },
    spacing: {
      auto: 'auto',
      0: '0px',
      '2-px': '2px', // 2px
      0.125: '0.125rem', // 2px
      0.25: '0.25rem', // 4px
      0.5: '0.5rem', // 8px
      0.75: '0.75rem', // 12px
      1: '1rem', // 16px
      1.25: '1.25rem', // 20px
      1.5: '1.5rem', // 24px
      2: '2rem', // 32px
      2.5: '2.5rem',
      3: '3rem',
      4: '4rem',
      6: '6rem',
      8: '8rem',
      10: '10rem',
      12: '12rem',
      14: '14rem',
      16: '16rem',
      '0.125-em': '0.125em', // 2px
      '0.25-em': '0.25em', // 4px
      '0.5-em': '0.5em', // 8px
      '0.75-em': '0.75em', // 12px
      '1-em': '1em', // 16px
      '1.25-em': '1.25em', // 20px
      '1.5-em': '1.5em', // 24px
      '2-em': '2em', // 32px
      '2.5-em': '2.5em',
    },
    backgroundColor: (theme) => theme('colors'),
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.300', 'currentColor'),
    }),
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      lg: '0.5rem',
      full: '9999px',
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      0.125: '0.125rem',
      0.25: '0.25rem',
      0.375: '0.375rem',
      0.5: '0.5rem',
      '0.125-em': '0.125em',
      '0.25-em': '0.25em',
      '0.375-em': '0.375em',
      '0.5-em': '0.5em',
      2: '2px',
      4: '4px',
      8: '8px',
      4: '4px',
      8: '8px',
    },
    boxShadow: {
      DEFAULT:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      none: 'none',
    },
    cursor: {
      auto: 'auto',
      DEFAULT: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
    },
    fill: {
      current: 'currentColor',
    },
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },
    flexGrow: {
      0: '0',
      DEFAULT: '1',
    },
    flexShrink: {
      0: '0',
      DEFAULT: '1',
    },
    fontFamily: {
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    fontSize: {
      xs: '.75rem', // 12px // 15px
      sm: '.875rem', // 14px // 17.5px
      base: '1rem', // 16px // 20px
      lg: '1.125rem', // 18px // 22.5px
      xl: '1.25rem', // 20px // 25px
      h4: '1.5rem', // 24px // 30px
      h3: '1.875rem', // 30px // 37.5px
      h2: '2.25rem', // 36px // 45px
      h1: '3rem', // 48px // 60px
      'xs-px': '12px', // 12px
      'sm-px': '14px', // 14px
      'base-px': '16px', // 16px
      'lg-px': '18px', // 18px
      'xl-px': '20px', // 20px
      'h4-px': '24px', // 24px
      'h3-px': '30px', // 30px
      'h2-px': '36px', // 36px
      'h1-px': '48px', // 48px
    },
    fontWeight: {
      hairline: '100',
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
    }),
    inset: {
      0: '0',
      auto: 'auto',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    },
    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing')),
    }),
    maxWidth: {
      20: '20rem',
      30: '30rem',
      32: '32rem',
      36: '36rem',
      40: '40rem',
      50: '50rem',
      60: '60rem',
      70: '70rem',
      80: '80rem',
      90: '90rem',
      100: '100rem',
      full: '100%',
    },
    opacity: {
      0: '0',
      25: '0.25',
      50: '0.5',
      75: '0.75',
      100: '1',
    },
    padding: (theme) => theme('spacing'),
    stroke: {
      current: 'currentColor',
    },
    textColor: (theme) => theme('colors'),
    width: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.33333%',
      '2/3': '66.66667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.66667%',
      '2/6': '33.33333%',
      '3/6': '50%',
      '4/6': '66.66667%',
      '5/6': '83.33333%',
      '1/12': '8.33333%',
      '2/12': '16.66667%',
      '3/12': '25%',
      '4/12': '33.33333%',
      '5/12': '41.66667%',
      '6/12': '50%',
      '7/12': '58.33333%',
      '8/12': '66.66667%',
      '9/12': '75%',
      '10/12': '83.33333%',
      '11/12': '91.66667%',
      full: '100%',
      screen: '100vw',
    }),
    zIndex: {
      auto: 'auto',
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
    },
  },
  variants: {},
  corePlugins: {},
  plugins: [],
}
