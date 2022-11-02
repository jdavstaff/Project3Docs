import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../config/global.js";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Inventory() {
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleEdit = (dat) => {
    setDialogOpen(true);
    console.log(dat);
  };

  const handleDelete = (dat) => {
    // FIXME: should delete "dat" from db
    // dat: int indgredient_id, string name, int quantity

    setData(data.filter((d) => d.ingredient_id !== dat.ingredient_id));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <div>
      <TableContainer sx={{ maxHeight: 340 }} component={Paper}>
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
                  <IconButton onClick={() => handleEdit(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleDialogClose} keepMounted>
        <DialogTitle>Update Item</DialogTitle>
        <DialogContent>
          <div>Name</div>
          <TextField id="outlined-basic" label="Name" variant="outlined" />
          <div>Price per pund</div>
          <TextField
            id="outlined-basic"
            label="0.00"
            variant="outlined"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
