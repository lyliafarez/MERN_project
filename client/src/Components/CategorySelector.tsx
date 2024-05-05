import React from "react";

interface CategorySelectorProps {
  eventTypes: { id: string; label: string }[];
  selectedCategory: string;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  eventTypes,
  selectedCategory,
  handleCategoryChange,
}) => {
  return (
    <div>
      <select
        name="category"
        id="category-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="py-2 h-10 border border-black rounded-md"
      >
        <option value="">-- Choose a category --</option>
        {eventTypes.map((type, index) => (
          <option value={type.id} key={index}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
