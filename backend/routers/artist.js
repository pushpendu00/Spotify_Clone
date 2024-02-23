const middleAuth = require('../middleware/middleAuth');

const router = require('express').Router();

router.get('/:artist_id',require('../controllers/artistController').artist);

router.post('/follow', middleAuth, require('../controllers/artistController').follow);

router.post('/unfollow',middleAuth, require('../controllers/artistController').unfollow);

router.post('/artist-name-to-artist-id', require('../controllers/artistController').artist_Name_to_id);


module.exports = router;