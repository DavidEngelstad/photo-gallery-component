const mongoose = require('mongoose');
// const db = mongoose.connect('mongodb://localhost/product_images');
const db = mongoose.connect('mongodb://13.57.26.40:27017/product_images');
// const { Image } = require('../../db/schemas/index.js');
const { Photo } = require('../../db/schemas/mongoModel.js');

const imageModel = {
  get: (product_id, callback) => {
      // console.log('Here...', product_id);
      Photo.find()
        .where('product_id').equals(product_id)
        .lean()
        .then(data => {
          // console.log('Data in image model...', data);
          callback(null, data);
        })
        .catch(err => {
          // console.log('Error getting data...', err);
          callback(err, null);
        })
  },
  post: (data, callback) => {
      console.log('imageModel.post....', data);
      const image = new Photo(data);
      image.save()
        .then(data => {
          console.log('Image succesfully posted to the database...', data);
          callback(null, data);
        })
        .catch(err => {
          console.log('Error posting to the database in Model...', err);
          callback(err, null);
        })
    },
    update: (id, params, callback) => {
      console.log('Hit update endpoint...', id);
      Photo.findOneAndUpdate({_id: id}, params)
        .then(data => {
          console.log('Successfully updated record...', data);
          callback(null, data);
        })
        .catch(err => {
          console.log('Error updating record...', err);
          callback(err, null);
        })
    },
    delete: (id, callback) => {
      console.log('Hit delete endpoint...', id);
      Photo.deleteOne({_id: id})
        .then(data => {
          console.log('Successfully deleted record...', data);
          callback(null, data);
        })
        .catch(err => {
          console.log('Error deleting record...', err);
          callback(err, null);
        })
    }
}

module.exports = {
  imageModel: imageModel
}