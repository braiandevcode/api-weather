// import { defineConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test:{
    environment:'happy-dom',
  }
});
