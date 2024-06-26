// src/App.js
import React from 'react';
import AttendeeList from './AttendeeList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ReactNexus Attendees</h1>
      </header>
      <AttendeeList />
    </div>
  );
}

export default App;
