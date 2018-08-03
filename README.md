# FCC URL Shortener Microservice

POST a URL to `https://fcc-url-shortener-microservice-jp.glitch.me/api/shorturl/new` and receive a shortened URL in the JSON response. Visiting the shortened URL will redirect to the original URL.

### Prerequisites

Node.js 8.10+

### Installing

```
yarn install

npm start
```

Local Demo: `localhost:8000`

Live Demo: https://fcc-url-shortener-microservice-jp.glitch.me

### Example Output:
```
{
  originalUrl: "https://google.com",
  shortUrl: "http://tinyurl.com/mbq3m"
}
```
An invalid URL that doesn't follow the `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error.
### Example Error:
```
{
  statusCode: 400,
  error: "Bad Request",
  message: "invalid URL"
}
```