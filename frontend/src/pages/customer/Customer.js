import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../contexts/UserContext";
import Header from "../../components/Header";
import OrderView from "../view/OrderView";
import Mapper from "../../components/Map/MapComponent";
import "../../styles/master.scss";

export default function Customer() {
  return (
    <div>
      <Header name={"Customer"} />
      <div className="content">
        <OrderView user={"customer"} />
        <Mapper />
      </div>
    </div>
  );
}
