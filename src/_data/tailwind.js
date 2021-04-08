const resolve = require('tailwindcss/resolveConfig')
const tailwindConfig = require('../_css/tailwind.config.js')
const config = resolve(tailwindConfig)

// console.log(config.prefix) // global prefix, I am ignoring this, it is easy to remember your own prefix
// console.log(config.important) // I don't care about important
// console.log(config.separator) // (:) default
// console.log(config.plugins) // undefined

const {
  screens,
  // colors,
  // spacing,
  // container, this modifies defaults, it doesn't create classes
  backgroundColor,
  backgroundOpacity,
  backgroundPosition,
  backgroundSize,
  borderColor,
  borderOpacity,
  borderRadius,
  borderWidth,
  gradientColorStops,
  boxShadow,
  cursor,
  fill,
  flex,
  flexGrow,
  flexShrink,
  fontFamily,
  fontSize,
  fontWeight,
  height,
  inset,
  letterSpacing,
  lineHeight,
  listStyleType,
  margin,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  objectPosition,
  opacity,
  order,
  padding,
  stroke,
  textColor,
  textOpacity,
  width,
  zIndex,
  placeholderColor,
  placeholderOpacity,
  strokeWidth,
  gap,
  gridTemplateColumns,
  gridColumn,
  gridColumnStart,
  gridColumnEnd,
  gridTemplateRows,
  gridRow,
  gridRowStart,
  gridRowEnd,
  transformOrigin,
  scale,
  rotate,
  translate,
  skew,
  transitionProperty,
  transitionTimingFunction,
  transitionDuration,
  transitionDelay,
  space,
  divideWidth,
  divideColor,
  divideOpacity,
} = config.theme

const isEmpty = (obj) => (Object.keys(obj).length > 0 ? false : true)

// console.log(config.corePlugins) // empty {} // MAYBE in the future
// resolveCore: String -> Bool
const resolveCore = (cfg) => (plugin) => {
  if (Array.isArray(cfg)) return cfg.includes(plugin)
  else if (isEmpty(cfg)) return true
  else if (!Object.keys(cfg).includes(plugin)) return true
  else {
    return cfg[plugin]
  }
}
const resolvePlugin = resolveCore(config.corePlugins)

// TEST
// console.log(resolveCore({})('anything'))
// console.log(resolveCore([])('anything'))
// console.log(resolveCore({ float: false })('anything'))
// console.log(resolveCore({ float: false })('float'))
// console.log(resolveCore(['float'])('anything'))
// console.log(resolveCore(['float'])('float'))

// Layout
const breakpoint_names = Object.keys(screens)
const breakpoint = Object.entries(screens).map(([name, value]) => {
  return {
    [`${name}`]:
      value && value.raw ? value.raw : `@media (min-width: ${value}) { ... }`,
  }
})

const gen = (prefix, data, fn = (n, v) => v) =>
  Object.entries(data)
    .map(([name, value]) => {
      if (typeof value === 'object') {
        return Object.entries(value).map(([name2, value2]) => {
          return {
            [`.${prefix}${
              name2 == 'DEFAULT'
                ? `-${name}`
                : prefix != ''
                ? '-' + name + '-' + name2
                : name
            }`]: fn(name, value2),
          }
        })
      } else {
        return {
          [`.${name[0] === '-' ? '-' + prefix : prefix}${
            name == 'DEFAULT'
              ? ''
              : prefix != ''
              ? name[0] === '-'
                ? name
                : '-' + name
              : name
          }`]: fn(name, value),
        }
      }
    })
    .reduce((acc, val) => acc.concat(val), [])

const container_ = gen('', {
  container: `None 	width: 100%;
sm (640px) 	max-width: 640px;
md (768px) 	max-width: 768px;
lg (1024px) 	max-width: 1024px;
xl (1280px) 	max-width: 1280px;`,
})

const boxDecorationBreak_ = gen('', {
  'decoration-slice': 'box-decoration-break: slice',
  'decoration-clone': 'box-decoration-break: clone',
})

const boxsizing_ = gen('', {
  'box-border': 'box-sizing: border-box',
  'box-content': 'box-sizing: content-box',
})

const display_ = gen('', {
  block: 'display: block',
  'inline-block': 'display: inline-block',
  inline: 'display: inline',
  flex: 'display: flex',
  'inline-flex': 'display: inline-flex',
  table: 'display: table',
  'inline-table': 'display: inline-table',
  'table-caption': 'display: table-caption',
  'table-cell': 'display: table-cell',
  'table-column': 'display: table-column',
  'table-column-group': 'display: table-column-group',
  'table-footer-group': 'display: table-footer-group',
  'table-header-group': 'display: table-header-group',
  'table-row-group': 'display: table-row-group',
})

const float_ = gen('', {
  'float-right': 'float: right',
  'float-left': 'float: left',
  'float-none': 'float: none',
  'flow-root': `USE flow-root INSTEAD OF clearfix !!`,
})

const clear_ = gen('clear', {
  left: 'clear: left',
  right: 'clear: right',
  both: 'clear: both',
  none: 'clear: none',
})

const isolation_ = gen('', {
  isolate: 'isolation: isolate',
  'isolate-auto': 'isolation: auto',
})

const objectfit_ = gen('object', {
  contain: 'object-fit: contain',
  cover: 'object-fit: cover',
  fill: 'object-fit: fill',
  none: 'object-fit: none',
  'scale-down': 'object-fit: scale-down',
})

const objectposition_ = gen(
  'object',
  objectPosition,
  (n, v) => `object-position: ${v}`
)

const overflow_ = gen('overflow', {
  auto: 'overflow: auto',
  hidden: 'overflow: hidden',
  visible: 'overflow: visible',
  scroll: 'overflow: scroll',
  'x-auto': 'overflow-x: auto',
  'y-auto': 'overflow-y: auto',
  'x-hidden': 'overflow-x: hidden',
  'y-hidden': 'overflow-y: hidden',
  'x-visible': 'overflow-x: visible',
  'y-visible': 'overflow-y: visible',
  'x-scroll': 'overflow-x: scroll',
  'y-scroll': 'overflow-y: scroll',
})

const overscroll_ = gen('overscroll', {
  auto: 'overscroll-behavior: auto',
  contain: 'overscroll-behavior: contain',
  none: 'overscroll-behavior: none',
  'y-auto': 'overscroll-behavior-y: auto',
  'y-contain': 'overscroll-behavior-y: contain',
  'y-none': 'overscroll-behavior-y: none',
  'x-auto': 'overscroll-behavior-x: auto',
  'x-contain': 'overscroll-behavior-x: contain',
  'x-none': 'overscroll-behavior-x: none',
})

const position_ = gen('', {
  static: 'position: static',
  fixed: 'position: fixed',
  absolute: 'position: absolute',
  relative: 'position: relative',
  sticky: 'position: sticky',
})

