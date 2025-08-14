import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@core': fileURLToPath(new URL('./src/modules/Core', import.meta.url)),
      '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
      '@home': fileURLToPath(new URL('./src/modules/Home', import.meta.url)),
      '@character': fileURLToPath(new URL('./src/modules/Character', import.meta.url)),
      '@inventory': fileURLToPath(new URL('./src/modules/Inventory', import.meta.url)),
      '@quests': fileURLToPath(new URL('./src/modules/Quests', import.meta.url)),
      '@spells': fileURLToPath(new URL('./src/modules/Spells', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
