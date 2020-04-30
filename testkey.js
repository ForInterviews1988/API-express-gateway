              /* Written By S. Soufargi */
              /* **************Test Public Key Verification (Jwt) ******************/

              /* private.pem file is created with the following command : 
              $ openssl genrsa -out private.pem 2048   */
 
            /* Extract public key from private key and hence create public.pem with : 
            $ openssl rsa -in private.pem -outform PEM -pubout -out public.pem */
const fs = require('fs');
const forge = require('node-forge');
const path = require('path');
let jwt = require('jsonwebtoken');

const private_key = fs.readFileSync('./private.pem')

const token = jwt.sign({
  some: 'payload'
}, private_key, { algorithm: 'RS256' });


let filePath2 = path.resolve(__dirname, ('./public.pem'));
const public_key = fs.readFileSync(filePath2,'utf8');

const verified = jwt.verify(token, public_key, { algorithms: 'RS256'})
console.log(verified);
