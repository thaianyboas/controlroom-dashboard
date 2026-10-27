
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const production = process.env.NODE_ENV === "production";

export default {
  input: "src/controlroom-dashboard.ts",

  output: {
    file: "dist/controlroom-dashboard.js",
    format: "es",
    sourcemap: !production
  },

  plugins: [
    resolve({
      browser: true
    }),

    typescript({
      tsconfig: "./tsconfig.json"
    }),

    ...(production ? [terser()] : [])
  ]
};
