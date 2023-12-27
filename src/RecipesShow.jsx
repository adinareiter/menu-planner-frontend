import axios from "axios";
import { useState, useEffect } from "react";

export function RecipesShow(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateRecipe(props.recipe.id, params, () => event.target.reset());
  };

  const handleClick = () => {
    props.onDestroyRecipe(props.recipe);
  };

  // event index
  const [eventIndex, setEventIndex] = useState(false);

  // connecting Add Menu button to event index
  const addMenuButton = () => {
    setEventIndex(true);
  };

  // Menu create action
  const [menus, setMenus] = useState([]);
  const handleCreateMenu = (params, successCallback) => {
    console.log("handleCreateMenu", params);
    axios
      .post("http://localhost:3000/menus.json", params)
      .then((response) => {
        setMenus([...menus, response.data]);
        successCallback();
      })
      .catch((error) => {
        console.error("Error creating menu", error);
      });
  };

  return (
    <div>
      <h3>{props.recipe.title}</h3>
      <p>Ingredients: {props.recipe.ingredients}</p>
      <p>Directions: {props.recipe.directions}</p>
      <p>Time: {props.recipe.time}</p>
      {/* <img src={props.recipe.image} /> */}
      <form onSubmit={handleSubmit}>
        <div>
          Title: <input defaultValue={props.recipe.title} name="title" type="text" placeholder="title" />
          Ingredients:
          <input defaultValue={props.recipe.ingredients} name="ingredients" type="text" placeholder="ingredients" />
          Directions:
          <input defaultValue={props.recipe.directions} name="directions" type="text" placeholder="directions" />
          Time:
          <input defaultValue={props.recipe.time} name="time" type="text" placeholder="time" />
          Image address
          <input defaultValue={props.recipe.image} name="image" type="text" placeholder="image" />
        </div>
        <button type="submit">Edit recipe</button>
      </form>
      <button onClick={handleClick}>Delete Recipe</button>
      <button onClick={addMenuButton}>Add to Menu</button>
      <div>
        {eventIndex === true ? (
          <>
            <h1>Which event would you like to create a menu for?</h1>
            {props.events.map((event) => (
              <div key={event.id}>
                <button onClick={handleCreateMenu}>{event.title}</button>
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