const trbl_ = gen(
  'inset',
  inset,
  (n, v) => `top: ${v};
right: ${v};
bottom: ${v};
left: ${v};`
)
const trblx_ = gen(
  'inset-x',
  inset,
  (n, v) => `right: ${v};
left: ${v};`
)
const trbly_ = gen(
  'inset-y',
  inset,
  (n, v) => `top: ${v};
bottom: ${v};`
)

const trblExtra_ = gen('', {
  'top-0': 'top: 0px',
  'right-0': 'right: 0px',
  'bottom-0': 'bottom: 0px',
})

const visibility_ = gen('', {
  visible: 'visibility: visible',
  invisible: 'visibility: hidden',
})

const zindex_ = gen('z', zIndex, (n, v) => `z-index: ${v}`)

// console.log(breakpoint_names)

// Layout
// console.log(breakpoint)
//

const Layout = {
  container: {
    value: container_,
    isAllowed: resolvePlugin('container'),
    desc:
      'Sets the max-width to match the min-width of the current breakpoint.',
  },
  'box-decoration-break': {
    value: boxDecorationBreak_,
    isAllowed: resolvePlugin('boxDecorationBreak'),
    variant: config.variants.boxDecorationBreak || [],
    desc:
      'Use the decoration-slice and decoration-clone utilities to control whether properties like background, border, border-image, box-shadow, clip-page, margin, and padding should be rendered as if the element were one continuous fragment, or distinct blocks.',
  },

  'box-sizing': {
    value: boxsizing_,
    isAllowed: resolvePlugin('boxSizing'),
    variant: config.variants.boxSizing || [],
    desc: 'Sets how the total width and height of an element is calculated.',
  },
  display: {
    value: display_,
    isAllowed: resolvePlugin('display'),
    variant: config.variants.display || [],
    desc: 'Sets the display box type of an element.',
  },
  float: {
    value: float_,
    isAllowed: resolvePlugin('float'),
    variant: config.variants.float || [],
    desc:
      "Sets an element's placement to a side of its container and allows content to wrap around it.",
  },
  clear: {
    value: clear_,
    isAllowed: resolvePlugin('clear'),
    variant: config.variants.clear || [],
    desc: 'Sets whether an element is moved below preceding floated elements.',
  },
  isolation: {
    value: isolation_,
    isAllowed: resolvePlugin('isolation'),
    variant: config.variants.isolation || [],
    desc:
      'Use the isolate and isolation-auto utilities to control whether an element should explicitly create a new stacking context.',
  },
  'object-fit': {
    value: objectfit_,
    isAllowed: resolvePlugin('objectFit'),
    variant: config.variants.objectFit || [],
    desc:
      'Sets how the content of a replaced element (img or video tag) should be resized.',
  },
  'object-position': {
    value: objectposition_,
    isAllowed: resolvePlugin('objectPosition'),
    variant: config.variants.objectPosition || [],
    desc: 'Sets the alignment of the selected replaced element.',
  },
  overflow: {
    value: overflow_,
    isAllowed: resolvePlugin('overflow'),
    variant: config.variants.overflow || [],
    desc: "Sets how to handle content that's too big for its container.",
  },
  overscroll: {
    value: overscroll_,
    isAllowed: resolvePlugin('overscrollBehavior'),
    variant: config.variants.overscrollBehavior || [],
    desc: "Sets how to handle content that's too big for its container.",
  },

  position: {
    value: position_,
    isAllowed: resolvePlugin('position'),
    variant: config.variants.position || [],
    desc: "Sets an element's position.",
  },
  'top,right,bottom,left': {
    value: [...trbl_, ...trblx_, ...trbly_, ...trblExtra_],
    isAllowed: true,
    desc: 'Sets the placement of a positioned element.',
  },
  visibility: {
    value: visibility_,
    isAllowed: resolvePlugin('visibility'),
    variant: config.variants.visibility || [],
    desc: 'Show or hide without affecting the layout of the document.',
  },
  'z-index': {
    value: zindex_,
    isAllowed: resolvePlugin('zIndex'),
    variant: config.variants.zIndex || [],

    tip: '.z-{index}',
    desc: `Sets the z-order ("stack order") of a positioned element.`,
  },
}

// Flexbox

const displayflex_ = gen('', {
  flex: 'display: flex',
  'inline-flex': 'display: inline-flex',
})

const flexdirection_ = gen('flex', {
  row: 'flex-direction: row',
  'row-reverse': 'flex-direction: row-reverse',
  col: 'flex-direction: column',
  'col-reverse': 'flex-direction: column-reverse',
})

const flexwrap_ = gen('flex', {
  'no-wrap': 'flex-wrap: nowrap',
  wrap: 'flex-wrap: wrap',
  'wrap-reverse': 'flex-wrap: wrap-reverse',
})

const alignitems_ = gen('items', {
  start: 'align-items: flex-start',
  end: 'align-items: flex-end',
  center: 'align-items: center',
  baseline: 'align-items: baseline',
  stretch: 'align-items: stretch',
})

const aligncontent_ = gen('content', {
  center: 'align-content: center',
  start: 'align-content: flex-start',
  end: 'align-content: flex-end',
  between: 'align-content: space-between',
  around: 'align-content: space-around',
  evenly: 'align-content: space-evenly',
})

const alignself_ = gen('self', {
  auto: 'align-self: auto',
  start: 'align-self: flex-start',
  end: 'align-self: flex-end',
  center: 'align-self: center',
  stretch: 'align-self: stretch',
})

const justifycontent_ = gen('justify', {
  start: 'justify-content: flex-start',
  end: 'justify-content: flex-end',
  center: 'justify-content: center',
  between: 'justify-content: space-between',
  around: 'justify-content: space-around',
  evenly: 'justify-content: space-evenly',
})

const justifyitems_ = gen('justify-items', {
  start: 'justify-items: start',
  end: 'justify-items: end',
  center: 'justify-items: center',
  stretch: 'justify-items: stretch',
})

const justifyself_ = gen('justify-self', {
  auto: 'justify-self: auto',
  start: 'justify-self: start',
  end: 'justify-self: end',
  center: 'justify-self: center',
  stretch: 'justify-self: stretch',
})

const placecontent_ = gen('place-content', {
  center: 'place-content: center',
  start: 'place-content: start',
  end: 'place-content: end',
  between: 'place-content: space-between',
  around: 'place-content: space-around',
  evenly: 'place-content: space-evenly',
  stretch: 'place-content: stretch',
})

const placeitems_ = gen('place-items', {
  start: 'place-items: start',
  end: 'place-items: end',
  center: 'place-items: center',
  stretch: 'place-items: stretch',
})

const placeself_ = gen('place-self', {
  auto: 'place-self: auto',
  start: 'place-self: start',
  end: 'place-self: end',
  center: 'place-self: center',
  stretch: 'place-self: stretch',
})

const flex_ = gen('flex', flex, (n, v) => `flex: ${v}`)

const flexgrow_ = gen('flex-grow', flexGrow, (n, v) => `flex-grow: ${v}`)

const flexshrink_ = gen(
  'flex-shrink',
  flexShrink,
  (n, v) => `flex-shrink: ${v}`
)

