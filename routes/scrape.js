const express       = require('express')
const router        = express.Router()
const superagent    = require('superagent')
const cheerio       = require('cheerio')

const xpath         = require('xpath')
const DOMParser     = require('xmldom').DOMParser
const XMLSerializer = require('xmldom').XMLSerializer
 
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

        // Create an XMLDom Element:
        //const doc = new DOMParser().parseFromString( response.text )
        //const doc = new dom().parseFromString(response.text)
        const $ = cheerio.load(response.text)
        //const body = $('body')
        const price = $('[id=price_inside_buybox]').text()
        const title = $('[id=productTitle]').text()
        const seller = $('[id=shipsFromSoldByInsideBuyBox_feature_div]').text()
        /*
        // Parse XML with XPath:
        const name = '' // xpath.select('//h1[@id="title"]//text()', doc)
        const salePrice = '' // '//span[contains(@id,"ourprice") or contains(@id,"saleprice")]/text()'
        const origPrice = '' // '//td[contains(text(),"List Price") or contains(text(),"M.R.P") or contains(text(),"Price")]/following-sibling::td/text()'
        */

        const data = [{
            title: title,
            price: price,
            seller: seller,
        }]

        //res.send(body.html())
        //res.send(price.html())
        //res.send( doc.stringify( doc ) )
        res.send( data )

        //const s = new XMLSerializer()
        //res.send( s.serializeToString( doc ) )


    })
})

module.exports = router