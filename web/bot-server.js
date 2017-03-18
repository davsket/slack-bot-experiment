
const bodyParser = require('body-parser')

const memeGenerator = require('../meme/meme-generator')
const slack = require('../slack/slack')

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }))

  app.post('/bot', (req, res) => {
    const query = req.body.text
    if (query) {
      res.send('Success!')

      const image = memeGenerator.createMeme.apply(null, query.split(';'))

      console.log(image)

      slack
        .getUserInfo(req.body.user_id, req.body.token)
        .then((user) => ({
          channel: req.body.channel_id,
          username: user.name,
          icon_url: user.profile.image_48,
          attachments: [{
            fallback: `Meme: ${query}`,
            image_url: image
          }]
        }), handleError)
        .then(slack.send, handleError)
        .then((response) => {
          console.log('Response:', response)
        }, handleError)
    } else {
      res.send('Error: you should send something like `/meme aag//aliens`')
    }
  })
}

function handleError (error) {
  console.error('Error:', error)
}