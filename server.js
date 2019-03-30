import env from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

env.config()

const app = express()
app.use(bodyParser.json())

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`, {
    useNewUrlParser: true,
    dbName: 'foodr'
  })
  .then(() => console.log(`Connected to the datebase`))
  .catch(err => console.log(err))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Back-end listening on port ${port}!`))
