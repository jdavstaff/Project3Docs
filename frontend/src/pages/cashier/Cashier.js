import Button from "@mui/material/Button";
import Box from "@mui/material/Box"
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import OrderView from "../view/OrderView";
import { Stack } from "@mui/material";

export default function Cashier() {
  return (
    <div>
      <Header name={"Cashier"} />
      <Stack alignItems="center">
      <Box sx={{ maxWidth: "sm", width: "70vw"}}>
        <OrderView user={"cashier"} />
      </Box>
      </Stack>
    </div>
  );
}
