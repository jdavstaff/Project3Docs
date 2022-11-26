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
import IconButton from "@mui/material/IconButton";
import InventoryDialog from "./InventoryDialog.js";
import { Button } from "@mui/material";

export default function Inventory() {
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
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
    setId(dat.ingredient_id);
    setDialogOpen(true);
  };

  const handleDelete = (dat) => {
    // FIXME: should delete "dat" from db
    // dat: int indgredient_id, string name, int quantity
    const options = {
      method: "GET",
      url: `${url}/invDelete`,
      params: { id: dat.ingredient_id },
    };
    axios.request(options).then((res) => {});
    setData(data.filter((d) => d.ingredient_id !== dat.ingredient_id));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // FIXME: update db with new dat
  const handleDialogUpdate = (name, quantity, id) => {
    // FIXME: update db with string name, string quantity
    console.log(name, parseInt(quantity));

    console.log("THE ID", id);
    setData(
      data.map((dat) => {
        if (dat.ingredient_id === id) {
          dat.name = name;
          dat.quantity = quantity;
        }
        return dat;
      })
    );

    setDialogOpen(false);
  };

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  // FIXME: backend should add the following item
  const handleAddDialogUpdate = (name, quantity) => {
    console.log("Add item: ", name, quantity);

    const options = {
      method: "GET",
      url: `${url}/addInventory`,
      params: { name: name, quantity: quantity },
    };

    axios.request(options).then((res) => {
      const options2 = {
        method: "GET",
        url: `${url}/getInvID`,
        params: { name: name },
      };

      axios.request(options2).then((res2) => {
        console.log(res2.data.rows[0]);
        let d = [...data];
        d.push({
          name: name,
          quantity: quantity,
          ingredient_id: res2.data.rows[0].ingredient_id,
        });
        setData(d);
        setAddDialogOpen(false);
      });
    });
  };

  return (
    <div class="center">
      <TableContainer sx={{ maxHeight: "70vh" }} component={Paper}>
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
      <Button variant="outlined" onClick={handleAddDialogOpen}>
        Add Item
      </Button>
      <InventoryDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onUpdate={handleDialogUpdate}
        _name={name}
        _quantity={quantity}
        _id={id}
      />
      <InventoryDialog
        open={addDialogOpen}
        onClose={handleAddDialogClose}
        onUpdate={handleAddDialogUpdate}
        _name=""
        _quantity={0}
        _id={0}
      />
    </div>
  );
}
