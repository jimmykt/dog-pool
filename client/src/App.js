import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import AddDog from "./pages/SignUpDogPage/SignUpDogPage";

import PorfilePage from "./pages/ProfilePage/ProfilePage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./pages/HomePage/HomePage";
// export const API_URL = process.env.REACT_APP_API_URL;
export const API_URL = "http://localhost:8080";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/add-dog/:id" component={AddDog} />
          <Route exact path="/profile" component={PorfilePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
