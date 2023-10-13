import { describe, it, expect } from 'vitest'
import { parseLinearGradient } from '@/linear'

describe('linear', () => {
  it('should parse linear-gradient', () => {
    const res = parseLinearGradient('linear-gradient(to top, blue, red)')

    expect(res).toEqual({
      orientation: { type: 'directional', value: 'top' },
      stops: [
        { color: 'blue' },
        { color: 'red' }
      ]
    })
  })

  it('should parse rgba', () => {
    const res = parseLinearGradient('linear-gradient(45deg, rgba(0, 0, 0, 0), red)')

    expect(res).toEqual({
      orientation: { type: 'angular', value: '45deg' },
      stops: [
        { color: 'rgba(0, 0, 0, 0)' },
        { color: 'red' }
      ]
    })
  })

  it('should parse offset', () => {
    const res = parseLinearGradient('linear-gradient(0.25turn, rgba(0, 0, 0, 0) 10%, red 30%)')

    expect(res).toEqual({
      orientation: { type: 'angular', value: '0.25turn' },
      stops: [
        { color: 'rgba(0, 0, 0, 0)', offset: '10%' },
        { color: 'red', offset: '30%' }
      ]
    })
  })

  it('should parse hint', () => {
    const res = parseLinearGradient('linear-gradient(to left bottom, rgba(0, 0, 0, 0) 10%, 20%, red 30%)')

    expect(res).toEqual({
      orientation: { type: 'directional', value: 'left bottom' },
      stops: [
        { color: 'rgba(0, 0, 0, 0)', offset: '10%', hint: '20%' },
        { color: 'red', offset: '30%' }
      ]
    })
  })
})