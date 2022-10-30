import SummaryCard from "./SummaryCard";

export default function Summary({ data }) {
  if (data) {
    return (
      <div>
        <h3> Summary </h3>
        {data.map((item) => (
          <SummaryCard item={item} key={item.id} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h3> Summary:</h3>
        <div>No items in cart</div>
      </div>
    );
  }
}
