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

          if (!uniqueEventIds.has(eventId)) {
            uniqueEventIds.add(eventId);

            return (
              <div key={menu.id}>
                <div className="card">
                  <Link to={`/menus/${menu.id}`} id="menus-index-button">
                    <h3>{menu.event.title}</h3>
                    <img src={menu.event.image} alt={menu.event.title} />
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
