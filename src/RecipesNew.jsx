import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function RecipesNew(props) {
  // const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // setErrors([]);
    const params = new FormData(event.target);
    props.onCreateRecipe(params);
    event.target.reset();
    window.location.href = "/recipes";
    // axios.catch((error) => {
    //   console.log(error.response.data.errors);
    //   setErrors(error.response.data.errors);
    // });
  };
  return (
    <div>
      <div>
        <h3>New Recipe</h3>
        <Link to="/recipes" id="x">
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </Link>
      </div>
      {/* <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul> */}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-md-11 mb-4">
            <label className="col-md-4 mb-2">Title</label>
            <input name="title" type="text" placeholder="Title" className="form-control" />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-11 mb-4">
            <label className="col-md-4 mb-2">Ingredients</label>
            <input name="ingredients" type="text" placeholder="Ingredients" className="form-control" />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-11 mb-4">
            <label className="col-md-4 mb-2">Directions</label>
            <input name="directions" type="text" placeholder="Directions" className="form-control" />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-11 mb-4">
            <label className="col-md-4 mb-2">Minutes</label>
            <input name="time" type="text" placeholder="Minutes" className="form-control" />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-11 mb-5">
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
