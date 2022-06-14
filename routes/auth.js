const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Users} = require('../models/users');
const express = require('express');
const router = express.Router();

/**
 * @description - get auth token for user using email and password
 * @api {post} /api/users/, Get all users
 */
router.post('/', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');
  const token = user.generateAuthToken();
  res.send({token: token});
});

module.exports = router; 
