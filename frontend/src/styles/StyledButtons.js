import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const OutlinedButton = styled(MuiButton)(({ theme }) => ({
  color: theme.palette.secondary.main,
  border: `3px solid ${theme.palette.secondary.main}`,
  borderRadius: "6px",
  padding: "4px 40px",
  textDecoration: "none",
}));

export const StyledSelectedButton = styled(MuiButton)(
  ({ theme, selected }) => ({
    color: selected ? theme.palette.secondary.main : "white",
    backgroundColor: selected ? "#f4f4f4" : theme.palette.secondary.main,
    border: `3px solid ${theme.palette.secondary.main}`,
    margin: "10px",
    borderRadius: "6px",
    textDecoration: "none",
    textTransform: "capitalize",
    width: "30ch",
    height: "10ch",
    fontSize: "large",
    textTransform: "lowercase",
    '&:hover': {
      backgroundColor: selected ? "#ffffff" : theme.palette.secondary.dark,
      borderColor: selected ? "#ffffff" : theme.palette.secondary.dark,
      boxShadow: "0px 10px 20px 5px rgba(0, 0, 0, 0.5)",
      transform: "translateY(-5px)"


    }
  })
);
