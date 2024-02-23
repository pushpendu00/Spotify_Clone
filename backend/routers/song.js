const middleAuth = require('../middleware/middleAuth');

const router = require('express').Router();

router.post('/like', middleAuth, require('../controllers/songController').like);


module.exports = router;