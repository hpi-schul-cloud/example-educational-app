import express from 'express';
import session from 'express-session';
import fs from 'fs';
import https from 'https';
import ssr from './ssr';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(session({
  secret: 'keyboard cat',
  cookie: {},
  resave: false,
  saveUninitialized: false,
}));

app.use('/*', ssr);

const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem')
const httpsOptions = { key, cert };

https.createServer(httpsOptions, app).listen(3000);
console.log('Hello World listening on https port 3000!');

app.listen(3001, () => {
  console.log('Hello World listening on http port 3001!');
});
