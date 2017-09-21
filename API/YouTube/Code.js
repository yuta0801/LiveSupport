const googleAuth = require('google-auth-library')
const credential = require('./credential.json')
const Util = require('../../Util')
const auth = new googleAuth()
const oauth2Client = new auth.OAuth2(
  credential.installed.client_id,
  credential.installed.client_secret,
  credential.installed.redirect_uris[0]
)

class Code {
  authorize(data, callback) {
    oauth2Client.credentials = data
    callback(oauth2Client)
  }

  getNewToken(callback) {
    Util.msgbox({
      type: 'info',
      buttons: ['OK'],
      message: 'OAuth認証を行います。',
      detail: '次のページから認証を行いコードを入力してください。',
    }).then(() => {
      let oauthURL = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/youtube',
      })
      Util.open(oauthURL)
      Util.prompt('コードを入力してください', code => {
        oauth2Client.getToken(code, (err, token) => {
          if (err) {
            Util.msgbox({
              type: 'warning',
              buttons: ['再認証'],
              message: '認証できませんでした。',
              detail: err.toString(),
            }).then(() => { this.getNewToken(callback) })
          } else {
            oauth2Client.credentials = token
            callback(oauth2Client, token)
          }
        })
      })
    })
  }
}

module.exports = Code
