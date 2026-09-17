// ============================================================================
// PART 11 — ARRAY PROP LEARNING COMPONENT (CategoryList.jsx)
// Receives: categories (Array of strings) via Props.
// Introduces array.map() at a basic level: "Go through each item and create JSX for it".
// ============================================================================

function CategoryList({ categories }) {
  return (
    <div className="categories-bar">
      <span className="categories-title">Civic Sectors:</span>
      {categories.map((categoryName, index) => (
        <span key={index} className="category-pill">
          {categoryName}
        </span>
      ))}
    </div>
  );
}

export default CategoryList;
