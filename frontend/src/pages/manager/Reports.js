import { useState, useEffect } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { url } from '../../config/global'
import axios from "axios";
import { useLang } from "../../contexts/LanguageContext";
import { translateComponents } from "../../config/translate";

// Creates a date and time selector
function MaterialUIDateTimeSelect({value, handleChange, labelName}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label={labelName}
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}

export default function Reports() {
  // Variables for timestamps
  const [salesStartTime, setSalesStartTime] = useState(dayjs('2022-11-01T12:00:00'));
  const [salesEndTime, setSalesEndTime] = useState(dayjs('2022-11-01T12:00:00'));
  const [excessTime, setExcessTime] = useState(dayjs('2022-11-01T12:00:00'));
  const [sellsTogetherStartTime, setSellsTogetherStartTime] = useState(dayjs('2022-11-01T12:00:00'));
  const [sellsTogetherEndTime, setSellsTogetherEndTime] = useState(dayjs('2022-11-01T12:00:00'));

  const [salesData, setSalesData] = useState([]);
  const [excessData, setExcessData] = useState([]);
  const [restockData, setRestockData] = useState([]);
  const [sellsTogetherData, setSellsTogetherData] = useState([]);

  const langInfo = useLang();

  // Update restock table on page load
  useEffect(() => {
    const options = {
      method: 'GET',
      url: `${url}/restockReport`
    }
    axios.request(options).then((res) => {
      let rows = res.data.rows;
      setRestockData(rows);

      if (langInfo !== "en" && langInfo !== null) {
        translateComponents(langInfo);
      }
    })
  }, []);

  useEffect(() => {
    if (langInfo !== "en" && langInfo !== null) {
      translateComponents(langInfo);
    }
  }, [salesData, excessData, restockData, sellsTogetherData]);

  // Convert Javascript timestamp to PostgreSQL timestamp
  function formatTimestamp(time) {
    let output = time.toISOString().replace('T', ' ').slice(0, -5);
    return output;
  }

  function formatPercent(decimal) {
    return Number(decimal).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 3});
  }

  // Query for sales information in a selected time period
  function getSalesQuery(startTime, endTime) {
    const options = {
      method: 'GET',
      url: `${url}/salesReport`,
      params: {
        start: formatTimestamp(startTime), 
        end: formatTimestamp(endTime)
      }
    }

    axios.request(options).then((res) => {
      let rows = res.data.rows;
      setSalesData(rows);
    })
  }

  // Query for items that sold less than 10% of their inventory after a selected time
  function getExcessQuery(startTime) {
    const options = {
      method: 'GET',
      url: `${url}/excessReport`,
      params: {
        start: formatTimestamp(startTime)
      }
    }

    axios.request(options).then((res) => {
      let rows = res.data.rows;
      setExcessData(rows);
    })
  }

  // Query for what sells together in a selected time period
  function getSellsTogetherQuery(startTime, endTime) {
    const options = {
      method: 'GET',
      url: `${url}/sellsTogetherReport`,
      params: {
        start: formatTimestamp(startTime), 
        end: formatTimestamp(endTime)
      }
    }

    axios.request(options).then((res) => {
      let rows = res.data.rows;
      setSellsTogetherData(rows);
    })
  }

  // Handle changes to sales report start time
  const handleSalesStartChange = (newValue) => {
    setSalesStartTime(newValue);
    getSalesQuery(newValue, salesEndTime);
  };

  // Handle changes to sales report end time
  const handleSalesEndChange = (newValue) => {
    setSalesEndTime(newValue);
    getSalesQuery(salesStartTime, newValue);
  };

  // Handle changes to excess report time
  const handleExcessChange = (newValue) => {
    setExcessTime(newValue);
    getExcessQuery(newValue);
  };

  // Handle changes to sells together report start time
  const handleTogetherStartChange = (newValue) => {
    setSellsTogetherStartTime(newValue);
    getSellsTogetherQuery(newValue, sellsTogetherEndTime);
  };

  // Handle changes to sells together report end time
  const handleTogetherEndChange = (newValue) => {
    setSellsTogetherEndTime(newValue);
    getSellsTogetherQuery(sellsTogetherStartTime, newValue);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sales</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MaterialUIDateTimeSelect value={salesStartTime} handleChange={handleSalesStartChange} labelName={"Start Time"}/>
          <MaterialUIDateTimeSelect value={salesEndTime} handleChange={handleSalesEndChange} labelName={"End Time"}/>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell align="right">Amount Sold</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salesData.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.amount_sold}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Excess</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MaterialUIDateTimeSelect value={excessTime} handleChange={handleExcessChange} labelName={"Start Time"}/>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell align="right">Ingredient Name</TableCell>
                  <TableCell align="right">Percent Sold</TableCell>
                  <TableCell align="right">Amount Sold</TableCell>
                  <TableCell align="right">Total Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {excessData.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.item_name}</TableCell>
                    <TableCell align="right">{row.ingredient_name}</TableCell>
                    <TableCell align="right">{formatPercent(row.percent_sold)}</TableCell>
                    <TableCell align="right">{row.amount_sold}</TableCell>
                    <TableCell align="right">{row.total_quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Restock</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell align="right">Current Amount</TableCell>
                  <TableCell align="right">Sold in Last 7 Days</TableCell>
                  <TableCell align="right">Recommended Resupply</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {restockData.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="right">{row.current_amount}</TableCell>
                    <TableCell align="right">{row.last_7_days_sales}</TableCell>
                    <TableCell align="right">{row.recommended_resupply}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Sells Together</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MaterialUIDateTimeSelect value={sellsTogetherStartTime} handleChange={handleTogetherStartChange} labelName={"Start Time"}/>
          <MaterialUIDateTimeSelect value={sellsTogetherEndTime} handleChange={handleTogetherEndChange} labelName={"End Time"}/>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Item</TableCell>
                  <TableCell align="right">Second Item</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sellsTogetherData.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.this_name}</TableCell>
                    <TableCell align="right">{row.other_name}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
