import { useParams } from "react-router-dom";

export function MenusShow(props) {
  const { menuId } = useParams();

  console.log("MenusShow menuId:", menuId);
  console.log("MenusShow props:", props);

  if (!props.menu || !props.menu.event || !props.menu.recipe) {
    console.log("No data available for menuId", menuId);
    //Handle the  case where the data is not available
    return <div>No data available</div>;
  }
  const { event, recipe } = props.menu;

  return (
    <div>
      <h3>{event.title}</h3>
      <h3>Recipes:</h3>
      <p>{recipe.title}</p>
      {/* <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.recipe.title}</li>
        ))}
      </ul> */}
    </div>
    // <div>
    //   <h1>{props.menu ? props.menu.title : "No title available"}</h1>
    //   <h3>Welcome to my MenusShow page! Nothing on here yet!</h3>
    // </div>
  );
}
