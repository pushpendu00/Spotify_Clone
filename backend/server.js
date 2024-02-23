
const express = require('express');
require('dotenv').config();
require('./config/mongDB').connectFun();
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();



app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
const port = process.env.port || 4000;

app.use(cors({
    origin : process.env.origin,
    methods :["GET", "POST", "PUT", "DELETE"]
}))

//  Root router
app.use('/',require('./routers/index'));


// create Server
app.listen(port,(err)=>{
    if(err){
        console.log(`Server creating Error`);
        return;
    }
    console.log(`Server is Running on port ${port}`);
})
