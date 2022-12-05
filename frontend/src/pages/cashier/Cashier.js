import Header from "../../components/Header";
import OrderView from "../view/OrderView";

export default function Cashier() {
  return (
    <div>
      <Header name={"Cashier"} />
      <OrderView user={"cashier"} />
    </div>
  );
}
