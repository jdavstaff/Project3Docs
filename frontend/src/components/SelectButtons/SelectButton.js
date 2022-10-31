import { Button } from "@mui/material";

export default function SelectButton({ item, handleSelect }) {
  const btnVariant = item.selected ? "contained" : "outlined";

  const handleClick = () => {
    handleSelect(item.id);
  };

  return (
    <Button onClick={handleClick} variant={btnVariant}>
      {item.name}
    </Button>
  );
}
