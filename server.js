/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = process.env.PORT || 8080

const app = express()

app.use(history())
app.use(serveStatic('dist/spa', { index: ['index.html', 'index.htm'] }))
app.listen(port, () => {
  console.log(`🚀 ${String(process.env.APP_NAME)} (Frontend) is running on: http://localhost:${port}`)
})
