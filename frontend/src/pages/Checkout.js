import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Summary from "../components/Summary/Summary";

export default function Checkout({ user }) {
  const location = useLocation();
  const getSummaryData = () => {
    var data = [
      {
        size: "Bowl",
        id: 1,
      },
      {
        size: "Plate",
        id: 2,
      },
      {
        size: "Bigger Plate",
        id: 3,
      },
    ];
    return data;
  };
  return (
    <div>
      <Header name={`${user} Checkout`} />
      <div>{location.state.summaryData}</div>
      <div>
        <Summary data={getSummaryData()} />
      </div>
      <div>
        <Link to={`/${user}`}>
          <Button variant="outlined">Cancel</Button>
        </Link>
        <Link to={`/${user}`}>
          <Button variant="outlined">Order</Button>
        </Link>
      </div>
    </div>
  );
}
