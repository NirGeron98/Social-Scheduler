import React from 'react';
import { Button } from '@mui/material';

const AvailableSlots = ({ daysOfWeek, timeSlots, availableDays, availableTimes, toggleDayAvailability, toggleTimeAvailability }) => {
  return (
    <div>
      <h2>Available Days:</h2>
      <div>
        {daysOfWeek.map((day) => (
          <Button
            key={day}
            variant={availableDays[day] ? 'contained' : 'outlined'}
            onClick={() => toggleDayAvailability(day)}
            style={{ margin: '5px' }}
          >
            {day}
          </Button>
        ))}
      </div>

      <h2>Available Times:</h2>
      <div>
        {timeSlots.map((time) => (
          <Button
            key={time}
            variant={availableTimes[time] ? 'contained' : 'outlined'}
            onClick={() => toggleTimeAvailability(time)}
            style={{ margin: '5px' }}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AvailableSlots;
