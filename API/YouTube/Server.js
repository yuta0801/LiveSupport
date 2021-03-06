const credential = require('./credential.json')
const http = require('http')
const url = require('url')
const Util = require('../../Util')
const googleAuth = require('google-auth-library')
const auth = new googleAuth()
const oauth2Client = new auth.OAuth2(
  credential.web.client_id,
  credential.web.client_secret,
  credential.web.redirect_uris[0]
)

class Server {
  constructor() {
    this.server = http.createServer()
  }

  authorize(data, callback) {
    oauth2Client.credentials = data
    callback(oauth2Client)
  }

  getNewToken(callback) {
    const oauthURL = oauth2Client.generateAuthUrl({
      access_type: 'online',
      scope: 'https://www.googleapis.com/auth/youtube',
    })
    Util.open(oauthURL)
    this.server.listen(7170)
    this.server.on('request', (req, res) => {
      this.handler(req, res, code => {
        oauth2Client.getToken(code, (err, token) => {
          if (err) {
            Util.msgbox({
              type: 'warning',
              message: Util._('canNotOAuth') + Util._('doAgain'),
              detail: err.toString(),
              buttons: [Util._('yes'), Util._('cancel')],
              only: 0,
            }).then(() => this.getNewToken(callback))
          } else {
            oauth2Client.credentials = token
            callback(oauth2Client, token)
          }
        })
      })
    })
  }

  handler(req, res, callback) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'})
    const qs = url.parse(req.url, true).query
    let message = 'LiveSupport\n'
    if (qs.code) {
      message += Util._('authenticated')
      callback(qs.code)
    } else if (qs.result === 'denied') {
      message += Util._('denied')
    }
    res.write(`${message}\n${Util._('canClose')}`)
    res.end()
    this.server.close()
  }
}

module.exports = Server
