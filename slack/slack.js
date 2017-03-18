const request = require('request')

const SLACK_API         = 'https://slack.com/api'
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
const SLACK_OAUTH       = process.env.SLACK_OAUTH

function getUserInfo (userId, slashToken) {
  return new Promise((resolve, reject) => {
    request.get({
      url: `${SLACK_API}/users.info?token=${SLACK_OAUTH}&user=${userId}`
    }, (error, resp, body) => {
      if (error) {
        reject(error)
      } else {
        console.log('got user!')
        resolve(JSON.parse(body).user)
      }
    })
  })
}

function send(payload) {
  return new Promise((resolve, reject) => {
    console.log('sending to slack!...')
    request.post({
      url: SLACK_WEBHOOK_URL,
      json: payload
    }, (error, resp, body) => {
      if (error) {
        reject(error)
      } else {
        console.log('sent data!')
        resolve(body)
      }
    })
  })
}

module.exports = {
  getUserInfo,
  send
}