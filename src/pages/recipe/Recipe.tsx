import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { RecipeData } from "../../types";
import "./Recipe.css";

type Props = {};

const Recipe: React.FC<Props> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const {
    data: recipe,
    isPending,
    error,
  } = useFetch<RecipeData>(`http://localhost:3001/recipes/${id}`);
  return (
    <div className="recipe">
      {error && <p className="error">{error.message}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
};

export default Recipe;
