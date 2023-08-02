const router = require('express').Router();             
const { User } = require('../../models');

//Step1) NewUser portion
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body); //new user
       // ({username:req.body.username,
      // password:req.body.password});

    req.session.save(() => {
      req.session.user_id = newuserData.id;   //connecting user_is with new user
      req.session.username = newuserData.username; //connecting username w/new user
      req.session.logged_in = true; //logged in

      res.status(200).json(newuserData); //new userData
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
//Step2) Login Portion
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.name } });              

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });              
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password); //current user

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });              
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id; //current user_id is connected to current user 
      req.session.username = userData.username;//current username connected to current user
      req.session.logged_in = true; //logged in

      res.json({ user: userData, message: 'You are currently logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
//Step3) Logout portion
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
