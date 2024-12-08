import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid } from '@mui/material';

const App = () => {
  const [meetings, setMeetings] = useState({});
  const [currentMeetingCode, setCurrentMeetingCode] = useState('');
  const [newMeetingName, setNewMeetingName] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [error, setError] = useState(false);
  const [view, setView] = useState('home');

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '06:00-07:00', '07:00-08:00', '08:00-09:00',
    '09:00-10:00', '10:00-11:00', '11:00-12:00',
    '12:00-13:00', '13:00-14:00', '14:00-15:00',
    '15:00-16:00', '16:00-17:00', '17:00-18:00',
    '18:00-19:00', '19:00-20:00', '20:00-21:00',
    '21:00-22:00', '22:00-23:00', '23:00-24:00'
  ];

  const generateMeetingCode = () => {
    let code;
    do {
      code = Math.random().toString(36).substring(2, 8).toUpperCase();
    } while (meetings[code]);
    return code;
  };

  const createNewMeeting = () => {
    if (!newMeetingName.trim()) {
      alert('Please enter a meeting name!');
      return;
    }
    const newCode = generateMeetingCode();
    setMeetings((prev) => ({
      ...prev,
      [newCode]: {
        name: newMeetingName.trim(),
        participants: [],
        recommendedSlot: null,
      },
    }));
    setCurrentMeetingCode(newCode);
    setNewMeetingName('');
    setView('event');
  };

  const joinMeeting = () => {
    if (!currentMeetingCode.trim() || !meetings[currentMeetingCode]) {
      alert('Invalid meeting code!');
      return;
    }
    setView('event');
  };

  const selectDay = (day) => {
    if (!currentName.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setSelectedDay(day);
    setSelectedSlots([]);
  };

  const toggleSlot = (time) => {
    if (!currentName.trim()) {
      setError(true);
      return;
    }
    setError(false);

    setSelectedSlots((prev) => {
      if (prev.includes(time)) {
        return prev.filter((slot) => slot !== time);
      } else {
        return [...prev, time];
      }
    });
  };

  const addParticipant = () => {
    if (!currentName.trim()) {
      alert('Please enter your name before saving!');
      return;
    }
    if (selectedSlots.length === 0) {
      alert('Please select at least one slot!');
      return;
    }

    const updatedMeetings = { ...meetings };
    const currentMeeting = updatedMeetings[currentMeetingCode];

    const newParticipant = {
      name: currentName.trim(),
      availableSlots: [...availableSlots, { day: selectedDay, times: selectedSlots }],
    };

    currentMeeting.participants.push(newParticipant);

    const availabilityCount = {};
    currentMeeting.participants.forEach((participant) => {
      participant.availableSlots.forEach((slot) => {
        slot.times.forEach((time) => {
          const key = `${slot.day}-${time}`;
          availabilityCount[key] = (availabilityCount[key] || 0) + 1;
        });
      });
    });

    const mostAvailableSlot = Object.entries(availabilityCount).reduce(
      (max, entry) => (entry[1] > max[1] ? entry : max),
      ['', 0]
    )[0];

    currentMeeting.recommendedSlot = mostAvailableSlot
      ? {
          day: mostAvailableSlot.split('-')[0],
          time: mostAvailableSlot.split('-')[1],
        }
      : null;

    setMeetings(updatedMeetings);
    setAvailableSlots([]);
    setSelectedSlots([]);
    setSelectedDay('');
    alert('Your availability has been saved! You can add more days and times.');
  };

  const getParticipantsForSlot = (day, time) => {
    const currentMeeting = meetings[currentMeetingCode];
    return currentMeeting.participants.filter((participant) =>
      participant.availableSlots.some(
        (slot) => slot.day === day && slot.times.includes(time)
      )
    );
  };

  if (view === 'home') {
    return (
      <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Social Scheduler
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setView('create')}
          fullWidth
          sx={{ marginBottom: '10px' }}
        >
          Create New Meeting
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setView('join')}
          fullWidth
        >
          Join Meeting with Code
        </Button>
      </Box>
    );
  }

  if (view === 'event') {
    const currentMeeting = meetings[currentMeetingCode];
    return (
      <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Meeting: {currentMeeting?.name || ''} ({currentMeetingCode})
        </Typography>

        {currentMeeting.recommendedSlot && (
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', backgroundColor: '#e0ffe0' }}>
            <Typography variant="h5" color="green" gutterBottom>
              Most Available Time:
            </Typography>
            <Typography variant="body1">
              {currentMeeting.recommendedSlot.day} at {currentMeeting.recommendedSlot.time}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: '10px' }}>
              Participants available at this time:
            </Typography>
            {getParticipantsForSlot(
              currentMeeting.recommendedSlot.day,
              currentMeeting.recommendedSlot.time
            ).map((participant, index) => (
              <Typography key={index} variant="body2" sx={{ marginLeft: '10px' }}>
                - {participant.name}
              </Typography>
            ))}
          </Paper>
        )}

        <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Participants Who Voted
          </Typography>
          {currentMeeting.participants.length > 0 ? (
            <Box sx={{ textAlign: 'left', padding: '10px' }}>
              {currentMeeting.participants.map((participant, index) => (
                <Box key={index} sx={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                  <Typography variant="h6">{participant.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Availability:
                  </Typography>
                  {participant.availableSlots.map((slot, slotIndex) => (
                    <Typography key={slotIndex} variant="body2" sx={{ marginLeft: '10px' }}>
                      - {slot.day}: {slot.times.join(', ')}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No participants have voted yet.
            </Typography>
          )}
        </Paper>
      </Box>
    );
  }

  return null;
};

export default App;
