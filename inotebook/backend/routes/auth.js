const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/User');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser')
var jwt = require('jsonwebtoken');

const JWT_Key = "Dhruv@2003"

// ROUTE 1 : Create user using Post  "/api/auth/createuser"
router.post('/createuser', [
    // for vadlidation of user.
    body('email', 'email is not valid').isEmail(),
    body('name', 'name is not long').isLength({ min: 2 }),
    body('password', 'password is not long').isLength({ min: 5 })
], async (req, res) => {
    // for finding errors.
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    };
    // for create user and store to the database.
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "User is alredy available with email." })
        }
        //  For generating salt and to do password Hash
        const salt = await bcrypt.genSalt(10); // generates salt
        const securedpass = await bcrypt.hash(req.body.password, salt) // generate hash password. 

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedpass // hash pass word is stored in database
        })
        // for json web token take data as id of user
        const data = {
            user: {
                id: user.id
            }
        }
        // here authtoken will give sign part using secret key and data which is id
        const authtokan = jwt.sign(data, JWT_Key);
        success = true;
        // .then(user=>res.json(user)).catch(err=>{console.log(err)
        // res.json({error:"please enter unique value.",message: err.message})  // to show error 
        // })
        // res.send(req.body);
        res.json({ success,authtokan })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})

// ROUTE 2: login user using Post  "/api/auth/login"
router.post('/login', [
    // for vadlidation of user on first basis .
    body('email', 'email is not valid').isEmail(),
    body('password', 'password is not long').exists()
], async (req, res) => {
    let success =false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    // take data of email and password enter by user.
    const { email, password } = req.body;

    try {
        // to see is email is there in database ?
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success, error: "login with right credential." })
        }
        // to compare password with database.
        let comparepass = await bcrypt.compare(password, user.password);  // it compare and do unhash or decrypt.
        if (!comparepass) {
            return res.status(400).json({success , error: "login with right credential." })
        }
        // for return authtoken.
        const data = {
            user: {
                id: user.id
            }
        }
        // here authtoken will give sign part using secret key and data which is id
        const authtokan = jwt.sign(data, JWT_Key);
        success = true;
        res.json({ success, authtokan })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }

})
// ROUTE 3 to fetch data of user through "/api/auth/fetchuser"
router.post('/fetchuser', fetchuser, async (req, res) => {
    try {
        // TO find user id of that user.
        const userid = req.user.id;
        // find data useing user id and not showing password.
        const user = await User.findById(userid).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})

module.exports = router