# Product Management API  

## Overview  

This project provides a backend API built with Firebase Firestore and Express for managing products. It includes features for creating, reading, updating, and deleting products (CRUD operations) and uses Zod for input validation.  

---  

## Project Features  

- **Firestore Integration**: Firestore is used as the database to store product data.  
- **Zod Validation**: Ensures that product data meets defined schema requirements before interacting with the database.  
- **REST API**: Provides standard REST API endpoints for product CRUD operations.  
- **Express Framework**: Handles HTTP requests/responses and routes easily.  

---  

## Product Schema  

The `ProductSchema` ensures that all product data adheres to the following structure:  

| Field             | Type              | Description                                             | Constraints                         |  
|--------------------|-------------------|---------------------------------------------------------|-------------------------------------|  
| `id`              | String (UUID)     | Unique identifier for the product (optional).           | Auto-generated in Firestore.       |  
| `barcode`         | String            | Product barcode (optional).                             | None.                               |  
| `description`     | String            | Product description (optional).                         | None.                               |  
| `name`            | String            | Name of the product.                                    | Required (minimum length: 1).       |  
| `brand`           | String            | Brand name of the product.                              | Required (minimum length: 1).       |  
| `ingredients`     | Array(String)     | List of product ingredients (optional).                 | None.                               |  
| `certifications`  | Array(String)     | Certifications for the product (optional).              | None.                               |  
| `imageUrl`        | String            | URL for the product image (optional).                   | None.                               |  
| `metadata`        | Metadata Object   | Metadata fields like `createdAt`, `updatedAt`, etc.     | Defaults to `"admin-submission"`.  |  

---  

## API Endpoints  

### Base URL  
http://localhost:3002/api/products

sql

### Endpoints and Usage  

#### 1. Get All Products  
- **Method**: `GET`  
- **URL**: `/`  
- **Description**: Fetch all products from the database.  
- **Response**:  
  - `200 OK`: Returns an array of all products.  
  - Example Response:  
    ```json  
    [  
      {  
        "id": "unique-product-id",  
        "barcode": "1234567890",  
        "name": "Product Name",  
        "brand": "Product Brand",  
        "description": "Product description",  
        "imageUrl": "https://example.com/image.jpg",  
        "metadata": {  
          "createdAt": "2025-03-16T12:30:45Z",  
          "updatedAt": "2025-03-16T12:30:45Z",  
          "dataSource": "admin-submission"  
        }  
      }  
    ]  
    ```  

#### 2. Get Product by ID  
- **Method**: `GET`  
- **URL**: `/:id`  
- **Description**: Fetch a single product by its unique `id`.  
- **Response**:  
  - `200 OK`: Returns the product object.  
  - `404 Not Found`: Product not found in the database.  

#### 3. Create a New Product  
- **Method**: `POST`  
- **URL**: `/`  
- **Description**: Add a new product to the database.  
- **Request Body**:  
  ```json  
  {  
    "name": "Product Name",  
    "brand": "Brand Name",  
    "barcode": "1234567890",  
    "description": "This is a product description",  
    "ingredients": ["ingredient1", "ingredient2"],  
    "certifications": ["cert1", "cert2"],  
    "imageUrl": "https://example.com/image.png",  
    "metadata": {  
      "dataSource": "manufacturer"  
    }  
  }  
#### Example Json format

{  
  "id": "unique-product-id",  
  "name": "Product Name",  
  "brand": "Brand Name",  
  "description": "This is a product description",  
  "barcode": "1234567890",  
  "ingredients": ["ingredient1", "ingredient2"],  
  "certifications": ["cert1", "cert2"],  
  "imageUrl": "https://example.com/image.png",  
  "metadata": {  
    "dataSource": "manufacturer"  
  }  
}  
