const User = require('./User');
const Food = require('./Post');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Food.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Post };
