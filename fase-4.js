const express = require('express')

const memeGenerator = require('./meme/meme-generator')

const app = express()
const allMemes = memeGenerator.listMemes()

// Route Params
// For GET /generate/aag//memes
app.get('/generate/:meme/(:top)?/(:bottom)?', (req, res) => {
  const meme = memeGenerator.createMeme(req.params.meme, req.params.top, req.params.bottom)
  res.send(`<img src="${meme}">`)
})

app.get('/list', (req, res) => {
  res.send(allMemes.map(meme => {
    const sample = `/generate/${meme.name}/top/bottom`
    return `<div><a href="${sample}">${meme.name}</a>: ${meme.description}</div>`
  }).join(''))
})

app.listen(3000, () => {
  console.log('Example app listening on http://localhost:3000 !')
})