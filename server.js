import env from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

env.config()
const app = express()
const port = process.env.PORT || 5000

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`, {
    useNewUrlParser: true,
    dbName: 'foodr'
  })
  .then(() => console.log(`Connected to the datebase`))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
