import nextConnect from 'next-connect'
import auth from '../../middleware/auth'

const handler           = nextConnect();
var passport            = require('../../lib/passport.js');
var cookiesNext         = require('cookies-next');

handler.use(auth)
    .get((req, res, next) => {
        passport.authenticate('local-login', (err, user) => {
            if (!user){
                console.log(`test${err}`);
                res.json({isloggedin:false, error:req.err});
            } else if(user){
                req.login(user, (err) => {
                    if (err){
                        console.log(err);
                        return next(err);
                    }
                    cookiesNext.setCookie('isloggedin', 'true', {req, res});
                    res.json(req.session);
                })
            }
        })(req, res, next);
    })
    .post((req, res, next) => {
        passport.authenticate('local-login', (err, user) => {
            if (!user){
                console.log(`test${err}`);
                res.json({isloggedin:false, error:req.err});
            } else if(user){
                req.login(user, (err) => {
                    if (err){
                        console.log(err);
                        return next(err);
                    }
                    cookiesNext.setCookie('isloggedin', 'true', {req, res});
                    res.json(req.session);
                })
            }
        })(req, res, next);
    })
    
export default handler

