import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import AddDog from "./pages/SignUpDogPage/SignUpDogPage";

import PorfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/signup/add-dog" component={AddDog} />

          <Route exact path="/profile" component={PorfilePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
