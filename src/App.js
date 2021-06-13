import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { LeftContainer, MainContainer, RightContainer } from "./containers";
import { AuthContext } from "./stateHandling/contexts/AuthContext";
import { StateContext } from "./stateHandling/contexts/StateContext";
import { getCourses } from "./stateHandling/utils/serverRequests";
import "./App.scss";

function App() {
  const { dispatch } = useContext(StateContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getCourses(dispatch);
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        <LeftContainer />
        <MainContainer />
        {user && <RightContainer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
