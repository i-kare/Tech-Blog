const Sequelize = require('../config/connections');
const seedUser = require('./userInfo');
const seedPost = require ('./postInfo');
const sequelize = require('../config/connections');


const seedAll = async () => { 
    await sequelize.sync({force:true});
    await seedUser();
    await seedPost();
    process.exit(0);
};

seedAll();