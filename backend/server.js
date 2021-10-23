const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express(),
    bodyParser = require('body-parser');
port = 80;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(
    cors({
        origin: '*'
    })
);

app.post('/api/join', (req, res) => {
    const code = req.body.code;
    console.log(code);
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.send(code === '15112000');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
