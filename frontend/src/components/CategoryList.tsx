import "./styles/CategoryList.css";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface CategoryListProps {
  onSelectCategory: (id: number) => void;
  selectedCategory: number | null;
}

const CategoryList: React.FC<CategoryListProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategoryClick = () => {
    setShowAddCategoryForm(!showAddCategoryForm);
  };

  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/categories", {
        name: newCategory,
      });
      setNewCategory("");
      setShowAddCategoryForm(false);
      fetchCategories();
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8081/categories");
      console.log(response);
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch categories");
      setLoading(false);
    }
  };

  async function deleteCategory(categoryId: number, event: React.MouseEvent) {
    event.stopPropagation(); // Prevents the category selection from triggering
    try {
      await axios.delete(`http://localhost:8081/categories/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-list">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`category-item ${
            category.id === selectedCategory ? "selected" : ""
          }`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
          <ClearIcon onClick={(event) => deleteCategory(category.id, event)} />
        </div>
      ))}
      <button onClick={handleAddCategoryClick}>
        {showAddCategoryForm ? "Cancel" : "Add Category"}
      </button>
      {showAddCategoryForm && (
        <form onSubmit={handleAddCategorySubmit} className="add-category-form">
          <input
            type="text"
            value={newCategory}
            onChange={handleNewCategoryChange}
            placeholder="New Category Name"
            required
          />
          <button type="submit">Add Category</button>
        </form>
      )}
    </div>
  );
};

export default CategoryList;
