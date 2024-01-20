import React, { useState } from "react";

const AddClient = ({ onAddClient }) => {
  const [showForm, setShowForm] = useState(false);
  const [newClient, setNewClient] = useState({
    firstName: "",
    lastName: "",
    location: "",
  });

  const handleAddClientClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setNewClient({ firstName: "", lastName: "", location: "" }); // Reset form fields
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddClient(newClient);
    setShowForm(false);
  };

  return (
    <div>
      <div className="nav-link" onClick={handleAddClientClick}>
        Add Client
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="add-client-form">
            <button onClick={handleCloseForm} className="close-button">
              &times;
            </button>
            <form onSubmit={handleSubmit}>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={newClient.firstName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={newClient.lastName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={newClient.location}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">Add Client</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddClient;
