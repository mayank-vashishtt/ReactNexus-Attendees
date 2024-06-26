// src/AttendeeList.js
import React, { useState, useEffect } from 'react';

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/attendees.json')
      .then(response => response.json())
      .then(data => setAttendees(data));
  }, []);

  const filteredAttendees = attendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search attendees"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredAttendees.map(attendee => (
          <li key={attendee.id}>
            <h3>{attendee.name}</h3>
            <p>{attendee.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendeeList;
