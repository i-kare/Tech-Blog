const {User} = require('../models');
const userinfo =[
    {"username":"username",
    "password":"password"},
    {"username":"name",
    "password":"pass"}];
const seedUser = () => User.bulkCreate(userinfo,{individualHooks:true,returning:true,});
module.exports = seedUser;