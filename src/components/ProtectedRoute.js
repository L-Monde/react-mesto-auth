import { Route, Redirect } from "react-router-dom";
import Header from "./Header";

function ProtectedRoute({
  isLoggedIn,
  onLogOut,
  userEmail,
  component: Component,
  ...props
}) {
  return (
    <Route>
      <Header
        path="/sign-up"
        text="Выйти"
        isLoggedIn={isLoggedIn}
        onLogOut={onLogOut}
        userEmail={userEmail}
      />
      {isLoggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />}
    </Route>
  );
}

export default ProtectedRoute;

/*



*/
