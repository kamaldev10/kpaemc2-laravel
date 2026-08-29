import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	plugins: [
		laravel({
			input: 'resources/js/app.tsx',
			ssr: 'resources/js/ssr.tsx',
			refresh: true,
		}),
		react(),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './resources/js'),
			'ziggy-js': path.resolve(__dirname, 'vendor/tightenco/ziggy'),
		},
	},
});
