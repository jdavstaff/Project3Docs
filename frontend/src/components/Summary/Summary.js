import { textAlign } from "@mui/system";
import SummaryCard from "./SummaryCard";

/**
 * Summary of the data given
 * @param {*} data 
 * @returns Summary card of the data
 */
export default function Summary({ data }) {

  if (data) {
    return (
      <div>
        <h3> Summary: </h3>
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
