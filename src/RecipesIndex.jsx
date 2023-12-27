export function RecipesIndex(props) {
  return (
    <div id="recipes-index">
      <div
        className="row row-cols-1
      row-cols-md-2 g-4"
      >
        <h1>All recipes</h1>
        {props.recipes.map((recipe) => (
          <div key={recipe.id} className="col">
            <div className="card">
              <h2>{recipe.title}</h2>
              {/* <h4>Ingredients</h4>
            <li>{recipe.ingredients}</li>
            <h4>Directions</h4>
            <ol>{recipe.directions}</ol>
          <p>Time: {recipe.time}</p> */}
              <img src={recipe.image} />
              <button
                onClick={() => props.onShowRecipe(recipe)}
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
