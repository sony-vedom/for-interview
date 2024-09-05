import { defineConfig, loadEnv } from 'vite'
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
export default defineConfig(({ mode }) => {
        const { VITE_API_URL } = loadEnv(mode, process.cwd())
        return mode === 'production'
            ? config
            : {
                ...config,
                plugins: [
                    ...config.plugins, mkcert()
                ],
                server: {
                    proxy: {
                        '/api': {
                            target: VITE_API_URL,
                            changeOrigin: true,
                            secure: false,
                            rewrite: (p) => p.replace(/^\/api/, 'api')
                        }
                    },
                    cors: false
                }
            }
    }
)

