import React from 'react';
import { Button, TextField } from '@mui/material';

const NewMeetingForm = ({ newMeetingName, setNewMeetingName, createNewMeeting }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <TextField
        label="Meeting Name"
        variant="outlined"
        fullWidth
        value={newMeetingName}
        onChange={(e) => setNewMeetingName(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={createNewMeeting}
        disabled={!newMeetingName.trim()}
      >
        Create Meeting
      </Button>
    </div>
  );
};

export default NewMeetingForm;
