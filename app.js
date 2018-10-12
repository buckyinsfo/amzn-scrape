const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')
const passThru = require('./routes/passThru' )
const userRouter = require('./routes/users')
const scrapeRouter = require('./routes/scrape')

const app = express()

mongoose.connect( 
    'mongodb://admin:' + 
    process.env.MONGO_ATLAS_PW + 
    '@amzn-scrape-micro-0-shard-00-00-m52p6.mongodb.net:27017,amzn-scrape-micro-0-shard-00-01-m52p6.mongodb.net:27017,amzn-scrape-micro-0-shard-00-02-m52p6.mongodb.net:27017/test?ssl=true&replicaSet=amzn-scrape-micro-0-shard-0&authSource=admin&retryWrites=true',
    {
        useNewUrlParser: true,
    })
mongoose.Promise = global.Promise

console.log( process.env.MONGO_ATLAS_PW )

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')     
      return res.status(200).json({})
  }
  next()
})

app.use('/', indexRouter)
app.use('/pass', passThru )
app.use('/scrape', scrapeRouter)
app.use('/users', userRouter)

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// error handler
app.use( (err, req, res, next) => {
    // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(error.status || 500)
  res.json({
      error: {
          message: error.message
      }
  })
})

module.exports = app