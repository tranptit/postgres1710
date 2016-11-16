var pg = require('pg');

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

function insertUser(username, password, address, f1, f2){
  var sql = `INSERT INTO "User"(username, password, address)
            VALUES ('${username}','${password}','${address}')`;
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

function login(username, password, onFail, onSuccess){
  var sql = `SELECT * FROM "User" WHERE username='${username}' AND
  password='${password}'`;
  queryDB(sql, function(err, result){
    if(err){
      console.log(err);
    }else{
      if(result.rowCount == 1){
        onSuccess();
      }else{
        onFail();
      }
    }
  });
}

module.exports.insert = insertUser;
module.exports.login = login;
