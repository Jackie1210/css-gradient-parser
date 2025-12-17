import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  target: 'es2021',
  dts: true,
  minify: true,
  clean: true,
  format: ['cjs', 'esm'],
})