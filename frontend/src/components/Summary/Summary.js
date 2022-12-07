import { useEffect } from "react";
import { textAlign } from "@mui/system";
import SummaryCard from "./SummaryCard";
import { useLang } from "../../contexts/LanguageContext";
import { translateComponents } from "../../config/translate";

export default function Summary({ data }) {
  const langInfo = useLang();

  useEffect(() => {
    if (langInfo !== "en" && langInfo !== null) {
      translateComponents(langInfo);
    }
  }, []);

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
