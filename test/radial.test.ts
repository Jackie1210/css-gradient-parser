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

    expect(g1).toEqual({
      shape: 'circle',
      repeating: false,
      position: {
        x: { type: 'length', value: '100%' },
        y: { type: 'keyword', value: 'center' }
      },
      size: [{ type: 'keyword', value: 'farthest-corner'}],
      stops: [
        { color: '#333' },
        { color: '#eee', offset: '80%' }
      ]
    })

    expect(g2).toEqual({
      shape: 'circle',
      repeating: false,
      position: {
        x: { type: 'length', value: '10px' },
        y: { type: 'length', value: '20px' }
      },
      size: [{ type: 'length', value: '20px'}],
      stops: [
        { color: '#333' },
        { color: '#eee', offset: '80%' }
      ]
    })

    expect(g3).toEqual({
      shape: 'circle',
      repeating: false,
      position: {
        x: { type: 'length', value: '10px' },
        y: { type: 'length', value: '20px' }
      },
      size: [{ type: 'keyword', value: 'closest-corner'}],
      stops: [
        { color: '#333' },
        { color: '#eee', offset: '80%' }
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
        { color: '#333' },
        { color: '#eee', offset: '80%' }
      ]
    })

    expect(g5).toEqual({
      shape: 'circle',
      repeating: false,
      position: {
        x: { type: 'keyword', value: 'center' },
        y: { type: 'keyword', value: 'center' },
      },
      size: [{ type: 'length', value: '10vw'}],
      stops: [
        { color: '#333' },
        { color: '#eee', offset: '80%' }
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
        { color: '#333' },
        { color: '#eee', offset: '80%' }
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
        { color: '#333' },
        { color: '#eee', offset: '80%' }
      ]
    })

    expect(g8).toEqual({
      shape: 'ellipse',
      repeating: false,
      position: {
        x: { type: 'length', value: '10px' },
        y: { type: 'length', value: '20px' },
      },
      size: [
        { type: 'length', value: '10px' },
        { type: 'length', value: '30px' }
      ],
      stops: [
        { color: '#333' },
        { color: '#eee', offset: '80%' }
      ]
    })
  })

  it('should parse negative radius', () => {
    const g = parseRadialGradient('radial-gradient(circle -20px, #333, #eee 80%)')

    expect(g).toEqual({
      shape: 'circle',
      repeating: false,
      position: {
        x: { type: 'keyword', value: 'center' },
        y: { type: 'keyword', value: 'center' },
      },
      size: [{ type: 'length', value: '-20px'}],
      stops: [
        { color: '#333' },
        { color: '#eee', offset: '80%' }
      ]
    })
  })
})