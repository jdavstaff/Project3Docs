import "../../styles/master.scss";
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
            <Button class="button">Manager</Button>
          </Link>
          <Link to="/cashier">
            <Button class="button" >Cashier</Button>
          </Link>
          <Link to="/driver">
            <Button class="button" >Driver</Button>
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
