const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      })

  // Serialize user data so templates can read it 
      const users = userData.map((allUsers) => allUsers.get({ plain: true }));
  // Pass serialized data into Handlebars.js template as an object
      res.render('homepage', {users});
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;