import React, { useState } from "react";
import Styles from "./Categories.module.css";

function Categories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Phones",
      description: "Latest smartphones",
      createdDate: "2025-01-10",
      updatedDate: "2025-01-12",
    },
    {
      id: 2,
      name: "Earbuds",
      description: "High-quality audio",
      createdDate: "2025-01-11",
      updatedDate: "2025-01-12",
    },
    {
      id: 3,
      name: "Accessories",
      description: "Phone accessories",
      createdDate: "2025-01-10",
      updatedDate: "2025-01-12",
    },
    {
      id: 4,
      name: "Watches",
      description: "Smart and stylish",
      createdDate: "2025-01-10",
      updatedDate: "2025-01-12",
    },
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [viewPopupVisible, setViewPopupVisible] = useState(false);
  const [viewCategory, setViewCategory] = useState(null);

  const handleAddCategory = () => {
    if (newCategory.trim() && newDescription.trim()) {
      const newId = categories.length ? categories[categories.length - 1].id + 1 : 1;
      const newCategoryObject = {
        id: newId,
        name: newCategory.trim(),
        description: newDescription.trim(),
        createdDate: new Date().toISOString().split("T")[0],
        updatedDate: new Date().toISOString().split("T")[0],
      };
      setCategories([...categories, newCategoryObject]);
      setNewCategory("");
      setNewDescription("");
      setPopupVisible(false);
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleEditCategory = (category) => {
    setNewCategory(category.name);
    setNewDescription(category.description);
    setPopupVisible(true);
  };

  const handleViewCategory = (category) => {
    setViewCategory(category);
    setViewPopupVisible(true);
  };

  return (
    <div className={Styles.Container}>
      {/* Header */}
      <div className={Styles.Header}>
        <h2>Categories</h2>
      </div>

      {/* Add Category Button */}
      <button
        onClick={() => setPopupVisible(true)}
        className={Styles.AddButton}
      >
        Add Category
      </button>

      {/* Category List */}
      <div className={Styles.ListContainer}>
        <table className={Styles.Table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Created Date</th>
              <th>Updated Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>{category.createdDate}</td>
                <td>{category.updatedDate}</td>
                <td>
                  <div className={Styles.Dropdown}>
                    <button className={Styles.DropdownButton} title="Actions">
                      &#8942;
                    </button>
                    <div className={Styles.DropdownMenu}>
                      <div
                        className={Styles.DropdownItem}
                        onClick={() => handleViewCategory(category)}
                      >
                        View
                      </div>
                      <div
                        className={Styles.DropdownItem}
                        onClick={() => handleEditCategory(category)}
                      >
                        Edit
                      </div>
                      <div
                        className={Styles.DropdownItem}
                        onClick={() => handleDeleteCategory(category.id)}
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

      {/* Add Category Popup Modal */}
      {popupVisible && (
        <div className={Styles.Popup}>
          <div className={Styles.PopupContent}>
            <h3>Add New Category</h3>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button onClick={handleAddCategory} className={Styles.AddButton}>
              Add Category
            </button>
            <button
              className={Styles.CancelButton}
              onClick={() => setPopupVisible(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* View Category Popup Modal */}
      {viewPopupVisible && viewCategory && (
        <div className={Styles.Popup}>
          <div className={Styles.PopupContent}>
            <h3>View Category</h3>
            <p><strong>Category Name:</strong> {viewCategory.name}</p>
            <p><strong>Description:</strong> {viewCategory.description}</p>
            <p><strong>Created Date:</strong> {viewCategory.createdDate}</p>
            <p><strong>Updated Date:</strong> {viewCategory.updatedDate}</p>
            <button
              className={Styles.CancelButton}
              onClick={() => setViewPopupVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
