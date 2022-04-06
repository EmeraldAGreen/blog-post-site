const router = require('express').Router();
const { Comment} = require('../../models');

// Update a comment post
// /api/comments/:id
router.put('/:id', async (req, res) => {
    try {
      const updatedComment = await Comment.update(
        {
          title: req.body.name,
          content: req.body.description,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!updatedComment) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.json(updatedComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Create a new comment
// /api/comments
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment by blog_id 
// /api/comments/:id
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;