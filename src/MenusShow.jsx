/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function MenusShow(props) {
  const params = useParams();
  const [eventMenu, setEventMenu] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/events/${params.menuId}.json`)
      .then((response) => {
        setEventMenu(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
        setEventMenu(null); // Set menu to null in case of an error
      });
  }, [params.menuId]); // Trigger the effect whenever menuId changes

  return (
    <div id="menus-show">
      <h1>{eventMenu.title}</h1>
      {eventMenu && eventMenu.recipes && eventMenu.recipes.length > 0 ? (
        <div
          className="row row-cols-1
        row-cols-md-2 row-cols-lg-3 g-4"
        >
          {eventMenu.recipes.map((recipe) => (
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
      ) : (
        <div>Add recipes!</div>
      )}
    </div>
  );
}
