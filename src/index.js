const express = require('express');  
const createProductRoutes = require('./routes/productRoutes');  
const ProductController = require('./controllers/productController');  

const app = express();  
app.use(express.json());  


const productController = new ProductController();  

app.use('/api/products', createProductRoutes(productController));  

const PORT = process.env.PORT || 3002;  
app.listen(PORT, () => {  
    console.log(`Server running on http://localhost:${PORT}`);  
});  