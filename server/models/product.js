const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String,
    enum: ['Electronics', 'Men', 'Women', 'Grocery'],
    default: 'all',
   },
  image: { type: String },
  rating: { 
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);