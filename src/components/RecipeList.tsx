import { Link, useHistory, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { RecipeData } from "../types";
import trashcanIcon from "../assets/trashcan.svg";
import "./RecipeList.css";
import { firestore } from "../firebase/config";

type Props = {
  recipes: Array<RecipeData>;
};

const RecipeList: React.FC<Props> = ({ recipes }) => {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return <div className="error">No recipes to display...</div>;
  }

  const handleClick = (id: string) => {
    firestore
      .collection("recipes")
      .doc(id)
      .delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            className="delete"
            src={trashcanIcon}
            onClick={() => handleClick(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
