import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/DateandtimeSelector.css';

const DateandTimeSelector = ({ onSave, onClose, msg }) => {
  const [dateTime, setDateTime] = useState(new Date());
  const min = new Date();

  const handleSave = () => {
    onSave(dateTime);
    onClose();
  };

  return (
    <div className="datetimeselector">
      <p>{msg}</p>
      <DatePicker
        placeholderText='Choose date and time from calendar'
        selected={dateTime}
        onChange={(date) => setDateTime(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={min}
        className="datetimepicker" 
      />
      <button className="save-button" onClick={handleSave}>Save</button>
    </div>
  );
};

export default DateandTimeSelector;
