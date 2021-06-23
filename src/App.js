import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { LeftContainer, MainContainer, RightContainer } from "./containers";
import { AuthContext } from "./stateHandling/contexts/AuthContext";
import "./App.scss";

function App() {
  const { user } = useContext(AuthContext);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty("--white", darkTheme ? "#9ca3af" : "#fff");
  }, [darkTheme]);

  return (
    <div className="app">
      <BrowserRouter>
        <LeftContainer darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <MainContainer />
        {/* {user && <RightContainer />} */}
        <RightContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
