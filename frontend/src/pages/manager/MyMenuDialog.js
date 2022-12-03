import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Stack } from "@mui/system";

// FIXME: should be removed after async stuff gets done
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const dummyData = [
  { name: "kung pao", id: 1 },
  { name: "chicken", id: 2 },
  { name: "friend", id: 3 },
  { name: "yohoo", id: 5 },
];

export default function MyMenuDialog({ open, onClose }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [ingredients, setIngredients] = useState([]);
  const [openIngrList, setOpenIngrList] = useState(false);
  const [currIngr, setCurrIngr] = useState(null); // keep track of ingredient in auto complete box
  const [selectedIngrs, setSelectedIngrs] = useState([]);
  const [count, setCount] = useState(0);
  const loading = openIngrList && ingredients.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) return undefined;

    (async () => {
      await sleep(1e3); // should be replaced by actual async stuff

      if (active) {
        setIngredients([...dummyData]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    if (isNaN(e.target.value)) return;
    setQuantity(e.target.value);
    // let newVal = e.target.value;
    // if (isNaN(newVal)) return;
    // setQuantity(newVal);
  };

  const handleClose = () => {
    onClose();
  };

  const handleAdd = () => {
    console.log("adding...");
  };

  const handleDeleteSelectedIngr = (ingrToDelete) => {
    console.log("deleting", ingrToDelete);
    setSelectedIngrs((ingredients) =>
      ingredients.filter((i) => ingrToDelete.id !== i.id)
    );
  };

  const handleAddIngr = (e, newVal) => {
    if (newVal === null) return;

    let newIngr = newVal;

    if (typeof newIngr === "string") {
      let newId = count - 1;
      setCount(count - 1);
      newIngr = { name: newIngr, id: newId };
    }

    if (!selectedIngrs.includes(newIngr)) {
      newIngr["quantity"] = quantity;
      console.log(newIngr);
      setSelectedIngrs([...selectedIngrs, newIngr]);
    }
    setCurrIngr({ name: "" });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Menu Item</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              variant="outlined"
              label="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">oz</InputAdornment>
                ),
              }}
            />
            <Autocomplete
              id="choose-ingredients"
              fullWidth
              open={openIngrList}
              onOpen={() => {
                setOpenIngrList(true);
              }}
              onClose={() => {
                setOpenIngrList(false);
              }}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              getOptionLabel={(option) => option.name}
              options={ingredients}
              loading={loading}
              autoHighlight
              value={currIngr}
              onChange={handleAddIngr}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ingredients"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            {selectedIngrs.map((ingr) => (
              <Chip
                key={ingr.id}
                label={`${ingr.quantity} oz ${ingr.name}`}
                onDelete={() => handleDeleteSelectedIngr(ingr)}
              />
            ))}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => console.log(currIngr)}>Cancel</Button>
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
