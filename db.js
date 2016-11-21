var pg = require('pg');
var encrypt = require('./crypto').encrypt;
var decrypt = require('./crypto').decrypt;
var config = {
  user: 'postgres',
  password: 'khoapham',
  database: 'USER',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillies: 30000
}

var pool = new pg.Pool(config);

function queryDB(sql, cb){
  pool.connect(function(err, client, done){
    if(err){
      console.log('LOI KET NOI ' + err);
    }else{
      client.query(sql, cb);
    }
  });
}

//SELECT * FROM "User" WHERE username = 'xyz' AND password = 'abc'

pool.on('error', function(err, client){
  console.log('LOI:: ' + err);
});

function insertUser(username, password, address, image, f1, f2){
  var sql = `INSERT INTO "User"(username, password, address, image)
            VALUES ('${username}','${encrypt(password)}','${address}','${image}')`;
  queryDB(sql, function(err, result){
      if(err){
        console.log('LOI ' + err);
        f1();
      }else{
        console.log(result);
        f2();
      }
  });
}

function login(username, password, cb){
  var sql = `SELECT * FROM "User" WHERE username='${username}'`;
  queryDB(sql, function(err, result){
    if(err){
      console.log(err);
    }else{
      if(result.rowCount == 1){
        var passDe = decrypt(result.rows[0].password);
        if(passDe == password){
          cb(1);//Thanh cong
        }else{
          cb(2);//Sai mat khau
        }
      }else{
        cb(3);//username ko ton tai
      }
    }
  });
}

module.exports.insert = insertUser;
module.exports.login = login;

function a(){
  var b;
  setTimeout(function(){
    b = 5;
    return b;
  }, 1000);
}

var c = a()
