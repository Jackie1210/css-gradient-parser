# css-gradient-parser

This lib intends to give a parser for [satori](https://github.com/vercel/satori) so that we can handle more gradient features


## API
### `parseLinearGradient`
```ts
interface LinearOrientation {
  type: 'directional' | 'angular'
  value: string
}

interface LinearResult {
  orientation: LinearOrientation
  repeating: boolean
  stops: Array<{
    color: string
    offset: string
    hint?: string
  }>
}
```

### `parseRadialGradient`
```ts
interface RadialResult {
  shape: 'circle' | 'ellipse'
  size: string
  repeating: boolean
  position: string
  stops: Array<{
    color: string
    offset: string
    hint?: string
  }>
}
```

### `parseConicGradient`
```ts
type RectColorSpace = 'srgb' | 'srgb-linear' | 'lab' | 'oklab' | 'xyz' | 'xyz-d50' | 'xyz-d65'
type PolarColorSpace = 'hsl' | 'hwb' | 'lch' | 'oklch'
type HueInterpolationMethod = `${'shorter' | 'longer' | 'increasing' | 'decreasing'} hue`

interface ConicGradient {
  angle: string
  repeating: boolean
  position: string
  color?: Color
  stops: Array<{
    color: string
    offset: string
    hint?: string
  }>
}

type Color = {
  space: RectColorSpace | PolarColorSpace
  method?: HueInterpolationMethod
}
```

- [x] linear-gradient
- [x] radial-gradient
- [x] conic-gradient
- [x] repeating-linear-gradient
- [x] repeating-radial-gradient
- [x] repeating-conic-gradient


## LICENSE

[MIT](./LICENSE)
