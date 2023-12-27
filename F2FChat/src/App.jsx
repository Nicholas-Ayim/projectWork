import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./ComponentRoutes/routes";
import Linkx from "./linkComponent/link";
import { socket, ContextApp } from "./contextComponent/context";

function App() {

  return (
    <>
      <ContextApp.Provider value={{socket}}>
        <Router>
        <Linkx/>
          <Routes />
        </Router>
      </ContextApp.Provider>
    </>
  );
}

export default App;
