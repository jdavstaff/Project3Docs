import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Autocomplete, Chip, CircularProgress } from "@mui/material";
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
  const [ingredients, setIngredients] = useState([]);
  const [openIngrList, setOpenIngrList] = useState(false);
  const [selectedIngrs, setSelectedIngrs] = useState([]);
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

  const handleClose = () => {
    onClose();
  };

  // FIXME: database should update menu item
  const handleAdd = () => {
    let existingIngredients = [];
    let newIngredients = [];

    selectedIngrs.forEach((ingr) => {
      if (ingr.id === -1) newIngredients.push(ingr);
      else existingIngredients.push(ingr);
    });

    console.log("Name: ", name); // name of menu item
    console.log("existing ingredients", existingIngredients); // add ingredients that already exist in database
    console.log("new ingredients", newIngredients); // create ingredients in database, then add to menu item

    console.log("adding...");
  };

  const addIngr = (newArray) => {
    let newVal = newArray[newArray.length - 1];

    if (typeof newVal === "string") {
      newVal = { name: newVal, id: -1 };
    }

    if (newVal !== null && !selectedIngrs.includes(newVal)) {
      setSelectedIngrs([...selectedIngrs, newVal]);
    }
  };

  const handleIngrChange = (e, newArray) => {
    if (newArray.length > selectedIngrs.length) {
      addIngr(newArray);
    } else {
      setSelectedIngrs(newArray);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      fullWidth
      maxWidth="xs"
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

          <Autocomplete
            multiple
            variant="outlined"
            id="tags-filled"
            open={openIngrList}
            onOpen={() => setOpenIngrList(true)}
            onClose={() => setOpenIngrList(false)}
            onChange={handleIngrChange}
            value={selectedIngrs}
            loading={loading}
            options={ingredients}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Ingredients"
                placeholder="Ingredients"
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => console.log(selectedIngrs)}>click em</Button>
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
