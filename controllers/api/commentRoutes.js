const router = require('express').Router();
const { Comment } = require('../../models');

//WHEN I am idle on the site for more than a set time
//THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
const withAuth = require('../../utils/auth')

// Update a comment 
// /api/comments/:id
router.put('/:id', withAuth, async (req, res) => {
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
  
      res.render('single-post', updatedComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Add a new comment
// /api/comments
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.render('single-post', newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment by user_id 
// /api/comments/:id
router.delete('delete/:id', withAuth, async (req, res) => {
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

    res.render('single-post', commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;