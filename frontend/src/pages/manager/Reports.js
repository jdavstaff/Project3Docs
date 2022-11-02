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

function MaterialUIPickers({value, handleChange, labelName}) {
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
  const [salesData, setSalesData] = useState([]);
  const [excessData, setExcessData] = useState([]);

  // Convert Javascript timestamp to PostgreSQL timestamp
  function formatTimestamp(time) {
    return time.toISOString().replace('T', ' ').slice(0, -5)
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

  // Handle changes to sales report start time
  const handleStartChange = (newValue) => {
    setSalesStartTime(newValue);
    getSalesQuery(newValue, salesEndTime);
  };

  // Handle changes to sales report end time
  const handleEndChange = (newValue) => {
    setSalesEndTime(newValue);
    getSalesQuery(salesStartTime, newValue);
  };

  // Handle changes to excess report time
  const handleExcessChange = (newValue) => {
    setExcessTime(newValue);
    getExcessQuery(excessTime);
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
          <MaterialUIPickers value={salesStartTime} handleChange={handleStartChange} labelName={"Start Time"}/>
          <MaterialUIPickers value={salesEndTime} handleChange={handleEndChange} labelName={"End Time"}/>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell align="center">Amount Sold</TableCell>
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
                    {/* FIXME: should add edit and delete buttons to cell */}
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
          <MaterialUIPickers value={excessTime} handleChange={handleExcessChange} labelName={"Start Time"}/>
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
                    {/* FIXME: should add edit and delete buttons to cell */}
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
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
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
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
