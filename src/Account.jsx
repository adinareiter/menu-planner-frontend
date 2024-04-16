import { Logout } from "./Logout";
import { Login } from "./Login";

export function Account(props) {
  const jwt = localStorage.getItem("jwt");
  console.log("currentUser: ", props.currentUser);
  return (
    <div>
      {jwt ? (
        <div id="account">
          <h3 id="account-info">Account Info</h3>
          <p>User: {props.currentUser.name}</p>
          <p>Email: {props.currentUser.email}</p>
          <Logout>Logout</Logout>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
