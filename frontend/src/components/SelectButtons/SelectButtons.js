import SelectButton from "./SelectButton";

export default function SelectButtons({ items, handleSelect }) {
  return (
    <div>
      {items.map((item) => (
        <SelectButton key={item.id} item={item} handleSelect={handleSelect} />
      ))}
    </div>
  );
}