const order_ = gen('order', order, (n, v) => `order: ${v}`)

// Flexbox
const Flexbox = {
  display: {
    value: displayflex_,
    isAllowed: resolvePlugin('display'),
    variant: config.variants.display || [],
    desc: 'Sets element to be a flex container.',
  },
  'flex-direction': {
    value: flexdirection_,
    isAllowed: resolvePlugin('flexDirection'),
    variant: config.variants.flexDirection || [],
    desc: 'Sets direction of flex items.',
  },
  'flex-wrap': {
    value: flexwrap_,
    isAllowed: resolvePlugin('flexWrap'),
    variant: config.variants.flexWrap || [],
    desc: 'Creates how flex items wrap.',
  },
  'align-items': {
    value: alignitems_,
    isAllowed: resolvePlugin('alignItems'),
    variant: config.variants.alignItems || [],
    desc: "Sets flex items position along a contrainer's cross axis.",
  },
  'align-content': {
    value: aligncontent_,
    isAllowed: resolvePlugin('alignContent'),
    variant: config.variants.alignContent || [],
    desc: 'Controls how lines are positioned in multi-line flex containers.',
  },
  'align-self': {
    value: alignself_,
    isAllowed: resolvePlugin('alignSelf'),
    variant: config.variants.alignSelf || [],
    desc:
      "Controls how an individual flex item is positioned along container's cross axis.",
  },
  'justify-content': {
    value: justifycontent_,
    isAllowed: resolvePlugin('justifyContent'),
    variant: config.variants.justifyContent || [],
    desc: "Controls how flex items are positioned along container's main axis.",
  },
  'justify-items': {
    value: justifyitems_,
    isAllowed: resolvePlugin('justifyItems'),
    variant: config.variants.justifyItems || [],
    desc:
      'Use justify-items-start to justify grid items against the start of their inline axis',
  },
  'justify-self': {
    value: justifyself_,
    isAllowed: resolvePlugin('justifySelf'),
    variant: config.variants.justifySelf || [],
    desc:
      "Use justify-self-auto to align an item based on the value of the grid's justify-items property",
  },

  'place-content': {
    value: placecontent_,
    isAllowed: resolvePlugin('placeContent'),
    variant: config.variants.placeContent || [],
    desc:
      'Utilities for controlling how content is justified and aligned at the same time',
  },
  'place-items': {
    value: placeitems_,
    isAllowed: resolvePlugin('placeItems'),
    variant: config.variants.placeItems || [],
    desc:
      'Utilities for controlling how items are justified and aligned at the same time.',
  },
  'place-self': {
    value: placeself_,
    isAllowed: resolvePlugin('placeSelf'),
    variant: config.variants.placeSelf || [],
    desc:
      'Utilities for controlling how an individual item is justified and aligned at the same time.',
  },
  flex: {
    value: flex_,
    isAllowed: resolvePlugin('flex'),
    variant: config.variants.flex || [],
    desc: 'Controls how flex items grow and shrink.',
  },
  'flex-grow': {
    value: flexgrow_,
    isAllowed: resolvePlugin('flexGrow'),
    variant: config.variants.flexGrow || [],
    desc: 'Controls how flex items grow.',
  },
  'flex-shrink': {
    value: flexshrink_,
    isAllowed: resolvePlugin('flexShrink'),
    variant: config.variants.flexShrink || [],
    desc: 'Controls how flex items shrink.',
  },
  order: {
    value: order_,
    isAllowed: resolvePlugin('order'),
    variant: config.variants.order || [],
    desc: 'Controls how flex items are ordered.',
  },
}

// Grid
const gridtemplatecolumn_ = gen(
  'grid-cols',
  gridTemplateColumns,
  (n, v) => `grid-template-columns: ${v}`
)

const gridcolumn_ = gen('col', gridColumn, (n, v) => `grid-column: ${v}`)

const gridcolumnstart_ = gen(
  'col-start',
  gridColumnStart,
  (n, v) => `grid-column-start: ${v}`
)
const gridcolumnend_ = gen(
  'col-end',
  gridColumnEnd,
  (n, v) => `grid-column-end: ${v}`
)

const gridtemplate_ = gen(
  'grid-rows',
  gridTemplateRows,
  (n, v) => `grid-template-rows: ${v}`
)

const gridrow_ = gen('row', gridRow, (n, v) => `grid-row: ${v}`)

const gridrowstart_ = gen(
  'row-start',
  gridRowStart,
  (n, v) => `grid-row-start: ${v}`
)
const gridrowend_ = gen('row-end', gridRowEnd, (n, v) => `grid-row-end: ${v}`)

const gap_ = gen('gap', gap, (n, v) => `gap: ${v}`)

const gridflow_ = gen('grid-flow', {
  row: 'grid-auto-flow: row',
  col: 'grid-auto-flow: column',
  'row-dense': 'grid-auto-flow: row dense',
  'col-dense': 'grid-auto-flow: column dense',
})

const gridautocolumn_ = gen('auto-cols', {
  auto: 'grid-auto-columns: auto',
  min: 'grid-auto-columns: min-content',
  max: 'grid-auto-columns: max-content',
  fr: 'grid-auto-columns: minmax(0, 1fr)',
})

const gridautorow_ = gen('auto-rows', {
  auto: 'grid-auto-rows: auto',
  min: 'grid-auto-rows: min-content',
  max: 'grid-auto-rows: max-content',
  fr: 'grid-auto-rows: minmax(0, 1fr)',
})

// Grid
//
// console.log(gridtemplatecolumn_)
// console.log(gridcolumn_)
// console.log(gridcolumnstart_)
// console.log(gridcolumnend_)
// console.log(gridtemplate_)
// console.log(gridrow_)
// console.log(gap_)
// console.log(gridflow_)

