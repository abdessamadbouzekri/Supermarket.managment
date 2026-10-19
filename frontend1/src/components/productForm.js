import React, { useState } from 'react';

const ProductForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Other',
    price: '',
    quantity: '',
    description: '',
    supplier: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.quantity) {
      alert('Please fill in required fields');
      return;
    }

    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity)
    });

    setFormData({
      name: '',
      category: 'Other',
      price: '',
      quantity: '',
      description: '',
      supplier: ''
    });
  };

  return (
    <div className="product-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Product Name *"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Beverages">Beverages</option>
            <option value="Snacks">Snacks</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-row">
          <input
            type="number"
            name="price"
            placeholder="Price *"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity *"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="supplier"
          placeholder="Supplier (optional)"
          value={formData.supplier}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />

        <div className="form-actions">
          <button type="submit" className="submit-btn">Add Product</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;