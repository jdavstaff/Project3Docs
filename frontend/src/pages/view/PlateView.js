import { useState, useEffect } from "react";
import SelectButtons from "../../components/SelectButtons/SelectButtons";

export default function PlateView() {
  // NOTE: Data MUST have keys: id : int, selected : bool, and name : string
  const [sideData, setSideData] = useState([]);
  const [entreeData, setEntreeData] = useState([]);
  useEffect(() => {
    // FIXME: AXIOS call to get entree and side data
    // to update sideData and entreeData, use the syntax:
    // setSideData ( **NEW DATA** )
    // setEntreeData ( **NEW DATA ** )

    setSideData([
      {
        name: "fried rice",
        selected: false,
        id: 1,
      },
      {
        name: "orange rice",
        selected: false,
        id: 2,
      },
      {
        name: "purple rice",
        selected: true,
        id: 3,
      },
    ]);

    setEntreeData([
      {
        name: "orange chicken",
        selected: false,
        id: 1,
      },
      {
        name: "orange beef",
        selected: false,
        id: 2,
      },
      {
        name: "green rice",
        selected: true,
        id: 3,
      },
    ]);
  }, []);

  const handleSideSelect = (id) => {
    const updatedData = sideData.map((item) => {
      item.selected = item.id === id;
      return item;
    });
    setSideData(updatedData);
  };

  const handleEntreeSelect = (id) => {
    const updatedData = entreeData.map((item) => {
      item.selected = item.id === id;
      return item;
    });
    setEntreeData(updatedData);
  };

  return (
    <div>
      <h1>PLATE</h1>
      <div>
        <h4>Sides</h4>
        <div>
          <SelectButtons items={sideData} handleSelect={handleSideSelect} />
        </div>
      </div>
      <div>
        <h4>Entrees</h4>
        <div>
          <SelectButtons items={entreeData} handleSelect={handleEntreeSelect} />
        </div>
      </div>
    </div>
  );
}
