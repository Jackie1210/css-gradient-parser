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

- [x] linear-gradient
- [x] radial-gradient
- [ ] conic-gradient
- [x] repeating-linear-gradient
- [x] repeating-radial-gradient
- [ ] repeating-conic-gradient


## LICENSE

[MIT](./LICENSE)
