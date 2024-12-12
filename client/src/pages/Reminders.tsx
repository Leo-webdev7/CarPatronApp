
import '../App.css';
import HeaderSmall from '../components/HeaderSmall';
import clock from '../assets/icons/clock-alarm.svg';
import { useState } from 'react';

function Reminders() {
  const [selectedFrequency, setSelectedFrequency] = useState("once");
  const [customDate, setCustomDate] = useState("");

  const handleFrequencyChange = (e: any) => {
    setSelectedFrequency(e.target.value);
  };

  const handleCustomDateChange = (e: any) => {
    setCustomDate(e.target.value);
  };

  const saveReminder = () => {
    if (selectedFrequency === "custom" && !customDate) {
      alert("Please select a custom date.");
      return;
    }
    alert(`Reminder saved!\nFrequency: ${selectedFrequency}\nCustom Date: ${customDate || "N/A"}`);
  };

  return (
    <div>
      <HeaderSmall />
      <div className="user-profile">
        <img src={clock} alt="clock" className="user-profile-img" />
        <div className="reminders-box box">
          <h2>Reminders:</h2>
          <div className="dateInput">
            <p className="input-label">Choose a date:</p>
            <input type="date" id="remindersDate" />
          </div>
          <div className="titleInput">
            <p className="input-label">Title:</p>
            <input type="text" id="remindersTitle" />
          </div>
          <div className="repeatInput">
            <div id="popupMenu" className="popup">
                <p className="input-label">Set Reminder:</p>
              <div className="popup-content">
                <form id="reminderForm">
                  <select
                    id="frequency"
                    value={selectedFrequency}
                    onChange={handleFrequencyChange}
                  >
                    <option value="once">Once</option>
                    <option value="weekly">Every Week</option>
                    <option value="monthly">Every Month</option>
                    <option value="sixMonths">Every 6 Months</option>
                    <option value="custom">Custom</option>
                  </select>

                  {selectedFrequency === "custom" && (
                    <div id="customDateContainer">
                      <label htmlFor="customDate">Custom Date:</label>
                      <input
                        type="date"
                        id="customDate"
                        value={customDate}
                        onChange={handleCustomDateChange}
                      />
                    </div>
                  )}

                  <div className="actions">
                    <button className="saveButton" type="button" onClick={saveReminder}>
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reminders;


