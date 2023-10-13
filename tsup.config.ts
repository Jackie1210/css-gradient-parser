import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  target: 'es2021',
  dts: true,
  minify: true,
  format: ['cjs', 'esm'],
})