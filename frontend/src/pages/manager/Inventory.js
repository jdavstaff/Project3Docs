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
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorText, setErrorText] = useState("");

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
    setName(dat.name);
    setQuantity(dat.quantity);
    setDialogOpen(true);
  };

  const handleDelete = (dat) => {
    // FIXME: should delete "dat" from db
    // dat: int indgredient_id, string name, int quantity

    setData(data.filter((d) => d.ingredient_id !== dat.ingredient_id));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // FIXME: update db with new dat
  const handleDialogUpdate = () => {
    if (!isNaN(quantity)) {
      setErrorText("Please enter a number for the quanity");
    } else {
      // update db with string name, string quantity
      console.log(name, parseInt(quantity));
      setDialogOpen(false);
    }
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
        <DialogContent dividers>
          <div>
            <div>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                value={quantity}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={handleQuantityChange}
                error={errorText}
                helperText={errorText}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
