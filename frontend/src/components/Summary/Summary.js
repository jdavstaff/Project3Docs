import { Card } from "@mui/material";
import SummaryCard from "./SummaryCard";

export default function Summary({ data }) {
  return (
    <div>
      {data.map((item) => (
        <SummaryCard item={item} key={item.id} />
      ))}
    </div>
  );
}
