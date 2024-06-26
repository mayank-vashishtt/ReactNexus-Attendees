// src/AttendeeList.js
import React, { useState, useEffect } from 'react';
import { TextField, Card, CardContent, Typography, Container, Grid } from '@mui/material';

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/attendees.json')
      .then(response => response.json())
      .then(data => setAttendees(data));
  }, []);

  const filteredAttendees = attendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <TextField
        label="Search attendees"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Grid container spacing={3}>
        {filteredAttendees.map(attendee => (
          <Grid item xs={12} sm={6} md={4} key={attendee.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {attendee.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {attendee.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AttendeeList;
