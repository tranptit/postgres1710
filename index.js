var express = require('express');
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false})

var app = express();
app.listen(3000);
app.set('view engine', 'ejs');
app.set('views', './views');
var insert = require('./db').insert;
var login = require('./db').login;
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/dangNhap', function(req, res){
  res.send( `
    <form action="/xulydangnhap" method="post">
      <input type="text" placeholder="username" name="username"/><br><br>
      <input type="password" placeholder="password" name="password"/><br><br>
      <input type="submit" value="dang nhap"/>
    </form>
  `)
});

app.post('/xulydangnhap', parser, function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  login(username, password, function(){//onFail
      res.send('Dang nhap that bai');
  },
  function(){//onSuccess
      res.send('Dang nhap thanh cong');
  })
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
