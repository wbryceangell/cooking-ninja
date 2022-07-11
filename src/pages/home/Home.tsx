import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RecipeList from "../../components/RecipeList";
import { firestore } from "../../firebase/config";
import { RecipeData } from "../../types";
import "./Home.css";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  const [recipes, setRecipes] = useState<Array<RecipeData>>();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error>();
  const location = useLocation<{ error?: Error } | undefined>();

  useEffect(() => {
    if (location?.state?.error) alert(location?.state?.error);
  }, [location]);

  useEffect(() => {
    setError(undefined);
    setRecipes(undefined);
    setIsPending(true);
    firestore
      .collection("recipes")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) throw new Error("No recipes to load");
        const recipes: Array<RecipeData> = [];
        snapshot.docs.forEach((doc) =>
          recipes.push({
            id: doc.id,
            ...(doc.data() as Omit<RecipeData, "id">),
          })
        );
        setIsPending(false);
        setRecipes(recipes);
      })
      .catch((error: Error) => {
        setIsPending(false);
        setError(error);
      });
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error.message}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};

export default Home;
