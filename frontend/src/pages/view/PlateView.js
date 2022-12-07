import { useState, useEffect } from "react";
import { Button, Divider, Stack } from "@mui/material";
import SelectButtons from "../../components/SelectButtons/SelectButtons";
import axios from "axios";
import { url } from "../../config/global.js";
import "../../styles/master.scss";
import { OutlinedButton } from "../../styles/StyledButtons";
import { useLang } from "../../contexts/LanguageContext";
import { translateComponents } from "../../config/translate";
import { CenterWrapper } from "../../styles/CenterWrapper";

function EntreeSelection({ entreeData, handleEntreeSelect }) {
  const secStyle = {
    margin: "40px 0",
  };
  return (
    <div style={secStyle}>
      <h2>Entrees</h2>
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
  const [appetizerData, setAppetizerData] = useState([]);

  const langInfo = useLang();
  let translated = false;

  const getTitle = () => {
    if (view === 1) return "Bowl";
    else if (view === 2) return "Plate";
    else if (view === 3) return "Bigger Plate";
    else if (view === -1) return "Appetizer";
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

      // FIXME: setAppetizerData()
    });

    // [ {string name, int id,}]
  }, []);

  useEffect(() => {
    if (!translated && langInfo !== "en" && langInfo !== null) {
      translateComponents(langInfo);
      translated = true;
    }
  }, [entreeData3]);

  const handleSideSelect = (id) => {
    const updatedData = sideData.map((item) => {
      item.selected = item.id === id;
      return item;
    });
    setSideData(updatedData);
  };

  const handleAppetizerSelect = (id) => {
    const updatedData = appetizerData.map((item) => {
      item.selected = item.id === id;
      return item;
    });
    setAppetizerData(updatedData);
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
    view === -1 && selectedItems.push(getSelectedItems(appetizerData));
    view >= 1 && selectedItems.push(getSelectedItems(sideData));
    view >= 1 && selectedItems.push(getSelectedItems(entreeData));
    view >= 2 && selectedItems.push(getSelectedItems(entreeData2));
    view >= 3 && selectedItems.push(getSelectedItems(entreeData3));

    addItem(getTitle(), selectedItems);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{getTitle()}</h1>
      <Divider />
      <Stack spacing={5}>
        {view === -1 && (
          <div>
            <div>
              <h2>Appetizer</h2>
              <div>
                <SelectButtons
                  items={sideData}
                  handleSelect={handleAppetizerSelect}
                />
              </div>
            </div>
          </div>
        )}
        {view >= 1 && (
          <>
            <div>
              <div>
                <h2>Sides</h2>
              </div>
              <div>
                <SelectButtons
                  items={sideData}
                  handleSelect={handleSideSelect}
                />
              </div>
            </div>

            <div>
              <EntreeSelection
                entreeData={entreeData}
                handleEntreeSelect={handleEntreeSelect}
              />
            </div>
          </>
        )}
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
        <Stack direction="row" spacing={2} sx={{ paddingBottom: "50px" }}>
          <Button onClick={() => handleView(0)} variant="outlined" size="large">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddBtn} size="large">
            Add
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
