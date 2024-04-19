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
import { NewModal } from "./NewModal";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Account } from "./Account";
import { EventsNew } from "./EventsNew";
import { EventFormModal } from "./EventFormModal";

export function Content() {
  //Recipes:
  const [recipes, setRecipes] = useState([]);
  const [isRecipesShowVisible, setIsRecipesShowVisible] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});

  const handleIndexRecipes = () => {
    axios.get("http://localhost:3000/recipes.json").then((response) => {
      let data = response.data.reverse();
      setRecipes(data);
    });
  };

  // const [errors, setErrors] = useState([]);

  const handleCreateRecipe = (params, successCallback) => {
    // setErrors([]);
    axios.post("http://localhost:3000/recipes.json", params).then((response) => {
      setRecipes([...recipes, response.data]);
      successCallback;
    });
    // .catch((error) => {
    //   console.log(error.response.data.errors);
    //   setErrors(error.response.data.errors);
    // });
  };

  const handleShowRecipe = (recipe) => {
    setIsRecipesShowVisible(true);
    setCurrentRecipe(recipe);
  };

  const handleClose = () => {
    setIsRecipesShowVisible(false);
  };

  const handleUpdateRecipe = (id, params, successCallback) => {
    axios.patch(`http://localhost:3000/recipes/${id}.json`, params).then((response) => {
      setCurrentRecipe(response.data);
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
    axios.delete(`http://localhost:3000/recipes/${recipe.id}.json`).then((response) => {
      setRecipes(recipes.filter((r) => r.id !== recipe.id));
      handleClose();
    });
  };

  useEffect(handleIndexRecipes, []);

  // Events
  const [events, setEvents] = useState([]);
  const [eventsNewVisible, setEventsNewVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});

  const handleIndexEvents = () => {
    axios.get("http://localhost:3000/events.json").then((response) => {
      let data = response.data.reverse();
      setEvents(data);
    });
  };

  const handleShowEventsNew = (event) => {
    setEventsNewVisible(true);
  };

  const handleCloseEventsNew = () => {
    setEventsNewVisible(false);
  };

  const handleCreateEvent = (params, successCallback) => {
    axios.post("http://localhost:3000/events.json", params).then((response) => {
      setRecipes([...recipes, response.data]);
      successCallback;
    });
  };

  const handleUpdateEvent = (id, params, successCallback) => {
    axios.patch(`http://localhost:3000/events/${id}.json`, params).then((response) => {
      setCurrentEvent(response.data);
      setEvents(
        events.map((event) => {
          if (event.id === response.data.id) {
            return response.data;
          } else {
            return event;
          }
        })
      );
      successCallback();
      handleClose();
    });
  };

  const handleDestroyEvent = (event) => {
    axios.delete(`http://localhost:3000/events/${event.id}.json`).then((response) => {
      setRecipes(events.filter((e) => e.id !== event.id));
      handleClose();
    });
  };

  useEffect(handleIndexEvents, []);

  // MenusIndex function
  const handleIndexMenus = () => {
    axios.get("http://localhost:3000/menus.json").then((response) => {
      setMenus(response.data);
    });
  };
  useEffect(handleIndexMenus, []);

  // MenusShow function
  const [menus, setMenus] = useState([]);
  const [currentMenu, setCurrentMenu] = useState({});

  const handleShowMenu = (menu) => {
    setCurrentMenu(menu);
  };

  // users
  const [currentUser, setCurrentUser] = useState([]);
  const handleCurrentUser = () => {
    axios.get("http://localhost:3000/user.json").then((response) => {
      setCurrentUser(response.data);
    });
  };

  useEffect(handleCurrentUser, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account currentUser={currentUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login currentUser={currentUser} />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/recipes"
          element={
            <RecipesIndex
              recipes={recipes}
              eventMenus={events}
              onUpdateRecipe={handleUpdateRecipe}
              onShowRecipe={handleShowRecipe}
              onDestroyRecipe={handleDestroyRecipe}
              setCurrentRecipe={setCurrentRecipe}
            />
          }
        />
        <Route path="/recipes/new" element={<RecipesNew onCreateRecipe={handleCreateRecipe} />} />
        <Route
          path="/menus"
          element={<MenusIndex onShowEventsNew={handleShowEventsNew} eventMenus={events} onShowMenu={handleShowMenu} />}
        />
        <Route path="/menus/:menuId" element={<MenusShow menu={currentMenu} onShowRecipe={handleShowRecipe} />} />
      </Routes>
      <Modal showRecipe={isRecipesShowVisible} onClose={handleClose}>
        <RecipesShow
          recipe={currentRecipe}
          onUpdateRecipe={handleUpdateRecipe}
          onDestroyRecipe={handleDestroyRecipe}
          events={events}
        />
      </Modal>
      <EventFormModal showEventsNew={eventsNewVisible} onCloseEventsNew={handleCloseEventsNew}>
        <EventsNew
          onCreateEvent={handleCreateEvent}
          onUpdateEvent={handleUpdateEvent}
          onDestroyEvent={handleDestroyEvent}
        />
      </EventFormModal>
      <NewModal
        recipe={currentRecipe}
        events={events}
        onUpdateRecipe={handleUpdateRecipe}
        onDestroyRecipe={handleDestroyRecipe}
      ></NewModal>
    </div>
  );
}
