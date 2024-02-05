/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function MenusShow(props) {
  const params = useParams();
  const [menu, setMenu] = useState(null);
  const [menusWithSameEventName, setMenusWithSameEventName] = useState([]);

  useEffect(() => {
    // Fetch the menu data using params
    axios
      .get(`http://localhost:3000/menus/${params.menuId}.json`)
      .then((response) => {
        setMenu(response.data);
        console.log("Fetched menu:", response.data);

        // Once you have the 'event' from the specific menu, fetch menus with the same event name
        axios
          .get(`http://localhost:3000/menus.json`)
          .then((menusResponse) => {
            const menusWithSameEvent = menusResponse.data.filter(
              (menu) => menu.event.title === response.data.event.title
            );
            setMenusWithSameEventName(menusWithSameEvent);
            console.log("Menus with the same event name:", menusWithSameEvent);
          })
          .catch((menusError) => {
            console.error("Error fetching menus data:", menusError);
            setMenusWithSameEventName([]); // Set to an empty array in case of an error
          });
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
        setMenu(null); // Set menu to null in case of an error
      });
  }, [params.menuId]); // Trigger the effect whenever menuId changes

  if (!menu || !menu.event || !menu.recipe) {
    console.log(" menuId", params.menuId);
    // Handle the case where the data is not available
    return <div>No data available</div>;
  }
  const { event, recipe } = menu;

  return (
    <div>
      <h1>{event.title}</h1>
      {menusWithSameEventName.map((menu) => (
        <div key={menu.id}>
          <div className="card">
            <h5 className="text-bg-dark p-2">{menu.recipe.title}</h5>
            <img src={menu.recipe.image} />
            <button onClick={() => props.onShowRecipe(recipe)} className="btn btn-dark">
              Open
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
