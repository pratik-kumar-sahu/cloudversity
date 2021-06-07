import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LeftContainer from "./containers/LeftContainer";
import RightContainer from "./containers/RightContainer";
import Home from "./pages/Home/Home";
import "./App.scss";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <div className="app">
      <Router>
        <LeftContainer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
        <RightContainer />
      </Router>
    </div>
  );
}

export default App;