const Grid = {
  'grid-tempate-columns': {
    value: gridtemplatecolumn_,
    isAllowed: resolvePlugin('gridTemplateColumns'),
    variant: config.variants.gridTemplateColumns || [],
    desc: 'Defines columns for grid layout.',
  },
  'grid-column, start/end': {
    value: [
      ...(resolvePlugin('gridColumn') ? gridcolumn_ : []),
      ...(resolvePlugin('gridColumnStart') ? gridcolumnstart_ : []),
      ...(resolvePlugin('gridColumnEnd') ? gridcolumnend_ : []),
    ],
    isAllowed: [
      resolvePlugin('gridColumn'),
      resolvePlugin('gridColumnStart'),
      resolvePlugin('gridColumnEnd'),
    ].some((it) => !!it),
    desc: 'Sets a grid item size and location within the grid column.',
  },
  'grid-temptale-rows': {
    value: gridtemplate_,
    isAllowed: resolvePlugin('gridTemplateRows'),
    variant: config.variants.gridTemplateRows || [],
    desc: 'Defines rows for grid layout.',
  },
  'grid-row, start/end': {
    value: [
      ...(resolvePlugin('gridRow') ? gridrow_ : []),
      ...(resolvePlugin('gridRowStart') ? gridrowstart_ : []),
      ...(resolvePlugin('gridRowEnd') ? gridrowend_ : []),
    ],
    isAllowed: [
      resolvePlugin('gridRow'),
      resolvePlugin('gridRowStart'),
      resolvePlugin('gridRowEnd'),
    ].some((it) => !!it),
    desc: 'Sets a grid item size and location within the grid row.',
  },
  gap: {
    value: gap_,
    isAllowed: resolvePlugin('gap'),
    variant: config.variants.gap || [],
    desc: 'Sets the gaps (gutters) between rows and columns.',
  },
  'grid-auto-flow': {
    value: gridflow_,
    isAllowed: resolvePlugin('gridAutoFlow'),
    variant: config.variants.gridAutoFlow || [],
    desc: 'Controls the auto placement of grid elements.',
  },
  'grid-auto-columns': {
    value: gridautocolumn_,
    isAllowed: resolvePlugin('gridAutoColumns'),
    variant: config.variants.gridAutoColumns || [],
    desc:
      'Use the auto-cols-{size} utilities to control the size implicitly-created grid columns.',
  },
  'grid-auto-rows': {
    value: gridautorow_,
    isAllowed: resolvePlugin('gridAutoRows'),
    variant: config.variants.gridAutoRows || [],
    desc:
      'Use the auto-rows-{size} utilities to control the size implicitly-created grid rows.',
  },
}

//Spacing

const padding_ = gen('p', padding, (n, v) => `padding: ${v}`)
const paddingx_ = gen(
  'px',
  padding,
  (n, v) => `padding-right: ${v};
padding-left: ${v};`
)
const paddingy_ = gen(
  'py',
  padding,
  (n, v) => `padding-top: ${v};
padding-bottom: ${v};`
)
const paddingr_ = gen('pr', padding, (n, v) => `padding-right: ${v}`)
const paddingl_ = gen('pl', padding, (n, v) => `padding-left: ${v}`)
const paddingt_ = gen('pt', padding, (n, v) => `padding-top: ${v}`)
const paddingb_ = gen('pb', padding, (n, v) => `padding-bottom: ${v}`)

const margin_ = gen('m', margin, (n, v) => `margin: ${v}`)
const marginx_ = gen(
  'mx',
  margin,
  (n, v) => `margin-right: ${v};
margin-left: ${v};`
)
const marginy_ = gen(
  'my',
  margin,
  (n, v) => `padding-top: ${v};
margin-bottom: ${v};`
)
const marginr_ = gen('mr', margin, (n, v) => `margin-right: ${v}`)
const marginl_ = gen('ml', margin, (n, v) => `margin-left: ${v}`)
const margint_ = gen('mt', margin, (n, v) => `margin-top: ${v}`)
const marginb_ = gen('mb', margin, (n, v) => `margin-bottom: ${v}`)
// const marginrminus_ = gen('mr', margin, (n, v) => `margin-right: ${v}`)
// const marginlminus_ = gen('ml', margin, (n, v) => `margin-left: ${v}`)
// const margintminus_ = gen('mt', margin, (n, v) => `margin-top: ${v}`)
// const marginbminus_ = gen('mb', margin, (n, v) => `margin-bottom: ${v}`)

const spacex_ = gen('space-x', space, (n, v) => `margin-left: ${v}`)
const spacey_ = gen('space-y', space, (n, v) => `margin-top: ${v}`)
const spacereverse_ = gen('space', {
  'x-reverse': '--space-x-reverse: 1',
  'y-reverse': '--space-y-reverse: 1',
})

// Spacing
const Spacing = {
  padding: {
    value: [
      ...padding_,
      ...paddingx_,
      ...paddingy_,
      ...paddingr_,
      ...paddingl_,
      ...paddingt_,
      ...paddingb_,
    ],
    isAllowed: resolvePlugin('padding'),
    variant: config.variants.padding || [],

    tip: '.p{side?}-{size}',
    desc: 'Controls padding in 0.25rem increments.',
  },
  margin: {
    value: [
      ...margin_,
      ...marginx_,
      ...marginy_,
      ...marginr_,
      ...marginl_,
      ...margint_,
      ...marginb_,
      // ...marginrminus_,
      // ...marginlminus_,
      // ...margintminus_,
      // ...marginbminus_,
    ],
    isAllowed: resolvePlugin('margin'),
    variant: config.variants.margin || [],
    tip: '.m{side?}-{size}',
    desc: 'Controls margin (and negative margin) in 0.25rem increments.',
  },
  space: {
    value: [...spacex_, ...spacey_, ...spacereverse_],
    isAllowed: resolvePlugin('space'),
    variant: config.variants.space || [],
    tip: '.space-{x|y}-{size}',
    desc: 'Controls spacing between components.',
  },
}

// Sizing
const width_ = gen('w', width, (n, v) => `width: ${v}`)
const minwidth_ = gen('min-w', minWidth, (n, v) => `min-width: ${v}`)
const maxwidth_ = gen('max-w', maxWidth, (n, v) => `max-width: ${v}`)
const height_ = gen('h', height, (n, v) => `height: ${v}`)
const minheight_ = gen('min-h', minHeight, (n, v) => `min-height: ${v}`)
const maxheight_ = gen('max-h', maxHeight, (n, v) => `max-height: ${v}`)

const Sizing = {
  width: {
    value: width_,
    isAllowed: resolvePlugin('width'),
    variant: config.variants.width || [],
    tip: '.w-{size}',
    desc: 'Sets width of an element.',
  },
  'min-width': {
    value: minwidth_,
    isAllowed: resolvePlugin('minWidth'),
    variant: config.variants.minWidth || [],
    tip: '.min-w-{size}',
    desc: 'Sets the minimum width of an element.',
  },
  'max-width': {
    value: maxwidth_,
    isAllowed: resolvePlugin('maxWidth'),
    variant: config.variants.maxWidth || [],
    tip: '.max-w-{size}',
    desc: 'Sets the maxiumum width of an element.',
  },
  height: {
    value: height_,
    isAllowed: resolvePlugin('height'),
    variant: config.variants.height || [],
    tip: '.h-{size}',
    desc: `Sets height of an element.`,
  },

  'min-height': {
    value: minheight_,
    isAllowed: resolvePlugin('minHeight'),
    variant: config.variants.minHeight || [],
    tip: '.min-h-{size}',
    desc: `Sets the minimum height of an element.`,
  },
  'max-height': {
    value: maxheight_,
    isAllowed: resolvePlugin('maxHeight'),
    variant: config.variants.maxHeight || [],
    tip: '.max-h-{size}',
    desc: `Sets the maxiumum height of an element.`,
  },
}

// TYPOGRAPHY

const color_ = gen('text', textColor, (n, v) => `color: ${v}`)
const fontfamily_ = Object.entries(fontFamily).map(([name, value]) => {
  return {
    [`font-${name}`]: `font-family: ${value.join(', ')}`,
  }
})
const fontsize_ = gen('text', fontSize, (n, v) => `font-size: ${v}`)

