const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const photoSchema = new Schema({
    product_id: Number,
    is_primary: Number,
    img_url: String,
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = {
    Photo
}