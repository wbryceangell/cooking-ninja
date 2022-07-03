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
      {recipe && <h1>{recipe.title}</h1>}
    </div>
  );
};

export default Recipe;