const fontsmoothing_ = gen('', {
  antialiased: `-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;`,
  'subpixel-antialiased': `-webkit-font-smoothing: auto;
-moz-osx-font-smoothing: auto;`,
})

const fontstyle_ = gen('', {
  italic: 'font-style: italic',
  'not-italic': 'font-style: normal',
})

const fontweight_ = gen('font', fontWeight, (n, v) => `font-weight: ${v}`)

const fontvariantnumeric_ = gen(
  '',
  {
    'normal-nums': 'normal',
    ordinal: 'ordinal',
    'slashed-zero': 'slashed-zero',
    'lining-nums': 'lining-nums',
    'oldstyle-nums': 'oldstyle-nums',
    'proportional-nums': 'proportional-nums',
    'tabular-nums': 'tabular-nums',
    'diagonal-fractions': 'diagonal-fractions',
    'stacked-fractions': 'stacked-fractions',
  },
  (n, v) => `font-size: ${v}`
)

const letterspacing_ = gen(
  'tracking',
  letterSpacing,
  (n, v) => `letter-spacing: ${v}`
)

const lineheight_ = gen('leading', lineHeight, (n, v) => `line-height: ${v}`)

const liststyletype_ = gen(
  'list',
  listStyleType,
  (n, v) => `list-style-type: ${v}`
)

const liststyleposition_ = gen('list', {
  inside: 'list-style-position: inside',
  outside: 'list-style-position: outside',
})

const placeholdercolor_ = gen(
  'placeholder',
  placeholderColor,
  (n, v) => `color: ${v}`
)

const placeholderopacity_ = gen(
  'placeholder-opacity',
  placeholderOpacity,
  (n, v) => `--tw-placeholder-opacity: ${v}`
)

const textalign_ = gen(
  'text',
  { left: 'left', center: 'center', right: 'right', justify: 'jutify' },
  (n, v) => `text-align: ${v}`
)

const textopacity_ = gen(
  'text-opacity',
  textOpacity,
  (n, v) => `--tw-text-opacity: ${v}`
)

const textdecoration_ = gen(
  '',
  {
    underline: 'underline',
    'line-through': 'line-through',
    'no-underline': 'none',
  },
  (n, v) => `text-decoration: ${v}`
)

const texttransformation_ = gen(
  '',
  {
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
    'normal-case': 'none',
  },
  (n, v) => `text-transform: ${v}`
)

const textoverflow_ = gen('', {
  truncate: `overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;`,
  'overflow-ellipsis': 'text-overflow: ellipsis',
  'overflow-clip': 'text-overflow: clip',
})

const verticalalign_ = gen(
  'align',
  {
    baseline: 'baseline',
    top: 'top',
    middle: 'middle',
    bottom: 'bottom',
    'text-top': 'text-top',
    'text-bottom': 'text-bottom',
  },
  (n, v) => `vertical-align: ${v}`
)

const whitespace_ = gen(
  'whitespace',
  {
    normal: 'normal',
    'no-wrap': 'no-wrap',
    pre: 'pre',
    'pre-line': 'pre-line',
    'pre-wrap': 'pre-wrap',
  },
  (n, v) => `white-space: ${v}`
)

const wordbreak_ = gen('', {
  'break-normal': `overflow-wrap: normal;
word-break: normal;`,
  'break-words': 'overflow-wrap: break-word;',
  'break-all': 'word-break: break-all;',
})

const Typography = {
  color: {
    value: color_,
    isAllowed: resolvePlugin('color'),
    variant: config.variants.color || [],
    tip: '.text-{color}',
    desc: `Sets the text color.`,
  },
  'font-family': {
    value: fontfamily_,
    isAllowed: resolvePlugin('fontFamily'),
    variant: config.variants.fontFamily || [],
    desc: 'Sets the font family.',
  },
  'font-size': {
    value: fontsize_,
    isAllowed: resolvePlugin('fontSize'),
    variant: config.variants.fontSize || [],
    tip: '.text-{size}',
    desc: `Sets the font size.`,
  },
  'font-smoothing': {
    value: fontsmoothing_,
    isAllowed: resolvePlugin('fontSmoothing'),
    variant: config.variants.fontSmoothing || [],
    desc: 'Sets the smoothing for font',
  },
  'font-style': {
    value: fontstyle_,
    isAllowed: resolvePlugin('fontStyle'),
    variant: config.variants.fontStyle || [],
    desc: 'Sets style of the font',
  },
  'font-weight': {
    value: fontweight_,
    isAllowed: resolvePlugin('fontWeight'),
    variant: config.variants.fontWeight || [],
    tip: '.font-{weight}',
    desc: `Sets the font weight.`,
  },
  'font-variant-numeric': {
    value: fontvariantnumeric_,
    isAllowed: resolvePlugin('fontVariantNumeric'),
    variant: config.variants.fontVariantNumeric || [],
    desc: `Utilities for controlling the variant of numbers.`,
  },
  'letter-spacing': {
    value: letterspacing_,
    isAllowed: resolvePlugin('letterSpacing'),
    variant: config.variants.letterSpacing || [],
    tip: '.tracking-{size}',
    desc: `Sets the spacing between letters.`,
  },
  'line-height': {
    value: lineheight_,
    isAllowed: resolvePlugin('lineHeight'),
    variant: config.variants.lineHeight || [],
    tip: '.leading-{size}',
    desc: `Sets the line height.`,
  },
  'list-style-type': {
    value: liststyletype_,
    isAllowed: resolvePlugin('listStyleType'),
    variant: config.variants.listStyleType || [],
    desc: 'Sets the bullet style of a list.',
  },
  'list-style-position': {
    value: liststyleposition_,
    isAllowed: resolvePlugin('listStylePosition'),
    variant: config.variants.listStylePosition || [],
    desc: "Sets the position of a list's bullets.",
  },
  '::placeholder color': {
    value: placeholdercolor_,
    isAllowed: resolvePlugin('placeholderColor'),
    variant: config.variants.placeholderColor || [],
    desc: 'Sets the placeholder color using the ::placeholder pseudo element.',
  },
  'placeholder-opacity': {
    value: placeholderopacity_,
    isAllowed: resolvePlugin('placeholderOpacity'),
    variant: config.variants.placeholderOpacity || [],
    tip: '.placeholder-opacity-{opacity}',
    desc:
      'Utilities for controlling the opacity of an element`s placeholder color.',
  },
  'text-align': {
    value: textalign_,
    isAllowed: resolvePlugin('textAlign'),
    variant: config.variants.textAlign || [],
    desc: 'Sets the alignment of text.',
  },
  'text-opacity': {
    value: textopacity_,
    isAllowed: resolvePlugin('textOpacity'),
    variant: config.variants.textOpacity || [],
    desc: 'Utilities for controlling teh opacity of an elements text color',
  },
  'text-decoration': {
    value: textdecoration_,
    isAllowed: resolvePlugin('textDecoration'),
    variant: config.variants.textDecoration || [],
    desc: 'Sets the decoration of the text.',
  },
  'text-transform': {
    value: texttransformation_,
    isAllowed: resolvePlugin('textTransform'),
    variant: config.variants.textTransform || [],
    desc: 'Sets the transform attributes of the text.',
  },
  'text-overflow': {
    value: textoverflow_,
    isAllowed: resolvePlugin('textOverflow'),
    variant: config.variants.textOverflow || [],
    desc: 'Utilities for controlling text overflow in an element.',
  },
  'vertical-align': {
    value: verticalalign_,
    isAllowed: resolvePlugin('verticalAlign'),
    variant: config.variants.verticalAlign || [],
    desc: 'Sets the vertical alignment of an inline or table-cell box.',
  },
  'white-space': {
    value: whitespace_,
    isAllowed: resolvePlugin('whiteSpace'),
    variant: config.variants.whiteSpace || [],
    desc: 'Sets the whitespace of an element.',
  },
  'word-break': {
    value: wordbreak_,
    isAllowed: resolvePlugin('wordBreak'),
    variant: config.variants.wordBreak || [],
    desc: 'Sets the word breaks of an element.',
  },
}

