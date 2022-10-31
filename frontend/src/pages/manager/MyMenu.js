import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(name, id, price, type, ingredients) {
  return { name, id, price, type, ingredients: [...ingredients] };
}

function createIngrData(name, id) {
  return { name, id };
}

const dummyData = [
  createData("Orange Chicken", 2, 5.0, "Entree", [
    createIngrData("chicken", 2),
    createIngrData("Orange sauce", 3),
  ]),
  createData("Orange Chicken", 4, 5.0, "Entree", [
    createIngrData("chicken", 2),
    createIngrData("Orange sauce", 3),
  ]),
  createData("Orange Chicken", 3, 5.0, "Entree", [
    createIngrData("chicken", 2),
    createIngrData("Orange sauce", 3),
  ]),
  createData("Orange Chicken", 1, 5.0, "Entree", [
    createIngrData("chicken", 2),
    createIngrData("Orange sauce", 3),
  ]),
  createData("Orange Chicken", 9, 5.0, "Entree", [
    createIngrData("chicken", 2),
    createIngrData("Orange sauce", 3),
  ]),
];

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{row.type}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Ingredients
              </Typography>
              <ul>
                {row.ingredients.map((ingr) => (
                  <li key={ingr.id}> {ingr.name} </li>
                ))}
              </ul>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function MyMenu() {
  const [data, setData] = useState([]);

  useEffect(() => {
    //FIXME: set menu data here
    // { string name, int id, double price, string type (entree/side/drink), ingredients : [ string name, int id]}

    setData(dummyData);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
