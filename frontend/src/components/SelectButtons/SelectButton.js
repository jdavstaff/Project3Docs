import Button from "@mui/material/Button";
import { StyledSelectedButton } from "../../styles/StyledButtons";
export default function SelectButton({ item, handleSelect }) {
  const btnVariant = item.selected ? "contained" : "outlined";

  const handleClick = () => {
    handleSelect(item.key);
  };

  return (
    <StyledSelectedButton selected={item.selected} onClick={handleClick}>
      {item.name}
    </StyledSelectedButton>
  );
}
