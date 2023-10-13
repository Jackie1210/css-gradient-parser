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
  stops: Array<{
    color: string
    offset: string
    hint?: string
  }>
}
```

### `parseRadialGradient`
```ts
interface RadiusResult {
  shape: 'circle' | 'ellipse'
  size: string
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
- [ ] repeating-linear-gradient
- [ ] repeating-radial-gradient
- [ ] repeating-conic-gradient


## LICENSE

[MIT](./LICENSE)
