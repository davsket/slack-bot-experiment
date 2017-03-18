const memeGenerator = require('./meme/meme-generator')

const allMemes = memeGenerator.listMemes()

console.log(allMemes)

const randomNumber = Math.floor( Math.random() * allMemes.length )
const randomMeme = allMemes[randomNumber]

console.log(memeGenerator.createMeme(randomMeme.name, 'this is', 'random'))
