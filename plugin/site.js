                /* Written By S. Soufargi */

'use strict';

const path = require('path');

module.exports.loginForm = (request, response) => response.render(path.join(__dirname, 'views/login'));

module.exports.logout = (request, response ,next) => {
  
  // Unset cookie + request.logout()

    response.clearCookie('authorization')
    request.logout();
    //response.redirect(200, '/auth');
    response.redirect('/sibapi/gateway/login');
};

