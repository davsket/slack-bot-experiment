const express = require('express')

const memeGenerator = require('./meme/meme-generator')

const app = express()
const allMemes = memeGenerator.listMemes()

// Boom!!!
app.use(express.static('public'))

// URL Params
// For GET /generate/?meme=aag&bottom=memes
app.get('/generate', (req, res) => {
  res.send(handleGenerate(req.query.meme, req.query.top, req.query.bottom))
})

// Route Params
// For GET /generate/aag//memes
app.get('/generate/:meme/(:top)?/(:bottom)?', (req, res) => {
  res.send(handleGenerate(req.params.meme, req.params.top, req.params.bottom))
})

function handleGenerate (meme, top, bottom) {
  const gen = memeGenerator.createMeme(meme, top, bottom)
  return `<img src="${gen}">`
}

app.get('/list', (req, res) => {
  res.send(allMemes.map(meme => {
    const sample = `/generate/${meme.name}/top/bottom`
    return `<div><a href="${sample}">${meme.name}</a>: ${meme.description}</div>`
  }).join(''))
})

app.listen(3000, () => {
  console.log('Example app listening on http://localhost:3000 !')
})