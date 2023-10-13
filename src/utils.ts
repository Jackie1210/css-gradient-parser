export function split(
  input: string,
  separator: string | RegExp = ','
): string[] {
  const result = []
  let l = 0
  let parenCount = 0
  separator = new RegExp(separator)

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      parenCount++
    } else if (input[i] === ')') {
      parenCount--
    }

    if (parenCount === 0 && separator.test(input[i])) {
      result.push(input.slice(l, i).trim())
      l = i + 1
    }
  }

  result.push(input.slice(l).trim())

  return result
}

export function resolveStops(v: string[]) {
  const stops = []

  for (let i = 0, n = v.length; i < n;) {
    const [color, offset] = split(v[i], /\s+/)

    if (isHint(v[i + 1])) {
      stops.push({
        color,
        offset,
        hint: v[i + 1]
      })
      i += 2
    } else {
      stops.push({
        color,
        offset
      })
      i++
    }
  }

  return stops
}

function isHint(v: string) {
  return /^\d+\.?\d*(%|vw|vh|px|em|rem)?$/.test(v)
}