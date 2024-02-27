import { NewModal } from "./NewModal";

export function RecipesNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateRecipe(params);
    event.target.reset();
    window.location.href = "/recipes";
  };
  return (
    <div>
      <h1>New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="title" type="text" placeholder="Title" />
        </div>
        <div>
          <input name="ingredients" type="text" placeholder="Ingredients" />
        </div>
        <div>
          <input name="directions" type="text" placeholder="Directions" />
        </div>
        <div>
          <input name="time" type="text" placeholder="Time" />
        </div>
        <div>
          <input name="image" type="text" placeholder="Image" />
        </div>
        <button type="submit">Add recipe</button>
      </form>
    </div>
  );
}
