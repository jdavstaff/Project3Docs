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
  const [currIngr, setCurrIngr] = useState(null); // keep track of ingredient in auto complete box
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

  const handleAdd = () => {
    console.log("adding...");
  };

  const handleDeleteSelectedIngr = (ingrToDelete) => {
    console.log("deleting", ingrToDelete);
    setSelectedIngrs((ingredients) =>
      ingredients.filter((i) => ingrToDelete.id !== i.id)
    );
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
          <Autocomplete
            id="choose-ingredients"
            sx={{ width: 300 }}
            open={openIngrList}
            onOpen={() => {
              setOpenIngrList(true);
            }}
            onClose={() => {
              setOpenIngrList(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={ingredients}
            loading={loading}
            autoHighlight
            value={currIngr}
            onChange={(e, newVal) => {
              console.log(newVal);

              if (newVal !== null && !selectedIngrs.includes(newVal)) {
                setSelectedIngrs([...selectedIngrs, newVal]);
              }
              setCurrIngr(newVal);
            }}
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
          <Stack direction="row" spacing={1}>
            {selectedIngrs.map((ingr) => (
              <Chip
                key={ingr.id}
                label={ingr.name}
                onDelete={() => handleDeleteSelectedIngr(ingr)}
              />
            ))}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {/* <Button onClick={() => console.log(ingredients)}>click em</Button> */}
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
