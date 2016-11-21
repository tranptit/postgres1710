var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({
    extended: false
})

var sess = session(
  {
    secret: '2wh73&5g3hG67342',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 5000}
  }
);


var app = express();
app.listen(3001);
app.set('view engine', 'ejs');
app.set('views', './views');
var insert = require('./db').insert;
var login = require('./db').login;
app.use(express.static('public'));
app.use(sess);

app.use(function(req, res, next){
  if(req.session.daDangNhap == undefined || req.session.daDangNhap == false){
    req.session.daDangNhap = false;
  }else{
    req.session.daDangNhap++;
  }
  next();
});

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/dangNhap', function(req, res) {
    res.send(`
    <form action="/xulydangnhap" method="post">
      <input type="text" placeholder="username" name="username"/><br><br>
      <input type="password" placeholder="password" name="password"/><br><br>
      <input type="submit" value="dang nhap"/>
    </form>
  `)
});

app.get('/giaodich', function(req, res){
  if(req.session.daDangNhap > 0){
    res.send("Hay giao dich");
  }else{
    res.redirect('/dangNhap');
  }
});

app.post('/xulydangnhap', parser, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    login(username, password, function(kq) {
        if (kq == 1) {
            req.session.daDangNhap = 1;
            res.redirect('/giaodich');
        } else if (kq == 2) {
            res.send('Kiem tra password');
        } else if (kq == 3) {
            res.send('Username khong ton tai');
        }
    });
});

var upload = require('./upload.js')('avatar');
app.post('/dangky', parser, function(req, res) {
    upload(req, res, function(err) {
        var username = req.body.username;
        var password = req.body.password;
        var address = req.body.address;
        var image = req.file.filename;

        insert(username, password, address, image, function() {
            res.send('Dang ky khong thanh cong');
        }, function() {
            res.send('Dang ky thanh cong');
        });
    });
});
