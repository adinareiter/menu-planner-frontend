import { Link } from "react-router-dom";

export function RecipesIndex(props) {
  return (
    <div id="recipes-index">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="m-0">Recipes</h1>
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
      </div>
      <div
        className="row row-cols-1
          row-cols-md-2 row-cols-lg-3 g-4"
      >
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
