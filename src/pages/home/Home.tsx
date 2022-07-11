import { useEffect, useState } from "react";
import RecipeList from "../../components/RecipeList";
import { firestore } from "../../firebase/config";
import { RecipeData } from "../../types";
import "./Home.css";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  const [recipes, setRecipes] = useState<Array<RecipeData>>();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    return firestore.collection("recipes").onSnapshot(
      (snapshot) => {
        setError(undefined);
        setRecipes(undefined);
        if (snapshot.empty) {
          setIsPending(false);
          setError(new Error("No recipes to load"));
          return;
        }
        const recipes: Array<RecipeData> = [];
        snapshot.docs.forEach((doc) =>
          recipes.push({
            id: doc.id,
            ...(doc.data() as Omit<RecipeData, "id">),
          })
        );
        setIsPending(false);
        setRecipes(recipes);
      },
      (error) => {
        setRecipes(undefined);
        setIsPending(false);
        setError(error);
      }
    );
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
