import { describe, it, expect } from 'vitest'
import { split } from '@/utils.js'

describe('Utils', () => {
  it('should split effects', () => {
    const tests = {
      'url(https:a.png), linear-gradient(blue, red)': [
        'url(https:a.png)',
        'linear-gradient(blue, red)',
      ],
      'rgba(0,0,0,.7)': ['rgba(0,0,0,.7)'],
      '1px 1px 2px black, 0 0 1em blue': ['1px 1px 2px black', '0 0 1em blue'],
      '2px 2px red, 4px 4px #4bf542, 6px 6px rgba(186, 147, 17, 30%)': [
        '2px 2px red',
        '4px 4px #4bf542',
        '6px 6px rgba(186, 147, 17, 30%)',
      ],
    }

    for (const [k, v] of Object.entries(tests)) {
      expect(split(k, ',')).toEqual(v)
    }

    [' ', /\s{1}/].forEach((v) => {
      expect(
        split(
          'drop-shadow(4px 4px 10px blue) blur(4px) saturate(150%)',
          v
        )
      ).toEqual([
        'drop-shadow(4px 4px 10px blue)',
        'blur(4px)',
        'saturate(150%)',
      ])
    })
  })
})
