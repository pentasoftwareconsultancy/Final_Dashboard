import React, { useState } from "react";
import Styles from "./Product.module.css";

function Product() {
  const [products, setProducts] = useState([
    { id: 1, name: "Google Pixel 7", category: "Phones", price: 699, quantity: 50 },
    { id: 2, name: "Google Pixel Buds", category: "Earbuds", price: 199, quantity: 150 },
    { id: 3, name: "Google Nest Hub", category: "Accessories", price: 129, quantity: 80 },
  ]);

  // State for controlling the visibility of popups and adding product form
  const [viewPopup, setViewPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [addProductForm, setAddProductForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // States for form fields
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const handleAction = (action, productId) => {
    const selected = products.find((product) => product.id === productId);
    setSelectedProduct(selected);

    switch (action) {
      case "View":
        setViewPopup(true);
        break;
      case "Edit":
        setEditPopup(true);
        break;
      case "Delete":
        setDeletePopup(true);
        break;
      default:
        break;
    }
  };

  const closePopup = () => {
    setViewPopup(false);
    setEditPopup(false);
    setDeletePopup(false);
    setAddProductForm(false);
    setSelectedProduct(null);
  };

  const handleAddProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([
      ...products,
      { id: newId, name: newProduct.name, category: newProduct.category, price: parseFloat(newProduct.price), quantity: parseInt(newProduct.quantity) },
    ]);
    closePopup();
  };

  return (
    <div className={Styles.Container}>
      {/* Header */}
      <div className={Styles.Header}>
        <h2>Products</h2>
        <button className={Styles.AddButton} onClick={() => setAddProductForm(true)}>Add Product</button>
      </div>

      {/* Add Product Form */}
      {addProductForm && (
        <div className={Styles.Popup}>
          <div className={Styles.PopupContent}>
            <h3>Add Product</h3>
            <form onSubmit={handleAddProductSubmit}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleAddProductChange}
                required
              />
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleAddProductChange}
                required
              />
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleAddProductChange}
                required
              />
              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleAddProductChange}
                required
              />
              <div>
                <button type="submit">Add Product</button>
                <button type="button" onClick={closePopup}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className={Styles.TableContainer}>
        <table className={Styles.Table}>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>${product.price}</td>
                <td>
                  <div className={Styles.Dropdown}>
                    <button className={Styles.DropdownButton} title="Actions">
                      &#8942; 
                    </button>
                    <div className={Styles.DropdownMenu}>
                      <div
                        className={Styles.DropdownItem}
                        onClick={() => handleAction("View", product.id)}
                      >
                        View
                      </div>
                      <div
                        className={Styles.DropdownItem}
                        onClick={() => handleAction("Edit", product.id)}
                      >
                        Edit
                      </div>
                      <div
                        className={Styles.DropdownItem}
                        onClick={() => handleAction("Delete", product.id)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Popup */}
      {viewPopup && selectedProduct && (
        <div className={Styles.Popup}>
          <div className={Styles.PopupContent}>
            <h3>View Product</h3>
            <p><strong>Product ID:</strong> {selectedProduct.id}</p>
            <p><strong>Product Name:</strong> {selectedProduct.name}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Popup */}
      {editPopup && selectedProduct && (
        <div className={Styles.Popup}>
          <div className={Styles.PopupContent}>
            <h3>Edit Product</h3>
            <form>
              <label>Name:</label>
              <input type="text" defaultValue={selectedProduct.name} />
              <label>Category:</label>
              <input type="text" defaultValue={selectedProduct.category} />
              <label>Price:</label>
              <input type="number" defaultValue={selectedProduct.price} />
              <label>Quantity:</label>
              <input type="number" defaultValue={selectedProduct.quantity} />
              <div>
                <button type="submit">Save</button>
                <button type="button" onClick={closePopup}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Popup */}
      {deletePopup && selectedProduct && (
        <div className={Styles.Popup}>
          <div className={Styles.PopupContent}>
            <h3>Delete Product</h3>
            <p>Are you sure you want to delete the product "{selectedProduct.name}"?</p>
            <div>
              <button onClick={() => setProducts(products.filter(p => p.id !== selectedProduct.id))}>Yes</button>
              <button onClick={closePopup}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
