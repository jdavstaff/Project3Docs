import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

export default function Customer() {
  return (
    <div>
      <Header name={"customer"} />;
      <Link to="/">
        <Button variant="outlined">Back</Button>
      </Link>
    </div>
  );
}
