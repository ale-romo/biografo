import nextConnect from 'next-connect'
import passport from '../lib/passport'
import session from '../lib/session'

const auth = nextConnect()
    .use(
        session({
            name: 'session',
            secret: 'http://localhost:3000/api/login?username=lorm@ipsm.com&password=asdfasdf',
            cookie: {secure: false, httpOnly: false, path: '/', maxAge: 259200000, sameSite:'lax'},
        })
    )
    // .use((req, res, next) => {
    //     // Initialize mocked database
    //     // Remove this after you add your own database
    //     req.session.users = req.session.users || []
    //     next()
    // })
    .use(passport.initialize())
    .use(passport.session())

export default auth