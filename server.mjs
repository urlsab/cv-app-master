import express from 'express';
import cors  from 'cors';
import bodyParser from 'body-parser';

import { dbConnect } from './connectDb.mjs';

const app = express();

dbConnect();

// body parser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

app.use(function(req, res, next) {
    res.header( "Access-Control-Allow-Origin" );
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => {
    res.send(req.body);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Serving at http://localhost:${port}`)
})