const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get all blog posts
router.get('/', (req, res) => {
  db('posts')
    .select('*')
    .where("user_id", req.user.id)
    .then((posts) => res.json(posts))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Get a specific blog post
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('posts')
    .select('*')
    .where({ id })
    .first()
    .then((post) => {
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.json(post);
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Create a new blog post
router.post('/', async(req, res) => {
  const { title, content, bloodtype } = req.body;

  if (!bloodtype) {
    return res.status(400).json({ error: 'Bloodtype is required.' });
  }

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  try {
    const result = await db('posts')
    .insert({ title, content, bloodtype, user_id: req.user.id })

    res.status(201).json({ id: result[0], title, content })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
});

// Update a blog post
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, bloodtype } = req.body;
  if (!bloodtype) {
    return res.status(400).json({ error: 'Bloodtype is required.' });
  }

  if (!title && !content) {
    return res.status(400).json({ error: 'At least one field (title or content) must be provided' });
  }
  db('posts')
    .where({ id })
    .update({ title, content, bloodtype, updated_at: db.fn.now() })
    .then((result) => {
      if (result === 0) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.json({ id, title, content });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Delete a blog post
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('posts')
    .where({ id })
    .del()
    .then((result) => {
      if (result === 0) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
