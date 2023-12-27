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
              <h5 className="text-bg-dark p-2">{recipe.title}</h5>
              {/* <h4>Ingredients</h4>
            <li>{recipe.ingredients}</li>
            <h4>Directions</h4>
            <ol>{recipe.directions}</ol>
          <p>Time: {recipe.time}</p> */}
              <img src={recipe.image} />
              <button onClick={() => props.onShowRecipe(recipe)} className="btn btn-dark">
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
