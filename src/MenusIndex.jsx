import { Link } from "react-router-dom";
export function MenusIndex(props) {
  return (
    <div id="menus-index">
      <h1>Menus</h1>
      <div
        className="row row-cols-1
      row-cols-md-2 g-4"
      >
        {props.eventMenus.map((eventMenu) => (
          <div key={eventMenu.id}>
            <div className="card">
              <Link to={`/menus/${eventMenu.id}`} id="menus-index-button">
                <h3 className="text-bg-dark p-2">{eventMenu.title}</h3>
                <img src={eventMenu.image} alt={eventMenu.title} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
