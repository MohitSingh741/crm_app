
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./config/passport');
const session = require('express-session');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', routes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
