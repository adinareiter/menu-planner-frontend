import { useState } from "react";
import axios from "axios";

export function NewModal(props) {
  console.log("recipe", props);

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
    window.location.href = `/menus/${eventReal.id}`;
  };
  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {props.recipe.title}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {props.recipe && props.recipe.id ? (
              <div className="modal-body">
                <h5>Ingredients: </h5>
                <ul>
                  {props.recipe.ingredients_list.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
                <h5>Directions:</h5>
                <ol>
                  {props.recipe.directions_list.map((direction) => (
                    <li key={direction}>{direction}</li>
                  ))}
                </ol>
                <p>Time: {props.recipe.time}</p>
                <div>
                  {eventIndex === true ? (
                    <>
                      <h5>Choose an event:</h5>
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
            ) : (
              <></>
            )}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={addMenuButton} type="button" className="btn btn-primary">
                Add to a Menu
              </button>
              <button onClick={handleClick} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
