import { split, resolveStops } from "./utils"

interface LinearOrientation {
  type: 'directional' | 'angular'
  value: string
}

export interface LinearResult {
  orientation: LinearOrientation
  stops: Array<{
    color: string
    offset: string
    hint?: string
  }>
}

export function parseLinearGradient(input: string): LinearResult {
  if (!input.startsWith('linear-gradient(')) throw new SyntaxError(`unsupported input: ${input}`)

  let [,props] = input.match(/linear-gradient\((.+)\)/)
  const result: LinearResult = {
    orientation: { type: 'directional', value: 'bottom' },
    stops: []
  }

  const properties: string[] = split(props)
  const orientation = resolveLinearOrientation(properties[0])
  if (orientation) {
    result.orientation = orientation
    properties.shift()
  }

  return { ...result, stops: resolveStops(properties) }
}

function resolveLinearOrientation(angle: string): LinearOrientation {
  if (angle.startsWith('to ')) {
    return {
      type: 'directional',
      value: angle.replace('to ', '')
    }
  }

  if (['turn', 'deg'].some(unit => angle.endsWith(unit))) {
    return {
      type: 'angular',
      value: angle
    }
  }

  return null
}