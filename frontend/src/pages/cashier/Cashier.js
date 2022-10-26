import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import OrderView from "../view/OrderView";

export default function Cashier() {
  return (
    <div>
      <Header name={"cashier"} />;
      <OrderView user={"cashier"} />
      <Link to="/">
        <Button variant="outlined">Back</Button>
      </Link>
    </div>
  );
}
