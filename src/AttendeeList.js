// src/AttendeeList.js
import React, { useState, useEffect } from 'react';
import { TextField, Card, CardContent, Typography, Container, Grid } from '@mui/material';
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
  backgroundColor: isClicked ? '#d32f2f' : '#424242', // Change background color when clicked
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

const StyledSearchInput = styled(TextField)({
  marginBottom: '20px',
});

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [clickedAttendeeId, setClickedAttendeeId] = useState(null);

  useEffect(() => {
    fetch('/attendees.json')
      .then(response => response.json())
      .then(data => setAttendees(data));
  }, []);

  const filteredAttendees = attendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (id) => {
    setClickedAttendeeId(id === clickedAttendeeId ? null : id);
  };

  return (
    <StyledContainer>
      <StyledSearchInput
        label="Search attendees"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Grid container spacing={3}>
        {filteredAttendees.map(attendee => (
          <Grid item xs={12} sm={6} md={4} key={attendee.id}>
            <StyledCard
              isClicked={attendee.id === clickedAttendeeId}
              onClick={() => handleCardClick(attendee.id)}
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
