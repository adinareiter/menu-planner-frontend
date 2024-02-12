import { Link } from "react-router-dom";

export function RecipesIndex(props) {
  return (
    <div id="recipes-index">
      <div
        className="row row-cols-1
      row-cols-md-2 g-4"
      >
        <h1>Recipes</h1>
        <Link to="/recipes/new">
          <button
            id="add-button"
            type="button"
            className="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            +
          </button>
        </Link>
        {props.recipes.map((recipe) => (
          <div key={recipe.id}>
            <div className="card">
              <h5 className="text-bg-dark p-2">{recipe.title}</h5>
              <img src={recipe.image} />
              <button onClick={() => props.onShowRecipe(recipe)} className="btn btn-dark">
                Quick View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
