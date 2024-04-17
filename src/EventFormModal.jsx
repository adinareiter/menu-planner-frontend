import "./Modal.css";

export function EventFormModal(props) {
  if (props.showEventsNew) {
    return (
      <div className="modal-background">
        <section className="modal-main-events">
          {props.children}
          <button className="close" type="button" onClick={props.onCloseEventsNew}>
            &#x2715;
          </button>
        </section>
      </div>
    );
  }
}
