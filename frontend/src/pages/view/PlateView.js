import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import SelectButtons from "../../components/SelectButtons/SelectButtons";
import axios from "axios";
import { url } from "../../config/global.js";
import "../../styles/master.scss";
import { OutlinedButton } from "../../styles/StyledButtons";

function EntreeSelection({ entreeData, handleEntreeSelect }) {
  const secStyle = {
    margin: "40px 0",
  };
  return (
    <div style={secStyle}>
      <h4>Entrees</h4>
      <div>
        <SelectButtons items={entreeData} handleSelect={handleEntreeSelect} />
      </div>
    </div>
  );
}

// user will either be "cashier" or "client"
export default function PlateView({ handleView, view, addItem }) {
  // NOTE: Data MUST have keys: id : int, selected : bool, and name : string
  const [sideData, setSideData] = useState([]);
  const [entreeData, setEntreeData] = useState([]);
  const [entreeData2, setEntreeData2] = useState([]);
  const [entreeData3, setEntreeData3] = useState([]);

  const getTitle = () => {
    if (view == 1) return "Bowl";
    else if (view == 2) return "Plate";
    else if (view == 3) return "Bigger Plate";
    else return "Error";
  };

  function extractGroups(rows, num) {
    let groups = { Entree: [], Side: [] };
    rows.forEach((el) => {
      let item = Object.assign({}, el);
      item.key = item.id + num * 1000;
      groups[item.category].push(item);
    });
    return groups;
  }

  useEffect(() => {
    // FIXME: AXIOS call to get entree and side data
    let options = {
      method: "GET",
      url: `${url}/items`,
    };
    axios.request(options).then((res) => {
      let data = res.data.rows;
      setSideData(extractGroups(data, 0).Side);
      setEntreeData(extractGroups(data, 0).Entree);
      setEntreeData2(extractGroups(data, 1).Entree);
      setEntreeData3(extractGroups(data, 2).Entree);
    });
    // [ {string name, int id,}]
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
      item.selected = item.key === id;
      return item;
    });
    setEntreeData(updatedData);
  };
  const handleEntreeSelect2 = (id) => {
    const updatedData = entreeData2.map((item) => {
      item.selected = item.key === id;
      return item;
    });
    setEntreeData2(updatedData);
  };

  const handleEntreeSelect3 = (id) => {
    const updatedData = entreeData3.map((item) => {
      item.selected = item.key === id;
      return item;
    });
    setEntreeData3(updatedData);
  };

  const getSelectedItems = (dat) => {
    for (let i = 0; i < dat.length; i++) {
      if (dat[i].selected) return dat[i];
    }
  };

  const handleAddBtn = () => {
    handleView(0);

    let selectedItems = [];
    selectedItems.push(getSelectedItems(sideData));
    selectedItems.push(getSelectedItems(entreeData));
    view >= 2 && selectedItems.push(getSelectedItems(entreeData2));
    view >= 3 && selectedItems.push(getSelectedItems(entreeData3));

    addItem(getTitle(), selectedItems);
  };

  const sectionStyle = {
    margin: "30x 0",
  };

  return (
    <div className="centerContent">
      <h1>{getTitle()}</h1>
      <div style={sectionStyle}>
        <div>
          <h4>Sides</h4>
        </div>
        <div>
          <SelectButtons items={sideData} handleSelect={handleSideSelect} />
        </div>
      </div>
      <div>
        <EntreeSelection
          entreeData={entreeData}
          handleEntreeSelect={handleEntreeSelect}
        />
      </div>
      <div>
        {view >= 2 && (
          <EntreeSelection
            entreeData={entreeData2}
            handleEntreeSelect={handleEntreeSelect2}
          />
        )}
      </div>
      <div>
        {view >= 3 && (
          <EntreeSelection
            entreeData={entreeData3}
            handleEntreeSelect={handleEntreeSelect3}
          />
        )}
      </div>
      <div className="bottomButtonBar">
        <OutlinedButton onClick={() => handleView(0)}>Cancel</OutlinedButton>
        <Button variant="contained" onClick={handleAddBtn}>
          Add
        </Button>
      </div>
    </div>
  );
}
