var express = require('express');
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false})

var app = express();
app.listen(3000);
app.set('view engine', 'ejs');
app.set('views', './views');
var insert = require('./db');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('home');
});

app.post('/dangky', parser, function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var address = req.body.address;

  insert(username, password, address, function(){
    res.send('Dang ky khong thanh cong');
  }, function(){
    res.send('Dang ky thanh cong');
  });

});
