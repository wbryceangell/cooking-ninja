import useFetch from "../../hooks/useFetch";
import { RecipeData } from "../../types";
import "./Home.css";

interface Props { }

const Home: React.FC<Props> = ({ }) => {
  const {
    data: recipes,
    isPending,
    error,
  } = useFetch<Array<RecipeData>>("http://localhost:3001/recipes");
  return <div className="home">
    {error && (
      <p className="error">{error.message}</p>
    )}
    {isPending && (
      <p className="loading">Loading...</p>
    )}
    {recipes && recipes.map(recipe => (
      <h2 key={recipe.id}>{recipe.title}</h2>
    ))}
  </div>;
};

export default Home;
