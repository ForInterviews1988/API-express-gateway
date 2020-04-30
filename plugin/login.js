                  /* Written By S. Soufargi */



const login = {
   // schema: { $id: "./../config/models/schema.js" },
    version: '1.0.0',
    policies: ['plugin'],
    init: function (pluginContext) { 
      pluginContext.registerPolicy({
        name: 'login-plugin',
        policy: (params) =>  
        async function(req,res,next){} });
       // pluginContext.registerGatewayRoute(require('./route.js')); //works altogether with the ./route.js
       
        const site = require('./site');
        bodyParser = require('body-parser');
        const auth = require('../auth');
        var cookieParser = require('cookie-parser');
     

        pluginContext.registerGatewayRoute(app => {
          app.set('view engine', 'ejs');
   

          
          app.use(cookieParser("SECRET")); // sign the cookie with a secret key
          app.use(bodyParser.json()); // for parsing application/json
          app.use(bodyParser.urlencoded({ extended: true })); 


          
          app.get('/sibapi/gateway/login', site.loginForm); // render login page

          app.post('/sibapi/gateway/login', async (req,res,next) =>  {
           
            await auth.login(req,res,next); 
            
 

            res.status(200).send("Welcome to Smart Ites Building Platform");            
          }); 

          app.post('/sibapi/gateway/logout', async (req,res,next) => {await site.logout(req,res,next);}); // logout API
        });
      }
    }
      
      module.exports = login;