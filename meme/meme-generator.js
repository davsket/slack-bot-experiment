const MEME_API = 'https://memegen.link'
const MEMES_LIST = require('../data/templates')

function createMeme (meme, textTop, textBottom) {
  const top = encodeString(textTop)
  const bottom = encodeString(textBottom)
  let memeClean = meme.trim()
  if (/^https?:\/\//.test(meme)) {
    return `${MEME_API}/custom/${top}/${bottom}.jpg?alt=${encodeURIComponent(memeClean)}`
  } else {
    return `${MEME_API}/${memeClean}/${top}/${bottom}.jpg`
  }
}

function listMemes () {
  return MEMES_LIST
}

// https://github.com/jacebrowning/memegen#special-characters
function encodeString (str) {
  if (!str) {
    return '_'
  } else {
    return (
      str
        .trim()
        .replace(/\-/g, '--')
        .replace(/\_/g, '__')
        .replace(/\s+/g, '-')
        .replace(/\?/g, '~q')
        .replace(/\%/g, '~p')
        .replace(/\#/g, '~h')
        .replace(/\//g, '~s')
        .replace(/\"/g, "''")
    )
  }
}

module.exports = {
  createMeme,
  listMemes
}