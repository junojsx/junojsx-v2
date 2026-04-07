import { buildTheme } from '@sanity/ui/theme'

// Brand palette from src/index.css
// deep-purple:   #4E3C51  → purple 700 (primary action)
// soft-lavender: #B6A5D0  → purple 400
// hover-active:  #3A2D3B  → purple 800
// soft-teal:     #1A7A74  → cyan 500 (accent)
// warm-gold:     #E3C16F  → yellow 400

export const theme = buildTheme({
  palette: {
    black: { title: 'Black', hex: '#0d0e12' },
    white: { title: 'White', hex: '#ffffff' },

    // Brand primary — deep-purple / soft-lavender scale
    purple: {
      '50':  { title: 'Purple 50',  hex: '#FAF8FB' },
      '100': { title: 'Purple 100', hex: '#F0EBF4' },
      '200': { title: 'Purple 200', hex: '#DDD0E6' },
      '300': { title: 'Purple 300', hex: '#C8B5D8' },
      '400': { title: 'Purple 400', hex: '#B6A5D0' }, // soft-lavender
      '500': { title: 'Purple 500', hex: '#8B78A5' },
      '600': { title: 'Purple 600', hex: '#6B5577' },
      '700': { title: 'Purple 700', hex: '#4E3C51' }, // deep-purple
      '800': { title: 'Purple 800', hex: '#3A2D3B' }, // hover-active
      '900': { title: 'Purple 900', hex: '#261D27' },
      '950': { title: 'Purple 950', hex: '#18121A' },
    },

    // Brand accent — soft-teal scale
    cyan: {
      '50':  { title: 'Cyan 50',  hex: '#E8F5F4' },
      '100': { title: 'Cyan 100', hex: '#C5E8E6' },
      '200': { title: 'Cyan 200', hex: '#9DD4D1' },
      '300': { title: 'Cyan 300', hex: '#70BFBB' },
      '400': { title: 'Cyan 400', hex: '#44AAA5' },
      '500': { title: 'Cyan 500', hex: '#1A7A74' }, // soft-teal
      '600': { title: 'Cyan 600', hex: '#14635E' },
      '700': { title: 'Cyan 700', hex: '#0E4D49' },
      '800': { title: 'Cyan 800', hex: '#083735' },
      '900': { title: 'Cyan 900', hex: '#022221' },
      '950': { title: 'Cyan 950', hex: '#011413' },
    },

    // Warm gold for caution/highlight
    yellow: {
      '50':  { title: 'Yellow 50',  hex: '#FEF9E8' },
      '100': { title: 'Yellow 100', hex: '#FCF2C3' },
      '200': { title: 'Yellow 200', hex: '#F9E99A' },
      '300': { title: 'Yellow 300', hex: '#F2D675' },
      '400': { title: 'Yellow 400', hex: '#E3C16F' }, // warm-gold
      '500': { title: 'Yellow 500', hex: '#C9A34E' },
      '600': { title: 'Yellow 600', hex: '#94632F' }, // bronze
      '700': { title: 'Yellow 700', hex: '#6B4220' },
      '800': { title: 'Yellow 800', hex: '#3E2712' },
      '900': { title: 'Yellow 900', hex: '#271910' },
      '950': { title: 'Yellow 950', hex: '#18120B' },
    },

    // Keep defaults for semantic colors
    gray: {
      '50':  { title: 'Gray 50',  hex: '#f6f6f8' },
      '100': { title: 'Gray 100', hex: '#eeeef1' },
      '200': { title: 'Gray 200', hex: '#e3e4e8' },
      '300': { title: 'Gray 300', hex: '#bbbdc9' },
      '400': { title: 'Gray 400', hex: '#9499ad' },
      '500': { title: 'Gray 500', hex: '#727892' },
      '600': { title: 'Gray 600', hex: '#515870' },
      '700': { title: 'Gray 700', hex: '#383d51' },
      '800': { title: 'Gray 800', hex: '#252837' },
      '900': { title: 'Gray 900', hex: '#1b1d27' },
      '950': { title: 'Gray 950', hex: '#13141b' },
    },
    red: {
      '50':  { title: 'Red 50',  hex: '#fff6f5' },
      '100': { title: 'Red 100', hex: '#ffe7e5' },
      '200': { title: 'Red 200', hex: '#ffdedc' },
      '300': { title: 'Red 300', hex: '#fdada5' },
      '400': { title: 'Red 400', hex: '#f77769' },
      '500': { title: 'Red 500', hex: '#ef4434' },
      '600': { title: 'Red 600', hex: '#cc2819' },
      '700': { title: 'Red 700', hex: '#8b2018' },
      '800': { title: 'Red 800', hex: '#4d1714' },
      '900': { title: 'Red 900', hex: '#321615' },
      '950': { title: 'Red 950', hex: '#1e1011' },
    },
    orange: {
      '50':  { title: 'Orange 50',  hex: '#fff7f0' },
      '100': { title: 'Orange 100', hex: '#ffeadb' },
      '200': { title: 'Orange 200', hex: '#ffddc7' },
      '300': { title: 'Orange 300', hex: '#ffb685' },
      '400': { title: 'Orange 400', hex: '#ff8e42' },
      '500': { title: 'Orange 500', hex: '#fa6400' },
      '600': { title: 'Orange 600', hex: '#b14802' },
      '700': { title: 'Orange 700', hex: '#7c3404' },
      '800': { title: 'Orange 800', hex: '#461e07' },
      '900': { title: 'Orange 900', hex: '#32160b' },
      '950': { title: 'Orange 950', hex: '#21120d' },
    },
    green: {
      '50':  { title: 'Green 50',  hex: '#e7fef5' },
      '100': { title: 'Green 100', hex: '#c5fce8' },
      '200': { title: 'Green 200', hex: '#a9f9dc' },
      '300': { title: 'Green 300', hex: '#59f3ba' },
      '400': { title: 'Green 400', hex: '#0ff0a1' },
      '500': { title: 'Green 500', hex: '#04b97a' },
      '600': { title: 'Green 600', hex: '#01794f' },
      '700': { title: 'Green 700', hex: '#015133' },
      '800': { title: 'Green 800', hex: '#023120' },
      '900': { title: 'Green 900', hex: '#06231a' },
      '950': { title: 'Green 950', hex: '#071715' },
    },
    blue: {
      '50':  { title: 'Blue 50',  hex: '#f5f8ff' },
      '100': { title: 'Blue 100', hex: '#e5edff' },
      '200': { title: 'Blue 200', hex: '#dbe5ff' },
      '300': { title: 'Blue 300', hex: '#a8bfff' },
      '400': { title: 'Blue 400', hex: '#7595ff' },
      '500': { title: 'Blue 500', hex: '#556bfc' },
      '600': { title: 'Blue 600', hex: '#4043e7' },
      '700': { title: 'Blue 700', hex: '#2927aa' },
      '800': { title: 'Blue 800', hex: '#192457' },
      '900': { title: 'Blue 900', hex: '#161a41' },
      '950': { title: 'Blue 950', hex: '#101228' },
    },
    magenta: {
      '50':  { title: 'Magenta 50',  hex: '#fef6f9' },
      '100': { title: 'Magenta 100', hex: '#fde8ef' },
      '200': { title: 'Magenta 200', hex: '#fcdee9' },
      '300': { title: 'Magenta 300', hex: '#f7abc5' },
      '400': { title: 'Magenta 400', hex: '#f0709b' },
      '500': { title: 'Magenta 500', hex: '#e72767' },
      '600': { title: 'Magenta 600', hex: '#b11651' },
      '700': { title: 'Magenta 700', hex: '#7c1342' },
      '800': { title: 'Magenta 800', hex: '#4b1130' },
      '900': { title: 'Magenta 900', hex: '#341325' },
      '950': { title: 'Magenta 950', hex: '#1f0f14' },
    },
  },

  // Map Studio semantic roles to brand hues
  color: {
    selectable: {
      primary:  { _hue: 'purple' },
      default:  { _hue: 'gray'   },
      positive: { _hue: 'green'  },
      caution:  { _hue: 'yellow' },
      critical: { _hue: 'red'    },
      suggest:  { _hue: 'cyan'   },
    },
  },

})
