const router = require('express').Router();
const { Post } = require('../../../models');
const withAuth = require('../../../utils/auth');

            const dayjs = require('dayjs');


//CRUD!!!!!! for Posts


//Create
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      date_added: dayjs().format('MM/DD/YYYY'),
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update

router.put('/:id', withAuth, async (req, res) => {
  //update comments by 'id' value
  try {
    const [chosenPosts] = await Post.update({
      where:{
        id: id.req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!chosenPosts) {
      res.status(404).json({ message: 'No post(s) updated with this id!' });
      return;
    }
    res.status(200).json.end();
  } catch (err) {
    res.status(500).json(err);
  }
});



//Delete
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post(s) found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
