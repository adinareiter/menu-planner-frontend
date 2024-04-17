export function EventsNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateEvent(params);
    event.target.reset();
    window.location.href = "/menus";
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateEvent(props.event.id, params, () => event.target.reset());
  };

  const handleClick = () => {
    props.onDestroyEvent(props.event);
  };
  return (
    <div>
      <h3>New Event</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-md-11 mb-4">
            <label className="col-md-4 mb-2">Title</label>
            <input name="title" type="text" placeholder="Title" className="form-control" />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-11 mb-4">
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
