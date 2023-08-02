const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
//const sequelize = require('../config/connections');
//const dayjs = require('dayjs');

//Step 1) Users
router.get('/', withAuth, async (req, res) => {  //this is the initial page that loads. This homeroute is looking for authentication
   try {

//Below we will: Find the logged in user based on the session ID; in other words search that database for a 'user' with an id that matches the foloowing parameters. 
  const userData = await User.findByPk(req.session.user_id, { //First, we'll load up the 'users' and fetch the data by primary key a.k.a PK
       attributes: { exclude: ['password'] },
         include: [{ model:'name'}], //we're joining user with name 
     });
   const postData = await Post.findAll({ //GET all 'User' for the homepage
       where: {
        date_added: dayjs().format('MM/DD/YYYY'),
        user_id: req.session.user_id,
       },
      include: [
        {
          model: User, //We're including 'user'
          attributes: ['name'],
        },
       ],
     });

//     const totalCarbs = await Food.sum('carbs', {
//       where: {
//         date_added: dayjs().format('MM/DD/YYYY'), //can I use this somehow to add date to posts???
//         user_id: req.session.user_id,
//       },
//     });
//     //const totals = totalData.get({ plain: true });
     
const posts = postData.map((post) => post.get({ plain: true }));  //were serializing 'post' data 
const user = userData.get({ plain: true }); //// We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need.  
///calling get fxn on 'userData'. calling the get fxn on 'user Data' will allow us to serialize the data. 
     res.render('profile', { //the 'profile' template is rendered and the following is passed into the template
          posts,
       ...user,
       logged_in: true,
     });
  } catch (err) {
    res.status(500).json(err);
   }
});

//Step2) Mostly Posts
router.get('/post/:id', withAuth, async (req, res) => { //getting post by id and authenticating
   try { //using sql database we search the database for a 'post' with an id that matches the params below
     console.log(req.params.id);
     const postData = await Post.findByPk(req.params.id, { //we load posts and fetch data by primary key. We use sequelize to find posts
       include: [ //we're joining the specific posts with it's respective 'user'
         {
           model: User,
           attributes: ['name'],
         },
       ],
     });
     const post = postData.get({ plain: true }); //Calling the GET fxn to get the data back then serialize the information about the data.  We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need. 
     res.render('post', {//Sending the 'post' information to out handlebar i.e rendering to out 'post' handlebar
       ...post,
       logged_in: req.session.logged_in,
     });
   } catch (err) { //if there's an error then 500 will be returned to users
     res.status(500).json(err);
   }
});

//Step 3) Login routes 
router.get('/login', (req, res) => {
   // If the user is already logged in, redirect the request to another route
   if (req.session.logged_in) {
     res.redirect('/dashboard');
     return;
   }
   res.render('login');
});
router.get('/signup', (req, res) => {
       // If the user is already logged in, redirect the request to another route
       if (req.session.logged_in) {
         res.redirect('/dashboard');
      return;
       }
    
       res.render('signup');
    });
//Render the profile
router.get('/profile', withAuth, async (req, res) => {
   try {
    res.redirect('/profile');
   } catch (err) {
     res.status(500).json(err);
   }
});
module.exports = router;
