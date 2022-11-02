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
  const [startTime, setStartTime] = useState(dayjs('2022-11-01T12:00:00'));
  const [endTime, setEndTime] = useState(dayjs('2022-11-01T12:00:00'));
  const [data, setData] = useState([]);

  function formatTimestamp(time) {
    return time.toISOString().replace('T', ' ').slice(0, -5)
  }

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
      setData(rows);
    })
  }

  const handleStartChange = (newValue) => {
    setStartTime(newValue);
    getSalesQuery(newValue, endTime);
  };

  const handleEndChange = (newValue) => {
    setEndTime(newValue);
    getSalesQuery(startTime, newValue);
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
          <MaterialUIPickers value={startTime} handleChange={handleStartChange} labelName={"Start Time"}/>
          <MaterialUIPickers value={endTime} handleChange={handleEndChange} labelName={"End Time"}/>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell align="center">Amount Sold</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
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
