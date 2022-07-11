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
    return firestore
      .collection("recipes")
      .doc(id)
      .onSnapshot(
        (doc) => {
          setError(undefined);
          setRecipe(undefined);
          if (!doc.exists) {
            setIsPending(false);
            setError(new Error("Could not find that recipe"));
            return;
          }
          setIsPending(false);
          setRecipe({
            id: doc.id,
            ...(doc.data() as Omit<RecipeData, "id">),
          });
        },
        (error) => {
          setRecipe(undefined);
          setIsPending(false);
          setError(error);
        }
      );
  }, [id]);

  const handleClick = () => {
    firestore
      .collection("recipes")
      .doc(id)
      .update({ title: "Something different" })
      .catch((error: Error) => {
        alert(error.message);
      });
  };

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
          <button onClick={handleClick}>update me</button>
        </>
      )}
    </div>
  );
};

export default Recipe;
