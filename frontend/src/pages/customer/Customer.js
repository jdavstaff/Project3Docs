import { Stack, Box} from "@mui/material";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../contexts/UserContext";
import Header from "../../components/Header";
import OrderView from "../view/OrderView";
import Mapper from "../../components/Map/MapComponent";
import "../../styles/master.scss";

export default function Customer() {
  return (
    <div>
      <Header name={"Customer"} />

      <Stack alignItems="center">
      <Box sx={{ maxWidth: "sm", width: "70vw"}}>
        <OrderView user={"customer"} />
        <Mapper />
      </Box>
      </Stack>
    </div>
  );
}
