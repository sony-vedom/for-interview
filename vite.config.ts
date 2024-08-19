import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import mkcert from 'vite-plugin-mkcert'

const config = {
    plugins: [
        react(),
        svgr({
            include: '**/*.svg?react'
        })
    ],
    resolve: {
        alias: {
            app: '/src/app',
            entities: '/src/entities',
            features: '/src/features',
            pages: '/src/pages',
            shared: '/src/shared',
            widgets: '/src/widgets'
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) =>
    mode === 'production'
        ? config
        : {
            ...config,
            plugins: [
                ...config.plugins, mkcert()
            ],
            server: {
                proxy: {
                    '/api': {
                        target: 'https://dis.dis-mobile.ru',
                        changeOrigin: true,
                        secure: false,
                        rewrite: (p) => p.replace(/^\/api/, 'api')
                    }
                },
                cors: false
            }
        })
