const express = require('express')
const app = express()

require('./web/web-server')(app)
require('./web/bot-server')(app)

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})