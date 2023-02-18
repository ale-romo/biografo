import nextConnect from 'next-connect'
import auth from '../../middleware/auth'
import{ getCookies, getCookie, deleteCookie} from 'cookies-next';

const handler = nextConnect();

handler.use(auth)
    .get((req, res, next) => {
        res.json({isloggedin: req.isAuthenticated()});
    })
    .post((req, res, next) => {
        res.json({isloggedin: req.isAuthenticated(), session:req.session});
    });	
    
        export default handler
