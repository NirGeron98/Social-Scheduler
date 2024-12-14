import React from 'react';
import { Typography, Box } from '@mui/material';

const getMostAvailableTime = (participants) => {
  const timeCount = {};

  participants.forEach((participant) => {
    participant.availableSlots.forEach((slot) => {
      slot.times.forEach((time) => {
        const key = `${slot.day} ${time}`;
        timeCount[key] = (timeCount[key] || 0) + 1;
      });
    });
  });

  let mostAvailable = { time: null, count: 0 };
  for (const [key, count] of Object.entries(timeCount)) {
    if (count > mostAvailable.count) {
      mostAvailable = { time: key, count };
    }
  }

  return mostAvailable;
};

const MeetingDetail = ({ meeting }) => {
  if (!meeting || !meeting.participants) return null;

  const mostAvailable = getMostAvailableTime(meeting.participants);

  return (
    <Box>
      <Typography variant="h4">Meeting: {meeting.name}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Participants:</Typography>
          <ul>
            {meeting.participants.map((participant, index) => (
              <li key={index}>{participant.name}</li>
            ))}
          </ul>
        </Box>
      </Box>
      {mostAvailable.time ? (
        <Box
          sx={{
            marginTop: '20px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            backgroundColor: '#e0ffe0',
          }}
        >
          <Typography variant="h6">Most Available Time:</Typography>
          <Typography variant="body1">{mostAvailable.time}</Typography>
          <Typography variant="body2">
            Participants available at this time:
          </Typography>
          <ul>
            {meeting.participants
              .filter((participant) =>
                participant.availableSlots.some((slot) =>
                  slot.times.includes(mostAvailable.time.split(' ')[1]) &&
                  slot.day === mostAvailable.time.split(' ')[0]
                )
              )
              .map((participant, index) => (
                <li key={index}>{participant.name}</li>
              ))}
          </ul>
        </Box>
      ) : (
        <Typography sx={{ marginTop: '20px' }}>No recommended time available.</Typography>
      )}
    </Box>
  );
};

export default MeetingDetail;
