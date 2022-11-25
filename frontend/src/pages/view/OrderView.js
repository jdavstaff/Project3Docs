import { useState, useEffect } from "react";
import { Button } from "@mui/material";

import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem"

import { Link, Navigate, useNavigate } from "react-router-dom";
import Summary from "../../components/Summary/Summary";
import PlateView from "./PlateView";
import "../../styles/master.scss";
import { OutlinedButton } from "../../styles/StyledButtons";
import { translateComponents } from "../../config/translate";
import axios from 'axios'
import { url } from "../../config/global.js";


export default function OrderView({ user }) {
  const [view, setView] = useState(0);
  const [summaryData, setSummaryData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [currLang, setCurrLang] = useState("");

  const navigate = useNavigate();

  const convertLanguageNames = (langs) => {
    let langList = [...langs];
    var langsProcessed = 0;

    langs.forEach((element, index) => {
      // Make the languages written in their own language
      let options = {
        method: 'GET',
        url: `${url}/translate`,
        params: {
          text: element.name,
          target: element.code
        }
      }

      axios.request(options).then((res) => {
        // Set the name to the translated value
        langList[index].name = res.data;

        langsProcessed++;

        if (langsProcessed === langList.length) {
          // The last 3 languages are repeats for some reason
          setLanguages(langList.slice(0, langList.length - 3));
        }
      })

    })

  }

  useEffect(() => {
    // Get all available languages on page load
    let options = {
      method: "GET",
      url: `${url}/languages`
    }

    axios.request(options).then((res) => {
      convertLanguageNames(res.data);
    })
  }, []);

  const addItem = (size, item) => {
    let summaryItem = {
      size: size,
      id: Math.floor(Math.random() * 10000),
      items: [...item],
    };
    console.log(summaryItem);
    setSummaryData([...summaryData, summaryItem]);
  };

  const toCheckout = () => {
    console.log("checking out");
    navigate(`checkout`, { state: { summaryData: [...summaryData] } });
  };
  const handleBtnClick = (v) => {
    setView(v);
  };

  const handleLanguageChange = (event) => {
    setCurrLang(event.target.value)
  }

  const handleTranslate = () => {
    translateComponents(currLang);
  }

  // function translate(element) {
  //   let children = element.childNodes
  //   if(children.length == 0)
  //     return


  //   for(let i=0; i<children.length; i++) {
  //     // console.log(`node: ${children[i].nodeType}\ntext: ${children[i].data}`)

  //     if(children[i].data && children[i].nodeType === 3) {
  //       let options = {
  //         method: 'GET',
  //         url: `${url}/translate`,
  //         params: {
  //           text: children[i].data,
  //           target: "es"
  //         }
  //       }
  //       axios.request(options).then((res) => {
  //         console.log(`before: ${children[i].data}\nafter: ${res.data}`)
  //         children[i].data = res.data
  //       })
  //     }
  //     translate(children[i])
  //   }

    
  // }

  // function translateComponents() {
  //   let root = document.querySelector('div')
  //   translate(root)
    
  // }

  if (view === 0) {
    return (
      <div>
        <div>
          <h3>Size:</h3>
          <div class="center">
            <Button variant="contained" onClick={() => handleBtnClick(1)}>
              Bowl
            </Button>
            <Button variant="contained" onClick={() => handleBtnClick(2)}>
              Plate
            </Button>
            <Button variant="contained" onClick={() => handleBtnClick(3)}>
              Bigger Plate
            </Button>
          </div>
        </div>
        {/*
        <div>
          <h3>Extra:</h3>
          <div>
            <Button variant="outlined">Appetizer</Button>
          </div>
        </div>
        */}
        <div>
          <Summary data={summaryData} />
        </div>
        <div class="bottomButtonBar">
          <Link to="/">
            <OutlinedButton variant="outlined">Back</OutlinedButton>
          </Link>
          <Button variant="contained" onClick={toCheckout}>
            CHECKOUT
          </Button>
        </div>

    <Button variant="outlined" onClick={handleTranslate}>translate</Button>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="lang-select-label">
        Languages
      </InputLabel>
      <Select 
        value={currLang}
        onChange={handleLanguageChange}
        label="Languages"
        labelId="lang-select-label"
      >
        {languages.map((langInfo) => (
          <MenuItem key={langInfo.code} value={langInfo.code}>
            {langInfo.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

      </div>
    );
  } else {
    return (
      <div>
        <PlateView
          user={user}
          handleView={handleBtnClick}
          view={view}
          addItem={addItem}
        />

      </div>
    );
  }
}
