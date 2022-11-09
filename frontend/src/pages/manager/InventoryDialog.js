import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function InventoryDialog({
  open,
  onClose,
  onUpdate,
  _name,
  _quantity,
  _id,
}) {
  const [name, setName] = useState(_name);
  const [quantity, setQuantity] = useState(_quantity);
  const [errorText, setErrorText] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUpdate = () => {
    if (isNaN(quantity)) {
      // if quantity is not a number
      setErrorText("Please enter a number for the quanity");
    } else {
      setErrorText("");
      onUpdate(name, quantity, _id);
    }
  };

  const handleClose = () => {
    setErrorText("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} keepMounted>
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
              error={Boolean(errorText.length)}
              helperText={errorText}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
