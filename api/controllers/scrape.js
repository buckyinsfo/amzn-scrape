const superagent    = require('superagent')
const cheerio       = require('cheerio')
const datetime      = require('node-datetime')

exports.get_product_info = (req, res, next) => {
    const asin = req.params.asin 

    console.log( "asin ", asin )

    if ( asin == null ) {
        return res.status(400).json({
            message: "ASIN invalid"
        })
   }

    const url = 'http://www.amazon.com/dp/'.concat( asin )
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
        
        res.status(200).json([{    
            timestamp: timestamp,
            asin: asin ? asin.trim() : '',
            title: title ? title.trim() : '',
            price: price ? price.trim() : '',
            seller: seller ? seller.trim() : '',
        }])
    })
}