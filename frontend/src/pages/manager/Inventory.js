import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../config/global.js";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";

export default function Inventory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // FIXME: get data from db
    const options = {
      method: "GET",
      url: `${url}/inventory`,
    };
    axios.request(options).then((res) => {
      let rows = res.data.rows;
      setData(rows);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">id</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="center">Edit</TableCell>
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
              <TableCell align="right">{row.ingredient_id}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="center">
                <Button>
                  <EditIcon />
                </Button>
                <Button>
                  <DeleteOutlineIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
