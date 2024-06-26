// src/AttendeeList.js
import React, { useState, useEffect } from 'react';
import { Autocomplete, Card, CardContent, Typography, Container, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)({
  '& .MuiCard-root': {
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
});

const StyledCard = styled(Card)(({ isClicked }) => ({
  backgroundColor: isClicked ? '#d32f2f' : '#424242',
  color: '#fff',
  transition: 'transform 0.2s, background-color 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StyledHeader = styled('div')({
  backgroundColor: '#d32f2f',
  color: '#fff',
  padding: '10px',
  borderRadius: '4px 4px 0 0',
});

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch('/attendees.json')
      .then(response => response.json())
      .then(data => setAttendees(data));
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setOptions([]);
    } else {
      setOptions(attendees.filter(option => option.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }, [attendees, searchTerm]);

  const handleInputChange = (event, value) => {
    setSearchTerm(value);
  };

  const handleSelectChange = (event, value) => {
    setSelectedAttendee(value);
    setSearchTerm(value ? value.name : '');
  };

  return (
    <StyledContainer>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.name}
        value={selectedAttendee}
        onChange={handleSelectChange}
        inputValue={searchTerm}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search attendees"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Grid container spacing={3}>
        {attendees.map(attendee => (
          <Grid item xs={12} sm={6} md={4} key={attendee.id}>
            <StyledCard
              isClicked={selectedAttendee && attendee.id === selectedAttendee.id}
              onClick={() => setSelectedAttendee(attendee)}
            >
              <StyledHeader>
                <Typography variant="h5" component="div">
                  {attendee.name}
                </Typography>
              </StyledHeader>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {attendee.email}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};

export default AttendeeList;
