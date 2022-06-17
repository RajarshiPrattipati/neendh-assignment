const { randomUUID } = require("crypto");

//Uploadcare CDN
const UploadClient = require("@uploadcare/upload-client");
const client = new UploadClient.UploadClient({ publicKey: "85d1403cf4ab488bc38e"  });

//var uploadcare = require('./main')('public_key', 'private_key'),
fs = require('fs');

//Express
const express = require("express");
//var bodyParser = require('body-parser')

const app = express();
const port = 3000;
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));




//Multer

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//Mongoose
var mongoose = require("mongoose");
const MONGOURL = "mongodb+srv://aniketh:aniketh123@cluster0.432hj.mongodb.net/hashx-dev";
mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });


function uploadFiles(req, res) {
  console.log(req.body);
}

var db = mongoose.connection;
var Schema = mongoose.Schema;
//Connect or throw error
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Schema
var ItemSchema = new Schema({
  id: String,
  title: String,
  // audioURL: String,
  imageURL: String
});
var ItemModel = mongoose.model("ItemModel", ItemSchema);


app.post("/upload",upload.none(), (req, res) => {
  //If user enters URL, then accept URL. Otherwise need Uploadcare API to upload file
  console.log("body",req.body)
  const formData = req.body;
  var id = randomUUID;
  var title = formData?.title || "Default Title";
  var imageFileRef = formData.file-upload;
//var image = formData.imageURL || "https://imgur.com/gallery/6opxC";
 // var image = formData.audioURL || "https://pixabay.com/music/id-110624/";

// }

  // //Ensure Image is in CDN
  // client.uploadFile(image).then((file) => {
  //   console.log(file.uuid);
  //   imageFileRef = file.uuid;
  // });

  // //Ensure Audio is in CDN
  // client.uploadFile(audio).then((file) => {
  //   console.log(file.uuid);
  //   audioFileRef = file.uuid;
  // });

  //Create Schema object
    var newItem = new ItemModel({
    id: id,
    title: title,
    // audioURL: audioFileRef,
    imageURL: imageFileRef
  });

  //Save
  newItem.save(function (err) {
    console.log(newItem.uuid);
    if (err) console.log(err);
    // saved!
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


