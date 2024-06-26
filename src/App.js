// src/App.js
import React from 'react';
import AttendeeList from './AttendeeList';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark', // Enable dark mode
    primary: {
      main: '#d32f2f', // Red color
    },
    secondary: {
      main: '#1976d2', // Blue color (optional)
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <h1>ReactNexus Attendees</h1>
        </header>
        <AttendeeList />
      </div>
    </ThemeProvider>
  );
}

export default App;
