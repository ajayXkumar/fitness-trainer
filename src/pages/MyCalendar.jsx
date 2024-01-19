import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import InfoCards from '../Componant/NavigationButton'
import { Link } from "react-router-dom";
import moment from "moment";
import '../styles/Mycalendar.css'

const MyCalender = () => {
  const [Clients, setClients] = useState([]);

  useEffect(() => {
    const clientsData = JSON.parse(localStorage.getItem("clientsData"));
    setClients(clientsData);
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

  return (
    <div className="dashboard-container">
      <div className="home-button">
      <Link to={"/"}>
          Home
      </Link>
      </div>
      

      <Calendar
        localizer={localizer}
        events={generateEvents()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalender;
