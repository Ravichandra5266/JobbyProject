import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";

import Home from "./components/Home";

import NotFound from "./components/NotFound";

import Jobs from "./components/Jobs";

import JobItemDetails from "./components/JobItemDetails";

import ProtectedRoutes from "./components/ProtectedRoutes";

import "./App.css";

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoutes exact path="/" component={Home} />
    <ProtectedRoutes exact path="/jobs" component={Jobs} />
    <ProtectedRoutes exact path="/jobs/:id" component={JobItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
);

export default App;
