const router = require('express').Router();
const { Post, User, Comment } = require('../../models');//homeroutes is initializs the 'post'
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connections.js');
const dayjs = require('dayjs');

//Step 1) Get a individual user and their respecective post(s). 1 to Many.
router.get('/', withAuth, async (req, res) => {  //this is the initial page that loads. This homeroute is looking for authentication
   try {

//Below we will: Find the logged in user based on the session ID; in other words search that database for a 'user' with an id that matches the foloowing parameters. 
  //const userData = await User.findByPk(req.session.user_id, { //First, we're loading up the 'users', and we're fetching the data by primary key a.k.a PK
       
    //attributes: { exclude: ['password'] }, //why exclude the password???
        
    //include: [{ model:Post}], //we're joining the specific user with respective 'Post'
    // });




   const postData = await Post.findAll({ //GET all 'Post' for the homepage 
       where: {
        date_added: dayjs().format('MM/DD/YYYY'),
        user_id: req.session.user_id,
       },
       attributes: [
        'id',
        'title',
        'content',
        'date_added',
       ],
      include: [
        {
          model: User, //we're joining the posts with 'User'. In other words, were including 'user' for each post
          attributes: ['username'], 
        },
        {model: Comment,
          attributes: [
            'comment_text',
          'id',
          'post_id',
          'user_id',
          'date_added',
        ],
        include: {
          model: User,
          attributes: ['username'],
        }

        },
       ],
     });


     
const posts = postData.map((post) => post.get({ plain: true }));  //were serializing 'post' data 
//const user = userData.get({ plain: true }); //// We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need.  
///calling get fxn on 'userData'. calling the get fxn on 'user Data' will allow us to serialize the data. 
     res.render('all-posts-per-user', {//i.e homepage // when were rending were passing the list of 'posts' to our 'All_posts_per_user' page handlebar
                              //In other words: the 'All_posts_per_user' template (i.e handlabar) is rendered, then the listed is passed into the template
          posts,
       //...User,
       logged_in: req.session.logged_in //we're passing the logged_in session to the handlebar
     });
  } catch (err) {
    res.status(500).json(err);
   }
});




//Step2) //Get a individual post and it's respective user. 1 to 1
router.get('/post/:id', (req, res) => { //getting post by id and authenticating
   try { //using sql database we search the database for a 'post' with an id that matches the params below
     console.log(req.params.id);
     const postData = await Post.findByPk(req.params.id, { 
      //we load posts and fetch data by primary key. 
      where: {
        date_added: dayjs().format('MM/DD/YYYY'),
        id: req.params.id
      },
      include: [ //we're joining the specific posts with 'user'.  In other words, were including 'user' for each post
         User,
         {
           model: Comment,
           include: [User],
           //attributes: ['username'],
         },
       ],
     });

     if (postData) {
     const post = postData.get({ plain: true }); //Calling the GET fxn to get the data back then serialize the information about the data.  We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need. 
     res.render('each-post-per-user', {//Sending the 'post' information to our handlebar i.e rendering to our 'each_post_per_user' handlebar
       post,
       logged_in: req.session.logged_in,}); 
    } else {
      res.status(404).json({message: 'No post found with this id'});
      return;
    }
   } catch (err) { //if there's an error then 500 will be returned to users
     res.status(500).json(err);
   }
});

//Step 3) Login routes 
router.get('/login', (req, res) => {
   // If the user is already logged in, redirect the request to another route
   if (req.session.logged_in) {
     res.redirect('/');
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
//Render the signup
module.exports = router;
