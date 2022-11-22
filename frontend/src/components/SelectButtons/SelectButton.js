import Button from "@mui/material/Button";
import "../../styles/master.scss";
export default function SelectButton({ item, handleSelect }) {
  const btnVariant = item.selected ? "contained" : "outlined";

  const handleClick = () => {
    handleSelect(item.key);
  };

  return (
    <Button class="button foodSel" onClick={handleClick} variant={btnVariant}>
      {item.name}
    </Button>
  );
}
