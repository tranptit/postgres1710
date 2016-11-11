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

queryDB('SELECT * FROM "User"', function(result){
  console.log(result);
});



pool.on('error', function(err, client){
  console.log('LOI:: ' + err);
});
