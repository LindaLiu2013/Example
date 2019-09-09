const oracledb=require('../db/oracledb');

const getServiceProvider=()=>{

  return new Promise(function(resolve, reject) {
    oracledb.simpleExecute(
           'SELECT * from  rmf_common.V_SERVICE_PROVIDER order by upper(SERVICE_PROVIDER_NAME)',
           {}, //no binds
           {}
       )
           .then(function(results) {
               console.log(results.rows);
               resolve(results.rows);
           })
           .catch(function(err) {
               console.log(err);
               reject(err);
           });
  });

}


const getXeroData=()=>{

  return new Promise(function(resolve, reject) {
      oracledb.simpleExecute(
         'select column_value from table(acc_pkg_api_account_register_staging_v1.list_xero_account_name) order by column_value',
         {}, //no binds
         {}
      ).then(function(results) {
             console.log(results.rows);
             resolve(results.rows);
         })
         .catch(function(err) {
             console.log(err);
             reject(err);
         });
   });
}



module.exports = {
  getServiceProvider,
  getXeroData
}
