const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/leads');

router.use(bodyParser.json())

router.post('/postform', controller.post)
router.get('/getform', controller.get)


module.exports = router;
