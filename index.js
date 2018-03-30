const express = require('express')
const tinyUrl = require('tinyurl')

const app = express()
const PORT = process.env.PORT || 8000


function getShortUrl (url) {
  return new Promise((resolve, reject) => {
    tinyUrl.shorten(url, (shortUrl) => {
      resolve(shortUrl)
    })
  })
}

app.get('/new/*', (req, res) => {
  const originalUrl = req.path.slice(5)

  getShortUrl(originalUrl)
    .then(shortUrl => {
      const urls = {
        originalUrl,
        shortUrl
      }

      res.json(urls)
    })
    .catch(error => res.send(error.message))
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
