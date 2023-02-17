import nextConnect from 'next-connect'
import auth from '../../middleware/auth'

const handler           = nextConnect();
var passport            = require('../../lib/passport.js');
var cookiesNext         = require('cookies-next');

handler.use(auth)
    .get(passport.authenticate('local-login', {}), (req, res) => {
        cookiesNext.setCookie('isloggedin', 'true', {req, res});
        res.json(req.session);
    })
    .post(passport.authenticate('local-login', {}), (req, res) => {
        cookiesNext.setCookie('isloggedin', 'true', {req, res});
        res.json(req.session);
    })
    
export default handler

