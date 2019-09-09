const oracledb = require('oracledb');
//var Promise = require('es6-promise').Promise;

let buildupScripts = [];
let teardownScripts = [];

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw ="dg3EqJrxYFaFSzt";  // set mypw to the hr schema password

let connection;

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection(  {
      user          : "hr",
      password      : mypw,
      connectString : "localhost/XEPDB1"
    });


  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

/*
function simpleExecute(statement, binds = [], opts = {}) {
return new Promise(async (resolve, reject) => {
let conn;

opts.outFormat = oracledb.OBJECT;
opts.autoCommit = true;
try {
conn = await oracledb.getConnection();

const result = await conn.execute(statement, binds, opts);
resolve(result);
} catch (err) {
reject(err);
} finally {
if (conn) { // conn assignment worked, need to close
try {
await conn.close();
} catch (err) {
console.log(err);
}
}
}
});
}
*/

function getConnection() {

   return new Promise(function(resolve, reject){
     try {

       connection =oracledb.getConnection(  {
         user          : "RMF_SFSD_DEV",
         password      : mypw,
         connectString : "xd01scan:1521/stage6"
       });

        resolve(connection);

     } catch (err) {
       console.error(err);
       reject(err);
     }
     finally {

       if (connection) {

         try {
          connection.close();
         } catch (err) {
           console.error(err);
           reject(err);
         }

       }

     }
   });

}

function addBuildupSql(statement) {
    var stmt = {
        sql: statement.sql,
        binds: statement.binds || {},
        options: statement.options || {}
    };

    buildupScripts.push(stmt);
}

function addTeardownSql(statement) {
    var stmt = {
        sql: statement.sql,
        binds: statement.binds || {},
        options: statement.options || {}
    };

    teardownScripts.push(stmt);
}

async function releaseConnection(connection) {
  await connection.release(function(err) {
      if (err) {
          console.error(err);
      }
  });
}

function execute(sql, bindParams, options, connection) {
    return new Promise(async function(resolve, reject) {
      await connection.execute(sql, bindParams, options, function(err, results) {
            if (err) {
              console.log(err);
                return reject(err);
            }

            resolve(results);
        });
    });
}

function simpleExecute(sql, bindParams, options) {

    return new Promise(async function(resolve, reject) {
        await getConnection()
            .then(function(connection){
                execute(sql, bindParams, options, connection)
                    .then(function(results) {
                        resolve(results);

                        process.nextTick(function() {
                            releaseConnection(connection);
                        });
                    })
                    .catch(function(err) {
                        reject(err);

                        process.nextTick(function() {
                            releaseConnection(connection);
                        });
                    });
            })
            .catch(function(err) {
                reject(err);
            });
    });
}

module.exports={
  getConnection,
  simpleExecute,
  execute,
  releaseConnection,
  addBuildupSql,
  addTeardownSql
}








/*async function(callback) {

  let connection;

  try {
    connection = await oracledb.getConnection(  {
      user          : "RMF_SFSD_DEV",
      password      : mypw,
      connectString : "xd01scan:1521/stage6"
    });

    return callback(null,connection);

    /*const result = await connection.execute(
      `SELECT * from  rmf_common.V_SERVICE_PROVIDER order by upper(SERVICE_PROVIDER_NAME) `
    );
    console.log(result.rows);


  } catch (err) {
    console.error(err);
    return callback(err);
  }
  /*finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  } */
