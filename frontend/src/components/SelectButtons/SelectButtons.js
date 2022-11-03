import SelectButton from "./SelectButton";

export default function SelectButtons({ items, handleSelect }) {
  return (
    <div>
      {items.map((item) => (
        <SelectButton key={item.key} item={item} handleSelect={handleSelect} />
      ))}
    </div>
  );
}
