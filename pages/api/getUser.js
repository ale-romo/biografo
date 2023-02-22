import nextConnect from 'next-connect'
import auth from '../../middleware/auth'
import{ getCookies, getCookie, deleteCookie} from 'cookies-next';
const userDatabase = require('../../lib/conn/userDB')
var userDB = new userDatabase();


const handler = nextConnect();

handler.use(auth)
    .get((req, res, next) => {
		userDB.getUserByID(parseInt(req.query.uid)).then((ans) => {
            if(ans){
                delete ans.password;
                delete ans.salt;
                res.json(ans);
            } else {
                res.json({error: 'No existe un usuario con ese uid.'});
            }
            
        });
    })
    
    export default handler
