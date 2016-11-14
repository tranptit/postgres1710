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
      client.query(sql, function(err, result){
        cb(result, err);
      });
    }
  });
}



pool.on('error', function(err, client){
  console.log('LOI:: ' + err);
});

function insertUser(username, password, address, f1, f2){
  var sql = `INSERT INTO "User"(username, password, address)
            VALUES ('${username}','${password}','${address}')`;
  queryDB(sql, function(result, err){
      if(err){
        console.log('LOI ' + err);
        f1();
      }else{
        console.log(result);
        f2();
      }
  });
}

module.exports = insertUser;
