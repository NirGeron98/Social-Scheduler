import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ParticipantList from './ParticipantList';
import { Typography, Box } from '@mui/material';

const MeetingDetail = () => {
  const { code } = useParams(); // קבלת קוד המפגש מכתובת ה-URL
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const response = await fetch(`http://localhost:5000/meetings/${code}`); // בקשה לשרת
        if (!response.ok) {
          throw new Error('Failed to fetch meeting');
        }
        const data = await response.json();
        setMeeting(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [code]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!meeting) {
    return <Typography>Meeting not found</Typography>;
  }

  return (
    <Box display="flex" flexDirection="row">
      <Box flex="1" p={2}>
        <Typography variant="h4">{meeting.name}</Typography>
        {/* פרטים נוספים על המפגש */}
      </Box>
      <Box flex="1" p={2} style={{ borderLeft: '1px solid #ddd' }}>
        <ParticipantList participants={meeting.participants} />
      </Box>
    </Box>
  );
};

export default MeetingDetail;
