const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})



//CONNECTION STRING
//mongodb+srv://admin:admin@cluster0.s9dxiuk.mongodb.net/?retryWrites=true&w=majority
//npm nstall mongoose in the folder the server is running from
//the folder is BackEnd in this case

//code copied from https://mongoosejs.com/docs/index.html

//import mongoose
const mongoose = require('mongoose');
//Error catcher
main().catch(err => console.log(err));
//awaits the connection to the mongodb address
async function main() {
  //use the mongo adress gotten in database -> connect -> connect yourapplication -> copy string and add password
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.s9dxiuk.mongodb.net/?retryWrites=true&w=majority');
}
//create a schema for the books
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
});

//DECLARE a model ('COLLECTION NAME', SCHEMA)
const bookModel = mongoose.model('Books', bookSchema);


app.post('/api/books', (req, res) => {
  console.log(req.body);

  //CREATE A record in our database https://mongoosejs.com/docs/api.html#model_Model-create
  bookModel.create({
    title: req.body.title,
    cover: req.body.cover,
    author: req.body.author

  })

  res.send('Data Recieved');
})


app.get('/api/books', (req, res) => {
  //delete previous hard coded books json
  //Find our record of books
  bookModel.find((error, data) => {
    //responds by sending back a json with the data
    res.json(data);
  })
})
//search for a book via its unique id
app.get('/api/books/:id',(req,res)=>{
  //logs the id to the server console
  console.log(req.params.id);
  //return the data for the unique book id from the url
  bookModel.findById(req.params.id,(error, data)=>{
    res.json(data);
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})