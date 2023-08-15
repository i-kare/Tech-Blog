const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

//Step 1) Routing all posts in general onto the dashboard page
router.get('/', withAuth, async (req, res) => { //this is the initial dashboard page that is looking for authentication. 
    try {
        const postData = await Post.findAll({ //GET all 'Post' for the dashboardpage 
            where: {
             date_added: dayjs().format('MM/DD/YYYY'),
             user_id: req.session.user_id,
            },
           include: [
             {
               model: User, //we're joining the posts with 'User'. In other words, were including 'user' for each post
               //attributes: ['name'], //Do we need this? I don't think so. 
             },
            ],
          });    
     const posts = postData.map((post) => post.get({ plain: true }));  //were serializing 'post' data 
     
     res.render('all-posts-in_general', { // when were rending were passing the list of 'posts' to our 'All_posts_in_general' page handlebar
        //In other words: the 'All_posts_in_general' template (i.e handlabar) is rendered, then the listed is passed into the template
        posts,
        logged_in: true,
});
} catch (err) {
res.status(500).json(err);
res.render('login');
}
});
   
//Step 2) When the user wants to create a post, render said new post
router.get('/create-new-post', withAuth, async (req, res) =>{
    res.render('create-post') //*TO DO: do I need to render a new layout? 
})


//Step 3) When the user wants to edit their post, render updated post
router.get ('/edit/:id'), withAuth , async (req, res) => { //Getting an 'edit' by id and authenticating, 
    try{ //, THEN search the database for an 'edit' with an id that match the 'post'  i.e the params below 
        console.log(req.params.id);
        const postData = await Post.findByPk(req.params.id);  
            //we load posts and fetch data by primary key. 
       
    
            const post =postData.get({plain:true});

        res.render('edit-post-page', {post});
    } catch (err) { //if there's an error then 500 will be returned to users
        res.status(500).json(err);
      }
   };

   module.exports = router;