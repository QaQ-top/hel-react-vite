import RollupTypescript from "rollup-plugin-typescript2";
import Replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import { cst } from "hel-dev-utils";
import typescript from "typescript";
import pkg from "./package.json" assert { type: "json" };

const env = process.env.BUILD_ENV || "umd";
const plugins = [
  RollupTypescript({
    exclude: "node_modules/**",
    tsconfig: './tsconfig.node.json',
    typescript,
  }),
  Replace({
    RUN_ENV: JSON.stringify('production')
  })
];

const env2outputConf = {
  es: {
    format: "es",
    name: pkg.appGroupName,
    file: `${cst.HEL_PROXY_DIR}_es/entry.js`,
  },
  umd: {
    format: "umd",
    name: pkg.appGroupName,
    file: `${cst.HEL_PROXY_DIR}/entry.js`,
  },
};

const outputObj = env2outputConf[env];

if (process.env.MIN === "true") {
  plugins.push(terser());
  const [dirName] = outputObj.file.split("/");
  outputObj.file = `${dirName}/entry.min.js`;
}

export default {
  input: "src/entrance/libTypes.ts",
  plugins,
  output: [outputObj],
};
