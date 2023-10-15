import { resolveStops, split, resolveLength } from './utils.js'
import { ColorStop } from './type.js'

export type RgExtentKeyword = 'closest-corner' | 'closest-side' | 'farthest-corner' | 'farthest-side'

export type RadialPropertyValue = {
  type: 'keyword'
  value: string
} | {
  type: 'length'
  value: { unit: string; value: string }
}

export interface RadialResult {
  shape: 'circle' | 'ellipse'
  repeating: boolean
  size: RadialPropertyValue[]
  position: {
    x: RadialPropertyValue
    y: RadialPropertyValue
  }
  stops: ColorStop[]
}

const rgExtentKeyword = new Set<RgExtentKeyword>([
  'closest-corner',
  'closest-side',
  'farthest-corner',
  'farthest-side'
])

type PositionKeyWord = 'center' | 'left' | 'right' | 'top' | 'bottom'

const positionKeyword = new Set<PositionKeyWord>([
  'center',
  'left',
  'top',
  'right',
  'bottom'
])

//eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRgExtentKeyword(v: any): v is RgExtentKeyword {
  return rgExtentKeyword.has(v)
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPositionKeyWord(v: any): v is PositionKeyWord {
  return positionKeyword.has(v)
}

function extendPosition(v: string[]) {
  const res = Array(2).fill('')
  for (let i = 0; i < 2; i++) {
    if (!v[i]) res[i] = 'center'
    else res[i] = v[i]
  }

  return res
}

export function parseRadialGradient(input: string): RadialResult {
  if (!/(repeating-)?radial-gradient/.test(input)) throw new SyntaxError(`could not find syntax for this item: ${input}`)
  
  const [, repeating, props] = input.match(/(repeating-)?radial-gradient\((.+)\)/)
  const result: RadialResult = {
    shape: 'ellipse',
    repeating: Boolean(repeating),
    size: [{
      type: 'keyword',
      value: 'farthest-corner'
    }],
    position: {
      x: { type: 'keyword', value: 'center' },
      y: { type: 'keyword', value: 'center' }
    },
    stops: []
  }

  const properties = split(props)
  // handle like radial-gradient(rgba(0,0,0,0), #ee7621)
  if (isColor(properties[0])) {
    return { ...result, stops: resolveStops(properties) }
  }

  const prefix = properties[0].split('at').map(v => v.trim())

  const shape = ((prefix[0] || '').match(/(circle|ellipse)/) || [])[1]
  const size: string[] = (prefix[0] || '').match(/(-?\d+\.?\d*(vw|vh|px|em|rem|%|rad|grad|turn|deg)?|closest-corner|closest-side|farthest-corner|farthest-side)/g) || []
  const position = extendPosition((prefix[1] || '').split(' '))

  if (!shape) {
    if (size.length === 1 && !isRgExtentKeyword(size[0])) {
      result.shape = 'circle'
    } else {
      result.shape = 'ellipse'
    }
  } else {
    result.shape = shape as RadialResult['shape']
  }

  if (size.length === 0) {
    size.push('farthest-corner')
  }

  result.size = size.map(v => {
    if (isRgExtentKeyword(v)) {
      return { type: 'keyword', value: v }
    } else {
      return { type: 'length', value: resolveLength(v) }
    }
  })

  result.position.x = isPositionKeyWord(position[0])
  ?  { type: 'keyword', value: position[0] }
  : { type: 'length', value: resolveLength(position[0]) }

  result.position.y = isPositionKeyWord(position[1])
    ?  { type: 'keyword', value: position[1] }
    : { type: 'length', value: resolveLength(position[1]) }

  if (shape || size.length > 0 || prefix[1]) properties.shift()

  return {
    ...result,
    stops: resolveStops(properties)
  }
}

function isColor(v: string) {
  if (/(circle|ellipse|at)/.test(v)) return false
  return /^(rgba?|hwb|hsl|lab|lch|oklab|color|#|[a-zA-Z]+)/.test(v)
}