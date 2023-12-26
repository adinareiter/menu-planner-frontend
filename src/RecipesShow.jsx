import axios from "axios";
import { useState, useEffect } from "react";

export function RecipesShow(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateRecipe(props.recipe.id, params, () => event.target.reset());
  };

  const [eventList, setEventList] = useState(false);

  const addMenuButton = () => {
    setEventList(true);
  };

  const handleClick = () => {
    props.onDestroyRecipe(props.recipe);
  };

  // const [events, setEvents] = useState([]);
  // const showEventsList = () => {
  //   axios.get("http://localhost:3000/events.json").then((response) => {
  //     console.log(response.data);
  //     setEvents(response.data);
  //   });
  // };

  return (
    <div>
      <h1>{props.recipe.title}</h1>
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
        {eventList === true ? (
          <>
            <h1>Which event would you like to create a menu for?</h1>
            {props.events.map((event) => (
              <div key={event.id}>
                <button>{event.title}</button>
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
