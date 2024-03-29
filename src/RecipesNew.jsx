import { NewModal } from "./NewModal";
import { Link } from "react-router-dom";

export function RecipesNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateRecipe(params);
    event.target.reset();
    window.location.href = "/recipes";
  };
  return (
    <div>
      <div>
        <h3>New Recipe</h3>
        <Link to="/recipes" id="x">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            // style={{ position: "absolute", top: "100px", right: "100px" }}
            aria-label="Close"
          ></button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-md-4 mb-4">
            <label className="col-md-4 mb-2">Title</label>
            <input name="title" type="text" placeholder="Title" className="form-control" />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-4">
            <label className="col-md-4 mb-2">Ingredients</label>
            <input name="ingredients" type="text" placeholder="Ingredients" className="form-control" />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-4">
            <label className="col-md-4 mb-2">Directions</label>
            <input name="directions" type="text" placeholder="Directions" className="form-control" />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-4">
            <label className="col-md-4 mb-2">Time</label>
            <input name="time" type="text" placeholder="Time" className="form-control" />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-5">
            <label className="col-md-4 mb-2">Image</label>
            <input name="image" type="text" placeholder="Image" className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-secondary">
          Save
        </button>
      </form>
    </div>
  );
}
