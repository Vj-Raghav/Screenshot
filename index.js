const express = require('express')
const webshot = require('webshot-node')

const app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

port = process.env.PORT || 3700;

app.get('/', (req, res) => {
    res.sendFile(__dirname +"/index.html")
})
app.post('/',(req,res)=>{
    var url = req.body.url
    var image = req.body.image
    var resolution = req.body.resolution*1
    
    webshot(url, 'fileimage.'+image,{quality:resolution},(err)=>{
        if (err) res.send(err)
        res.download('fileimage.'+image)
    })
})

app.listen(port, () => {
    console.log("Listening on 3700")
})