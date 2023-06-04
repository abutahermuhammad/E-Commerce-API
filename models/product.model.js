const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: String,
  title: String,
  slug: String,
  price: {
    regular: Number,
    special: Number,
  },
  thumbnail: {
    url: String,
    alt: String,
    title: String,
  },
  gallary: [
    {
      title: String,
      url: String,
      alt: String,
    },
  ],
});

module.exports = mongoose.model('Product', productSchema);
