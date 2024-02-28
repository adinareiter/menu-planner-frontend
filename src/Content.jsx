import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { RecipesIndex } from "./RecipesIndex";
import { RecipesNew } from "./RecipesNew";
import { Modal } from "./Modal";
import { RecipesShow } from "./RecipesShow";
import { MenusIndex } from "./MenusIndex";
import { MenusShow } from "./MenusShow";

export function Content() {
  //Recipes:
  const [recipes, setRecipes] = useState([]);
  const [isRecipesShowVisible, setIsRecipesShowVisible] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});

  const handleIndexRecipes = () => {
    console.log("handleIndexRecipes");
    axios.get("http://localhost:3000/recipes.json").then((response) => {
      console.log(response.data);
      let data = response.data;
      setRecipes(data.reverse());
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
    });
  };

  useEffect(handleIndexEvents, []);

  // MenusIndex function
  const handleIndexMenus = () => {
    console.log("handleIndexMenus");
    axios.get("http://localhost:3000/menus.json").then((response) => {
      console.log(response.data);
      setMenus(response.data);
    });
  };
  useEffect(handleIndexMenus, []);
  // useEffect(() => {
  //   handleIndexMenus();
  // }, []);

  // MenusShow function
  const [menus, setMenus] = useState([]);
  // const [isMenusShowVisible, setIsMenusShowVisible] = useState(false);
  const [currentMenu, setCurrentMenu] = useState({});

  const handleShowMenu = (menu) => {
    console.log("handleShowMenu", menu);
    // setIsMenusShowVisible(true);
    setCurrentMenu(menu);
  };

  //Menus Modal
  // const [isMenusShowVisible, setIsMenusShowVisible] = useState(false);
  // const [currentMenu, setCurrentMenu] = useState({});

  // const handleShowMenu = (menu) => {
  //   console.log("handleShowMenu", menu);
  //   setIsMenusShowVisible(true);
  //   setCurrentMenu(menu);
  // };

  // const handleMenuClose = () => {
  //   console.log("handleClose");
  //   setIsMenusShowVisible(false);
  // };

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/recipes"
          element={
            <RecipesIndex
              recipes={recipes}
              eventMenus={events}
              onUpdateRecipe={handleUpdateRecipe}
              onShowRecipe={handleShowRecipe}
              onDestroyRecipe={handleDestroyRecipe}
            />
          }
        />
        <Route path="/recipes/new" element={<RecipesNew onCreateRecipe={handleCreateRecipe} />} />
        <Route path="/menus" element={<MenusIndex eventMenus={events} onShowMenu={handleShowMenu} />} />
        <Route path="/menus/:menuId" element={<MenusShow menu={currentMenu} onShowRecipe={handleShowRecipe} />} />
      </Routes>
      <Modal show={isRecipesShowVisible} onClose={handleClose}>
        <RecipesShow
          recipe={currentRecipe}
          onUpdateRecipe={handleUpdateRecipe}
          onDestroyRecipe={handleDestroyRecipe}
          events={events}
        />
      </Modal>
      {/* <Modal show={isMenusShowVisible} onClose={handleMenuClose}>
        <MenusShow menu={currentMenu} />
      </Modal> */}
    </div>
  );
}
