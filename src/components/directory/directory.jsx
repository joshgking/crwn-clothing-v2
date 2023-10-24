import "./directory.styles.scss";
import Category from "../category/category.component";

const Categories = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
