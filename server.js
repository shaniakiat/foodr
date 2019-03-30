import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'
import ppconf from './ppconf'

import business from './api/business'

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`, {
    useNewUrlParser: true,
    dbName: 'foodr'
  })
  .then(() => console.log(`Connected to the datebase`))
  .catch(err => console.log(err))

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
ppconf(passport)

app.use('/api/business', business)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Back-end listening on port ${port}!`))
