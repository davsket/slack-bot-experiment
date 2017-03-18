const express = require('express')

const memeGenerator = require('./meme/meme-generator')

const app = express()
const allMemes = memeGenerator.listMemes()

// Route Params
// For GET /generate/aag/_/memes
app.get('/generate/:meme/:top/:bottom', (req, res) => {
  const meme = memeGenerator.createMeme(req.params.meme, req.params.top, req.params.bottom)
  res.send(meme)
})

app.get('/list', (req, res) => {
  res.send(allMemes)
})

app.listen(3000, () => {
  console.log('Example app listening on http://localhost:3000 !')
})