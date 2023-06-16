const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/connection');
require('dotenv').config();

// User registration
router.post('/register', (req, res) => {
  const { username, password,first_name,last_name,contact_number, } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db('users')
    .insert({ username, password: hashedPassword, first_name,last_name,contact_number })
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// User login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db('users')
    .select('*')
    .where({ username })
    .first()
    .then((user) => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, username });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
