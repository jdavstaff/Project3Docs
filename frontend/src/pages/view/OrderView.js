import { Button, Card } from "@mui/material";
import { Link } from "react-router-dom";
import Summary from "../../components/Summary/Summary";

export default function OrderView({ user }) {
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

  return (
    <div>
      <div>
        <h3>Size:</h3>
        <div>
          <Link to={`/${user}/plate`}>
            <Button variant="outlined">Bowl</Button>
          </Link>
          <Button variant="outlined">Plate</Button>
          <Button variant="outlined">Bigger Plate</Button>
        </div>
      </div>
      <div>
        <h3>Drinks:</h3>
        <div>
          <Button variant="outlined">Small</Button>
          <Button variant="outlined">Medium</Button>
          <Button variant="outlined">Large</Button>
        </div>
      </div>
      <div>
        <h3>Type:</h3>
        <div>
          <Button variant="outlined">Appetizer</Button>
        </div>
      </div>
      <div>
        <Summary data={summaryData} />
      </div>
    </div>
  );
}
