const express = require('express');

const app = express();

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.send('Hi hihihi...');
});



app.listen(8000, () => console.log('server is on...'));


