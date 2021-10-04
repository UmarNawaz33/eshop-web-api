const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config')

//get all users
router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passwordHash');

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
});

//get user with specific id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');

        if (!user) {
            res.status(500).json({ success: false, message: "The user with the given id was not found" });
        }
        res.status(200).send(user);
    } catch(err) {
        res.status(400).json({ success: false, error: err });
    }
});

//post a user
router.post('/', async (req, res) => {
    try {
        let user = User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, +process.env.SALT),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country
        });
        user = await user.save();
    
        if (!user) {
            return res.status(404).send('the user cannot be created!');
        }
        res.send(user);
    } catch(err) {
        res.status(400).json({ success: false, error: err });   
    }
});

//count users
router.get('/get/count', async (req, res) => {
    try {
        let userCount = await User.countDocuments();
        if(!userCount) {
            res.status(500).json({success: false, message: "No user found"});
        }
        res.send({userCount: userCount});
    } catch(err) {
        res.status(400).json({ success: false, error: err });
    }
});

//delete user
router.delete('/:id', async (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if (user) {
            return res.status(200).json({ success: true, message: "the user is deleted!" });
        } else {
            return res.status(404).json({ success: false, message: "user not found!" });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err });
    })
})

//register a user
router.post('/register', async (req, res) => {
    try {
        let user = User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, +process.env.SALT),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country
        });
        user = await user.save();
    
        if (!user) {
            return res.status(404).send('the user cannot be created!');
        }
        res.send(user);
    } catch(err) {
        res.status(400).json({ success: false, error: err });   
    }
});

//login the user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            return res.status(400).json({ success: false, message: 'User not found' }); 
        }

        if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                process.env.TOKEN_SECRET,
                {expiresIn: '1w'}
            )
            res.status(200).json({ success: true, message: 'User Authenticated', user: user.email, token: token }); 
        } else {
            res.status(400).json({ success: false, message: 'Wrong Password' }); 
        }

    } catch (err) {
        res.status(400).json({ success: false, error: err }); 
    }
});

module.exports =router;