import React, { useState, useEffect } from 'react';
import ProductForm from './components/productForm';
import ProductList from './components/productList';
import { productAPI } from './services/api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProducts();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      const response = await productAPI.createProduct(productData);
      setProducts([response.data, ...products]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add product');
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      const response = await productAPI.updateProduct(id, updates);
      setProducts(products.map(product => 
        product._id === id ? response.data : product
      ));
    } catch (err) {
      setError('Failed to update product');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productAPI.deleteProduct(id);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(product => {
    if (filter === 'lowStock') return product.quantity < 10;
    if (filter === 'all') return true;
    return product.category === filter;
  });

  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.quantity < 10).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="app">
      <header className="app-header">
        <h1>🛒 Supermarket Management</h1>
        <p>Simple inventory management system</p>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="stats">
        <div className="stat-card">
          <h3>{totalProducts}</h3>
          <p>Total Products</p>
        </div>
        <div className="stat-card">
          <h3>{lowStockProducts}</h3>
          <p>Low Stock</p>
        </div>
        <div className="stat-card">
          <h3>${totalValue.toFixed(2)}</h3>
          <p>Total Value</p>
        </div>
      </div>

      <div className="controls">
        <button 
          className="add-btn" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '❌ Cancel' : '➕ Add Product'}
        </button>

        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Products</option>
          <option value="lowStock">Low Stock</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {showForm && (
        <ProductForm 
          onSubmit={addProduct} 
          onCancel={() => setShowForm(false)} 
        />
      )}

      <ProductList 
        products={filteredProducts}
        onUpdate={updateProduct}
        onDelete={deleteProduct}
      />
    </div>
  );
}

export default App;
