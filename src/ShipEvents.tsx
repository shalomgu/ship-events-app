import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ShipEvent } from "./ShipEvent";


function ShipEventsPage() {
  const [events, setEvents] = useState<ShipEvent[]>([]);
  const [shipId, setShipId] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");

  useEffect(() => {
    fetchEvents();
  }, [shipId, eventType]);

  const fetchEvents = async () => {
    try {
      const params: any = {};
      if (shipId) 
        params.shipId = shipId;
      else
        params.shipId = 1;

      if (eventType) params.eventType = eventType;

      const response = await axios.get("http://localhost:8080/api/events", { params });
      console.log("Fetched data:", response.data);
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  return (
    <div style={{ padding: 16 }}>
    <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
      <TextField
        label="Filter by Ship ID"
        variant="outlined"
        value={shipId}
        onChange={(e) => setShipId(e.target.value)}
        InputProps={{
          style: {
            color: "black",
            backgroundColor: "white",
          },
        }}
        InputLabelProps={{
          style: { color: "black" },
        }}
      />
      <TextField
        label="Filter by Event Type"
        variant="outlined"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
        InputProps={{
          style: {
            color: "black",         // text color
            backgroundColor: "white", // input background
          },
        }}
        InputLabelProps={{
          style: { color: "black" },  // label color
        }}
      />
    </div>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Event Type</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Additional Data</TableCell>
            <TableCell>Ship ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.id}</TableCell>
              <TableCell>{event.eventType}</TableCell>
              <TableCell>{new Date(event.timestamp).toLocaleString()}</TableCell>
              <TableCell>{event.additionalData}</TableCell>
              <TableCell>{event.shipId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);
};

export default ShipEventsPage;
