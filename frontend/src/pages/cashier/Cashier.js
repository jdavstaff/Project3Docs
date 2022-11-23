import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import OrderView from "../view/OrderView";
import "../../styles/master.scss";

export default function Cashier() {
  return (
    <div>
      <Header name={"cashier"} />
      <div className="content">
        <OrderView user={"cashier"} />
      </div>
    </div>
  );
}
