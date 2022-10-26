import { BrowserRouter, Switch, Route } from "react-router-dom";

//imoprt useAuthContext hooks to trigger app render after user logged in
import { useAuthContext } from "./hooks/useAuthContext";

//pages & components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";

//styles
import "./App.css";

//
function App() {
  const { authIsReady } = useAuthContext();

  //prevent all the pages to load within BrowerRouter,not until
  //auth is ready, after we have an intial value for the user
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
