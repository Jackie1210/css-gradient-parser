import { resolveStops, split } from './utils'

export type RgExtentKeyword = 'closest-corner' | 'closest-side' | 'farthest-corner' | 'farthest-side'

export interface RadiusResult {
  shape: 'circle' | 'ellipse'
  size: string
  position: string
  stops: Array<{
    color: string
    offset: string
    hint?: string
  }>
}

export function parseRadialGradient(input: string): RadiusResult {
  if (!input.startsWith('radial-gradient(')) throw new SyntaxError(`unsupported input: ${input}`)

  const result: RadiusResult = {
    shape: 'ellipse',
    size: 'farthest-corner',
    position: 'center',
    stops: []
  }

  const [, props] = input.match(/radial-gradient\((.+)\)/)

  const properties = split(props)
  // handle like radial-gradient(rgba(0,0,0,0), #ee7621)
  if (isColor(properties[0])) {
    return { ...result, stops: resolveStops(properties) }
  }

  const prefix = properties[0].split('at').map(v => v.trim())

  const shape = ((prefix[0] || '').match(/(circle|ellipse)/) || [])[1]
  const size = ((prefix[0] || '').match(/(\d+\.?\d*(vw|vh|px|em|rem)?|closest-corner|closest-side|farthest-corner|farthest-side)/) || [])[1]
  const position = prefix[1]

  if (shape || size || position) {
    properties.shift()
    Object.assign(result, {
      shape: shape || 'ellipse',
      size: size || 'farthest-corner',
      position: position || 'center'
    })
  }

  return { ...result, stops: resolveStops(properties) }
}

function isColor(v: string) {
  return /^rgba?|hwb|hsl|lab|lch|oklab|color|#/.test(v)
}