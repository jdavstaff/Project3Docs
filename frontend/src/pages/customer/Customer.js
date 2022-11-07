import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import OrderView from "../view/OrderView";
import MapComponent from "../../components/Map/MapComponent";

export default function Customer() {
  return (
    <div>
      <Header name={"customer"} />;
      <OrderView user={"customer"} />;
      <div>
      <MapComponent/>;
      </div>
    </div>
  );
}
