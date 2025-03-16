const {   
  collection,   
  getDocs,   
  getDoc,   
  addDoc,   
  updateDoc,   
  deleteDoc,   
  doc,   
  query,   
  where   
} = require('firebase/firestore');  
const { firestoreDb } = require('../config/firebase');  

class ProductController {  
  constructor() {  
      this.collectionName = 'products';  
      this.collection = collection(firestoreDb, this.collectionName);  
  }  

  async getAllProducts() {  
      try {  
          const querySnapshot = await getDocs(this.collection);  
          return querySnapshot.docs.map(doc => ({  
              id: doc.id,  
              ...doc.data()  
          }));  
      } catch (error) {  
          throw new Error(`Failed to get products: ${error.message}`);  
      }  
  }  

  async getProductById(id) {  
      try {  
          const docRef = doc(firestoreDb, this.collectionName, id);  
          const docSnap = await getDoc(docRef);  

          if (!docSnap.exists()) {  
              throw new Error('Product not found');  
          }  

          return {  
              id: docSnap.id,  
              ...docSnap.data()  
          };  
      } catch (error) {  
          throw new Error(`Failed to get product: ${error.message}`);  
      }  
  }  

  async createProduct(productData) {  
      try {  
          const docRef = await addDoc(this.collection, productData);  
          return {  
              id: docRef.id,  
              ...productData  
          };  
      } catch (error) {  
          throw new Error(`Failed to create product: ${error.message}`);  
      }  
  }  

  async updateProduct(id, productData) {  
      try {  
          const docRef = doc(firestoreDb, this.collectionName, id);  
          const docSnap = await getDoc(docRef);  

          if (!docSnap.exists()) {  
              throw new Error('Product not found');  
          }  

          await updateDoc(docRef, productData);  

          return {  
              id,  
              ...productData  
          };  
      } catch (error) {  
          throw new Error(`Failed to update product: ${error.message}`);  
      }  
  }  

  async deleteProduct(id) {  
      try {  
          const docRef = doc(firestoreDb, this.collectionName, id);  
          const docSnap = await getDoc(docRef);  

          if (!docSnap.exists()) {  
              throw new Error('Product not found');  
          }  

          await deleteDoc(docRef);  
      } catch (error) {  
          throw new Error(`Failed to delete product: ${error.message}`);  
      }  
  }  

  async getProductsByBrand(brand) {  
      try {  
          const q = query(this.collection, where("brand", "==", brand));  
          const querySnapshot = await getDocs(q);  
          
          return querySnapshot.docs.map(doc => ({  
              id: doc.id,  
              ...doc.data()  
          }));  
      } catch (error) {  
          throw new Error(`Failed to get products by brand: ${error.message}`);  
      }  
  }  
}  

module.exports = ProductController;  