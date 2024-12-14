import React from 'react';
import { Typography } from '@mui/material';

const ParticipantList = ({ participants }) => {
  if (!participants || participants.length === 0) {
    return <Typography variant="body1">No participants yet.</Typography>;
  }

  return (
    <div>
      {participants.map((participant, index) => (
        <div
          key={index}
          style={{
            marginBottom: '5px',
            padding: '5px',
            border: '1px solid #ddd',
            borderRadius: '5px',
          }}
        >
          <Typography variant="body2">
            {index + 1}. {participant.name}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default ParticipantList;
