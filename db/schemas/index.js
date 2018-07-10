// const sequelize = require('sequelize');
// const { connection } = require('../config');

// const Image = connection.define('image', {
//     id: {
//       type:  sequelize.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false
//     },
//     product_id: {
//       type: sequelize.INTEGER,
//       allowNull: false
//     },
//     is_primary: {
//       type: sequelize.INTEGER,
//       allowNull: false
//     },
//     s3_url: {
//       type: sequelize.STRING,
//       allowNull: false
//     }
//   },
//   {
//     timestamps: false
// });

// connection.sync()
//   .then(() => console.log('Synced schema to db'))
//   .catch((err) => console.log('Error syncing db,', err))

// module.exports = {
//   Image: Image
// }

