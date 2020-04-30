
                                 /* Written By S. Soufargi */


const path = require('path');
const gateway = require('express-gateway');


/* Insert users and credentials with Code (not commands eg users create etc..)  and useful oauth2 credentials example */

//const login = require("./plugin/login");

 
/* require('console.table');
const path = require('path');
const gateway = require('express-gateway');
const services = require('express-gateway/lib/services');

services.user.insert(
{
	"username": "vncz",
	"firstname": "V",
	"lastname": "C",
	"email": "test@foo.com"
}).then((user)=> {
  console.table({username: user.username, id: user.id});
  return Promise.all([user, services.application.insert({
	"name": "my-app",
	"redirectUri": "https://oidcdebugger.com/debug"
  }, user.id)])
}).then(([user, app])=>{
  console.table([{id: app.id, name: app.name, redirectUri: app.redirectUri}])
  
  return Promise.all([
    services.credential.insertCredential(user.id, 'basic-auth'),
    services.credential.insertCredential(app.id, 'oauth2'),
  ]);
}).then((credentials)=>{
  console.table(credentials.map((c)=>({id: c.id, password: c.password||c.secret})));
  gateway().load(path.join(__dirname, 'config')).run();
}); */



 gateway()
  .load(path.join(__dirname, 'config'))
  .run();
  