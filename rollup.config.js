import pkg from "./package.json";
import cjs from "./tsconfig.cjs.json";
import esm from "./tsconfig.esm.json";
import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

const banner = `
  /**
   * @license
   * author: ${pkg.author}
   * ${pkg.name}.js v${pkg.version}
   * Released under the ${pkg.license} license.
   */
`;
const _output = {
	banner,
};
export default {
	input: "src/index.ts",
	output: [
		{
			..._output,
			dir: cjs.compilerOptions.outDir,
			format: "cjs",
		},
		{
			..._output,
			dir: esm.compilerOptions.outDir,
			format: "esm",
		},
	],
	plugins: [
		del({ targets: ["lib/*"], runOnce: true, verbose: true }),
		typescript(),
		babel({
			exclude: "node_modules/**",
			babelHelpers: "bundled",
		}),
		terser(),
	],
};
