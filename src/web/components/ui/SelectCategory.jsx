const SelectCategory = ({ categories }) => (
  <div>
    <select>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  </div>
)

export default SelectCategory
