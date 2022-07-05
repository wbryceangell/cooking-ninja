import { useLocation } from "react-router-dom";
import RecipeList from "../../components/RecipeList";
import useFetch from "../../hooks/useFetch";
import { RecipeData } from "../../types";
import "./Search.css";

interface Props {}

const Search: React.FC<Props> = ({}) => {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const term = queryParams.get("term");
  const url = `http://localhost:3001/recipes?q=${term}`;
  const { data: recipes, isPending, error } = useFetch<Array<RecipeData>>(url);

  return (
    <div className="search">
      <h2 className="page-title">Recipes including "{term}"</h2>
      {error && <p className="error">{error.message}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};

export default Search;
