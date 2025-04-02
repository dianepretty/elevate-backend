// routes/articleRoutes.js
const express = require('express');
const Article = require('../models/Article');

const router = express.Router();

// Create an article (Removed authMiddleware)
router.post('/', async (req, res) => {
  const { title, description, content } = req.body;
  const author="Diane Pretty"

  try {
    const newArticle = new Article({
      title,
      description,
      content,
      author, // Assuming the author is the logged-in user
    });

    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ message: 'Error creating article' });
  }
});

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching articles' });
  }
});

module.exports = router;
