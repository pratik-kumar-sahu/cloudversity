import { LeftContainer, MainContainer, RightContainer } from "./containers";
import AuthContextProvider from "./contexts/AuthContext";
import CourseContextProvider from "./contexts/CourseContext";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <CourseContextProvider>
          <BrowserRouter>
            <LeftContainer />
            <MainContainer />
            <RightContainer />
          </BrowserRouter>
        </CourseContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
