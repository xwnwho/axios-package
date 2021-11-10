import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'axiosPackage',
      globals: {
        axios: 'axios',
      },
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'es',
      globals: {
        axios: 'axios',
      },
      exports: 'named',
    },
  ],
  external: ['axios'],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
})
