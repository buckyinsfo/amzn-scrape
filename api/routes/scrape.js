const express       = require('express')
const router        = express.Router({mergeParams: true})
const authCheck     = require('../auth/auth-check')

const ScrapeController = require('../controllers/scrape')

router.get('/', authCheck,  ScrapeController.get_product_info )

module.exports = router