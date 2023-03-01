const https = require("https");

const { parse } = require("url");
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const httpsOptions = {
		key:fs.readFileSync('/etc/letsencrypt/live/biografoimaginario.com/privkey.pem'),
		cert:fs.readFileSync('/etc/letsencrypt/live/biografoimaginario.com/cert.pem'),
		ca:fs.readFileSync('/etc/letsencrypt/live/biografoimaginario.com/chain.pem')
}

app.prepare().then( () => {
    https.createServer(httpsOptions, (req, res) => {
        const parsedURL = parse(req.url, true);
        handle(req,res,parsedURL);
    }).listen(443)
})