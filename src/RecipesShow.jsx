/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";

export function RecipesShow(props) {
  console.log("recipe", props.recipe);

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
  const [eventReal, setEventReal] = useState({});

  const [menu, setMenu] = useState({});
  const handleCreateMenu = (params) => {
    console.log("event", eventReal);
    console.log("handleCreateMenu", params);
    const data = {
      recipe_id: props.recipe.id,
      event_id: eventReal.id,
    };
    console.log(data);
    axios
      .post("http://localhost:3000/menus.json", data)
      .then((response) => {
        console.log(response.data);
        console.log(menu);
      })
      .catch((error) => {
        console.error("Error creating menu", error);
      });
    // I want the radio to go blank and the page to reroute to /menus but it doesn't work
    // params.target.reset();
    window.location.href = `/menus/${eventReal.id}`;
  };

  return (
    <div>
      <h3>{props.recipe.title}</h3>
      <p>
        Ingredients:{" "}
        <ul>
          {props.recipe.ingredients_list.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </p>
      <p>
        Directions:
        <ol>
          {props.recipe.directions_list.map((direction) => (
            <li key={direction}>{direction}</li>
          ))}
        </ol>
      </p>
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
                <input
                  type="radio"
                  value={event.id}
                  name="selectedEvent"
                  checked={eventReal.id === event.id}
                  onChange={() => setEventReal(event)}
                />
                <label>{event.title}</label>
              </div>
            ))}
            <button onClick={handleCreateMenu}>Create Menu</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
