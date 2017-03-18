const express = require('express')

module.exports = (app) => {
  app.use(express.static('public'))

  const memeGenerator = require('../meme/meme-generator')
  const allMemes = memeGenerator.listMemes()

  app.get('/generate', (req, res) => {
    res.send(handleGenerate(req.query.meme, req.query.top, req.query.bottom))
  })

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
}
