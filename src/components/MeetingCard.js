import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

const MeetingCard = ({ meeting, meetingCode }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardHeader
        title={<Typography variant="h5">{meeting.name}</Typography>}
        subheader={`Meeting Code: ${meetingCode}`}
      />
      <CardContent>
        {meeting.recommendedSlot ? (
          <Typography variant="body1" style={{ color: 'green' }}>
            Recommended Slot: {meeting.recommendedSlot.day} at {meeting.recommendedSlot.time}
          </Typography>
        ) : (
          <Typography variant="body1" style={{ color: 'red' }}>
            No recommended time slot available.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MeetingCard;
