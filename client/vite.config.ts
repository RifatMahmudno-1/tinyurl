import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Pages from 'vite-plugin-pages'

const root = join(dirname(fileURLToPath(import.meta.url)))

// https://vitejs.dev/config/
export default defineConfig({
	root,
	plugins: [
		react(),
		Pages({
			dirs: 'pages'
		})
	],
	build: {
		assetsInlineLimit: 0,
		emptyOutDir: true,
		outDir: join(root, './build/____')
	},
	resolve: {
		alias: [{ find: '@', replacement: root }]
	},
	envDir: join(root, '../')
})
