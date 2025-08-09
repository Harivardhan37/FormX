import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load .env from the parent directory
dotenv.config({ path: path.resolve(__dirname, '../.env') })

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Expose environment variables to the client (prefix with import.meta.env)
    'import.meta.env': process.env
  },
  server: {
    host: true, // or '0.0.0.0'
    port: 5173, // optional: you can change this if needed
  },
})
