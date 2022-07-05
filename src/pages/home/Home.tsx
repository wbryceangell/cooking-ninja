import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import RecipeList from "../../components/RecipeList";
import useFetch from "../../hooks/useFetch";
import { RecipeData } from "../../types";
import "./Home.css";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  const {
    data: recipes,
    isPending,
    error,
  } = useFetch<Array<RecipeData>>("http://localhost:3001/recipes");
  const location = useLocation<{ error?: Error }>();

  useEffect(() => {
    const { error } = location?.state;
    if (error) alert(error.message);
  }, [location]);

  return (
    <div className="home">
      {error && <p className="error">{error.message}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};

export default Home;
