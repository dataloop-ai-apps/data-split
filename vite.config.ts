import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {
    AntDesignVueResolver,
    ElementPlusResolver,
    VantResolver
} from 'unplugin-vue-components/resolvers'
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    server: {
        host: '0.0.0.0',
        port: 3004,
        https: true
    },
    plugins: [
        viteBasicSslPlugin(),
        vue(),
        Components({
            dirs: [
                'src/components',
                'node_modules/@dataloop-ai/components/src/components'
            ],
            include: 'node_modules/@dataloop-ai/components/src/components',
            resolvers: [
                AntDesignVueResolver(),
                ElementPlusResolver(),
                VantResolver()
            ]
        })
    ],
    css: {
        preprocessorOptions: {
            scss: {
                // Suppress Sass @import deprecation warnings
                silenceDeprecations: ['import']
            }
        }
    },
    build: {
        outDir: 'panels/dataSplit',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Vendor chunks
                    if (id.includes('node_modules')) {
                        // Vue core libraries (check first to avoid circular deps)
                        if (
                            id.includes('vue') &&
                            !id.includes('@dataloop-ai')
                        ) {
                            return 'vendor-vue'
                        }
                        // Dataloop packages (includes icons which is a dependency)
                        if (id.includes('@dataloop-ai')) {
                            return 'vendor-dataloop'
                        }
                        // Utility libraries
                        if (id.includes('lodash') || id.includes('uuid')) {
                            return 'vendor-utils'
                        }
                        // Other node_modules go into vendor chunk
                        return 'vendor'
                    }
                }
            }
        },
        chunkSizeWarningLimit: 1500
    }
})
