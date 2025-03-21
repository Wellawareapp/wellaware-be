const express = require('express');  
const cors = require('cors');  
const createProductRoutes = require('./routes/productRoutes');  
const ProductController = require('./controllers/productController');  

const app = express();  

// Add CORS middleware  
app.use(cors({  
  origin: ['*'], // Allow all origins for testing  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization']  
}));  

// Parse JSON bodies  
app.use(express.json());  

// Create product controller  
const productController = new ProductController();  

// Base route for testing  
app.get('/', (req, res) => {  
  res.json({   
    message: 'API is running!',  
    timestamp: new Date().toISOString()  
  });  
});  

// Setup product routes  
app.use('/api/products', createProductRoutes(productController));  

// Error handling middleware  
app.use((err, req, res, next) => {  
  console.error(err.stack);  
  res.status(500).json({   
    error: 'Something went wrong!',  
    message: err.message   
  });  
});  

// For local development  
if (require.main === module) {  
  const PORT = process.env.PORT || 3002;  
  app.listen(PORT, () => {  
    console.log(`Server running on http://localhost:${PORT}`);  
  });  
}  

module.exports = app;  