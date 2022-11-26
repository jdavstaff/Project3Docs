import "./styles/App.scss";
import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
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
import { indigo, yellow } from "@mui/material/colors";

function App() {
  const theme = createTheme({
    palette: {
      // primary: {
      //   light: "#534bae",
      //   main: "#1a237e",
      //   dark: "#000051",
      //   contrastText: "#fff",
      // },
      // secondary: {
      //   light: "#ffd95a",
      //   main: "#f9a825",
      //   dark: "#c17900",
      //   contrastText: "#000",
      // },
      background: {
        default: "#dbdbdb",
      },
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
        <CssBaseline />
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