// Backgrounds

const backattachment_ = gen(
  'bg',
  { fixed: 'fixed', local: 'local', scroll: 'scroll' },
  (n, v) => `background-attachment: ${v}`
)

const backclip_ = gen(
  'bg-clip',
  {
    border: 'border-box',
    padding: 'padding-box',
    content: 'content-box',
    text: 'text',
  },
  (n, v) => `background-clip: ${v}`
)

const backcolor_ = gen(
  'bg',
  backgroundColor,
  (n, v) => `background-color: ${v}`
)

const backopacity_ = gen(
  'bg-opacity',
  backgroundOpacity,
  (n, v) => `--tw-bg-opacity: ${v}`
)

const backposition_ = gen(
  'bg',
  backgroundPosition,
  (n, v) => `background-position: ${v}`
)

const backrepeat_ = gen(
  'bg',
  {
    repeat: 'repeat',
    'no-repeat': 'no-repeat',
    'repeat-x': 'repeat-x',
    'repeat-y': 'repeat-y',
    'repeat-round': 'repeat-round',
    'repeat-space': 'repeat-space',
  },
  (n, v) => `background-repeat: ${v}`
)

const backsize_ = gen('bg', backgroundSize, (n, v) => `background-size: ${v}`)

const backimage_ = gen(
  'bg',
  {
    none: 'none',
    'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
    'gradient-to-tr':
      'background-image: linear-gradient(to top right, var(--tw-gradient-stops))',
    'gradient-to-r':
      'background-image: linear-gradient(to right, var(--tw-gradient-stops))',
    'gradient-to-br':
      'background-image: linear-gradient(to bottom right, var(--tw-gradient-stops))',
    'gradient-to-b':
      'background-image: linear-gradient(to bottom, var(--tw-gradient-stops))',
    'gradient-to-bl':
      'background-image: linear-gradient(to bottom left, var(--tw-gradient-stops))',
    'gradient-to-l':
      'background-image: linear-gradient(to left, var(--tw-gradient-stops))',
    'gradient-to-tl':
      'background-image: linear-gradient(to top left, var(--tw-gradient-stops))',
  },
  (n, v) => `background-image: ${v}`
)

const backgradientcolor_ = gen(
  'from',
  gradientColorStops,
  (n, v) => `--tw-gradient-from: ${v}`
)

const Backgrounds = {
  'background-attachment': {
    value: backattachment_,
    isAllowed: resolvePlugin('backgroundAttachment'),
    variant: config.variants.backgroundAttachment || [],
    desc: 'Sets behavior of background images when scrolling.',
  },
  'background-clip': {
    value: backclip_,
    isAllowed: resolvePlugin('backgroundClip'),
    variant: config.variants.backgroundClip || [],
    desc:
      "Utilities for controlling the bounding box of an element's background.",
  },
  'background-color': {
    value: backcolor_,
    isAllowed: resolvePlugin('backgroundColor'),
    variant: config.variants.backgroundColor || [],
    tip: '.bg-{color}',
    desc: `Sets background color.`,
  },
  'background-opacity': {
    value: backopacity_,
    isAllowed: resolvePlugin('backgroundOpacity'),
    variant: config.variants.backgroundOpacity || [],
    tip: '.bg-opacity-{opacity}',
    desc: `Sets background opacity.`,
  },
  'background-position': {
    value: backposition_,
    isAllowed: resolvePlugin('backgroundPosition'),
    variant: config.variants.backgroundPosition || [],
    desc: 'Sets position of a background image.',
  },
  'background-repeat': {
    value: backrepeat_,
    isAllowed: resolvePlugin('backgroundRepeat'),
    variant: config.variants.backgroundRepeat || [],
    desc: 'Sets repetition of a background image.',
  },
  'background-size': {
    value: backsize_,
    isAllowed: resolvePlugin('backgroundSize'),
    variant: config.variants.backgroundSize || [],
    tip: '.bg-{size}',
    desc: `Sets background size of a background image.`,
  },
  'background-image': {
    value: backimage_,
    isAllowed: resolvePlugin('backgroundImage'),
    variant: config.variants.backgroundImage || [],
    desc: `Utilities for controlling an element's background image.`,
  },
  'background-gradient-color': {
    value: backgradientcolor_,
    isAllowed: resolvePlugin('gradientColorStops'),
    variant: config.variants.gradientColorStops || [],
    desc: `Utilities for controlling the color stops in background gradients`,
  },
}

// Borders
const bordercolor_ = gen('border', borderColor, (n, v) => `border-color: ${v}`)

const borderopacity_ = gen(
  'border-opacity',
  borderOpacity,
  (n, v) => `--tw-border-opacity: ${v}`
)

const borderstyle_ = gen(
  'border',
  {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
    double: 'double',
    none: 'none',
  },
  (n, v) => `border-style: ${v}`
)

const borderwidth_ = gen('border', borderWidth, (n, v) => `border-width: ${v}`)
const borderwidtht_ = gen(
  'border-t',
  borderWidth,
  (n, v) => `border-top-width: ${v}`
)
const borderwidthb_ = gen(
  'border-b',
  borderWidth,
  (n, v) => `border-bottom-width: ${v}`
)
const borderwidthl_ = gen(
  'border-l',
  borderWidth,
  (n, v) => `border-left-width: ${v}`
)
const borderwidthr_ = gen(
  'border-r',
  borderWidth,
  (n, v) => `border-right-width: ${v}`
)

const borderradius_ = gen(
  'rounded',
  borderRadius,
  (n, v) => `border-radius: ${v}`
)

const borderradiust_ = gen(
  'rounded-t',
  borderRadius,
  (n, v) => `border-top-radius: ${v}`
)

const borderradiusb_ = gen(
  'rounded-b',
  borderRadius,
  (n, v) => `border-bottom-radius: ${v}`
)

