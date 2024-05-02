

export default function CategorySelector({eventTypes,selectedCategory,handleCategoryChange}) {
    return(
        <div>
       <select
          name="category"
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="py-2 h-10 border border-black rounded-md"
        >
          <option value="">-- Choose a category --</option>
          {eventTypes.map((type, index) => {
            return (
              <option value={type.id} key={index}>
                {type.label}
              </option>
            );
          })}
        </select>
        </div>
    )

}