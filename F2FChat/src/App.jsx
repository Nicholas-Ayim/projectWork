import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./ComponentRoutes/routes";
import Links from "./linkComponent/link";
import { socket, ContextApp } from "./contextComponent/context";

function App() {

  socket.emit("newCount", "counting");
  return (
    <>
      <ContextApp.Provider value={{socket}}>
        <Router>
          <Links />
          <Routes />
        </Router>
      </ContextApp.Provider>
    </>
  );
}

export default App;
