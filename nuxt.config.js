import { readFileSync } from 'fs'

const version = readFileSync('VERSION').toString()

export default {
  mode: 'universal',
  env: {
    version
  },
  head: {
    title: 'ハトクランダム',
    titleTemplate: '%s | ハトクランダム',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'og:site_name', content: 'ハトクランダム' },
      {
        hid: 'description',
        name: 'description',
        content: 'ハートオブクラウンを楽しく遊ぶ為のランダマイザです。'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' }]
  },
  loading: { color: '#fff' },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/main.css'
  ],
  plugins: [
    '~/plugins/fontawesome',
    '~/plugins/router',
    '~/plugins/vue2-touch-events',
    { src: '~/plugins/hooks.client', mode: 'client' }
  ],
  devModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    ['@nuxtjs/google-analytics', {
      // debug: {
      //   enabled: true,
      //   sendHitTask: true
      // },
      id: 'UA-50628159-3'
    }],
    '@nuxtjs/redirect-module'
  ],
  axios: {},
  serverMiddleware: [
    { path: '/api/slack', handler: '~/serverMiddleware/slack' },
    { path: '/ogp', handler: '~/serverMiddleware/ogp' }
  ],
  build: {
    extend(config, ctx) {},
    // Workaround for Safari to avoid infinite loop when hot reloading.
    // See also: https://github.com/nuxt/nuxt.js/issues/3828#issuecomment-508428611
    filenames: {
      app: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js'
    },
    transpile: [
      'lodash-es'
    ],
    loaders: {
      vue: {
        compilerOptions: {
          whitespace: 'condense'

        }
      }
    }
  },
  redirect: [
    // For users who add the old offline version to home screen.
    { from: '^/offline$', to: '/', statusCode: 301 }
  ]
}
