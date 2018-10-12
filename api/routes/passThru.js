const express       = require('express')
const router        = express.Router({mergeParams: true})
const authCheck     = require('../auth/auth-check')

const PassThruController = require('../controllers/passThru')

/* GET entire page listing. */
router.get('/', authCheck,  PassThruController.get_passthru_info )

module.exports = router