import { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, id, quantity, pricePerPound) {
  return { name, id, quantity, pricePerPound };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24),
  createData("Ice cream sandwich", 237, 9.0, 37),
  createData("Eclair", 262, 16.0, 24),
  createData("Cupcake", 305, 3.7, 67),
  createData("Gingerbread", 356, 16.0, 49),
];

export default function Inventory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // FIXME: get data from db
    // data: [ { string name, int id, int quantity, double pricePerPound}]
    setData(rows);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">id</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">$ / lb</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.pricePerPound}</TableCell>
              {/* FIXME: should add edit and delete buttons to cell */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
