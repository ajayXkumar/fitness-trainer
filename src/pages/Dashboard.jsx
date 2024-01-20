import React, { useState, useEffect } from "react";
import AppointmentForm from "../Componant/DateAndTimeSelector";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/Dashboard.css";
import InfoCards from "../Componant/NavigationButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
const Dashboard = () => {
  const initialClients = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      location: "New York",
      appointments: [
        new Date("2024-01-25T10:00:00"),
        new Date("2024-01-26T14:30:00"),
        new Date("2024-01-27T11:45:00"),
      ],
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      location: "New York",
      appointments: [
        new Date("2024-02-17T15:15:00"),
        new Date("2024-02-19T09:00:00"),
        new Date("2024-02-21T13:30:00"),
      ],
    },
  ];

  const [clients, setClients] = useState(() => {
    const clientsData = JSON.parse(
      localStorage.getItem("clientsData"),
      (key, value) => {
        if (key === "appointments" && Array.isArray(value)) {
          return value.map((dateString) => new Date(dateString));
        }
        return value;
      }
    );

    return clientsData || initialClients;
  });

  const [clientForms, setClientForms] = useState({});
  const [editInfoClientId, setEditInfoClientId] = useState(null);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [isSlotBookedDialogOpen, setIsSlotBookedDialogOpen] = useState(false);
  const [slotBookedMessage, setSlotBookedMessage] = useState("");

  useEffect(() => {
    if (clients) {
      localStorage.setItem(
        "clientsData",
        JSON.stringify(clients, (key, value) => {
          if (key === "appointments" && Array.isArray(value)) {
            return value.map((date) => date.toISOString());
          }
          return value;
        })
      );
    }
  }, [clients]);

  const checkSlotAvailability = (clientId, newAppointment) => {
    const client = clients.find((c) => c.id === clientId);
    const overlappingAppointment = client.appointments.find((appointment) => {
      const diffInMinutes = Math.abs(newAppointment - appointment) / 60000;
      return diffInMinutes < 60; // Check if the new appointment overlaps with any existing appointment within the next hour
    });

    if (overlappingAppointment) {
      setSlotBookedMessage(`The slot is already booked within the next hour.`);
      setIsSlotBookedDialogOpen(true);
      return false;
    }

    return true;
  };

  const saveAppointment = (clientId, dateTime) => {
    if (checkSlotAvailability(clientId, dateTime)) {
      const updatedClients = clients.map((client) =>
        client.id === clientId
          ? { ...client, appointments: [...client.appointments, dateTime] }
          : client
      );
      setClients(updatedClients);
      setClientForms((prevForms) => ({
        ...prevForms,
        [clientId]: false,
      }));
    }
  };

  const closeSlotBookedDialog = () => {
    setIsSlotBookedDialogOpen(false);
  };

  const addAppointment = (clientId) => {
    setClientForms((prevForms) => ({
      ...prevForms,
      [clientId]: true,
    }));
  };

  const editAppointment = (clientId, appointment) => {
    setClientForms((prevForms) => ({
      ...prevForms,
      [`${clientId}-${appointment}`]: true,
    }));
  };

  const editedSaveAppointment = (clientId, oldAppointment, newDateTime) => {
    const updatedClients = clients.map((client) =>
      client.id === clientId
        ? {
            ...client,
            appointments: client.appointments.map((appointment) =>
              appointment.toString() === oldAppointment.toString()
                ? new Date(newDateTime)
                : appointment
            ),
          }
        : client
    );

    setClients(updatedClients);
    setClientForms((prevForms) => ({
      ...prevForms,
      [`${clientId}-${oldAppointment}`]: false,
    }));
  };

  const deleteAppointment = (clientId, appointment) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      const updatedClients = clients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              appointments: client.appointments.filter(
                (app) => app.toString() !== appointment.toString()
              ),
            }
          : client
      );

      setClients(updatedClients);
    }
  };

  const deleteClient = (clientId) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      const updatedClients = clients.filter((client) => client.id !== clientId);
      setClients(updatedClients);
    }
  };

  const toggleSaveEdit = (clientId, client) => {
    if (editInfoClientId === client.id) {
      saveInfo(clientId);
    } else {
      editInfo(clientId, client);
    }
  };

  const editInfo = (clientId, client) => {
    setEditInfoClientId(clientId);
    setEditedFirstName(client.firstName);
    setEditedLastName(client.lastName);
    setEditedLocation(client.location);
  };

  const saveInfo = (clientId) => {
    if (editedFirstName.length > 1 && editedLastName.length > 1) {
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === clientId
            ? {
                ...client,
                firstName: editedFirstName,
                lastName: editedLastName,
                location: editedLocation,
              }
            : client
        )
      );
    }
    setEditInfoClientId(null);
  };

  const addClient = (newClient) => {
    setClients([
      ...clients,
      { id: clients.length + 1, ...newClient, appointments: [] },
    ]);
  };

  return (
    <div className="dashboard-container">
      <InfoCards Clients={clients} onAddClient={addClient} />

      <Dialog open={isSlotBookedDialogOpen} onClose={closeSlotBookedDialog}>
        <DialogTitle>This Slot is already Booked</DialogTitle>
        <DialogContent>
          <DialogContentText>{slotBookedMessage}</DialogContentText>
        </DialogContent>
      </Dialog>

      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Location</th>
            <th>Appointments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>
                {editInfoClientId === client.id ? (
                  <input
                    className="editable edit-mode"
                    type="text"
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                  />
                ) : (
                  client.firstName
                )}
              </td>
              <td>
                {editInfoClientId === client.id ? (
                  <input
                    className="editable edit-mode"
                    type="text"
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                  />
                ) : (
                  client.lastName
                )}
              </td>
              <td>
                {editInfoClientId === client.id ? (
                  <input
                    type="text"
                    className="editable edit-mode"
                    value={editedLocation}
                    onChange={(e) => setEditedLocation(e.target.value)}
                  />
                ) : (
                  client.location
                )}
              </td>
              <td>
                {client.appointments.map((appointment, index) => (
                  <div key={index} className="appointment-item">
                    <span>
                      {appointment.toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </span>
                    <div>
                      <button
                        onClick={() => editAppointment(client.id, appointment)}
                      >
                        <EditCalendarIcon />
                      </button>
                      {clientForms[`${client.id}-${appointment}`] && (
                        <AppointmentForm
                          msg={`Reschedule the appointment of ${client.firstName} ${client.lastName}`}
                          onSave={(dateTime) =>
                            editedSaveAppointment(
                              client.id,
                              appointment,
                              dateTime
                            )
                          }
                          onClose={() =>
                            setClientForms((prevForms) => ({
                              ...prevForms,
                              [`${client.id}-${appointment}`]: false,
                            }))
                          }
                        />
                      )}
                      <button
                        onClick={() =>
                          deleteAppointment(client.id, appointment)
                        }
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </td>
              <td>
                <button onClick={() => toggleSaveEdit(client.id, client)}>
                  {editInfoClientId === client.id ? (
                    <SaveAsIcon />
                  ) : (
                    <BorderColorIcon />
                  )}
                </button>

                <button onClick={() => addAppointment(client.id)}>
                  <AddCircleIcon />
                </button>
                {clientForms[client.id] && (
                  <AppointmentForm
                    msg={`Add new appointment to ${client.firstName} ${client.lastName}`}
                    onSave={(dateTime) => saveAppointment(client.id, dateTime)}
                    onClose={() =>
                      setClientForms((prevForms) => ({
                        ...prevForms,
                        [client.id]: false,
                      }))
                    }
                  />
                )}
                <button onClick={() => deleteClient(client.id)}>
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
