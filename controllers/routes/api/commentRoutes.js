const router = require('express').Router();
const {Comment} = require ('../../models'); 
const withAuth = require('../../utils/auth');

//Step1) 
router.get('/', withAuth, async (req, res) => {  //this is the initial comment that loads. This Comment-route is also looking for authentication
    try {
 //We will 1'st GET ALL 'Comments' for the dashboard. 
        const commentData = await Comment.findAll({
            where:{
                date_added: dayjs().format('MM/DD/YYYY'),
                user_id: req.session.user_id,
            },
            include:[
                {
                    model: User , //We're including 'user'
                    
                }
            ]

        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));  //were serializing 'comment' data 
res.render('individual-comment',{ //The res.render() function is used to render a view and sends the rendered HTML string to the client. 
    comments, //these are passed into the 'individual-comment' handlebar
...user,
logged_in:true,
});
    }catch (err) {
        res.status(500).json(err);
    }
});



//Create Comment
router.comment('/', withAuth, async (req, res) => {
    try {
      const newcommentData = await Comment.create({
          username:req.body.username,
         password:req.body.password});
  
      req.session.save(() => {
        req.session.user_id = newcommentData.id;   //connecting user_id with new comment
        req.session.username = newcommentData.username; //connecting username w/new comment
        req.session.logged_in = true; //logged in
  
        res.status(200).json(newcommentData); //new comment Data
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });