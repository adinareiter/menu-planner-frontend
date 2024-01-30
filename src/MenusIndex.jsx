import { Link } from "react-router-dom";
export function MenusIndex(props) {
  const uniqueEventIds = new Set();
  return (
    <div id="menus-index">
      <div
        className="row row-cols-2
      row-cols-md-2 g-4"
      >
        <h1>Menus</h1>
        {props.menus.map((menu) => {
          const eventId = menu.event.id;
          //check if the event id is already added to the Set
          if (!uniqueEventIds.has(eventId)) {
            uniqueEventIds.add(eventId);

            return (
              <div key={menu.id}>
                <div className="card">
                  <Link to={`/menus/${menu.id}`} id="menus-index-button">
                    {/* <button id="menus-index-button"> */}
                    <h3>{menu.event.title}</h3>
                    <img src={menu.event.image} alt={menu.event.title} />
                    {/* check if menu has an associated recipe */}
                    {menu.recipe && (
                      <>
                        <p>{menu.recipe.title}</p>
                        {/* Add additional information about the recipe if needed */}
                        {/* <p>{menu.recipe.ingredients}</p> */}
                      </>
                    )}
                    {/* </button> */}
                  </Link>
                </div>
              </div>
            );
          }

          return null; // skip rendering if the event id is already added
        })}
      </div>
    </div>
  );
}