const borderradiusr_ = gen(
  'rounded-r',
  borderRadius,
  (n, v) => `border-right-radius: ${v}`
)

const borderradiusl_ = gen(
  'rounded-l',
  borderRadius,
  (n, v) => `border-left-radius: ${v}`
)

const borderradiustr_ = gen(
  'rounded-tr',
  borderRadius,
  (n, v) => `border-top-right-radius: ${v}`
)

const borderradiustl_ = gen(
  'rounded-tl',
  borderRadius,
  (n, v) => `border-top-left-radius: ${v}`
)

const borderradiusbr_ = gen(
  'rounded-br',
  borderRadius,
  (n, v) => `border-bottom-right-radius: ${v}`
)

const borderradiusbl_ = gen(
  'rounded-bl',
  borderRadius,
  (n, v) => `border-bottom-left-radius: ${v}`
)

const dividex_ = gen(
  'divide-x',
  divideWidth,
  (n, v) => `border-left-width: ${v}`
)
const dividey_ = gen(
  'divide-y',
  divideWidth,
  (n, v) => `border-top-width: ${v}`
)

const dividereverse_ = gen('divide', {
  'x-reverse': '--divide-x-reverse: 1',
  'y-reverse': '--divide-y-reverse: 1',
})

const dividecolor_ = gen('divide', divideColor, (n, v) => `border-color: ${v}`)

const divideopacity_ = gen(
  'divide-opacity',
  divideOpacity,
  (n, v) => `--tw-divide-opacity: ${v}`
)

const dividestyle_ = gen(
  'divide',
  {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
    double: 'double',
    none: 'none',
  },
  (n, v) => `border-style: ${v}`
)

const Borders = {
  'border-color': {
    value: bordercolor_,
    isAllowed: resolvePlugin('borderColor'),
    variant: config.variants.borderColor || [],
    tip: '.border-{color}',
    desc: `Sets color for borders.`,
  },
  'border-style': {
    value: borderstyle_,
    isAllowed: resolvePlugin('borderStyle'),
    variant: config.variants.borderStyle || [],
    desc: 'Sets style for borders.',
  },
  'border-width': {
    value: [
      ...borderwidth_,
      ...borderwidtht_,
      ...borderwidthb_,
      ...borderwidthr_,
      ...borderwidthl_,
    ],
    isAllowed: resolvePlugin('borderWidth'),
    variant: config.variants.borderWidth || [],
    tip: '.border{-side?}{-width?}',
    desc: `Sets width for borders in increments of 1px.`,
  },
  'border-radius': {
    value: [
      ...borderradius_,
      ...borderradiust_,
      ...borderradiusb_,
      ...borderradiusr_,
      ...borderradiusl_,
      ...borderradiustr_,
      ...borderradiustl_,
      ...borderradiusbr_,
      ...borderradiusbl_,
    ],
    isAllowed: resolvePlugin('borderRadius'),
    variant: config.variants.borderRadius || [],
    tip: '.rounded{-side?}{-size?}',
    desc: `Sets border radius.`,
  },
  'border-opacity': {
    value: borderopacity_,
    isAllowed: resolvePlugin('borderOpacity'),
    variant: config.variants.borderOpacity || [],
    tip: '.border-opacity-{opacity}',
    desc: `Sets opacity of borders.`,
  },
  'divide-width': {
    value: [...dividex_, ...dividey_, ...dividereverse_],
    isAllowed: resolvePlugin('divideWidth'),
    variant: config.variants.divideWidth || [],
    tip: '.divide-{x|y}{-size?}',
    desc: `Sets divide with.`,
  },
  'divide-color': {
    value: dividecolor_,
    isAllowed: resolvePlugin('divideColor'),
    variant: config.variants.divideColor || [],
    tip: '.divide-{color}',
    desc: `Sets divide color.`,
  },
  'divide-opacity': {
    value: divideopacity_,
    isAllowed: resolvePlugin('divideOpacity'),
    variant: config.variants.divideOpacity || [],
    tip: '.divide-opacity-{opacity}',
    desc: `Sets divide opacity.`,
  },
  'divide-style': {
    value: dividestyle_,
    isAllowed: resolvePlugin('divideStyle'),
    variant: config.variants.divideStyle || [],
    tip: '.divide-{style}',
    desc: `Sets divide style.`,
  },
}

// Tables

const bordercollapse_ = gen(
  'border',
  {
    collapse: 'collapse',
    separate: 'separate',
  },
  (n, v) => `border-collapse: ${v}`
)

const tablelayout_ = gen(
  'table',
  {
    auto: 'auto',
    fixed: 'fixed',
  },
  (n, v) => `table-layout: ${v}`
)

// Tables
const Tables = {
  'border-collapse': {
    value: bordercollapse_,
    isAllowed: resolvePlugin('borderCollapse'),
    variant: config.variants.borderCollapse || [],
    desc: 'Collapse or separate table borders.',
  },
  'table-layout': {
    value: tablelayout_,
    isAllowed: resolvePlugin('tableLayout'),
    variant: config.variants.tableLayout || [],
    desc:
      'Defines the algorithm used to lay out table cells, rows, and columns.',
  },
}

// Transitions

const transitionproperty_ = gen(
  'transition',
  transitionProperty,
  (n, v) => `transition-property: ${v}`
)

const transitionduration_ = gen(
  'duration',
  transitionDuration,
  (n, v) => `transition-duration: ${v}`
)

const transitiondelay_ = gen(
  'delay',
  transitionDelay,
  (n, v) => `transition-delay: ${v}`
)

const transitiontimingfunction_ = gen(
  'ease',
  transitionTimingFunction,
  (n, v) => `transition-timing-function: ${v}`
)

const Transitions = {
  'transition-property': {
    value: transitionproperty_,
    isAllowed: resolvePlugin('transitionProperty'),
    variant: config.variants.transitionProperty || [],
    desc: 'Sets the CSS properties affected by transition animations.',
  },
  'transition-duration': {
    value: transitionduration_,
    isAllowed: resolvePlugin('transitionDuration'),
    variant: config.variants.transitionDuration || [],
    desc: 'Sets the length of time for a transition animations to complete.',
  },
  'transition-delay': {
    value: transitiondelay_,
    isAllowed: resolvePlugin('transitionDelay'),
    variant: config.variants.transitionDelay || [],
    desc: 'Sets the length of time for a transition delay.',
  },
  'transition-timing-function': {
    value: transitiontimingfunction_,
    isAllowed: resolvePlugin('transitionTimingFunction'),
    variant: config.variants.transitionTimingFunction || [],
    desc: 'Sets the easing function of transition animations.',
  },
}

const scale_ = gen(
  'scale',
  scale,
  (n, v) => `--transform-scale-x: ${v};
--transform-scale-y: ${v}`
)

const scalex_ = gen('scale-x', scale, (n, v) => `--transform-scale-x: ${v}`)

const scaley_ = gen('scale-y', scale, (n, v) => `--transform-scale-y: ${v}`)

