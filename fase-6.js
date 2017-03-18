const express = require('express')

// BOOOM 💥💥💥
const bodyParser = require('body-parser')

const memeGenerator = require('./meme/meme-generator')

const app = express()

// Moví el web server...
require('./web/web-server')(app)

// Yeah... parseame los requests POST PATCH PUT... (no GET OPTIONS...)
// Hello req.body!!
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/bot', (req, res) => {
  const query = req.body.text
  if (query) {
    const image = memeGenerator.createMeme.apply(null, query.split(';'))
    res.json({
      attachments: [{
        fallback: `Meme: ${image}`,
        image_url: image
      }]
    })
  } else {
    res.send('you should send something...')
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})