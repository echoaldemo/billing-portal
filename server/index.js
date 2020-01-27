require('dotenv').config()

const express = require('express')
const app = express()
const OAuthClient = require('intuit-oauth')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../build')))

const urlencodedParser = bodyParser.urlencoded({ extended: false })

let oauth2_token_json = null

let oauthClient = null

/**
 * Get the AuthorizeUri
 */
app.post('/authUri', urlencodedParser, function(req, res) {
  oauthClient = new OAuthClient({
    clientId: req.body.data.json.clientId,
    clientSecret: req.body.data.json.clientSecret,
    environment: req.body.data.json.environment,
    redirectUri: req.body.data.json.redirectUri
  })

  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
    state: 'intuit-test'
  })
  res.send(authUri)
})

/**
 * Handle the callback to extract the `Auth Code` and exchange them for `Bearer-Tokens`
 */
app.get('/callback', function(req, res) {
  oauthClient
    .createToken(req.url)
    .then(function(authResponse) {
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2)
    })
    .catch(function(e) {
      console.error(e)
    })

  res.send('')
})

/**
 * Display the token : CAUTION : JUST for sample purposes
 */
app.get('/retrieveToken', function(req, res) {
  res.send(oauth2_token_json)
})

/**
 * Refresh the access-token
 */
app.get('/refreshAccessToken', function(req, res) {
  oauthClient
    .refresh()
    .then(function(authResponse) {
      console.log(
        'The Refresh Token is  ' + JSON.stringify(authResponse.getJson())
      )
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2)
      res.send(oauth2_token_json)
    })
    .catch(function(e) {
      console.error(e)
    })
})

app.get('/api/invoice', function(req, res) {
  const companyID = oauthClient.getToken().realmId

  const url =
    oauthClient.environment === 'sandbox'
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production

  oauthClient
    .makeApiCall({
      url: url + `/v3/company/${companyID}/query?query=select * from Invoice`
    })
    .then(function(authResponse) {
      res.send(JSON.parse(authResponse.text()))
    })
    .catch(function(e) {
      console.error(e)
    })
})

app.get('/api/invoice/:id', function(req, res) {
  const companyID = oauthClient.getToken().realmId

  const url =
    oauthClient.environment === 'sandbox'
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production

  oauthClient
    .makeApiCall({
      url: url + `/v3/company/${companyID}/invoice/${req.params.id}`
    })
    .then(function(authResponse) {
      res.send(JSON.parse(authResponse.text()))
    })
    .catch(function(e) {
      console.error(e)
    })
})

if (process.env.REACT_APP_ENVIRONMENT === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../build')))

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
  })
}

/**
 * Start server on HTTP (will use ngrok for HTTPS forwarding)
 */
const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`💻 Server listening on port ${server.address().port}`)
})
