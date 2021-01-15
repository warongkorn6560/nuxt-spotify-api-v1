const { loadNuxt, build } = require('nuxt')
const apiRoutes = require('./routes')

const app = require('express')()
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

async function start() {
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  app.use('/api', apiRoutes)
  app.use(nuxt.render)

  if (isDev) {
    build(nuxt)
  }

  app.listen(port, '0.0.0.0')
  console.log('Server listening on `http://localhost:' + port + '`.')
}



start()