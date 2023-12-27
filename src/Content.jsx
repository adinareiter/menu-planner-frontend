import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { RecipesIndex } from "./RecipesIndex";
import { RecipesNew } from "./RecipesNew";
import { Modal } from "./Modal";
import { RecipesShow } from "./RecipesShow";

export function Content() {
  const [recipes, setRecipes] = useState([]);
  const [isRecipesShowVisible, setIsRecipesShowVisible] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});

  const handleIndexRecipes = () => {
    console.log("handleIndexRecipes");
    axios.get("http://localhost:3000/recipes.json").then((response) => {
      console.log(response.data);
      setRecipes(response.data);
    });
  };

  const handleCreateRecipe = (params, successCallback) => {
    console.log("handleCreateRecipe", params);
    axios.post("http://localhost:3000/recipes.json", params).then((response) => {
      setRecipes([...recipes, response.data]);
      successCallback;
    });
  };

  const handleShowRecipe = (recipe) => {
    console.log("handleShowRecipe", recipe);
    setIsRecipesShowVisible(true);
    setCurrentRecipe(recipe);
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsRecipesShowVisible(false);
  };

  const handleUpdateRecipe = (id, params, successCallback) => {
    console.log("handleUpdateRecipe", params);
    axios.patch(`http://localhost:3000/recipes/${id}.json`, params).then((response) => {
      setRecipes(
        recipes.map((recipe) => {
          if (recipe.id === response.data.id) {
            return response.data;
          } else {
            return recipe;
          }
        })
      );
      successCallback();
      handleClose();
    });
  };

  const handleDestroyRecipe = (recipe) => {
    console.log("handleDestroyRecipe", recipe);
    axios.delete(`http://localhost:3000/recipes/${recipe.id}.json`).then((response) => {
      setRecipes(recipes.filter((r) => r.id !== recipe.id));
      handleClose();
    });
  };

  useEffect(handleIndexRecipes, []);

  // EventsIndex function
  const [events, setEvents] = useState([]);
  const handleIndexEvents = () => {
    console.log("handleIndexEvents");
    axios.get("http://localhost:3000/events.json").then((response) => {
      console.log(response.data);
      setEvents(response.data);
      // to use variable "events":
      // console.log(events);
    });
  };

  useEffect(handleIndexEvents, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/recipes" element={<RecipesIndex recipes={recipes} onShowRecipe={handleShowRecipe} />} />
        <Route path="/recipes/new" element={<RecipesNew onCreateRecipe={handleCreateRecipe} />} />
      </Routes>
      {/* <RecipesNew onCreateRecipe={handleCreateRecipe} /> */}
      {/* <RecipesIndex recipes={recipes} onShowRecipe={handleShowRecipe} /> */}
      <Modal show={isRecipesShowVisible} onClose={handleClose}>
        <RecipesShow
          recipe={currentRecipe}
          onUpdateRecipe={handleUpdateRecipe}
          onDestroyRecipe={handleDestroyRecipe}
          events={events}
        />
      </Modal>
    </div>
  );
}
