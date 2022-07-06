## Animes United - Server

This is server of the animes united platform

## Techs
 - [x] Node.js (17.x)
 - [x] Typescript
 - [x] Puppeteer

## Scripts

| Commands              | Description                                   |
|-----------------------|-----------------------------------------------|
| install:ci            | install dependencies in the current version of yarn.lock |
| seed:run              | run scrapping to feed the database            |
| build                 | clean build dir and compile code typescript  |
| start:development     | start typescript project in watch mode |
| test:unit             | run unit tests from server        |
| test:integration      | run integration tests from server |

## Configs

```env
# DATABASE URL (Mongo Atlas)
## used in production
MONGODB_URI=mongodb+srv://<user>:<pass>@animes-united-cluster.likzk.mongodb.net/<db-name>?retryWrites=true&w=majority
## used in tests
MONGODB_URI_TEST=mongodb+srv://<user>:<pass>@animes-united-cluster.likzk.mongodb.net/<db-name>?retryWrites=true&w=majority

# PUPPETEER HEADLESS
PUPPETEER_DEBUG=false
````
