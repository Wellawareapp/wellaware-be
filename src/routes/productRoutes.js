const express = require('express');  

module.exports = (productController) => {  
  const router = express.Router();  

  // Health check route  
  router.get('/health', (req, res) => {  
    res.status(200).json({   
      status: 'healthy',   
      timestamp: new Date().toISOString()   
    });  
  });  

  router.get('/', async (req, res) => {  
    try {  
      const products = await productController.getAllProducts();  
      res.json(products);  
    } catch (error) {  
      console.error('Get products error:', error);  
      res.status(500).json({   
        error: 'Failed to retrieve products',  
        details: error.message   
      });  
    }  
  });  

  router.get('/:id', async (req, res) => {  
    try {  
      const product = await productController.getProductById(req.params.id);  
      res.json(product);  
    } catch (error) {  
      console.error('Get product error:', error);  
      res.status(404).json({   
        error: 'Product not found',  
        details: error.message   
      });  
    }  
  });  

  router.post('/', async (req, res) => {  
    try {  
      const newProduct = await productController.createProduct(req.body);  
      res.status(201).json(newProduct);  
    } catch (error) {  
      console.error('Create product error:', error);  
      res.status(400).json({   
        error: 'Failed to create product',  
        details: error.message   
      });  
    }  
  });  

  router.put('/:id', async (req, res) => {  
    try {  
      const updatedProduct = await productController.updateProduct(req.params.id, req.body);  
      res.json(updatedProduct);  
    } catch (error) {  
      console.error('Update product error:', error);  
      res.status(404).json({   
        error: 'Failed to update product',  
        details: error.message   
      });  
    }  
  });  

  router.delete('/:id', async (req, res) => {  
    try {  
      await productController.deleteProduct(req.params.id);  
      res.status(200).json({ message: 'Product deleted successfully' });  
    } catch (error) {  
      console.error('Delete product error:', error);  
      res.status(404).json({   
        error: 'Failed to delete product',  
        details: error.message   
      });  
    }  
  });  

  router.get('/brand/:brand', async (req, res) => {  
    try {  
      const products = await productController.getProductsByBrand(req.params.brand);  
      res.json(products);  
    } catch (error) {  
      console.error('Get products by brand error:', error);  
      res.status(500).json({   
        error: 'Failed to retrieve products by brand',  
        details: error.message   
      });  
    }  
  });  

  return router;  
};  