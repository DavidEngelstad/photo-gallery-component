const { imageModel } = require('../models/imageModel.js');
const { postToAWS } = require('../helpers/awsUpload');
let lastProductId = 1817940;
let lastImageId = 10000000

const imageController = {
  get: (req, res) => {
    // console.log(req.query);
    imageModel.get(req.query.productId, (err, data) => {
      if (err) {
        // console.log('GET imageController error,', err);
        res.send(err).status(400);
      }
      // console.log('GET imageController successful', data);
      res.send(data).status(200);
    })
  },
  post: (req, res) => {
    // let body = req.files[Object.keys(req.files)[0]].data;
    // let name = req.files[Object.keys(req.files)[0]].name;
    // let productId = Object.keys(req.files)[0].split(',')[1];
    // postToAWS(body, name, (err, data) => {
    //   if (err) {
    //     console.log('error making AWS Post request', err);
    //     res.send(err).status(500);
    //   }
    //   else {
    //     console.log('successfully posted to AWS');
    //     imageModel.post(productId, name, (err, results) => {
    //       if (err) {
    //         console.log('error posting to DB,', err);
    //         res.send(err).status(400);
    //       } else {
    //         console.log('successfully created record in db');
    //         res.send(results).status(201);
    //       }
    //     })
    //   }
    // })
    console.log(req.body);
    let primary = 0;
    if (!req.body.product_id) {
      req.body.product_id = lastProductId;
      lastProductId++;
      primary = 1;
    }
    let image = {
      product_id: req.body.product_id,
      is_primary: primary,
      img_url: `https://source.unsplash.com/random?sig=${lastImageId}`
    }
    lastImageId++;
    imageModel.post(image, (err, data) => {
      if (err) {
        console.log('Error in post product_id check...', err);
        res.send(err).status(400); 
      }
      console.log('Image post successful');
      res.send(data).status(201);
    })
  },
  update: (req, res) => {
    console.log('Here!!!!')
    imageModel.update(req.body._id, (err, data) => {
      if (err) {
        console.log('Error updating record...', err);
        res.send(err).status(400);
      }
      console.log('Image sucessfully updated...', data);
      res.send(data).status(200);
    })
  },
  delete: (req, res) => {
    imageModel.delete(req.body._id, (err, data) => {
      if (err) {
        console.log('Error deleting record...', err);
      }
      console.log('Image successfully deleted...', data);
      res.send(data).status(200)
    })
  } 
}

module.exports = {
  imageController: imageController
}