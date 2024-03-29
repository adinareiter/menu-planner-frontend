import { useState } from "react";
import axios from "axios";

export function NewModal(props) {
  console.log("recipe", props);

  //editable form is invisible
  const [isEditable, setIsEditable] = useState(false);

  //opens editable form
  const handleEdit = () => {
    setIsEditable(true);
    console.log("test");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateRecipe(props.recipe.id, params, () => event.target.reset());
    // want to refresh modal to update recipe automatically:
    // window.location.href = "/recipes";
    setIsEditable();
  };

  const handleClick = () => {
    props.onDestroyRecipe(props.recipe);
    window.location.href = `/recipes`;
  };

  // event index
  const [eventIndex, setEventIndex] = useState(false);

  // connecting Add Menu button to event index
  const toggleMenuButton = () => {
    setEventIndex(!eventIndex);
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

  const [confirmDeletion, setConfirmDeletion] = useState(false);
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
              <button
                onClick={() => {
                  setEventIndex(false);
                  setIsEditable(false);
                  setConfirmDeletion(false);
                }}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {props.recipe && props.recipe.id ? (
              isEditable ? (
                <div>
                  <form onSubmit={handleSubmit}>
                    <div>
                      Title: <input defaultValue={props.recipe.title} name="title" type="text" placeholder="title" />
                      Ingredients:
                      <input
                        defaultValue={props.recipe.ingredients}
                        name="ingredients"
                        type="text"
                        placeholder="ingredients"
                      />
                      Directions:
                      <input
                        defaultValue={props.recipe.directions}
                        name="directions"
                        type="text"
                        placeholder="directions"
                      />
                      Time:
                      <input defaultValue={props.recipe.time} name="time" type="text" placeholder="time" />
                      Image address
                      <input defaultValue={props.recipe.image} name="image" type="text" placeholder="image" />
                    </div>
                    <button onClick={() => setIsEditable(false)}>Cancel</button>
                    <button type="submit">Save</button>
                  </form>
                </div>
              ) : confirmDeletion ? (
                <div> Are you sure you want to delete this recipe? </div>
              ) : (
                <div className="modal-body">
                  {/* <div className="modal-dialog-scrollable"> */}
                  <h5>
                    Ingredients: <i onClick={handleEdit} className="bi bi-pencil-square pl-4" type="button"></i>
                  </h5>

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
                    <h5
                      onClick={toggleMenuButton}
                      // type="button"
                      // className="btn btn-outline-dark"
                    >
                      Add to an event
                      <i id="arrow" type="button" className="bi bi-caret-down-fill btn btn-outline-dark"></i>
                    </h5>
                    {eventIndex === true ? (
                      <>
                        {props.events.map((event) => (
                          <div
                            // className="form-check"
                            key={event.id}
                          >
                            <input
                              // className="form-check-input"
                              type="radio"
                              value={event.id}
                              name="selectedEvent"
                              // name="flexRadioDefault"
                              // id="flexRadioDefault1"
                              checked={eventReal.id === event.id}
                              onChange={() => setEventReal(event)}
                            />
                            <label
                            // className="form-check-label"
                            >
                              {event.title}
                            </label>
                          </div>
                        ))}
                        <button onClick={handleCreateMenu} className="btn btn-outline-dark" id="event-save">
                          Save
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                // </div>
              )
            ) : (
              <></>
            )}
            <div className="modal-footer">
              {/* close button */}
              {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button> */}
              {confirmDeletion ? (
                <div>
                  <button
                    onClick={() => setConfirmDeletion(false)}
                    className="btn btn-outline-primary"
                    id="cancel-deletion"
                  >
                    Cancel
                  </button>
                  <button onClick={handleClick} className="btn btn-danger" id="delete">
                    Delete
                  </button>
                </div>
              ) : (
                <i onClick={() => setConfirmDeletion(true)} className="bi bi-trash3-fill btn btn-danger"></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
