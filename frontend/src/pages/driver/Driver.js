import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

export default function Driver() {
  return (
    <div>
      <Header name={"Driver"} />
      <Link to="/">
        <Button variant="outlined">Back</Button>
      </Link>
    </div>
  );
}
