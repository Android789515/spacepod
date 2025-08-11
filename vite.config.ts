import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'hooks': resolve(__dirname, './src/hooks'),
      'assets': resolve(__dirname, './src/assets'),
      'components': resolve(__dirname, './src/components'),
      'pages': resolve(__dirname, './src/pages'),
    },
  },
})
