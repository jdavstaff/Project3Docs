import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function Landing() {
  return (
    <div>
      <Header name={"Landing"} />
      <div>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Link to="/manager">
            <Button>Manager</Button>
          </Link>
          <Link to="/cashier">
            <Button>Cashier</Button>
          </Link>
          <Link to="/driver">
            <Button>Driver</Button>
          </Link>
        </ButtonGroup>
        <div>
          <Link to="/customer">
            <Button variant="contained">Customer</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
