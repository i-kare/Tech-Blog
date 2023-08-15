const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/user', userRoutes.js);
router.use('/post', postRoutes.js);
router.use('/comment', commentRoutes.js);
module.exports = router;
