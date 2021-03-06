const router = require('express').Router();
const {User, Blog, Comment} = require('../models')
const withAuth = require('../utils/auth')

// /dashboard/
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
      const blogs = blogData.map((allBlogs) => allBlogs.get({ plain: true }));

      res.render('dashboard', {blogs, logged_in: true, username: req.session.username});
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/new', async (req, res) => {
  res.render('addBlog', {
    logged_in: req.session.logged_in,
    username: req.session.name,
  })
});
// /dashboard/new
// // POST ROUTE TO CREATE A NEW BLOG POST
// router.post('/new', withAuth, async (req, res) => {
//   try {
//     const newBlog = await Blog.create({...req.body, user_id: req.session.user_id});
//     // req.session.save(() => {
//     //   req.session.user_id = newBlog.id;
//     //   req.session.logged_in = true;
//     //   res.render('addBlog', { newBlog, logged_in: true, username: req.session.username});
//     // });
//     console.log(newBlog)
//     const blog = newBlog.get({ plain: true });
//     console.log(blog)
//     // res.render('dashboard', {
//     //   ...withAuthblog,
//     //   logged_in: req.session.logged_in
//     // });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;