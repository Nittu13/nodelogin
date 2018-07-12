const exp = require('express');
const router = exp.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

const User = require('../models/user');

// register 
router.post('/reg', (req, res, next) => {
    // res.send('REGISTER');
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    // console.log(newUser);
    User.create(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, smg: "failed to reg user" });
        } else {
            res.json({ success: true, smg: "user register successfully" });
            console.log({ success: true, smg: "user register successfully" });
        }
    });
});

//  athenticate the user details
router.post('/auth', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: "user not found" });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 30
                });
                res.json({
                    success: true,
                    token: 'jwt ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        usernsme: user.username,
                        password: user.password,
                        email: user.email
                    }
                });
                // console.log(user);
            } else {
                return res.json({ success: false, msg: "Wrong password" });
                // console.log(user);
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    // res.send('profile created  successfull');
    res.json({ user: req.user });
});


//<-----** ROUTER FOR UPDATE USER'S PERSONAL DATA**----->\\
router.patch('/update', (req, res) => {
    const username = req.body.username;
    // console.log('call from backend  ' + username);
    User.update({ username }, {
        $set: {
            name: req.body.name,
            fname: req.body.fname,
            mono: req.body.mono,
            addr: req.body.addr,
            email: req.body.email
        }
    }, (err, result) => {
        console.log(result);
    });
});

//<------**ROUT FOR CHANGE THE PASSWORD **------>\\
router.post('/pwdauth', (req, res, next) => {
    const _id = req.body._id;
    const currentpassword = req.body.currentpassword;
    const newpassword1 = req.body.newpassword;
    User.getUserById(_id, (err, user) => {
        if (err) throw err;
        if (currentpassword == undefined || newpassword1== undefined) {
            return res.json({ success: false, msg: "user password field should not be empty" });
        } else {
            if (!user) {
                return res.json({ success: false, msg: "user not found" });
            }
            bcrypt.compare(currentpassword, user.password, (err, isMatch) => {
                if (err) throw err;
                console.log( 'user compare suc  ' + currentpassword)

                if (isMatch) {
                console.log( 'user compare success  ' + currentpassword)
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newpassword1, salt, (err, hash) => {
                            // console.log(hash);
                            if (err) throw err;
                            req.body.newpassword1 = hash;
                            User.update({ _id }, {
                                $set: {
                                    password: req.body.newpassword1
                                }
                            }, (err, result) => {
                                console.log(result);
                            });
                        });
                    });
                } else {
                    // console.log( 'user compare failed  ' + currentpassword)
                    return res.json({ success: false, msg: "Wrong password" });
                    // console.log(user);
                }
            });
        }
    });
});


router.get('/valid', (req, res, next) => {
    res.send('Validation successfull');
});

module.exports = router;




