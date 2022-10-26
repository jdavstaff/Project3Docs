import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Cashier from "./pages/cashier/Cashier";
import Driver from "./pages/driver/Driver";
import Manager from "./pages/manager/Manager";
import Customer from "./pages/customer/Customer";
import PlateView from "./pages/view/PlateView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cashier" element={<Cashier />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/plate" element={<PlateView />} />
      </Routes>
    </Router>
  );
}

export default App;
