import React from 'react';
import { Typography } from '@mui/material';

const ParticipantList = ({ participants }) => {
  return (
    <div>
      <Typography variant="h6">Participants:</Typography>
      {participants.map((participant, index) => (
        <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <Typography variant="body1">Name: {participant.name}</Typography>
          <Typography variant="body2">
            Available Days: {Object.keys(participant.availableDays).filter((day) => participant.availableDays[day]).join(', ')}
          </Typography>
          <Typography variant="body2">
            Available Times: {Object.keys(participant.availableTimes).filter((time) => participant.availableTimes[time]).join(', ')}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default ParticipantList;
