const express       = require('express')
const router        = express.Router()
const superagent    = require('superagent')
const cheerio       = require('cheerio')
 
/* GET users listing. */
router.get('/', function(req, res, next) {

    const url = 'https://www.amazon.com/Raspberry-Pi-RASPBERRYPI3-MODB-1GB-Model-Motherboard/dp/B01CD5VC92/ref=sr_1_7'
    
    //?s=pc&ie=UTF8&qid=1531353552&sr=1-7&keywords=raspberry+pi+3+b%2B'
    const query = {
        s: 'pc',
        ie: 'UTF8',
        qid: '1531353552',
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
        
        //const body = $('body')
        const price = $('[id=price_inside_buybox]').html().trim()
        const title = $('[id=productTitle]').html().trim()
        const sellerBox = $('[id=shipsFromSoldByInsideBuyBox_feature_div]')
        const seller = sellerBox.find('a').html().trim()
        
        const data = [{
            title: title,
            price: price,
            seller: seller,
        }]

        res.send( data )
    })
})

module.exports = router