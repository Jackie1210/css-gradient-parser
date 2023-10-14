import { describe, it, expect } from 'vitest'
import { parseLinearGradient } from '@/linear.js'

describe('linear', () => {
  it('should parse linear-gradient', () => {
    const res = parseLinearGradient('linear-gradient(to top, blue, red)')

    expect(res).toEqual({
      orientation: { type: 'directional', value: 'top' },
      repeating: false,
      stops: [
        { color: 'blue', offset: undefined },
        { color: 'red', offset: undefined }
      ]
    })
  })

  it('should parse rgba', () => {
    const res = parseLinearGradient('linear-gradient(45deg, rgba(0, 0, 0, 0), red)')

    expect(res).toEqual({
      orientation: { type: 'angular', value: { unit: 'deg', value: '45' } },
      repeating: false,
      stops: [
        { color: 'rgba(0, 0, 0, 0)', offset: undefined },
        { color: 'red', offset: undefined }
      ]
    })
  })

  it('should parse offset', () => {
    const res = parseLinearGradient('linear-gradient(0.25turn, rgba(0, 0, 0, 0) 10%, red 30%)')

    expect(res).toEqual({
      orientation: { type: 'angular', value: { unit: 'turn', value: '0.25' } },
      repeating: false,
      stops: [
        { color: 'rgba(0, 0, 0, 0)', offset: { unit: '%', value: '10' }},
        { color: 'red', offset: { unit: '%', value: '30' } }
      ]
    })
  })

  it('should parse hint', () => {
    const res = parseLinearGradient('linear-gradient(to left bottom, rgba(0, 0, 0, 0) 10%, 20%, red 30%)')

    expect(res).toEqual({
      orientation: { type: 'directional', value: 'left bottom' },
      repeating: false,
      stops: [
        { color: 'rgba(0, 0, 0, 0)', offset: { unit: '%', value: '10' }, hint: { unit: '%', value: '20' } },
        { color: 'red', offset: { unit: '%', value: '30' } }
      ]
    })
  })

  it('should parse repeating', () => {
    const res = parseLinearGradient('repeating-linear-gradient(to left bottom, rgba(0, 0, 0, 0) 10%, 20%, red 30%)')

    expect(res).toEqual({
      orientation: { type: 'directional', value: 'left bottom' },
      repeating: true,
      stops: [
        { color: 'rgba(0, 0, 0, 0)', offset: { unit: '%', value: '10' }, hint: { unit: '%', value: '20' } },
        { color: 'red', offset: { unit: '%', value: '30' } }
      ]
    })
  })
})