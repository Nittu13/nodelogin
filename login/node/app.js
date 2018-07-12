const exp = require('express');
const path = require('path');
var multer = require('multer');
const bp = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./models/user');

// mongo db server 
// const config = require('./config/config');
// mongoose.connect(config.database);

mongoose.connect('mongodb://localhost:27017/utbl');
mongoose.connection.on("connected", () => {
    // console.log("connected to database " + config.database);
    console.log("connected to database:- mongodb://localhost:27017/utbl " );

});
mongoose.connection.on("error", (err) => {
    console.log("not connected to database " + err);
});

// For server
const app = exp();

// for root 
const goto = require('./routes/users');

app.use(cors());

// static server starts from here
app.use(exp.static(path.join(__dirname, 'public')));
app.use(bp.json());

// passport start here
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/goto', goto);

const port = 3000;
app.listen(port, (err) => {
    console.log('server started with port no ' + port)
});