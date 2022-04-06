const router = require('express').Router();

const User = require('../models/User')

router.get('/', async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      })
      console.log(userData);
  // Serialize user data so templates can read it 
  // array.map(function(currentValue))
  // plain: true returns plain array of results
      const users = userData.map((allUsers) => allUsers.get({ plain: true }));
      console.log(users);
  // Pass serialized data into Handlebars.js template as an object
      res.render('homepage', {users});
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;