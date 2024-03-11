// apiService.js
const apiUrlAll = 'https://dummyjson.com/products/category';
const apiUrlSingle = 'https://dummyjson.com/products';

const getProducts = async (category, priceRange) => {
  try {
    // Fetch all products based on the selected category
    const response = await fetch(`${apiUrlAll}/${category}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    console.log('Full API Response:', responseData);

    const data = responseData.products || [];


    
    if (priceRange) {
      switch (priceRange) {
        case 'low':
          return { products: data.filter((product) => product.price <= 1200) };
        case 'medium':
          return { products: data.filter((product) => product.price > 1200 && product.price <= 1500) };
        case 'high':
          return { products: data.filter((product) => product.price > 1500) };
        default:
          return { products: data };
      }
    }

    return { products: data };
  } catch (error) {
    throw new Error(`Error fetching filtered products: ${error.message}`);
  }
};


const getProductById = async (productId) => {
  try {
    const response = await fetch(`${apiUrlSingle}/${productId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching product by ID: ${error.message}`);
  }
};

const apiService = {
  getProducts,
  getProductById,
};

export default apiService;
