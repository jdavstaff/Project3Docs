import "./styles/App.scss";
import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Cashier from "./pages/cashier/Cashier";
import Driver from "./pages/driver/Driver";
import Manager from "./pages/manager/Manager";
import Customer from "./pages/customer/Customer";
import PlateView from "./pages/view/PlateView";
import Checkout from "./pages/Checkout";
import { UserInfoProvider } from "./contexts/UserContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#003077",
      },
      secondary: {
        main: "#373737",
      },
      info: {
        main: "#F3F3F3",
      },
    },
  });

  return (
    <UserInfoProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/cashier" element={<Cashier />} />
            <Route path="/driver" element={<Driver />} />
            <Route path="/manager" element={<Manager />} />
            <Route path="/customer" element={<Customer />} />
            <Route
              path="/cashier/plate"
              element={<PlateView user={"cashier"} />}
            />
            <Route
              path="/customer/plate"
              element={<PlateView user={"customer"} />}
            />
            <Route
              path="/customer/checkout"
              element={<Checkout user={"Customer"} />}
            />
            <Route
              path="/cashier/checkout"
              element={<Checkout user={"Cashier"} />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </UserInfoProvider>
  );
}

export default App;
