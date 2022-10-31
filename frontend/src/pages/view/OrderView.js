import { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Summary from "../../components/Summary/Summary";
import PlateView from "./PlateView";

export default function OrderView({ user }) {
  const [view, setView] = useState(0);

  const summaryData = [
    {
      size: "Bowl",
      id: 4,
    },
    {
      size: "Bowl",
      id: 3,
    },
    {
      size: "Bigger Plate",
      id: 2,
    },
  ];

  const handleBtnClick = (v) => {
    setView(v);
  };

  if (view === 0) {
    return (
      <div>
        <div>
          <h3>Size:</h3>
          <div>
            <Button variant="outlined" onClick={() => handleBtnClick(1)}>
              Bowl
            </Button>
            <Button variant="outlined" onClick={() => handleBtnClick(2)}>
              Plate
            </Button>
            <Button variant="outlined" onClick={() => handleBtnClick(3)}>
              Bigger Plate
            </Button>
          </div>
        </div>
        <div>
          <h3>Extra:</h3>
          <div>
            <Button variant="outlined">Appetizer</Button>
          </div>
        </div>
        <div>
          <Summary data={summaryData} />
        </div>
        <Link to="/">
          <Button variant="outlined">Back</Button>
        </Link>
        <Link to="checkout">
          <Button variant="outlined">CHECKOUT</Button>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <PlateView user={user} handleView={handleBtnClick} view={view} />
      </div>
    );
  }
}
