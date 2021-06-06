const mongodb=require('mongoose');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const movieRouter = require('./router')
const app = express()
const apiPort = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())


// app.get('/', function(req, res) {
//  res.render('Hello World');
// });
const db='mongodb+srv://watchward:watch%401234@cluster0.2x0xh.mongodb.net/Duties';

mongodb.connect(db,{ useNewUrlParser: true ,useUnifiedTopology:true}).then((val)=>{
 console.log("successfull");
}).catch((err)=>{console.log(err)});


app.use('/api', movieRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
