import Header from "../../components/Header";
import OrderView from "../view/OrderView";
import Mapper from "../../components/Map/MapComponent";

export default function Customer() {
  return (
    <div>
      <Header name={"customer"} />
      <OrderView user={"customer"} /><div>{Mapper()}</div>
    </div>
  );
}
