import { Card } from "@mui/material";

export default function SummaryCard({ item }) {
  return (
    <Card variant="outlined">
      <h5>{item.size}</h5>
    </Card>
  );
}
