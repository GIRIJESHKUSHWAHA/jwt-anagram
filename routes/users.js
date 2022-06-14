const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { Users } = require('../models/users');
const express = require('express');
const router = express.Router();
const isAnagram = require('../helpers/helper').isAnagram;

/**
 * @description - Create a new user
 * @api {post} /api/users/
 */
router.post('/', async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new Users(_.pick(req.body, ['name', 'email', 'password', 'role']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/**
 * @api {post} /api/users/user-list, Get all users
 */
router.get('/user-list', auth, admin, async (req, res) => {
  try {
    const user = await Users.find().select('-password');
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


/**
 * @api {get} /api/users/check-anagram, check is given string is anagram of other strings
 * @apiHeader {String} x-auth-token Users unique access-token.
 * @apiSuccess {String} true/false.
 */
router.post('/check-anagram', async (req, res) => {
  try {
    // this is the example array of stings
    arr = ['india', 'rain', 'inrain', 'rainin', 'raindrop', 'raindrops'];
    for (let i = 0; i < arr.length; i++) {
      if (isAnagram(arr[i], req.body.input)) {
        return res.send('true');
      }
    }
    return res.send('false');
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = router;