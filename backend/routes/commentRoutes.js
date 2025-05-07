
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const { verifierToken } = require('../auth');


router.post('/add', verifierToken, async (req, res) => {
  const { annonceId, content } = req.body;
  try {
    const c = new Comment({ annonceId, authorId: req.user.id, content });
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/byAnnonce/:id', async (req, res) => {
  const comments = await Comment.find({ annonceId: req.params.id }).sort({ createdAt: -1 });
  res.json(comments);
});

module.exports = router;
