require('dotenv').config()

const express = require('express')
const app = express()
const OAuthClient = require('intuit-oauth')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const invoice = require('./controllers/invoice')
const auth = require('./controllers/auth')
const customer = require('./controllers/customer')
const item = require('./controllers/item')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../build')))

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('oauth', null)
app.set('token', null)

/**
 * Get the AuthorizeUri
 */
app.post('/authUri', urlencodedParser, auth.authUri)
/**
 * Handle the callback to extract the `Auth Code` and exchange them for `Bearer-Tokens`
 */
app.get('/callback', auth.callback)
/**
 * Display the token : CAUTION : JUST for sample purposes
 */
app.get('/retrieveToken', auth.token)
/**
 * Refresh the access-token
 */
app.get('/refreshAccessToken', auth.refresh)
app.get('/disconnect', auth.disconnect)

app.get('/api/invoice', invoice.list)
app.get('/api/invoice/:id', invoice.view)
app.post('/api/invoice', invoice.post)

app.get('/api/customer', customer.list)
app.get('/api/customer/:id', customer.list)

app.get('/api/item', item.list)

if (process.env.ENV === 'production') {
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
