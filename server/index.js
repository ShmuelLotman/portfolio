require('dotenv').config({ path: '.env' });
const express = require("express");
const gatsby = require("gatsby-plugin-nodejs");
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');
const app = express();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

gatsby.prepare({ app }, () => {
    app.get("/hello", (req, res) => {
        console.log('herllaosdifjaosdif')
        res.send(`Hey, ${req.query.name || "Vsauce - Michael here"}`)
    })

    app.post('/update-editor', (req, res) => {
        pusher.trigger('editor', 'code-update', {
            ...req.body,
        });

        res.status(200).send('OK');
    });
});

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`listening on port ${port}`));
