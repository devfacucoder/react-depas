import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
 
  plugins: [react()],
  base:"https://devfacucoder.github.io/react-depas"
})
//192.168.1.35