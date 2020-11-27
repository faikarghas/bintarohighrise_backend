const router = require('express').Router()
const bodyParser = require('body-parser')
const controller = require('../controllers/promo')

router.use(bodyParser.json())

// router.post('/bannerPromo',controller.insertBannerPromo)
// router.get('/getbannerPromo/:slug',controller.getBannerPromo)
router.get('/getTextPromo/:slug',controller.getTextPromo)

// router.post('/deleteBannerPromo',controller.deleteBannerPromo)
// router.get('/editBannerPromo',controller.editBannerPromo)


module.exports = router
