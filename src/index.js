const express = require('express');
const cookeiParser = require('cookie-parser');

const { initDB } = require('./config/database');

const routes = require('./routes');
const { auth } = require('./middlewares/authMiddleware');
const app = express();

require('./config/handlebars')(app);

app.use('/static', express.static('public'));
app.use(cookeiParser());

app.use(express.urlencoded({extended: false}));

app.use(auth);
app.use(routes);

initDB()
    .then(() => {
        app.listen(8000, () => console.log('server is on...'));
    }).catch(err => {
        console.log('DB is not ready...', err);
    });


