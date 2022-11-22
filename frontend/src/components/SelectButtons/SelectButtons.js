import SelectButton from "./SelectButton";
import "../../styles/master.scss";

export default function SelectButtons({ items, handleSelect }) {
  return (
    <div>
      {items.map((item) => (
        <SelectButton key={item.key} item={item} handleSelect={handleSelect} />
      ))}
    </div>
  );
}
