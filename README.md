
# Social Scheduler

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

**Social Scheduler** is a web application designed to simplify the process of scheduling meetings and coordinating availability among participants. This app allows users to create and join meetings, specify their availability, and determine the optimal time slot for everyone involved.

🌐 **Live Demo**: [Visit Social Scheduler](https://NirGeron98.github.io/Social-Scheduler)

---

## Features

- **Meeting Management**: 
  - Create and join meetings using unique codes.
  - Display available time slots and the best time for the meeting.
  - Add participants with customizable availability options.
- **Real-Time Updates**: Leverages Firebase Realtime Database for immediate synchronization.
- **Interactive UI**: Intuitive and user-friendly interface built with React and Material-UI.

---

## How It Works

1. **Create a Meeting**:
   - Input a name for your meeting.
   - Share the generated meeting code with participants.

2. **Join a Meeting**:
   - Enter the meeting code to participate.

3. **Set Availability**:
   - Select your preferred days and times.
   - The app calculates the most suitable slot based on all participants' preferences.

4. **View Meetings**:
   - See a list of meetings, participants, and their availability.
   - Get recommendations for the best meeting time.

---

## Technologies Used

### Frontend
- React.js
- Material-UI

### Backend
- Express.js

### Database
- Firebase Realtime Database

---

## Setup

### Prerequisites
- Node.js and npm installed.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/NirGeron98/Meeting-Website.git
   cd Meeting-Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. (Optional) Start the backend server:
   ```bash
   node server.js
   ```

---

## Deployment

This project is deployed using GitHub Pages. To deploy your changes:
```bash
npm run deploy
```

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or suggestions, feel free to reach out via GitHub issues.


