import { useState, useEffect } from "react";
import { Button, tabScrollButtonClasses } from "@mui/material";
import SelectButtons from "../../components/SelectButtons/SelectButtons";
import axios from "axios";
import { url } from "../../config/global.js"

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
    let groups = {Entree: [], Side: []}
    // for(let i=0; i<rows.length; i++) {
    //   let item = rows[i]
    //   item.key = item.id + num*1000
    //   groups[item.category].push(item)
    // }
    rows.forEach((el) => {
      let item = Object.assign({}, el)
      item.key = item.id + num*1000
      groups[item.category].push(item)
    })
    console.log(num)
    console.log(groups)
    return groups;
  }

  useEffect(() => {
    // FIXME: AXIOS call to get entree and side data
    let options = {
      method: 'GET',
      url: `${url}/items`
    }
    axios.request(options).then((res) => {
      let data = res.data.rows
      setSideData(extractGroups(data, 0).Side)
      setEntreeData(extractGroups(data, 0).Entree)
      setEntreeData2(extractGroups(data, 1).Entree)
      setEntreeData3(extractGroups(data, 2).Entree)
    })
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
    console.log("111");
    const updatedData = entreeData.map((item) => {
      item.selected = item.key === id;
      return item;
    });
    setEntreeData(updatedData);
  };
  const handleEntreeSelect2 = (id) => {
    console.log("222");
    const updatedData = entreeData2.map((item) => {
      item.selected = item.key === id;
      return item;
    });
    setEntreeData2(updatedData);
  };

  const handleEntreeSelect3 = (id) => {
    console.log("333");
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
