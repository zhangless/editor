import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import path from 'path'

const config = () => {
  console.log(process.env.NODE_ENV)
  return {
    server: {

      proxy: {
        "/api": process.env.NODE_ENV !== 'production' ? "http://localhost:7002" : 'http://api.ricedog.top',
        "/static": process.env.NODE_ENV !== 'production' ? "http://localhost:7002" : "http://api.ricedog.top",
      },

    },

    plugins: [tsconfigPaths(), react()],


    build: {
      assetsDir: 'assets',
    },


    css: {
      modules: {
        hashPrefix: "prefix",
      },

      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  }
}
// https://vitejs.dev/config/
export default defineConfig(config());


