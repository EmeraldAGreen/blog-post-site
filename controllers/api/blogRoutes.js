const router = require('express').Router();
const { User, Blog, Comment} = require('../../models');
const withAuth = require('../../utils/auth')

// Get all blog posts 
// /api/blogs/
router.get('/', async (req, res) => {
    try {
      const blogData = await Blog.findAll({
        attributes: ['id', 'name', 'description', 'date_created'],
        order: [['date_created', 'DESC']],
        include: [
          { model: User, attributes: ['name'] },
          {
            model: Comment,
            attributes: [
              'id',
              'comment',
              'blog_id',
              'user_id',
              'date_created',
            ],
            include: { model: User, attributes: ['name'] },
          },
        ],
      });
      res.status(200).json(blogData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
//   Get all blog posts by user id
// /api/blogs/:id
  // router.get('/:id', async (req, res) => {
  //   try {
  //     const blogData = await Blog.findOne({
  //       where: { id: req.params.id },
  //       attributes: ['id', 'name', 'description', 'date_created'],
  //       order: [['date_created', 'DESC']],
  //       include: [
  //         { model: User, attributes: ['name'] },
  //         {
  //           model: Comment,
  //           attributes: [
  //             'id',
  //             'comment',
  //             'blog_id',
  //             'user_id',
  //             'date_created',
  //           ],
  //           include: { model: User, attributes: ['name'] },
  //         },
  //       ],
  //     });
  //     if (!blogData) {
  //       res.status(404).json({ message: `No blog posts found with this id: ${req.params.id}` });
  //       return;
  //     }
  //     res.status(200).json(blogData);
  //   } catch (err) {
  //     res.status(400).json(err);
  //   }
  // });

// Update a blog post
// /api/blogs/:id
// router.put('/:id', withAuth, async (req, res) => {
//     try {
//       const updatedBlog = await Blog.update(
//         {
//           title: req.body.name,
//           content: req.body.description,
//         },
//         {
//           where: {
//             id: req.params.id,
//           },
//         }
//       );
//       if (!updatedBlog) {
//         res.status(404).json({ message: 'No blog post found with this id!' });
//         return;
//       }
  
//       res.json(updatedBlog);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

router.get('/new', async (req, res) => {
  res.render('dashboard', {
    logged_in: req.session.logged_in,
    username: req.session.name,
  })
});

// Create a new blog post
// /api/blogs/new
router.post('/new', withAuth, async (req, res) => {
  console.log('we are in')
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // res.status(200).json(newBlog);
    console.log(newBlog)
    const blog = newBlog.get({ plain: true });
    console.log(blog)
    res.render('dashboard', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// Delete a blog post by post id 
// /api/blogs/:id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;