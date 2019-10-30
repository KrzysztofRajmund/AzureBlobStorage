const express = require('express')
var multer = require('multer')
var MulterAzureStorage = require('multer-azure-storage')
const Item = require('../models/item')

var upload = multer({
  storage: new MulterAzureStorage({
    azureStorageConnectionString: '{Your Azure Connection String Key}',
    containerName: 'images',
    containerSecurity: 'blob'
  })
})

console.log(Item)
var router = express.Router();

router.get('/',async (req,res)=>{
    var items = await Item.find({})
    res.send(items)
})


router.delete('/:itemId', async (req,res)=>{
    await Item.findByIdAndDelete(req.params.itemId)
    res.send('deleted')
})

router.post('/',async (req,res)=>{

    var item = new Item(req.body);
    console.log(item)
    await item.save();
    res.send(item)
   
})

router.post("/:itemId/upload", upload.single("image"), async (req, res) => {
  var item = await Item.findById(req.params.itemId);

  if (item) {
    await Item.findByIdAndUpdate(req.params.itemId, { image: req.file.url });
    res.send(item);
  } else {
    res.send("item not found");
  }
});

module.exports = router;