require('dotenv').config({ path: '.env' });
const path = require
const express = require("express");
const gatsby = require("gatsby-plugin-nodejs");
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');
const redis = require('redis')
const Sandbox = require('v8-sandbox')
const sandbox = new Sandbox.default();
const app = express();

app.use(cors())



const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
});

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

    app.post('/run', async (req, res) => {
        const execCode = async (expectedOutput) => {

            const code = `
                    ${req.body.code}
                    setResult({ value: result });
                    `;
            const { error, value } = await sandbox.execute({ code, timeout: 10000, globals: { inputValue: [1, 2, 3, 4, 5] } });

            await sandbox.shutdown();

            if (error) {
                console.log(error)
                throw error
            }
            return JSON.stringify(value) === JSON.stringify(expectedOutput) ? 'Pass' : `Error: expected ${value}, got ${expectedOutput}`
        }

        try {
            const output = await execCode([2, 3, 4, 5, 6])
            res.status(200).send({ message: output })
        } catch (err) {
            console.log(err)
            res.status(400).send({
                err,
                message: 'An Error Occurred'
            })
        }
    });

    const port = process.env.PORT || 1337;

    app.listen(port, () => console.log(`listening on port ${port}`))
});
