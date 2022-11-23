import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";

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
    backgroundColor: selected ? "white" : theme.palette.secondary.main,
    border: `3px solid ${theme.palette.secondary.main}`,
    borderRadius: "6px",
    padding: "4px 40px",
    textDecoration: "none",
    margin: "10px 10px",
    width: "400px",
  })
);
