import { useState } from "react";
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Summary from "../components/Summary/Summary";
import axios from "axios";
import { url } from '../config/global'

export default function Checkout({ user }) {
  const location = useLocation();
  const [summaryData, setSummaryData] = useState([
    ...location.state.summaryData,
  ]);
  

  // FIXME: should send summary to database to order;
  // [int, string, []] summaryData: [
  //    int id (randomKey),
  //    string size ("Bowl", "Plate", or "Bigger Plate"),
  //    [string, bool, int] items : [
  //      {string name, bool selected, int id},
  //    ],
  //]
  const handleOrder = () => {
    let options = {
      method: 'GET',
      url: `${url}/placeOrder`,
      params: { data: summaryData }
    }

    axios.request((options)).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  };

  return (
    <div>
      <Header name={`${user} Checkout`} />
      <div class="center">
        <Summary data={location.state.summaryData} />
      </div>
      <div class="center">
        <Link to={`/${user}`}>
          <Button class="button del">Cancel</Button>
        </Link>
        <Link to={`/${user}`}>
          <Button class="button" onClick={handleOrder}>
            Order
          </Button>
        </Link>
      </div>
    </div>
  );
}
