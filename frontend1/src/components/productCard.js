import React, { useState } from 'react';

const ProductCard = ({ product, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    supplier: product.supplier || ''
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(product._id, {
      ...editData,
      price: parseFloat(editData.price),
      quantity: parseInt(editData.quantity)
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      supplier: product.supplier || ''
    });
    setIsEditing(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Fruits': '#ff6b6b',
      'Vegetables': '#51cf66',
      'Dairy': '#74c0fc',
      'Meat': '#ff8cc8',
      'Beverages': '#ffd43b',
      'Snacks': '#ff922b',
      'Other': '#868e96'
    };
    return colors[category] || '#868e96';
  };

  const isLowStock = product.quantity < 10;

  return (
    <div className={`product-card ${isLowStock ? 'low-stock' : ''}`}>
      <div className="product-header">
        <div 
          className="category-badge"
          style={{ backgroundColor: getCategoryColor(product.category) }}
        >
          {product.category}
        </div>
        <div className="product-actions">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="save-btn">💾</button>
              <button onClick={handleCancel} className="cancel-btn">❌</button>
            </>
          ) : (
            <>
              <button onClick={handleEdit} className="edit-btn">✏️</button>
              <button onClick={() => onDelete(product._id)} className="delete-btn">🗑️</button>
            </>
          )}
        </div>
      </div>

      <div className="product-info">
        {isEditing ? (
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({...editData, name: e.target.value})}
            className="edit-input"
          />
        ) : (
          <h3>{product.name}</h3>
        )}

        <div className="product-details">
          <div className="detail">
            <span>Price: $</span>
            {isEditing ? (
              <input
                type="number"
                step="0.01"
                value={editData.price}
                onChange={(e) => setEditData({...editData, price: e.target.value})}
                className="edit-input small"
              />
            ) : (
              <strong>{product.price.toFixed(2)}</strong>
            )}
          </div>

          <div className="detail">
            <span>Stock: </span>
            {isEditing ? (
              <input
                type="number"
                value={editData.quantity}
                onChange={(e) => setEditData({...editData, quantity: e.target.value})}
                className="edit-input small"
              />
            ) : (
              <strong className={isLowStock ? 'low-stock-text' : ''}>
                {product.quantity}
              </strong>
            )}
          </div>

          <div className="detail">
            <span>Value: $</span>
            <strong>{(product.price * product.quantity).toFixed(2)}</strong>
          </div>
        </div>

        {product.supplier && (
          <div className="supplier">
            <span>Supplier: </span>
            {isEditing ? (
              <input
                type="text"
                value={editData.supplier}
                onChange={(e) => setEditData({...editData, supplier: e.target.value})}
                className="edit-input"
              />
            ) : (
              product.supplier
            )}
          </div>
        )}

        {isLowStock && !isEditing && (
          <div className="low-stock-warning">
            ⚠️ Low Stock Alert!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;