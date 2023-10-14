import { describe, it, expect } from 'vitest'
import { parseConicGradient } from '@/conic'

describe('conic', () => {
  it('should parse conic correctly', () => {
    const g1 = parseConicGradient('conic-gradient(from 45deg at 100% 30%, #f06, gold)')
    const g2 = parseConicGradient('conic-gradient(white -50%, black 150%)')
    const g3 = parseConicGradient('conic-gradient(white -50%, transparent)')

    expect(g1).toEqual({
      angle: '45deg',
      position: '100% 30%',
      repeating: false,
      stops: [
        { color: '#f06' },
        { color: 'gold' }
      ]
    })

    expect(g2).toEqual({
      angle: '0deg',
      position: 'center',
      repeating: false,
      stops: [
        { color: 'white', offset: '-50%' },
        { color: 'black', offset: '150%' }
      ]
    })

    expect(g3).toEqual({
      angle: '0deg',
      position: 'center',
      repeating: false,
      stops: [
        { color: 'white', offset: '-50%' },
        { color: 'transparent' }
      ]
    })
  })

  it('should parse color space', () => {
    const g1 = parseConicGradient('conic-gradient(from 30deg at center in hsl shorter hue, hsl(0,0%,75%), hsl(0,0%,25%))')
    const g2 = parseConicGradient('conic-gradient(in hsl shorter hue from 30deg at center, hsl(0,0%,75%), hsl(0,0%,25%))')
    const g3 = parseConicGradient('conic-gradient(in hsl from 30deg at center, hsl(0,0%,75%), hsl(0,0%,25%))')

    expect(g1).toEqual({
      angle: '30deg',
      position: 'center',
      repeating: false,
      color: {
        space: 'hsl',
        method: 'shorter hue'
      },
      stops: [
        { color: 'hsl(0,0%,75%)' },
        { color: 'hsl(0,0%,25%)' }
      ]
    })

    expect(g2).toEqual({
      angle: '30deg',
      position: 'center',
      repeating: false,
      color: {
        space: 'hsl',
        method: 'shorter hue'
      },
      stops: [
        { color: 'hsl(0,0%,75%)' },
        { color: 'hsl(0,0%,25%)' }
      ]
    })

    expect(g3).toEqual({
      angle: '30deg',
      position: 'center',
      repeating: false,
      color: {
        space: 'hsl'
      },
      stops: [
        { color: 'hsl(0,0%,75%)' },
        { color: 'hsl(0,0%,25%)' }
      ]
    })
  })

  it('should parse repeating', () => {
    const g1 = parseConicGradient('repeating-conic-gradient(white -50%, black 150%)')

    expect(g1.repeating).toBeTruthy()
  })
})