import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import OrderView from "../view/OrderView";

export default function Customer() {
  return (
    <div>
      <Header name={"customer"} />;
      <OrderView user={"customer"} />
      <Link to="/">
        <Button variant="outlined">Back</Button>
      </Link>
      <Link to="checkout">
        <Button variant="outlined">Checkout</Button>
      </Link>
    </div>
  );
}
