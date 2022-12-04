import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Summary from "../../components/Summary/Summary";
import PlateView from "./PlateView";
import "../../styles/master.scss";
// import axios from 'axios'
// import { url } from "../../config/global.js";

export default function OrderView({ user }) {
  const [view, setView] = useState(0);
  const [summaryData, setSummaryData] = useState([]);

  const navigate = useNavigate();

  const addItem = (size, item) => {
    let summaryItem = {
      size: size,
      id: Math.floor(Math.random() * 10000),
      items: [...item],
    };
    console.log(summaryItem);
    setSummaryData([...summaryData, summaryItem]);
  };

  const toCheckout = () => {
    console.log("checking out");
    navigate(`checkout`, { state: { summaryData: [...summaryData] } });
  };
  const handleBtnClick = (v) => {
    setView(v);
  };

  if (view === 0) {
    return (
      <div>
        <div>
          <h3>Size:</h3>
          <div class="center">
            <Button variant="contained" onClick={() => handleBtnClick(1)}>
              Bowl
            </Button>
            <Button variant="contained" onClick={() => handleBtnClick(2)}>
              Plate
            </Button>
            <Button variant="contained" onClick={() => handleBtnClick(3)}>
              Bigger Plate
            </Button>
          </div>
        </div>
        <div>
          <Summary data={summaryData} />
        </div>
        <div class="bottomButtonBar">
          <Link to="/">
            <Button variant="outlined" color="secondary">
              Back
            </Button>
          </Link>
          <Button variant="contained" onClick={toCheckout}>
            CHECKOUT
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <PlateView
          user={user}
          handleView={handleBtnClick}
          view={view}
          addItem={addItem}
        />
      </div>
    );
  }
}
