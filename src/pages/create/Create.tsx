import { useRef, useState } from "react";
import "./Create.css";

type Props = {};

const Create: React.FC<Props> = ({}) => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<Array<string>>([]);
  const [disableAdd, setDisableAdd] = useState(true);
  const ingredientInput = useRef<HTMLInputElement>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(title, method, cookingTime, ingredients);
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setIngredient(value);
    if (value) setDisableAdd(false);
    else setDisableAdd(true);
  };
  const handleAdd: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const normalizedIngredient = ingredient.trim().toLowerCase();
    if (ingredients.includes(normalizedIngredient)) {
      alert(
        `${normalizedIngredient} is already a part of the ingredient list.`
      );
      return;
    }
    setIngredients((ingredients) => [...ingredients, normalizedIngredient]);
    setIngredient("");
    ingredientInput.current?.focus();
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              value={ingredient}
              onChange={handleChange}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd} disabled={disableAdd}>
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:
          {ingredients.map((ingredient) => (
            <em key={ingredient}>{ingredient}</em>
          ))}
        </p>
        <label>
          <span>Recipe method:</span>
          <textarea
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            required
          />
        </label>
        <button className="btn">submit</button>
      </form>
    </div>
  );
};

export default Create;
