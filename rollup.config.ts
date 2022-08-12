import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { babel } from '@rollup/plugin-babel'
import pkg from './package.json'
const extensions = ['.ts', '.js', '.tsx', '.jsx', '.json'] // 默认不包含.ts
export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es',
      globals: {
        axios: 'axios',
      },
    },
  ],
  external: ['axios', /^@babel\/runtime/],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    babel({ extensions, babelHelpers: 'runtime' }),
  ],
})
