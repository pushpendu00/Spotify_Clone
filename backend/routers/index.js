const router = require('express').Router();

const middleware = require('../middleware/middleware');
const songModel = require('../models/songModel');

// Root router
router.get('/',(req,res)=>{
    try{
        // console.log(req.cookies);
        return res.send({
            status : 200,
            message : "This is Home page"
        });
    }catch(err){
        return res.send({
            status : 502,
            message : "Server Down"
        })
    }
});

// Authentication router
router.use('/auth',require('./auth'));


// Login user router
router.post('/user' ,require('../controllers/userController').user);

router.get('/search/:searchItem',require('../controllers/searchController').search);

router.post('/set-master-play',require('../controllers/userController').setmasterPlay);

router.post('/get-master-play',require('../controllers/userController').getmasterPlay);

router.use('/artist',require('./artist'));

router.use('/song', require('./song'));

module.exports = router;