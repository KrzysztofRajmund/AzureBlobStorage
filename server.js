const express = require('express')
const items = require('./routes/items')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

var server = express();
server.set('port', process.env.PORT || 3009);

const url = "{Your MongoDB url with username and key}"
const connection = mongoose.connect(url, {
    useNewUrlParser: true
})

connection.then(database=>{
    console.log("Database is running")
})
server.use(express.json())
server.use('/items', items)


server.get('/', (req, res)=>{
    res.send('Main page is working')
})

server.listen(server.get('port'), ()=> {
    console.log('server is runnung on' + server.get('port'));
})