const rotate_ = gen('rotate', rotate, (n, v) => `--transform-rotate: ${v}`)

const translatex_ = gen(
  'translate-x',
  translate,
  (n, v) => `--transform-translate-x: ${v}`
)
const translatey_ = gen(
  'translate-y',
  translate,
  (n, v) => `--transform-translate-y: ${v}`
)

const skewx_ = gen('skew-x', skew, (n, v) => `--transform-skew-x: ${v}`)

const skewy_ = gen('skew-y', skew, (n, v) => `--transform-skew-y: ${v}`)

const transformorigin_ = gen(
  'origin',
  transformOrigin,
  (n, v) => `transform-origin: ${v}`
)

const Transforms = {
  scale: {
    value: [...scale_, ...scalex_, ...scaley_],
    isAllowed: resolvePlugin('scale'),
    variant: config.variants.scale || [],
    desc: 'Scales an element that has transform applied.',
  },
  rotate: {
    value: rotate_,
    isAllowed: resolvePlugin('rotate'),
    variant: config.variants.rotate || [],
    desc: 'Rotates an element that has transform applied.',
  },
  translate: {
    value: [...translatex_, ...translatey_],
    isAllowed: resolvePlugin('translate'),
    variant: config.variants.translate || [],
    desc: 'Translates an element that has transform applied.',
  },
  skew: {
    value: [...skewx_, ...skewy_],
    isAllowed: resolvePlugin('skew'),
    variant: config.variants.skew || [],
    desc: 'Skews an element that has transform applied.',
  },
  'transform-origin': {
    value: transformorigin_,
    isAllowed: resolvePlugin('tranformOrigin'),
    variant: config.variants.tranformOrigin || [],
    desc:
      "Sets the origin of an element's transforms. Think of the origin as pushing a thumbtack into the element at the specified position.",
  },
}

// Interactivity

const appearance_ = gen(
  'appearance',
  { none: 'none' },
  (n, v) => `appearance: ${v}`
)

const cursor_ = gen('cursor', cursor, (n, v) => `cursor: ${v}`)

const outline_ = gen('outline', { none: '0' }, (n, v) => `outline: ${v}`)

const pointerevents_ = gen(
  'pointer-events',
  { none: 'none', auto: 'auto' },
  (n, v) => `pointer-events: ${v}`
)

const resize_ = gen(
  'resize',
  { none: 'none', DEFAULT: 'both', y: 'vertical', x: 'horizontal' },
  (n, v) => `resize: ${v}`
)

const userselect_ = gen(
  'select',
  { none: 'none', text: 'text', all: 'all', auto: 'auto' },
  (n, v) => `user-select: ${v}`
)

const accessability_ = gen('', {
  'sr-only': `position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip: rect(0, 0, 0, 0);
whiteSpace: nowrap;
borderWidth: 0;`,
  'not-sr-only': `position: static;
width: auto;
height: auto;
padding: 0;
margin: 0;
overflow: visible;
clip: auto;
whiteSpace: normal;`,
})

const Interactivity = {
  appearance: {
    value: appearance_,
    isAllowed: resolvePlugin('appearance'),
    variant: config.variants.appearance || [],
    desc: "Disables native styling based on the operating system's theme.",
  },
  cursor: {
    value: cursor_,
    isAllowed: resolvePlugin('cursor'),
    variant: config.variants.cursor || [],
    desc: 'Changes the cursor when hovering over an element.',
  },
  outline: {
    value: outline_,
    isAllowed: resolvePlugin('outline'),
    variant: config.variants.outline || [],
    desc: 'Changes outline of an element.',
  },
  'pointer-events': {
    value: pointerevents_,
    isAllowed: resolvePlugin('pointerEvents'),
    variant: config.variants.pointerEvents || [],
    desc: 'Specifies whether an element is the target of mouse events.',
  },
  resize: {
    value: resize_,
    isAllowed: resolvePlugin('resize'),
    variant: config.variants.resize || [],
    desc: 'Sets whether an element is resizable, along with direction.',
  },
  'user-select': {
    value: userselect_,
    isAllowed: resolvePlugin('userSelect'),
    variant: config.variants.userSelect || [],
    desc: 'Controls whether the user can select text.',
  },
  accessibility: {
    value: accessability_,
    isAllowed: resolvePlugin('accessibility'),
    variant: config.variants.accessibility || [],
    desc:
      'Controls whether an element is visually hidden but still accessible to screen readers.',
  },
}

// Miscellaneous

const boxshadow_ = gen('shadow', boxShadow, (n, v) => `box-shadow: ${v}`)

const opacity_ = gen('opacity', opacity, (n, v) => `opacity: ${v}`)

const fill_ = gen('fill', fill, (n, v) => `fill: ${v}`)

const stroke_ = gen('stroke', stroke, (n, v) => `stroke: ${v}`)

const strokewidth_ = gen('stroke', strokeWidth, (n, v) => `stroke-width: ${v}`)

const Miscellaneous = {
  'box-shadow': {
    value: boxshadow_,
    isAllowed: resolvePlugin('boxShadow'),
    variant: config.variants.boxShadow || [],
    tip: '.shadow-{size?}',
    desc: `Sets shadow of an element.`,
  },
  opacity: {
    value: opacity_,
    isAllowed: resolvePlugin('opacity'),
    variant: config.variants.opacity || [],
    tip: '.opacity-{name}',
    desc: `Sets opacity of an element.`,
  },
  fill: {
    value: fill_,
    isAllowed: resolvePlugin('fill'),
    variant: config.variants.fill || [],
    tip: '.fill-{name}',
    desc: `Set SVG fill style.`,
  },
  stroke: {
    value: stroke_,
    isAllowed: resolvePlugin('stroke'),
    variant: config.variants.stroke || [],
    tip: '.stroke-{name}',
    desc: `Set SVG stroke style.`,
  },
  'stroke-width': {
    value: strokewidth_,
    isAllowed: resolvePlugin('strokeWidth'),
    variant: config.variants.strokeWidth || [],
    desc: 'Set SVG stroke width.',
  },
}

module.exports = {
  variants: {
    responsive: Object.keys(screens)
      .map((it) => `${config.separator}${it}`)
      .join(' '),
    'group-hover': `${config.separator}group-hover`,
    'group-focus': `${config.separator}group-focus`,
    'focus-within': `${config.separator}focus-within`,
    first: `${config.separator}first`,
    last: `${config.separator}last`,
    odd: `${config.separator}odd`,
    even: `${config.separator}even`,
    hover: `${config.separator}hover`,
    focus: `${config.separator}focus`,
    active: `${config.separator}active`,
    visited: `${config.separator}visited`,
    disabled: `${config.separator}disabled`,
  },
  cheatsheet: {
    Layout,
    Flexbox,
    Grid,
    Spacing,
    Sizing,
    Typography,
    Backgrounds,
    Borders,
    Tables,
    Transitions,
    Transforms,
    Interactivity,
    Miscellaneous,
  },
}
