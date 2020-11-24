const router = require('express').Router()
const bodyParser = require('body-parser')
const controller = require('../controllers/api')

router.use(bodyParser.json())

router.post('/bannerHome',controller.insertBannerHome)
router.get('/getbannerHome',controller.getBannerHome)

module.exports = router
