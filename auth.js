              /* Written By S. Soufargi */


const credentialservices = require('./credentialServices');
const bcrypt = require('bcrypt');
const fs = require('fs');
const forge = require('node-forge');
const path = require('path');

let jwt = require('jsonwebtoken');
const salt =   bcrypt.genSalt();

async function hashPassword (password) {

  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })
  return hashedPassword
}


module.exports.login = async (req, res,next) => {

try {
  



  var post = req.body;
    
  await credentialservices.getUserId(post.username) // username ites should come from request.body.username
  .then(response => credentialservices.getCredentialsId(response,"jwt").then(response => credentialservices.getCredential(response,"jwt").then(
      async response => {
         

       // compare req.body.password with corresponding hashed password from Redis

      const hashedpassword = await hashPassword(response.password);
      if ( await bcrypt.compare(post.password, hashedpassword ) ) {
 
        // Sign the token with a private key
        var pkey = await fs.readFileSync(path.join(__dirname, './private.pem'));
        // convert PEM-formatted private key to a Forge private key
        var forgePrivateKey = forge.pki.privateKeyFromPem(pkey);
      
        // convert the Forge public key to a PEM-formatted public key
         var privateKey = forge.pki.privateKeyToPem(forgePrivateKey);

         let token = await jwt.sign( {
            "sub": response.keyId, 
           /*    "name": 'selim', 
             "iat": 2324333434,  */
          },privateKey,{ algorithm: 'RS256' } );
        

           
         // Cookie options

         let options = {
          //maxAge: 1000 * 60 * 15, // would expire after 15 minutes
          httpOnly: true, // The cookie only accessible by the web server
          signed: true // Indicates if the cookie should be signed
      }
     
          await res.cookie('authorization', token,options);
          //await res.cookie("keySecret",response.keySecret,options);      
          
          await next();
        } else {
          res.status(401).send("Wrong Password Please try again !");
        }     
      }) 
      ))
      } catch (error) {
        res.status(404).send("User not found !");
      }
  
    }
    
   







 


