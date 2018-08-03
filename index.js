const express = require('express')
const { tiny } = require('tiny-shortener')
const bodyParser = require('body-parser')
const dns = require('dns')
const boom = require('boom')

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

function getShortUrl (url) {
  return new Promise((resolve, reject) => {
    tiny(url).then(shortUrl => {
      resolve(shortUrl)
    }).catch(err => {
      reject(err)
    })
  })
}

app.post('/api/shorturl/new', (req, res, next) => {
  const { originalUrl } = req.body

  // remove http protocol in order to peform dns lookup
  const url = originalUrl.replace(/https?:\/\//i, '')

  // check for a valid url before attempting to shorten url
  dns.lookup(url, err => {
    if (err) {
      return next(boom.badRequest('invalid URL'))
    }

    getShortUrl(url)
      .then(shortUrl => {
        const urls = {
          originalUrl,
          shortUrl
        }

        res.json(urls)
      })
      .catch(err => next(boom.failedDependency('URL shortener failed')))
  })
})

// error handler middleware using boom
app.use((err, req, res, next) => {
  return res.status(err.output.statusCode).json(err.output.payload)
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
