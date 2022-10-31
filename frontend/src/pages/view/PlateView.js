import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import SelectButtons from "../../components/SelectButtons/SelectButtons";

function EntreeSelection({ entreeData, handleEntreeSelect }) {
  return (
    <div>
      <h4>Entrees</h4>
      <div>
        <SelectButtons items={entreeData} handleSelect={handleEntreeSelect} />
      </div>
    </div>
  );
}

const dummyData = [
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
  {
    name: "walnut beef",
    selected: false,
    id: 651453,
  },
  {
    name: "brocolli shrimp",
    selected: false,
    id: 89543,
  },
];

// user will either be "cashier" or "client"
export default function PlateView({ user, handleView, view }) {
  // NOTE: Data MUST have keys: id : int, selected : bool, and name : string
  const [sideData, setSideData] = useState([]);
  const [entreeData, setEntreeData] = useState([]);
  const [entreeData2, setEntreeData2] = useState([]);
  const [entreeData3, setEntreeData3] = useState([]);

  const getTitle = () => {
    if (view == 1) return "Bowl";
    else if (view == 2) return "Plate";
    else if (view == 3) return "Bigger Plate";
  };

  useEffect(() => {
    // FIXME: AXIOS call to get entree and side data
    // [ {string name, int id,}]
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
        selected: false,
        id: 3,
      },
    ]);

    let myData = dummyData;

    setEntreeData([...dummyData]);
    setEntreeData2([
      { name: "sofia", id: 444, selected: false },
      { name: "josh", id: 21, selected: true },
      { name: "mitchell", id: 21321, selected: false },
      { name: "sebastian", id: 12321, selected: false },
    ]);
    setEntreeData3([
      { name: "frank", id: 123454, selected: false },
      { name: "frank", id: 12354, selected: false },
      { name: "frank", id: 12454, selected: false },
      { name: "frank", id: 12344, selected: false },
      { name: "frank", id: 12345, selected: false },
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
    console.log("111");
    const updatedData = entreeData.map((item) => {
      item.selected = item.id === id;
      return item;
    });
    setEntreeData(updatedData);
  };
  const handleEntreeSelect2 = (id) => {
    console.log("222");
    const updatedData = entreeData2.map((item) => {
      item.selected = item.id === id;
      return item;
    });
    setEntreeData2(updatedData);
  };

  const handleEntreeSelect3 = (id) => {
    console.log("333");
    const updatedData = entreeData3.map((item) => {
      item.selected = item.id === id;
      return item;
    });
    setEntreeData3(updatedData);
  };

  const handleAddBtn = () => {
    handleView(0);
    console.log("Add...");
  };

  return (
    <div>
      <h1>{getTitle()}</h1>
      <div>
        <h4>Sides</h4>
        <div>
          <SelectButtons items={sideData} handleSelect={handleSideSelect} />
        </div>
      </div>
      <EntreeSelection
        entreeData={entreeData}
        handleEntreeSelect={handleEntreeSelect}
      />
      {view >= 2 && (
        <EntreeSelection
          entreeData={entreeData2}
          handleEntreeSelect={handleEntreeSelect2}
        />
      )}
      {view >= 3 && (
        <EntreeSelection
          entreeData={entreeData3}
          handleEntreeSelect={handleEntreeSelect3}
        />
      )}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => handleView(0)}
      >
        Cancel
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleAddBtn}>
        Add
      </Button>
    </div>
  );
}
