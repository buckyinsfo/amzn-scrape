var express = require('express')
var router = express.Router()

const api = ({ title: 'Express' })


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'amzn-scrape api',
  })
})

module.exports = router
