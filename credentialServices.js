
              /* Written By S. Soufargi */


const db = require('./db');


 function buildIdKey (type, id) {
  return "EG".concat('-', type).concat(':', id);
}


///   username => consumerID 


  function getUserId  (username) {
    return db.smembers("EG".concat('-', "username").concat(':', username)).then(userInfo => { console.log(userInfo[0]); 
    return userInfo;
  });
};
//getUserId("ites");





/// consumerId == > credentials id

function getCredentialsId  (id, type) {
  return db.smembers(buildIdKey(type, id)).then(credential => {  console.log(credential[0]); 
  if (!credential || Object.keys(credential).length === 0) return null;
  return credential;
});
};

//getCredentialsId("0f8b1d19-406d-436e-9863-3d20d537edb2", "key-auth");





/// id ==> credential (keyid:keysecret)


 function getCredential(id, type) {
  return db.hgetall(buildIdKey(type, id)).then(credential => {  console.log(credential); 
  if (!credential || Object.keys(credential).length === 0) return null;

  return credential;
});
};
//getCredential("4YxN6SMd8V599YjsommD1Q", "key-auth");


module.exports.getUserId = getUserId;
module.exports.getCredential = getCredential;
module.exports.getCredentialsId = getCredentialsId;