import nextConnect from 'next-connect'
import auth from '../../middleware/auth'

const handler = nextConnect();

var passport = require('../../lib/passport.js');

var cookiesNext        = require('cookies-next');

var passport = require('../../lib/passport.js');

handler.use(auth)
    // .get(passport.authenticate('local-signup',{}), (req,res) => {
    //     cookiesNext.setCookie('isloggedin', 'true', {req, res});
    //     res.json(req.session);
    // })
    .post(passport.authenticate('local-signup',{}), (req,res) => {
        cookiesNext.setCookie('isloggedin', 'true', {req, res});
        res.json(req.session);
    })

export default handler

// next.prepare().then(() => {
//     const app = express();
//     app.use(cookieParser());
//     app.use(session({
//         secret: "genericnonrandomstring",
//         saveUninitialized: true,
//         resave: true,
//         cookie: {secure: false, httpOnly: false, path: '/', maxAge: 259200000}
//     }));
//     app.use(passport.initialize());
//     app.use(passport.session());

//     app.use(function(req,res,next){
//         cookies = req.cookies;
//         Object.setPrototypeOf(cookies, {});
//         req.responseObj = {isLoggedIn:false};
//         if(req.isAuthenticated()){
//             req.responseObj.user = req.user;
//             req.responseObj.isLoggedIn = true;
//         }
//         next();
//     });

//     app.post('/login', passport.authenticate('local-login',
// 	{
// 		failureRedirect : '/login.html'
// 	}), (req,res) => {
// 		res.redirect(req.session.returnTo || "/");
//         console.log(res.user);
// 		delete req.session.returnTo;
// 	});

//     app.post('/signup', passport.authenticate('local-signup',{
// 		failureRedirect : '/signup.html'
// 	}), (req,res) => {
// 		res.redirect(req.session.returnTo || "/");
// 		delete req.session.returnTo;
// 	});

//     app.get('/logout', (req, res) => {
// 		req.logout();
// 		res.redirect(req.session.returnTo || "/");
// 		delete req.session.returnTo;
// 	});	

//     app.listen(3000, (err) => {
//         if(err) throw err;
//         console.log('Listening...')
//     })
// }
// )