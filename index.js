const express = require('express');
const app = express()

const connection = require("./database/database");
const Ask = require("./database/Ask");

const Answer = require("./database/Answer");

connection
  .authenticate()
  .then(() =>{
    console.log("Conexão feita")
  })
  .catch((msgError) =>{
    console.log(msgError)
  })


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());



app.get("/", (req, res) => {
  Ask.findAll({
    raw: true,
    order:[
      ['id', 'DESC'] //ASC
    ]
  }).then(asks =>{
    res.render("index",{
      asks: asks
    })
  })
})

app.get("/perguntar", (req, res) => {

  res.render("to_ask")
})

app.post("/saveask", (req, res) =>{
  var title = req.body.title
  var description = req.body.description
  Ask.create({
    tiitle: title,
    description: description
  }).then(() => {
    res.redirect("/")
  })
})

app.get("/ask/:id", (req, res) =>{
  var id = req.params.id
  Ask.findOne({
    where: {id: id}
  }).then(ask => {
    if(ask != undefined){
      Answer.findAll({
        where: {askId: ask.id},
        order: [['id', 'DESC']]
      }).then(answer => {
        res.render("ask",{
          ask: ask,
          answer: answer
        })
      })
    }else{
      res.redirect("/")
    }
  })
})

app.post("/answer", (req,res) =>{
  var answer = req.body.answer
  var askId = req.body.askId
  Answer.create({
    body: answer,
    askId: askId
  }).then(() =>{
    res.redirect("/ask/" +askId)
  })
})

app.listen(8080,() => {console.log('SERVIDOR NO AR')})