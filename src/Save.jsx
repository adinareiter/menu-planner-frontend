/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function MenusShow() {
  const params = useParams();
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    //Fetch the menu data using params
    axios
      .get(`http://localhost:3000/menus/${params.menuId}.json`)
      .then((response) => {
        setMenu(response.data);
        console.log("Fetched menu:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
        setMenu(null); // Set menu to null in case of an error
      });
  }, [params.menuId]); //Trigger the effect whenever menuId changes

  if (!menu || !menu.event || !menu.recipe) {
    console.log(" menuId", params.menuId);
    //Handle the  case where the data is not available
    return <div>No data available</div>;
  }
  const { event, recipe } = menu;

  return (
    <div>
      <h3>{event.title}</h3>
      <h3>Recipes:</h3>
      <p>{recipe.title}</p>
      {/* {params.menu.recipes.map((recipe) => (
        <div key={recipe.id}>
          <p>{recipe.title}</p> */}
    </div>
    //   ))}
    // </div>
  );
}
