import Cookies from "js-cookie";

import { Route, Redirect } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const token = Cookies.get("jwt_token");
  if (token === undefined) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoutes;
