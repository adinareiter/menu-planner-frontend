export function RecipesIndex(props) {
  return (
    <div>
      <h1>All recipes</h1>
      {props.recipes.map((recipe) => (
        <div key={recipe.id}>
          <h1>{recipe.title}</h1>
          <h3>Ingredients</h3>
          <p>{recipe.ingredients}</p>
          <h3>Directions</h3>
          <p>{recipe.directions}</p>
          <p>Time: {recipe.time}</p>
          <img src={recipe.image} />
          <button>View Recipe</button>
        </div>
      ))}
    </div>
  );
}
