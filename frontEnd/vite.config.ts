import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tailwindcss from 'tailwindcss';
import postcssNesting from 'postcss-nesting';

export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    postcss: {
      plugins: [
        postcssNesting(),
        tailwindcss(),
      ],
    },
  },
});
