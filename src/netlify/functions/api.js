const express = require('express');  
const serverless = require('serverless-express');  
const cors = require('cors');  
const ProductController = require('../../controllers/productController');  
const createProductRoutes = require('../../routes/productRoutes');  

const app = express();  

// CORS configuration  
app.use(cors({  
  origin: ['*'],  // Allow all origins for testing  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization']  
}));  

app.use(express.json());  

const productController = new ProductController();  

// Base route for testing  
app.get('/', (req, res) => {  
  res.json({   
    message: 'Netlify serverless API is running!',  
    timestamp: new Date().toISOString()  
  });  
});  

app.use('/api/products', createProductRoutes(productController));  

// Error handling middleware  
app.use((err, req, res, next) => {  
  console.error(err.stack);  
  res.status(500).json({   
    error: 'Something went wrong!',  
    message: err.message   
  });  
});  

// Export handler for Netlify  
exports.handler = serverless(app);  