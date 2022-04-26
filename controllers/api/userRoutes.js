const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

// Get all users (without showing their password)
// /api/users/
router.get('/', async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
// Get blog posts by user id and include comments
// /api/users/:id
  router.get('/:id', async (req, res) => {
    try {
      const userData = await User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [
          {
            model: Blog,
            attributes: ['id', 'name', 'description', 'date_created'],
          },
          {
            model: Comment,
            attributes: ['id', 'comment', 'date_created'],
            include: {
              model: Blog,
              attributes: ['name'],
            },
          },
        //   might not need this bit
          {
            model: Blog,
            attributes: ['name'],
          },
        ],
      });
      console.log(userData);
      if (!userData) {
        res.status(404).json({ message: `No users found with this id: ${req.params.id}` });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// Create a new user (and check to see if that username already exists).
// api/users/signup
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login
// api/users/login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});
// Logout
// /api/users/logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
