const express       = require('express')
const router        = express.Router({mergeParams: true})
const superagent    = require('superagent')

exports.get_passthru_info = (req, res, next) => {
    const asin = req.params.asin ? req.params.asin : 'B01CD5VC92'
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
            res.send( response.text )
        })
}
 