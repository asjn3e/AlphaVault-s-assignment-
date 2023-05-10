import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/store";

import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";

function NotFound() {
  return <h1>fuck you</h1>;
}
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
