const {Post} = require('../models');
const postinfo =[
    {"postTitle":"title",
    "postInfo": "information",
    "userId":1},
    {"postTitle":"name",
    "postInfo": "information",
    "userId":2}];
const seedPost = () => Post.bulkCreate(postinfo,{individualHooks:true,returning:true,});
module.exports = seedPost;