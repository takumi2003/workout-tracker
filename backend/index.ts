//npx ts-node index.ts

import express from 'express'
const app: express.Express = express()
const port = 3001

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
