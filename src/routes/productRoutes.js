const express = require('express');  

module.exports = function createProductRoutes(productController) {  
    const router = express.Router();  

    router.get('/', async (req, res) => {  
        try {  
            const products = await productController.getAllProducts();  
            res.json(products);  
        } catch (error) {  
            res.status(500).json({ error: error.message });  
        }  
    });  

    router.get('/:id', async (req, res) => {  
        try {  
            const product = await productController.getProductById(req.params.id);  
            res.json(product);  
        } catch (error) {  
            res.status(404).json({ error: error.message });  
        }  
    });  

    router.post('/', async (req, res) => {  
        try {  
            const newProduct = await productController.createProduct(req.body);  
            res.status(201).json(newProduct);  
        } catch (error) {  
            res.status(400).json({ error: error.message });  
        }  
    });  

    router.put('/:id', async (req, res) => {  
        try {  
            const updatedProduct = await productController.updateProduct(req.params.id, req.body);  
            res.json(updatedProduct);  
        } catch (error) {  
            res.status(400).json({ error: error.message });  
        }  
    });  

    router.delete('/:id', async (req, res) => {  
        try {  
            await productController.deleteProduct(req.params.id);  
            res.status(204).send();  
        } catch (error) {  
            res.status(500).json({ error: error.message });  
        }  
    });  

    router.get('/search/brand', async (req, res) => {  
        try {  
            const { brand } = req.query;  
            if (!brand) {  
                return res.status(400).json({ error: 'Brand query parameter is required' });  
            }  
            const products = await productController.getProductsByBrand(brand);  
            res.json(products);  
        } catch (error) {  
            res.status(500).json({ error: error.message });  
        }  
    });  

    return router;  
}  