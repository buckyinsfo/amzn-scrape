const express       = require('express')
const router        = express.Router({mergeParams: true})
const superagent    = require('superagent')
const cheerio       = require('cheerio')
const datetime      = require('node-datetime');
 
/* GET users listing. */
router.get('/', function(req, res, next) {

    const asin = req.params.asin ? req.params.asin : 'B01CD5VC92'
    const url = 'http://www.amazon.com/dp/'.concat( asin )
    console.log( 'asin=' + req.params.asin )
    console.log( req.baseUrl )
    
    //?s=pc&ie=UTF8&qid=1531353552&sr=1-7&keywords=raspberry+pi+3+b%2B'
    const query = {
        s: 'pc',
        ie: 'UTF8',
    //    qid: '1531353552',
    }

    superagent
    .get(url)
    .query(query)
    .end( (err, response) => {
        if (err) {
          res.json({
              confirmation: 'fail',
              message: err
            })
            return
        }

        const $ = cheerio.load(response.text)
        const timestamp = datetime.create().format('m/d/Y H:M:S');

        const price = $('[id=price_inside_buybox]').html()
        const title = $('[id=productTitle]').html() 
        const seller = $('[id=bylineInfo]').html()
        
        const data = [{
            timestamp: timestamp,
            asin: asin ? asin.trim() : '',
            title: title ? title.trim() : '',
            price: price ? price.trim() : '',
            seller: seller ? seller.trim() : '',
        }]

        res.send( data )
    })
})

module.exports = router

// old tags
//merchant-info