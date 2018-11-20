module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'hellow',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    loaders: [
      {
        test: /\.(scss|sass)$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'img/[name].[hash:7].[ext]',
          publicPath: '../../assets/img/',
          outputPath: '../../assets/img/'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
          test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
          use: [{
           loader: 'file-loader',
           options: {
            name: '[name].[ext]',
            publicPath: '../../assets/img/',
            outputPath: '../../assets/img/'
           }
          }]
       }
 
    ],//loaders end
  },
  generate: {
    routes: [
      'user/1',
      'user/2'
    ]
  },
  plugins: [
    {
      src: '~plugins/element-ui',
      ssr:true
    }
  ],
  vendor: [
    'element-ui'
  ],
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ]
}
