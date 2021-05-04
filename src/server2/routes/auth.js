var express = require('express');


var template = require('../lib/template.js');


function getAuthRouter(db, passport) {
    var router = express.Router();
    router.get('/login', function(request, response) {

    });

    router.post('/login_process',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
            successFlash: true
        }));

    router.get('/register', function(request, response) {

    });

    router.post('/register_process', function(request, response) {
        var post = request.body;
        var userID = post.userID;
        var userPW = post.userPW;
        var confirmUserPW = post.userPW2;

        var errorMSG = '';
        if (db.existID(userID)) {
            errorMSG = 'Already taken ID';
        } else if (userPW !== confirmUserPW) {
            errorMSG = 'Password Typo';
        }
        if (errorMSG === '') {
            request.login(user, function(err) {
                console.log('redirect');
                return response.redirect('/');
            })
        } else {
            req.flash('error', errorMSG);
            errorMSG
        }
    });

    router.get('/logout', function(request, response) {
        request.logout();
        request.session.save(function() {
            response.redirect('/');
        });
    });

    return router;
}

module.exports = getAuthRouter(db, passport);