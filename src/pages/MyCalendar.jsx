import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link } from "react-router-dom";
import moment from "moment";
import "../styles/Mycalendar.css";

const MyCalender = () => {
  const [Clients, setClients] = useState([]);

  useEffect(() => {
    const clientsData = JSON.parse(localStorage.getItem("clientsData"));
    if (JSON.stringify(clientsData) !== JSON.stringify(Clients)) {
      setClients(clientsData);
    }
  }, [Clients]);

  const localizer = momentLocalizer(moment);

  const generateEvents = () => {
    const events = [];

    Clients.forEach((client) => {
      client.appointments.forEach((appointment) => {
        events.push({
          id: appointment,
          title: `${client.firstName} ${client.lastName}`,
          start: new Date(appointment),
          end: moment(appointment).add(1, "hour").toDate(),
        });
      });
    });

    return events;
  };
  console.log("hello");
  return (
    <div className="dashboard-container">
      <div className="home-button">
        <Link to={"/"} className="brand">
          Fitness Trainer
        </Link>
        <Link to={"/"}>Home</Link>
      </div>

      <Calendar
        localizer={localizer}
        events={generateEvents()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        components={{
          event: (props) => {
            return (
              <div
                style={{
                  backgroundColor: "#472734",
                  background: "#472734",
                  border: "none",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {props.title}
              </div>
            );
          },
        }}
      />
    </div>
  );
};

export default MyCalender;
