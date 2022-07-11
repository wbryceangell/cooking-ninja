import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase/config";
import { useTheme } from "../../hooks/useTheme";
import { RecipeData } from "../../types";
import "./Recipe.css";

type Props = {};

const Recipe: React.FC<Props> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const { mode } = useTheme();
  const [recipe, setRecipe] = useState<RecipeData>();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setError(undefined);
    setRecipe(undefined);
    setIsPending(true);
    firestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (!doc.exists) throw new Error("Could not find that recipe");
        setIsPending(false);
        setRecipe({
          id: doc.id,
          ...(doc.data() as Omit<RecipeData, "id">),
        });
      })
      .catch((error: Error) => {
        setIsPending(false);
        setError(error);
      });
  }, [id]);

  return (
    <div className={`recipe ${mode}`}>
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
