import Header from "../../components/Header";
import OrderView from "../view/OrderView";
import Mapper from "../../components/Map/MapComponent";

export default function Cashier() {
  return (
    <div>
      <Header name={"Cashier"} />
      <OrderView user={"cashier"} />
      <Mapper/>
    </div>
  );
}
