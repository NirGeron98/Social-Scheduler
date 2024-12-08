import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { database } from "./firebase";
import { ref, set, get, update } from "firebase/database";

const App = () => {
  const [meetings, setMeetings] = useState({});
  const [currentMeetingCode, setCurrentMeetingCode] = useState("");
  const [newMeetingName, setNewMeetingName] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]); // Allow multiple days to be selected
  const [selectedSlots, setSelectedSlots] = useState([]); // Allow multiple time slots to be selected
  const [view, setView] = useState("home");

  const generateMeetingCode = () => {
    let code;
    do {
      code = Math.random().toString(36).substring(2, 8).toUpperCase();
    } while (meetings[code]);
    return code;
  };

  const createNewMeeting = async () => {
    if (!newMeetingName.trim()) {
      alert("Please enter a meeting name!");
      return;
    }

    const newCode = generateMeetingCode();
    const meetingData = {
      name: newMeetingName,
      participants: [],
    };

    await set(ref(database, `meetings/${newCode}`), meetingData);
    setMeetings((prev) => ({
      ...prev,
      [newCode]: meetingData,
    }));
    setCurrentMeetingCode(newCode);
    setNewMeetingName("");
    setView("event");
  };

  const joinMeeting = async () => {
    if (!currentMeetingCode.trim()) {
      alert("Please enter a meeting code!");
      return;
    }

    try {
      const meetingRef = ref(database, `meetings/${currentMeetingCode}`);
      const snapshot = await get(meetingRef);

      if (!snapshot.exists()) {
        throw new Error("Meeting not found");
      }

      const meeting = snapshot.val();
      setMeetings((prev) => ({ ...prev, [currentMeetingCode]: meeting }));
      setView("event");
    } catch (error) {
      alert("Error joining meeting: " + error.message);
    }
  };

  const addParticipant = async () => {
    if (!currentName.trim() || selectedSlots.length === 0 || selectedDays.length === 0) {
      alert("Please fill in your name, select days and time slots");
      return;
    }

    try {
      const currentMeeting = meetings[currentMeetingCode];
      const updatedParticipants = [
        ...currentMeeting.participants,
        {
          name: currentName,
          availableSlots: selectedDays.map((day) => ({
            day,
            times: selectedSlots,
          })),
        },
      ];

      await update(ref(database, `meetings/${currentMeetingCode}`), {
        participants: updatedParticipants,
      });

      setMeetings((prev) => ({
        ...prev,
        [currentMeetingCode]: {
          ...currentMeeting,
          participants: updatedParticipants,
        },
      }));

      alert("Participant added successfully!");
      
      // After saving, reset the days and slots, but keep the name
      setSelectedDays([]);
      setSelectedSlots([]);
    } catch (error) {
      alert("Error adding participant: " + error.message);
    }
  };

  const getParticipantsForSlot = (day, time) => {
    const currentMeeting = meetings[currentMeetingCode];
    return currentMeeting.participants.filter((participant) =>
      participant.availableSlots.some(
        (slot) => slot.day === day && slot.times.includes(time)
      )
    );
  };

  const handleDaySelect = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleTimeSelect = (time) => {
    setSelectedSlots((prev) =>
      prev.includes(time) ? prev.filter((slot) => slot !== time) : [...prev, time]
    );
  };

  const handleSave = () => {
    if (selectedSlots.length === 0) {
      alert("Please select time slots.");
      return;
    }
    addParticipant();
  };

  const getMostAvailableTime = () => {
    const currentMeeting = meetings[currentMeetingCode];
    if (!currentMeeting || !currentMeeting.participants) return;

    let timeSlots = [];

    // Loop over participants and their available time slots
    currentMeeting.participants.forEach((participant) => {
      participant.availableSlots.forEach((slot) => {
        slot.times.forEach((time) => {
          const key = `${slot.day} ${time}`;
          timeSlots[key] = (timeSlots[key] || 0) + 1;
        });
      });
    });

    // Find the most available time
    const mostAvailableTime = Object.entries(timeSlots).reduce(
      (acc, [key, count]) => (count > acc.count ? { time: key, count } : acc),
      { time: "", count: 0 }
    );

    return mostAvailableTime;
  };

  if (view === "home") {
    return (
      <Box
        sx={{
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Social Scheduler
        </Typography>

        <TextField
          label="Enter Meeting Name"
          variant="outlined"
          fullWidth
          value={newMeetingName}
          onChange={(e) => setNewMeetingName(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={createNewMeeting}
          fullWidth
          sx={{ marginBottom: "20px" }}
        >
          Create New Meeting
        </Button>

        <TextField
          label="Enter Meeting Code"
          variant="outlined"
          fullWidth
          value={currentMeetingCode}
          onChange={(e) => setCurrentMeetingCode(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />
        <Button variant="outlined" color="secondary" onClick={joinMeeting} fullWidth>
          Join Meeting
        </Button>
      </Box>
    );
  }

  if (view === "event") {
    const currentMeeting = meetings[currentMeetingCode];
    const mostAvailableTime = getMostAvailableTime();
    return (
      <Box
        sx={{
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Meeting: {currentMeeting?.name || ""} ({currentMeetingCode})
        </Typography>

        <TextField
          label="Enter Your Name"
          variant="outlined"
          fullWidth
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <Typography variant="h6">Select Days:</Typography>
        <Box sx={{ marginBottom: "20px" }}>
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
            <Button
              key={day}
              variant={selectedDays.includes(day) ? "contained" : "outlined"}
              color="primary"
              sx={{ margin: "5px" }}
              onClick={() => handleDaySelect(day)}
            >
              {day}
            </Button>
          ))}
        </Box>

        <Typography variant="h6">Select Time Slots:</Typography>
        <Box sx={{ marginBottom: "20px" }}>
          {Array.from({ length: 24 }, (_, i) => {
            const time = `${String(i).padStart(2, "0")}:00-${String(i + 1).padStart(2, "0")}:00`;
            return (
              <Button
                key={time}
                variant={selectedSlots.includes(time) ? "contained" : "outlined"}
                color="secondary"
                sx={{ margin: "5px" }}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </Button>
            );
          })}
        </Box>

        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>

        {mostAvailableTime.time && (
          <Paper
            elevation={3}
            sx={{ marginTop: "20px", padding: "20px", backgroundColor: "#e0ffe0" }}
          >
            <Typography variant="h5" color="green" gutterBottom>
              Most Available Time:
            </Typography>
            <Typography variant="body1">{mostAvailableTime.time}</Typography>
            <Typography variant="body2" color="textSecondary">
              Participants available at this time:
            </Typography>
            {getParticipantsForSlot(
              mostAvailableTime.time.split(" ")[0],
              mostAvailableTime.time.split(" ")[1]
            ).map((participant, index) => (
              <Typography key={index} variant="body2" sx={{ marginLeft: "10px" }}>
                - {participant.name}
              </Typography>
            ))}
          </Paper>
        )}
      </Box>
    );
  }

  return null;
};

export default App;
