import React from "react";
import TopNav from "./components/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Routes,
  Route,
  BrowserRouter,
  Link,
  useLocation,
} from "react-router-dom";

import About from "./components/About";
import AddUser from "./components/AddUser";
import Details from "./components/Details";
import Logout from "./components/Logout";
import Login from "./components/Login";
import View from "./components/View";

function App() {
  const loc = useLocation();
  return (
    <>
      <div>
        {/* <Sri/>
         */}
        {/* <TopNav /> */}
        {loc.pathname !== "/" && <TopNav />}
{/* <View/> */}
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/About" element={<About />} />

          <Route path="/AddUser" element={<AddUser />} />

          <Route path="/Details/View" element={<View />} />

          <Route path="/Details" element={<Details />} />
          
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

