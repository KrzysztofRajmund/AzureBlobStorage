const mongoose = require('mongoose')



var Item = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    image:{
        type: String
      
    },
    description:{
        type: String
      
    }
})



module.exports = mongoose.model('Item', Item)