
import axios from 'axios';
import Product from '../models/Product.js'

const API_ENDPOINT = 'https://dummyjson.com/products/search?q=phone'

const getProducts = async (req, res) => {

  try {
    const response = await axios.get(API_ENDPOINT);
    const products = response.data;

    await Product.insertMany(products);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export default getProducts;