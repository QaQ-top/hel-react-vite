import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
//@ts-ignore
import helDevUtils from "hel-dev-utils";
//@ts-ignore
import appInfo from "./appInfo.mjs";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  
  return {
    base: appInfo.getPublicPathOrUrl(`http://localhost:8889`),
    plugins: [react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: {
      RUN_ENV: JSON.stringify(env.RUN_ENV),
    },
    build: {
      emptyOutDir: true,
      rollupOptions: {
        output: {
          dir: helDevUtils.cst.HEL_DIST_DIR,
          format: "umd",
          globals: appInfo.externals,
        },
        external: Object.keys(appInfo.externals),
      },
    },
    optimizeDeps: {
      include: ["node_modules/**/*"],
    },
  };
});
