import { useState, useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Fade from "@mui/material/Fade";
import { useLang } from "../../contexts/LanguageContext";
import { translateComponents } from "../../config/translate";

function createData(name, email, id, permission) {
  return { name, email, id, permission };
}

// FIXME: DELETE ME
const dummyData = [
  createData("Frozen yoghurt", "a@gmail.com", 6.0, 1),
  createData("Ice cream sandwich", "cold@anatartica.com", 9.0, 1),
  createData("Eclair", "warm@tasty.com", 16.0, 1),
  createData("Cupcake", "delicious@bakery.com", 3.7, 1),
  createData("Gingerbread", "comeandgetme@fox.com", 16.0, 1),
];

function getPermissionName(permission) {
  switch (permission) {
    case 0:
      return "customer";
    case 1:
      return "cashier";
    case 2:
      return "manager";
    default:
      return "---";
  }
}

function SelectPermission({ permission, handleChangePerm, id }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [permName, setPermName] = useState(getPermissionName(permission));

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCustomer = () => {
    setPermName("customer");
    handleChangePerm(0, id);
    handleClose();
  };

  const handleCashier = () => {
    setPermName("cashier");
    handleChangePerm(1, id);
    handleClose();
  };

  const handleManager = () => {
    setPermName("manager");
    handleChangePerm(2, id);
    handleClose();
  };

  return (
    <>
      <Button
        sx={{ width: "18ch" }}
        variant="outlined"
        size="small"
        color="secondary"
        aria-controls={open ? "permissions-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        {permName}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleCustomer}>Customer</MenuItem>
        <MenuItem onClick={handleCashier}>Cashier</MenuItem>
        <MenuItem onClick={handleManager}>Manager</MenuItem>
      </Menu>
    </>
  );
}

export default function Access() {
  const theme = useTheme();
  const [rows, setRows] = useState([]);

  const langInfo = useLang();

  let translated = false;

  // FIXME: update database to change permission
  const handleChangePerm = (permission, id) => {
    console.log(`update id: ${id} to permission ${permission}`);
  };

  useEffect(() => {
    setRows([...dummyData]);
  }, []);

  useEffect(() => {
    if (!translated && langInfo !== "en" && langInfo !== null) {
      translateComponents(langInfo);
      translated = true;
    }
  }, [rows]);

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Id</TableCell>
              <TableCell align="center">Permission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">
                  <Box
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                    }}
                  >
                    {row.email}
                  </Box>
                </TableCell>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="center">
                  <SelectPermission
                    permission={row.permission}
                    handleChangePerm={handleChangePerm}
                    id={row.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
