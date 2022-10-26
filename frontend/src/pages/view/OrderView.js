import { Button, Card } from "@mui/material";
import { Link } from "react-router-dom";

export default function OrderView() {
  return (
    <div>
      <div>
        <h3>Size:</h3>
        <div>
          <Link to="/plate">
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
        <h3>Summary</h3>
        <Card variant="outlined">
          <h5> bowl </h5>
        </Card>
      </div>
    </div>
  );
}
