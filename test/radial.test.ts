import { describe, expect, it } from 'vitest'
import { parseRadialGradient } from '@/radial.js'

describe('radial', () => {
  it('should parse correctly', () => {
    const g1 = parseRadialGradient('radial-gradient(circle at 100%, #333, #eee 80%)')
    const g2 = parseRadialGradient('radial-gradient(circle 20px at 10px 20px, #333, #eee 80%)')
    const g3 = parseRadialGradient('radial-gradient(closest-corner circle at 10px 20px, #333, #eee 80%)')
    const g4 = parseRadialGradient('radial-gradient(circle, #333, #eee 80%)')
    const g5 = parseRadialGradient('radial-gradient(circle 10vw, #333, #eee 80%)')
    const g6 = parseRadialGradient('radial-gradient(#333, #eee 80%)')
    const g7 = parseRadialGradient('repeating-radial-gradient(#333, #eee 80%)')
    const g8 = parseRadialGradient('radial-gradient(ellipse 10px 30px at 10px 20px, #333, #eee 80%)')
    const g9 = parseRadialGradient('radial-gradient(at 3% 42%, rgb(228, 105, 236) 0px, transparent 50%)')

    expect(g1).toEqual({
      shape: 'circle',
      repeating: false,
      position: {
        x: { type: 'length', value: { unit: '%', value: '100' } },
        y: { type: 'keyword', value: 'center' }
      },
      size: [{ type: 'keyword', value: 'farthest-corner'}],
      stops: [
        { color: '#333', offset: undefined },
        { color: '#eee', offset: { unit: '%', value: '80' } }
      ]
    })

    expect(g2).toEqual({
      shape: 'circle',
      repeating: false,
      position: {
        x: { type: 'length', value: { unit: 'px', value: '10' } },
        y: { type: 'length', value: { unit: 'px', value: '20' } }
      },
      size: [{ type: 'length', value: { unit: 'px', value: '20' } }],
      stops: [
        { color: '#333', offset: undefined },
        { color: '#eee', offset: { unit: '%', value: '80' } }
      ]
    })

    expect(g3).toEqual({
      shape: 'circle',
      repeating: false,
      position: {
        x: { type: 'length', value: { unit: 'px', value: '10' } },
        y: { type: 'length', value: { unit: 'px', value: '20' } }
      },
      size: [{ type: 'keyword', value: 'closest-corner'}],
      stops: [
        { color: '#333', offset: undefined },
        { color: '#eee', offset: { unit: '%', value: '80' } }
      ]
    })

    expect(g4).toEqual({
      shape: 'circle',
      repeating: false,
      position: {
        x: { type: 'keyword', value: 'center' },
        y: { type: 'keyword', value: 'center' },
      },
      size: [{ type: 'keyword', value: 'farthest-corner'}],
      stops: [
        { color: '#333', offset: undefined },
        { color: '#eee', offset: { unit: '%', value: '80' } }
      ]
    })

    expect(g5).toEqual({
      shape: 'circle',
      repeating: false,
      position: {
        x: { type: 'keyword', value: 'center' },
        y: { type: 'keyword', value: 'center' },
      },
      size: [{ type: 'length', value: { unit: 'vw', value: '10' }}],
      stops: [
        { color: '#333', offset: undefined },
        { color: '#eee', offset: { unit: '%', value: '80' } }
      ]
    })

    expect(g6).toEqual({
      shape: 'ellipse',
      repeating: false,
      position: {
        x: { type: 'keyword', value: 'center' },
        y: { type: 'keyword', value: 'center' },
      },
      size: [{ type: 'keyword', value: 'farthest-corner'}],
      stops: [
        { color: '#333', offset: undefined },
        { color: '#eee', offset: { unit: '%', value: '80' } }
      ]
    })

    expect(g7).toEqual({
      shape: 'ellipse',
      repeating: true,
      position: {
        x: { type: 'keyword', value: 'center' },
        y: { type: 'keyword', value: 'center' },
      },
      size: [{ type: 'keyword', value: 'farthest-corner'}],
      stops: [
        { color: '#333', offset: undefined },
        { color: '#eee', offset: { unit: '%', value: '80' } }
      ]
    })

    expect(g8).toEqual({
      shape: 'ellipse',
      repeating: false,
      position: {
        x: { type: 'length', value: { unit: 'px', value: '10' } },
        y: { type: 'length', value: { unit: 'px', value: '20' } }
      },
      size: [
        { type: 'length', value: { unit: 'px', value: '10' } },
        { type: 'length', value: { unit: 'px', value: '30' } },
      ],
      stops: [
        { color: '#333', offset: undefined },
        { color: '#eee', offset: { unit: '%', value: '80' } }
      ]
    })

    expect(g9).toEqual({
      shape: 'ellipse',
      repeating: false,
      position: {
        x: { type: 'length', value: { unit: '%', value: '3' } },
        y: { type: 'length', value: { unit: '%', value: '42' } }
      },
      size: [{ type: 'keyword', value: 'farthest-corner'}],
      stops: [
        { color: 'rgb(228, 105, 236)', offset: { unit: 'px', value: '0' } },
        { color: 'transparent', offset: { unit: '%', value: '50' } }
      ]
    })
  })

  it('should parse negative radius', () => {
    const g = parseRadialGradient('radial-gradient(-20% 20% at top left, yellow, blue)')

    expect(g).toEqual({
      shape: 'ellipse',
      repeating: false,
      position: {
        x: { type: 'keyword', value: 'top' },
        y: { type: 'keyword', value: 'left' },
      },
      size: [
        { type: 'length', value: { unit: '%', value: '-20' } },
        { type: 'length', value: { unit: '%', value: '20' } }
      ],
      stops: [
        { color: 'yellow', offset: undefined },
        { color: 'blue', offset: undefined }
      ]
    })
  })

  it('should parse pure value', () => {
    const g = parseRadialGradient('radial-gradient(blue, red)')

    expect(g).toEqual({
      shape: 'ellipse',
      repeating: false,
      position: {
        x: { type: 'keyword', value: 'center' },
        y: { type: 'keyword', value: 'center' },
      },
      size: [{ type: 'keyword', value: 'farthest-corner'}],
      stops: [
        { color: 'blue', offset: undefined },
        { color: 'red', offset: undefined }
      ]
    })
  })

  it('should parse pure number', () => {
    const g = parseRadialGradient('radial-gradient(circle at 0 50%, blue, red)')

    expect(g).toEqual({
      shape: 'circle',
      repeating: false,
      position: {
        x: { type: 'length', value: {
          value: "0", unit: 'px'
        }},
        y: { type: 'length', value: {
          value: "50", unit: '%'
        } },
      },
      size: [{ type: 'keyword', value: 'farthest-corner'}],
      stops: [
        { color: 'blue', offset: undefined },
        { color: 'red', offset: undefined }
      ]
    })
  })

  it('should parse repeating-radial-gradient(black,black 30px,white 30px,white 60px)', () => {
    const g = parseRadialGradient('repeating-radial-gradient(black,black 30px,white 30px,white 60px)')

    expect(g).toEqual({
      shape: 'ellipse',
      repeating: true,
      position: {
        x: { type: 'keyword', value: 'center' },
        y: { type: 'keyword', value: 'center' },
      },
      size: [{ type: 'keyword', value: 'farthest-corner'}],
      stops: [
        { color: 'black', offset: undefined },
        { color: 'black', offset: {
          unit: 'px',
          value: '30'
        } },
        { color: 'white', offset: {
          unit: 'px',
          value: '30'
        } },
        { color: 'white', offset: {
          unit: 'px',
          value: '60'
        } }
      ]
    })
  })
})