const router = require('express').Router();
const {User, Blog, Comment} = require('../models');

// /
router.get('/', async (req, res) => {
    try {
      const blogData = await Blog.findAll({
        attributes: ['id', 'name', 'description', 'date_created'],
        include: [
          {
            model: Comment,
            attributes: [
                'id', 
                'comment', 
                'blog_id', 
                'user_id', 
                'date_created'],
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

  // Serialize user data so templates can read it 
      const blogs = blogData.map((allBlogs) => allBlogs.get({ plain: true }));
  // Pass serialized data into Handlebars.js template as an object
      res.render('homepage', {
        blogs, 
        logged_in: req.session.logged_in, 
        username: req.session.username,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

module.exports = router;