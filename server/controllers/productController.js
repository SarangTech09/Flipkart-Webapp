const Product = require('../models/product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ message: 'No products found' });
    }
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.status(200).json({ message: 'Products fetched successfully', products});

  } catch (error) {
    console.error("Error fetching products:",error);
    return res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Get a product by ID
exports.getProductsById = async (req, res) => {
  try {
    const {productId} = req.params;
    if (!productId) {
      return res.status(404).json({ message: 'Product Id is required' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// Get products by category (category is a plain string in your schema)
exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryName = req.params.category;
    const products = await Product.find({ category: categoryName });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category', error });
  }
};

// check if product with same title exists 
exports.createProduct = async (req, res) => {
  try {
    const {title, description, price, category, image, rating} = req.body;

    if (!title || !description || !price || !category || !image || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const {rate, count} = rating;
    if (!rate || !count) {
      return res.status(400).json({ message: 'Rating and count are required' });
    }
    if (category !== 'Electronics' && category !== 'Men' && category !== 'Women' && category !== 'Grocery') {
      return res.status(400).json({ message: 'Invalid category' });
    }
    if ( price < 0) {
      return res.status(400).json({ message: 'Price must be greater than 0' });
    }
    const product = await Product.create({title, description, price, category, image, rating});

    res.status(201).json( { message: 'Product created successfully', product});
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Search title is required' });
    }

    // Case-insensitive partial match using regex
    const products = await Product.find({
      title: { $regex: title, $options: 'i' }
    });

    res.status(200).json({ message: 'Products found successfully', products });
  } catch (error) {
    res.status(500).json({ message: 'Error searching products', error });
  }
};
