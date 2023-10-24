var express = require('express');
var cors = require('cors');
var path = require("path");
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage })

require('dotenv').config()

var app = express();
// const upload = multer({ dest: 'uploads/' })

app.use(cors());
// app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
  // res.sendFile(process.cwd() + '/views/index.html');
  res.sendFile(__dirname + "/views/index.html");
});

app.post('/api/fileanalyse',upload.single('upfile'), (req,res)=>{
  console.log(req.file)
  res.json({"name": req.file.originalname, "size": req.file.size, "type":req.file.mimetype})
})




const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
