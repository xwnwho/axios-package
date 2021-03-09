import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import typescript from '@rollup/plugin-typescript'
// import dts from "rollup-plugin-dts"
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'axiosPackage',
      globals: {
        'axios': 'axios'
      }
    },
    {
      file: pkg.module,
      format: 'es',
      globals: {
        'axios': 'axios'
      }
    }
  ],
  external: ['axios'],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
  ]
}