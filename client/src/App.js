import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import AddDog from "./pages/SignUpDogPage/SignUpDogPage";
import PorfilePage from "./pages/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";
import PoolMePage from "./pages/PoolMePage/PoolMePage";

// export let API_URL = process.env.REACT_APP_API_URL;
export const API_URL = "http://localhost:8080";

console.log(API_URL);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/add-dog/:id" component={AddDog} />
          <Route exact path="/profile" component={PorfilePage} />
          <Route exact path="/pool-me/:id" component={PoolMePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
