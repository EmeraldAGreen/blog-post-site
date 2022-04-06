const router = require('express').Router();

const {User, Blog, Comment} = require('../models')

router.get('/', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.findAll({
        where: {
            user_id: req.session.user_id,
          },
          attributes: ['id', 'name', 'description', 'date_created'],
          include: [
            {
              model: Comment,
              attributes: [
                  'id', 
                  'comment', 
                  'blog_id', 
                  'user_id', 'date_created'],
              include: {
                model: User,
                attributes: ['name'],
              },
            },
            {
              model: User,
              attributes: ['name'],
            },
          ],
        })
      const blogs = blogData.map((allBlogs) => allBlogs.get({ plain: true }));
      console.log(blogs);

      res.render('dashboard', {posts, logged_in: true, username: req.session.username});
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = router;